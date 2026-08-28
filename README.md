# 📊 DevBoard

> A full-stack project management dashboard built with Next.js, React, TypeScript, PostgreSQL, and Prisma, designed for managing projects and tasks through dashboards, Kanban boards, and analytics.

## 🔗 Live Demo

🚧 Live demo is currently unavailable. The project is under active development.

<!-- ## 📸 Preview

![Desktop Preview](./screenshots/desktop.png)

### 📱 Tablet

![Tablet Preview](./screenshots/tablet.png)

### 📱 Mobile

![Mobile Preview](./screenshots/mobile.png) -->

## ✨ Features

- Project management
- Create, edit, and delete projects
- Task management
- Create, edit, and update tasks
- Task priorities and statuses
- Kanban board
- Drag-and-drop task management
- Task search and filtering
- Sorting
- Pagination
- Dashboard statistics
- Analytics dashboard
- Charts and data visualization
- Form validation
- Loading, error, and empty states
- Toast notifications
- Responsive user interface

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

### Backend & Database

- Next.js Server Actions
- PostgreSQL
- Prisma ORM 7
- Prisma PostgreSQL Adapter

### Validation

- Zod

### UI & Data Visualization

- dnd-kit
- Recharts
- Sonner

### Development Tools

- ESLint
- TypeScript
- Git
- GitHub

## 📁 Project Structure

```text
devboard/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│
├── src/
│   ├── actions/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── lib/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

## 🗄️ Database

DevBoard uses PostgreSQL as its relational database and Prisma ORM for database access.

The application stores and manages data such as:

- Projects
- Tasks
- Task statuses
- Task priorities

Prisma is used for database queries, relations, migrations, and data access.

## 📊 Analytics

The analytics section provides project and task statistics using data retrieved from PostgreSQL.

Recharts is used to visualize application data through charts and dashboard metrics.

## 🧩 Architecture

The project separates responsibilities across different layers:

- `actions/` — server-side actions
- `components/` — reusable UI components
- `constants/` — shared constants
- `context/` — React context and shared state
- `lib/` — database and application utilities
- `services/` — business and data-access logic
- `types/` — TypeScript types and DTOs
- `utils/` — reusable helper functions

This structure keeps UI, business logic, database access, and shared types separated and easier to maintain.

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/mshchebetiuk/devboard.git
```

### Navigate to the project

```bash
cd devboard
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file and add your PostgreSQL connection string:

```env
DATABASE_URL="YOUR_POSTGRESQL_DATABASE_URL"
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run database migrations

```bash
npx prisma migrate dev
```

### Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📜 Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 🎯 What I Practiced

During this project, I practiced:

- Building a full-stack application with Next.js
- Working with React and TypeScript
- Designing reusable components
- Working with Server Actions
- Designing relational database models
- Working with PostgreSQL
- Using Prisma ORM
- Creating database queries and aggregations
- Separating database models from DTOs
- Organizing business logic into service layers
- Implementing form validation with Zod
- Building CRUD functionality
- Implementing search, filtering, sorting, and pagination
- Building drag-and-drop interfaces
- Creating Kanban-style task management
- Building analytics dashboards
- Visualizing data with charts
- Handling loading, error, and empty states
- Refactoring and improving application architecture

## 🔮 Future Improvements

- Authentication and authorization
- User accounts
- Project members and teams
- Role-based permissions
- Comments
- Activity history
- Notifications
- Unit and integration tests
- End-to-End tests
- CI/CD
- Docker support

## 👨‍💻 Author

**Maksym Shchebetiuk**

- GitHub: https://github.com/mshchebetiuk
- LinkedIn: https://www.linkedin.com/in/maksym-shchebetiuk-bb53102a0/

## 📄 License

This project is created for educational and portfolio purposes.
