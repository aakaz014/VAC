/**
 * LinuxLearn AI - 15-Question Interactive Quiz Engine & Data
 */

const QUIZ_DATA = [
  {
    id: 1,
    question: "What command displays the absolute hierarchical path of your current working directory?",
    options: [
      { text: "whoami", isCorrect: false },
      { text: "pwd", isCorrect: true },
      { text: "dir", isCorrect: false },
      { text: "path", isCorrect: false }
    ],
    explanation: "'pwd' stands for 'Print Working Directory'. It queries the operating system kernel and prints the exact path from '/' down to your active directory."
  },
  {
    id: 2,
    question: "Which symbol is automatically expanded by the Bash shell to represent the logged-in user's home directory?",
    options: [
      { text: "/", isCorrect: false },
      { text: ".", isCorrect: false },
      { text: "~", isCorrect: true },
      { text: "*", isCorrect: false }
    ],
    explanation: "The tilde (~) expands to the path stored in the $HOME environment variable (e.g., /home/student). '/' is the root directory, '.' is current directory, and '*' is a wildcard."
  },
  {
    id: 3,
    question: "Which option should you pass to 'ls' to display hidden dotfiles such as '.bashrc'?",
    options: [
      { text: "-h", isCorrect: false },
      { text: "-l", isCorrect: false },
      { text: "-a", isCorrect: true },
      { text: "-r", isCorrect: false }
    ],
    explanation: "The -a (--all) option instructs ls not to ignore entries starting with '.'. In Unix, any file beginning with a period is treated as hidden."
  },
  {
    id: 4,
    question: "You want to create 'labs/os/week1'. If intermediate folders do not exist, which flag creates them without errors?",
    options: [
      { text: "mkdir labs/os/week1", isCorrect: false },
      { text: "mkdir -r labs/os/week1", isCorrect: false },
      { text: "mkdir -p labs/os/week1", isCorrect: true },
      { text: "touch labs/os/week1", isCorrect: false }
    ],
    explanation: "The -p (--parents) flag tells mkdir to make parent directories as needed without returning an error if they already exist."
  },
  {
    id: 5,
    question: "Why should beginners always prefer 'rm -i' over plain 'rm' when deleting files?",
    options: [
      { text: "-i moves the file to the desktop Recycle Bin.", isCorrect: false },
      { text: "-i prompts for interactive confirmation before deleting each file.", isCorrect: true },
      { text: "-i automatically creates a compressed backup copy.", isCorrect: false },
      { text: "-i allows you to recover the file tomorrow.", isCorrect: false }
    ],
    explanation: "CLI deletion via 'rm' unlinks the file permanently without moving it to any trash bin. The -i (interactive) flag stops and prompts for confirmation, preventing accidental data loss."
  },
  {
    id: 6,
    question: "In the permission string '-rw-r--r--', what permissions does the file owner possess?",
    options: [
      { text: "Read-only", isCorrect: false },
      { text: "Read and Write", isCorrect: true },
      { text: "Read, Write, and Execute", isCorrect: false },
      { text: "Execute-only", isCorrect: false }
    ],
    explanation: "The first character '-' denotes a regular file. The next triad 'rw-' represents the Owner permissions: Read (r) and Write (w) are enabled, while Execute (x) is absent."
  },
  {
    id: 7,
    question: "What is the three-digit octal representation for a file with permissions 'rwxr-xr-x'?",
    options: [
      { text: "644", isCorrect: false },
      { text: "755", isCorrect: true },
      { text: "777", isCorrect: false },
      { text: "750", isCorrect: false }
    ],
    explanation: "Octal math: Owner rwx = 4+2+1 = 7. Group r-x = 4+0+1 = 5. Others r-x = 4+0+1 = 5. Combining gives 755."
  },
  {
    id: 8,
    question: "Which permission should you apply via chmod to lock a private credential file so ONLY you can read and write it?",
    options: [
      { text: "chmod 777 token.txt", isCorrect: false },
      { text: "chmod 644 token.txt", isCorrect: false },
      { text: "chmod 600 token.txt", isCorrect: true },
      { text: "chmod 700 token.txt", isCorrect: false }
    ],
    explanation: "Octal 600 sets User = 6 (read+write), Group = 0 (none), Others = 0 (none). This guarantees absolute privacy for private keys and confidential files."
  },
  {
    id: 9,
    question: "Consider the command 'rm -rf /tmp/build/ *'. What actually happens when executed?",
    options: [
      { text: "Deletes only files inside /tmp/build/ that start with an asterisk.", isCorrect: false },
      { text: "Throws a syntax error because of the space.", isCorrect: false },
      { text: "Deletes /tmp/build/ and then deletes EVERY file in your current working directory.", isCorrect: true },
      { text: "Moves /tmp/build/ to current folder.", isCorrect: false }
    ],
    explanation: "The space makes '*' a separate second argument. The shell expands '*' to every file and folder in your active directory, deleting them all without confirmation!"
  },
  {
    id: 10,
    question: "What is the primary function of the Unix pipe operator (|)?",
    options: [
      { text: "Redirects output into a file on disk, overwriting existing content.", isCorrect: false },
      { text: "Passes the stdout of the left command into the stdin of the right command.", isCorrect: true },
      { text: "Executes both commands in the background simultaneously.", isCorrect: false },
      { text: "Creates a backup copy of both commands.", isCorrect: false }
    ],
    explanation: "The pipe (|) creates an inter-process communication stream in memory, connecting the output of one command into the input of another."
  },
  {
    id: 11,
    question: "Which command searches for case-insensitive 'error' inside system.log with line numbers?",
    options: [
      { text: "find -name 'error' system.log", isCorrect: false },
      { text: "grep -i -n 'error' system.log", isCorrect: true },
      { text: "cat system.log | grep -v 'error'", isCorrect: false },
      { text: "tail -f 'error' system.log", isCorrect: false }
    ],
    explanation: "grep is the pattern searching utility. -i enables case-insensitive search, and -n prints line numbers."
  },
  {
    id: 12,
    question: "If a directory is rwxr-xr-x and contains a file with r--r--r-- owned by the same user, can the owner delete that file?",
    options: [
      { text: "No, because the file lacks write permission.", isCorrect: false },
      { text: "Yes, because deleting a file modifies the PARENT directory's inode list where write permission is present.", isCorrect: true },
      { text: "No, you must use sudo.", isCorrect: false },
      { text: "No, only root can delete read-only files.", isCorrect: false }
    ],
    explanation: "In Unix, deleting a file unlinks it from the parent directory. Because the user has write (w) permission on the parent folder, they are permitted to unlink files within it."
  },
  {
    id: 13,
    question: "In professional Bash scripting, what does 'set -euo pipefail' achieve?",
    options: [
      { text: "Speeds up execution by disabling logging.", isCorrect: false },
      { text: "Exits on error (-e), catches unset variables (-u), and preserves pipeline failure codes (-o pipefail).", isCorrect: true },
      { text: "Runs the script as root automatically.", isCorrect: false },
      { text: "Encrypts the script source code.", isCorrect: false }
    ],
    explanation: "'set -euo pipefail' is defensive Bash boilerplate that halts execution on any failure, preventing silent cascading errors."
  },
  {
    id: 14,
    question: "Why is running 'chmod -R 777 /' considered an unrecoverable system disaster?",
    options: [
      { text: "It immediately shuts down the computer.", isCorrect: false },
      { text: "It grants universal write/exec access across all binaries and keys, causing SSH and daemons to reject logins.", isCorrect: true },
      { text: "It formats the hard drive into FAT32.", isCorrect: false },
      { text: "It permanently deletes your home directory.", isCorrect: false }
    ],
    explanation: "Linux security depends on strict multi-user permission boundaries. If all files become world-writable (777), security daemons (like OpenSSH) refuse to run, locking you out permanently."
  },
  {
    id: 15,
    question: "An AI provides you with a long one-liner command to solve an OS issue. What is the safest, most responsible action?",
    options: [
      { text: "Immediately copy and paste the command with sudo.", isCorrect: false },
      { text: "Pipe the command directly into sudo bash.", isCorrect: false },
      { text: "Review each flag in man pages, understand the blast radius, and test in a virtual machine first.", isCorrect: true },
      { text: "Discard Linux entirely.", isCorrect: false }
    ],
    explanation: "AI models can hallucinate flags or provide commands with catastrophic side effects. The golden rule is: 'Understand every flag via man, verify in an isolated sandbox, and never execute blindly.'"
  }
];

const QuizController = {
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  isAnswered: false,

  init() {
    this.resetQuiz();
  },

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.isAnswered = false;
    this.renderQuestion();
  },

  renderQuestion() {
    const container = document.getElementById('quiz-question-container');
    if (!container) return;

    if (this.currentQuestionIndex >= QUIZ_DATA.length) {
      this.renderResults();
      return;
    }

    const q = QUIZ_DATA[this.currentQuestionIndex];
    this.isAnswered = false;

    // Progress
    const progressPercent = Math.round(((this.currentQuestionIndex) / QUIZ_DATA.length) * 100);

    container.innerHTML = `
      <div class="quiz-progress-row">
        <span>Question <strong>${this.currentQuestionIndex + 1}</strong> of ${QUIZ_DATA.length}</span>
        <span>Score: <strong>${this.score}</strong></span>
      </div>
      <div class="progress-bar-container" style="margin-bottom: 20px;">
        <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
      </div>

      <div class="question-text">${q.question}</div>

      <div class="options-list">
        ${q.options.map((opt, idx) => `
          <div class="option-item" id="opt-${idx}" onclick="QuizController.selectOption(${idx})">
            <span style="font-family: var(--font-mono); color: var(--accent-primary); font-weight: bold;">${String.fromCharCode(65 + idx)})</span>
            <span>${opt.text}</span>
          </div>
        `).join('')}
      </div>

      <div id="quiz-explanation-box" class="quiz-explanation-box">
        <strong>Explanation:</strong> ${q.explanation}
      </div>

      <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
        <button id="quiz-next-btn" class="btn btn-primary" style="display: none;" onclick="QuizController.nextQuestion()">
          ${this.currentQuestionIndex === QUIZ_DATA.length - 1 ? 'Finish Quiz →' : 'Next Question →'}
        </button>
      </div>
    `;
  },

  selectOption(optionIndex) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = QUIZ_DATA[this.currentQuestionIndex];
    const selected = q.options[optionIndex];
    const optionCards = document.querySelectorAll('.option-item');

    optionCards.forEach((card, idx) => {
      card.classList.add('locked');
      if (q.options[idx].isCorrect) {
        card.classList.add('correct');
      }
    });

    if (selected.isCorrect) {
      this.score++;
      App.showToast("Correct! +1 point", "success");
    } else {
      document.getElementById(`opt-${optionIndex}`).classList.add('wrong');
      App.showToast("Incorrect! Review the explanation.", "error");
    }

    this.userAnswers.push({
      questionId: q.id,
      selectedIdx: optionIndex,
      isCorrect: selected.isCorrect
    });

    // Reveal explanation and Next button
    const expBox = document.getElementById('quiz-explanation-box');
    if (expBox) expBox.style.display = 'block';

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.style.display = 'inline-flex';
  },

  nextQuestion() {
    this.currentQuestionIndex++;
    this.renderQuestion();
  },

  renderResults() {
    const container = document.getElementById('quiz-question-container');
    if (!container) return;

    const percent = Math.round((this.score / QUIZ_DATA.length) * 100);
    const passed = percent >= 75;

    // Save to App State
    App.state.quizScore = Math.max(App.state.quizScore || 0, this.score);
    App.state.quizCompleted = true;
    App.saveState();
    App.updateDashboardStats();
    App.logActivity('quiz', `Completed Mastery Quiz: scored ${this.score}/${QUIZ_DATA.length} (${percent}%)`);
    App.incrementDailyGoal();

    container.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 48px; margin-bottom: 12px;">${passed ? '🏆' : '📚'}</div>
        <h2 style="font-size: 22px; color: #fff; margin-bottom: 6px;">Quiz Completed!</h2>
        <p style="color: var(--text-secondary); margin-bottom: 20px;">
          You scored <strong>${this.score} out of ${QUIZ_DATA.length}</strong> (${percent}%)
        </p>

        <div style="max-width: 340px; margin: 0 auto 24px; padding: 16px; border-radius: var(--radius-md); background: var(--bg-tertiary); border: 1px solid var(--border-color);">
          <div style="font-size: 13px; color: ${passed ? 'var(--color-success)' : 'var(--color-warning)'}; font-weight: 600;">
            ${passed ? 'Mastery Achieved! Terminal Safety Certified.' : 'Good Attempt! Review the Safety Center and try again.'}
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-secondary" onclick="QuizController.resetQuiz()">Retake Quiz</button>
          <button class="btn btn-accent" onclick="App.navigateTo('progress')">View Full Progress</button>
        </div>
      </div>
    `;
  }
};
