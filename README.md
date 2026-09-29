# Dilshaj Infotech - Skill Development Program Website

A production-ready website and registration management system for the **Dilshaj Infotech Skill Development Program**, backed by a local **SQLite database** (`registrations.db`).

---

## 📁 Project Structure

```
skill_development/
├── css/
│   └── style.css       # Responsive CSS design system & DR branding
├── js/
│   └── app.js          # Interactive UI logic, registration storage & SQLite sync
├── index.html          # Main student landing & registration page
├── admin.html          # Administration portal (filtering, search, CSV export)
├── server.py           # Python server with SQLite database & REST APIs
├── registrations.db    # SQLite database file (stores all registered users)
└── README.md
```

---

## 🚀 How to Run

### Option 1: Run with Python & SQLite Backend (Recommended)

Starts the server with persistent SQLite database storage and REST APIs:

```powershell
python server.py
```

- **Main Website:** [http://localhost:8000/index.html](http://localhost:8000/index.html)
- **Admin Portal:** [http://localhost:8000/admin.html](http://localhost:8000/admin.html)
- **Stop Server:** Press <kbd>Ctrl</kbd> + <kbd>C</kbd> in your terminal.

---

### Option 2: List Registered Users Directly in the Terminal

You can view the list of all registered users without opening a browser:

```powershell
python server.py --list
```

This prints a clean formatted table:
```
=========================================================================================================
REG ID           | STUDENT NAME       | CLASS           | MOBILE       | DISTRICT       | STATUS    
=========================================================================================================
DIP-2609-0101    | Aarav Sharma       | Class 10        | 9876543210   | Hyderabad      | Completed 
DIP-2609-0102    | Ananya Reddy       | Intermediate 2nd Year | 9849012345 | Visakhapatnam  | Completed 
DIP-2609-0103    | Rohan Varma        | Class 8         | 9123456789   | Vijayawada     | Pending   
=========================================================================================================
Total Registered Users: 3
```

---

### Option 3: Directly from the Terminal (Static Mode)

- **Windows Command Prompt (cmd):**
  ```cmd
  start index.html
  ```
- **PowerShell:**
  ```powershell
  Start-Process index.html
  ```
  *(or shortcut: `ii index.html`)*

> **Note:** Launches directly in your browser using local storage for offline use. Closes simply by closing the browser tab.

---

## 🗄️ SQLite Database Details

The database is stored in **[registrations.db](file:///c:/Users/tamar/Desktop/CICD/skill_development/registrations.db)** with the following table:

```sql
CREATE TABLE registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id TEXT UNIQUE NOT NULL,
    student_name TEXT NOT NULL,
    parent_name TEXT,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    student_class TEXT NOT NULL,
    school TEXT,
    district TEXT,
    project_interest TEXT,
    registration_date TEXT,
    payment_status TEXT DEFAULT 'Pending',
    payment_amount INTEGER DEFAULT 499,
    payment_id TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

You can inspect or query it anytime using:
- `python server.py --list`
- Standard SQLite CLI: `sqlite3 registrations.db`
- **DB Browser for SQLite** or the **SQLite Viewer** extension in VS Code.

--- 

## 🔐 Admin Portal Credentials

- **URL:** [http://localhost:8000/admin.html](http://localhost:8000/admin.html) or `admin.html`
- **Admin Passcode:** `dilshaj_admin_2026_secure`

---

## 🚀 Deployment Guide

### Option 1: 1-Click Cloud Hosting (Render, Railway, Heroku)
The project includes a `Procfile`, dynamic `PORT` binding, and zero external pip dependencies:
1. Push this repository to GitHub.
2. In **[Render.com](https://render.com)** or **[Railway.app](https://railway.app)**:
   - Create a new **Web Service** and select your repository.
   - **Build Command:** *(leave empty or `echo Done`)*
   - **Start Command:** `python server.py`
3. Your live application will be deployed instantly with both frontend and SQLite backend active.

### Option 2: Linux VPS / Cloud VM (Ubuntu / AWS EC2 / DigitalOcean)
```bash
# Clone and enter directory
git clone <repo-url> && cd <repo-dir>

# Run using systemd or background process
nohup python3 server.py > server.log 2>&1 &
```

### Option 3: Static Hosting (Vercel, Netlify, GitHub Pages)
If you only want to host the frontend:
- Upload the repository to Vercel, Netlify, or GitHub Pages.
- Both registration and the admin portal have built-in `localStorage` offline fallbacks that run entirely client-side without a server.
