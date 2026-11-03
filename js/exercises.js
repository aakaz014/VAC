/**
 * LinuxLearn AI - 30 Practical Verified Exercises Data & Controller
 */

const EXERCISES_DATA = [
  {
    id: 1,
    title: "1. Identify Your User Identity",
    cmd: "whoami",
    category: "Identity",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Determine active username of current shell session.",
    explanation: "Prints the effective user ID (EUID). Confirms whether you are running as an unprivileged student or as root.",
    output: "student",
    task: "Execute whoami to confirm you are operating under the student account.",
    mistake: "Confusing with 'who' or adding spaces: 'who am i'.",
    hint: "Think of this as asking the operating system: 'Who am I logged in as right now?'"
  },
  {
    id: 2,
    title: "2. Print Working Directory",
    cmd: "pwd",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Print absolute coordinates of active location.",
    explanation: "Prints Working Directory path from root (/) down to current directory.",
    output: "/home/student",
    task: "Verify your starting location in the filesystem tree.",
    mistake: "Confusing with 'passwd' (which changes account password).",
    hint: "pwd is your GPS coordinate in the Linux tree."
  },
  {
    id: 3,
    title: "3. List Directory Contents",
    cmd: "ls",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "View visible files and folders in active directory.",
    explanation: "Lists directory contents in columnar format.",
    output: "Desktop  Documents  Downloads  Music  Pictures  Videos",
    task: "List files inside your home directory.",
    mistake: "Expecting details without providing flags.",
    hint: "Simple ls only displays visible names. Flags reveal hidden files or details."
  },
  {
    id: 4,
    title: "4. Detailed Long Listing",
    cmd: "ls -l",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Inspect file permissions, ownership, size, and timestamps.",
    explanation: "The -l option enables long listing format showing mode bits and metadata.",
    output: "drwxr-xr-x 2 student student 4096 Nov 02 10:00 Documents\n-rw-r--r-- 1 student student  220 Nov 02 10:00 notes.txt",
    task: "Examine detailed attributes of files in your directory.",
    mistake: "Typing ls -1 (number one) instead of ls -l (lowercase L).",
    hint: "Look at the first character: '-' for regular file, 'd' for directory."
  },
  {
    id: 5,
    title: "5. Reveal Hidden Dotfiles",
    cmd: "ls -a",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Display files beginning with a period (dotfiles).",
    explanation: "The -a flag forces ls to list all files, including hidden configuration files.",
    output: ".  ..  .bash_history  .bashrc  .profile  Documents",
    task: "Discover hidden Bash configuration files in your home folder.",
    mistake: "Deleting or moving hidden dotfiles without understanding their role.",
    hint: "Configuration files in Linux are usually hidden dotfiles to prevent clutter."
  },
  {
    id: 6,
    title: "6. Human-Readable File Sizes",
    cmd: "ls -lh",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "View file sizes in Kilobytes (K) or Megabytes (M).",
    explanation: "Combines long format (-l) with human-readable binary prefixes (-h).",
    output: "-rw-r--r-- 1 student student 4.2K Nov 02 10:15 report.pdf",
    task: "Inspect file sizes in intuitive units.",
    mistake: "Typing ls -h without -l (has no visible effect).",
    hint: "Always combine -l and -h: ls -lh."
  },
  {
    id: 7,
    title: "7. Navigate with Relative Path",
    cmd: "cd Documents",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Change working directory using relative path.",
    explanation: "Moves into Documents folder relative to current coordinate without leading slash.",
    output: "(Terminal prompt updates to ~/Documents)",
    task: "Move into the Documents folder and verify with pwd.",
    mistake: "Adding a leading slash: cd /Documents.",
    hint: "No leading slash means 'look right here inside my current folder'."
  },
  {
    id: 8,
    title: "8. Ascend to Parent Directory",
    cmd: "cd ..",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Move up one level in directory hierarchy.",
    explanation: ".. denotes the parent directory.",
    output: "(Terminal prompt returns to parent path)",
    task: "Step one directory upward using cd ...",
    mistake: "Typing cd.. without a space between command and argument.",
    hint: "In Bash, spaces are mandatory between commands and arguments."
  },
  {
    id: 9,
    title: "9. Return to Home Directory",
    cmd: "cd ~",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Instantly return to home directory from any depth.",
    explanation: "The tilde (~) expands to the user's home directory ($HOME).",
    output: "(Terminal prompt shows ~)",
    task: "Return to your home directory in a single command.",
    mistake: "Typing cd \\ instead of cd ~.",
    hint: "~ is your universal home shortcut."
  },
  {
    id: 10,
    title: "10. Toggle Previous Directory",
    cmd: "cd -",
    category: "Navigation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Jump back to previous working directory.",
    explanation: "Toggles to the directory stored in $OLDPWD.",
    output: "/var/log",
    task: "Toggle between two working directories using cd -.",
    mistake: "Confusing - (previous) with ~ (home).",
    hint: "Think of cd - like the 'previous channel' button on your remote."
  },
  {
    id: 11,
    title: "11. Create a New Directory",
    cmd: "mkdir cs101",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Create a new folder for project files.",
    explanation: "Requests kernel to allocate a new directory inode.",
    output: "(Silent execution; folder cs101 created)",
    task: "Create a directory named cs101.",
    mistake: "Creating names with spaces without quotes: mkdir my folder.",
    hint: "Use underscores or hyphens: mkdir cs101_labs."
  },
  {
    id: 12,
    title: "12. Create Nested Directory Tree",
    cmd: "mkdir -p projects/lab1/src",
    category: "Files",
    difficulty: "Intermediate",
    safety: "safe",
    objective: "Construct multi-tier parent and child paths in one step.",
    explanation: "-p (--parents) creates intermediate parent folders automatically.",
    output: "(Silent execution; projects/lab1/src created)",
    task: "Build the complete nested structure projects/lab1/src.",
    mistake: "Running without -p, failing with 'No such file or directory'.",
    hint: "-p stands for parents. It makes directory creation idempotent."
  },
  {
    id: 13,
    title: "13. Create Empty File / Touch",
    cmd: "touch main.c",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Create a 0-byte regular file or update timestamp.",
    explanation: "Updates access/modification times, creating regular file if absent.",
    output: "(Silent execution; main.c created)",
    task: "Create an empty C source file main.c.",
    mistake: "Expecting touch to open a graphical editor.",
    hint: "touch creates a blank canvas. Edit it with nano or vi."
  },
  {
    id: 14,
    title: "14. Output Redirection with Echo",
    cmd: "echo 'Hello Linux' > greeting.txt",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Write text strings into a file using > operator.",
    explanation: "Redirects standard output to create or overwrite greeting.txt.",
    output: "(Silent execution; file created with text)",
    task: "Write a greeting string into greeting.txt.",
    mistake: "Accidentally overwriting an existing file with > instead of >>.",
    hint: "> creates or overwrites; >> appends to the end."
  },
  {
    id: 15,
    title: "15. Display File Contents",
    cmd: "cat greeting.txt",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Dump complete text of a file to stdout.",
    explanation: "Concatenates and prints file bytes to terminal viewport.",
    output: "Hello Linux",
    task: "Read the greeting message stored in greeting.txt.",
    mistake: "Running cat on huge binary or log files, flooding screen.",
    hint: "For long files, use head, tail, or less."
  },
  {
    id: 16,
    title: "16. View File Header Lines",
    cmd: "head -n 5 /etc/passwd",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Preview top lines of a file.",
    explanation: "Prints the first n lines of the target file (default 10).",
    output: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin",
    task: "Inspect first 5 entries of /etc/passwd.",
    mistake: "Typing -5 instead of standard -n 5.",
    hint: "head lets you glance at file headers without scrolling."
  },
  {
    id: 17,
    title: "17. View File Trailer Lines",
    cmd: "tail -n 3 /etc/passwd",
    category: "Files",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Preview bottom lines of a file.",
    explanation: "Prints ending lines of a file; commonly used for recent logs.",
    output: "student:x:1000:1000:Student User:/home/student:/bin/bash\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin",
    task: "View the last 3 accounts registered in /etc/passwd.",
    mistake: "Leaving tail -f running without pressing Ctrl+C to stop.",
    hint: "tail inspects the bottom; tail -f monitors active logs."
  },
  {
    id: 18,
    title: "18. Safe File Duplication",
    cmd: "cp -i greeting.txt greeting_backup.txt",
    category: "Files",
    difficulty: "Intermediate",
    safety: "moderate",
    objective: "Copy a file with interactive overwrite confirmation.",
    explanation: "-i prompts if destination file already exists, preventing data loss.",
    output: "(Prompts if backup exists, otherwise silent)",
    task: "Duplicate greeting.txt safely.",
    mistake: "Swapping source and destination arguments.",
    hint: "Syntax is cp [source] [destination]. -i prevents accidental clobbering."
  },
  {
    id: 19,
    title: "19. Recursive Directory Duplication",
    cmd: "cp -r cs101 cs101_backup",
    category: "Files",
    difficulty: "Intermediate",
    safety: "moderate",
    objective: "Clone an entire directory tree recursively.",
    explanation: "-r copies directories and all nested contents.",
    output: "(Silent execution; folder tree cloned)",
    task: "Copy cs101 directory to cs101_backup.",
    mistake: "Omitting -r, causing 'omitting directory' error.",
    hint: "-r stands for recursive: copying folders inside folders."
  },
  {
    id: 20,
    title: "20. Move / Rename Files",
    cmd: "mv -i greeting_backup.txt cs101/",
    category: "Files",
    difficulty: "Intermediate",
    safety: "moderate",
    objective: "Move a file into another directory or rename it.",
    explanation: "In Unix, moving and renaming are the same inode pointer update.",
    output: "(Silent execution; file relocated)",
    task: "Move backup file into cs101 directory.",
    mistake: "Accidentally renaming a file when intending to move into a folder.",
    hint: "mv renames if destination is a name, moves if destination is a directory."
  },
  {
    id: 21,
    title: "21. Safe Interactive File Removal",
    cmd: "rm -i cs101/greeting_backup.txt",
    category: "Safety",
    difficulty: "Intermediate",
    safety: "danger",
    objective: "Delete a file with mandatory affirmative confirmation.",
    explanation: "-i prompts 'remove regular file ...? (y/n)' before unlinking.",
    output: "rm: remove regular file 'cs101/greeting_backup.txt'? y",
    task: "Safely delete backup file after typing 'y'.",
    mistake: "Using -f to skip prompts, risking unrecoverable deletion.",
    hint: "Always answer y or n when prompted by rm -i."
  },
  {
    id: 22,
    title: "22. Remove Empty Directory Safely",
    cmd: "rmdir cs101_backup",
    category: "Safety",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Delete a directory only if it is completely empty.",
    explanation: "Safest removal command; refuses to execute if files remain inside.",
    output: "(Silent execution; directory removed)",
    task: "Remove empty directory cs101_backup.",
    mistake: "Running on non-empty directory, throwing 'Directory not empty'.",
    hint: "rmdir will never accidentally destroy files."
  },
  {
    id: 23,
    title: "23. Search Text with Grep",
    cmd: "grep -n 'student' /etc/passwd",
    category: "Search",
    difficulty: "Intermediate",
    safety: "safe",
    objective: "Find lines matching a pattern with line numbers.",
    explanation: "Scans files for matching regex patterns; -n adds line numbers.",
    output: "28:student:x:1000:1000:Student User:/home/student:/bin/bash",
    task: "Locate student entry in /etc/passwd.",
    mistake: "Forgetting that grep is case-sensitive by default (use -i).",
    hint: "Use -i for case-insensitive search: grep -i 'pattern' file."
  },
  {
    id: 24,
    title: "24. Find Files by Name in Tree",
    cmd: "find . -name '*.txt'",
    category: "Search",
    difficulty: "Intermediate",
    safety: "safe",
    objective: "Recursively search filesystem tree for matching filenames.",
    explanation: "Walks directory hierarchy evaluating criteria like -name.",
    output: "./greeting.txt\n./notes.txt",
    task: "Find all .txt files in current directory tree.",
    mistake: "Omitting quotes around wildcard: find . -name *.txt.",
    hint: "Always enclose wildcards in quotes when using find: '*.txt'."
  },
  {
    id: 25,
    title: "25. Count Lines with Word Count (wc)",
    cmd: "wc -l /etc/passwd",
    category: "Text",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Count newlines inside a file.",
    explanation: "Calculates total number of newline characters.",
    output: "32 /etc/passwd",
    task: "Count user account lines in /etc/passwd.",
    mistake: "Confusing -l (lines) with -w (words) or -c (characters).",
    hint: "Combine with pipes to count anything: ls | wc -l."
  },
  {
    id: 26,
    title: "26. Chain Commands with Unix Pipe",
    cmd: "ls /etc | grep 'release'",
    category: "Pipes",
    difficulty: "Intermediate",
    safety: "safe",
    objective: "Pass stdout of first command as stdin to second command.",
    explanation: "The pipe (|) connects stdout to stdin in memory.",
    output: "lsb-release\nos-release",
    task: "Filter files in /etc containing 'release'.",
    mistake: "Confusing pipe (|) with file redirection (>).",
    hint: "Pipes pass live data between tools without disk files."
  },
  {
    id: 27,
    title: "27. Grant Script Execute Permission",
    cmd: "chmod +x run_lab.sh",
    category: "Security",
    difficulty: "Intermediate",
    safety: "moderate",
    objective: "Enable script execution bit symbolically.",
    explanation: "+x adds execute permission to user, group, and others.",
    output: "(Silent execution; file marked executable)",
    task: "Make run_lab.sh executable.",
    mistake: "Adding execute permissions to non-script data files.",
    hint: "Symbolic mode: +x adds execution, -w removes write."
  },
  {
    id: 28,
    title: "28. Lock Down Sensitive File (Mode 600)",
    cmd: "chmod 600 secret_keys.txt",
    category: "Security",
    difficulty: "Intermediate",
    safety: "moderate",
    objective: "Restrict file access exclusively to owner.",
    explanation: "600 translates to rw------- (Owner read/write, group & others 0).",
    output: "(Silent execution; permissions secured)",
    task: "Protect secret_keys.txt so only you can read or write it.",
    mistake: "Using chmod 777, exposing credentials to the world.",
    hint: "600 is the industry standard permission for private SSH keys."
  },
  {
    id: 29,
    title: "29. View Official System Manual",
    cmd: "man ls",
    category: "Documentation",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Access authoritative system documentation.",
    explanation: "Formats and displays system reference manual pages.",
    output: "LS(1) User Commands LS(1)\nNAME\n  ls - list directory contents\n... (press q to quit)",
    task: "Inspect official man page for ls.",
    mistake: "Forgetting that 'q' exits the manual pager.",
    hint: "Press 'q' to quit, SPACE to scroll down, /word to search."
  },
  {
    id: 30,
    title: "30. Review Session Command History",
    cmd: "history",
    category: "Productivity",
    difficulty: "Beginner",
    safety: "safe",
    objective: "Inspect sequence of executed commands.",
    explanation: "Prints numbered list of commands in active session buffer.",
    output: "26 ls /etc | grep 'release'\n27 chmod +x run_lab.sh\n28 chmod 600 secret_keys.txt\n29 man ls\n30 history",
    task: "Review your recent command history.",
    mistake: "Typing passwords directly in commands where history records them.",
    hint: "Run !number to re-execute any command from your history list."
  }
];

const ExercisesController = {
  currentFilter: 'all',
  currentSearch: '',

  init() {
    this.render();
  },

  setFilter(filter) {
    this.currentFilter = filter;
    document.querySelectorAll('.exercise-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    this.render();
  },

  handleSearch(query) {
    this.currentSearch = query.toLowerCase().trim();
    this.render();
  },

  render() {
    const container = document.getElementById('exercise-list-container');
    if (!container) return;

    const completed = App.state.completedExercises || [];

    const filtered = EXERCISES_DATA.filter(ex => {
      // Safety/Difficulty filter
      if (this.currentFilter !== 'all') {
        if (this.currentFilter === 'completed') {
          if (!completed.includes(ex.id)) return false;
        } else if (ex.difficulty.toLowerCase() !== this.currentFilter && ex.safety !== this.currentFilter) {
          return false;
        }
      }

      // Search query
      if (this.currentSearch) {
        const matchesTitle = ex.title.toLowerCase().includes(this.currentSearch);
        const matchesCmd = ex.cmd.toLowerCase().includes(this.currentSearch);
        const matchesDesc = ex.explanation.toLowerCase().includes(this.currentSearch);
        if (!matchesTitle && !matchesCmd && !matchesDesc) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <p>No exercises match your filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(ex => {
      const isDone = completed.includes(ex.id);
      let safetyBadge = '';
      if (ex.safety === 'safe') safetyBadge = '<span class="badge badge-safe">🟢 Safe</span>';
      else if (ex.safety === 'moderate') safetyBadge = '<span class="badge badge-mod">🟡 Moderate</span>';
      else safetyBadge = '<span class="badge badge-danger">🔴 Caution</span>';

      return `
        <div class="exercise-card ${isDone ? 'completed' : ''}">
          <div class="exercise-main">
            <input type="checkbox" class="exercise-checkbox" ${isDone ? 'checked' : ''} onchange="ExercisesController.toggleComplete(${ex.id})">
            <div class="exercise-title-group">
              <h4>
                ${ex.title} 
                ${safetyBadge}
                <span class="badge" style="background: var(--bg-tertiary); color: var(--text-secondary);">${ex.difficulty}</span>
              </h4>
              <div style="margin-top: 4px;">
                <span class="exercise-cmd-pill">${ex.cmd}</span>
                <span style="font-size: 11px; color: var(--text-muted); margin-left: 8px;">${ex.objective}</span>
              </div>
              <p class="exercise-desc">💡 <strong>Hint:</strong> ${ex.hint}</p>
            </div>
          </div>
          <div class="exercise-actions">
            <button class="btn btn-secondary btn-sm" onclick="ExercisesController.showDetails(${ex.id})">Details</button>
            <button class="btn btn-accent btn-sm" onclick="LinuxTerminal.executeAndSwitch('${ex.cmd.replace(/'/g, "\\'")}')">Try in Terminal</button>
          </div>
        </div>
      `;
    }).join('');
  },

  toggleComplete(id) {
    let completed = App.state.completedExercises || [];
    const ex = EXERCISES_DATA.find(e => e.id === id);
    if (completed.includes(id)) {
      completed = completed.filter(i => i !== id);
      App.showToast("Exercise marked incomplete", "info");
    } else {
      completed.push(id);
      App.showToast("Exercise mastered! +10 XP", "success");
      if (ex) {
        App.logActivity('exercise', `Completed Exercise #${ex.id}: ${ex.title}`);
      }
      App.incrementDailyGoal();
    }
    App.state.completedExercises = completed;
    App.saveState();
    this.render();
    App.updateDashboardStats();
  },

  showDetails(id) {
    const ex = EXERCISES_DATA.find(e => e.id === id);
    if (!ex) return;

    const modal = document.getElementById('exercise-detail-modal');
    const title = document.getElementById('exercise-modal-title');
    const body = document.getElementById('exercise-modal-body');
    if (!modal || !title || !body) return;

    title.innerHTML = `Exercise #${ex.id}: ${ex.title}`;

    body.innerHTML = `
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <span class="badge badge-info">${ex.category}</span>
        <span class="badge badge-purple">${ex.difficulty}</span>
        <span class="badge ${ex.safety === 'danger' ? 'badge-danger' : ex.safety === 'moderate' ? 'badge-mod' : 'badge-safe'}">${ex.safety.toUpperCase()}</span>
      </div>

      <div style="margin-bottom: 14px;">
        <h5 style="color: #fff; font-size: 13px; margin-bottom: 4px;">Command:</h5>
        <div style="background: var(--bg-primary); padding: 8px 12px; border-radius: var(--radius-sm); font-family: var(--font-mono); color: #79c0ff; font-size: 13px;">
          ${ex.cmd}
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <h5 style="color: #fff; font-size: 13px; margin-bottom: 4px;">Learning Objective:</h5>
        <p style="font-size: 13px; color: var(--text-primary);">${ex.objective}</p>
      </div>

      <div style="margin-bottom: 14px;">
        <h5 style="color: #fff; font-size: 13px; margin-bottom: 4px;">Explanation:</h5>
        <p style="font-size: 13px; color: var(--text-secondary);">${ex.explanation}</p>
      </div>

      <div style="margin-bottom: 14px;">
        <h5 style="color: #fff; font-size: 13px; margin-bottom: 4px;">Expected Terminal Output:</h5>
        <pre class="lesson-code-block terminal-preview">${ex.output}</pre>
      </div>

      <div style="margin-bottom: 14px;">
        <h5 style="color: #fff; font-size: 13px; margin-bottom: 4px;">Practical Task:</h5>
        <p style="font-size: 13px; color: var(--text-primary);">${ex.task}</p>
      </div>

      <div style="margin-bottom: 12px; background: rgba(248, 81, 73, 0.1); border-left: 3px solid var(--color-danger); padding: 8px 12px; border-radius: 4px;">
        <strong style="color: #ff7b72; font-size: 12px;">Common Mistake:</strong>
        <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${ex.mistake}</p>
      </div>

      <div style="margin-bottom: 16px; background: rgba(56, 189, 248, 0.1); border-left: 3px solid var(--accent-primary); padding: 8px 12px; border-radius: 4px;">
        <strong style="color: var(--accent-primary); font-size: 12px;">💡 AI Learning Hint:</strong>
        <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${ex.hint}</p>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px;">
        <button class="btn btn-secondary" onclick="ExercisesController.closeModal()">Close</button>
        <button class="btn btn-accent" onclick="ExercisesController.closeModal(); LinuxTerminal.executeAndSwitch('${ex.cmd.replace(/'/g, "\\'")}')">
          Execute in Terminal ⌨️
        </button>
      </div>
    `;

    modal.classList.add('open');
  },

  closeModal() {
    const modal = document.getElementById('exercise-detail-modal');
    if (modal) modal.classList.remove('open');
  }
};
