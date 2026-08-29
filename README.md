# 🖥️ Backend — File Management README
## Student Management System

Built with **Node.js + Express + MongoDB Atlas**

---

## 📁 Backend Folder Structure

```
backend/
│
├── config/
│   └── db.js                    ← MongoDB connection
│
├── controllers/
│   └── studentController.js     ← CRUD business logic
│
├── models/
│   └── Student.js               ← Data schema / shape
│
├── routes/
│   └── students.js              ← API route definitions
│
├── node_modules/                ← Auto-generated (never touch)
│
├── .env                         ← Secret config (never share)
├── package.json                 ← Dependencies + scripts
├── package-lock.json            ← Auto-generated lock file
└── server.js                    ← Entry point
```

---

## 📄 File-by-File Breakdown

---

### `server.js` — Entry Point

**Role:** The file you actually run. Starts everything.

**What it does:**
- Loads `.env` variables using `require('dotenv').config()`
- Connects to MongoDB by calling `connectDB()`
- Sets up middleware — `cors()` and `express.json()`
- Registers student routes at `/api/students`
- Starts listening on port 5000

**Key code inside:**
```js
require('dns').setServers(['8.8.8.8', '8.8.4.4']); // DNS fix
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use('/api/students', studentRoutes);
app.listen(5000);
```

**When to edit:**
- Adding new route groups (e.g. `/api/teachers`)
- Adding new middleware
- Changing the port number

---

### `config/db.js` — Database Connection

**Role:** Connects the backend to MongoDB Atlas.

**What it does:**
- Reads `MONGODB_URI` from `.env`
- Opens a Mongoose connection to MongoDB
- Logs success or failure
- If it fails → stops the server (`process.exit(1)`)

**When to edit:**
- Switching database providers
- Adding connection options (timeouts, pool size)

---

### `models/Student.js` — Data Schema

**Role:** Defines the exact shape of a student record in MongoDB.

**Fields defined:**

| Field | Type | Required | Validation |
|---|---|---|---|
| `name` | String | ✅ | Trimmed |
| `roll` | String | ✅ | Unique — no duplicates allowed |
| `email` | String | ✅ | Lowercase, trimmed |
| `phone` | String | ❌ | Optional |
| `dept` | String | ✅ | Department code |
| `year` | String | ✅ | Academic year |
| `grade` | Number | ✅ | Min: 0, Max: 4 |
| `status` | String | ✅ | Enum: Active/Inactive/Graduated/Suspended |
| `createdAt` | Date | Auto | Added by `timestamps: true` |
| `updatedAt` | Date | Auto | Added by `timestamps: true` |

**When to edit:**
- Adding a new field (e.g. `address`, `photo`, `parentName`)
- Changing validation rules (e.g. max CGPA)
- Adding indexes for faster queries

---

### `routes/students.js` — API Routes

**Role:** Maps URLs + HTTP methods to controller functions.

**Routes defined:**

| Method | URL | Controller Called | What it does |
|---|---|---|---|
| GET | `/api/students` | `getStudents` | Fetch all students |
| POST | `/api/students` | `createStudent` | Add new student |
| PUT | `/api/students/:id` | `updateStudent` | Edit one student |
| DELETE | `/api/students/:id` | `deleteStudent` | Remove one student |

**Note:** `:id` is a dynamic parameter — it's replaced by the actual MongoDB `_id` of the student being updated or deleted.

**When to edit:**
- Adding new endpoints (e.g. search, filter by department)
- Adding route-level middleware (e.g. authentication)

---

### `controllers/studentController.js` — Business Logic

**Role:** Contains the actual logic that runs when a route is hit.

**Functions:**

#### `getStudents`
```
GET /api/students
→ Student.find({}).sort({ createdAt: -1 })
→ Returns all students, newest first
```

#### `createStudent`
```
POST /api/students
→ Student.create(req.body)
→ Mongoose validates against schema
→ Returns saved student with status 201
```

#### `updateStudent`
```
PUT /api/students/:id
→ Student.findByIdAndUpdate(id, body, { new: true })
→ Returns updated student
```

#### `deleteStudent`
```
DELETE /api/students/:id
→ Student.findByIdAndDelete(id)
→ Returns success message
```

**All functions use:**
- `async/await` for asynchronous operations
- `try/catch` to catch errors without crashing the server
- Appropriate HTTP status codes (200, 201, 400, 404, 500)

**When to edit:**
- Adding search/filter logic
- Adding data transformation before saving
- Adding pagination (`skip`, `limit`)
- Adding email notifications on create/delete

---

### `.env` — Environment Variables

**Role:** Stores sensitive configuration outside the codebase.

**Contents:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management
```

**Rules:**
- ⚠️ **Never commit this to GitHub**
- Add `.env` to your `.gitignore` file
- Share via `.env.example` (with dummy values) instead

**When to edit:**
- MongoDB connection string changes
- Changing the port
- Adding new secrets (JWT secret, API keys)

---

### `package.json` — Dependencies & Scripts

**Role:** Defines what packages the backend needs and how to run it.

**Dependencies:**

| Package | Version | Purpose |
|---|---|---|
| `express` | ^4.18.2 | Web framework |
| `mongoose` | ^8.0.3 | MongoDB object modeling |
| `cors` | ^2.8.5 | Cross-origin request handling |
| `dotenv` | ^16.3.1 | Load `.env` into `process.env` |
| `nodemon` | ^3.0.2 | Auto-restart on file change (dev) |

**Scripts:**
```json
"start": "node server.js"       ← production
"dev":   "nodemon server.js"    ← development
```

**When to edit:**
- Adding new packages after `npm install package-name`
- Changing the start script

---

## 🔗 How Backend Files Connect

```
server.js
  ├── config/db.js           (connects to MongoDB on startup)
  └── routes/students.js     (handles /api/students requests)
        └── controllers/studentController.js  (runs the logic)
              └── models/Student.js            (talks to MongoDB)
                    └── MongoDB Atlas          (stores the data)
```

---

## 🚀 How to Run the Backend

```bash
# Step 1 — Go into the backend folder
cd student-fullstack/backend

# Step 2 — Install all packages
npm install

# Step 3 — Create your .env file with your MongoDB URI
# (paste your Atlas connection string)

# Step 4 — Start the development server
npm run dev
```

**Success output:**
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

**Test it's working:**
Open your browser and visit:
```
http://localhost:5000/api/students
```
You should see `[]` (empty array) — that means the API is live.

---

## ⚠️ Common Backend Problems

| Error | Cause | Fix |
|---|---|---|
| `MongoDB connection failed` | Wrong URI or IP not whitelisted | Check `.env` + Atlas Network Access |
| `querySrv ECONNREFUSED` | DNS issue with SRV record | Add `require('dns').setServers(['8.8.8.8','8.8.4.4'])` at top of `server.js` |
| `nodemon not recognized` | Packages not installed | Run `npm install` inside `/backend` |
| `PORT already in use` | Another process on port 5000 | Change `PORT=5001` in `.env` |
| `Cannot read .env` | File not created or wrong name | Make sure file is named exactly `.env` |
| `Validation failed` | Missing required field in request | Check all required fields are sent |

---

## 📝 When to Edit Each File

| Task | File |
|---|---|
| Add a new student field | `models/Student.js` |
| Add a new API endpoint | `routes/students.js` + `controllers/studentController.js` |
| Add search or filter | `controllers/studentController.js` |
| Change the database | `config/db.js` + `.env` |
| Change the port | `.env` |
| Add authentication | `server.js` + new `middleware/auth.js` |
| Add a new package | `package.json` (via `npm install`) |

---

*Backend: Node.js + Express + MongoDB Atlas + Mongoose*
