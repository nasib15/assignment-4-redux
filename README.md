# 📚 Library Management System

A modern, responsive library management system built with React, Redux Toolkit, and TypeScript. This application provides a comprehensive solution for managing books, tracking borrowing activities, and maintaining library inventory.

## ✨ Features

### 📖 Book Management

- **View Books**: Browse through a paginated list of all available books
- **Book Details**: View comprehensive information about individual books
- **Add Books**: Create new book entries with detailed information
- **Edit Books**: Update existing book information
- **Book Categories**: Support for multiple genres (Fiction, Non-Fiction, Science, History, Biography, Fantasy)
- **Inventory Tracking**: Monitor book availability and copy counts

### 📋 Borrowing System

- **Borrow Books**: Allow users to borrow available books
- **Due Date Management**: Track borrowing periods and due dates
- **Borrow Summary**: View comprehensive borrowing statistics and history
- **Quantity Management**: Handle multiple copies of the same book

### 🎨 User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Modern UI**: Clean, intuitive interface built with Radix UI components
- **Loading States**: Smooth loading animations and skeleton screens
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Technology Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - Efficient state management
- **RTK Query** - Powerful data fetching and caching
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components

- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful icons
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **Sonner** - Toast notifications
- **date-fns** - Date utility library

### Development Tools

- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nasib15/assignment-4-redux
   cd assignment-4-redux
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using bun
   bun install
   ```

3. **Start the development server**

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using bun
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── loaders/        # Loading components
│   ├── shared/         # Shared components (Navbar, Footer)
│   ├── theme/          # Theme-related components
│   └── ui/             # Base UI components (Radix UI)
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── layout/             # Layout components
├── lib/                # Utility functions
├── pages/              # Page components
├── providers/          # React providers
├── redux/              # Redux store and API
│   ├── api/           # RTK Query API definitions
│   ├── hooks.ts       # Typed Redux hooks
│   └── store.ts       # Store configuration
├── routes/             # React Router configuration
├── types/              # TypeScript type definitions
└── data/               # Static data and constants
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
