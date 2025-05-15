# Projet La Pince - Frontend

## Description

Frontend for the La Pince project, developed with:

- Next.js 15
- React 19
- shadcn/ui
- Tailwind CSS 4
- TypeScript

## Features

- User interface with authentication (sign-in, sign-up)
- Dashboard for data visualization
- Modern UI components with shadcn/ui
- Data visualization with Recharts

## Project Structure

```
├── src/                    # Source code
│   ├── app/                # Next.js pages and layouts
│   │   ├── dashboard/      # Dashboard features
│   │   ├── sign-in/        # Authentication
│   │   └── sign-up/        # Account creation
│   ├── components/         # Reusable components
│   ├── context/            # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Libraries and utilities
│   ├── types/              # TypeScript definitions
│   └── utils/              # Utility functions
├── public/                 # Static resources
└── .next/                  # Next.js build
```

## Installation and Setup

### Prerequisites

- Docker

### Starting with Docker

To start the application in a Docker container:

```bash
sudo docker compose up
```

The application will be accessible at [http://localhost:4000](http://localhost:4000).

### Installing Dependencies

To add a package to the container:

```bash
sudo docker exec -it projet-la-pince-front-app-1 npm install <package_name>
```

## Available Scripts

- `docker exec -it projet-la-pince-front-app-1 npm run build` - Build the application for production
- `docker exec -it projet-la-pince-front-app-1 npm run lint` - Check code with ESLint
