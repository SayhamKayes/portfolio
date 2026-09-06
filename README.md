# 🚀 Sayham Kayes – Full-Stack AI/ML Developer Portfolio

<p align="center">
  <img src="./src/assets/logo.png" alt="Sayham Kayes Logo" width="120" />
</p>

<h3 align="center">
Modern, Animated & Full-Stack Portfolio Website with Custom Admin CMS
</h3>

<p align="center">
Showcasing skills, projects, experience, testimonials, and a custom built backend for real-time portfolio management.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TanStack_Start-FF4154?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## 🌐 Live Demo

> **Portfolio:** https://sayhamkayes.vercel.app/

---

## ✨ Features

### 🖥️ Frontend (Client-Facing)
- 🎨 **Modern & Clean UI** with Glassmorphism and premium aesthetics.
- ⚡ **Smooth Animations** powered by Framer Motion & GSAP.
- 🌙 **Dark Theme** by default with carefully chosen color palettes.
- 🤖 **AI Assistant Integration** (Coze Chat Widget).
- 💬 **Dynamic Contact Form** with automated confirmation emails.
- 📱 **Fully Responsive Design** tailored for all screen sizes.

### 🔐 Backend & Admin CMS
- 🛡️ **Secure JWT Authentication** for the Admin Panel.
- 📊 **Real-time Dashboard** with live stats (Total Projects, Visitors, Messages).
- 🗄️ **Complete CRUD Operations** for Projects, Skills, Experience, Education, and Testimonials.
- ✉️ **Built-in Inbox System** to view, reply, and manage contact form submissions directly from the admin panel.
- 🚀 **Server Functions** via TanStack Start (No separate backend needed).

---

## 🏗 System Architecture

The application follows a modern Full-Stack Server-Side Rendered (SSR) architecture using **TanStack Start**.

```mermaid
graph TD
    %% User Interfaces
    Client[Client / Visitor Browser]
    Admin[Admin Browser]

    %% Frontend App
    subgraph Frontend [React Frontend]
        Router[TanStack Router]
        Pages[Public Pages]
        AdminUI[Admin Dashboard UI]
    end

    %% Backend Server
    subgraph Backend [TanStack Start Server]
        ServerFns[Server Functions / API]
        Auth[JWT Authentication]
        Mailer[Nodemailer]
    end

    %% Database Layer
    subgraph Database Layer
        Prisma[Prisma ORM]
        Postgres[(PostgreSQL DB)]
    end

    %% External Services
    Coze[Coze AI Chatbot]
    Gmail[Gmail SMTP Server]

    %% Connections
    Client -->|Interacts| Pages
    Client -->|Chats| Coze
    Admin -->|Login & Manage| AdminUI

    Pages -->|Form Submissions| ServerFns
    AdminUI -->|CRUD Requests| Auth
    Auth -->|Verified| ServerFns

    ServerFns -->|Query/Mutate| Prisma
    Prisma -->|Read/Write| Postgres

    ServerFns -->|Send Notification & Reply| Mailer
    Mailer -->|SMTP| Gmail
```

---

## 🛠 Tech Stack

### Framework & Language
- **React 19**
- **TypeScript**
- **TanStack Start** (Full-Stack Framework)
- **Vite** (Bundler)

### UI, Styling & Animation
- **Tailwind CSS v4**
- **Framer Motion** & **GSAP** (Animations)
- **Radix UI** (Accessible Primitives)
- **Lucide React** (Icons)

### Backend, Database & Forms
- **Prisma ORM** (Database Access)
- **PostgreSQL** (Database - Supabase/Neon)
- **Nodemailer** (Email Delivery)
- **JWT (jsonwebtoken)** & **Bcrypt.js** (Security & Auth)
- **Zod** (Schema Validation)
- **React Hook Form** (Form State Management)

---

## 📂 Project Structure

```text
src/
├── assets/          # Static images and icons
├── components/      # Reusable UI components (Buttons, Inputs, Modals, Preloaders)
├── lib/             # Utility functions, constants, and error reporting
├── routes/          # TanStack Router routes (Public Pages & Admin Panel)
│   ├── admin/       # Admin Dashboard, Inbox, and CMS pages
│   └── __root.tsx   # Root layout and context provider
├── server/          # Backend Logic (TanStack Server Functions)
│   ├── admin.ts     # CRUD, Dashboard Stats, Inbox operations
│   └── auth.ts      # Login, Logout, JWT verification
├── styles.css       # Global Tailwind CSS and custom variables
└── start.ts         # TanStack Start entry point
prisma/
├── schema.prisma    # Database schema definitions
└── seed.ts          # Initial database seeding script
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/SayhamKayes/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
# Database
DATABASE_URL="postgresql://user:password@host:port/dbname"

# Authentication
JWT_SECRET="your_super_secret_jwt_key"

# Admin Initial Setup (For Prisma Seed)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="securepassword123"

# Email Configuration (Nodemailer)
GMAIL_USER="your_email@gmail.com"
GMAIL_APP_PASSWORD="your_gmail_app_password"
```

### 4. Database Setup
Push the schema to your database and seed the initial admin user:
```bash
npm run db:setup
```

### 5. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to see the site, and `http://localhost:3000/admin` to access the CMS.

---

## 📦 Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Generates Prisma client and creates production build |
| `npm run preview` | Previews the production build locally |
| `npm run db:setup` | Pushes Prisma schema and seeds the database |
| `npm run lint` | Runs ESLint |
| `npm run format` | Formats code using Prettier |

---

## 📬 Contact & Links

**Sayham Kayes**
- 📧 Email: sayhamkayes@gmail.com
- 💼 LinkedIn: [linkedin.com/in/sayhamkayes](https://linkedin.com/in/sayhamkayes)
- 🐙 GitHub: [github.com/SayhamKayes](https://github.com/SayhamKayes)

---

<p align="center">
Made with ❤️ by <b>Sayham Kayes</b>
</p>