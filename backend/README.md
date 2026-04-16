# Alobha Backend

Production-ready Node.js backend using Express and PostgreSQL with Sequelize ORM.

## Features

- Express application with modular MVC + Service architecture
- PostgreSQL database access via Sequelize ORM
- Centralized error handling
- API response helpers and validation
- Health check endpoint
- Sequelize CLI setup with migrations and seeders

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and update database credentials.

3. Run migrations:

```bash
npm run migrate
```

4. Seed sample data:

```bash
npm run seed
```

5. Start server:

```bash
npm run dev
```

