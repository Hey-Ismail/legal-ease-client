# LegalEase - Lawyer Hiring Platform

A modern Next.js application connecting clients with lawyers for hiring legal services.

## 📖 Overview

LegalEase helps clients find and hire lawyers for various legal matters. The platform features role-based dashboards for users, lawyers, and admins, with secure authentication and a clean, responsive interface.

## ✨ Features

- **Authentication**: Email & password login/signup with Better-Auth
- **Role-based access**: Users, Lawyers, and Admins have dedicated dashboards
- **Google Sign-in**: Available (shows info message if unavailable)
- **Responsive design**: Works on mobile, tablet, and desktop
- **Dark/Light mode**: Toggle in the navbar
- **Dashboard views**: 
  - Users: Hiring history, profile, comments
  - Lawyers: Hiring requests, profile management
  - Admins: Analytics, user management, transactions

## 🛠️ Technologies

- **Next.js 14** with App Router
- **React** with TypeScript
- **Better-Auth** for authentication
- **Tailwind CSS** for styling
- **Lucide-react** for icons
- **next-themes** for dark/light mode

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   Copy `.env.example` to `.env` and add your:
   - `NEXT_PUBLIC_ADMIN_EMAIL` (default: `admin@legalease.com`)
   - `NEXT_PUBLIC_ADMIN_PASSWORD` (default: `Admin@123`)
   - Google OAuth credentials if needed

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |

## 📁 Project Structure

```
src/
├── app/           # Next.js App Router pages
│   ├── auth/      # Login & Signup pages
│   └── layout.js  # Root layout with Navbar
├── components/    # Reusable UI components
│   ├── Navbar.jsx # Navigation with ThemeToggle & Logout
│   └── GoogleSignin.jsx # Google button
├── lib/           # Utility files (auth config, lawyers data)
└── styles/        # CSS/TAILWIND styles
```

## 🔐 Authentication Notes

- **Google Login**: Clicking "Continue with Google" shows an info message: *"Google sign-in is currently unavailable. Please sign up with email and password instead."*
- **Logout**: Users are redirected to homepage after signing out
- **Signup**: Admin role removed - new users can only register as "User (Client)" or "Lawyer"
- **Default Admin**: `admin@legalease.com` / `Admin@123` (configurable via env vars)

## 🎨 Design Customization

- **Theme toggle**: Click the moon/sun icon in the navbar to switch between dark and light mode
- **Colors**: Primary accent is amber-500, slate gray palette
- **Responsive**: Mobile-first design with hamburger menu

## 📦 Deployment

Easily deploy to [Vercel](https://vercel.com) from the dashboard. The app is configured for seamless Vercel deployment.

---

*Built with ❤️ using Next.js and Better-Auth*