# Snap-Tweet

Snap-Tweet is a social media platform where users can post and interact with tweets. This repository consists of the backend, frontend, and infrastructure setup using Terraform and Docker.

## System Design

<img width="1383" alt="image" src="https://github.com/user-attachments/assets/a326c5a4-4997-4690-b203-5b95af46ee3c" />


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
│   │── .gitignore        # Terraform ignore file
│   │── docker-compose.yml # Docker Compose configuration
│   │── package.json      # Dependencies for Terraform scripts (if any)
│   │── package-lock.json # Lock file for dependencies
│   │── README.md         # Documentation for Terraform setup
```

## Documentation Links
- **Node.js Documentation**: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **Terraform Documentation**: [https://developer.hashicorp.com/terraform/docs](https://developer.hashicorp.com/terraform/docs)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Express.js Documentation**: [https://expressjs.com/](https://expressjs.com/)
- **VS Code Dev Containers**: [https://code.visualstudio.com/docs/devcontainers/containers](https://code.visualstudio.com/docs/devcontainers/containers)
