import http.server
import socketserver
import sqlite3
import json
import os
import urllib.parse
import sys

PORT = int(os.environ.get('PORT', 8000))
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'registrations.db')

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            registration_id TEXT UNIQUE NOT NULL,
            student_name TEXT NOT NULL,
            parent_name TEXT,
            mobile TEXT NOT NULL,
            email TEXT NOT NULL,
            student_class TEXT NOT NULL,
            school TEXT,
            district TEXT,
            training_mode TEXT DEFAULT 'Offline',
            project_interest TEXT,
            registration_date TEXT,
            payment_status TEXT DEFAULT 'Pending',
            payment_amount INTEGER DEFAULT 499,
            payment_id TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Backward compatibility: ensure training_mode column exists in existing database
    try:
        cursor.execute("ALTER TABLE registrations ADD COLUMN training_mode TEXT DEFAULT 'Offline'")
        conn.commit()
    except sqlite3.OperationalError:
        pass

    # Check if empty, populate initial sample data if so
    cursor.execute('SELECT COUNT(*) FROM registrations')
    count = cursor.fetchone()[0]
    if count == 0:
        seed_data = [
            (
                "DIP-2609-0101", "Aarav Sharma", "Vikram Sharma", "9876543210",
                "aarav.sharma@example.com", "Class 10", "Delhi Public School",
                "Hyderabad", "Offline", "Web & App Development", "2026-09-27", "Completed",
                499, "PAY-DEMO-948172"
            ),
            (
                "DIP-2609-0102", "Ananya Reddy", "Srinivas Reddy", "9849012345",
                "ananya.reddy@example.com", "Intermediate 2nd Year", "Sri Chaitanya Junior College",
                "Visakhapatnam", "Online", "AI & Machine Learning", "2026-09-27", "Completed",
                499, "PAY-DEMO-449102"
            ),
            (
                "DIP-2609-0103", "Rohan Varma", "Kishore Varma", "9123456789",
                "rohan.v@example.com", "Class 8", "Kendriya Vidyalaya",
                "Vijayawada", "Offline", "Robotics & IoT", "2026-09-27", "Pending",
                499, ""
            )
        ]
        cursor.executemany('''
            INSERT INTO registrations (
                registration_id, student_name, parent_name, mobile, email,
                student_class, school, district, training_mode, project_interest,
                registration_date, payment_status, payment_amount, payment_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', seed_data)
        conn.commit()
    conn.close()

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = dict_factory
    return conn

class DilshajRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS for local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)

        if parsed.path == '/api/registrations':
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM registrations ORDER BY id DESC')
                records = cursor.fetchall()
                conn.close()

                response_body = json.dumps(records).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(response_body)))
                self.end_headers()
                self.wfile.write(response_body)
            except Exception as e:
                self.send_error(500, str(e))
            return

        # Fallback to serving static files (index.html, admin.html, css, js)
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

        try:
            payload = json.loads(post_data.decode('utf-8'))
        except Exception:
            self.send_error(400, "Invalid JSON payload")
            return

        if parsed.path == '/api/register':
            try:
                conn = get_db_connection()
                cursor = conn.cursor()

                cursor.execute('''
                    INSERT INTO registrations (
                        registration_id, student_name, parent_name, mobile, email,
                        student_class, school, district, training_mode, project_interest,
                        registration_date, payment_status, payment_amount, payment_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    payload.get('registration_id') or payload.get('registrationId'),
                    payload.get('student_name') or payload.get('studentName', ''),
                    payload.get('parent_name') or payload.get('parentName', ''),
                    payload.get('mobile', ''),
                    payload.get('email', ''),
                    payload.get('student_class') or payload.get('studentClass', ''),
                    payload.get('school', ''),
                    payload.get('district', ''),
                    payload.get('training_mode') or payload.get('trainingMode', 'Offline'),
                    payload.get('project_interest') or payload.get('projectInterest', ''),
                    payload.get('registration_date') or payload.get('registrationDate', ''),
                    payload.get('payment_status') or payload.get('paymentStatus', 'Pending'),
                    payload.get('payment_amount') or payload.get('fee', 499),
                    payload.get('payment_id', '')
                ))
                conn.commit()
                conn.close()

                response = json.dumps({"success": True, "message": "Registered successfully in SQLite"}).encode('utf-8')
                self.send_response(201)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(response)))
                self.end_headers()
                self.wfile.write(response)
            except sqlite3.IntegrityError:
                self.send_error(409, "Registration ID already exists")
            except Exception as e:
                self.send_error(500, str(e))
            return

        elif parsed.path == '/api/update-status':
            try:
                reg_id = payload.get('registration_id') or payload.get('registrationId')
                status = payload.get('payment_status') or payload.get('paymentStatus', 'Pending')
                payment_id = payload.get('payment_id', '')

                conn = get_db_connection()
                cursor = conn.cursor()
                if payment_id:
                    cursor.execute('''
                        UPDATE registrations 
                        SET payment_status = ?, payment_id = ?
                        WHERE registration_id = ?
                    ''', (status, payment_id, reg_id))
                else:
                    cursor.execute('''
                        UPDATE registrations 
                        SET payment_status = ?
                        WHERE registration_id = ?
                    ''', (status, reg_id))
                conn.commit()
                conn.close()

                response = json.dumps({"success": True, "status": status}).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(response)))
                self.end_headers()
                self.wfile.write(response)
            except Exception as e:
                self.send_error(500, str(e))
            return

        self.send_error(404, "Endpoint not found")

def print_registered_users():
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT registration_id, student_name, student_class, training_mode, mobile, district, payment_status FROM registrations ORDER BY id ASC')
    rows = cursor.fetchall()
    conn.close()

    print("\n" + "=" * 115)
    print(f"{'REG ID':<16} | {'STUDENT NAME':<18} | {'CLASS':<15} | {'MODE':<10} | {'MOBILE':<12} | {'DISTRICT':<14} | {'STATUS':<10}")
    print("=" * 115)
    for r in rows:
        mode_val = r['training_mode'] or 'Offline'
        print(f"{r['registration_id']:<16} | {r['student_name']:<18} | {r['student_class']:<15} | {mode_val:<10} | {r['mobile']:<12} | {r['district']:<14} | {r['payment_status']:<10}")
    print("=" * 115)
    print(f"Total Registered Users: {len(rows)}\n")

if __name__ == '__main__':
    # If passed --list or -l, print registered users to terminal and exit
    if len(sys.argv) > 1 and sys.argv[1] in ('--list', '-l', 'list'):
        print_registered_users()
        sys.exit(0)

    init_db()
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    server_address = ('', PORT)
    print(f"🚀 Dilshaj Infotech SQLite Server running at http://localhost:{PORT}")
    print(f"📂 SQLite Database: {DB_FILE}")
    print(f"👉 Main Page: http://localhost:{PORT}/index.html")
    print(f"👉 Admin Portal: http://localhost:{PORT}/admin.html")
    print(f"ℹ️  To view users in terminal, run: python server.py --list")
    print("Press Ctrl+C to stop the server.\n")

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(server_address, DilshajRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
