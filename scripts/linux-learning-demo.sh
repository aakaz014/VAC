#!/usr/bin/env bash
# ==============================================================================
# Script Name:    linux-learning-demo.sh
# Project:        CAPSTONE 70 - Linux Command Line Learning Kit
# Description:    A fully automated, non-destructive educational Bash script 
#                 demonstrating variables, modular functions, input validation, 
#                 defensive error handling, and safe Linux filesystem operations.
# Target Audience: First- and Second-Year CSE Undergraduates
# Environment:    Ubuntu 20.04/22.04/24.04 LTS, Debian, Fedora, Arch, WSL2, VirtualBox
# Safety Guarantee: ZERO DESTRUCTIVE OPERATIONS. Operates strictly inside a sandboxed
#                 temporary workspace ($HOME/linuxlearn_sandbox_*) and self-cleans.
# ==============================================================================

# ------------------------------------------------------------------------------
# SECTION 1: DEFENSIVE SHELL SETTINGS & BOILERPLATE
# ------------------------------------------------------------------------------
# -e: Exit immediately if any command returns a non-zero exit status.
# -u: Treat unset/uninitialized variables as an error and exit immediately.
# -o pipefail: The return value of a pipeline is the status of the last command
#              to exit with a non-zero status, or zero if all commands exit successfully.
set -euo pipefail

# Define script version and timestamps
readonly SCRIPT_VERSION="1.2.0"
readonly EXECUTION_TIMESTAMP="$(date '+%Y-%m-%d_%H-%M-%S')"

# ANSI Color codes for readable, professional terminal outputs
readonly COLOR_RESET="\033[0m"
readonly COLOR_INFO="\033[1;34m"       # Bold Blue
readonly COLOR_SUCCESS="\033[1;32m"    # Bold Green
readonly COLOR_WARN="\033[1;33m"       # Bold Yellow
readonly COLOR_ERROR="\033[1;31m"      # Bold Red
readonly COLOR_TITLE="\033[1;36m"      # Bold Cyan
readonly COLOR_MUTED="\033[0;37m"      # Light Gray

# ------------------------------------------------------------------------------
# SECTION 2: LOGGING AND DISPLAY FUNCTIONS
# ------------------------------------------------------------------------------
log_info() {
    printf "${COLOR_INFO}[INFO] %s${COLOR_RESET}\n" "$1"
}

log_success() {
    printf "${COLOR_SUCCESS}[SUCCESS] %s${COLOR_RESET}\n" "$1"
}

log_warn() {
    printf "${COLOR_WARN}[WARNING] %s${COLOR_RESET}\n" "$1"
}

log_error() {
    printf "${COLOR_ERROR}[ERROR] %s${COLOR_RESET}\n" "$1" >&2
}

log_header() {
    printf "\n${COLOR_TITLE}================================================================${COLOR_RESET}\n"
    printf "${COLOR_TITLE}  %s${COLOR_RESET}\n" "$1"
    printf "${COLOR_TITLE}================================================================${COLOR_RESET}\n"
}

# ------------------------------------------------------------------------------
# SECTION 3: ERROR HANDLING & CLEANUP TRAP
# ------------------------------------------------------------------------------
# Sandboxed workspace variable (scoped safely in user's home directory)
SANDBOX_DIR="${HOME}/linuxlearn_sandbox_${EXECUTION_TIMESTAMP}"

# Cleanup handler invoked automatically upon script exit, error, or interruption
cleanup() {
    local exit_code=$?
    printf "\n"
    log_info "Initiating safe cleanup sequence..."
    if [[ -d "${SANDBOX_DIR}" ]]; then
        log_info "Safely removing temporary sandbox: ${SANDBOX_DIR}"
        # Safe removal: verify variable is not empty and resides inside $HOME
        if [[ -n "${SANDBOX_DIR}" && "${SANDBOX_DIR}" == "${HOME}/linuxlearn_sandbox_"* ]]; then
            rm -rf "${SANDBOX_DIR}"
            log_success "Temporary sandbox successfully purged."
        else
            log_error "Safety check failed: Refusing to delete unexpected path '${SANDBOX_DIR}'"
        fi
    fi

    if [[ ${exit_code} -eq 0 ]]; then
        log_success "LinuxLearn demo script completed successfully (Exit Code: 0)."
    else
        log_error "LinuxLearn demo script terminated with errors (Exit Code: ${exit_code})."
    fi
    exit "${exit_code}"
}

# Register the cleanup function to trigger on EXIT, INT (Ctrl+C), and TERM
trap cleanup EXIT INT TERM

# ------------------------------------------------------------------------------
# SECTION 4: ENVIRONMENT & USER VALIDATION
# ------------------------------------------------------------------------------
validate_environment() {
    log_header "PHASE 1: System Environment & Permission Audit"

    local current_user
    current_user="$(whoami)"
    log_info "Active shell user: ${current_user}"

    # Verify student is NOT running as root (Defensive principle of least privilege)
    if [[ "${EUID}" -eq 0 ]]; then
        log_warn "Notice: You are running this educational script as root (UID 0)."
        log_warn "For educational safety, practicing as a regular student user is recommended."
    else
        log_success "Privilege check passed: Running safely as an unprivileged user."
    fi

    # Check for required core utilities
    local required_cmds=("mkdir" "touch" "cat" "grep" "wc" "chmod" "ls" "date")
    for cmd in "${required_cmds[@]}"; do
        if ! command -v "${cmd}" >/dev/null 2>&1; then
            log_error "Missing required core utility: ${cmd}"
            exit 1
        fi
    done
    log_success "All required POSIX utilities are available."
}

# ------------------------------------------------------------------------------
# SECTION 5: INPUT VALIDATION DEMONSTRATION
# ------------------------------------------------------------------------------
validate_user_input() {
    log_header "PHASE 2: Interactive Input Validation"

    local student_name=""
    local student_lab_id=""

    # Prompt user for name with fallback default
    if [[ -t 0 ]]; then
        # Interactive terminal detected
        printf "${COLOR_MUTED}Enter your Student Name (letters & spaces only) [Default: CSE Student]: ${COLOR_RESET}"
        read -r input_name
        student_name="${input_name:-CSE Student}"
    else
        # Non-interactive / pipeline run
        student_name="CSE Student"
    fi

    # Sanitize and validate input: Allow only alphanumeric and spaces
    if [[ ! "${student_name}" =~ ^[a-zA-Z0-9\ ]+$ ]]; then
        log_warn "Invalid characters detected in name. Sanitizing to 'CSE Student'."
        student_name="CSE Student"
    fi
    log_success "Verified student name: '${student_name}'"

    # Example numeric validation
    local lab_number="70"
    if [[ ! "${lab_number}" =~ ^[0-9]+$ ]]; then
        log_error "Validation error: Lab number must be numeric."
        exit 1
    fi
    log_success "Verified Capstone Lab ID: #${lab_number}"
}

# ------------------------------------------------------------------------------
# SECTION 6: SANDBOXED FILESYSTEM WORKSPACE CREATION
# ------------------------------------------------------------------------------
demonstrate_filesystem_operations() {
    log_header "PHASE 3: Safe Directory & File Construction"

    log_info "Creating isolated sandbox: ${SANDBOX_DIR}"
    mkdir -p "${SANDBOX_DIR}/projects/lab1/src"
    mkdir -p "${SANDBOX_DIR}/projects/lab1/docs"
    mkdir -p "${SANDBOX_DIR}/logs"
    log_success "Created nested directory hierarchy with 'mkdir -p'."

    # Create safe sample files
    log_info "Creating sample laboratory files..."
    cat << 'EOF' > "${SANDBOX_DIR}/projects/lab1/src/main.c"
#include <stdio.h>

int main(void) {
    printf("Welcome to LinuxLearn AI - Operating Systems Lab!\n");
    return 0;
}
EOF

    cat << 'EOF' > "${SANDBOX_DIR}/projects/lab1/docs/readme.txt"
Capstone 70: Linux Command Line Learning Kit
Target: First and Second Year CSE Undergraduates
Safety Rule: Always verify commands before execution.
Never run unknown one-liners directly into root shells.
EOF

    log_success "Generated sample C source and documentation files."
}

# ------------------------------------------------------------------------------
# SECTION 7: TEXT PROCESSING & PIPELINE DEMONSTRATION
# ------------------------------------------------------------------------------
demonstrate_text_processing() {
    log_header "PHASE 4: Text Processing, Redirection & Pipes"

    local doc_file="${SANDBOX_DIR}/projects/lab1/docs/readme.txt"
    local line_count
    line_count="$(wc -l < "${doc_file}")"
    log_info "Line count of readme.txt via 'wc -l': ${line_count} lines."

    log_info "Searching for keyword 'Safety' using 'grep -n':"
    grep -n "Safety" "${doc_file}" || true

    log_info "Pipelining directory listing to count items in projects/lab1:"
    local subdirs_count
    subdirs_count="$(ls -1 "${SANDBOX_DIR}/projects/lab1" | wc -l)"
    log_success "Counted ${subdirs_count} subdirectories in projects/lab1."
}

# ------------------------------------------------------------------------------
# SECTION 8: PERMISSIONS & SECURITY DEMONSTRATION
# ------------------------------------------------------------------------------
demonstrate_permissions() {
    log_header "PHASE 5: POSIX File Permissions & Security"

    local script_file="${SANDBOX_DIR}/projects/lab1/src/run.sh"
    cat << 'EOF' > "${script_file}"
#!/usr/bin/env bash
echo "Hello from an executable student script!"
EOF

    log_info "Initial permissions for run.sh:"
    ls -l "${script_file}"

    log_info "Applying execute permissions using symbolic 'chmod +x'..."
    chmod +x "${script_file}"
    ls -l "${script_file}"
    log_success "Script is now executable."

    local secret_file="${SANDBOX_DIR}/logs/credentials.txt"
    echo "API_KEY=DEMO_ONLY_NOT_REAL" > "${secret_file}"
    log_info "Locking down secret file with octal 'chmod 600'..."
    chmod 600 "${secret_file}"
    ls -l "${secret_file}"
    log_success "Secret file locked to owner-read/write only (mode 600)."
}

# ------------------------------------------------------------------------------
# SECTION 9: SUMMARY & VM EXECUTION INSTRUCTIONS
# ------------------------------------------------------------------------------
display_summary() {
    log_header "PHASE 6: Demonstration Complete & Instructions"
    printf "${COLOR_SUCCESS}All automated checks and safe operations completed without errors!${COLOR_RESET}\n\n"
    printf "Key Takeaways for Students:\n"
    printf "  1. Defensive Flags: 'set -euo pipefail' prevents silent failures.\n"
    printf "  2. Modular Functions: Keep scripts readable, maintainable, and debuggable.\n"
    printf "  3. Automatic Cleanups: 'trap cleanup EXIT' ensures zero clutter on error or exit.\n"
    printf "  4. Sandboxing: Always test inside dedicated temporary paths.\n\n"
    printf "Instructions to run inside an Ubuntu VM or WSL:\n"
    printf "  $ chmod +x scripts/linux-learning-demo.sh\n"
    printf "  $ ./scripts/linux-learning-demo.sh\n"
}

# ------------------------------------------------------------------------------
# MAIN EXECUTION ROUTINE
# ------------------------------------------------------------------------------
main() {
    log_header "LinuxLearn AI: Automated Bash Demonstration (v${SCRIPT_VERSION})"
    validate_environment
    validate_user_input
    demonstrate_filesystem_operations
    demonstrate_text_processing
    demonstrate_permissions
    display_summary
}

# Execute main routine
main "$@"
