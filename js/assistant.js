/**
 * LinuxLearn AI - AI Learning Assistant (Educational Knowledge Engine)
 * Modular Rule-Based Architecture with External LLM Adapter Interface
 * Satisfies Capstone 70 Requirement: Transparent offline simulator with modular API extensibility
 */

// Modular AI Engine Abstraction
const AIEngine = {
  mode: "offline", // "offline" (rule-based) or "custom-api"
  apiKey: "",
  apiEndpoint: "https://api.openai.com/v1/chat/completions",
  modelName: "gpt-4o-mini",

  init() {
    try {
      const storedKey = localStorage.getItem('linuxlearn_ai_key');
      const storedMode = localStorage.getItem('linuxlearn_ai_mode');
      if (storedKey) this.apiKey = storedKey;
      if (storedMode) this.mode = storedMode;
    } catch (e) {
      console.warn("Could not load AI settings", e);
    }
  },

  setApiConfig(mode, key, endpoint, model) {
    this.mode = mode || "offline";
    this.apiKey = key || "";
    if (endpoint) this.apiEndpoint = endpoint;
    if (model) this.modelName = model;

    localStorage.setItem('linuxlearn_ai_mode', this.mode);
    localStorage.setItem('linuxlearn_ai_key', this.apiKey);
  }
};

const AssistantController = {
  chatContainer: null,
  inputElem: null,
  history: [],

  // Dedicated Knowledge Base for Common Linux Queries, Errors, and Safety
  knowledgeBase: {
    // 1. Suggested Prompts from Capstone Specifications
    "explain the linux pwd command": {
      title: "Explanation: pwd (Print Working Directory)",
      content: `
        <strong><code>pwd</code> stands for "Print Working Directory".</strong><br><br>
        • <strong>Purpose:</strong> It outputs the exact, absolute path from the root directory (<code>/</code>) down to the folder you are currently inside.<br>
        • <strong>Syntax:</strong> <code>pwd [-L | -P]</code><br>
        • <strong>Why it's essential:</strong> When executing destructive commands like <code>rm</code>, running <code>pwd</code> first confirms your location so you don't delete files in the wrong directory.<br>
        • <strong>Expected Output:</strong> <code>/home/student</code><br>
        • <strong>Common Pitfall:</strong> Don't confuse it with <code>passwd</code> (which updates your account password).
      `
    },

    "what does chmod 755 mean": {
      title: "Permission Breakdown: chmod 755",
      content: `
        <strong><code>chmod 755</code> sets standard permissions for executable scripts and directories.</strong><br><br>
        The number <code>755</code> represents three octal digits for three user classes:<br>
        • <strong>Owner (User): 7</strong> = 4 (read) + 2 (write) + 1 (execute) → <code>rwx</code> (Full Control)<br>
        • <strong>Group: 5</strong> = 4 (read) + 0 (write) + 1 (execute) → <code>r-x</code> (Read & Run)<br>
        • <strong>Others (World): 5</strong> = 4 (read) + 0 (write) + 1 (execute) → <code>r-x</code> (Read & Run)<br><br>
        💡 <strong>Symbolic format:</strong> <code>-rwxr-xr-x</code><br>
        🛡️ <strong>Safety Note:</strong> Never use <code>777</code>! <code>755</code> ensures only the owner can modify the file, while group members and others can only read and execute it.
      `
    },

    "explain linux file permissions": {
      title: "POSIX Linux File Permissions Model",
      content: `
        <strong>Linux uses POSIX permission triads for three user categories:</strong><br><br>
        Running <code>ls -l</code> displays a 10-character string like <code>-rw-r--r--</code>:<br>
        1. <strong>Type:</strong> <code>-</code> (regular file) or <code>d</code> (directory).<br>
        2. <strong>Triad 1 (User / Owner):</strong> Characters 2-4 (e.g., <code>rw-</code>).<br>
        3. <strong>Triad 2 (Group):</strong> Characters 5-7 (e.g., <code>r--</code>).<br>
        4. <strong>Triad 3 (Others / World):</strong> Characters 8-10 (e.g., <code>r--</code>).<br><br>
        <strong>Octal Values:</strong><br>
        • <code>r</code> (Read) = <strong>4</strong><br>
        • <code>w</code> (Write) = <strong>2</strong><br>
        • <code>x</code> (Execute) = <strong>1</strong><br><br>
        <strong>Standard combinations:</strong><br>
        • <code>644</code> (rw-r--r--): Safe default for documents.<br>
        • <code>755</code> (rwxr-xr-x): Safe default for executables and directories.<br>
        • <code>600</code> (rw-------): Strictly confidential private keys.
      `
    },

    "what is the difference between cp and mv": {
      title: "Difference Between 'cp' (Copy) and 'mv' (Move)",
      content: `
        <strong>Key Differences:</strong><br><br>
        1. <strong><code>cp</code> (Copy):</strong> Duplicates files or directories. The original file remains in place, and a second independent copy is created at the destination. Requires <code>-r</code> for folders.<br>
        2. <strong><code>mv</code> (Move / Rename):</strong> Relocates or renames a file. In Linux, renaming a file IS moving it to a new path. The original inode is updated, and no duplicate data blocks are allocated.<br><br>
        🛡️ <strong>Safety Warning:</strong> Both commands will silently overwrite destination files if they already exist! Always pass <code>-i</code> (interactive) to force confirmation: <code>cp -i file1 file2</code> or <code>mv -i file1 file2</code>.
      `
    },

    "why is sudo dangerous": {
      title: "Security Analysis: Why 'sudo' is Dangerous",
      content: `
        <strong><code>sudo</code> grants root (UID 0) superuser authority.</strong><br><br>
        • <strong>No Safety Railings:</strong> The Linux kernel will not ask 'Are you sure?' if you run a destructive command with sudo. It assumes the root user knows exactly what they are doing.<br>
        • <strong>Blast Radius:</strong> A single typo like <code>sudo rm -rf /var /log</code> (with an accidental space) deletes the entire system log infrastructure.<br>
        • <strong>Audit Trails:</strong> Sudo logs all actions to <code>/var/log/auth.log</code>. Misuse can be traced.<br><br>
        💡 <strong>Defensive Practice:</strong> Follow the <em>Principle of Least Privilege</em>. Never run normal programs, compilers, or daily scripts with sudo. Use sudo only when configuring system daemons or installing packages.
      `
    },

    "explain the rm command safely": {
      title: "Safe Usage of the 'rm' Command",
      content: `
        <strong>The <code>rm</code> command unlinks inodes from the filesystem.</strong><br><br>
        • <strong>Permanent:</strong> Linux command lines have NO Recycle Bin or Trash folder. Deletion is instantaneous and permanent.<br>
        • <strong>Safe Habit 1:</strong> Always use <code>rm -i</code>. This prompts you for interactive confirmation (<code>y/n</code>) before deleting.<br>
        • <strong>Safe Habit 2:</strong> Check with <code>ls</code> first. Before running <code>rm *.bak</code>, run <code>ls *.bak</code> to verify exactly which files match the wildcard.<br>
        • <strong>Safe Habit 3:</strong> Never put a space before an asterisk. <code>rm -rf /dir/ *</code> deletes everything in your current directory!
      `
    },

    "how do i create a directory": {
      title: "How to Create Directories in Linux",
      content: `
        <strong>Use the <code>mkdir</code> (Make Directory) command.</strong><br><br>
        • <strong>Single directory:</strong> <code>mkdir my_folder</code><br>
        • <strong>Nested directory tree:</strong> <code>mkdir -p projects/lab1/src</code><br><br>
        💡 <strong>The '-p' flag is essential:</strong> Without <code>-p</code>, if parent directories (like <code>projects</code>) do not already exist, Linux throws an error: <em>'No such file or directory'</em>. With <code>-p</code>, it creates all missing intermediate folders automatically!
      `
    },

    "give me a beginner linux exercise": {
      title: "Beginner Practice Exercise: Directory Architect",
      content: `
        <strong>Here is a hands-on exercise to practice in the Linux Terminal:</strong><br><br>
        <strong>Goal:</strong> Create a project workspace and verify its permissions.<br>
        1. Navigate home: <code>cd ~</code><br>
        2. Create a folder structure: <code>mkdir -p lab/source</code><br>
        3. Create an empty script: <code>touch lab/source/run.sh</code><br>
        4. Add code: <code>echo 'echo Hello Linux' > lab/source/run.sh</code><br>
        5. Grant execute permission: <code>chmod 755 lab/source/run.sh</code><br>
        6. Verify with long listing: <code>ls -l lab/source/run.sh</code><br><br>
        ⌨️ <em>Switch to the Linux Terminal tab in the sidebar to try this right now!</em>
      `
    },

    // 2. Common Terminal Errors
    "permission denied": {
      title: "Fixing 'Permission Denied' Error",
      content: `
        🔍 <strong>Error Analysis: 'Permission denied'</strong><br>
        • <strong>Root Cause:</strong> Your current user does not have the required mode bit enabled on the target file (<code>r</code> to read, <code>w</code> to write/delete, or <code>x</code> to execute).<br>
        • <strong>Diagnostic:</strong> Run <code>ls -l filename</code> to inspect existing mode bits.<br>
        • <strong>Remediation:</strong><br>
        &nbsp;&nbsp;1. If it's your script: <code>chmod u+x filename</code><br>
        &nbsp;&nbsp;2. If you need read/write: <code>chmod 644 filename</code><br>
        &nbsp;&nbsp;3. If modifying system files: use <code>sudo</code> (e.g., <code>sudo nano /etc/hosts</code>).
      `
    },

    "command not found": {
      title: "Fixing 'Command Not Found' Error",
      content: `
        🔍 <strong>Error Analysis: 'Command not found'</strong><br>
        • <strong>Root Cause:</strong> The shell searched every directory in your <code>$PATH</code> environment variable and found no executable with that name.<br>
        • <strong>Troubleshooting Steps:</strong><br>
        &nbsp;&nbsp;1. Check for typos (Linux is strictly case-sensitive).<br>
        &nbsp;&nbsp;2. If executing a script in your current folder, prepend <code>./</code> (e.g., <code>./myscript.sh</code>).<br>
        &nbsp;&nbsp;3. Check if the package is installed (e.g., <code>sudo apt install &lt;package&gt;</code>).
      `
    },

    "no such file or directory": {
      title: "Fixing 'No Such File or Directory' Error",
      content: `
        🔍 <strong>Error Analysis: 'No such file or directory'</strong><br>
        • <strong>Root Cause:</strong> The file or path you entered does not exist relative to your current coordinate, or you mistakenly added/omitted a leading slash <code>/</code>.<br>
        • <strong>Troubleshooting Steps:</strong><br>
        &nbsp;&nbsp;1. Run <code>pwd</code> to see where you currently are.<br>
        &nbsp;&nbsp;2. Run <code>ls</code> to see files in your active folder.<br>
        &nbsp;&nbsp;3. If creating nested directories with mkdir, remember the <code>-p</code> flag (<code>mkdir -p a/b/c</code>).
      `
    },

    "is a directory": {
      title: "Fixing 'Is a Directory' Error",
      content: `
        🔍 <strong>Error Analysis: 'Is a directory'</strong><br>
        • <strong>Root Cause:</strong> You tried to run a file-only command (like <code>cat</code> or regular <code>rm</code>) on a folder.<br>
        • <strong>Solution:</strong> To see folder contents, use <code>ls foldername</code>. To delete a folder, use <code>rm -r foldername</code>.
      `
    },

    "directory not empty": {
      title: "Fixing 'Directory Not Empty' Error",
      content: `
        🔍 <strong>Error Analysis: 'Directory not empty'</strong><br>
        • <strong>Root Cause:</strong> You ran <code>rmdir</code> on a folder that contains files or hidden dotfiles.<br>
        • <strong>Solution:</strong> Run <code>ls -la folder</code> to see hidden contents. To delete recursively, use <code>rm -ri folder</code>.
      `
    }
  },

  init() {
    AIEngine.init();
    this.chatContainer = document.getElementById('chat-messages-container');
    this.inputElem = document.getElementById('assistant-chat-input');
    this.loadHistory();
    this.bindEvents();
  },

  bindEvents() {
    if (this.inputElem) {
      this.inputElem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.submitQuery();
        }
      });
    }
  },

  loadHistory() {
    try {
      const stored = localStorage.getItem('linuxlearn_chat_history');
      if (stored) {
        this.history = JSON.parse(stored);
        this.renderHistory();
      }
    } catch (e) {
      console.warn("Could not load chat history", e);
    }
  },

  saveHistory() {
    try {
      localStorage.setItem('linuxlearn_chat_history', JSON.stringify(this.history));
    } catch (e) {
      console.warn("Could not save chat history", e);
    }
  },

  clearChat() {
    if (confirm("Clear AI conversation history?")) {
      this.history = [];
      this.saveHistory();
      if (this.chatContainer) {
        this.chatContainer.innerHTML = '';
        this.appendBotWelcome();
      }
      App.showToast("Chat history cleared", "info");
    }
  },

  renderHistory() {
    if (!this.chatContainer) return;
    this.chatContainer.innerHTML = '';
    this.appendBotWelcome();
    this.history.forEach(msg => {
      this.renderBubble(msg.text, msg.sender, false);
    });
  },

  appendBotWelcome() {
    const welcomeHtml = `
      Hello! I am your <strong>LinuxLearn AI Educational Assistant</strong>.<br>
      I am an offline rule-based learning mentor designed specifically for 1st & 2nd year Computer Science Engineering students.
      <br><br>
      <em>Ask me about any Linux command, permission syntax, error messages, or safety recommendations:</em>
    `;
    this.renderBubble(welcomeHtml, 'bot', false);
  },

  sendPrompt(text) {
    if (!text || !text.trim()) return;
    this.handleUserQuery(text.trim());
  },

  submitQuery() {
    if (!this.inputElem) return;
    const q = this.inputElem.value.trim();
    if (q) {
      this.handleUserQuery(q);
      this.inputElem.value = '';
    }
  },

  handleUserQuery(query) {
    this.renderBubble(query, 'user', true);
    this.history.push({ sender: 'user', text: query });
    this.saveHistory();

    // Show typing indicator
    const typingId = this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator(typingId);
      const responseHtml = this.generateResponse(query);
      this.renderBubble(responseHtml, 'bot', true);
      this.history.push({ sender: 'bot', text: responseHtml });
      this.saveHistory();
    }, 450);
  },

  showTypingIndicator() {
    if (!this.chatContainer) return null;
    const id = "typing-" + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = "chat-bubble bot typing-indicator";
    div.innerHTML = `<span>●</span> <span>●</span> <span>●</span> <small style="margin-left: 8px; color: var(--text-muted);">Analyzing query...</small>`;
    this.chatContainer.appendChild(div);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    return id;
  },

  removeTypingIndicator(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.remove();
  },

  renderBubble(html, sender, scroll = true) {
    if (!this.chatContainer) return;
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    div.innerHTML = html;
    this.chatContainer.appendChild(div);
    if (scroll) {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
  },

  // Knowledge Engine Matching Logic
  generateResponse(query) {
    const clean = query.toLowerCase().trim().replace(/[?!.,]/g, '');

    // 1. Direct Knowledge Base Match
    for (const [key, val] of Object.entries(this.knowledgeBase)) {
      if (clean.includes(key)) {
        return `
          <h4 style="color: var(--accent-primary); font-size: 14px; margin-bottom: 6px;">${val.title}</h4>
          ${val.content}
        `;
      }
    }

    // 2. Dangerous Command Safety Check
    const safetyAnalysis = App.analyzeCommandSafety(query);
    if (safetyAnalysis.level !== "safe" && safetyAnalysis.level !== "none") {
      return `
        <div style="background: rgba(248, 81, 73, 0.15); border: 1px solid var(--color-danger); border-radius: 6px; padding: 12px;">
          <strong style="color: var(--color-danger);">${safetyAnalysis.label}</strong><br>
          <p style="margin-top: 6px; font-size: 12px; color: #ff7b72;">
            <strong>Blast Radius:</strong> ${safetyAnalysis.blastRadius}<br>
            <strong>Hazard Explanation:</strong> ${safetyAnalysis.explanation}
          </p>
          <p style="margin-top: 6px; font-size: 12px; color: #7ee787;">
            💡 <strong>Defensive Alternative:</strong> <code>${safetyAnalysis.alternative}</code>
          </p>
        </div>
      `;
    }

    // 3. Command Library Lookup (e.g. "explain ls", "what is grep", "tell me about mkdir")
    const words = clean.split(/\s+/);
    for (const w of words) {
      const cmdMatch = COMMAND_LIBRARY_DATA.find(c => c.name === w);
      if (cmdMatch) {
        return `
          <h4 style="color: var(--accent-primary); font-size: 14px; margin-bottom: 6px;">
            <code>${cmdMatch.name}</code> – ${cmdMatch.desc}
          </h4>
          <p style="font-size: 13px;">${cmdMatch.explanation}</p>
          <div style="margin-top: 8px;">
            <strong>Syntax:</strong> <code>${cmdMatch.syntax}</code><br>
            <strong>Difficulty:</strong> <span class="badge badge-info">${cmdMatch.difficulty}</span> | 
            <strong>Safety:</strong> <span class="badge ${cmdMatch.safety === 'danger' ? 'badge-danger' : 'badge-safe'}">${cmdMatch.safety.toUpperCase()}</span>
          </div>
          <div style="margin-top: 8px; background: var(--bg-tertiary); padding: 8px; border-radius: 4px; font-family: var(--font-mono); font-size: 12px;">
            <strong>Example:</strong> <code>${cmdMatch.example}</code>
          </div>
          <div style="margin-top: 8px; font-size: 12px; color: var(--text-secondary);">
            <strong>Common Pitfall:</strong> ${cmdMatch.commonMistakes}
          </div>
          <div style="margin-top: 10px;">
            <button class="btn btn-sm btn-accent" onclick="LinuxTerminal.executeAndSwitch('${cmdMatch.example}')">Try '${cmdMatch.name}' in Terminal ⌨️</button>
          </div>
        `;
      }
    }

    // 4. Fallback Educational Advice
    return `
      🤖 <strong>LinuxLearn AI Guidance:</strong><br>
      You asked: <em>"${App.escapeHtml(query)}"</em><br><br>
      • <strong>Syntax Tip:</strong> Most Linux commands follow: <code>command [flags] [target]</code>.<br>
      • <strong>Terminal Self-Help:</strong> In Linux, you can view the complete manual for any utility by typing <code>man &lt;command&gt;</code> (e.g., <code>man ls</code>).<br>
      • <strong>Safety Recommendation:</strong> When practicing unknown options or deletion commands, test with <code>ls</code> first, or use the interactive <code>-i</code> flag.<br><br>
      <em>Try asking one of the suggested prompt buttons on the right for instant deep dives!</em>
    `;
  },

  copyPromptTemplate(type) {
    let template = "";
    if (type === 'flags') {
      template = "Act as an expert Linux systems instructor. Deconstruct the following Linux command flags line by line, explaining what each flag does, potential safety hazards, and best practices: [INSERT COMMAND HERE]";
    } else if (type === 'error') {
      template = "I am a 1st year Computer Science student learning Linux. I ran the command '[INSERT COMMAND]' and received the error '[INSERT ERROR MESSAGE]'. Explain what this error means, the underlying operating system concept, and step-by-step how to resolve it safely.";
    } else if (type === 'script') {
      template = "Write a safe, defensive Bash shell script for [DESCRIBE TASK]. Include 'set -euo pipefail', validate all input parameters, trap errors cleanly, and ensure no files can be accidentally deleted without confirmation.";
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(template).then(() => {
        App.showToast("Prompt template copied to clipboard! Paste into ChatGPT or Gemini.", "success");
      });
    } else {
      alert("Template:\n\n" + template);
    }
  }
};
