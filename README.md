# Snap-Tweet

Snap-Tweet is a social media platform where users can post and interact with tweets. This repository consists of the backend, frontend, and infrastructure setup using Terraform and Docker.

## System Design

<img width="1350" alt="image" src="https://github.com/user-attachments/assets/0484017e-f7c5-49ca-a9b1-438496b40c75" />

## Prerequisites

To set up the project on your local machine, ensure you have the following installed:

- **Node.js** - [Download Here](https://nodejs.org/)
- **Docker & Docker Compose** - [Install Guide](https://docs.docker.com/get-docker/)
- **Terraform** (optional, if deploying infrastructure) - [Download Here](https://www.terraform.io/downloads.html)
- **Git** - [Install Guide](https://git-scm.com/)
- **MongoDB** (if running locally) - [Installation Guide](https://www.mongodb.com/docs/manual/installation/)
- **VS Code with Dev Containers Extension** - [Install Here](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Ensure you have these dependencies installed before proceeding with the setup.

## How to Open DevContainer in VS Code

To run the project in a **DevContainer** using VS Code, follow these steps:

1. **Install VS Code** if you haven’t already: [Download Here](https://code.visualstudio.com/).
2. **Install Docker Desktop** and ensure it is running.
3. **Clone this repository** if you haven’t already:
   ```sh
   git clone https://github.com/SnapTweet/snap-tweet.git
   cd snap-tweet
   ```
4. **Open the project in VS Code**.
5. **Reopen the project in a container**:
   - Open the Command Palette (`Ctrl + Shift + P` / `Cmd + Shift + P` on Mac)
   - Search for **“Remote-Containers: Reopen in Container Without Cache”**
   - Select it and wait for VS Code to build the DevContainer.
6. Once inside the container, you can run:
   ```sh
   npm run start:services
   ```
   to set up and start the backend and frontend services.

## Project Structure

```
.snap-tweet/
│── .devcontainer/         # Development container configuration
│── backend/              # Backend API and server-side logic
│   │── node_modules/     # Backend dependencies
│   │── .dockerignore     # Docker ignore file for backend
│   │── .env              # Environment variables (not committed to Git)
│   │── .env.example      # Example environment variables
│   │── Dockerfile        # Docker configuration for backend
│   │── package.json      # Node.js dependencies
│   │── package-lock.json # Lock file for dependencies
│   │── server.js         # Express server implementation
│
│── frontend/             # Frontend Next.js application
│   │── .next/            # Next.js build output
│   │── app/              # Application main directory
│   │── components/       # UI components
│   │── hooks/            # Custom React hooks
│   │── lib/              # Utility functions
│   │── node_modules/     # Frontend dependencies
│   │── public/           # Static assets
│   │── styles/           # Stylesheets
│   │── .dockerignore     # Docker ignore file for frontend
│   │── .gitignore        # Git ignore file
│   │── components.json   # UI component configuration
│   │── Dockerfile        # Docker configuration for frontend
│   │── eslint.config.mjs # ESLint configuration
│   │── next-env.d.ts     # Next.js environment types
│   │── next.config.mjs   # Next.js configuration
│   │── package.json      # Node.js dependencies
│   │── package-lock.json # Lock file for dependencies
│   │── postcss.config.mjs # PostCSS configuration
│   │── tailwind.config.js # Tailwind CSS configuration
│   │── tailwind.config.ts # Tailwind CSS configuration (TypeScript)
│   │── tsconfig.json      # TypeScript configuration
│
│── terraform/            # Infrastructure as Code (IaC) using Terraform
│── .gitignore            #gitignore file
│── docker-compose.yml    # Docker Compose configuration
│── package.json          # Dependencies for Terraform scripts (if any)
│── package-lock.json     # Lock file for dependencies
│── README.md             # Documentation for Terraform setup
```

## Root `package.json` Scripts

The root `package.json` manages both the **frontend** and **backend** using workspaces and includes helpful scripts:

```json
{
  "private": true,
  "workspaces": ["backend", "frontend"],

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1", // Placeholder test command
    "start:services": "docker-compose up --build -d", // Starts all services using Docker Compose
    "stop:services": "docker-compose down", // Stops all running Docker containers
    "rebuild:services": "npm run stop:services && npm run start:services", // Rebuilds and restarts services
    "start:frontend": "cd frontend && npm run dev", // Starts the frontend development server
    "start:backend": "cd backend && nodemon run dev", // Starts the backend with nodemon for live reload
    "logs:services": "docker-compose logs -f", // Shows live logs of all running services
    "restart:services": "npm run stop:services && docker-compose up -d", // Restarts services without rebuilding
    "start:db": "docker-compose up -d mongo", // Starts only the MongoDB container
    "stop:db": "docker-compose stop mongo", // Stops only the MongoDB container
    "restart:db": "npm run stop:db && npm run start:db", // Restarts MongoDB container
    "logs:db": "docker-compose logs -f mongo" // Shows live logs of MongoDB container
  }
}
```

### Explanation of Scripts

- **test**: Placeholder script for testing.
- **start:services**: Builds and starts all services using Docker Compose.
- **stop:services**: Stops all running Docker containers.
- **rebuild:services**: Stops all services, rebuilds them, and starts them again.
- **start:frontend**: Navigates to the frontend folder and starts the Next.js development server.
- **start:backend**: Navigates to the backend folder and starts the Express server with nodemon.
- **logs:services**: Displays logs for all running services.
- **restart:services**: Stops all services and starts them again without rebuilding.
- **start:db**: Starts only the MongoDB database container.
- **stop:db**: Stops only the MongoDB database container.
- **restart:db**: Stops and then restarts the MongoDB database container.
- **logs:db**: Displays logs for the MongoDB database container.

## Documentation Links

- **Node.js Documentation**: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **Terraform Documentation**: [https://developer.hashicorp.com/terraform/docs](https://developer.hashicorp.com/terraform/docs)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Express.js Documentation**: [https://expressjs.com/](https://expressjs.com/)
- **VS Code Dev Containers**: [https://code.visualstudio.com/docs/devcontainers/containers](https://code.visualstudio.com/docs/devcontainers/containers)
