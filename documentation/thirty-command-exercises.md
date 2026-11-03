# Thirty Verified Linux Command Exercises

**Course:** LinuxLearn AI – Practical Command Line Learning Kit  
**Target:** 1st & 2nd Year Computer Science Engineering Students  
**Document Code:** EX-30-MASTER  
**Environment:** Verified under GNU Coreutils 9.x / Ubuntu 24.04 LTS & LinuxLearn AI Browser Terminal  

---

### Exercise 1: Identifying User Identity
* **Exercise Number:** 01
* **Learning Objective:** Determine the effective username of the currently logged-in shell user.
* **Linux Command:** `whoami`
* **Explanation:** `whoami` prints the username associated with the current effective user ID (EUID). It helps beginners verify whether they are operating as a standard unprivileged student or as `root`.
* **Expected Output:**
  ```text
  student
  ```
* **Practical Task:** Run `whoami` to confirm your session identity before executing any further commands.
* **Safety Level:** 🟢 Safe (Read-only query, zero risk).
* **Common Mistakes:** Confusing `whoami` with `who` (which lists all logged-in sessions) or typing `who am i` with spaces.
* **AI-Generated Hint:** "Think of this as asking the operating system: 'What account am I currently speaking as?'"

---

### Exercise 2: Printing Current Working Directory
* **Exercise Number:** 02
* **Learning Objective:** Print the exact absolute path of the current working directory.
* **Linux Command:** `pwd`
* **Explanation:** `pwd` stands for "Print Working Directory". It resolves and prints the complete hierarchical path from the root directory `/` to the current folder.
* **Expected Output:**
  ```text
  /home/student
  ```
* **Practical Task:** Verify your current location immediately upon opening the terminal shell.
* **Safety Level:** 🟢 Safe (Read-only query).
* **Common Mistakes:** Confusing `pwd` with `passwd` (which changes user passwords!).
* **AI-Generated Hint:** "`pwd` is your GPS coordinate in the Linux directory tree."

---

### Exercise 3: Listing Current Directory Contents
* **Exercise Number:** 03
* **Learning Objective:** View visible files and subdirectories located within the current working folder.
* **Linux Command:** `ls`
* **Explanation:** `ls` lists directory entries. In its simplest form, it outputs the names of files and folders in alphabetical columnar format.
* **Expected Output:**
  ```text
  Desktop  Documents  Downloads  Music  Pictures  Videos
  ```
* **Practical Task:** List the contents of your user home folder.
* **Safety Level:** 🟢 Safe (Read-only query).
* **Common Mistakes:** Expecting detailed sizes or permissions from simple `ls` without passing options.
* **AI-Generated Hint:** "To see hidden configuration files, you will need to add a flag in a subsequent exercise."

---

### Exercise 4: Detailed Listing with File Attributes
* **Exercise Number:** 04
* **Learning Objective:** Inspect file permissions, owner, group, size, and modification timestamp.
* **Linux Command:** `ls -l`
* **Explanation:** The `-l` flag enables "long listing format", displaying detailed metadata including file mode bits, hard link count, owner, group, byte size, and timestamp.
* **Expected Output:**
  ```text
  total 24
  drwxr-xr-x 2 student student 4096 Nov 02 10:00 Documents
  drwxr-xr-x 2 student student 4096 Nov 02 10:00 Downloads
  -rw-r--r-- 1 student student  220 Nov 02 10:00 notes.txt
  ```
* **Practical Task:** Examine the metadata of the files in your directory using `ls -l`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Typing `ls -1` (number one, which prints one file per line) instead of `ls -l` (lowercase L for long).
* **AI-Generated Hint:** "Look at the first character: a `-` means a regular file, while a `d` indicates a directory."

---

### Exercise 5: Revealing Hidden Dotfiles
* **Exercise Number:** 05
* **Learning Objective:** Display hidden files and directories whose names begin with a period (`.`).
* **Linux Command:** `ls -a`
* **Explanation:** In Unix, any file or directory starting with a dot (`.`) is considered hidden. The `-a` (`--all`) option forces `ls` to list all files, including `.` (current) and `..` (parent).
* **Expected Output:**
  ```text
  .  ..  .bash_history  .bash_logout  .bashrc  .profile  Documents
  ```
* **Practical Task:** Discover the hidden Bash configuration files in your home folder.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Accidentally editing or deleting `.bashrc` without understanding its purpose.
* **AI-Generated Hint:** "Configuration files in Linux are usually hidden dotfiles to prevent cluttering normal views."

---

### Exercise 6: Human-Readable File Sizes
* **Exercise Number:** 06
* **Learning Objective:** View file sizes in Kilobytes (K), Megabytes (M), and Gigabytes (G) rather than raw bytes.
* **Linux Command:** `ls -lh`
* **Explanation:** The `-h` option paired with `-l` formats byte counts into intuitive human-readable binary prefixes (`K`, `M`, `G`).
* **Expected Output:**
  ```text
  -rw-r--r-- 1 student student 4.2K Nov 02 10:15 report.pdf
  -rw-r--r-- 1 student student 1.8M Nov 02 10:20 dataset.csv
  ```
* **Practical Task:** Run `ls -lh` to quickly identify which files are taking up significant storage space.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Trying `ls -h` alone without `-l` (which has no visible effect because sizes are only printed in long format).
* **AI-Generated Hint:** "Always combine `-l` and `-h` for rapid file inspection: `ls -lh`."

---

### Exercise 7: Navigating to Subdirectories (Relative Path)
* **Exercise Number:** 07
* **Learning Objective:** Move into a child directory using a relative pathname.
* **Linux Command:** `cd Documents`
* **Explanation:** `cd` changes the working directory. A relative path starts from your current position without a leading slash `/`.
* **Expected Output:**
  ```text
  (Silent execution; terminal prompt changes to ~/Documents)
  ```
* **Practical Task:** Switch your terminal context into the `Documents` folder and verify with `pwd`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Adding a leading slash like `cd /Documents` when `Documents` is inside your home folder.
* **AI-Generated Hint:** "Remember: no leading slash means 'look right here inside my current folder'."

---

### Exercise 8: Ascending to Parent Directory
* **Exercise Number:** 08
* **Learning Objective:** Navigate upward one level to the parent directory.
* **Linux Command:** `cd ..`
* **Explanation:** In every Unix directory, `..` represents a hard link to the parent folder. Executing `cd ..` steps one level up the tree.
* **Expected Output:**
  ```text
  (Silent execution; terminal prompt returns to parent path)
  ```
* **Practical Task:** Move into `Documents`, and then use `cd ..` to return to your home directory.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Typing `cd..` without a space between the command `cd` and argument `..`.
* **AI-Generated Hint:** "Space is mandatory in Bash between command names and arguments!"

---

### Exercise 9: Returning to User Home Directory
* **Exercise Number:** 09
* **Learning Objective:** Quickly return to the user's home directory from any filesystem depth.
* **Linux Command:** `cd ~` (or simply `cd`)
* **Explanation:** The tilde `~` expands to the current user's `$HOME` directory. Calling `cd` without any arguments also defaults to `$HOME`.
* **Expected Output:**
  ```text
  (Silent execution; terminal prompt shows ~)
  ```
* **Practical Task:** Navigate deep into `/var/log` and return home in a single keystroke using `cd ~`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Typing `cd \` instead of `cd /` or `cd ~`.
* **AI-Generated Hint:** "`~` is your home sweet home shortcut."

---

### Exercise 10: Toggling to Previous Working Directory
* **Exercise Number:** 10
* **Learning Objective:** Toggle back and forth between two directories.
* **Linux Command:** `cd -`
* **Explanation:** `cd -` changes directory to the previous working directory stored in the `$OLDPWD` environment variable and prints the destination path.
* **Expected Output:**
  ```text
  /var/log
  ```
* **Practical Task:** Jump between your home directory and `/etc` using `cd -` repeatedly.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Confusing `-` (previous directory) with `~` (home directory).
* **AI-Generated Hint:** "Think of `cd -` like the 'previous channel' button on your TV remote."

---

### Exercise 11: Creating a New Directory
* **Exercise Number:** 11
* **Learning Objective:** Create a new folder for project files.
* **Linux Command:** `mkdir cs101`
* **Explanation:** `mkdir` (Make Directory) requests the operating system kernel to allocate a new directory inode with the specified name.
* **Expected Output:**
  ```text
  (Silent execution; folder cs101 is created)
  ```
* **Practical Task:** Create a folder named `cs101` in your home directory.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Putting spaces in names without quotes (e.g. `mkdir my project` creates two folders: `my` and `project`).
* **AI-Generated Hint:** "Use hyphens or underscores for directory names to avoid whitespace issues: `mkdir cs101_labs`."

---

### Exercise 12: Creating Nested Directory Hierarchies
* **Exercise Number:** 12
* **Learning Objective:** Construct multi-tier nested directory paths in a single command.
* **Linux Command:** `mkdir -p projects/lab1/src`
* **Explanation:** The `-p` (`--parents`) flag creates any missing intermediate parent directories automatically without returning an error if they already exist.
* **Expected Output:**
  ```text
  (Silent execution; projects, lab1, and src are created)
  ```
* **Practical Task:** Build the folder structure `projects/lab1/src` with a single command.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Running `mkdir projects/lab1/src` without `-p`, which fails with `No such file or directory`.
* **AI-Generated Hint:** "`-p` stands for parents. It makes directory creation idempotent and error-free."

---

### Exercise 13: Creating Empty Files and Updating Timestamps
* **Exercise Number:** 13
* **Learning Objective:** Create empty files or update timestamps of existing files.
* **Linux Command:** `touch main.c`
* **Explanation:** `touch` updates the access and modification timestamps of a file to current system time. If the file does not exist, it creates a 0-byte empty file.
* **Expected Output:**
  ```text
  (Silent execution; file main.c exists)
  ```
* **Practical Task:** Create an empty C source file named `main.c`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Expecting `touch` to open a text editor.
* **AI-Generated Hint:** "`touch` creates an empty canvas. Use a text editor like `nano` to write code inside."

---

### Exercise 14: Outputting Text to Terminal and Files
* **Exercise Number:** 14
* **Learning Objective:** Print strings to terminal stdout or write them to files using output redirection.
* **Linux Command:** `echo "Hello Linux" > greeting.txt`
* **Explanation:** `echo` prints its arguments to standard output. The `>` redirection operator intercepts standard output and writes it into `greeting.txt`, creating or overwriting the file.
* **Expected Output:**
  ```text
  (Silent execution; greeting.txt contains "Hello Linux")
  ```
* **Practical Task:** Write a welcome message to a file named `greeting.txt` using `echo` and `>`.
* **Safety Level:** 🟢 Safe (in user directory).
* **Common Mistakes:** Accidentally overwriting an important file with `>` instead of appending with `>>`.
* **AI-Generated Hint:** "`>` creates or overwrites; `>>` appends to the end of the file."

---

### Exercise 15: Concatenating and Viewing File Contents
* **Exercise Number:** 15
* **Learning Objective:** Display the complete content of a text file.
* **Linux Command:** `cat greeting.txt`
* **Explanation:** `cat` (short for concatenate) reads sequential byte streams from files and prints them directly to terminal stdout.
* **Expected Output:**
  ```text
  Hello Linux
  ```
* **Practical Task:** View the message stored inside `greeting.txt`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Running `cat` on massive binary files or multi-gigabyte log files, flooding the terminal screen.
* **AI-Generated Hint:** "For long files, prefer `less` or `head`/`tail` instead of `cat`."

---

### Exercise 16: Viewing File Headers
* **Exercise Number:** 16
* **Learning Objective:** Preview the first few lines of a file.
* **Linux Command:** `head -n 5 /etc/passwd`
* **Explanation:** `head` prints the first part of files. By default it prints 10 lines; the `-n` flag specifies an exact line count.
* **Expected Output:**
  ```text
  root:x:0:0:root:/root:/bin/bash
  daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
  bin:x:2:2:bin:/bin:/usr/sbin/nologin
  sys:x:3:3:sys:/dev:/usr/sbin/nologin
  sync:x:4:65534:sync:/bin:/bin/sync
  ```
* **Practical Task:** Inspect the first 5 system accounts configured in `/etc/passwd`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Typing `-5` instead of standard `-n 5`.
* **AI-Generated Hint:** "`head` lets you glance at the top of a file without scrolling through thousands of lines."

---

### Exercise 17: Viewing File Trailers and Logs
* **Exercise Number:** 17
* **Learning Objective:** Preview the final lines of a file.
* **Linux Command:** `tail -n 3 /etc/passwd`
* **Explanation:** `tail` outputs the end of files. It is commonly used by system administrators to check recent system events and error traces.
* **Expected Output:**
  ```text
  systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
  student:x:1000:1000:Student User:/home/student:/bin/bash
  nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
  ```
* **Practical Task:** View the last 3 accounts registered in `/etc/passwd`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Forgetting that `tail -f` will keep the terminal running indefinitely until interrupted with `Ctrl+C`.
* **AI-Generated Hint:** "`tail` looks at the bottom; adding `-f` lets you follow active log files in real-time."

---

### Exercise 18: Duplicating Files Safely
* **Exercise Number:** 18
* **Learning Objective:** Make an exact duplicate of a file while preventing accidental overwrites.
* **Linux Command:** `cp -i greeting.txt greeting_backup.txt`
* **Explanation:** `cp` copies files. Adding the interactive flag `-i` forces the command to prompt the user if the destination file already exists.
* **Expected Output:**
  ```text
  (Silent execution when backup doesn't exist; prompts if it does)
  ```
* **Practical Task:** Create a backup copy of `greeting.txt` using `cp -i`.
* **Safety Level:** 🟡 Moderate (Potential overwrite if `-i` is omitted).
* **Common Mistakes:** Swapping the source and destination arguments, accidentally overwriting the original file.
* **AI-Generated Hint:** "Syntax is always: `cp [source] [destination]`. Add `-i` to be safe!"

---

### Exercise 19: Recursive Directory Duplication
* **Exercise Number:** 19
* **Learning Objective:** Copy an entire directory and all its contents recursively.
* **Linux Command:** `cp -r cs101 cs101_backup`
* **Explanation:** Directories cannot be duplicated with plain `cp`. The `-r` (or `-R`, recursive) flag tells `cp` to descend into subdirectories and copy all nested files and folders.
* **Expected Output:**
  ```text
  (Silent execution; full directory tree cloned)
  ```
* **Practical Task:** Duplicate the `cs101` directory tree to `cs101_backup`.
* **Safety Level:** 🟡 Moderate.
* **Common Mistakes:** Running `cp cs101 cs101_backup` without `-r`, resulting in `cp: -r not specified; omitting directory 'cs101'`.
* **AI-Generated Hint:** "Think of `-r` as 'Recursive'—it dives into every folder inside."

---

### Exercise 20: Renaming and Moving Files
* **Exercise Number:** 20
* **Learning Objective:** Rename a file or move it into another directory.
* **Linux Command:** `mv -i greeting_backup.txt cs101/`
* **Explanation:** In Linux, moving and renaming are the exact same underlying filesystem operation (`mv`): updating the inode directory pointer.
* **Expected Output:**
  ```text
  (Silent execution; file relocated to cs101/)
  ```
* **Practical Task:** Move `greeting_backup.txt` into the `cs101/` directory.
* **Safety Level:** 🟡 Moderate.
* **Common Mistakes:** Accidentally renaming a file to a directory name that doesn't exist yet.
* **AI-Generated Hint:** "`mv` renames if the destination is a filename, and moves if the destination is a folder."

---

### Exercise 21: Safe Interactive File Removal
* **Exercise Number:** 21
* **Learning Objective:** Delete an unneeded file with mandatory interactive confirmation.
* **Linux Command:** `rm -i cs101/greeting_backup.txt`
* **Explanation:** `rm` unlinks file inodes from directory entries. The `-i` flag forces confirmation (`rm: remove regular file ...?`) before completing deletion.
* **Expected Output:**
  ```text
  rm: remove regular file 'cs101/greeting_backup.txt'? y
  ```
* **Practical Task:** Safely delete the backup file after confirming the prompt with `y`.
* **Safety Level:** 🔴 High (CLI deletion is irreversible!).
* **Common Mistakes:** Habitually adding `-f` (force), which disables confirmation prompts.
* **AI-Generated Hint:** "Always type `y` to confirm or `n` to abort when prompted by `rm -i`."

---

### Exercise 22: Removing Empty Directories
* **Exercise Number:** 22
* **Learning Objective:** Delete a directory that contains no files.
* **Linux Command:** `rmdir cs101_backup`
* **Explanation:** `rmdir` safely removes empty directories. If the directory contains even a single hidden file, the command halts without deleting anything.
* **Expected Output:**
  ```text
  (Silent execution; empty directory removed)
  ```
* **Practical Task:** Remove an empty directory using `rmdir`.
* **Safety Level:** 🟢 Safe (Cannot delete files or non-empty trees).
* **Common Mistakes:** Attempting to run `rmdir` on a directory containing files, which throws `Directory not empty`.
* **AI-Generated Hint:** "`rmdir` is the safest way to clean up folders because it refuses to destroy files."

---

### Exercise 23: Searching Text with `grep`
* **Exercise Number:** 23
* **Learning Objective:** Search for lines containing specific text strings inside files.
* **Linux Command:** `grep -n "student" /etc/passwd`
* **Explanation:** `grep` (Global Regular Expression Print) scans files for lines matching a pattern. The `-n` flag prints the matching line numbers.
* **Expected Output:**
  ```text
  28:student:x:1000:1000:Student User:/home/student:/bin/bash
  ```
* **Practical Task:** Find your user account entry in `/etc/passwd` with line numbering.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Forgetting that `grep` is case-sensitive by default (use `-i` for case-insensitive matching).
* **AI-Generated Hint:** "Add `-i` to search ignoring uppercase/lowercase: `grep -i 'word' file`."

---

### Exercise 24: Finding Files in Hierarchy with `find`
* **Exercise Number:** 24
* **Learning Objective:** Locate files matching a specific name pattern across directory trees.
* **Linux Command:** `find . -name "*.txt"`
* **Explanation:** `find` traverses the filesystem tree starting from the specified path (`.`) evaluating tests (e.g., `-name` matching shell patterns).
* **Expected Output:**
  ```text
  ./greeting.txt
  ./notes.txt
  ```
* **Practical Task:** Find all text files in your current directory and subdirectories.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Omitting quotation marks around wildcards (`find . -name *.txt`), causing the shell to expand `*.txt` prematurely.
* **AI-Generated Hint:** "Always enclose wildcards in quotes when using `find`: `find . -name '*.c'`."

---

### Exercise 25: Counting Lines, Words, and Characters
* **Exercise Number:** 25
* **Learning Objective:** Count the total number of lines in a file.
* **Linux Command:** `wc -l /etc/passwd`
* **Explanation:** `wc` (Word Count) calculates newline, word, and byte counts. The `-l` flag restricts output specifically to newline count.
* **Expected Output:**
  ```text
  32 /etc/passwd
  ```
* **Practical Task:** Count the total number of user accounts defined in `/etc/passwd`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Confusing `-l` (lines) with `-w` (words) or `-c` (bytes).
* **AI-Generated Hint:** "Pipe any command output into `wc -l` to count items: `ls | wc -l`."

---

### Exercise 26: Pipelining Output Between Utilities
* **Exercise Number:** 26
* **Learning Objective:** Connect the output of one command as the input to another using the pipe operator (`|`).
* **Linux Command:** `ls /etc | grep "release"`
* **Explanation:** The pipe operator `|` redirects stdout from the left command into stdin of the right command, enabling modular Unix tool composition.
* **Expected Output:**
  ```text
  lsb-release
  os-release
  ```
* **Practical Task:** List files in `/etc` and filter only those containing "release" in their name.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Putting space inside the operator or confusing `|` with redirection `>`.
* **AI-Generated Hint:** "Pipes pass live data directly between programs without temporary files on disk."

---

### Exercise 27: Modifying File Permissions Symbolically
* **Exercise Number:** 27
* **Learning Objective:** Grant execute permissions to a shell script using symbolic mode.
* **Linux Command:** `chmod +x run_lab.sh`
* **Explanation:** `chmod` changes file mode bits. The `+x` parameter adds execute permission for user, group, and others, allowing the file to be run as an executable program.
* **Expected Output:**
  ```text
  (Silent execution; file mode updated to include executable bit)
  ```
* **Practical Task:** Create a dummy script with `touch run_lab.sh` and make it executable with `chmod +x run_lab.sh`.
* **Safety Level:** 🟡 Moderate.
* **Common Mistakes:** Granting `+x` indiscriminately to data files or configuration files.
* **AI-Generated Hint:** "Symbolic syntax: `u`=user, `g`=group, `o`=others, `+`=add, `-`=remove, `rwx`=permissions."

---

### Exercise 28: Setting Secure Octal Permissions
* **Exercise Number:** 28
* **Learning Objective:** Protect private credentials using standard octal permissions (`600`).
* **Linux Command:** `chmod 600 secret_keys.txt`
* **Explanation:** Octal `600` translates to `rw-------` (User: read+write [4+2=6]; Group: none [0]; Others: none [0]). Only the file owner can read or modify the file.
* **Expected Output:**
  ```text
  (Silent execution; file permissions locked down)
  ```
* **Practical Task:** Create `secret_keys.txt` and lock its permissions so only you can read or write it.
* **Safety Level:** 🟡 Moderate.
* **Common Mistakes:** Using `chmod 777` out of frustration, making secrets visible to everyone on the system.
* **AI-Generated Hint:** "`600` means owner reads/writes, everyone else is blocked. Perfect for private keys."

---

### Exercise 29: Reading Command Manual Pages
* **Exercise Number:** 29
* **Learning Objective:** Access official system documentation for any Linux command.
* **Linux Command:** `man ls`
* **Explanation:** `man` formats and displays on-line reference manual pages. It is the single most authoritative reference on any Linux system.
* **Expected Output:**
  ```text
  LS(1)                     User Commands                    LS(1)
  NAME
         ls - list directory contents
  SYNOPSIS
         ls [OPTION]... [FILE]...
  ... (press q to quit)
  ```
* **Practical Task:** Open the manual page for `ls`, search for `--color` by typing `/color`, and exit by pressing `q`.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Forgetting that pressing `q` exits the pager.
* **AI-Generated Hint:** "Press `q` to quit, `SPACE` to scroll down, and `/word` to search inside `man`."

---

### Exercise 30: Reviewing Command History
* **Exercise Number:** 30
* **Learning Objective:** Inspect previous commands executed during the terminal session.
* **Linux Command:** `history | tail -n 10`
* **Explanation:** The `history` builtin displays the numbered session history buffer. Combining it with `tail -n 10` reveals your last 10 commands.
* **Expected Output:**
  ```text
  21  rm -i cs101/greeting_backup.txt
  22  rmdir cs101_backup
  23  grep -n "student" /etc/passwd
  24  find . -name "*.txt"
  25  wc -l /etc/passwd
  26  ls /etc | grep "release"
  27  chmod +x run_lab.sh
  28  chmod 600 secret_keys.txt
  29  man ls
  30  history | tail -n 10
  ```
* **Practical Task:** Review your last 10 commands and verify your completion of the exercise set.
* **Safety Level:** 🟢 Safe.
* **Common Mistakes:** Typing sensitive passwords directly in terminal commands where `history` records them in plain text!
* **AI-Generated Hint:** "You can re-run any command from history by typing `!number`, such as `!25`."
