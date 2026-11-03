# CAPSTONE 70: Linux Command Line Learning Kit
### How Can AI Help Beginners Learn Linux Commands Safely Through Guided Practice?

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platform: Web / Linux / WSL](https://img.shields.io/badge/Platform-Web%20%7C%20Ubuntu%20%7C%20WSL2-blue.svg)]()
[![Academic Standard: Capstone 70](https://img.shields.io/badge/Academic%20Level-1st%20%26%202nd%20Year%20CSE-orange.svg)]()
[![Status: Complete & Verified](https://img.shields.io/badge/Status-Verified%20Canonical-brightgreen.svg)]()

---

## 1. Project Overview & Research Question

**LinuxLearn AI** is an academic-grade, AI-assisted Linux command-line learning platform engineered specifically for **first-year and second-year Computer Science Engineering (CSE) undergraduates** and terminal novices.

### Core Research Question:
> *"How can AI help beginners learn Linux commands safely through guided practice, sandboxed simulation, and canonical documentation verification?"*

### Primary Pedagogical Objectives:
* **Eliminate Terminal Anxiety:** Provide a 100% safe, client-side browser terminal with an in-memory Virtual Filesystem (VFS) that eliminates the fear of corrupting host operating systems.
* **Cultivate Defensive Habits:** Instill a mandatory 10-point command safety protocol, highlighting the hazards of wildcards, `chmod 777`, and uninspected privilege escalation (`sudo`).
* **Responsible AI Integration:** Teach students to critically evaluate AI-generated shell commands, deconstruct command syntax, audit blast radiuses, and cross-reference against official Linux manual pages (`man`) before execution.

---

## 2. Source Code & Documentation Architecture

```text
LinuxLearn-AI/ (d:/project/vac-project/)
│
├── index.html                           # Single-page dashboard application (10 complete views)
├── css/
│   └── style.css                        # Modern developer dark theme (VS Code aesthetic)
├── js/
│   ├── app.js                           # App coordinator, routing, LocalStorage persistence, command library
│   ├── terminal.js                      # Simulated browser terminal with in-memory VFS & safety shield
│   ├── lessons.js                       # 11 beginner lessons (POSIX foundations, permissions, scripting)
│   ├── exercises.js                     # 30 verified practical exercises with AI hints & completion tracking
│   ├── quiz.js                          # 15 interactive MCQs with instant feedback & explanation
│   └── assistant.js                     # Rule-based educational AI assistant & prompt template generator
│
├── assets/
│   └── images/                          # Visual assets & architectural diagrams
│
├── documentation/
│   ├── research-report.md               # Tasks 1, 2, 3: Target audience, Linux research & canonical verification
│   ├── command-safety-checklist.md      # Task 4: Command safety checklist, reference table & damage prevention
│   ├── two-week-learning-plan.md        # Task 5: 14-day microlearning syllabus (20 mins/day)
│   ├── thirty-command-exercises.md      # Task 6: Comprehensive 30 verified exercises with all 9 attributes
│   ├── linux-safety-guide.md            # Task 7: ~1,200-word dangerous commands guide & safe terminal habits
│   ├── presentation-slides.md           # Task 8: 6-slide academic capstone presentation content
│   ├── quiz-and-key.md                  # Task 9: 15-question quiz with detailed explanations & complete answer key
│   ├── verification-report.md           # Task 11: Tested commands, expected vs actual VM output, hallucinations log
│   ├── ai-prompts.md                    # Sections 5 & 6: 9 AI skills demonstrated, prompt library & free AI tools
│   ├── responsible-ai-and-ethics.md     # Task 12: Ethical code, human supervision, data privacy & verification
│   └── demonstration-guide.md           # Section 12: 10-step minute-by-minute faculty viva demonstration script
│
├── scripts/
│   └── linux-learning-demo.sh           # Task 10: Defensive, non-destructive educational Bash script
│
└── README.md                            # Comprehensive project guide, setup instructions & grading alignment
```

---

## 3. Technology Stack & Design Principles

* **Frontend:** Clean HTML5, Modern CSS3 (CSS Custom Properties, Glassmorphism, Responsive Grid/Flexbox), Vanilla JavaScript (ES6+).
* **Storage:** HTML5 LocalStorage for zero-cost, persistent student progress tracking without requiring cloud logins or remote databases.
* **Dependencies:** Zero external paid dependencies or closed-source libraries. Runs entirely offline in any modern web browser.
* **Safety Sandbox:** Pure JavaScript in-memory Virtual Filesystem (VFS). Zero commands are executed on the host operating system. Destructive operations (`rm -rf /`, `chmod -R 777`, fork bombs) trigger educational interceptor shields.

---

## 4. Quick Start & Setup Instructions

### 4.1 Running the Frontend Application (Zero Installation Required)
1. Navigate to the project root directory:
   ```bash
   cd d:/project/vac-project
   ```
2. Open `index.html` directly in your favorite browser:
   * **Windows:** Double-click `index.html` or run `start index.html` in PowerShell.
   * **VS Code:** Right-click `index.html` and select **"Open with Live Server"**.
   * **CLI Python Server:** Run `python -m http.server 8080` and open `http://localhost:8080`.

### 4.2 Running the Safe Automation Bash Script inside Ubuntu VM or WSL
To test the educational automation script in a real Linux environment:
1. Open an Ubuntu terminal (WSL2 or VirtualBox VM).
2. Navigate to the project scripts directory:
   ```bash
   chmod +x scripts/linux-learning-demo.sh
   ./scripts/linux-learning-demo.sh
   ```
3. The script will execute non-destructive tests inside `$HOME/linuxlearn_sandbox_*`, demonstrate `mkdir -p`, file creation, `grep`, `chmod 600`, and clean itself up automatically upon exit using Bash `trap` handlers.

---

## 5. Setup Guide for Isolated Virtual Machines (Oracle VirtualBox)

For complete safety when graduating from the browser simulation to native Linux systems administration:

```text
Step 1: Download Oracle VirtualBox (Free & Open Source) from https://www.virtualbox.org/
Step 2: Download Ubuntu 24.04 LTS Desktop ISO from https://ubuntu.com/download/desktop
Step 3: Create a new VM: 4GB RAM, 2 CPU Cores, 25GB Virtual Disk (VDI Dynamic Allocation).
Step 4: Complete standard Ubuntu installation with a standard unprivileged student account.
Step 5: TAKE A SNAPSHOT: Name it "Clean Baseline".
        If an accidental command damages the filesystem, select "Restore Snapshot" to reset the OS in 5 seconds.
```

---

## 6. Alignment with Capstone 70 Mandatory Requirements

| Mandatory Requirement | Project Implementation & Deliverable Artifact | Status |
| :--- | :--- | :---: |
| **Task 1: Select Target Audience** | Detailed 1st/2nd-year CSE analysis in `documentation/research-report.md` §2. | ✅ Verified |
| **Task 2: Research Linux Fundamentals** | 8 technical domains researched in `documentation/research-report.md` §3. | ✅ Verified |
| **Task 3: Verify Research** | Cross-referenced against GNU Coreutils & POSIX in `documentation/research-report.md` §4. | ✅ Verified |
| **Task 4: Safety Checklist & Reference** | 10-point checklist & reference table in `documentation/command-safety-checklist.md`. | ✅ Verified |
| **Task 5: Two-Week Learning Plan** | 14-day microlearning syllabus (20 min/day) in `documentation/two-week-learning-plan.md`. | ✅ Verified |
| **Task 6: Thirty Linux Exercises** | 30 practical exercises with all 9 attributes in `documentation/thirty-command-exercises.md`. | ✅ Verified |
| **Task 7: Dangerous Commands Guide** | ~1,200-word defensive manual in `documentation/linux-safety-guide.md`. | ✅ Verified |
| **Task 8: Six-Slide Presentation** | Complete 6-slide academic defense content in `documentation/presentation-slides.md`. | ✅ Verified |
| **Task 9: Fifteen-Question Quiz** | 15 MCQs with instant feedback & answer key in `documentation/quiz-and-key.md`. | ✅ Verified |
| **Task 10: Bash Script Automation** | Defensive script with traps & validation in `scripts/linux-learning-demo.sh`. | ✅ Verified |
| **Task 11: Testing & Verification** | Expected vs actual VM output & hallucinations log in `documentation/verification-report.md`. | ✅ Verified |
| **Task 12: Responsible AI & Ethics** | Ethical computing & verification standards in `documentation/responsible-ai-and-ethics.md`. | ✅ Verified |
| **Section 5: Required AI Skills** | 9 distinct AI skills documented with prompts & outcomes in `documentation/ai-prompts.md`. | ✅ Verified |
| **Section 6: Required Free AI Tools** | 6 free tools (Gemini, ChatGPT, Claude, DeepSeek, NotebookLM, GitHub) in `documentation/ai-prompts.md`. | ✅ Verified |
| **Section 7: Frontend Application** | 10 complete working views in `index.html`, `css/style.css`, and `js/*.js`. | ✅ Verified |
| **Section 12: Final Demonstration** | 10-step viva script in `documentation/demonstration-guide.md`. | ✅ Verified |

---

## 7. Faculty Evaluation Rubric Alignment (100 Marks)

* **Criterion 1: Research Quality & Verification (20 Marks):** Comprehensive analysis grounded in GNU Coreutils and POSIX.1-2017 specifications; empirical hallucination auditing.
* **Criterion 2: Curricular & Pedagogical Design (20 Marks):** 14-day microlearning plan, 30 verified exercises with Bloom-aligned taxonomy, and 15-question diagnostic assessment.
* **Criterion 3: Software Implementation & Terminal Simulation (25 Marks):** Fully interactive client-side dashboard, in-memory VFS, safety shields, and zero host-system exposure.
* **Criterion 4: Safety Standards & Technical Writing (15 Marks):** ~1,200-word danger guide, 10-point checklist, and defensive scripting architecture (`set -euo pipefail`).
* **Criterion 5: Responsible AI Integration (10 Marks):** 9 demonstrated AI skills, transparent rule-based assistant labeling, and structured prompt engineering templates.
* **Criterion 6: Demonstration & Documentation Completeness (10 Marks):** Step-by-step viva script, 6-slide defense presentation, and comprehensive setup documentation.

---

## 8. Authors & Academic Credits

* **Capstone Title:** CAPSTONE 70 – Linux Command Line Learning Kit
* **Academic Focus:** AI-Assisted Safe Terminal Pedagogy for Novice Computer Science Undergraduates
* **Department:** Department of Computer Science & Engineering
* **Academic Year:** 2026–2027
#   V A C  
 