# SmartSpend 💰

An intelligent, full-stack personal finance and expense management platform built with **Next.js (App Router)**, **Prisma ORM**, **PostgreSQL**, **WSO2 / Asgardeo OIDC Authentication**, and **Google Gemini AI**.

SmartSpend empowers users to track expenses, set category budgets, visualize financial trends through interactive charts, and receive tailored, AI-generated financial insights to optimize their spending habits.

---

## ✨ Features

- **💸 Expense Management:** Log, search, filter, and delete expenses effortlessly with details including date, category, and notes.
- **🏷️ Custom Categories & Budgets:** Create and customize spending categories with custom colors, icons, and monthly budget limits.
- **📊 Interactive Visual Analytics:**
  - Real-time spending charts powered by [Recharts](https://recharts.org/).
  - Category-wise expense distribution and budget progress tracking.
  - Daily spending breakdown and monthly comparison trends.
- **🤖 AI-Powered Financial Recommendations:**
  - Automated spending habit analysis using **Google Gemini AI** (`@google/genai`).
  - Actionable money-saving suggestions and insights based on real user data.
  - Built-in graceful local fallback when running offline or without an API key.
- **🔐 Enterprise Identity & Access Management (WSO2 / Asgardeo):**
  - Secure Single Sign-On (SSO) with OpenID Connect (OIDC).
  - Automatic user provisioning and profile synchronization.
  - OIDC Single Logout (SLO) integration.
- **🌓 Theme Customization:** Elegant Light and Dark mode support with persistent user preference.
- **⚡ Modern Responsive UI:** Built with Tailwind CSS v4, Radix UI primitives, Lucide icons, and responsive layouts for mobile and desktop.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Radix UI primitives |
| **Database & ORM** | [PostgreSQL](https://www.postgresql.org/) & [Prisma ORM v6](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js v5 (Auth.js)](https://authjs.dev/) with WSO2 / Asgardeo OIDC |
| **AI Integration** | [Google Gemini API](https://aistudio.google.com/) (`@google/genai`) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Form Handling & Validation** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) |

---

## 📁 Project Structure

```
SmartSpend/
├── prisma/
│   ├── schema.prisma            # Prisma schema models (User, Expense, Category)
│   └── migrations/              # Database migrations
├── public/                      # Static assets & icons
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── actions/             # Server Actions (Auth, Logout, etc.)
│   │   ├── api/                 # API Routes (auth, categories, expenses, recommendations)
│   │   ├── categories/          # Category management views
│   │   ├── dashboard/           # Main analytics dashboard
│   │   ├── expenses/            # Expense listing & add expense pages
│   │   ├── insights/            # AI-driven insights & analytics
│   │   ├── login/               # Authentication & login page
│   │   ├── layout.tsx           # Root layout with providers & theme initializer
│   │   └── page.tsx             # Landing page with interactive demo playground
│   ├── components/              # Modular UI components
│   │   ├── background/          # Background grid & ambient visual effects
│   │   ├── categories/          # Category management & budget client components
│   │   ├── dashboard/           # Summary cards, charts & theme toggles
│   │   ├── expenses/            # Expense tables, forms & filters
│   │   ├── insights/            # AI recommendations & insights cards
│   │   ├── landing/             # Hero, features, and playground demo
│   │   ├── layout/              # Navbar, sidebar, and footer
│   │   └── ui/                  # Reusable Shadcn / Radix UI primitives
│   ├── lib/
│   │   ├── ai/                  # Gemini AI prompts & local heuristic fallbacks
│   │   ├── auth/                # NextAuth OIDC configuration with WSO2/Asgardeo
│   │   ├── db/                  # Prisma client singleton
│   │   └── utils.ts             # Tailwind class merger & helper utilities
│   └── types/                   # Shared TypeScript interfaces and types
├── .env.example                 # Template for environment variables
├── package.json                 # Project dependencies & scripts
└── tsconfig.json                # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.18+ or v20+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) database instance
- *(Optional)* [Google AI Studio API Key](https://aistudio.google.com/apikey) for Gemini AI features
- *(Optional / Required for Auth)* [Asgardeo](https://wso2.com/asgardeo/) / WSO2 Identity Server application

---

### 1. Clone the Repository

```bash
git clone https://github.com/KasunBandara921/expensemanager-Asgardeo.git
cd SmartSpend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Fill in the required configuration parameters:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/smartspend?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="your-generated-secret" # generate using: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# WSO2 / Asgardeo OIDC Configuration
WSO2IS_HOST="https://api.asgardeo.io/t/your-organization"
WSO2IS_CLIENT_ID="your_asgardeo_client_id"
WSO2IS_CLIENT_SECRET="your_asgardeo_client_secret"

# Google Gemini AI (Optional - unlocks AI insights)
GEMINI_API_KEY="your_gemini_api_key"
# GEMINI_MODEL="gemini-2.5-flash"
```

### 4. Setup the Database

Generate the Prisma client and push the database schema to your PostgreSQL instance:

```bash
npm run db:generate
npm run db:push
```

*(Optional)* Open Prisma Studio to view and manage database records through a GUI:

```bash
npm run db:studio
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔐 WSO2 / Asgardeo Setup Guide

1. Log in to the [Asgardeo Console](https://console.asgardeo.io/) or your WSO2 Identity Server instance.
2. Navigate to **Applications** > **New Application** > **Standard-Based Application**.
3. Select **OpenID Connect (OIDC)**.
4. Set the **Authorized Redirect URLs** to:
   ```
   http://localhost:3000/api/auth/callback/wso2
   ```
5. Set the **Allowed Origins** to:
   ```
   http://localhost:3000
   ```
6. Under **User Attributes**, ensure `email`, `profile`, and `openid` scopes are enabled.
7. Copy the **Client ID**, **Client Secret**, and **Issuer URL / Host** into your `.env` file.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the Next.js dev server on `http://localhost:3000` |
| **Build** | `npm run build` | Compiles the production build |
| **Start** | `npm run start` | Runs the compiled production server |
| **Lint** | `npm run lint` | Runs ESLint to check for code issues |
| **Prisma Generate** | `npm run db:generate` | Generates TypeScript types for Prisma Client |
| **Prisma Push** | `npm run db:push` | Syncs schema changes directly with the database |
| **Prisma Studio** | `npm run db:studio` | Launches visual Prisma database browser |

---

## 🔒 Security Best Practices

- **Secrets Management:** Keep `.env` out of version control.
- **Server-Side AI:** Gemini API keys are used strictly on the server and never exposed to the client.
- **Session Security:** NextAuth uses secure JWT session cookies with full OpenID Connect logout termination.

---

## 📄 License

This project is licensed under the MIT License.
