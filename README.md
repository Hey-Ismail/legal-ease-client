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

## 🔐 Authentication Notes

- **Google Login**: Clicking "Continue with Google" shows an info message: _"Google sign-in is currently unavailable. Please sign up with email and password instead."_
- **Logout**: Users are redirected to homepage after signing out
- **Signup**: Admin role removed - new users can only register as "User (Client)" or "Lawyer"

## 🎨 Design Customization

- **Colors**: Primary accent is amber-500, slate gray palette
- **Responsive**: Mobile-first design with hamburger menu

## 📦 Deployment

live link : https://legal-ease-client-amber.vercel.app/

<!-- _Built with ❤️ using Next.js and Better-Auth_ -->
