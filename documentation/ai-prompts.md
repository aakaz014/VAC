# AI Skills Documentation & Prompt Engineering Library

**Project Title:** CAPSTONE 70 – Linux Command Line Learning Kit  
**Target Group:** First-Year & Second-Year CSE Undergraduates  
**Document Code:** AI-SKILLS-01  
**Standards:** Comprehensive Documentation of Free AI Tools & Applied Engineering  

---

## 1. Documentation of Required Free AI Tools Used

In accordance with Section 6 of the Capstone Requirements, multiple free-tier AI tools were strategically deployed throughout the research, design, curriculum structuring, and code verification phases.

| Free AI Tool | Primary Purpose in Project | Specific Contribution & Artifact |
| :--- | :--- | :--- |
| **Google Gemini (Free Web Tier)** | Multi-modal research & Linux documentation synthesis. | Researched pedagogical difficulties of first-year CSE students; synthesized POSIX filesystem models and common misconceptions regarding directory traversal and root permissions. |
| **OpenAI ChatGPT (Free 4o-mini Tier)** | Prompt engineering, error parsing, and interactive scenario generation. | Developed interactive command explanation algorithms, error-to-plain-English translation tables, and drafted initial multiple-choice question distractors. |
| **Anthropic Claude (Free Tier)** | High-precision technical writing & safety rule formulation. | Drafted structured pedagogical analogies (e.g., GPS coordinates for `pwd`), refined the Dangerous Commands Guide, and formulated the 10-point command safety checklist. |
| **DeepSeek (Free Web / DeepSeek-V3 Tier)** | Code auditing, shell script analysis, and boundary condition testing. | Audited `linux-learning-demo.sh` for Bash error trap regressions, validated POSIX compliance, and checked parameter expansions against GNU Coreutils edge cases. |
| **NotebookLM (Free Tier by Google)** | Document grounding & source synthesis. | Uploaded GNU Coreutils official PDF manuals to create an authoritative question-answering corpus, preventing hallucinations during exercise design. |
| **GitHub (Free Tier)** | Version control, open-source documentation, and hosting architecture. | Researched Linux open-source educational repositories, validated GitHub Pages static frontend compatibility, and organized project directory layout. |

---

## 2. Demonstration of Nine Core AI Skills

Below are comprehensive case studies documenting nine distinct AI skills applied in the creation of **LinuxLearn AI**.

---

### Skill 1: Prompt Engineering
* **Skill Name:** Advanced Structured Prompt Engineering (Few-Shot System Framing)
* **AI Tool Used:** OpenAI ChatGPT
* **Example Prompt:**
  ```text
  You are an expert Linux System Administrator and University Computer Science Mentor.
  Analyze the command 'rm -rf /tmp/build/ *' from the perspective of a beginner student.
  Structure your output strictly into:
  1. Literal Command Syntax Decomposition (Tokens)
  2. The Subtle Human Error (The exact character mistake)
  3. Real-World Blast Radius (What happens to files)
  4. The Safe, Recommended Defensive Alternative
  Do not use jargon without immediate plain-English explanations.
  ```
* **AI-Generated Result / Application:**
  The AI decomposed the command into two separate operands due to the whitespace between `/tmp/build/` and `*`. It identified that `*` expands to all items in the current working directory, resulting in accidental data loss in the active folder.
* **Verification Method:** Checked against GNU Bash manual section 3.5.8 (Filename Expansion / Globbing).
* **Final Outcome:** Incorporated directly into the Command Safety Center and Exercise 21 in the LinuxLearn AI dashboard.

---

### Skill 2: Technical Explanation
* **Skill Name:** Pedagogical Concept Deconstruction & Analogical Framing
* **AI Tool Used:** Anthropic Claude
* **Example Prompt:**
  ```text
  Explain the three-digit octal permission system (e.g., chmod 755) to a first-year 
  engineering student who understands basic addition and binary bits (4, 2, 1), but has 
  never used a terminal. Use an intuitive analogy and a clear calculation chart.
  ```
* **AI-Generated Result / Application:**
  The AI introduced the "Light Switch Bank" analogy: three switches for Read (value 4), Write (value 2), and Execute (value 1). Adding the values together yields the exact single-digit summary score (4+2+1 = 7 for full access; 4+1 = 5 for read & enter).
* **Verification Method:** Cross-referenced with IEEE Std 1003.1-2017 `chmod` mode specifications.
* **Final Outcome:** Built into Lesson Module 6 ("File Permissions & Security") and the interactive permission calculator widget.

---

### Skill 3: AI-Assisted Research
* **Skill Name:** Systematic Synthesis of Academic Literature and Novice Error Patterns
* **AI Tool Used:** Google Gemini
* **Example Prompt:**
  ```text
  Synthesize the top five cognitive hurdles first- and second-year undergraduate 
  computer science students face when learning the Unix/Linux command-line interface. 
  Focus on mental model discrepancies between Windows GUIs and the hierarchical Unix VFS.
  ```
* **AI-Generated Result / Application:**
  Identified: (1) Root vs. Home directory confusion, (2) The Unix "Rule of Silence", (3) Relative vs. absolute pathing, (4) Inability to undo deletions, and (5) Excessive use of `sudo`.
* **Verification Method:** Validated against computer science education research papers (e.g., ACM SIGCSE literature on command-line interface pedagogy).
* **Final Outcome:** Established the pedagogical architecture of the 14-day microlearning syllabus and guided hints.

---

### Skill 4: Information Verification & Hallucination Auditing
* **Skill Name:** Critical Fact-Checking of LLM Outputs Against Canonical Docs
* **AI Tool Used:** NotebookLM (grounded on GNU Coreutils 9.4 PDF Manual)
* **Example Prompt:**
  ```text
  Evaluate this claim made by an AI model: 'GNU rm with --preserve-root completely prevents
  accidental deletion when a user runs rm -rf /*.'
  Cite the exact section of the GNU Coreutils reference manual to confirm or refute.
  ```
* **AI-Generated Result / Application:**
  NotebookLM cited GNU Coreutils Manual §11.1, clarifying that `--preserve-root` operates only when the argument evaluates strictly to `/`. When `/*` is passed, the shell expands it to child paths (`/bin`, `/etc`), so `--preserve-root` does NOT trigger.
* **Verification Method:** Executed test command `rm --preserve-root -d /` in an isolated Ubuntu 24.04 VM to observe exact error messages.
* **Final Outcome:** Documented in `documentation/verification-report.md` and added as a key warning in the Safety Center.

---

### Skill 5: Technical Writing & Safety Documentation
* **Skill Name:** Comprehensive Safety Manual Authorship
* **AI Tool Used:** Anthropic Claude
* **Example Prompt:**
  ```text
  Draft an academic-grade, comprehensive guide titled 'The Beginner's Guide to Dangerous 
  Linux Commands & Safe Terminal Habits'. Address first- and second-year university students. 
  Include deep explanations of root privileges, raw disk overwriting with dd, fork bombs, 
  and the principle of least privilege. Tone must be professional, supportive, and cautionary.
  ```
* **AI-Generated Result / Application:**
  Produced a ~1,200-word structured guide detailing catastrophic terminal traps, permission vulnerabilities (`chmod 777`), defensive aliases, and the 3-2-1 backup strategy.
* **Verification Method:** Audited against Canonical Ubuntu Server hardening guides and standard POSIX system administration protocols.
* **Final Outcome:** Created `documentation/linux-safety-guide.md` and the Safety Center view in the frontend application.

---

### Skill 6: Quiz and Assessment Design
* **Skill Name:** Bloom-Aligned Multiple-Choice Assessment Formulation
* **AI Tool Used:** OpenAI ChatGPT
* **Example Prompt:**
  ```text
  Design a 15-question diagnostic and summative multiple-choice quiz on Linux fundamentals. 
  Include questions on navigation, file operations, permissions, security, and AI verification. 
  For each question, provide 4 options, the correct answer, and an in-depth pedagogical 
  explanation for why the correct answer is right and why the distractors are wrong.
  ```
* **AI-Generated Result / Application:**
  Generated 15 rigorous questions with balanced difficulty distribution (5 beginner, 6 intermediate, 4 advanced) and detailed pedagogical feedback for both right and wrong answers.
* **Verification Method:** Verified all technical scenarios against Ubuntu 24.04 LTS terminal output.
* **Final Outcome:** Implemented in `documentation/quiz-and-key.md` and the interactive Quiz module in `js/quiz.js`.

---

### Skill 7: Presentation Generation
* **Skill Name:** Executive Capstone Defense Slide Structuring
* **AI Tool Used:** Google Gemini & Gamma Framework
* **Example Prompt:**
  ```text
  Create content for a 6-slide academic capstone presentation titled:
  'CAPSTONE 70: Linux Command Line Learning Kit - How AI Can Help Beginners Learn Linux Safely'.
  Each slide must correspond to the 6 mandatory academic milestones: Problem, Fundamentals/Audience, 
  AI Methodology, Exercises/Safety, Implementation/2-Week Plan, and Results/Verification/Conclusion.
  ```
* **AI-Generated Result / Application:**
  Structured high-impact bulleted slide copy emphasizing the research question, pedagogical differentiation, simulated sandbox safety, and authoritative verification.
* **Verification Method:** Reviewed for academic capstone defense compliance and grading rubric alignment.
* **Final Outcome:** Saved in `documentation/presentation-slides.md`.

---

### Skill 8: Automation Assistance & Defensive Scripting
* **Skill Name:** Defensive Bash Script Architecture
* **AI Tool Used:** DeepSeek (DeepSeek-V3)
* **Example Prompt:**
  ```text
  Write an educational Bash script demonstrating functions, variables, input validation, 
  and error handling. The script must be 100% non-destructive. It must create a temporary 
  sandbox inside $HOME, run safe demonstrations (mkdir, touch, grep, chmod), and register 
  an exit trap to guarantee complete cleanup even if the script is interrupted with Ctrl+C. 
  Include 'set -euo pipefail'.
  ```
* **AI-Generated Result / Application:**
  Provided clean, modular Bash code featuring an automatic `trap cleanup EXIT INT TERM` mechanism, defensive path matching before deletion, and user input sanitization.
* **Verification Method:** Validated using `shellcheck` linting and live execution in an Ubuntu virtual machine.
* **Final Outcome:** Saved in `scripts/linux-learning-demo.sh`.

---

### Skill 9: Responsible AI Usage & Ethics Formulation
* **Skill Name:** Ethical AI Guidelines for Terminal Computing
* **AI Tool Used:** Google Gemini & Anthropic Claude
* **Example Prompt:**
  ```text
  Formulate an ethical code of conduct for novice programmers using AI coding assistants 
  to generate Linux shell commands. Focus on data privacy, system integrity, verification 
  heuristics, and human-in-the-loop oversight.
  ```
* **AI-Generated Result / Application:**
  Drafted the "Four Pillars of Responsible Terminal AI": (1) Never Execute Uninspected Code, (2) Keep Sensitive Tokens Out of Prompts, (3) Use Manuals as Ground Truth, and (4) Practice in Sandboxes Before Production.
* **Verification Method:** Aligned with IEEE Computer Society and ACM Code of Ethics guidelines.
* **Final Outcome:** Saved in `documentation/responsible-ai-and-ethics.md` and integrated into the frontend AI Assistant interface.
