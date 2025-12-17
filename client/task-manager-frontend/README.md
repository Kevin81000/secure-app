# Secure Task Manager - Full-Stack Assessment Project

A secure task management application with role-based access control.

## Features

- **Welcome / Landing Page** with Login and Register buttons
- **Registration** – First user automatically becomes **ADMIN**
- **Login** with JWT authentication
- **Dashboard** with sidebar navigation
- **Tasks Tab**
  - All authenticated users can view all tasks
  - Any authenticated user can create tasks
  - Only the task owner or ADMIN can edit/delete tasks
- **Users Tab** (visible and accessible to ADMIN only) – List all users with name, email, and role
- Clean, responsive UI built with Angular
- Backend API built with Node.js + Express (simple and reliable)

## Tech Stack

- **Frontend**: Angular (standalone components)
- **Backend**: Node.js + Express (Same as Nest.JS)
- **Authentication**: JWT (stored in localStorage)
- **Data Storage**: In-memory (for assessment simplicity – persists during runtime)
- **Styling**: Pure CSS (no external libraries)

*** The original plan was NestJS, but it was crashing silently on startup (likely due to Nx workspace complexity, TypeORM config, or module import issues) — I couldn't get it to run despite many attempts. So I switched to a simple Node.js + Express backend (server.js) that does exactly the same thing as the NestJS version would have:Register (first user = ADMIN)
-Login with JWT
-Tasks CRUD with ownership check
-Users list (ADMIN only)
-Full role-based access


## How to Run

### 1. Start the Backend

```bash
cd simple-backend
npm install   # (only the first time)
node server.js



### 2. Start the Frontend 

```bash
cd task-manger-frontend
npx ng serve --open


# Project Structure 
secure-app/
├── simple-backend/
│   ├── server.js          # Express backend
│   └── package.json
└── task-manager-frontend/
    └── src/app/
        ├── welcome/
        ├── auth/ (login & register)
        ├── dashboard/
        ├── tasks/
        └── users/



task-manager-frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login.component.ts          # Login page with form and JWT handling
│   │   │   └── register.component.ts       # Register page (first user = ADMIN)
│   │   ├── dashboard/
│   │   │   └── dashboard.component.ts      # Main dashboard with sidebar and <router-outlet>
│   │   ├── tasks/
│   │   │   └── tasks.component.ts          # Tasks tab: list, create, delete (ownership enforced)
│   │   ├── users/
│   │   │   └── users.component.ts          # Users tab: list all users (ADMIN only)
│   │   ├── welcome/
│   │   │   └── welcome.component.ts        # Landing page with Login/Register buttons
│   │   ├── services/ (optional)
│   │   │   └── api.service.ts              # Optional helper for adding JWT token to requests
│   │   ├── app.component.ts                # Root component with <router-outlet>
│   │   ├── app.component.html              # Usually just <router-outlet></router-outlet>
│   │   ├── app.config.ts                   # Routing configuration (standalone style)
│   │   └── app.routes.ts                   # (if you use separate routes file)
│   ├── assets/                             # Images, icons, etc.
│   ├── styles.css                          # Global styles
│   ├── index.html                          # Main HTML file
│   └── main.ts                             # Bootstrap file
├── angular.json                            # Angular workspace configuration
├── package.json
├── tsconfig.app.json
├── tsconfig.json
└── README.md 