# Dilshaj Infotech - Skill Development Program

> A modern, responsive landing and registration portal for the **Dilshaj Infotech Skill Development Program** — empowering school, intermediate, and college students with practical web development skills and hands-on project experience.

---

## 📌 Program Overview

The **Dilshaj Infotech Skill Development Program** is a structured **35-day journey** designed to take students from absolute basics to building and deploying functional web applications. 

The program combines **21 days of offline or online training** (1 hour/day) followed by a **14-day mentor-guided project-building phase**, culminating in a project showcase and grand prize distribution.

### 🌟 Key Highlights

- **Flexible Training Modes (21 Days Offline / 21 Days Online)**: Choose between hands-on classroom sessions at the Dilshaj Infotech Training Center (with dedicated computer labs) or interactive live online sessions with recorded access and mentor doubt clearing.
- **Student-Friendly Timings**: 1-hour daily sessions scheduled conveniently after school and college hours.
- **Web Development Focus**: Practical mastery in HTML5, CSS3, Modern JavaScript, and Responsive Web Design (no theoretical rote learning; no full-stack/backend clutter).
- **14-Day Mentored Project Building**: Students build a real-world, functional web application with continuous guidance and code reviews.
- **Combined Prize Pool**: **Up to ₹5,00,000** in cash awards, trophies, tech gifts, and perks across both tracks.
- **Affordable Track-Based Fees**: Nominal one-time fee — **₹499 for Track 1** (School & Inter) and **₹999 for Track 2** (College & Degree), covering complete training, project mentorship, study kit, and official MSME & AICTE recognized certificate.
- **MSME & AICTE Recognized Certification**: Every student who completes the training and submits their project receives an official, verifiable certificate recognized under **MSME (Govt. of India)** and **AICTE** frameworks, providing high value for academic and career advancement.

---

## 🎓 Academic Tracks & Prize Breakdown

The program is split into two specialized academic tracks tailored to students' educational levels:

### 1. School & Intermediate Track
- **Eligibility**: Students from **Class 6th through Intermediate 2nd Year (Class 12)**.
- **Training Mode**: 21 Days Offline Classroom OR 21 Days Online Live (1 Hr/Day).
- **Registration Fee**: **₹499 Only**.
- **Curriculum Focus**: Web fundamentals, logic building, semantic HTML5, styling with CSS3, interactive JavaScript, and mobile-friendly responsive design.
- **Certification**: Official **MSME & AICTE Recognized Certificate**.
- **Total Prize Pool**: **₹2,00,000**
  - 🥇 **1st Prize**: ₹50,000 Cash + Winner Trophy & MSME/AICTE Certificate of High Distinction
  - 🥈 **2nd Prize**: ₹30,000 Cash + Runner-Up Trophy & MSME/AICTE Certificate of Excellence
  - 🥉 **3rd Prize**: ₹20,000 Cash + 2nd Runner-Up Trophy & MSME/AICTE Certificate of Excellence
  - Up to ₹1,00,000 in top cash awards + merit trophies, perks, and participation certificates.

### 2. College & Degree Track
- **Eligibility**: **B.Tech, B.E., BCA, MCA, B.Sc, Diploma, and all UG/PG Degree students**.
- **Training Mode**: 21 Days Offline Classroom OR 21 Days Online Live (1 Hr/Day).
- **Registration Fee**: **₹999 Only**.
- **Curriculum Focus**: Advanced web UI architecture, modern ES6+ JavaScript, event-driven state handling, DOM manipulation, responsive layouts, and portfolio-worthy project deployment.
- **Certification**: Official **MSME & AICTE Recognized Certificate**.
- **Total Prize Pool**: **₹3,00,000**
  - 🥇 **1st Prize**: ₹1,00,000 Cash + Winner Trophy & MSME/AICTE Certificate of High Distinction
  - 🥈 **2nd Prize**: ₹50,000 Cash + Runner-Up Trophy & MSME/AICTE Certificate of Excellence
  - 🥉 **3rd Prize**: ₹25,000 Cash + 2nd Runner-Up Trophy & MSME/AICTE Certificate of Excellence
  - 🎁 **Top 100 Students Gifts**: ₹1,25,000 worth gifts, tech gear, and learning perks distributed among the top 100 college participants!
  - Internship opportunities at Dilshaj Infotech for top performers.

---

## 🗺️ Program Roadmap

### Phase 1: 21-Day Training - Offline / Online (1 Hr / Day)
- **Days 01–03**: Orientation, Web Architecture & Semantic HTML5
- **Days 04–07**: Modern CSS3, Flexbox & Responsive Layouts
- **Days 08–11**: JavaScript Fundamentals & DOM Manipulation
- **Days 12–15**: Event Handling, User Interactivity & Form Validation
- **Days 16–18**: State Management & Client-Side Logic
- **Days 19–21**: Project Wireframing, Architecture & Final Preparation

### Phase 2: 14-Day Mentored Project Building
- **Days 01–03**: Problem Statement Definition & Wireframe Approval
- **Days 04–08**: Core UI & Layout Implementation
- **Days 09–11**: JavaScript Interactivity & Logic Integration
- **Days 12–13**: Testing, Responsive Polish & Mentor Code Reviews
- **Day 14**: Final Project Showcase, Jury Evaluation & Grand Awards Ceremony

---

## 📁 Repository Structure

```
skill_development/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Actions deployment workflow
├── css/
│   └── style.css           # Custom responsive CSS design system & typography
├── js/
│   └── app.js              # Interactive UI logic (tabs, drawer, FAQ accordion)
├── images/                 # Program assets & visuals
├── index.html              # Main landing & registration page
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## 🛠️ Technology Stack (Website)

- **Frontend**: Semantic HTML5 & Modern Vanilla CSS3 (Custom design tokens, CSS Grid, Flexbox, responsive typography, and glassmorphism styling).
- **Interactivity**: Vanilla JavaScript (ES6+) for tab navigation, responsive mobile drawer, animated FAQ accordions, and smooth anchor scrolling.
- **Registration Pipeline**: Direct integration with official track-specific Google Forms, capturing student submissions seamlessly into organized Google Sheets.
- **Zero Runtime Dependencies**: Ultra-fast load times with pure native web standards.

---

## 🚀 How to Run Locally

Because this project is built entirely with standard web technologies, no build tools, bundlers, or package managers are required:

### Option 1: Direct File Launch
- **Windows (cmd)**:
  ```cmd
  start index.html
  ```
- **PowerShell**:
  ```powershell
  Start-Process index.html
  ```
- Or simply double-click `index.html` in your file explorer.

### Option 2: Local HTTP Server (Recommended)
- **Python 3**:
  ```bash
  python -m http.server 8080
  ```
  Then visit `http://localhost:8080` in your web browser.
- **VS Code**: Right-click `index.html` and choose **"Open with Live Server"**.
- **Node.js**:
  ```bash
  npx serve .
  ```

---

## 📋 Student Registration Workflow

1. Students select their eligible academic track on the landing page:
   - **School & Inter Track (Class 6th – Inter 2nd Year)**
   - **College & Degree Track (UG / PG / Diploma)**
2. Clicking **"Register for Track"** opens the dedicated Google Registration Form.
3. Form submissions are logged in real-time to Google Sheets for admissions verification.
4. Complete the registration fee per selected track (**₹499 for School Track**, **₹999 for College Track**) following the instructions in the form.

---

## 🌐 Deployment & CI/CD

The website is configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`) and can be hosted seamlessly on:
- **GitHub Pages**
- **Vercel / Netlify / Cloudflare Pages**
- **AWS S3 + CloudFront / EC2 (Nginx)**

---

## 📞 Contact & Support

**Dilshaj Infotech Skill Development Center**  
- **Location**: Dilshaj Infotech Training Center  
- **Mode**: 21 Days Offline Classroom / 21 Days Online Live Training  
- **Website**: [Dilshaj Infotech Skill Development](index.html)
