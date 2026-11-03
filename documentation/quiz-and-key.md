# Fifteen-Question Linux Mastery & Safety Quiz (with Complete Answer Key)

**Platform:** LinuxLearn AI Assessment Engine  
**Course:** Capstone 70 – Linux Command Line Learning Kit  
**Target:** 1st & 2nd Year Computer Science Engineering Students  
**Document Code:** QUIZ-15-MASTER  

---

## 1. Assessment Overview
This 15-question diagnostic and summative assessment evaluates core competence in Linux terminal navigation, file management, POSIX security permissions, command safety, and the verification of AI-generated shell commands.

---

## 2. Fifteen Assessment Questions

### Question 1: Current Location Inspection
**What command displays the absolute hierarchical path of your current working directory?**
* A) `whoami`
* B) `pwd`
* C) `dir`
* D) `path`
* **Correct Answer:** B) `pwd`
* **Detailed Explanation:** `pwd` stands for "Print Working Directory". It queries the operating system and prints the exact path from `/` down to the active directory. `whoami` prints your username, while `dir` is primarily a legacy DOS command (though aliased in some Linux shells).

---

### Question 2: Home Directory Expansion
**Which symbol is automatically expanded by the Bash shell to represent the current logged-in user's home directory?**
* A) `/`
* B) `.`
* C) `~`
* D) `*`
* **Correct Answer:** C) `~`
* **Detailed Explanation:** The tilde (`~`) character is expanded by Bash to the path stored in the `$HOME` environment variable (e.g., `/home/student`). `/` represents the filesystem root, `.` represents the current directory, and `*` is the wildcard glob character.

---

### Question 3: Revealing Hidden Configuration Files
**Which option should you pass to `ls` to display hidden files (dotfiles) such as `.bashrc`?**
* A) `-h`
* B) `-l`
* C) `-a`
* D) `-r`
* **Correct Answer:** C) `-a`
* **Detailed Explanation:** The `-a` (or `--all`) option instructs `ls` not to ignore entries starting with `.`. In Unix, any file beginning with a period is treated as hidden. `-h` formats sizes in human-readable units, `-l` uses long listing format, and `-r` reverses the sorting order.

---

### Question 4: Idempotent Directory Creation
**You want to create the nested folder structure `labs/os/week1`. If the intermediate directories do not exist yet, which command will create all of them without throwing an error?**
* A) `mkdir labs/os/week1`
* B) `mkdir -r labs/os/week1`
* C) `mkdir -p labs/os/week1`
* D) `touch labs/os/week1`
* **Correct Answer:** C) `mkdir -p labs/os/week1`
* **Detailed Explanation:** The `-p` (or `--parents`) option tells `mkdir` to create parent directories as needed without returning an error if they already exist. `touch` creates regular files, not directories, and `-r` is not a valid flag for standard `mkdir`.

---

### Question 5: Safe File Removal
**Why should beginners always prefer `rm -i` over plain `rm` when deleting files?**
* A) `-i` moves the file to the desktop Recycle Bin.
* B) `-i` prompts for interactive confirmation before deleting each file.
* C) `-i` automatically creates a compressed backup copy.
* D) `-i` allows you to recover the file if you change your mind tomorrow.
* **Correct Answer:** B) `-i` prompts for interactive confirmation before deleting each file.
* **Detailed Explanation:** CLI deletion via `rm` unlinks the file permanently without moving it to any trash bin. The `-i` (interactive) flag stops and asks `rm: remove regular file '...'? (y/n)`, preventing catastrophic accidental deletions.

---

### Question 6: File Mode Interpretation
**In the permission string `-rw-r--r--`, what permissions does the file owner possess?**
* A) Read-only
* B) Read and Write
* C) Read, Write, and Execute
* D) Execute-only
* **Correct Answer:** B) Read and Write
* **Detailed Explanation:** The string decomposes as follows: the leading `-` indicates a regular file. The next three characters `rw-` represent the User (owner) permissions: `r` (read) is set, `w` (write) is set, and `x` (execute) is absent (`-`). The next two triads `r--` and `r--` represent group and others respectively (read-only).

---

### Question 7: Octal Permission Calculation
**What is the three-digit octal representation for a file with permissions `rwxr-xr-x`?**
* A) 644
* B) 755
* C) 777
* D) 750
* **Correct Answer:** B) 755
* **Detailed Explanation:** Octal values are calculated by summing: Read = 4, Write = 2, Execute = 1.
  * Owner `rwx` = 4 + 2 + 1 = 7.
  * Group `r-x` = 4 + 0 + 1 = 5.
  * Others `r-x` = 4 + 0 + 1 = 5.
  * Combining the three gives `755`.

---

### Question 8: Protecting Confidential Files
**Which octal permission should you apply using `chmod` to ensure that ONLY the file owner can read and write a confidential file, while blocking group and all others completely?**
* A) `chmod 777 token.txt`
* B) `chmod 644 token.txt`
* C) `chmod 600 token.txt`
* D) `chmod 700 token.txt`
* **Correct Answer:** C) `chmod 600 token.txt`
* **Detailed Explanation:** Octal `600` assigns User = 6 (`rw-`), Group = 0 (`---`), Others = 0 (`---`). This guarantees that only the owner can read and mutate the file, which is the security standard for private SSH keys, tokens, and passwords.

---

### Question 9: The Danger of Wildcard Spacing
**Consider the command `rm -rf /tmp/build/ *`. What will actually happen when executed?**
* A) It deletes only files inside `/tmp/build/` that start with an asterisk.
* B) It throws a syntax error because of the space before the asterisk.
* C) It deletes `/tmp/build/` and then deletes EVERY file and directory in your current working location.
* D) It moves `/tmp/build/` to the current folder.
* **Correct Answer:** C) It deletes `/tmp/build/` and then deletes EVERY file and directory in your current working location.
* **Detailed Explanation:** The space makes `*` a distinct second argument. The shell expands `*` to all files and directories in the current working directory, and `rm -rf` deletes them all without confirmation!

---

### Question 10: The Unix Pipe Operator
**What is the primary function of the Unix pipe operator (`|`)?**
* A) It redirects output into a file on disk, overwriting existing content.
* B) It passes the standard output (stdout) of the command on the left into the standard input (stdin) of the command on the right.
* C) It executes both commands in the background simultaneously.
* D) It creates a backup copy of both commands.
* **Correct Answer:** B) It passes the standard output (stdout) of the command on the left into the standard input (stdin) of the command on the right.
* **Detailed Explanation:** The pipe (`|`) creates an inter-process communication stream in memory, enabling modular Unix tool chaining (e.g., `ls /etc | grep "conf" | wc -l`). Overwriting to disk is performed by `>`, not `|`.

---

### Question 11: Text Pattern Searching
**Which command searches for the case-insensitive word "error" inside the file `system.log` and displays matching line numbers?**
* A) `find -name "error" system.log`
* B) `grep -i -n "error" system.log`
* C) `cat system.log | grep -v "error"`
* D) `tail -f "error" system.log`
* **Correct Answer:** B) `grep -i -n "error" system.log`
* **Detailed Explanation:** `grep` is the pattern searching utility. `-i` enables case-insensitive matching ("error", "ERROR", "Error"), and `-n` prefixes each matching output line with its 1-based line number.

---

### Question 12: Directory Deletion Permissions
**If a directory has permissions `rwxr-xr-x` and contains a file with read-only permissions `r--r--r--` owned by the same user, can the owner delete that file using `rm`?**
* A) No, because the file itself lacks write permission (`w`).
* B) Yes, because deleting a file modifies the PARENT directory's inode list, where the user has write (`w`) permission.
* C) No, you must use `sudo` to delete any read-only file.
* D) No, only the root user can unlink read-only files.
* **Correct Answer:** B) Yes, because deleting a file modifies the PARENT directory's inode list, where the user has write (`w`) permission.
* **Detailed Explanation:** In Unix filesystem architecture, deleting a file unlinks its directory entry from the parent directory. Because the parent directory has write permission (`w`), the user is permitted to remove entries within it. `rm` may issue a confirmation prompt because the file itself is write-protected, but answering `y` completes the deletion.

---

### Question 13: Defensive Shell Script Settings
**In a professional Bash script, what does the directive `set -euo pipefail` achieve?**
* A) It speeds up script execution by disabling logging.
* B) It halts the script immediately if any command fails (`-e`), catches unset variables (`-u`), and preserves pipeline failure exit codes (`-o pipefail`).
* C) It runs the script with superuser root privileges automatically.
* D) It encrypts the Bash script to prevent unauthorized reading.
* **Correct Answer:** B) It halts the script immediately if any command fails (`-e`), catches unset variables (`-u`), and preserves pipeline failure exit codes (`-o pipefail`).
* **Detailed Explanation:** `set -euo pipefail` is the universal defensive Bash boilerplate. By default, Bash continues executing subsequent lines even if an earlier line fails (which can lead to catastrophic cascading bugs). `-e` exits on error, `-u` treats undeclared variables as fatal errors, and `pipefail` catches pipe errors.

---

### Question 14: Systemic Hazard of `chmod -R 777 /`
**Why is running `chmod -R 777 /` considered an unrecoverable system disaster?**
* A) It immediately shuts down the machine's power supply.
* B) It grants universal write and execute access across all system binaries, libraries, and security tokens, causing daemons like SSH to reject logins and destroying system integrity.
* C) It formats the hard drive into FAT32 format.
* D) It permanently deletes the user's home folder.
* **Correct Answer:** B) It grants universal write and execute access across all system binaries, libraries, and security tokens, causing daemons like SSH to reject logins and destroying system integrity.
* **Detailed Explanation:** Linux security relies on strict multi-user permission boundaries. If all files and directories become world-writable (`777`), any process can tamper with `/bin`, `/etc/shadow`, or `/lib`. Critical services like OpenSSH refuse to run with world-writable configurations, effectively locking everyone out permanently.

---

### Question 15: Safe AI Integration in Linux Learning
**An AI chatbot provides you with a long one-liner command to fix a network configuration issue. What is the safest, most responsible sequence of actions?**
* A) Immediately copy and paste the command with `sudo` into your workstation terminal.
* B) Pipe the command directly into `sudo bash`.
* C) Review each command and flag using `man`, ask the AI to explain the blast radius, and test it in an isolated Virtual Machine before applying it.
* D) Discard Linux entirely and install another operating system.
* **Correct Answer:** C) Review each command and flag using `man`, ask the AI to explain the blast radius, and test it in an isolated Virtual Machine before applying it.
* **Detailed Explanation:** AI models can hallucinate flags, recommend outdated syntax, or generate commands with unintended destructive side-effects. The golden rule of responsible AI usage is: **"Understand every flag via `man`, verify in an isolated sandbox, and never execute blindly on a host machine."**

---

## 3. Complete Answer Key Summary Table

| Question # | Topic Domain | Difficulty | Correct Answer | Key Concept Tested |
| :---: | :--- | :---: | :---: | :--- |
| **Q1** | Navigation | Beginner | **B** (`pwd`) | Current working directory coordinates |
| **Q2** | Shell Expansion | Beginner | **C** (`~`) | Tilde expansion to user home |
| **Q3** | File Inspection | Beginner | **C** (`-a`) | Listing hidden dotfiles |
| **Q4** | Directory Management | Intermediate | **C** (`mkdir -p`) | Idempotent parent directory creation |
| **Q5** | Safe Practices | Beginner | **B** (`-i`) | Interactive deletion confirmation |
| **Q6** | Permissions | Intermediate | **B** (`rw-`) | Decoding owner permission bits |
| **Q7** | Permissions | Intermediate | **B** (`755`) | Octal math: 4(r) + 2(w) + 1(x) |
| **Q8** | Security | Intermediate | **C** (`600`) | Locking down sensitive private files |
| **Q9** | Dangerous Pitfalls | Advanced | **C** | Catastrophic wildcard spacing bug |
| **Q10** | I/O Streams | Intermediate | **B** | Standard output to standard input piping |
| **Q11** | Text Processing | Intermediate | **B** (`grep -in`) | Case-insensitive search with line numbering |
| **Q12** | Filesystem Architecture | Advanced | **B** | Parent directory write vs. file deletion |
| **Q13** | Shell Scripting | Advanced | **B** (`set -euo`) | Defensive script execution flags |
| **Q14** | System Administration | Advanced | **B** | System-wide permission destruction |
| **Q15** | Responsible AI | Beginner/Ethics | **C** | Verify via `man` & test in isolated VM |
