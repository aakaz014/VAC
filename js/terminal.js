/**
 * LinuxLearn AI - Interactive Browser Simulated Linux Terminal
 * Pure JavaScript Virtual Filesystem (VFS) & Shell Engine
 * 100% Zero Host OS Risk: Never executes on host workstation or browser process.
 * Satisfies Capstone 70 Security & Educational Requirements
 */

const LinuxTerminal = {
  // Session State
  currentUser: "student",
  hostname: "linuxlearn",
  currentPath: "/home/student",
  previousPath: "/home/student",
  commandHistory: [],
  historyIndex: -1,
  terminalTheme: "matrix", // "matrix" (green), "cyber" (cyan), "amber" (orange), "white"

  // Hierarchical Virtual Filesystem (VFS)
  vfs: {
    "/": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxr-xr-x",
      children: ["bin", "etc", "home", "var", "tmp", "usr", "opt"]
    },
    "/bin": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxr-xr-x",
      children: ["bash", "sh", "ls", "cat", "cp", "mv", "rm", "pwd", "mkdir", "rmdir", "touch", "chmod", "grep", "date", "echo", "uname", "ps", "ping", "df", "free"]
    },
    "/etc": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxr-xr-x",
      children: ["passwd", "group", "hostname", "os-release", "lsb-release", "hosts", "resolv.conf"]
    },
    "/etc/passwd": {
      type: "file",
      owner: "root",
      group: "root",
      perms: "rw-r--r--",
      size: "1.4K",
      content: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsync:x:4:65534:sync:/bin:/bin/sync\nstudent:x:1000:1000:Student User:/home/student:/bin/bash\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin"
    },
    "/etc/group": {
      type: "file",
      owner: "root",
      group: "root",
      perms: "rw-r--r--",
      size: "820B",
      content: "root:x:0:\ndaemon:x:1:\nadm:x:4:student\nsudo:x:27:student\nstudent:x:1000:"
    },
    "/etc/hostname": {
      type: "file",
      owner: "root",
      group: "root",
      perms: "rw-r--r--",
      size: "11B",
      content: "linuxlearn"
    },
    "/etc/hosts": {
      type: "file",
      owner: "root",
      group: "root",
      perms: "rw-r--r--",
      size: "150B",
      content: "127.0.0.1 localhost\n127.0.1.1 linuxlearn\n::1 ip6-localhost ip6-loopback"
    },
    "/etc/os-release": {
      type: "file",
      owner: "root",
      group: "root",
      perms: "rw-r--r--",
      size: "380B",
      content: "NAME=\"Ubuntu\"\nVERSION=\"24.04 LTS (Noble Numbat)\"\nID=ubuntu\nID_LIKE=debian\nPRETTY_NAME=\"Ubuntu 24.04 LTS\"\nVERSION_ID=\"24.04\""
    },
    "/etc/lsb-release": {
      type: "file",
      owner: "root",
      group: "root",
      perms: "rw-r--r--",
      size: "105B",
      content: "DISTRIB_ID=Ubuntu\nDISTRIB_RELEASE=24.04\nDISTRIB_CODENAME=noble\nDISTRIB_DESCRIPTION=\"Ubuntu 24.04 LTS\""
    },
    "/home": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxr-xr-x",
      children: ["student"]
    },
    "/home/student": {
      type: "dir",
      owner: "student",
      group: "student",
      perms: "rwxr-xr-x",
      children: [".bashrc", ".profile", "Documents", "Downloads", "Desktop", "notes.txt"]
    },
    "/home/student/.bashrc": {
      type: "file",
      owner: "student",
      group: "student",
      perms: "rw-r--r--",
      size: "3.7K",
      content: "# ~/.bashrc: executed by bash(1) for non-login shells.\nalias ll='ls -la'\nalias rm='rm -i'\nalias cp='cp -i'\nalias mv='mv -i'"
    },
    "/home/student/.profile": {
      type: "file",
      owner: "student",
      group: "student",
      perms: "rw-r--r--",
      size: "807B",
      content: "# ~/.profile: executed by the command interpreter for login shells.\nPATH=\"$HOME/bin:$HOME/.local/bin:$PATH\""
    },
    "/home/student/notes.txt": {
      type: "file",
      owner: "student",
      group: "student",
      perms: "rw-r--r--",
      size: "142B",
      content: "Linux Learning Checklist:\n1. Always verify whoami and pwd before running rm.\n2. Never execute chmod 777 on sensitive files.\n3. Understand every flag before pressing enter."
    },
    "/home/student/Documents": {
      type: "dir",
      owner: "student",
      group: "student",
      perms: "rwxr-xr-x",
      children: ["lab_manual.pdf"]
    },
    "/home/student/Documents/lab_manual.pdf": {
      type: "file",
      owner: "student",
      group: "student",
      perms: "rw-r--r--",
      size: "245K",
      content: "%PDF-1.4 [Simulated Binary Document: Capstone 70 Lab Manual]"
    },
    "/home/student/Downloads": {
      type: "dir",
      owner: "student",
      group: "student",
      perms: "rwxr-xr-x",
      children: []
    },
    "/home/student/Desktop": {
      type: "dir",
      owner: "student",
      group: "student",
      perms: "rwxr-xr-x",
      children: []
    },
    "/var": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxr-xr-x",
      children: ["log"]
    },
    "/var/log": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxr-xr-x",
      children: ["syslog", "auth.log"]
    },
    "/var/log/syslog": {
      type: "file",
      owner: "root",
      group: "adm",
      perms: "rw-r-----",
      size: "12K",
      content: "Nov 02 10:00:01 linuxlearn systemd[1]: Starting Daily apt download activities...\nNov 02 10:00:05 linuxlearn systemd[1]: Finished Daily apt download activities.\nNov 02 10:15:22 linuxlearn kernel: Linux version 6.8.0-generic (buildd@canonical)"
    },
    "/var/log/auth.log": {
      type: "file",
      owner: "root",
      group: "adm",
      perms: "rw-r-----",
      size: "4.1K",
      content: "Nov 02 09:30:11 linuxlearn login[412]: pam_unix(login:session): session opened for user student by (uid=0)\nNov 02 10:12:04 linuxlearn sudo[881]: student : TTY=pts/0 ; PWD=/home/student ; USER=root ; COMMAND=/usr/bin/apt update"
    },
    "/tmp": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxrwxrwt",
      children: []
    },
    "/usr": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxr-xr-x",
      children: ["bin", "lib", "share"]
    },
    "/opt": {
      type: "dir",
      owner: "root",
      group: "root",
      perms: "rwxr-xr-x",
      children: []
    }
  },

  // DOM Elements
  outputElem: null,
  inputElem: null,
  promptPrefixElem: null,
  promptPathElem: null,
  explanationBoxElem: null,

  init() {
    this.outputElem = document.getElementById('terminal-viewport');
    this.inputElem = document.getElementById('terminal-input');
    this.promptPrefixElem = document.getElementById('terminal-prompt-prefix');
    this.promptPathElem = document.getElementById('terminal-prompt-path');
    this.explanationBoxElem = document.getElementById('terminal-explanation-text');

    if (!this.inputElem) return;

    this.updatePrompt();
    this.bindEvents();
    this.appendBanner();
  },

  bindEvents() {
    this.inputElem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.inputElem.value.trim();
        if (cmd) {
          this.executeCommand(cmd);
          this.commandHistory.push(cmd);
          this.historyIndex = this.commandHistory.length;
          this.inputElem.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.commandHistory.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.inputElem.value = this.commandHistory[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.inputElem.value = this.commandHistory[this.historyIndex];
        } else {
          this.historyIndex = this.commandHistory.length;
          this.inputElem.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.handleTabAutocomplete();
      }
    });

    if (this.outputElem) {
      this.outputElem.addEventListener('click', () => {
        if (this.inputElem) this.inputElem.focus();
      });
    }
  },

  updatePrompt() {
    if (this.promptPrefixElem) {
      this.promptPrefixElem.textContent = `${this.currentUser}@${this.hostname}:`;
    }
    if (this.promptPathElem) {
      let displayPath = this.currentPath;
      if (displayPath.startsWith("/home/student")) {
        displayPath = "~" + displayPath.slice("/home/student".length);
      }
      this.promptPathElem.textContent = `${displayPath}$ `;
    }
  },

  appendBanner() {
    const banner = `
      <div class="terminal-banner">
        ═══════════════════════════════════════════════════════════════════════════<br>
        <strong>LinuxLearn AI – Interactive Safe Linux Command Line Sandbox v2.0</strong><br>
        Session: <code>${this.currentUser}@${this.hostname}</code> | Kernel 6.8.0-generic (x86_64)<br>
        Type <strong>help</strong> for commands, <strong>man &lt;cmd&gt;</strong> for documentation, or use Tab to complete.<br>
        <em>🛡️ Pure Browser VFS: 100% zero host OS execution risk. Safe for all experimentation.</em><br>
        ═══════════════════════════════════════════════════════════════════════════
      </div>
    `;
    this.appendOutput(banner);
  },

  appendOutput(html) {
    if (!this.outputElem) return;
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = html;
    this.outputElem.appendChild(div);
    this.outputElem.scrollTop = this.outputElem.scrollHeight;
  },

  // Programmatic execution helper
  executeAndSwitch(commandStr) {
    App.navigateTo('terminal');
    setTimeout(() => {
      if (this.inputElem) {
        this.inputElem.value = commandStr;
        this.executeCommand(commandStr);
        this.commandHistory.push(commandStr);
        this.historyIndex = this.commandHistory.length;
        this.inputElem.value = '';
        this.inputElem.focus();
      }
    }, 150);
  },

  // Path resolution helper
  resolvePath(targetPath) {
    if (!targetPath || targetPath === "~") return "/home/student";
    if (targetPath.startsWith("~/")) {
      targetPath = "/home/student" + targetPath.slice(1);
    }
    if (!targetPath.startsWith("/")) {
      if (this.currentPath === "/") {
        targetPath = "/" + targetPath;
      } else {
        targetPath = this.currentPath + "/" + targetPath;
      }
    }

    const segments = targetPath.split("/").filter(Boolean);
    const resolved = [];
    for (const seg of segments) {
      if (seg === ".") continue;
      if (seg === "..") {
        if (resolved.length > 0) resolved.pop();
      } else {
        resolved.push(seg);
      }
    }
    return "/" + resolved.join("/");
  },

  // Master Command Dispatcher
  executeCommand(rawCmd) {
    let displayPath = this.currentPath;
    if (displayPath.startsWith("/home/student")) {
      displayPath = "~" + displayPath.slice("/home/student".length);
    }
    this.appendOutput(`<span class="terminal-prompt-prefix">${this.currentUser}@${this.hostname}:</span><span class="terminal-prompt-path">${displayPath}$ </span><span class="terminal-cmd-text">${this.escapeHtml(rawCmd)}</span>`);

    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Check dangerous interceptor
    if (this.interceptDangerousCommands(trimmed)) {
      App.state.commandsRun = (App.state.commandsRun || 0) + 1;
      App.saveState();
      App.updateDashboardStats();
      return;
    }

    // Redirection
    if (trimmed.includes(">")) {
      this.handleRedirectionCommand(trimmed);
      this.postExecute(trimmed);
      return;
    }

    // Pipes
    if (trimmed.includes("|")) {
      this.handlePipeCommand(trimmed);
      this.postExecute(trimmed);
      return;
    }

    // Token parse
    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    this.explainCommand(cmd, args, trimmed);

    switch (cmd) {
      case "pwd":
        this.cmdPwd();
        break;
      case "whoami":
        this.cmdWhoami();
        break;
      case "date":
        this.cmdDate();
        break;
      case "cal":
        this.cmdCal();
        break;
      case "clear":
        this.cmdClear();
        break;
      case "uname":
        this.cmdUname(args);
        break;
      case "history":
        this.cmdHistory();
        break;
      case "help":
        this.cmdHelp();
        break;
      case "ls":
        this.cmdLs(args);
        break;
      case "cd":
        this.cmdCd(args[0]);
        break;
      case "mkdir":
        this.cmdMkdir(args);
        break;
      case "touch":
        this.cmdTouch(args);
        break;
      case "cat":
        this.cmdCat(args);
        break;
      case "head":
        this.cmdHead(args);
        break;
      case "tail":
        this.cmdTail(args);
        break;
      case "echo":
        this.cmdEcho(args);
        break;
      case "cp":
        this.cmdCp(args);
        break;
      case "mv":
        this.cmdMv(args);
        break;
      case "rm":
        this.cmdRm(args);
        break;
      case "rmdir":
        this.cmdRmdir(args);
        break;
      case "chmod":
        this.cmdChmod(args);
        break;
      case "chown":
        this.cmdChown(args);
        break;
      case "grep":
        this.cmdGrep(args);
        break;
      case "find":
        this.cmdFind(args);
        break;
      case "wc":
        this.cmdWc(args);
        break;
      case "ps":
        this.cmdPs(args);
        break;
      case "top":
      case "htop":
        this.cmdTop();
        break;
      case "kill":
        this.cmdKill(args);
        break;
      case "df":
        this.cmdDf(args);
        break;
      case "du":
        this.cmdDu(args);
        break;
      case "free":
        this.cmdFree(args);
        break;
      case "tree":
        this.cmdTree(args);
        break;
      case "ping":
        this.cmdPing(args);
        break;
      case "curl":
        this.cmdCurl(args);
        break;
      case "apt":
        this.cmdApt(args);
        break;
      case "man":
        this.cmdMan(args[0]);
        break;
      case "sudo":
        this.cmdSudo(args);
        break;
      default:
        this.appendOutput(`<span style="color: var(--color-danger);">${cmd}: command not found</span>. Type <strong>help</strong> for available simulated utilities.`);
    }

    this.postExecute(trimmed);
  },

  postExecute(rawCmd) {
    App.state.commandsRun = (App.state.commandsRun || 0) + 1;
    App.saveState();
    App.updateDashboardStats();
    App.logActivity('cmd', `Ran terminal command: ${rawCmd}`);
  },

  // Dangerous Command Interceptor
  interceptDangerousCommands(cmdStr) {
    const dangerousPatterns = [
      { pattern: /rm\s+-rf\s+\/($|\s|\*)/i, name: "rm -rf / (Recursive Root Deletion)" },
      { pattern: /chmod\s+(-R\s+)?777\s+\//i, name: "chmod -R 777 / (Global Insecure Permissions)" },
      { pattern: /mkfs(\.ext4)?\s+\/dev\//i, name: "mkfs (Disk Partition Wiping)" },
      { pattern: /dd\s+if=\/dev\/zero\s+of=\/dev\//i, name: "dd /dev/zero (Raw Storage Destruction)" },
      { pattern: /:\(\)\{\s*:\|:&\s*\};:/, name: "Bash Fork Bomb" },
      { pattern: />\s*\/dev\/sd/i, name: "Direct Block Overwrite" }
    ];

    for (const d of dangerousPatterns) {
      if (d.pattern.test(cmdStr)) {
        const warningHtml = `
          <div style="background: rgba(248, 81, 73, 0.15); border: 1px solid var(--color-danger); border-radius: 6px; padding: 12px; margin: 8px 0;">
            <strong style="color: var(--color-danger);">🛑 AI SAFETY SHIELD INTERCEPTED DESTRUCTIVE COMMAND:</strong><br>
            <span style="color: #fff; font-weight: 600;">Detected Hazard: ${d.name}</span><br>
            <p style="margin-top: 6px; font-size: 12px; color: #ff7b72;">
              <strong>Systemic Impact:</strong> This command would permanently destroy system files, crash the OS kernel, or obliterate root security boundaries. 
              In real production systems, this is permanent and catastrophic.
            </p>
            <p style="margin-top: 4px; font-size: 12px; color: var(--text-secondary);">
              <strong>Safe Habit:</strong> Never execute wildcards without inspecting targets with <code>ls</code> first. Always practice risky disk operations inside a dedicated Virtual Machine snapshot.
            </p>
          </div>
        `;
        this.appendOutput(warningHtml);
        App.showToast("Destructive command intercepted by safety shield!", "warning");
        return true;
      }
    }
    return false;
  },

  // Real-time Command Explanations
  explainCommand(cmd, args, raw) {
    if (!this.explanationBoxElem) return;
    const libraryEntry = COMMAND_LIBRARY_DATA.find(c => c.name === cmd);
    if (libraryEntry) {
      this.explanationBoxElem.innerHTML = `
        <strong>${libraryEntry.name}</strong> – ${libraryEntry.desc}<br>
        <span style="color: #7ee787;">Syntax: ${libraryEntry.syntax}</span> | 
        <span style="color: var(--text-muted);">Difficulty: ${libraryEntry.difficulty}</span> |
        <span style="color: var(--accent-primary);">Safety: ${libraryEntry.safety.toUpperCase()}</span>
      `;
    } else {
      this.explanationBoxElem.innerHTML = `Executed: <code>${this.escapeHtml(raw)}</code>`;
    }
  },

  // Command Implementations
  cmdPwd() {
    this.appendOutput(this.currentPath);
  },

  cmdWhoami() {
    this.appendOutput(this.currentUser);
  },

  cmdDate() {
    this.appendOutput(new Date().toString());
  },

  cmdCal() {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const calArt = `
    ${month} ${year}
Su Mo Tu We Th Fr Sa
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30`;
    this.appendOutput(calArt);
  },

  cmdClear() {
    if (this.outputElem) {
      this.outputElem.innerHTML = '';
      this.appendBanner();
    }
  },

  copyOutput() {
    if (!this.outputElem) return;
    const text = this.outputElem.innerText;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        App.showToast("Terminal transcript copied to clipboard!", "success");
      });
    } else {
      App.showToast("Could not access clipboard", "warning");
    }
  },

  cmdUname(args) {
    if (args.includes("-a")) {
      this.appendOutput("Linux linuxlearn 6.8.0-40-generic #40-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux");
    } else if (args.includes("-r")) {
      this.appendOutput("6.8.0-40-generic");
    } else {
      this.appendOutput("Linux");
    }
  },

  cmdHistory() {
    if (this.commandHistory.length === 0) {
      this.appendOutput("No command history in current session.");
      return;
    }
    const lines = this.commandHistory.map((c, i) => `  ${(i + 1).toString().padStart(3, ' ')}  ${this.escapeHtml(c)}`).join("<br>");
    this.appendOutput(lines);
  },

  cmdHelp() {
    const helpText = `
Available Simulated Utilities:
  Navigation:   pwd, cd [path], ls [-l|-a|-lh], tree [dir]
  Files:        touch [file], mkdir [-p] [dir], cat [file], head [-n N], tail [-n N], echo [text]
  File Ops:     cp [-r|-i], mv [-i], rm [-i|-r], rmdir [dir]
  Inspection:   grep [pattern] [file], find [path] -name [pattern], wc [-l] [file], diff [f1] [f2]
  Security:     chmod [mode] [file], chown [user:group] [file], whoami, sudo [cmd]
  System/Diag:  date, cal, uname [-a], df [-h], du [-sh], free [-m], ps, top, kill [pid]
  Network:      ping [-c N], curl [url]
  Package:      apt [update|install|remove]
  Screen/Docs:  clear, history, man [cmd], help
  Shell I/O:    | (pipe), > (overwrite), >> (append), TAB (autocomplete)
    `;
    this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color: #79c0ff;">${helpText}</pre>`);
  },

  cmdLs(args) {
    const showAll = args.some(a => a.includes("a"));
    const showLong = args.some(a => a.includes("l"));
    const human = args.some(a => a.includes("h"));

    const targetArg = args.find(a => !a.startsWith("-"));
    const targetPath = targetArg ? this.resolvePath(targetArg) : this.currentPath;

    const dirNode = this.vfs[targetPath];
    if (!dirNode) {
      this.appendOutput(`ls: cannot access '${targetArg}': No such file or directory`);
      return;
    }

    if (dirNode.type !== "dir") {
      this.appendOutput(targetArg);
      return;
    }

    let files = [...(dirNode.children || [])];
    if (showAll) {
      files = [".", "..", ...files];
    }

    if (showLong) {
      let output = `total ${files.length * 4}<br>`;
      files.forEach(f => {
        let fullP = targetPath === "/" ? `/${f}` : `${targetPath}/${f}`;
        let node = this.vfs[fullP] || { perms: "-rw-r--r--", owner: "student", group: "student", size: "4.0K", type: "file" };
        let typeChar = node.type === "dir" ? "d" : "-";
        let dateStr = "Nov 02 10:00";
        let sizeStr = (human ? node.size || "4.0K" : "4096").padStart(6, ' ');
        let color = node.type === "dir" ? "#58a6ff; font-weight:600;" : "#f0f6fc;";
        output += `${typeChar}${node.perms || "rwxr-xr-x"} 1 ${node.owner || "student"} ${node.group || "student"} ${sizeStr} ${dateStr} <span style="color:${color}">${f}</span><br>`;
      });
      this.appendOutput(output);
    } else {
      const output = files.map(f => {
        let fullP = targetPath === "/" ? `/${f}` : `${targetPath}/${f}`;
        let node = this.vfs[fullP];
        let color = (node && node.type === "dir") ? "#58a6ff; font-weight:600;" : "#f0f6fc;";
        return `<span style="color:${color}; margin-right: 16px;">${f}</span>`;
      }).join("");
      this.appendOutput(output);
    }
  },

  cmdCd(target) {
    if (!target || target === "~") {
      this.previousPath = this.currentPath;
      this.currentPath = "/home/student";
      this.updatePrompt();
      return;
    }

    if (target === "-") {
      const temp = this.currentPath;
      this.currentPath = this.previousPath;
      this.previousPath = temp;
      this.appendOutput(this.currentPath);
      this.updatePrompt();
      return;
    }

    const resolved = this.resolvePath(target);
    const node = this.vfs[resolved];
    if (!node) {
      this.appendOutput(`bash: cd: ${target}: No such file or directory`);
      return;
    }
    if (node.type !== "dir") {
      this.appendOutput(`bash: cd: ${target}: Not a directory`);
      return;
    }

    this.previousPath = this.currentPath;
    this.currentPath = resolved;
    this.updatePrompt();
  },

  cmdMkdir(args) {
    const hasP = args.includes("-p");
    const targetArg = args.find(a => !a.startsWith("-"));

    if (!targetArg) {
      this.appendOutput("mkdir: missing operand");
      return;
    }

    const resolved = this.resolvePath(targetArg);

    if (hasP) {
      const segments = resolved.split("/").filter(Boolean);
      let cur = "";
      for (const seg of segments) {
        cur += "/" + seg;
        if (!this.vfs[cur]) {
          this.vfs[cur] = { type: "dir", owner: this.currentUser, group: this.currentUser, perms: "rwxr-xr-x", children: [] };
          const parent = cur.substring(0, cur.lastIndexOf("/")) || "/";
          if (this.vfs[parent] && !this.vfs[parent].children.includes(seg)) {
            this.vfs[parent].children.push(seg);
          }
        }
      }
    } else {
      if (this.vfs[resolved]) {
        this.appendOutput(`mkdir: cannot create directory '${targetArg}': File exists`);
        return;
      }
      const parent = resolved.substring(0, resolved.lastIndexOf("/")) || "/";
      if (!this.vfs[parent]) {
        this.appendOutput(`mkdir: cannot create directory '${targetArg}': No such file or directory (Hint: use -p for nested paths)`);
        return;
      }
      const name = resolved.substring(resolved.lastIndexOf("/") + 1);
      this.vfs[resolved] = { type: "dir", owner: this.currentUser, group: this.currentUser, perms: "rwxr-xr-x", children: [] };
      this.vfs[parent].children.push(name);
    }
  },

  cmdTouch(args) {
    const filename = args[0];
    if (!filename) {
      this.appendOutput("touch: missing file operand");
      return;
    }
    const resolved = this.resolvePath(filename);
    const parent = resolved.substring(0, resolved.lastIndexOf("/")) || "/";
    const name = resolved.substring(resolved.lastIndexOf("/") + 1);

    if (this.vfs[resolved]) {
      return; // timestamp update simulation
    }

    if (!this.vfs[parent]) {
      this.appendOutput(`touch: cannot touch '${filename}': No such file or directory`);
      return;
    }

    this.vfs[resolved] = {
      type: "file",
      owner: this.currentUser,
      group: this.currentUser,
      perms: "rw-r--r--",
      size: "0B",
      content: ""
    };
    this.vfs[parent].children.push(name);
  },

  cmdCat(args) {
    const filename = args[0];
    if (!filename) {
      this.appendOutput("cat: missing operand");
      return;
    }
    const resolved = this.resolvePath(filename);
    const node = this.vfs[resolved];
    if (!node) {
      this.appendOutput(`cat: ${filename}: No such file or directory`);
      return;
    }
    if (node.type === "dir") {
      this.appendOutput(`cat: ${filename}: Is a directory`);
      return;
    }
    this.appendOutput(this.escapeHtml(node.content || ""));
  },

  cmdHead(args) {
    let linesCount = 10;
    let filename = args[0];
    if (args[0] === "-n" && args[1]) {
      linesCount = parseInt(args[1], 10) || 10;
      filename = args[2];
    }
    if (!filename) {
      this.appendOutput("head: missing file operand");
      return;
    }
    const resolved = this.resolvePath(filename);
    const node = this.vfs[resolved];
    if (!node || node.type === "dir") {
      this.appendOutput(`head: cannot open '${filename}': No such file or directory`);
      return;
    }
    const lines = (node.content || "").split("\n").slice(0, linesCount).join("\n");
    this.appendOutput(this.escapeHtml(lines));
  },

  cmdTail(args) {
    let linesCount = 10;
    let filename = args[0];
    if (args[0] === "-n" && args[1]) {
      linesCount = parseInt(args[1], 10) || 10;
      filename = args[2];
    }
    if (!filename) {
      this.appendOutput("tail: missing file operand");
      return;
    }
    const resolved = this.resolvePath(filename);
    const node = this.vfs[resolved];
    if (!node || node.type === "dir") {
      this.appendOutput(`tail: cannot open '${filename}': No such file or directory`);
      return;
    }
    const allLines = (node.content || "").split("\n");
    const lines = allLines.slice(Math.max(0, allLines.length - linesCount)).join("\n");
    this.appendOutput(this.escapeHtml(lines));
  },

  cmdEcho(args) {
    let text = args.join(" ").replace(/^["']|["']$/g, '');
    this.appendOutput(this.escapeHtml(text));
  },

  cmdCp(args) {
    const isRecursive = args.includes("-r") || args.includes("-R");
    const cleanArgs = args.filter(a => !a.startsWith("-"));
    const src = cleanArgs[0];
    const dest = cleanArgs[1];

    if (!src || !dest) {
      this.appendOutput("cp: missing file operand");
      return;
    }

    const srcPath = this.resolvePath(src);
    const destPath = this.resolvePath(dest);
    const srcNode = this.vfs[srcPath];

    if (!srcNode) {
      this.appendOutput(`cp: cannot stat '${src}': No such file or directory`);
      return;
    }

    if (srcNode.type === "dir" && !isRecursive) {
      this.appendOutput(`cp: -r not specified; omitting directory '${src}'`);
      return;
    }

    this.vfs[destPath] = JSON.parse(JSON.stringify(srcNode));
    const parent = destPath.substring(0, destPath.lastIndexOf("/")) || "/";
    const name = destPath.substring(destPath.lastIndexOf("/") + 1);
    if (this.vfs[parent] && !this.vfs[parent].children.includes(name)) {
      this.vfs[parent].children.push(name);
    }
  },

  cmdMv(args) {
    const cleanArgs = args.filter(a => !a.startsWith("-"));
    const src = cleanArgs[0];
    const dest = cleanArgs[1];

    if (!src || !dest) {
      this.appendOutput("mv: missing operand");
      return;
    }

    const srcPath = this.resolvePath(src);
    const destPath = this.resolvePath(dest);
    const srcNode = this.vfs[srcPath];

    if (!srcNode) {
      this.appendOutput(`mv: cannot stat '${src}': No such file or directory`);
      return;
    }

    const srcParent = srcPath.substring(0, srcPath.lastIndexOf("/")) || "/";
    const srcName = srcPath.substring(srcPath.lastIndexOf("/") + 1);
    if (this.vfs[srcParent]) {
      this.vfs[srcParent].children = this.vfs[srcParent].children.filter(c => c !== srcName);
    }

    let finalDest = destPath;
    if (this.vfs[destPath] && this.vfs[destPath].type === "dir") {
      finalDest = destPath + "/" + srcName;
      this.vfs[destPath].children.push(srcName);
    } else {
      const destParent = destPath.substring(0, destPath.lastIndexOf("/")) || "/";
      const destName = destPath.substring(destPath.lastIndexOf("/") + 1);
      if (this.vfs[destParent] && !this.vfs[destParent].children.includes(destName)) {
        this.vfs[destParent].children.push(destName);
      }
    }

    this.vfs[finalDest] = srcNode;
    delete this.vfs[srcPath];
  },

  cmdRm(args) {
    const isRecursive = args.includes("-r") || args.includes("-R");
    const isInteractive = args.includes("-i");
    const cleanArgs = args.filter(a => !a.startsWith("-"));
    const target = cleanArgs[0];

    if (!target) {
      this.appendOutput("rm: missing operand");
      return;
    }

    const resolved = this.resolvePath(target);
    const node = this.vfs[resolved];

    if (!node) {
      this.appendOutput(`rm: cannot remove '${target}': No such file or directory`);
      return;
    }

    if (node.type === "dir" && !isRecursive) {
      this.appendOutput(`rm: cannot remove '${target}': Is a directory (Use -r for directories)`);
      return;
    }

    if (isInteractive) {
      this.appendOutput(`rm: remove regular file '${target}'? <span style="color:var(--color-success);">(Auto-confirmed in sandbox)</span>`);
    }

    const parent = resolved.substring(0, resolved.lastIndexOf("/")) || "/";
    const name = resolved.substring(resolved.lastIndexOf("/") + 1);
    if (this.vfs[parent]) {
      this.vfs[parent].children = this.vfs[parent].children.filter(c => c !== name);
    }
    delete this.vfs[resolved];
  },

  cmdRmdir(args) {
    const target = args[0];
    if (!target) {
      this.appendOutput("rmdir: missing operand");
      return;
    }
    const resolved = this.resolvePath(target);
    const node = this.vfs[resolved];
    if (!node) {
      this.appendOutput(`rmdir: failed to remove '${target}': No such file or directory`);
      return;
    }
    if (node.type !== "dir") {
      this.appendOutput(`rmdir: failed to remove '${target}': Not a directory`);
      return;
    }
    if (node.children && node.children.length > 0) {
      this.appendOutput(`rmdir: failed to remove '${target}': Directory not empty`);
      return;
    }
    const parent = resolved.substring(0, resolved.lastIndexOf("/")) || "/";
    const name = resolved.substring(resolved.lastIndexOf("/") + 1);
    if (this.vfs[parent]) {
      this.vfs[parent].children = this.vfs[parent].children.filter(c => c !== name);
    }
    delete this.vfs[resolved];
  },

  cmdChmod(args) {
    const mode = args[0];
    const file = args[1];
    if (!mode || !file) {
      this.appendOutput("chmod: missing operand");
      return;
    }
    const resolved = this.resolvePath(file);
    const node = this.vfs[resolved];
    if (!node) {
      this.appendOutput(`chmod: cannot access '${file}': No such file or directory`);
      return;
    }
    node.perms = mode;
  },

  cmdChown(args) {
    const ownership = args[0];
    const file = args[1];
    if (!ownership || !file) {
      this.appendOutput("chown: missing operand");
      return;
    }
    const resolved = this.resolvePath(file);
    const node = this.vfs[resolved];
    if (!node) {
      this.appendOutput(`chown: cannot access '${file}': No such file or directory`);
      return;
    }
    const parts = ownership.split(":");
    if (parts[0]) node.owner = parts[0];
    if (parts[1]) node.group = parts[1];
  },

  cmdGrep(args) {
    const isLineNum = args.includes("-n");
    const isCaseInsensitive = args.includes("-i");
    const cleanArgs = args.filter(a => !a.startsWith("-"));
    const pattern = cleanArgs[0];
    const file = cleanArgs[1];

    if (!pattern || !file) {
      this.appendOutput("grep: missing pattern or file operand");
      return;
    }

    const resolved = this.resolvePath(file);
    const node = this.vfs[resolved];
    if (!node) {
      this.appendOutput(`grep: ${file}: No such file or directory`);
      return;
    }

    const lines = (node.content || "").split("\n");
    const regex = new RegExp(pattern.replace(/['"]/g, ''), isCaseInsensitive ? "i" : "");
    const matches = [];

    lines.forEach((line, idx) => {
      if (regex.test(line)) {
        const highlighted = line.replace(regex, `<span style="color:#ff7b72; font-weight:bold;">$&</span>`);
        matches.push(isLineNum ? `<span style="color:#3fb950;">${idx + 1}:</span>${highlighted}` : highlighted);
      }
    });

    if (matches.length > 0) {
      this.appendOutput(matches.join("<br>"));
    }
  },

  cmdFind(args) {
    const nameIdx = args.indexOf("-name");
    let pattern = "*";
    if (nameIdx !== -1 && args[nameIdx + 1]) {
      pattern = args[nameIdx + 1].replace(/['"]/g, '').replace(/\*/g, '.*');
    }

    const regex = new RegExp("^" + pattern + "$");
    const results = [];

    const walk = (path) => {
      const node = this.vfs[path];
      if (!node) return;
      const baseName = path.substring(path.lastIndexOf("/") + 1) || "/";
      if (regex.test(baseName)) {
        results.push("." + path.replace(this.currentPath, ""));
      }
      if (node.type === "dir" && node.children) {
        node.children.forEach(c => {
          walk(path === "/" ? `/${c}` : `${path}/${c}`);
        });
      }
    };

    walk(this.currentPath);
    this.appendOutput(results.join("<br>") || "No matching files found.");
  },

  cmdWc(args) {
    const countLines = args.includes("-l");
    const cleanArgs = args.filter(a => !a.startsWith("-"));
    const file = cleanArgs[0];

    if (!file) {
      this.appendOutput("wc: missing file operand");
      return;
    }

    const resolved = this.resolvePath(file);
    const node = this.vfs[resolved];
    if (!node) {
      this.appendOutput(`wc: ${file}: No such file or directory`);
      return;
    }

    const lines = (node.content || "").split("\n").length;
    const words = (node.content || "").trim().split(/\s+/).length;
    const bytes = (node.content || "").length;

    if (countLines) {
      this.appendOutput(`${lines} ${file}`);
    } else {
      this.appendOutput(`${lines}  ${words}  ${bytes} ${file}`);
    }
  },

  cmdPs(args) {
    const psTable = `
  PID TTY          TIME CMD
  412 tty1     00:00:00 bash
 1289 tty1     00:00:00 ps`;
    this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color:#c9d1d9;">${psTable}</pre>`);
  },

  cmdTop() {
    const topOutput = `
top - 10:25:31 up 4 days,  1 user,  load average: 0.08, 0.04, 0.01
Tasks: 182 total,   1 running, 181 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.2 us,  0.4 sy,  0.0 ni, 98.2 id,  0.1 wa,  0.0 hi,  0.1 si
MiB Mem :   7924.2 total,   3840.1 free,   2140.0 used,   1944.1 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   5420.2 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  412 student   20   0   14.2m   4.8m   3.2m S   0.0   0.1   0:00.12 bash
 1320 student   20   0   18.4m   5.1m   3.6m R   0.0   0.1   0:00.02 top
    1 root      20   0  168.2m  12.4m   8.2m S   0.0   0.2   0:04.18 systemd
(Simulated interactive snapshot)`;
    this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color:#7ee787;">${topOutput}</pre>`);
  },

  cmdKill(args) {
    const pid = args.find(a => !a.startsWith("-"));
    if (!pid) {
      this.appendOutput("kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]");
      return;
    }
    this.appendOutput(`[Process ${pid} terminated]`);
  },

  cmdDf(args) {
    const dfTable = `
Filesystem      Size  Used Avail Use% Mounted on
udev            3.9G     0  3.9G   0% /dev
tmpfs           793M  1.2M  792M   1% /run
/dev/sda1        50G   14G   34G  30% /
tmpfs           3.9G     0  3.9G   0% /dev/shm`;
    this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color:#c9d1d9;">${dfTable}</pre>`);
  },

  cmdDu(args) {
    this.appendOutput("4.2M    /home/student");
  },

  cmdFree(args) {
    const freeTable = `
               total        used        free      shared  buff/cache   available
Mem:            7924        2140        3840         120        1944        5420
Swap:           2048           0        2048`;
    this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color:#c9d1d9;">${freeTable}</pre>`);
  },

  cmdTree(args) {
    const target = args[0] ? this.resolvePath(args[0]) : this.currentPath;
    const treeArt = `
${target}
├── Documents
│   └── lab_manual.pdf
├── Downloads
├── Desktop
├── notes.txt
└── .bashrc

3 directories, 3 files`;
    this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color:#58a6ff;">${treeArt}</pre>`);
  },

  cmdPing(args) {
    const host = args[args.length - 1] || "localhost";
    const pingOutput = `
PING ${host} (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.039 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2048ms
rtt min/avg/max/mdev = 0.038/0.039/0.041/0.001 ms`;
    this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color:#7ee787;">${pingOutput}</pre>`);
  },

  cmdCurl(args) {
    const url = args.find(a => !a.startsWith("-")) || "https://example.com";
    const curlHeader = `
HTTP/2 200 
content-type: text/html; charset=UTF-8
server: ECS (dcb/7F3E)
date: ${new Date().toUTCString()}
content-length: 1256`;
    this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color:#58a6ff;">${curlHeader}</pre>`);
  },

  cmdApt(args) {
    const action = args[0] || "update";
    if (action === "update") {
      const aptOutput = `
Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
Hit:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease
Fetched 126 kB in 1s (115 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.`;
      this.appendOutput(`<pre style="background:transparent; border:none; padding:0; color:#c9d1d9;">${aptOutput}</pre>`);
    } else {
      this.appendOutput(`Reading package lists... Done<br>Building dependency tree... Done<br><span style="color:var(--color-success);">Simulated package operation '${action}' completed successfully.</span>`);
    }
  },

  cmdMan(targetCmd) {
    if (!targetCmd) {
      this.appendOutput("What manual page do you want? (e.g. man ls)");
      return;
    }
    const entry = COMMAND_LIBRARY_DATA.find(c => c.name === targetCmd);
    if (!entry) {
      this.appendOutput(`No manual entry for ${targetCmd}`);
      return;
    }

    const manContent = `
${entry.name.toUpperCase()}(1)               User Commands               ${entry.name.toUpperCase()}(1)

NAME
       ${entry.name} - ${entry.desc}

SYNOPSIS
       ${entry.syntax}

DESCRIPTION
       ${entry.explanation}

EXAMPLES
       ${entry.example}

SAFETY LEVEL
       ${entry.safety.toUpperCase()} - ${entry.safetyNotes}
    `;
    this.appendOutput(`<pre style="background:var(--bg-secondary); border:1px solid var(--border-color); padding:12px; color:#58a6ff;">${manContent}</pre>`);
  },

  cmdSudo(args) {
    if (args.length === 0) {
      this.appendOutput("usage: sudo command");
      return;
    }
    this.appendOutput(`[sudo] password for ${this.currentUser}: `);
    this.appendOutput(`<span style="color:var(--color-warning);">Privilege escalation granted for: ${args.join(" ")}</span>`);
    this.executeCommand(args.join(" "));
  },

  // Redirection handler (> and >>)
  handleRedirectionCommand(raw) {
    const isAppend = raw.includes(">>");
    const parts = raw.split(isAppend ? ">>" : ">");
    const leftCmd = parts[0].trim();
    const targetFile = parts[1].trim();

    let textContent = "";
    if (leftCmd.startsWith("echo ")) {
      textContent = leftCmd.substring(5).replace(/^["']|["']$/g, '');
    } else if (leftCmd === "date") {
      textContent = new Date().toString();
    } else {
      textContent = `Simulated output of: ${leftCmd}`;
    }

    const resolved = this.resolvePath(targetFile);
    const parent = resolved.substring(0, resolved.lastIndexOf("/")) || "/";
    const name = resolved.substring(resolved.lastIndexOf("/") + 1);

    if (this.vfs[resolved]) {
      if (isAppend) {
        this.vfs[resolved].content = (this.vfs[resolved].content ? this.vfs[resolved].content + "\n" : "") + textContent;
      } else {
        this.vfs[resolved].content = textContent;
      }
    } else {
      this.vfs[resolved] = {
        type: "file",
        owner: this.currentUser,
        group: this.currentUser,
        perms: "rw-r--r--",
        size: textContent.length + "B",
        content: textContent
      };
      if (this.vfs[parent] && !this.vfs[parent].children.includes(name)) {
        this.vfs[parent].children.push(name);
      }
    }
  },

  // Pipe handler (|)
  handlePipeCommand(raw) {
    const parts = raw.split("|").map(p => p.trim());
    if (parts.length >= 2) {
      if (parts[1].startsWith("grep")) {
        const pattern = parts[1].split(/\s+/)[1] || "";
        this.appendOutput(`Filtered pipeline matching: <strong>${pattern}</strong>`);
        if (parts[0].includes("/etc")) {
          this.appendOutput("lsb-release<br>os-release");
        } else {
          this.appendOutput("notes.txt");
        }
      } else if (parts[1].startsWith("wc -l")) {
        this.appendOutput("7");
      } else {
        this.appendOutput(`Pipelined output connecting [${parts[0]}] -> [${parts[1]}]`);
      }
    }
  },

  // Smart Tab Autocomplete (Commands AND Files in Current Directory)
  handleTabAutocomplete() {
    const curVal = this.inputElem.value;
    const tokens = curVal.split(/\s+/);
    const lastToken = tokens[tokens.length - 1];

    if (!lastToken) return;

    // If typing first token, autocomplete command names
    if (tokens.length === 1) {
      const availableCommands = [
        "pwd", "whoami", "ls", "cd", "mkdir", "touch", "cat", "echo", "cp", "mv",
        "rm", "rmdir", "chmod", "chown", "grep", "find", "wc", "man", "history",
        "clear", "ping", "uname", "ps", "top", "kill", "df", "free", "tree", "curl", "apt"
      ];
      const matches = availableCommands.filter(c => c.startsWith(lastToken));

      if (matches.length === 1) {
        this.inputElem.value = matches[0] + " ";
      } else if (matches.length > 1) {
        this.appendOutput(`Matches: ${matches.join("  ")}`);
      }
      return;
    }

    // If typing subsequent token, autocomplete filenames in current directory
    const curNode = this.vfs[this.currentPath];
    if (curNode && curNode.children) {
      const matches = curNode.children.filter(f => f.startsWith(lastToken));
      if (matches.length === 1) {
        tokens[tokens.length - 1] = matches[0];
        this.inputElem.value = tokens.join(" ") + " ";
      } else if (matches.length > 1) {
        this.appendOutput(`File Matches: ${matches.join("  ")}`);
      }
    }
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
