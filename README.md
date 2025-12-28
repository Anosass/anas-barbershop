# Anas Barbershop (Full‑Stack)

A simple barbershop website + REST API.

## What was added / upgraded (to match the assignment)

- **Node.js / Express** backend.
- **MySQL database** (via **Sequelize**) instead of a local JSON file.
- **Authentication**: Signup/Login using **JWT** + password hashing (**bcrypt**).
- **CRUD operations** on MySQL:
  - **Services** (admin CRUD)
  - **Appointments** (user CRUD)
- **Two related entities**: **Users ↔ Appointments** (one‑to‑many).
- **Validation & error handling**: `express-validator` + a centralized error handler.
- (Optional bonus) **Email notifications** for Contact messages using **Nodemailer** (enabled only if SMTP env vars are configured).
- (Optional bonus) **Admin panel support** (role‑based routes; create/update/delete services is admin only).

---

## Tech Stack

- Backend: Node.js, Express, Sequelize, MySQL
- Frontend: React (existing)

---

## Prerequisites

- Node.js 18+ (recommended)
- MySQL 8+

---

## Setup Instructions (Local)

### 1) Create a MySQL database

```sql
CREATE DATABASE anas_barbershop;
```

### 2) Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (copy from `.env.example`) and fill in your MySQL credentials.

```bash
cp .env.example .env
```

Start the API:

```bash
npm run dev
```

The server auto-creates tables with `sequelize.sync()`.

**Default admin user (seeded on first run):**
- Email: `admin@barbershop.local`
- Password: `Admin123!`

### 3) Frontend setup

```bash
cd ../frontend
npm install
npm start
```

---

## API Endpoints

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Services

- `GET /api/services`
- `GET /api/services/:id`

Admin only:
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`

### Appointments (requires Bearer token)

- `GET /api/appointments`
- `POST /api/appointments`
- `PUT /api/appointments/:id`
- `DELETE /api/appointments/:id`

### Contact

- `POST /api/contact`

---

## Deployment

### Backend (Render / Railway)

1. Push the repository to GitHub.
2. Create a MySQL database (Railway provides MySQL easily, or use any managed MySQL).
3. Deploy the **backend** as a Node service.
4. Set environment variables (same keys as `backend/.env.example`).
5. Set the start command:

```bash
cd backend && npm install && npm start
```

### Frontend (GitHub Pages)

You can deploy the React frontend to GitHub Pages.

- Update `frontend/src/config.js` to point to your deployed backend URL.
- Use `gh-pages` (optional) or GitHub Actions.

---

## Git / Commit History (required by assignment)

Example clean commit history you can follow:

```bash
git init
git add .
git commit -m "chore: initial project"

git commit -am "feat: add mysql + sequelize models"
git commit -am "feat: add auth (jwt) + validation"
git commit -am "feat: add appointments CRUD"
git commit -am "feat: admin-only services CRUD"
git commit -am "docs: update README with setup + deployment"
```

---

## Notes

- Tables are created automatically on startup for a smoother demo.
- For production, prefer Sequelize migrations.

## Live Demo
Frontend: https://anosass.github.io/anas-barbershop/
Backend: https://anas-barbershop-backend.onrender.com

## Admin Credentials
Email: 22230528@students.liu.edu.lb
Password: anas123

## Setup Instructions
1. Clone repository
2. Install backend dependencies
3. Configure .env
4. Run backend
5. Run frontend


