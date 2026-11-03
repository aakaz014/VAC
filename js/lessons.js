/**
 * LinuxLearn AI - Learning Modules Data & Controller
 * 12 Comprehensive Lessons covering Linux Fundamentals to Safe Command Practices
 * Satisfies Capstone 70 Curriculum Requirements
 */

const LESSONS_DATA = [
  {
    id: 1,
    title: "1. Introduction to Linux",
    shortDesc: "History, the Unix philosophy, kernel architecture, and major distributions.",
    category: "Basics",
    duration: "15 mins",
    intro: "Linux is a Unix-like, open-source operating system kernel created by Linus Torvalds in 1991. Paired with GNU system utilities, it powers over 90% of the world's cloud servers, supercomputers, Android devices, and DevOps container platforms like Docker and Kubernetes.",
    objectives: [
      "Understand the difference between the Linux kernel and a Linux distribution.",
      "Internalize the three core tenets of the Unix philosophy.",
      "Identify the primary Linux distribution families (Debian, Red Hat, Arch).",
      "Recognize why server administration and software engineering rely on the CLI."
    ],
    explanation: "Unlike monolithic proprietary operating systems, Linux is modular. At the center is the <strong>Kernel</strong>, managing CPU, memory, and hardware devices. Around the kernel are <strong>System Libraries</strong> and <strong>GNU Userland Utilities</strong> (like <code>ls</code>, <code>cat</code>, <code>grep</code>). A <strong>Distribution (Distro)</strong> bundles the kernel, utilities, package manager, and desktop environment into a cohesive operating system.",
    syntax: "uname [OPTION]...",
    examples: [
      { cmd: "uname -a", note: "Display kernel name, network nodename, release version, and machine architecture." },
      { cmd: "cat /etc/os-release", note: "Display distribution identification, version codename, and upstream links." }
    ],
    expectedOutput: `Linux linuxlearn 6.8.0-generic #40-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`,
    mistakes: [
      "Confusing 'Linux' with 'Ubuntu' (Ubuntu is just one distribution built on the Linux kernel).",
      "Assuming Linux has no graphical interface (GUIs exist, but servers omit them for performance and security)."
    ],
    safetyTips: [
      "Always check the kernel and OS version before running software installation scripts.",
      "Verify whether documentation or StackOverflow answers match your specific distribution family."
    ],
    practiceCmd: "uname -a",
    practiceDesc: "Query the operating system kernel and print full system architecture details."
  },
  {
    id: 2,
    title: "2. Understanding the Linux Terminal",
    shortDesc: "Shells, prompts, command anatomy, token parsing, and the Unix Rule of Silence.",
    category: "Basics",
    duration: "18 mins",
    intro: "The terminal is your direct communication channel to the Linux shell. While a graphical interface limits you to pre-built buttons, the shell gives you programmable, precise, and automatable power over every system resource.",
    objectives: [
      "Distinguish between a terminal emulator, a shell, and a command.",
      "Deconstruct the four parts of a Linux shell prompt.",
      "Master the universal command anatomy: Command + Options + Arguments.",
      "Understand the Unix 'Rule of Silence' and exit status codes ($?)."
    ],
    explanation: "When you launch a terminal, it spawns a <strong>Shell</strong> (such as Bash, Zsh, or Dash). The shell displays a <strong>Prompt</strong>: <code>student@linuxlearn:~$</code>.<br>• <code>student</code>: Active username.<br>• <code>linuxlearn</code>: System hostname.<br>• <code>~</code>: Working directory (tilde represents your /home/student directory).<br>• <code>$</code>: Unprivileged user prompt (a <code>#</code> indicates root superuser).<br><br><strong>Rule of Silence:</strong> In Unix, if a command succeeds without errors, it outputs nothing. A silent response means success!",
    syntax: "command [-flags] [arguments]",
    examples: [
      { cmd: "whoami", note: "Print the effective username of the current session." },
      { cmd: "echo $?", note: "Print the exit code of the previous command (0 means success, non-zero means error)." }
    ],
    expectedOutput: `student`,
    mistakes: [
      "Assuming a command failed because nothing was printed after pressing Enter.",
      "Adding unintended spaces between flags and options (e.g., typing 'ls - l' instead of 'ls -l')."
    ],
    safetyTips: [
      "Notice the prompt symbol: if it ends with '#', you have root power and an accidental typo can alter system files.",
      "Press Ctrl+C at any time to cancel a running command or clear a mistyped input line safely."
    ],
    practiceCmd: "whoami",
    practiceDesc: "Check your active user identity in the terminal."
  },
  {
    id: 3,
    title: "3. Basic Navigation Commands",
    shortDesc: "The unified single-root tree, pwd, cd, and absolute vs. relative paths.",
    category: "Navigation",
    duration: "20 mins",
    intro: "Linux does not use drive letters like C:\\ or D:\\. Everything in Linux lives under a single unified hierarchical tree starting at the root directory: <code>/</code>.",
    objectives: [
      "Navigate the single-root filesystem hierarchy effortlessly.",
      "Differentiate between Absolute Paths (/home/student) and Relative Paths (./notes.txt).",
      "Use navigation shortcuts: ~, ., .., and -.",
      "Check current coordinates at any time with pwd."
    ],
    explanation: "<strong>Absolute paths</strong> always begin with a forward slash <code>/</code> and spell out the entire route from the top of the tree (e.g., <code>/var/log/syslog</code>).<br><strong>Relative paths</strong> start from wherever you are right now (e.g., <code>Documents/report.txt</code>).<br><br><strong>Special directory tokens:</strong><br>• <code>.</code> (Single dot) = Current directory.<br>• <code>..</code> (Double dot) = Parent directory (one level up).<br>• <code>~</code> (Tilde) = Current user's home directory (<code>/home/student</code>).<br>• <code>-</code> (Dash) = Previous directory you were in (like a back button).",
    syntax: "pwd\ncd [DIRECTORY]\nls [OPTIONS] [PATH]",
    examples: [
      { cmd: "pwd", note: "Print the current working directory coordinates." },
      { cmd: "cd /etc", note: "Change directory to the system configuration folder (absolute path)." },
      { cmd: "cd ..", note: "Step up one level to the parent directory." },
      { cmd: "cd ~", note: "Jump straight back home." }
    ],
    expectedOutput: `/home/student`,
    mistakes: [
      "Typing 'cd /Documents' instead of 'cd Documents' (adding a leading slash looks in root / instead of home).",
      "Forgetting that Linux paths and filenames are strictly case-sensitive ('Docs' is not 'docs')."
    ],
    safetyTips: [
      "Always run 'pwd' before executing deletion or file move commands so you know exactly where you are.",
      "Use the TAB key to autocomplete directory names to prevent spelling errors."
    ],
    practiceCmd: "pwd",
    practiceDesc: "Verify your current directory location in the simulated filesystem."
  },
  {
    id: 4,
    title: "4. File and Directory Management",
    shortDesc: "Creating, copying, moving, viewing, and safely removing files and folders.",
    category: "Files",
    duration: "25 mins",
    intro: "In Linux, 'everything is a file'. Understanding how to create, inspect, copy, rename, and remove files and directories is the foundation of day-to-day command line competence.",
    objectives: [
      "Create zero-byte files with touch and nested directory structures with mkdir -p.",
      "Inspect file contents using cat, head, and tail.",
      "Safely copy (cp) and relocate/rename (mv) files and folders.",
      "Understand why CLI deletion (rm) is permanent and how to use -i defensively."
    ],
    explanation: "Common core utilities include:<br>• <code>touch filename</code>: Creates an empty file or updates timestamps.<br>• <code>mkdir -p path/to/dir</code>: Creates directories, including parent paths if missing.<br>• <code>cat filename</code>: Dumps entire file content to stdout.<br>• <code>head -n 5 file</code>: Shows the first 5 lines.<br>• <code>tail -n 5 file</code>: Shows the last 5 lines.<br>• <code>cp -r src dest</code>: Copies files (use <code>-r</code> for folders).<br>• <code>mv src dest</code>: Moves or renames files.<br>• <code>rm -i file</code>: Deletes files permanently. There is NO Recycle Bin in the Linux CLI!",
    syntax: "touch FILE...\nmkdir [-p] DIRECTORY...\ncp [-r] [-i] SOURCE DEST\nmv [-i] SOURCE DEST\nrm [-r] [-i] TARGET...",
    examples: [
      { cmd: "mkdir -p workspace/project1", note: "Create nested directory tree." },
      { cmd: "touch workspace/project1/app.py", note: "Create an empty Python file." },
      { cmd: "cp workspace/project1/app.py workspace/project1/app_backup.py", note: "Duplicate the file." },
      { cmd: "cat /etc/hostname", note: "Print the computer's hostname file." }
    ],
    expectedOutput: `linuxlearn`,
    mistakes: [
      "Omitting -r when copying or deleting directories with cp or rm.",
      "Accidentally overwriting an existing file with mv or cp without using the -i flag."
    ],
    safetyTips: [
      "CLI deletion with 'rm' unlinks inodes immediately. Data recovery is extremely difficult or impossible.",
      "Always alias rm to 'rm -i' or explicitly type '-i' so Linux asks you for confirmation."
    ],
    practiceCmd: "cat notes.txt",
    practiceDesc: "Read the contents of the student notes file in your home folder."
  },
  {
    id: 5,
    title: "5. File Permissions",
    shortDesc: "POSIX permission model, read/write/execute bits, octal math (755, 644), and chmod.",
    category: "Security",
    duration: "25 mins",
    intro: "Linux was designed from day one as a multi-user operating system. The POSIX file permission system prevents unauthorized users, rogue processes, and network services from reading or tampering with confidential files.",
    objectives: [
      "Interpret the 10-character permission string (e.g., -rwxr-xr-x) from ls -l.",
      "Identify the three triads: Owner (User), Group, and Others (World).",
      "Calculate octal permissions: Read = 4, Write = 2, Execute = 1.",
      "Understand why chmod 777 is a severe security vulnerability."
    ],
    explanation: "Running <code>ls -l</code> displays a permission mode such as <code>-rwxr-xr--</code>:<br>• 1st char: File type (<code>-</code> for regular file, <code>d</code> for directory).<br>• Characters 2-4: <strong>Owner (u)</strong> permissions.<br>• Characters 5-7: <strong>Group (g)</strong> permissions.<br>• Characters 8-10: <strong>Others (o)</strong> permissions.<br><br><strong>Octal Bit Values:</strong><br>• <code>r</code> (Read) = 4<br>• <code>w</code> (Write) = 2<br>• <code>x</code> (Execute) = 1<br><br><strong>Common Configurations:</strong><br>• <code>chmod 755 script.sh</code> = Owner: 7 (rwx), Group: 5 (r-x), Others: 5 (r-x). Standard for scripts.<br>• <code>chmod 644 document.txt</code> = Owner: 6 (rw-), Group: 4 (r--), Others: 4 (r--). Standard for documents.<br>• <code>chmod 600 id_rsa</code> = Owner: 6 (rw-), Group: 0 (---), Others: 0 (---). Confidential private keys.",
    syntax: "chmod [OPTIONS] MODE FILE...\nchmod [u/g/o/a][+/-/=][r/w/x] FILE...",
    examples: [
      { cmd: "chmod 755 notes.txt", note: "Set owner full, group/others read and execute." },
      { cmd: "chmod 600 notes.txt", note: "Make file strictly private to active owner only." },
      { cmd: "ls -la notes.txt", note: "Verify updated mode bits." }
    ],
    expectedOutput: `-rw-r--r-- 1 student student 142 Nov 02 10:00 notes.txt`,
    mistakes: [
      "Running 'chmod 777' on files to quickly fix permission errors (this exposes files to all users and breaks SSH).",
      "Confusing directory execute permissions: directories REQUIRE 'x' to allow users to cd into them!"
    ],
    safetyTips: [
      "Follow the Principle of Least Privilege: grant only the minimum permissions necessary for code to run.",
      "Never chmod 777 system directories like /etc or /var; daemons will refuse to run on insecure configs."
    ],
    practiceCmd: "chmod 755 notes.txt",
    practiceDesc: "Change the permissions of notes.txt to 755 (rwxr-xr-x)."
  },
  {
    id: 6,
    title: "6. Users and Groups",
    shortDesc: "User IDs (UID), groups (GID), /etc/passwd, the root superuser, and sudo.",
    category: "Security",
    duration: "20 mins",
    intro: "Every process running on a Linux system is bound to a specific user and group. Understanding accounts, UIDs, and controlled elevation through sudo is essential for secure system administration.",
    objectives: [
      "Examine user accounts and group memberships via whoami, id, and /etc/passwd.",
      "Understand the supreme privileges and catastrophic risks of the root superuser (UID 0).",
      "Apply the Principle of Least Privilege using sudo rather than logging in as root.",
      "Learn how sudoers logging audits administrative actions."
    ],
    explanation: "Linux tracks accounts by numbers:<br>• <code>root</code> always has <strong>UID 0</strong> and possesses unrestricted access to hardware, kernel memory, and files.<br>• Normal users (e.g. <code>student</code>) typically start at UID 1000.<br><br>The file <code>/etc/passwd</code> lists all user accounts, shells, and home directories. <code>/etc/group</code> defines which users belong to groups like <code>sudo</code> or <code>docker</code>.<br><br><strong>Why sudo exists:</strong> Running as root all day is dangerous. One typo can delete the system. <code>sudo</code> (SuperUser DO) allows authorized users to run a single command with root privileges, leaving an audit log in <code>/var/log/auth.log</code>.",
    syntax: "whoami\nid [USER]\nsudo COMMAND",
    examples: [
      { cmd: "whoami", note: "Display active effective username." },
      { cmd: "cat /etc/passwd", note: "Inspect system user database." },
      { cmd: "sudo apt update", note: "Run an administrative update safely through sudo." }
    ],
    expectedOutput: `student:x:1000:1000:Student User:/home/student:/bin/bash`,
    mistakes: [
      "Typing 'sudo' in front of every single command out of habit.",
      "Leaving root shells ('sudo -i' or 'su') open unattended."
    ],
    safetyTips: [
      "Only prefix commands with 'sudo' when the command strictly requires system-level privileges.",
      "Double-check arguments carefully before pressing Enter on any sudo command."
    ],
    practiceCmd: "cat /etc/passwd",
    practiceDesc: "Inspect the system user accounts registered in /etc/passwd."
  },
  {
    id: 7,
    title: "7. Process Management",
    shortDesc: "Process IDs (PID), ps, top, signals (SIGTERM, SIGKILL), and process control.",
    category: "System",
    duration: "22 mins",
    intro: "Whenever a program or command runs in Linux, the kernel creates an instance called a Process with a unique Process ID (PID). Process management allows you to monitor CPU and memory usage and terminate runaway tasks.",
    objectives: [
      "View active system processes using ps and top/htop.",
      "Understand Process IDs (PIDs) and Parent Process IDs (PPIDs).",
      "Differentiate between graceful termination (SIGTERM 15) and forced termination (SIGKILL 9).",
      "Control background (&) and foreground (fg) terminal jobs."
    ],
    explanation: "Key process tools:<br>• <code>ps</code>: Snapshot of processes running in the current terminal session.<br>• <code>ps aux</code>: Comprehensive view of every process running on the entire system.<br>• <code>top</code>: Interactive real-time dashboard displaying CPU load, memory usage, and top processes.<br>• <code>kill [PID]</code>: Sends a signal to a process. By default, it sends <strong>SIGTERM (15)</strong>, politely asking the application to save data and cleanly exit.<br>• <code>kill -9 [PID]</code>: Sends <strong>SIGKILL (9)</strong>, which forces the kernel to instantly terminate the process without cleanup.",
    syntax: "ps [OPTIONS]\ntop\nkill [-SIGNAL] PID...",
    examples: [
      { cmd: "ps", note: "List processes associated with the active terminal." },
      { cmd: "ps aux", note: "View all active system processes." },
      { cmd: "kill -15 1289", note: "Politely terminate PID 1289." }
    ],
    expectedOutput: `  PID TTY          TIME CMD
  412 tty1     00:00:00 bash
 1289 tty1     00:00:00 ps`,
    mistakes: [
      "Reaching for 'kill -9' immediately instead of trying 'kill -15' (SIGTERM) first.",
      "Accidentally killing essential system daemons or PID 1 (init/systemd)."
    ],
    safetyTips: [
      "Always verify the target PID using 'ps' or 'pgrep' before executing 'kill'.",
      "Never run kill -9 on databases or active write tasks, as it can cause database corruption."
    ],
    practiceCmd: "ps",
    practiceDesc: "Check the active processes running in your current terminal session."
  },
  {
    id: 8,
    title: "8. Networking Commands",
    shortDesc: "Network diagnostics, IP configuration, ping, curl, and network inspection.",
    category: "Network",
    duration: "22 mins",
    intro: "Modern Linux systems rarely operate in isolation. They serve web APIs, connect to microservices, and route internet traffic. CLI networking tools allow developers and sysadmins to diagnose connectivity, query DNS, and test HTTP endpoints.",
    objectives: [
      "Test network reachability and packet latency using ping.",
      "Fetch data, test REST APIs, and download files using curl.",
      "Inspect network interfaces and IP addresses using ip a.",
      "Examine open listening ports and active sockets using ss or netstat."
    ],
    explanation: "Essential networking utilities:<br>• <code>ping [-c count] host</code>: Sends ICMP Echo Request packets to test whether a remote server is reachable and measures Round Trip Time (RTT).<br>• <code>curl URL</code>: Command-line HTTP/HTTPS client to inspect web pages, query REST APIs, and download payloads.<br>• <code>ip a</code>: Displays active network interfaces, MAC addresses, and assigned IPv4/IPv6 addresses.<br>• <code>ss -tuln</code>: Modern replacement for netstat; shows TCP/UDP sockets listening on local ports.",
    syntax: "ping [-c COUNT] HOST\ncurl [OPTIONS] URL\nip [OBJECT] [COMMAND]",
    examples: [
      { cmd: "ping -c 3 localhost", note: "Send 3 ICMP ping packets to loopback interface." },
      { cmd: "curl -I https://example.com", note: "Fetch HTTP response headers only without body." },
      { cmd: "ip a", note: "Show network interfaces and IP addresses." }
    ],
    expectedOutput: `PING localhost (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.039 ms`,
    mistakes: [
      "Running 'ping' in Linux without the '-c' flag (unlike Windows, Linux pings indefinitely until you press Ctrl+C).",
      "Piping uninspected curl downloads straight into bash: 'curl URL | bash' (huge security risk!)."
    ],
    safetyTips: [
      "Always save remote scripts to disk and inspect them with 'cat' or 'less' before running them.",
      "Be respectful when testing ping and curl against external production servers to avoid getting IP-blocked."
    ],
    practiceCmd: "ping -c 3 localhost",
    practiceDesc: "Test loopback network connectivity using ping with 3 packets."
  },
  {
    id: 9,
    title: "9. Package Management",
    shortDesc: "Software repositories, apt, package lifecycles, and secure installation practices.",
    category: "System",
    duration: "20 mins",
    intro: "Rather than downloading random installer .exe files from search engines, Linux distributions use centralized, cryptographically signed Package Repositories. The package manager resolves dependencies, installs binaries, and handles security patches automatically.",
    objectives: [
      "Understand the difference between updating package lists and upgrading packages.",
      "Use apt to search for, install, inspect, and remove software packages.",
      "Recognize the role of cryptographic GPG signatures in repository trust.",
      "Safely remove orphaned dependencies using apt autoremove."
    ],
    explanation: "On Debian and Ubuntu, the standard tool is <strong>APT (Advanced Package Tool)</strong>:<br>• <code>sudo apt update</code>: Refreshes the local index of available software packages and versions from remote mirrors. Does NOT install anything.<br>• <code>sudo apt upgrade</code>: Installs newer versions of all currently installed packages.<br>• <code>sudo apt install package</code>: Resolves dependencies, downloads .deb archives, and installs the software.<br>• <code>sudo apt remove package</code>: Uninstalls the software binary while preserving config files.<br>• <code>sudo apt purge package</code>: Uninstalls the software AND deletes all configuration files.<br>• <code>apt search keyword</code>: Searches repositories for packages matching the query.",
    syntax: "sudo apt update\nsudo apt upgrade [-y]\nsudo apt install PACKAGE\nsudo apt remove PACKAGE",
    examples: [
      { cmd: "sudo apt update", note: "Refresh repository package index lists." },
      { cmd: "apt search nginx", note: "Search for available web server packages." },
      { cmd: "sudo apt install -y htop", note: "Install interactive process viewer non-interactively." }
    ],
    expectedOutput: `Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
Fetched 126 kB in 1s (115 kB/s)
Reading package lists... Done`,
    mistakes: [
      "Running 'apt install' before running 'apt update' on newly deployed servers (may fail with 404 Not Found).",
      "Adding unverified third-party PPAs or repositories without checking their maintainer reputation."
    ],
    safetyTips: [
      "Keep production servers patched regularly against CVE vulnerabilities using security updates.",
      "Always review the list of packages apt plans to remove before pressing 'Y'."
    ],
    practiceCmd: "sudo apt update",
    practiceDesc: "Simulate refreshing system package repositories."
  },
  {
    id: 10,
    title: "10. Shell Scripting",
    shortDesc: "Bash scripts, the Shebang line, variables, control flow, and defensive scripting.",
    category: "Automation",
    duration: "25 mins",
    intro: "Shell scripting transforms individual terminal commands into powerful automated programs. Writing scripts allows software engineers to automate builds, deploy applications, configure cloud instances, and manage system backups reliably.",
    objectives: [
      "Write a basic executable Bash script starting with the Shebang (#!/bin/bash).",
      "Use shell variables, positional parameters ($1, $2), and quotes correctly.",
      "Understand conditionals (if/else) and exit status codes ($?).",
      "Apply defensive scripting standards: 'set -euo pipefail'."
    ],
    explanation: "A shell script is a plain text file containing a sequence of commands.<br><br><strong>Key Components:</strong><br>• <strong>Shebang:</strong> <code>#!/bin/bash</code> on the very first line tells the kernel which interpreter to execute.<br>• <strong>Executable bit:</strong> Scripts must have execute permissions (<code>chmod +x script.sh</code>).<br>• <strong>Variables:</strong> Assigned without spaces (<code>NAME=\"Linux\"</code>), referenced with dollar sign (<code>$NAME</code>).<br>• <strong>Defensive Header:</strong> Professional scripts include <code>set -euo pipefail</code>:<br>&nbsp;&nbsp;- <code>-e</code>: Exit immediately if any command fails.<br>&nbsp;&nbsp;- <code>-u</code>: Treat unset variables as an error.<br>&nbsp;&nbsp;- <code>-o pipefail</code>: Return error code if any step in a pipeline fails.",
    syntax: "#!/bin/bash\nset -euo pipefail\n\nVARIABLE=\"value\"\necho \"Value is: $VARIABLE\"",
    examples: [
      { cmd: "echo '#!/bin/bash' > test.sh", note: "Write the shebang header." },
      { cmd: "echo 'echo Hello, Linux!' >> test.sh", note: "Append command to script." },
      { cmd: "chmod +x test.sh", note: "Make script executable." },
      { cmd: "cat test.sh", note: "Inspect written script." }
    ],
    expectedOutput: `#!/bin/bash
echo Hello, Linux!`,
    mistakes: [
      "Adding spaces around the equals sign when assigning variables: 'FOO = bar' fails with command not found.",
      "Failing to quote variables containing spaces: always write \"$FILE\" rather than $FILE."
    ],
    safetyTips: [
      "Always test scripts with small sample datasets before running them on production directories.",
      "Use 'bash -n script.sh' to check syntax without executing commands."
    ],
    practiceCmd: "cat /home/student/.bashrc",
    practiceDesc: "Inspect the default Bash startup script in your home directory."
  },
  {
    id: 11,
    title: "11. Linux Security",
    shortDesc: "Defense in depth, SSH keys, UFW firewalls, file integrity, and log analysis.",
    category: "Security",
    duration: "22 mins",
    intro: "Security in Linux is built on defense in depth. From disabling root password logins and configuring host firewalls to inspecting authentication logs, learning defensive practices protects servers from internet attacks.",
    objectives: [
      "Understand the Linux defense-in-depth model across network, system, and file layers.",
      "Replace password authentication with Ed25519/RSA SSH cryptographic key pairs.",
      "Manage firewall rules using UFW (Uncomplicated Firewall).",
      "Audit security events in /var/log/auth.log and /var/log/syslog."
    ],
    explanation: "Core security layers:<br>• <strong>SSH Hardening:</strong> Disable direct root login (<code>PermitRootLogin no</code> in <code>/etc/ssh/sshd_config</code>) and enforce public key authentication.<br>• <strong>Host Firewall (UFW):</strong> Default to blocking incoming traffic while allowing only required ports:<br>&nbsp;&nbsp;<code>sudo ufw default deny incoming</code><br>&nbsp;&nbsp;<code>sudo ufw allow 22/tcp</code> (SSH)<br>&nbsp;&nbsp;<code>sudo ufw allow 80,443/tcp</code> (Web)<br>&nbsp;&nbsp;<code>sudo ufw enable</code><br>• <strong>Log Auditing:</strong> Inspect <code>/var/log/auth.log</code> to spot brute-force SSH attacks or unauthorized sudo attempts.",
    syntax: "sudo ufw status\nhead -n 10 /var/log/auth.log",
    examples: [
      { cmd: "head -n 5 /var/log/auth.log", note: "View authentication audit log entries." },
      { cmd: "grep student /var/log/auth.log", note: "Search for login sessions by user student." }
    ],
    expectedOutput: `Nov 02 09:30:11 linuxlearn login[412]: pam_unix(login:session): session opened for user student by (uid=0)`,
    mistakes: [
      "Enabling a firewall on a remote cloud server without first allowing the SSH port (locking yourself out!).",
      "Sharing or committing private SSH keys (id_rsa or id_ed25519) to GitHub repositories."
    ],
    safetyTips: [
      "Your private key (~/.ssh/id_ed25519) must NEVER leave your local machine (permissions must be 600).",
      "Regularly review who belongs to the 'sudo' group in /etc/group."
    ],
    practiceCmd: "head -n 5 /var/log/auth.log",
    practiceDesc: "Audit recent authentication events in the system security log."
  },
  {
    id: 12,
    title: "12. Safe Command-Line Practices",
    shortDesc: "Defensive habits, blast radius analysis, avoiding wildcard traps, and VM isolation.",
    category: "Safety",
    duration: "25 mins",
    intro: "The terminal has no confirmation dialogs. If you tell Linux to delete your entire hard drive, it will execute the instruction silently and instantly. Safe command-line habits separate professional system administrators from amateurs.",
    objectives: [
      "Analyze the blast radius of commands before pressing Enter.",
      "Identify the fatal wildcard space trap: 'rm -rf /dir/ *' vs 'rm -rf /dir/*'.",
      "Use defensive flags (-i, -n) and verify targets with ls first.",
      "Practice high-risk system administration exclusively inside isolated virtual machines."
    ],
    explanation: "<strong>The Golden Rules of Safe Linux Command Line:</strong><br><br>1. <strong>Inspect Before Deleting:</strong> Before running <code>rm *.log</code>, run <code>ls *.log</code> first to see exactly which files match the wildcard pattern.<br>2. <strong>The Wildcard Space Trap:</strong> Typing <code>rm -rf /tmp/build/ *</code> with an accidental space tells Linux to delete <code>/tmp/build/</code> AND THEN delete EVERY file in your current working directory!<br>3. <strong>Defensive Shell Aliases:</strong> Add <code>alias rm='rm -i'</code>, <code>alias cp='cp -i'</code>, and <code>alias mv='mv -i'</code> to your <code>~/.bashrc</code>.<br>4. <strong>The Isolation Imperative:</strong> Never experiment with disk formatting (mkfs), raw disk copying (dd), or root permissions on your primary workstation. Use an Oracle VirtualBox VM or WSL2 instance with snapshots.",
    syntax: "rm -i [TARGET]\nls [WILDCARD_PATTERN]\ncp -i SOURCE DEST",
    examples: [
      { cmd: "cat ~/.bashrc", note: "Inspect defensive command aliases configured in bashrc." },
      { cmd: "rm -i notes.txt", note: "Simulate interactive deletion prompt." }
    ],
    expectedOutput: `# ~/.bashrc: executed by bash(1) for non-login shells.
alias ll='ls -la'
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'`,
    mistakes: [
      "Running 'rm -rf' when a simple 'rm' or 'rmdir' would have sufficed.",
      "Relying on external AI code snippets without inspecting every flag against 'man' documentation."
    ],
    safetyTips: [
      "Take a snapshot of your Virtual Machine before experimenting with kernel modules or permission resets.",
      "Memorize the 10-point command safety checklist in the Safety Center."
    ],
    practiceCmd: "cat ~/.bashrc",
    practiceDesc: "Inspect safe command aliases in your personal bash configuration."
  }
];

const LessonsController = {
  activeLessonId: 1,

  init() {
    this.renderSidebar();
    this.renderActiveLesson();
  },

  renderSidebar() {
    const list = document.getElementById('lessons-module-list');
    if (!list) return;

    const completedLessons = App.state.completedLessons || [];

    list.innerHTML = LESSONS_DATA.map(lesson => {
      const isCompleted = completedLessons.includes(lesson.id);
      const isActive = lesson.id === this.activeLessonId;
      return `
        <div class="module-item ${isActive ? 'active' : ''}" onclick="LessonsController.selectLesson(${lesson.id})">
          <span class="module-num">#${lesson.id}</span>
          <div class="module-info" style="flex:1">
            <h5>${lesson.title}</h5>
            <p>${lesson.duration} • ${lesson.category}</p>
          </div>
          ${isCompleted ? '<span style="color: var(--color-success); font-weight: 700;">✓</span>' : ''}
        </div>
      `;
    }).join('');
  },

  selectLesson(id) {
    this.activeLessonId = id;
    this.renderSidebar();
    this.renderActiveLesson();
  },

  renderActiveLesson() {
    const container = document.getElementById('lesson-detail-container');
    if (!container) return;

    const lesson = LESSONS_DATA.find(l => l.id === this.activeLessonId);
    if (!lesson) return;

    const isCompleted = (App.state.completedLessons || []).includes(lesson.id);

    const examplesHtml = lesson.examples.map(ex => `
      <div style="background: var(--bg-tertiary); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 6px; font-family: var(--font-mono); font-size: 12px; display: flex; justify-content: space-between; align-items: center;">
        <code>${App.escapeHtml(ex.cmd)}</code>
        <span style="font-family: var(--font-sans); font-size: 11px; color: var(--text-muted);">${ex.note}</span>
      </div>
    `).join('');

    const objectivesHtml = lesson.objectives.map(obj => `<li>${obj}</li>`).join('');
    const mistakesHtml = lesson.mistakes.map(m => `<li>${m}</li>`).join('');
    const safetyHtml = lesson.safetyTips.map(s => `<li>${s}</li>`).join('');

    container.innerHTML = `
      <div class="lesson-header">
        <div>
          <span class="badge badge-info">${lesson.category}</span>
          <span class="badge" style="background: var(--bg-tertiary); color: var(--text-muted); margin-left: 8px;">${lesson.duration}</span>
          <h2 style="font-size: 22px; font-weight: 700; margin-top: 8px; color: #fff;">${lesson.title}</h2>
          <p style="color: var(--text-secondary); font-size: 13px;">${lesson.shortDesc}</p>
        </div>
        <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}" onclick="LessonsController.toggleComplete(${lesson.id})">
          ${isCompleted ? '✓ Completed' : 'Mark as Completed'}
        </button>
      </div>

      <div class="lesson-body">
        
        <!-- 1. Topic Introduction -->
        <div class="lesson-section">
          <h4>📌 1. Topic Introduction</h4>
          <p>${lesson.intro}</p>
        </div>

        <!-- 2. Learning Objectives -->
        <div class="lesson-section">
          <h4>🎯 2. Learning Objectives</h4>
          <ul style="margin-left: 20px; line-height: 1.8;">
            ${objectivesHtml}
          </ul>
        </div>

        <!-- 3. Simple Explanations -->
        <div class="lesson-section">
          <h4>📖 3. Simple Explanations</h4>
          <p>${lesson.explanation}</p>
        </div>

        <!-- 4. Linux Syntax -->
        <div class="lesson-section">
          <h4>💻 4. Linux Syntax</h4>
          <pre class="lesson-code-block">${App.escapeHtml(lesson.syntax)}</pre>
        </div>

        <!-- 5. Practical Examples -->
        <div class="lesson-section">
          <h4>⚡ 5. Practical Examples</h4>
          ${examplesHtml}
        </div>

        <!-- 6. Expected Output -->
        <div class="lesson-section">
          <h4>🖥️ 6. Expected Output</h4>
          <pre class="lesson-code-block terminal-preview">${App.escapeHtml(lesson.expectedOutput)}</pre>
        </div>

        <!-- 7. Common Mistakes -->
        <div class="lesson-section">
          <h4>⚠️ 7. Common Mistakes to Avoid</h4>
          <ul style="margin-left: 20px; line-height: 1.8; color: #ff7b72;">
            ${mistakesHtml}
          </ul>
        </div>

        <!-- 8. Safety Tips -->
        <div class="lesson-section">
          <h4>🛡️ 8. Essential Safety Tips</h4>
          <ul style="margin-left: 20px; line-height: 1.8; color: #7ee787;">
            ${safetyHtml}
          </ul>
        </div>

        <!-- 9. Practice Activity -->
        <div class="lesson-section practice-box">
          <div style="flex: 1;">
            <h4 style="color: var(--accent-primary); margin-bottom: 4px;">🧪 9. Interactive Practice Activity</h4>
            <p style="font-size: 13px; color: var(--text-primary);">${lesson.practiceDesc}</p>
            <code style="display: inline-block; margin-top: 6px; background: rgba(0,0,0,0.4); padding: 4px 8px; border-radius: 4px; color: #79c0ff; font-family: var(--font-mono);">${lesson.practiceCmd}</code>
          </div>
          <button class="btn btn-accent" onclick="LinuxTerminal.executeAndSwitch('${lesson.practiceCmd.replace(/'/g, "\\'")}')">
            Try in Terminal ⌨️
          </button>
        </div>

      </div>

      <!-- Navigation Footer -->
      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between;">
        <button class="btn btn-secondary btn-sm" ${lesson.id === 1 ? 'disabled style="opacity:0.4"' : ''} onclick="LessonsController.selectLesson(${lesson.id - 1})">
          ← Previous Lesson
        </button>
        <button class="btn btn-accent btn-sm" ${lesson.id === LESSONS_DATA.length ? 'disabled style="opacity:0.4"' : ''} onclick="LessonsController.selectLesson(${lesson.id + 1})">
          Next Lesson →
        </button>
      </div>
    `;
  },

  toggleComplete(id) {
    let completed = App.state.completedLessons || [];
    if (completed.includes(id)) {
      completed = completed.filter(i => i !== id);
      App.showToast("Lesson marked incomplete", "info");
    } else {
      completed.push(id);
      App.showToast("Lesson completed! +20 XP", "success");
      App.logActivity('lesson', `Completed Lesson #${id}: ${LESSONS_DATA.find(l => l.id === id)?.title}`);
      App.incrementDailyGoal();
    }
    App.state.completedLessons = completed;
    App.saveState();
    this.renderSidebar();
    this.renderActiveLesson();
    App.updateDashboardStats();
  }
};
