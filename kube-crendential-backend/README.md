# Kube Credential Backend


---


##  Project Overview
Kube Credential is a **microservice-based application** for issuing and verifying digital credentials.  
The backend consists of **two independent microservices**:

1. **Issuance Service** – Creates and stores credentials.  
2. **Verification Service** – Validates credentials and returns worker ID and timestamp.

Each service is **containerized using Docker**, runs independently, and connects to the same MongoDB Atlas database..  

---

##  Architecture & Design Decisions

### Microservice Approach
- Separation of concerns: Issuance and Verification are independent workflows.
- Benefit: Easier to deploy, test, scale, and maintain.

### Database

- **Current:** MongoDB Atlas
- **ODM:** Mongoose
- Both services connect to the same MongoDB database while remaining independent.

### Worker 
- Each service returns a simulated worker ID for requests.
- Example: `"credential issued by worker-1"` or `"verified by worker-1 at 2025-10-13T10:00:00Z"`.

### TypeScript
- Enforces type safety across services.
- Reduces runtime errors and improves maintainability.

##  Folder Structure
```javascript
kube-credential-backend/
├── issuance-service/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── issuanceController.ts
│   │   ├── models/
│   │   │   └── Credential.ts
│   │   ├── routes/
│   │   │   └── issuanceRoutes.ts
│   │   ├── test/
│   │   │   ├── credentialModel.test.ts
│   │   │   └── issuanceController.test.ts
│   │   ├── types/
│   │   │   └── credentialTypes.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .env
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
├── verification-service/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── verificationController.ts
│   │   ├── models/
│   │   │   └── Credential.ts
│   │   ├── routes/
│   │   │   └── verificationRoutes.ts
│   │   ├── tests/
│   │   │   └── verificationModel.test.ts
│   │   ├── types/
│   │   │   └── verificationTypes.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .env
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── docker-compose.yml
```

## Environment Variables

Create a `.env` file inside **both** services.

Example:

```
MONGODB_URI=your_mongodb_atlas_connection_string
```

The verification service only requires:

```
MONGODB_URI=your_mongodb_atlas_connection_string
```


##  How to Run

### Prerequisites
- Install [Docker](https://www.docker.com/get-started) (includes Docker Compose)

### Using Docker Compose
1. From the root of the project, run:

```bash
docker-compose up --build
```

2. Local ports:
- Issuance Service → 5000
- Verification Service → 5001

3. To stop the services,run:
 
```bash
docker-compose down
 ```

### Running Tests

- Unit tests are included for controllers and models.

- To run tests:


```bash
cd issuance-service
npm run test:unit
npm run test:integration
npm run test
```

```bash
cd verification-service
npm run test 
```


##  API Endpoints

### 1. Issue Credential

- **URL:** `POST http://localhost:5000/issue`  
- **Request Body (JSON):**
```json
{
    "name": "Jithin",
    "email": "jithin@gmail.com"
}
```
- Response Body (JSON):
`"
{
    "message": "credential issued by worker-1",
    "credential": {
        "name": "Jithin",
        "email": "jithin@gmail.com",
        "id": "aa53da90-ce2c-450e-97da-84182c8949cc",
        "worker": "worker-1",
        "timestamp": "2025-10-13T08:43:52.377Z"
    }
}
"`


### 2. Verify Credential

- **URL:** `POST http://localhost:5001/api/verify`  
- **Request Body (JSON):**
```json
{
    "id":"aa53da90-ce2c-450e-97da-84182c8949cc",
    "email":"jithin@gmail.com"
}
```
- Response Body (JSON):
 `"
 {"verified":true,"message":"Credential verified successfully","credential":{"name":"Jithin","email":"jithin@gmail.com","id":"aa53da90-ce2c-450e-97da-84182c8949cc","worker":"worker-1","timestamp":"2025-10-13T08:43:52.377Z","verified":true,"verifiedBy":"worker-1","verifiedAt":"2025-10-13T08:51:02.018Z"}}
 "`
