# Jiquizz

A React App for DOT Internship technical Test, built with React and Vite, deployed at [jiquizz.djie.cloud](https://jiquizz.djie.cloud/)

## 🚀 Features

- Built with React 18 and TypeScript
- Modern development environment using Vite
- Styled with TailwindCSS and SASS
- Form handling with react-hook-form and Zod validation
- Firebase integration
- Theme support with next-themes
- Toast notifications using sonner
- shadcn UI components for accessible UI primitives

## 📋 Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/ajinata84/jiquizz.git
cd jiquizz
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

## ⚙️ Environment

For firebase integration

```jsx
VITE_API_KEY = ""
VITE_AUTH_DOMAIN = ""
VITE_PROJECT_ID = ""
VITE_STORAGE_BUCKET = ""
VITE_MESSAGING_SENDER_ID = ""
VITE_APP_ID = ""
VITE_MEASUREMENT_ID = ""
```

## 🔧 Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173`

## 🏗️ Build

Create a production build:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 🧪 Linting

Run ESLint to check your code:

```bash
npm run lint
# or
yarn lint
```

## 📦 Tech Stack

### Core

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Build tool and development server

### Styling

- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [SASS](https://sass-lang.com/) - CSS preprocessor
- [class-variance-authority](https://cva.style/docs) - Component variant management
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind CSS classes

### UI Components

- [shadcn ui](https://ui.shadcn.com/) - Unstyled, accessible components
- [Lucide React](https://lucide.dev/) - Icon set

### Forms and Validation

- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### Routing and State

- [React Router](https://reactrouter.com/) - Client-side routing

### Backend Integration

- [Firebase](https://firebase.google.com/) - Backend services
- [Axios](https://axios-http.com/) - HTTP client

### Developer Tools

- [ESLint](https://eslint.org/) - Code linting
- [PostCSS](https://postcss.org/) - CSS transformations
- [Autoprefixer](https://github.com/postcss/autoprefixer) - CSS vendor prefixing