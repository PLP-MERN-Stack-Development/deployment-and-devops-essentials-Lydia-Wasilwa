# Blog Application

A full‑stack Blog Application built with **MongoDB, Express.js, React.js, and Node.js**, featuring CI/CD deployment, monitoring setup, and automated build workflows.

---

## Live Deployment

### **Frontend (React)**
URL: *[https://blog-app-xi-amber.vercel.app/]*

### **Backend API (Node/Express)**
URL: *[https://blog-app-f4j8.onrender.com]*

---

## Project Structure

```
blog-app/
├── client/          # React frontend
├── server/          # Node/Express backend
├── .github/workflows # CI/CD pipeline config
└── README.md
```

---

## Installation & Local Development

### **1. Clone the Repository**

### **2. Install Dependencies**

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### **3. Environment Variables**

Create `.env` files:

#### Server `.env`
```
PORT=5000
MONGO_URI=mongodb_atlas_uri
JWT_SECRET=your_secret
```

#### Client `.env`
```
VITE_API_URL=backend_deployed_url
```

---

## Running the App Locally

### Backend
```bash
cd server
npm run dev
```

### Frontend
```bash
cd client
npm run dev
```

---

## Deployment Instructions

### **Frontend Deployment using Vercel**

1. Run production build:
```bash
npm run build
```
2. Deploy the generated `dist/` folder.
3. Set environment variable:  
   `VITE_API_URL=https://backend-url/api`

---

### **Backend Deployment using Render**

1. Push the server folder to the hosting platform.
2. Add environment variables (PORT, MONGO_URI, JWT_SECRET).
3. Ensure correct build/start commands:
```
Build Command: npm install
Start Command: npm start
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

CI/CD runs automatically on:

- **Push to main**
- **Pull requests**
- **Tag releases**

### CI/CD Pipeline Screenshot  

![CI/CD Screenshot 1](screenshots/cicd_1.png)  
![CI/CD Screenshot 2](screenshots/cicd_2.png)

---

## Monitoring Documentation

### **1. Uptime Monitoring (UptimeRobot / BetterStack)**
- Tracks response time
- Alerts via email/SMS
- Automatic downtime logs

### Example Screenshot  
![Monitoring Screenshot](screenshots/monitoring.png)

### **2. Server Logs (PM2 / Render Dashboard)**
- Auto‑restart on crash
- CPU and RAM usage tracking
- HTTP request logs

### **3. Error Tracking (Sentry)**
- Real‑time error alerts
- Stack trace logging

---

## Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

---

## License
MIT License (2025)

---

## CI/CD Pipeline
- `frontend-ci.yml`: Tests and builds the React application
- `backend-ci.yml`: Tests the Express.js backend
- `frontend-cd.yml`: Deploys the frontend to your chosen platform
- `backend-cd.yml`: Deploys the backend to your chosen platform

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/) 