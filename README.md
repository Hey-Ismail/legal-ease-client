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

## 🌐 Live Demo

**Replace the URL below with your actual live deployment:**
- [Live Demo](https://legal-ease-client.vercel.app) - Vercel deployment

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