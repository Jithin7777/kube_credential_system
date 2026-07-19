# Kube Credential System

A full-stack **microservice-based credential issuing and verification system** built with **React, Node.js, TypeScript, Docker, and MongoDB Atlas**.

The project consists of a React frontend and two independent backend microservices for issuing and verifying digital credentials.

---

## Repository

```bash
git clone git@github.com:Jithin7777/kube_credential_system.git
```

or using HTTPS:

```bash
git clone https://github.com/Jithin7777/kube_credential_system.git
```

---

## Project Structure

```text
kube_credential_system/
│
├── kube-credential-frontend/
│   ├── README.md
│   └── ...
│
├── kube-crendential-backend/
│   ├── README.md
│   └── ...
│
└── README.md
```

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Context API
- React Router
- Jest
- React Testing Library

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- Docker
- Docker Compose
- Zod
- Jest

---




## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:Jithin7777/kube_credential_system.git
cd kube-credential-frontend
```

### 2. Start the backend

```bash
cd kube-crendential-backend

docker compose up --build
```

Detailed backend documentation:

```
kube-crendential-backend/README.md
```

### 3. Start the frontend

Open a new terminal.

```bash
cd kube-credential-frontend

npm install
npm run dev
```

Detailed frontend documentation:

```
kube-credential-frontend/README.md
```

---



## Features

- Full-stack application
- Microservice architecture
- MongoDB Atlas integration
- Dockerized backend
- REST APIs
- TypeScript throughout the project
- Worker-based credential processing
- Unit & integration testing