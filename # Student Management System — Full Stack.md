# Student Management System — Full Stack (MongoDB + Express + React)

## 📁 Exact Folder Structure (where to put every file)

```
student-fullstack/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Student.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── routes/
│   │   └── students.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── StudentForm.jsx
    │   │   └── StudentTable.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

**Create the parent folder `student-fullstack/` first, then create `backend/` and `frontend/` as two SEPARATE folders inside it.** Every file above goes in the exact subfolder shown — for example, `Student.js` goes inside `backend/models/`, not directly in `backend/`.

---

## 🔌 How These Files Actually Connect

```
[React Form/Table]  →  src/services/api.js  →  fetch('http://localhost:5000/api/students')
                                                          ↓
                                            [Express server.js on port 5000]
                                                          ↓
                                          routes/students.js  (matches the URL)
                                                          ↓
                              controllers/studentController.js  (runs the logic)
                                                          ↓
                                      models/Student.js  (talks to MongoDB)
                                                          ↓
                                                  [MongoDB Database]
```

The frontend and backend NEVER import each other's files directly. They only talk over HTTP, using the URL defined in `frontend/src/services/api.js`:
```js
const API_URL = 'http://localhost:5000/api/students';
```
This must match the `PORT` your backend is running on.

---

## 🚀 Step-by-Step: How to Run It

### Step 1 — Install MongoDB
You need MongoDB running locally, OR use a free cloud database at [mongodb.com/atlas](https://www.mongodb.com/atlas) (easier for beginners — no local install).

If using Atlas, copy your connection string and replace the value in `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management
```

### Step 2 — Set up the Backend
Open a terminal:
```bash
cd student-fullstack/backend
npm install
npm run dev
```
You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

**Leave this terminal running.** Don't close it.

### Step 3 — Set up the Frontend
Open a **SECOND, separate terminal** (don't close the first one):
```bash
cd student-fullstack/frontend
npm install
npm run dev
```
You should see something like:
```
Local: http://localhost:5173/
```

### Step 4 — Open the App
Open your browser and go to:
```
http://localhost:5173
```

You now have:
- **Terminal 1** running the backend (port 5000)
- **Terminal 2** running the frontend (port 5173)
- **Browser** showing your React app, which talks to the backend, which talks to MongoDB

---

## ✅ How to Verify Each Piece Works

| Test | How |
|---|---|
| Backend is alive | Visit `http://localhost:5000` in browser → should say "Student Management API is running ✅" |
| Database is connected | Check Terminal 1 for "✅ MongoDB connected successfully" |
| API returns data | Visit `http://localhost:5000/api/students` → should show `[]` or a list of students as JSON |
| Frontend can reach backend | Open the React app — if students load (or empty state shows, not an error), it's connected |

---

## 🐛 Common Problems

**"Could not connect to the server" error in the React app**
→ Your backend isn't running, or it crashed. Check Terminal 1 for errors.

**MongoDB connection failed**
→ MongoDB isn't running locally, or your `.env` connection string is wrong.

**CORS error in browser console**
→ Make sure `app.use(cors())` is in `server.js` (it already is in this code).

**"Port 5000 already in use"**
→ Another program is using that port. Change `PORT=5000` to `PORT=5001` in `.env`, AND update the URL in `frontend/src/services/api.js` to match.

---

## 🎓 Key Concept: Two Servers, One App

You are running **TWO programs at once** on your own computer:
1. Backend (Node/Express) on port 5000 — handles data
2. Frontend (Vite/React) on port 5173 — handles what you see

This is completely normal for full-stack development. In production (when deployed live), these would run on a real server and a real domain — but locally, two terminal windows is exactly how it's supposed to work.