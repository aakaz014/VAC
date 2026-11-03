/**
 * LinuxLearn AI - Master Application Controller
 * Handles Navigation, State Management, LocalStorage, Toasts & Data Models
 * Satisfies Capstone 70 Academic Project Requirements
 */

// Comprehensive Command Library Reference Data (40 Commands with Difficulty)
const COMMAND_LIBRARY_DATA = [
  {
    name: "pwd",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "pwd [-L | -P]",
    desc: "Print Working Directory",
    explanation: "Prints the full absolute path of the current working directory to standard output. Solves navigation disorientation in complex directory structures.",
    example: "pwd",
    expectedOutput: "/home/student",
    safetyNotes: "Completely safe read-only operation. Cannot alter system state.",
    commonMistakes: "Confusing with 'passwd' (which changes user password).",
    flags: [
      { flag: "-L", desc: "Print logical path (follow symbolic links)." },
      { flag: "-P", desc: "Print physical path without symbolic links." }
    ]
  },
  {
    name: "whoami",
    category: "Identity",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "whoami",
    desc: "Print effective user ID",
    explanation: "Displays the username associated with the active effective user ID. Essential before executing administrative tasks to know if you are unprivileged or root.",
    example: "whoami",
    expectedOutput: "student",
    safetyNotes: "Completely safe read-only query.",
    commonMistakes: "Typing 'who am i' with spaces (which invokes the distinct 'who' utility).",
    flags: []
  },
  {
    name: "ls",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "ls [OPTION]... [FILE]...",
    desc: "List directory contents",
    explanation: "Lists information about files in the current directory or specified path, including permissions, owner, size, and modification timestamp.",
    example: "ls -lah",
    expectedOutput: "drwxr-xr-x 2 student student 4.0K Nov 02 10:00 Documents\n-rw-r--r-- 1 student student  142 Nov 02 10:00 notes.txt",
    safetyNotes: "Safe read-only operation.",
    commonMistakes: "Expecting hidden files without adding the -a flag.",
    flags: [
      { flag: "-l", desc: "Use long listing format showing mode bits, owner, size, and date." },
      { flag: "-a", desc: "Do not ignore entries starting with . (show hidden files)." },
      { flag: "-h", desc: "With -l, print sizes in human readable format (e.g., 1K 234M 2G)." },
      { flag: "-R", desc: "Recursively list directory sub-trees." }
    ]
  },
  {
    name: "cd",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "cd [DIR]",
    desc: "Change working directory",
    explanation: "Shell builtin that updates the current working coordinate in the filesystem hierarchy.",
    example: "cd ~/Documents",
    expectedOutput: "(Silent execution; prompt updates to ~/Documents)",
    safetyNotes: "Safe navigation. Cannot delete or modify file contents.",
    commonMistakes: "Confusing relative path 'docs' with root absolute '/docs'.",
    flags: [
      { flag: "~", desc: "Shortcut to user home directory." },
      { flag: "..", desc: "Step up one directory level to parent." },
      { flag: "-", desc: "Switch back to the previous working directory." }
    ]
  },
  {
    name: "mkdir",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "mkdir [OPTION]... DIRECTORY...",
    desc: "Make directories",
    explanation: "Creates new directory nodes in the filesystem tree. With -p, creates missing parent directories recursively.",
    example: "mkdir -p projects/lab1/src",
    expectedOutput: "(Silent execution; folders created)",
    safetyNotes: "Safe; never deletes or overwrites existing data.",
    commonMistakes: "Omitting -p when creating nested directory structures.",
    flags: [
      { flag: "-p", desc: "Create parent directories as needed, no error if existing." },
      { flag: "-v", desc: "Print a message for each created directory." }
    ]
  },
  {
    name: "touch",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "touch [OPTION]... FILE...",
    desc: "Change file timestamps / create empty files",
    explanation: "Updates access and modification timestamps of files. If the target file does not exist, an empty 0-byte file is created.",
    example: "touch main.c",
    expectedOutput: "(Silent execution; empty file created)",
    safetyNotes: "Safe file creation tool.",
    commonMistakes: "Expecting touch to launch an interactive text editor.",
    flags: [
      { flag: "-a", desc: "Change only the access time." },
      { flag: "-m", desc: "Change only the modification time." }
    ]
  },
  {
    name: "cat",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "cat [OPTION]... [FILE]...",
    desc: "Concatenate and print files",
    explanation: "Outputs entire sequential file content to terminal standard output (stdout).",
    example: "cat notes.txt",
    expectedOutput: "Linux Learning Checklist:\n1. Always verify whoami and pwd before running rm.",
    safetyNotes: "Safe read-only viewer.",
    commonMistakes: "Running cat on multi-gigabyte log files or compiled binary blobs.",
    flags: [
      { flag: "-n", desc: "Number all output lines starting from 1." },
      { flag: "-b", desc: "Number non-empty output lines only." }
    ]
  },
  {
    name: "head",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "head [OPTION]... [FILE]...",
    desc: "Output first part of files",
    explanation: "Prints the first n lines of the specified file (defaults to 10 lines).",
    example: "head -n 5 /etc/passwd",
    expectedOutput: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin",
    safetyNotes: "Safe read-only preview.",
    commonMistakes: "Typing '-5' instead of standard '-n 5'.",
    flags: [
      { flag: "-n K", desc: "Print the first K lines instead of default 10." }
    ]
  },
  {
    name: "tail",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "tail [OPTION]... [FILE]...",
    desc: "Output last part of files",
    explanation: "Prints the concluding lines of a file (defaults to 10 lines). In real Linux, -f monitors growing logs.",
    example: "tail -n 3 /etc/passwd",
    expectedOutput: "sync:x:4:65534:sync:/bin:/bin/sync\nstudent:x:1000:1000:Student User:/home/student:/bin/bash",
    safetyNotes: "Safe read-only viewer.",
    commonMistakes: "Leaving tail -f running indefinitely without pressing Ctrl+C.",
    flags: [
      { flag: "-n K", desc: "Output the last K lines instead of default 10." },
      { flag: "-f", desc: "Follow appended data as the file grows." }
    ]
  },
  {
    name: "echo",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "echo [SHORT-OPTION]... [STRING]...",
    desc: "Display a line of text",
    explanation: "Prints strings to terminal, or redirects text streams into files via > (overwrite) or >> (append).",
    example: "echo 'Hello Linux' > greeting.txt",
    expectedOutput: "(Silent; greeting.txt created)",
    safetyNotes: "Safe, but > overwrites existing destination files without warning.",
    commonMistakes: "Accidentally using > (overwrite) instead of >> (append).",
    flags: [
      { flag: "-e", desc: "Enable interpretation of backslash escapes (\\n, \\t)." },
      { flag: "-n", desc: "Do not output the trailing newline." }
    ]
  },
  {
    name: "cp",
    category: "Files",
    difficulty: "Intermediate",
    safety: "moderate",
    syntax: "cp [OPTION]... SOURCE... DEST",
    desc: "Copy files and directories",
    explanation: "Duplicates files or whole directory trees. Requires -r for directories. -i prompts before overwriting.",
    example: "cp -i source.txt dest.txt",
    expectedOutput: "(Silent when destination does not already exist)",
    safetyNotes: "Moderate: Can silently overwrite destination file if -i is omitted.",
    commonMistakes: "Omitting -r when copying directory trees.",
    flags: [
      { flag: "-r / -R", desc: "Copy directories recursively." },
      { flag: "-i", desc: "Prompt before overwrite (interactive)." },
      { flag: "-v", desc: "Explain what is being done (verbose)." }
    ]
  },
  {
    name: "mv",
    category: "Files",
    difficulty: "Intermediate",
    safety: "moderate",
    syntax: "mv [OPTION]... SOURCE... DEST",
    desc: "Move (rename) files",
    explanation: "Relocates or renames files and directories in the filesystem tree without duplicating data blocks.",
    example: "mv -i old_name.txt new_name.txt",
    expectedOutput: "(Silent execution)",
    safetyNotes: "Moderate: Can overwrite an existing destination file without warning.",
    commonMistakes: "Accidentally moving a file into the wrong folder due to typo.",
    flags: [
      { flag: "-i", desc: "Prompt before overwrite." },
      { flag: "-u", desc: "Move only when SOURCE is newer than destination." }
    ]
  },
  {
    name: "rm",
    category: "Safety",
    difficulty: "Intermediate",
    safety: "danger",
    syntax: "rm [OPTION]... [FILE]...",
    desc: "Remove files or directories",
    explanation: "Unlinks file inodes. There is NO Recycle Bin in the Linux command line! Deletion is permanent and immediate.",
    example: "rm -i document.txt",
    expectedOutput: "rm: remove regular file 'document.txt'?",
    safetyNotes: "HIGH DANGER: Deletion is permanent. Always use -i and avoid reckless wildcards.",
    commonMistakes: "Using -rf recklessly; inserting a space before wildcards ('rm /dir/ *').",
    flags: [
      { flag: "-i", desc: "Prompt before every removal (defensive)." },
      { flag: "-r / -R", desc: "Remove directories and their contents recursively." },
      { flag: "-f", desc: "Force removal without prompt or warning (dangerous!)." }
    ]
  },
  {
    name: "rmdir",
    category: "Safety",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "rmdir [OPTION]... DIRECTORY...",
    desc: "Remove empty directories",
    explanation: "Safely removes empty directories. Fails with an error if the directory contains any files or subfolders.",
    example: "rmdir empty_folder",
    expectedOutput: "(Silent execution; folder removed)",
    safetyNotes: "Safe: Never deletes files or non-empty trees.",
    commonMistakes: "Attempting to delete directories containing hidden dotfiles.",
    flags: [
      { flag: "-p", desc: "Remove DIRECTORY and its ancestors (e.g., rmdir -p a/b/c)." }
    ]
  },
  {
    name: "chmod",
    category: "Security",
    difficulty: "Intermediate",
    safety: "moderate",
    syntax: "chmod [OPTION]... MODE[,MODE]... FILE...",
    desc: "Change file mode bits (permissions)",
    explanation: "Updates POSIX read, write, and execute permissions for user, group, and others using octal or symbolic modes.",
    example: "chmod 755 run.sh",
    expectedOutput: "(Silent execution; mode bits updated)",
    safetyNotes: "Moderate: Setting 777 destroys multi-user security boundaries.",
    commonMistakes: "Indiscriminately using chmod 777 out of frustration.",
    flags: [
      { flag: "-R", desc: "Change files and directories recursively." },
      { flag: "755", desc: "rwxr-xr-x (User full, Group/Others read+exec)." },
      { flag: "644", desc: "rw-r--r-- (User read+write, Group/Others read-only)." },
      { flag: "600", desc: "rw------- (User read+write, Group/Others none)." }
    ]
  },
  {
    name: "chown",
    category: "Security",
    difficulty: "Intermediate",
    safety: "moderate",
    syntax: "chown [OPTION]... [OWNER][:[GROUP]] FILE...",
    desc: "Change file owner and group",
    explanation: "Changes the user and/or group ownership of files. Typically requires superuser (root) privileges.",
    example: "sudo chown student:student /opt/app",
    expectedOutput: "(Silent execution)",
    safetyNotes: "Moderate: Changing ownership of system directories breaks services.",
    commonMistakes: "Omitting the colon when trying to change both user and group.",
    flags: [
      { flag: "-R", desc: "Operate on files and directories recursively." }
    ]
  },
  {
    name: "grep",
    category: "Search",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "grep [OPTION]... PATTERNS [FILE]...",
    desc: "Print lines matching a pattern",
    explanation: "Searches text files or stdin streams for lines matching regular expressions and prints results.",
    example: "grep -n 'student' /etc/passwd",
    expectedOutput: "6:student:x:1000:1000:Student User:/home/student:/bin/bash",
    safetyNotes: "Safe read-only search utility.",
    commonMistakes: "Forgetting that grep is case-sensitive by default (use -i).",
    flags: [
      { flag: "-i", desc: "Ignore case distinctions in patterns and input data." },
      { flag: "-n", desc: "Prefix each line of output with its 1-based line number." },
      { flag: "-v", desc: "Invert match: select non-matching lines." },
      { flag: "-c", desc: "Print only a count of selected lines." }
    ]
  },
  {
    name: "find",
    category: "Search",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "find [path...] [expression]",
    desc: "Search for files in a directory hierarchy",
    explanation: "Recursively walks filesystem directory trees evaluating user-specified search criteria.",
    example: "find . -name '*.txt'",
    expectedOutput: "./notes.txt",
    safetyNotes: "Safe search utility.",
    commonMistakes: "Omitting quotes around wildcard names ('*.txt'), which causes shell glob expansion.",
    flags: [
      { flag: "-name PATTERN", desc: "Base of file name matches shell pattern." },
      { flag: "-type [f|d]", desc: "Filter by file type: f for file, d for directory." },
      { flag: "-size N", desc: "Filter files based on size." }
    ]
  },
  {
    name: "wc",
    category: "Text",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "wc [OPTION]... [FILE]...",
    desc: "Print newline, word, and byte counts",
    explanation: "Counts lines, words, and byte counts in specified files or pipeline inputs.",
    example: "wc -l /etc/passwd",
    expectedOutput: "7 /etc/passwd",
    safetyNotes: "Safe text analysis utility.",
    commonMistakes: "Confusing -l (line count) with -w (word count).",
    flags: [
      { flag: "-l", desc: "Print the newline counts." },
      { flag: "-w", desc: "Print the word counts." },
      { flag: "-c", desc: "Print the byte counts." }
    ]
  },
  {
    name: "clear",
    category: "System",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "clear",
    desc: "Clear terminal screen",
    explanation: "Clears the active terminal viewport buffer and positions prompt at top left.",
    example: "clear",
    expectedOutput: "(Terminal viewport resets cleanly)",
    safetyNotes: "Completely safe screen utility.",
    commonMistakes: "Thinking clear erased your files or environment variables.",
    flags: []
  },
  {
    name: "history",
    category: "System",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "history [n]",
    desc: "Display command history list",
    explanation: "Prints numbered list of commands previously entered in the active shell session.",
    example: "history",
    expectedOutput: "  1  whoami\n  2  pwd\n  3  ls -lah",
    safetyNotes: "Safe inspection utility.",
    commonMistakes: "Typing passwords in commands where history records them in plaintext.",
    flags: [
      { flag: "-c", desc: "Clear the history list by deleting all entries." }
    ]
  },
  {
    name: "man",
    category: "System",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "man [SECTION] COMMAND",
    desc: "Format and display manual pages",
    explanation: "The official authoritative reference manual system built into Linux.",
    example: "man ls",
    expectedOutput: "LS(1) User Commands LS(1)...",
    safetyNotes: "Safe documentation reader.",
    commonMistakes: "Forgetting to press 'q' to exit the manual pager.",
    flags: []
  },
  {
    name: "date",
    category: "System",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "date [OPTION]... [+FORMAT]",
    desc: "Print or set system date and time",
    explanation: "Displays the current system date and time in various formatting styles.",
    example: "date",
    expectedOutput: "Mon Nov 02 10:15:30 UTC 2026",
    safetyNotes: "Safe read-only query (requires root to change system clock).",
    commonMistakes: "Attempting to change time without sudo.",
    flags: []
  },
  {
    name: "cal",
    category: "System",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "cal [month] [year]",
    desc: "Display a calendar",
    explanation: "Displays a formatted monthly or yearly calendar in terminal.",
    example: "cal",
    expectedOutput: "    November 2026\nSu Mo Tu We Th Fr Sa\n 1  2  3  4  5  6  7...",
    safetyNotes: "Safe display utility.",
    commonMistakes: "Passing single digit years (cal 26 displays year 26 AD).",
    flags: []
  },
  {
    name: "uname",
    category: "System",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "uname [OPTION]...",
    desc: "Print system information",
    explanation: "Prints core operating system and kernel architecture information.",
    example: "uname -a",
    expectedOutput: "Linux linuxlearn 6.8.0-generic #40-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
    safetyNotes: "Safe read-only system query.",
    commonMistakes: "Running uname without flags (only prints 'Linux').",
    flags: [
      { flag: "-a", desc: "Print all information in specified sequence." },
      { flag: "-r", desc: "Print the kernel release version." }
    ]
  },
  {
    name: "ps",
    category: "Process",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "ps [OPTIONS]",
    desc: "Report a snapshot of the current processes",
    explanation: "Displays active processes running on the system with Process IDs (PID), terminal (TTY), and CPU time.",
    example: "ps",
    expectedOutput: "  PID TTY          TIME CMD\n  412 tty1     00:00:00 bash\n 1289 tty1     00:00:00 ps",
    safetyNotes: "Safe process inspection utility.",
    commonMistakes: "Typing ps without arguments and wondering why background daemons aren't listed (use 'ps aux').",
    flags: [
      { flag: "aux", desc: "Display all processes running across the entire system." },
      { flag: "-ef", desc: "Standard POSIX syntax for full process list." }
    ]
  },
  {
    name: "top",
    category: "Process",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "top",
    desc: "Display Linux processes in real time",
    explanation: "Interactive real-time monitoring tool showing CPU load averages, memory consumption, and top processes.",
    example: "top",
    expectedOutput: "top - 10:20:01 up 2 days, 1 user, load average: 0.12, 0.08, 0.02\nTasks: 182 total, 1 running...",
    safetyNotes: "Safe interactive monitoring tool.",
    commonMistakes: "Not knowing how to exit (press 'q' to quit).",
    flags: []
  },
  {
    name: "kill",
    category: "Process",
    difficulty: "Intermediate",
    safety: "moderate",
    syntax: "kill [-SIGNAL] PID...",
    desc: "Send a signal to a process",
    explanation: "Sends termination signals to processes by PID. Defaults to SIGTERM (15) for graceful exit.",
    example: "kill -15 1289",
    expectedOutput: "(Silent execution when signal delivered successfully)",
    safetyNotes: "Moderate: Killing wrong PID can disrupt services. Always verify PID with ps first.",
    commonMistakes: "Reaching for -9 (SIGKILL) immediately instead of trying -15 (SIGTERM) first.",
    flags: [
      { flag: "-15 (SIGTERM)", desc: "Graceful termination request allowing cleanup." },
      { flag: "-9 (SIGKILL)", desc: "Forced immediate termination by kernel (no cleanup)." }
    ]
  },
  {
    name: "df",
    category: "System",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "df [OPTION]... [FILE]...",
    desc: "Report file system disk space usage",
    explanation: "Displays the amount of available disk space on mounted filesystems.",
    example: "df -h",
    expectedOutput: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   14G   34G  30% /",
    safetyNotes: "Safe read-only storage query.",
    commonMistakes: "Omitting -h and having to read raw 1K block numbers.",
    flags: [
      { flag: "-h", desc: "Print sizes in human readable format (e.g., 1K 234M 2G)." }
    ]
  },
  {
    name: "du",
    category: "System",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "du [OPTION]... [FILE]...",
    desc: "Estimate file space usage",
    explanation: "Summarizes disk usage of each directory and sub-directory recursively.",
    example: "du -sh /home/student",
    expectedOutput: "4.2M    /home/student",
    safetyNotes: "Safe read-only disk usage inspection.",
    commonMistakes: "Running du on root / without -s, which prints hundreds of thousands of lines.",
    flags: [
      { flag: "-s", desc: "Display only a total summary for each argument." },
      { flag: "-h", desc: "Print sizes in human readable format." }
    ]
  },
  {
    name: "free",
    category: "System",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "free [OPTION]...",
    desc: "Display amount of free and used memory",
    explanation: "Displays total amount of free and used physical memory (RAM) and swap in the system.",
    example: "free -m",
    expectedOutput: "               total        used        free      shared  buff/cache   available\nMem:            7924        2140        3840         120        1944        5420",
    safetyNotes: "Safe read-only query.",
    commonMistakes: "Panicking about low 'free' memory without checking 'available' (Linux uses free RAM for disk cache).",
    flags: [
      { flag: "-m", desc: "Display the amount of memory in megabytes." },
      { flag: "-h", desc: "Show all output columns in human-readable units." }
    ]
  },
  {
    name: "ping",
    category: "Network",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "ping [OPTION]... HOST",
    desc: "Send ICMP ECHO_REQUEST to network hosts",
    explanation: "Tests network connectivity and measures round-trip latency to a local or remote network host.",
    example: "ping -c 3 localhost",
    expectedOutput: "PING localhost (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms...",
    safetyNotes: "Safe network utility.",
    commonMistakes: "Omitting -c count flag (in Linux ping runs continuously until Ctrl+C).",
    flags: [
      { flag: "-c COUNT", desc: "Stop after sending COUNT ECHO_REQUEST packets." }
    ]
  },
  {
    name: "curl",
    category: "Network",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "curl [options] [URL...]",
    desc: "Transfer data from or to a server",
    explanation: "Versatile CLI tool to transfer data using HTTP, HTTPS, FTP, and other protocols.",
    example: "curl -I https://example.com",
    expectedOutput: "HTTP/2 200\ncontent-type: text/html; charset=UTF-8\nserver: ECS...",
    safetyNotes: "Safe, BUT piping downloaded scripts into bash ('curl URL | bash') is a severe hazard.",
    commonMistakes: "Blindly piping curl output into sudo bash without inspecting code first.",
    flags: [
      { flag: "-I", desc: "Fetch HTTP response headers only." },
      { flag: "-o FILE", desc: "Write output to FILE instead of stdout." }
    ]
  },
  {
    name: "tar",
    category: "Files",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "tar [OPTION...] [FILE]...",
    desc: "Archive utility",
    explanation: "Creates, inspects, and extracts tape archive (.tar, .tar.gz) packages.",
    example: "tar -czvf backup.tar.gz ./projects",
    expectedOutput: "./projects/\n./projects/app.py",
    safetyNotes: "Safe archive manager.",
    commonMistakes: "Confusing creation (-c) with extraction (-x).",
    flags: [
      { flag: "-c", desc: "Create a new archive." },
      { flag: "-x", desc: "Extract files from an archive." },
      { flag: "-z", desc: "Filter the archive through gzip." },
      { flag: "-v", desc: "Verbosely list files processed." },
      { flag: "-f", desc: "Use archive file specified." }
    ]
  },
  {
    name: "gzip",
    category: "Files",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "gzip [OPTION]... [FILE]...",
    desc: "Compress or expand files",
    explanation: "Compresses files using Lempel-Ziv coding (LZ77). Replaces original file with a .gz file.",
    example: "gzip notes.txt",
    expectedOutput: "(Silent; notes.txt.gz created)",
    safetyNotes: "Safe compression tool.",
    commonMistakes: "Not realizing that gzip deletes the uncompressed original by default (use -k to keep).",
    flags: [
      { flag: "-d", desc: "Decompress .gz archive." },
      { flag: "-k", desc: "Keep (do not delete) input files during compression." }
    ]
  },
  {
    name: "diff",
    category: "Text",
    difficulty: "Intermediate",
    safety: "safe",
    syntax: "diff [OPTION]... FILES",
    desc: "Compare files line by line",
    explanation: "Analyzes two text files and outputs the line-by-line differences between them.",
    example: "diff file1.txt file2.txt",
    expectedOutput: "2c2\n< Hello World\n---\n> Hello Linux",
    safetyNotes: "Safe read-only comparison.",
    commonMistakes: "Passing directories without the -r flag.",
    flags: [
      { flag: "-u", desc: "Output NUM lines of unified context (standard diff format)." }
    ]
  },
  {
    name: "sudo",
    category: "Security",
    difficulty: "Intermediate",
    safety: "moderate",
    syntax: "sudo [-u user] command",
    desc: "Execute a command as another user (superuser)",
    explanation: "Enables authorized users to run a security-sensitive command with administrative privileges while logging the action.",
    example: "sudo apt update",
    expectedOutput: "[sudo] password for student: \nReading package lists... Done",
    safetyNotes: "Moderate: Grants root power. Double-check all arguments before executing.",
    commonMistakes: "Using sudo on basic commands (like cd, ls) where normal user permissions suffice.",
    flags: []
  },
  {
    name: "apt",
    category: "Package",
    difficulty: "Intermediate",
    safety: "moderate",
    syntax: "apt [OPTIONS] COMMAND [PACKAGE...]",
    desc: "Command-line package manager for Debian/Ubuntu",
    explanation: "Provides high-level CLI interface for package installation, upgrading, removal, and dependency resolution.",
    example: "sudo apt update",
    expectedOutput: "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nReading package lists... Done",
    safetyNotes: "Moderate: Upgrading or removing system packages alters OS libraries.",
    commonMistakes: "Running 'apt install' before running 'apt update' to refresh repository indices.",
    flags: [
      { flag: "update", desc: "Download package information from all configured sources." },
      { flag: "upgrade", desc: "Install available upgrades of all packages." },
      { flag: "install", desc: "Install one or more packages." },
      { flag: "remove", desc: "Remove packages." }
    ]
  },
  {
    name: "ssh",
    category: "Network",
    difficulty: "Advanced",
    safety: "safe",
    syntax: "ssh [options] [user@]hostname [command]",
    desc: "OpenSSH remote login client",
    explanation: "Connects to remote Linux servers securely over encrypted SSH tunnels for remote shell execution.",
    example: "ssh student@192.168.1.100",
    expectedOutput: "student@192.168.1.100's password: ",
    safetyNotes: "Safe client. Ensure private SSH keys (~/.ssh/id_rsa) have 600 permissions.",
    commonMistakes: "Exposing private keys or connecting to unknown hosts without checking fingerprints.",
    flags: [
      { flag: "-p PORT", desc: "Port to connect to on the remote host." },
      { flag: "-i KEYFILE", desc: "Select identity (private key) file." }
    ]
  },
  {
    name: "tree",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    syntax: "tree [OPTIONS] [DIRECTORY]",
    desc: "List contents of directories in a tree-like format",
    explanation: "Recursively displays filesystem directory hierarchy in a visual ASCII tree diagram.",
    example: "tree ~",
    expectedOutput: "/home/student\n├── Documents\n│   └── lab_manual.pdf\n├── Downloads\n├── Desktop\n└── notes.txt",
    safetyNotes: "Safe visual inspection tool.",
    commonMistakes: "Running tree on root / without -L depth limit, causing huge scrolling.",
    flags: [
      { flag: "-L LEVEL", desc: "Max display depth of the directory tree." },
      { flag: "-a", desc: "All files are printed (including hidden files)." }
    ]
  }
];

const App = {
  state: {
    userName: "Alex Carter",
    userRole: "2nd Year CSE Undergrad",
    userAvatar: "👨‍💻",
    activeView: 'dashboard',
    completedLessons: [],
    completedExercises: [],
    quizScore: 0,
    quizCompleted: false,
    commandsRun: 0,
    dailyGoal: 5,
    dailyProgress: 0,
    checklistState: {},
    activities: [],
    theme: 'cyber',
    notifications: [
      { id: 1, title: "Welcome to LinuxLearn AI!", time: "Just now", text: "Ready to master Linux command lines? Start with Lesson 1 or jump into the Terminal.", read: false },
      { id: 2, title: "Zero Host Risk Active", time: "10 mins ago", text: "All commands execute in a pure browser sandbox. Your host OS is completely safe.", read: false },
      { id: 3, title: "Daily Goal Initialized", time: "1 hour ago", text: "Complete 5 learning actions today to earn the Daily Achiever badge.", read: false }
    ]
  },

  init() {
    this.loadState();
    this.applyTheme(this.state.theme);
    this.bindNavigation();
    this.initViews();
    this.updateProfileUI();
    this.updateDashboardStats();
    this.renderCommandLibrary();
    this.renderSafetyChecklist();
    this.renderProgressView();
    this.renderRecentActivities();
    this.updateNotificationBadge();
  },

  // State Persistence with LocalStorage
  loadState() {
    try {
      const stored = localStorage.getItem('linuxlearn_state');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.state = Object.assign(this.state, parsed);
      }
    } catch (e) {
      console.warn("LocalStorage unavailable, using session state.", e);
    }
  },

  saveState() {
    try {
      localStorage.setItem('linuxlearn_state', JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to persist state.", e);
    }
  },

  resetProgress() {
    if (confirm("Are you sure you want to reset all learning progress? This will clear completed lessons, exercises, quiz scores, and badges.")) {
      this.state.completedLessons = [];
      this.state.completedExercises = [];
      this.state.quizScore = 0;
      this.state.quizCompleted = false;
      this.state.commandsRun = 0;
      this.state.dailyProgress = 0;
      this.state.checklistState = {};
      this.state.activities = [];
      this.saveState();
      location.reload();
    }
  },

  // Activity Logger
  logActivity(type, text) {
    if (!this.state.activities) this.state.activities = [];
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.state.activities.unshift({
      id: Date.now(),
      type: type,
      text: text,
      time: timeStr
    });
    if (this.state.activities.length > 15) {
      this.state.activities.pop();
    }
    this.saveState();
    this.renderRecentActivities();
  },

  incrementDailyGoal() {
    this.state.dailyProgress = (this.state.dailyProgress || 0) + 1;
    if (this.state.dailyProgress === this.state.dailyGoal) {
      this.showToast("🎉 Daily Learning Goal Achieved! Great job!", "success");
      this.addNotification("Daily Goal Complete!", "You accomplished today's learning target.");
    }
    this.saveState();
    this.updateDashboardStats();
  },

  // Navigation Router
  bindNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.dataset.view;
        if (targetView) {
          this.navigateTo(targetView);
        }
      });
    });

    // Mobile sidebar toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  },

  navigateTo(viewId) {
    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.remove('active');
    });

    document.querySelectorAll('.nav-item').forEach(nav => {
      nav.classList.toggle('active', nav.dataset.view === viewId);
    });

    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add('active');
      this.state.activeView = viewId;
    }

    // Update Topbar Title
    const titleElem = document.getElementById('topbar-view-title');
    if (titleElem) {
      const titles = {
        dashboard: "📊 Learning Dashboard",
        lessons: "📚 Learn Linux – Curriculum Modules (12)",
        terminal: "💻 Interactive Linux Terminal",
        library: "📖 Command Reference Library (40+)",
        exercises: "🎯 Practical Exercises (30)",
        assistant: "🤖 AI Learning Assistant",
        quiz: "📝 Linux Mastery Quiz & Assessment",
        progress: "📈 My Progress & Achievements",
        safety: "🛡️ Command Safety Center",
        about: "ℹ️ About Capstone 70"
      };
      titleElem.innerHTML = titles[viewId] || "LinuxLearn AI";
    }

    if (viewId === 'terminal') {
      setTimeout(() => {
        if (LinuxTerminal.inputElem) LinuxTerminal.inputElem.focus();
      }, 100);
    } else if (viewId === 'progress') {
      this.renderProgressView();
    } else if (viewId === 'dashboard') {
      this.updateDashboardStats();
      this.renderRecentActivities();
    }

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
  },

  initViews() {
    LessonsController.init();
    LinuxTerminal.init();
    ExercisesController.init();
    QuizController.init();
    AssistantController.init();
  },

  // Dashboard Stats & Personalization
  updateDashboardStats() {
    const lessonCount = (this.state.completedLessons || []).length;
    const exerciseCount = (this.state.completedExercises || []).length;
    const quizScore = this.state.quizScore || 0;
    const commandsRun = this.state.commandsRun || 0;
    const dailyProg = this.state.dailyProgress || 0;
    const dailyGoal = this.state.dailyGoal || 5;

    // Elements
    const statLessons = document.getElementById('stat-completed-lessons');
    const statExercises = document.getElementById('stat-completed-exercises');
    const statQuiz = document.getElementById('stat-quiz-score');
    const statCmds = document.getElementById('stat-commands-run');
    const heroProgress = document.getElementById('hero-overall-progress');
    const heroBar = document.getElementById('hero-overall-bar');
    const welcomeHeader = document.getElementById('dashboard-welcome-heading');
    const dailyGoalText = document.getElementById('daily-goal-text');
    const dailyGoalBar = document.getElementById('daily-goal-bar');

    if (welcomeHeader) {
      const hours = new Date().getHours();
      let greeting = "Good morning";
      if (hours >= 12 && hours < 17) greeting = "Good afternoon";
      else if (hours >= 17) greeting = "Good evening";
      welcomeHeader.textContent = `${greeting}, ${this.state.userName}!`;
    }

    if (statLessons) statLessons.textContent = `${lessonCount} / 12`;
    if (statExercises) statExercises.textContent = `${exerciseCount} / 30`;
    if (statQuiz) statQuiz.textContent = `${quizScore} / 15`;
    if (statCmds) statCmds.textContent = `${commandsRun}`;

    // Overall progress score: 12 lessons (40%), 30 exercises (40%), 15 quiz (20%)
    const lessonPct = (lessonCount / 12) * 40;
    const exercisePct = (exerciseCount / 30) * 40;
    const quizPct = (quizScore / 15) * 20;
    const totalPct = Math.min(100, Math.round(lessonPct + exercisePct + quizPct));

    if (heroProgress) heroProgress.textContent = `${totalPct}%`;
    if (heroBar) heroBar.style.width = `${totalPct}%`;

    // Daily goal
    if (dailyGoalText) {
      dailyGoalText.textContent = `${dailyProg} / ${dailyGoal} completed (${Math.min(100, Math.round((dailyProg / dailyGoal) * 100))}%)`;
    }
    if (dailyGoalBar) {
      dailyGoalBar.style.width = `${Math.min(100, Math.round((dailyProg / dailyGoal) * 100))}%`;
    }

    this.renderContinueLearningCard();
  },

  renderContinueLearningCard() {
    const card = document.getElementById('dashboard-continue-card');
    if (!card) return;

    const completed = this.state.completedLessons || [];
    const nextLesson = LESSONS_DATA.find(l => !completed.includes(l.id)) || LESSONS_DATA[0];

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span class="badge badge-info" style="font-size: 10px;">Next Recommended Module</span>
          <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-top: 6px;">${nextLesson.title}</h4>
          <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${nextLesson.shortDesc}</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="App.navigateTo('lessons'); LessonsController.selectLesson(${nextLesson.id});">
          Resume →
        </button>
      </div>
    `;
  },

  renderRecentActivities() {
    const container = document.getElementById('dashboard-recent-activities');
    if (!container) return;

    const acts = this.state.activities || [];
    if (acts.length === 0) {
      container.innerHTML = `
        <div style="font-size: 12px; color: var(--text-muted); padding: 8px 0;">
          No recent activity yet. Start with a lesson or execute a command in the terminal!
        </div>
      `;
      return;
    }

    container.innerHTML = acts.slice(0, 5).map(a => {
      let icon = "💻";
      if (a.type === 'lesson') icon = "📚";
      else if (a.type === 'exercise') icon = "🎯";
      else if (a.type === 'quiz') icon = "📝";
      else if (a.type === 'badge') icon = "🏆";

      return `
        <div class="activity-feed-item">
          <span class="activity-feed-icon">${icon}</span>
          <div style="flex: 1;">
            <div style="color: var(--text-primary); font-size: 12px;">${App.escapeHtml(a.text)}</div>
            <div style="color: var(--text-muted); font-size: 10px;">${a.time}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Command Library View with Category and Difficulty Filters
  renderCommandLibrary(searchQuery = '', activeCat = 'all', activeDiff = 'all') {
    const grid = document.getElementById('command-library-grid');
    if (!grid) return;

    const filtered = COMMAND_LIBRARY_DATA.filter(item => {
      if (activeCat !== 'all' && item.category.toLowerCase() !== activeCat.toLowerCase() && item.safety !== activeCat) {
        return false;
      }
      if (activeDiff !== 'all' && item.difficulty.toLowerCase() !== activeDiff.toLowerCase()) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return item.name.includes(q) || item.desc.toLowerCase().includes(q) || item.syntax.toLowerCase().includes(q);
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          No Linux commands found matching your criteria.
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(cmd => {
      let badgeClass = 'badge-safe';
      let badgeText = '🟢 Safe';
      if (cmd.safety === 'moderate') {
        badgeClass = 'badge-mod';
        badgeText = '🟡 Moderate';
      } else if (cmd.safety === 'danger') {
        badgeClass = 'badge-danger';
        badgeText = '🔴 Caution';
      }

      let diffBadge = 'badge-secondary';
      if (cmd.difficulty === 'Beginner') diffBadge = 'badge-info';
      else if (cmd.difficulty === 'Intermediate') diffBadge = 'badge-purple';
      else if (cmd.difficulty === 'Advanced') diffBadge = 'badge-warning';

      return `
        <div class="command-card" onclick="App.openCommandModal('${cmd.name}')">
          <div class="command-card-header">
            <div>
              <span class="cmd-badge-name">${cmd.name}</span>
              <span class="badge ${diffBadge}" style="margin-left: 6px; font-size: 10px;">${cmd.difficulty}</span>
            </div>
            <span class="badge ${badgeClass}">${badgeText}</span>
          </div>
          <p class="command-card-desc">${cmd.desc}</p>
          <div class="command-syntax-box">${cmd.syntax}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
            <strong>Example:</strong> <code>${cmd.example}</code>
          </div>
          <div style="margin-top: auto; display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); App.openCommandModal('${cmd.name}')">Details</button>
            <button class="btn btn-accent btn-sm" onclick="event.stopPropagation(); LinuxTerminal.executeAndSwitch('${cmd.example}')">Try in Terminal</button>
          </div>
        </div>
      `;
    }).join('');
  },

  filterCommandLibrary(cat) {
    document.querySelectorAll('.cmd-filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    this.refreshCommandLibrary();
  },

  filterCommandDifficulty(diff) {
    document.querySelectorAll('.cmd-diff-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.diff === diff);
    });
    this.refreshCommandLibrary();
  },

  searchCommandLibrary(val) {
    this.refreshCommandLibrary();
  },

  refreshCommandLibrary() {
    const searchVal = document.getElementById('library-search-input')?.value || '';
    const activeCat = document.querySelector('.cmd-filter-pill.active')?.dataset.cat || 'all';
    const activeDiff = document.querySelector('.cmd-diff-pill.active')?.dataset.diff || 'all';
    this.renderCommandLibrary(searchVal, activeCat, activeDiff);
  },

  // Command Details Modal
  openCommandModal(cmdName) {
    const cmd = COMMAND_LIBRARY_DATA.find(c => c.name === cmdName);
    if (!cmd) return;

    const modal = document.getElementById('command-detail-modal');
    const title = document.getElementById('cmd-modal-title');
    const body = document.getElementById('cmd-modal-body');
    if (!modal || !title || !body) return;

    title.innerHTML = `<code>${cmd.name}</code> – ${cmd.desc}`;

    let flagsHtml = "";
    if (cmd.flags && cmd.flags.length > 0) {
      flagsHtml = `
        <div style="margin-top: 14px;">
          <h5 style="color: #fff; font-size: 13px; margin-bottom: 6px;">Common Options & Flags:</h5>
          <div style="display: grid; gap: 6px;">
            ${cmd.flags.map(f => `
              <div style="background: var(--bg-tertiary); padding: 6px 10px; border-radius: var(--radius-sm); font-size: 12px; display: flex; gap: 10px;">
                <code style="color: var(--accent-primary);">${f.flag}</code>
                <span style="color: var(--text-secondary);">${f.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    body.innerHTML = `
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <span class="badge badge-info">${cmd.category}</span>
        <span class="badge badge-purple">${cmd.difficulty}</span>
        <span class="badge ${cmd.safety === 'danger' ? 'badge-danger' : cmd.safety === 'moderate' ? 'badge-mod' : 'badge-safe'}">${cmd.safety.toUpperCase()}</span>
      </div>
      <p style="font-size: 13px; color: var(--text-primary);">${cmd.explanation}</p>
      
      <div style="margin-top: 14px;">
        <h5 style="color: #fff; font-size: 13px; margin-bottom: 4px;">Syntax:</h5>
        <pre class="lesson-code-block">${cmd.syntax}</pre>
      </div>

      ${flagsHtml}

      <div style="margin-top: 14px;">
        <h5 style="color: #fff; font-size: 13px; margin-bottom: 4px;">Example:</h5>
        <div style="background: var(--bg-primary); padding: 8px 12px; border-radius: var(--radius-sm); font-family: var(--font-mono); color: #79c0ff; font-size: 12px;">
          ${cmd.example}
        </div>
      </div>

      <div style="margin-top: 14px;">
        <h5 style="color: #fff; font-size: 13px; margin-bottom: 4px;">Expected Output:</h5>
        <pre class="lesson-code-block terminal-preview">${cmd.expectedOutput}</pre>
      </div>

      <div style="margin-top: 14px; background: rgba(248, 81, 73, 0.1); border-left: 3px solid var(--color-danger); padding: 8px 12px; border-radius: 4px;">
        <strong style="color: #ff7b72; font-size: 12px;">Common Pitfall:</strong>
        <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${cmd.commonMistakes}</p>
      </div>

      <div style="margin-top: 12px; background: rgba(63, 185, 80, 0.1); border-left: 3px solid var(--color-success); padding: 8px 12px; border-radius: 4px;">
        <strong style="color: #7ee787; font-size: 12px;">Safety Note:</strong>
        <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${cmd.safetyNotes}</p>
      </div>

      <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 8px;">
        <button class="btn btn-secondary" onclick="App.closeCommandModal()">Close</button>
        <button class="btn btn-accent" onclick="App.closeCommandModal(); LinuxTerminal.executeAndSwitch('${cmd.example}')">Execute in Terminal ⌨️</button>
      </div>
    `;

    modal.classList.add('open');
  },

  closeCommandModal() {
    const modal = document.getElementById('command-detail-modal');
    if (modal) modal.classList.remove('open');
  },

  // Interactive Command Risk Scanner
  analyzeCommandSafety(cmdStr) {
    if (!cmdStr || !cmdStr.trim()) {
      return {
        level: "none",
        label: "No Command",
        score: 0,
        explanation: "Please enter a Linux command to evaluate."
      };
    }

    const trimmed = cmdStr.trim();

    // Destructive Critical
    if (/rm\s+-rf\s+\/($|\s|\*)/i.test(trimmed)) {
      return {
        level: "critical",
        label: "🔴 CRITICAL DESTRUCTIVE HAZARD",
        score: 100,
        blastRadius: "Entire Operating System & Mounted Filesystems",
        explanation: "Unlinks all inodes starting from root (/). Will completely wipe the OS, user data, binaries, and libraries within seconds. Irreversible.",
        alternative: "rm -ri ./target_directory"
      };
    }

    if (/chmod\s+(-R\s+)?777\s+\//i.test(trimmed)) {
      return {
        level: "critical",
        label: "🔴 CRITICAL SECURITY FAILURE",
        score: 95,
        blastRadius: "All Filesystem Permissions",
        explanation: "Makes all files world-writable. System services like SSH daemon and login pam will refuse to start for security reasons.",
        alternative: "chmod 755 (directories) or chmod 644 (files)"
      };
    }

    if (/dd\s+if=\/dev\/zero\s+of=\/dev\/sd/i.test(trimmed) || />\s*\/dev\/sd/i.test(trimmed)) {
      return {
        level: "critical",
        label: "🔴 RAW STORAGE WIPING",
        score: 100,
        blastRadius: "Entire Disk Partition Table & User Data",
        explanation: "Writes raw zeroes directly to the storage block device, obliterating partition tables, filesystems, and recovery superblocks.",
        alternative: "Perform disk partitioning tasks inside an isolated disposable Virtual Machine."
      };
    }

    if (/:\(\)\{\s*:\|:&\s*\};:/.test(trimmed)) {
      return {
        level: "critical",
        label: "🔴 BASH FORK BOMB",
        score: 98,
        blastRadius: "Process Table & System Memory",
        explanation: "Recursively forks background processes exponentially until kernel PID table is starved, freezing the entire workstation.",
        alternative: "Configure process limits in /etc/security/limits.conf"
      };
    }

    if (/curl.*\|\s*(sudo\s+)?bash/i.test(trimmed)) {
      return {
        level: "high",
        label: "🟠 HIGH SECURITY RISK (BLIND PIPE)",
        score: 80,
        blastRadius: "System Execution Context",
        explanation: "Executes unverified remote web script directly into root shell. If DNS is poisoned or the server is hacked, malicious payloads execute instantly.",
        alternative: "curl -O script.sh && less script.sh && bash script.sh"
      };
    }

    if (/rm\s+-rf/i.test(trimmed)) {
      return {
        level: "moderate",
        label: "🟡 MODERATE DANGER (RECURSIVE DELETION)",
        score: 60,
        blastRadius: "Target Directory & All Nested Subtrees",
        explanation: "Forcefully deletes target folders without interactive confirmation. A small typo in the path can destroy unintended files.",
        alternative: "rm -ri target_folder"
      };
    }

    if (/chmod\s+777/i.test(trimmed)) {
      return {
        level: "moderate",
        label: "🟡 MODERATE SECURITY HAZARD",
        score: 55,
        blastRadius: "Target File / Directory Permissions",
        explanation: "Grants read, write, and execute permissions to anyone on the machine.",
        alternative: "chmod 755 (scripts) or chmod 644 (data files)"
      };
    }

    if (/sudo/i.test(trimmed)) {
      return {
        level: "low",
        label: "🔵 ELEVATED PRIVILEGE",
        score: 30,
        blastRadius: "Administrative System State",
        explanation: "Executes with root authority. Safe if arguments are inspected, but administrative caution is warranted.",
        alternative: "Run as normal unprivileged user if root is not strictly necessary."
      };
    }

    // Default Safe
    return {
      level: "safe",
      label: "🟢 SAFE COMMAND",
      score: 5,
      blastRadius: "None (Read-Only or Normal User Context)",
      explanation: "Standard command operating within standard user privilege boundaries. No catastrophic host risk detected.",
      alternative: "Command is safe to execute in your environment."
    };
  },

  // Safety Center Checkbox Manager
  renderSafetyChecklist() {
    const container = document.getElementById('safety-checklist-container');
    if (!container) return;

    const checklistItems = [
      "1. Verify active username with 'whoami' before running administrative commands.",
      "2. Confirm current working directory coordinates with 'pwd' before deleting.",
      "3. Inspect paths carefully: double-check leading slashes (/path vs path).",
      "4. Preview matching wildcard targets using 'ls' before running 'rm *'.",
      "5. Use interactive safety flags (-i) for destructive commands (rm -i, cp -i).",
      "6. Enclose filenames containing spaces in quotation marks (\"my file.txt\").",
      "7. Avoid executing daily code as root; invoke 'sudo' only when strictly required.",
      "8. Never pipe downloaded scripts directly into Bash without reading (curl | bash).",
      "9. Test risky filesystem modifications inside an isolated VM with snapshots.",
      "10. Verify AI-generated shell commands and options against official 'man' pages."
    ];

    container.innerHTML = checklistItems.map((item, idx) => {
      const isChecked = !!(this.state.checklistState && this.state.checklistState[idx]);
      return `
        <div class="checklist-item">
          <input type="checkbox" class="exercise-checkbox" id="chk-${idx}" ${isChecked ? 'checked' : ''} onchange="App.toggleChecklistItem(${idx})">
          <label for="chk-${idx}" style="color: var(--text-primary); font-size: 13px; cursor: pointer;">${item}</label>
        </div>
      `;
    }).join('');
  },

  toggleChecklistItem(idx) {
    if (!this.state.checklistState) this.state.checklistState = {};
    this.state.checklistState[idx] = !this.state.checklistState[idx];
    this.saveState();
    App.showToast("Safety checklist updated!", "info");
  },

  // Progress Analytics View
  renderProgressView() {
    const container = document.getElementById('progress-badges-container');
    if (!container) return;

    const lessonsDone = (this.state.completedLessons || []).length;
    const exercisesDone = (this.state.completedExercises || []).length;
    const quizDone = this.state.quizCompleted;
    const cmdsRun = this.state.commandsRun || 0;
    const quizScore = this.state.quizScore || 0;

    // Calculate XP
    const totalXP = (lessonsDone * 20) + (exercisesDone * 10) + (quizScore * 10) + (cmdsRun * 2);
    let levelName = "Level 1: Terminal Novice";
    let levelProgress = (totalXP / 200) * 100;
    if (totalXP >= 800) {
      levelName = "Level 5: Linux Kernel Master";
      levelProgress = 100;
    } else if (totalXP >= 500) {
      levelName = "Level 4: Senior SysAdmin";
      levelProgress = ((totalXP - 500) / 300) * 100;
    } else if (totalXP >= 300) {
      levelName = "Level 3: Shell Specialist";
      levelProgress = ((totalXP - 300) / 200) * 100;
    } else if (totalXP >= 150) {
      levelName = "Level 2: Filesystem Navigator";
      levelProgress = ((totalXP - 150) / 150) * 100;
    }

    const levelElem = document.getElementById('progress-user-level');
    const xpElem = document.getElementById('progress-total-xp');
    const xpBar = document.getElementById('progress-xp-bar');
    if (levelElem) levelElem.textContent = levelName;
    if (xpElem) xpElem.textContent = `${totalXP} XP`;
    if (xpBar) xpBar.style.width = `${Math.min(100, Math.round(levelProgress))}%`;

    const badges = [
      { icon: "🌱", title: "Terminal Rookie", desc: "Executed your first simulated command", unlocked: cmdsRun >= 1 },
      { icon: "📚", title: "Module Scholar", desc: "Completed at least 6 learning modules", unlocked: lessonsDone >= 6 },
      { icon: "🎓", title: "Curriculum Graduate", desc: "Mastered all 12 learning modules", unlocked: lessonsDone === 12 },
      { icon: "⚡", title: "Power Navigator", desc: "Completed 15 practical exercises", unlocked: exercisesDone >= 15 },
      { icon: "💻", title: "Shell Automator", desc: "Completed all 30 practical exercises", unlocked: exercisesDone === 30 },
      { icon: "🛡️", title: "Safety Guardian", desc: "Completed 5+ items on the safety checklist", unlocked: Object.keys(this.state.checklistState || {}).filter(k => this.state.checklistState[k]).length >= 5 },
      { icon: "🏆", title: "Linux Master", desc: "Scored 12+ on the 15-question quiz", unlocked: quizScore >= 12 },
      { icon: "⭐", title: "Perfect Score", desc: "Achieved 15/15 on the mastery assessment", unlocked: quizScore === 15 }
    ];

    container.innerHTML = badges.map(b => `
      <div class="achievement-badge ${b.unlocked ? 'unlocked' : ''}">
        <div class="achievement-icon">${b.icon}</div>
        <div class="achievement-title">${b.title}</div>
        <div class="achievement-desc">${b.desc}</div>
        <span class="badge ${b.unlocked ? 'badge-safe' : 'badge-secondary'}" style="margin-top: 4px;">
          ${b.unlocked ? 'Unlocked ✓' : 'Locked'}
        </span>
      </div>
    `).join('');
  },

  // Student Profile Management
  openProfileModal() {
    const modal = document.getElementById('profile-edit-modal');
    const nameInput = document.getElementById('profile-input-name');
    const roleInput = document.getElementById('profile-input-role');
    const avatarInput = document.getElementById('profile-input-avatar');
    if (modal && nameInput && roleInput) {
      nameInput.value = this.state.userName || "Alex Carter";
      roleInput.value = this.state.userRole || "2nd Year CSE Undergrad";
      if (avatarInput) avatarInput.value = this.state.userAvatar || "👨‍💻";
      modal.classList.add('open');
    }
  },

  closeProfileModal() {
    const modal = document.getElementById('profile-edit-modal');
    if (modal) modal.classList.remove('open');
  },

  saveProfile() {
    const nameInput = document.getElementById('profile-input-name');
    const roleInput = document.getElementById('profile-input-role');
    const avatarInput = document.getElementById('profile-input-avatar');
    if (nameInput && nameInput.value.trim()) {
      this.state.userName = nameInput.value.trim();
    }
    if (roleInput && roleInput.value.trim()) {
      this.state.userRole = roleInput.value.trim();
    }
    if (avatarInput && avatarInput.value.trim()) {
      this.state.userAvatar = avatarInput.value.trim();
    }
    this.saveState();
    this.updateProfileUI();
    this.updateDashboardStats();
    this.closeProfileModal();
    this.showToast("Student profile updated!", "success");
  },

  updateProfileUI() {
    const sidebarName = document.querySelector('.user-name');
    const sidebarAvatar = document.querySelector('.user-avatar');
    if (sidebarName) sidebarName.textContent = this.state.userName || "Alex Carter";
    if (sidebarAvatar) sidebarAvatar.textContent = this.state.userAvatar || "CS";
  },

  // Theme Management
  setTheme(themeName) {
    this.state.theme = themeName;
    this.applyTheme(themeName);
    this.saveState();
    this.showToast(`Theme switched to ${themeName.toUpperCase()}`, "info");
    this.closeThemeModal();
  },

  applyTheme(themeName) {
    document.body.classList.remove('theme-cyber', 'theme-matrix', 'theme-purple', 'theme-slate');
    document.body.classList.add(`theme-${themeName}`);
  },

  openThemeModal() {
    const modal = document.getElementById('theme-picker-modal');
    if (modal) modal.classList.add('open');
  },

  closeThemeModal() {
    const modal = document.getElementById('theme-picker-modal');
    if (modal) modal.classList.remove('open');
  },

  // Notification Management
  toggleNotifications() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('open');
    this.renderNotificationsList();
  },

  renderNotificationsList() {
    const list = document.getElementById('notifications-list-container');
    if (!list) return;

    const notifs = this.state.notifications || [];
    if (notifs.length === 0) {
      list.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 12px;">No notifications.</div>`;
      return;
    }

    list.innerHTML = notifs.map(n => `
      <div class="notification-item ${n.read ? '' : 'unread'}">
        <div style="display: flex; justify-content: space-between;">
          <strong style="color: #fff; font-size: 12px;">${App.escapeHtml(n.title)}</strong>
          <span style="font-size: 10px; color: var(--text-muted);">${n.time}</span>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${App.escapeHtml(n.text)}</p>
      </div>
    `).join('');
  },

  markNotificationsRead() {
    if (this.state.notifications) {
      this.state.notifications.forEach(n => n.read = true);
      this.saveState();
      this.updateNotificationBadge();
      this.renderNotificationsList();
      this.showToast("All notifications marked as read", "info");
    }
  },

  addNotification(title, text) {
    if (!this.state.notifications) this.state.notifications = [];
    this.state.notifications.unshift({
      id: Date.now(),
      title: title,
      time: "Just now",
      text: text,
      read: false
    });
    this.saveState();
    this.updateNotificationBadge();
  },

  updateNotificationBadge() {
    const badge = document.getElementById('notifications-badge-count');
    if (!badge) return;
    const unread = (this.state.notifications || []).filter(n => !n.read).length;
    if (unread > 0) {
      badge.textContent = unread;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  },

  // Toast Notification System
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = "ℹ️";
    if (type === 'success') icon = "✅";
    if (type === 'warning') icon = "⚠️";
    if (type === 'error') icon = "❌";

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};

// Global Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
