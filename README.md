# Better Auth - Next.js Authentication Template

A modern, full-stack authentication starter built with Next.js, featuring email/password authentication, email verification, and password reset functionality powered by Better Auth.

## Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[TailwindCSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Re-usable component library
- **[Lucide React](https://lucide.dev)** - Icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Backend & Authentication
- **[Better Auth](https://www.better-auth.com)** - Full-featured authentication framework
- **[Drizzle ORM](https://orm.drizzle.team)** - Type-safe SQL ORM
- **[PostgreSQL](https://www.postgresql.org)** - Database
- **[Nodemailer](https://nodemailer.com)** - Email sending

### Form & Validation
- **[TanStack Form](https://tanstack.com/form)** - Type-safe form management
- **[Zod](https://zod.dev)** - Schema validation
- **[Sonner](https://sonner.emilkowal.ski)** - Toast notifications

### Developer Tools
- **[ESLint](https://eslint.org)** - Code linting
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Database migrations
- **[tsx](https://github.com/privatenumber/tsx)** - TypeScript execution

## Features

- ✅ Email/password authentication
- ✅ Email verification
- ✅ Password reset functionality
- ✅ Protected routes
- ✅ Type-safe forms with validation
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Modern UI components

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v20 or higher)
- **PostgreSQL** (v14 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd better-auth
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Generate a random secret key (at least 32 characters)
BETTER_AUTH_SECRET=your-random-secret-key-here

# Base URL of your application
BETTER_AUTH_URL=http://localhost:3000

# PostgreSQL database connection string
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/better_auth

# SMTP Configuration (for email functionality)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_FROM_EMAIL=noreply@betterauth.app
SMTP_FROM_NAME="Better Auth App"
```

**Note:** For development, you can use [Mailpit](https://mailpit.axllent.org) or [MailHog](https://github.com/mailhog/MailHog) as a local SMTP server to test emails.

### 4. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
# Using psql
psql -U postgres
CREATE DATABASE better_auth;
```

Or use your preferred PostgreSQL client/tool.

### 5. Run Database Migrations

Generate and run database migrations using Drizzle:

```bash
# Generate migration files
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push
```

### 6. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
better-auth/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Protected routes (dashboard)
│   │   ├── (non-auth)/        # Public routes (login, signup)
│   │   └── api/auth/          # Better Auth API routes
│   ├── components/            # React components
│   │   ├── auth/              # Authentication forms
│   │   └── ui/                # Reusable UI components
│   ├── db/                    # Database configuration
│   │   ├── index.ts           # Drizzle instance
│   │   └── auth-schema.ts     # Database schema
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # Better Auth server config
│   │   ├── auth-client.ts     # Better Auth client config
│   │   ├── email.ts           # Email service
│   │   └── utils.ts           # Helper functions
│   └── schema/                # Validation schemas
├── drizzle/                   # Generated migration files
├── .env.example               # Environment variables template
├── drizzle.config.ts          # Drizzle ORM configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # TailwindCSS configuration
└── package.json               # Dependencies and scripts
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Authentication Flow

1. **Sign Up** - Users create an account with email/password
2. **Email Verification** - Verification email sent to user
3. **Sign In** - Users authenticate with verified credentials
4. **Password Reset** - Users can request password reset via email
5. **Protected Routes** - Dashboard and other protected pages require authentication

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial

### Better Auth Resources
- [Better Auth Documentation](https://www.better-auth.com/docs) - Authentication framework guide
- [Better Auth GitHub](https://github.com/better-auth/better-auth) - Source code and examples

### Database Resources
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview) - Database ORM guide
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Database documentation

## Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Database Hosting

For production, consider using managed PostgreSQL services:
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - PostgreSQL with additional features
- [Railway](https://railway.app) - PostgreSQL and app hosting
- [Render](https://render.com) - PostgreSQL and web services

## License

MIT
