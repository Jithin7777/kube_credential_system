# Kube Credential Frontend
---
## Submitted by
**Name:** Jithin Jose  
**Email:** jithinjose887@gmail.com  
**Contact:** +91 9446283405  



##  Project Overview
This is the frontend for the Kube Credential system.
It is built with React (TypeScript) and Vite and provides two main pages:
The backend consists of **two independent microservices**:

1. **Issuance Page** – Fill out a form to issue a credential.
2. **Verification Page** – Verify if a credential has been issued.

The frontend communicates with the backend APIs **(issuance-service and verification-service)** and provides a clean UI for users to interact with.


##  Architecture & Design Decisions

### React + TypeScript
- Type safety across components and services.
- Reduces runtime errors and improves maintainability.

### Component-based
- Reusable UI components (IssuanceForm, VerificationForm, Navigation).
- Separation of concerns with pages, services, and context.


### State Management
- Uses CredentialContext to manage state across the app.


### Routing
- AppRoutes.tsx handles all page navigation using React Router.


##  Folder Structure
```javascript
frontend/
├─ public/
├─ src/
│ ├─ __tests__/
│ │ ├─ IssuanceForm.test.tsx
│ │ └─ VerificationForm.test.tsx
│ ├─ assets/
│ │ └─ react.svg
│ ├─ components/
│ │ ├─ ui/
│ │ │ └─ (IssuanceForm.tsx, VerificationForm.tsx, Navigation.tsx)
│ ├─ context/
│ │ └─ CredentialContext.tsx
│ ├─ lib/
│ │ └─ utils.ts
│ ├─ pages/
│ │ └─ IssuancePage.tsx, VerificationPage.tsx
│ ├─ routes/
│ │ └─ AppRoutes.tsx
│ ├─ services/
│ │ └─ issuanceService.ts, verificationService.ts
│ ├─ types/
│ │ └─ apiResponses.ts, credentialTypes.ts
│ ├─ utils/
│ │ └─ formatDate.ts
│ ├─ App.css
│ ├─ App.tsx
│ ├─ index.css
│ └─ main.tsx
├─ .gitignore
├─ README.md
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jest.config.cjs
├─ jest.setup.ts
├─ package-lock.json
├─ package.json
├─ tsconfig.app.json
├─ tsconfig.jest.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

##  How to Run

### Steps


1. Extract the zipped folder anywhere on your machine.

2. Open a terminal and navigate to the extracted folder:

```bash
cd kube-credential-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

### Running Tests

```bash
npm run test
```
