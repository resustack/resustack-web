# Resustack Web

A modern web application built with Next.js 16, React 19, and TypeScript.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Project Structure

```
resustack-web/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   └── ui/          # shadcn/ui components
│   ├── constants/        # Application constants
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   │   └── utils.ts     # Common utilities
│   └── utils/           # Utility functions
├── components.json      # shadcn/ui configuration
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 10.20.0 or later

### Installation

Install dependencies using pnpm:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build the application for production:

```bash
pnpm build
```

### Production

Start the production server:

```bash
pnpm start
```

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - Maps to `./src/*`
- `@/components` - Components directory
- `@/lib` - Library utilities
- `@/hooks` - Custom hooks
- `@/utils` - Utility functions

## Features

- Modern React 19 with Server Components
- Type-safe development with TypeScript
- Tailwind CSS 4 for styling with CSS variables
- shadcn/ui component library (New York style)
- Zustand for lightweight state management
- ESLint for code quality
- Responsive design with mobile-first approach

## License

ISC