# Dilshaj Infotech - Skill Development Program Website

A fast, responsive, and modern static website for the **Dilshaj Infotech Skill Development Program**.

Student registrations are handled seamlessly through official Google Forms, with responses organized directly into Google Sheets.

---

## 📁 Project Structure

```
skill_development/
├── css/
│   └── style.css       # Responsive CSS design system & DR branding
├── js/
│   └── app.js          # Interactive UI logic (navbar, drawer, FAQ accordion, tabs)
├── index.html          # Main landing and student registration page
└── README.md
```

---

## 🚀 How to Run Locally

Since this is a 100% static frontend application, you can view and test it instantly without needing Python, Node.js, or any database:

### Option 1: Open Directly in Browser
- **Windows Command Prompt (cmd):**
  ```cmd
  start index.html
  ```
- **PowerShell:**
  ```powershell
  Start-Process index.html
  ```
  *(or simply double-click `index.html` in File Explorer)*

### Option 2: Run with Any Lightweight Local Server (Optional)
If you prefer a local HTTP server:
- **VS Code:** Right-click `index.html` and choose **"Open with Live Server"**.
- **Python:** `python -m http.server 8000`
- **Node.js:** `npx serve .`

---

## 📋 Registration Process
Registration is partitioned into two clear academic tracks via Google Forms:
1. **School & Inter Track (Class 6th to Intermediate 2nd Year)**
2. **College & Degree Track (UG & PG Degree Students)**

All candidate submissions, contact details, and preferences are automatically recorded in real-time in your linked Google Forms / Google Sheets.

---

## 🌐 Deployment
This static website can be deployed anywhere with zero server configuration:
* **GitHub Pages**
* **Vercel / Netlify / Cloudflare Pages**
* **AWS EC2 (Nginx / Apache)**
* **AWS S3 + CloudFront**
