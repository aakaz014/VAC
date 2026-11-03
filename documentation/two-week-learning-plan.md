# Two-Week Linux Command Line Learning Plan (14-Day Syllabus)

**Target Audience:** 1st & 2nd Year Computer Science Engineering Undergraduates  
**Daily Time Commitment:** Approximately 20 minutes per day  
**Pedagogical Model:** Microlearning with Immediate Hands-on Verification  
**Platform Integration:** LinuxLearn AI Interactive Terminal & Virtual Machine  

---

## Week 1: Linux Foundations, Navigation, and Safe File Operations

### Day 1: Welcome to the Shell – Philosophy & Orientation
* **Daily Topic:** The Unix Philosophy, Shell Interface, and Identity (`whoami`, `pwd`, `date`, `clear`).
* **Learning Objectives:**
  * Understand the role of the shell as an interpreter between user and kernel.
  * Identify current user identity and current working location.
* **Commands to Practise:** `whoami`, `pwd`, `date`, `clear`, `echo $SHELL`.
* **Practical Exercise:** Open terminal, determine your current working directory, print your username, display the current system date, and clear the screen.
* **Estimated Time:** 20 Minutes (8 min theory, 12 min hands-on).
* **Expected Outcome:** Student can distinguish between user session and root session and knows their starting coordinate in the filesystem.

---

### Day 2: Navigating the File Hierarchy
* **Daily Topic:** The Unified Tree, Absolute vs. Relative Paths, and Moving Around (`cd`, `pwd`).
* **Learning Objectives:**
  * Master the root `/`, home directory `~` or `$HOME`, parent directory `..`, and current directory `.`.
  * Navigate confidently without getting lost.
* **Commands to Practise:** `cd /`, `cd ~`, `cd ..`, `cd -`, `pwd`.
* **Practical Exercise:** Navigate from your home directory to `/var/log`, verify with `pwd`, jump back to your previous directory using `cd -`, and return home with `cd ~`.
* **Estimated Time:** 20 Minutes (7 min theory, 13 min hands-on).
* **Expected Outcome:** Student effortlessly navigates across arbitrary directory depths and articulates the difference between `/etc` and `etc`.

---

### Day 3: Directory Inspection & Listing Secrets
* **Daily Topic:** Listing Directory Contents and Hidden Files (`ls` and its flags).
* **Learning Objectives:**
  * Interpret standard columnar output and long listing format (`-l`).
  * Uncover hidden configuration dotfiles (`-a`).
* **Commands to Practise:** `ls`, `ls -l`, `ls -a`, `ls -lh`, `ls -lt`.
* **Practical Exercise:** List all files in your home directory including hidden configuration files (`.bashrc`, `.profile`) with human-readable file sizes.
* **Estimated Time:** 20 Minutes (6 min theory, 14 min hands-on).
* **Expected Outcome:** Student interprets file timestamps, file size indicators (`K`, `M`), and detects hidden files.

---

### Day 4: Creating Files & Directories
* **Daily Topic:** Directory Creation and File Touching (`mkdir`, `touch`).
* **Learning Objectives:**
  * Construct hierarchical project directory trees cleanly.
  * Understand how `touch` modifies inode access/modification timestamps or creates zero-byte files.
* **Commands to Practise:** `mkdir`, `mkdir -p`, `touch`, `ls -R`.
* **Practical Exercise:** Build a laboratory project tree `cs101/assignment1/src` with a single command using `mkdir -p`, and create empty files `main.c` and `utils.h` inside `src/`.
* **Estimated Time:** 20 Minutes (5 min theory, 15 min hands-on).
* **Expected Outcome:** Student constructs nested folder structures in a single step using the idempotent `-p` flag.

---

### Day 5: Reading & Inspecting File Contents
* **Daily Topic:** Text Viewing Utilities (`cat`, `head`, `tail`, `less`).
* **Learning Objectives:**
  * Examine file content without opening heavy graphical editors.
  * Inspect the beginning (`head`) and ending (`tail`) of logs and large code files.
* **Commands to Practise:** `cat`, `head -n 5`, `tail -n 5`, `cat -n`.
* **Practical Exercise:** Create a multi-line note file with `echo`, display line numbers with `cat -n`, and view the first 3 lines using `head -n 3`.
* **Estimated Time:** 20 Minutes (7 min theory, 13 min hands-on).
* **Expected Outcome:** Student selects the right tool for inspecting files and avoids flooding the terminal screen.

---

### Day 6: Safe File Duplication and Renaming
* **Daily Topic:** Copying and Moving Files Safely (`cp`, `mv`).
* **Learning Objectives:**
  * Duplicate files and directories recursively (`-r`).
  * Rename files and move files between directories.
  * Understand the importance of the interactive safety flag (`-i`).
* **Commands to Practise:** `cp`, `cp -i`, `cp -r`, `mv`, `mv -i`.
* **Practical Exercise:** Make a backup copy of `main.c` named `main.c.bak`, create a folder `backup/`, and move `main.c.bak` into `backup/` with safety confirmation.
* **Estimated Time:** 20 Minutes (6 min theory, 14 min hands-on).
* **Expected Outcome:** Student safely copies files without accidental overwriting and understands recursive directory copying.

---

### Day 7: Safe Deletion & Weekly Review
* **Daily Topic:** Permanent Removal vs. Safety Guardrails (`rm`, `rmdir`, `rm -i`).
* **Learning Objectives:**
  * Understand that Linux CLI deletion has no recycle bin / trash folder.
  * Safely remove files and empty directories.
* **Commands to Practise:** `rm`, `rm -i`, `rmdir`, `ls`.
* **Practical Exercise:** Create a test directory with temporary files, preview files with `ls`, delete temporary files one-by-one using `rm -i`, and remove the empty directory with `rmdir`.
* **Estimated Time:** 20 Minutes (8 min theory, 12 min review & hands-on).
* **Expected Outcome:** Student demonstrates cautious deletion habits and never executes blind `rm` operations.

---

## Week 2: Security, Text Filtering, Processes, Scripting & AI Safety

### Day 8: Linux File Permissions Demystified
* **Daily Topic:** Security Architecture – Read (`r`), Write (`w`), and Execute (`x`).
* **Learning Objectives:**
  * Decode file mode strings (`drwxr-xr-x`).
  * Calculate octal values (`r=4`, `w=2`, `x=1`).
* **Commands to Practise:** `ls -l`, `stat`.
* **Practical Exercise:** Inspect permissions of `/etc/passwd` and your user files; calculate the octal equivalent of `rwxr-xr--` (754) and `rw-r--r--` (644).
* **Estimated Time:** 20 Minutes (10 min theory, 10 min exercises).
* **Expected Outcome:** Student quickly converts between symbolic permission strings and 3-digit octal codes.

---

### Day 9: Modifying Permissions (`chmod`)
* **Daily Topic:** Applying Permissions via Symbolic and Numeric Modes (`chmod`).
* **Learning Objectives:**
  * Add or revoke specific permission bits safely (`u+x`, `go-w`).
  * Apply numeric permissions to protect sensitive personal files.
* **Commands to Practise:** `chmod 600`, `chmod 755`, `chmod +x`, `chmod u=rw,go=r`.
* **Practical Exercise:** Create a secret text file `secret.txt`, revoke all group and other permissions with `chmod 600 secret.txt`, and verify with `ls -l`.
* **Estimated Time:** 20 Minutes (6 min theory, 14 min hands-on).
* **Expected Outcome:** Student locks down confidential files and grants execute permissions to scripts safely without using dangerous `777`.

---

### Day 10: Searching & Filtering (`grep`, `find`)
* **Daily Topic:** Finding Files and Searching File Content.
* **Learning Objectives:**
  * Locate files by name across the filesystem with `find`.
  * Filter text lines matching patterns using `grep`.
* **Commands to Practise:** `grep`, `grep -i`, `grep -n`, `find . -name "*.txt"`.
* **Practical Exercise:** Search for the word "root" in `/etc/passwd` using `grep -n`, and find all `.c` files in your home directory with `find . -name "*.c"`.
* **Estimated Time:** 20 Minutes (7 min theory, 13 min hands-on).
* **Expected Outcome:** Student locates required files and extracts specific diagnostic log entries quickly.

---

### Day 11: Pipes, Redirection & Text Counting (`|`, `>`, `>>`, `wc`)
* **Daily Topic:** The Power of Unix Pipes and Standard I/O Redirection.
* **Learning Objectives:**
  * Redirect output to files using overwrite `>` and append `>>`.
  * Chain command outputs into inputs using the pipe operator `|`.
* **Commands to Practise:** `>`, `>>`, `|`, `wc -l`, `sort`, `uniq`.
* **Practical Exercise:** List files in `/etc`, pipe the result into `wc -l` to count them (`ls /etc | wc -l`), and redirect system date to an append log `run.log`.
* **Estimated Time:** 20 Minutes (7 min theory, 13 min hands-on).
* **Expected Outcome:** Student builds two-stage and three-stage pipelines to automate data filtering.

---

### Day 12: Process Management & System Diagnostics
* **Daily Topic:** Inspecting Active Processes and Resource Utilization (`ps`, `top`, `kill`).
* **Learning Objectives:**
  * View active processes and Process Identifiers (PIDs).
  * Safely terminate misbehaving user processes using SIGTERM (`kill`).
* **Commands to Practise:** `ps aux`, `ps -u $USER`, `top`, `kill -15`.
* **Practical Exercise:** Launch a background sleep command (`sleep 300 &`), find its PID using `ps`, and terminate it gracefully with `kill [PID]`.
* **Estimated Time:** 20 Minutes (8 min theory, 12 min hands-on).
* **Expected Outcome:** Student locates their running programs and manages hung tasks without rebooting the system.

---

### Day 13: Introduction to Safe Bash Scripting
* **Daily Topic:** Writing Your First Automated Shell Script.
* **Learning Objectives:**
  * Write a script with shebang `#!/usr/bin/env bash`.
  * Implement variables, exit status checks, and safe execution flags.
* **Commands to Practise:** `nano`, `bash`, `chmod +x`, `set -eu`.
* **Practical Exercise:** Write a 10-line script `backup_notes.sh` that checks if a `notes/` folder exists, creates a timestamped zip or directory copy, and prints a success message.
* **Estimated Time:** 20 Minutes (8 min theory, 12 min hands-on).
* **Expected Outcome:** Student composes and executes a clean, readable Bash script with basic conditional validation.

---

### Day 14: Dangerous Commands, AI Prompt Verification & Capstone Quiz
* **Daily Topic:** The Danger Zone, Auditing AI Commands, and Final Assessment.
* **Learning Objectives:**
  * Recognize catastrophic terminal traps (`rm -rf /`, `chmod -R 777 /`, fork bombs).
  * Critically audit AI-generated shell commands before running them.
  * Complete the 15-question capstone assessment.
* **Commands to Practise:** `man`, `--help`, syntax verification, quiz evaluation.
* **Practical Exercise:** Analyze three AI-generated command snippets, identify the subtle hazard in one of them, verify with `man`, and complete the 15-question LinuxLearn AI quiz.
* **Estimated Time:** 20 Minutes (5 min review, 15 min quiz & reflection).
* **Expected Outcome:** Student achieves >= 80% on the quiz and demonstrates high security awareness when using AI coding assistants for Linux tasks.
