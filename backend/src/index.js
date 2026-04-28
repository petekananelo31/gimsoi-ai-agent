// --- Environment Variable Loading (Local Development) ---
// Concept: `dotenv` loads environment variables from a `.env` file into `process.env`.
// Purpose: Allows you to define configuration variables (like API keys, database URLs)
//          in a separate file for local development without hardcoding them directly
//          into your source code.
// Importance: Essential for flexible local development setup. In Cloud Run, these
//             variables will be managed via Google Cloud's environment variables
//             or Secret Manager, so this line primarily affects local runs.
// Security: `.env` files should NEVER be committed to version control (`.gitignore` it!).
require('dotenv').config();

const express = require('express');
const admin = require('firebase-admin'); // <-- ADDED: Import Firebase Admin SDK
const cors = require('cors');           // <-- ADDED: Import CORS middleware
const { rbacMiddleware } = require('./middleware/rbac'); // Your existing RBAC middleware

const app = express();

// --- Firebase Admin SDK Initialization ---
// Concept: The Firebase Admin SDK is a set of server-side libraries that allow your
//          backend to securely interact with Firebase and Google Cloud services.
// Importance: This is the foundation for verifying user authentication tokens
//             (from Firebase Authentication) and performing other administrative tasks
//             (like setting custom user claims for roles) on your server.
// Security:
//   - **Credential Handling:** When deployed to Cloud Run, `admin.initializeApp()`
//     without arguments will automatically use the credentials of the service account
//     attached to the Cloud Run service (`cloud-run-backend-sa`). This is highly secure
//     as no service account keys are stored in your code or Docker image.
//   - **Project Scope:** Explicitly setting `projectId` provides clarity and ensures
//     the Admin SDK is operating within the correct Firebase/GCP project context.
admin.initializeApp({
  // Use `process.env.FIREBASE_PROJECT_ID` in production (set via Cloud Run config)
  // For local development, this value will be used if the env var isn't set.
  projectId: process.env.FIREBASE_PROJECT_ID || 'project-ef8a08b0-e0fa-4064-bdc', // <-- IMPORTANT: Your Firebase Project ID
});


// --- CORS Configuration ---
// Concept: CORS (Cross-Origin Resource Sharing) is a browser security mechanism that
//          restricts web pages from making requests to a different domain than the
//          one that served the web page. Your frontend (e.g., on Firebase Hosting)
//          will have a different domain than your backend (on Cloud Run).
// Purpose: To explicitly tell web browsers that your backend permits requests from
//          specific frontend domains, allowing your React app to communicate with
//          your Cloud Run backend.
// Importance: Without proper CORS configuration, your frontend's API calls to the
//             backend will be blocked by web browsers, leading to connection errors
//             like "Access-Control-Allow-Origin" missing.
// Security:
//   - **Whitelist Approach:** Using a *whitelist* of `allowedOrigins` is a critical
//     security best practice. It ensures only trusted domains can interact with your API.
//   - **NEVER use `origin: '*'` in production.** This would allow ANY website to make
//     requests to your backend, creating severe security vulnerabilities (e.g., Cross-Site
//     Request Forgery - CSRF attacks, data leakage).
//   - **Localhost Inclusion:** `http://localhost:5173` is included for local development
//     of your frontend. This must be removed or conditionalized for production deployments
//     if you have strict security requirements for local development vs. production.
const allowedOrigins = [
  'http://localhost:5173', // <-- For local frontend development (Vite default)
  `https://${process.env.FIREBASE_PROJECT_ID}.web.app`, // <-- Your Firebase Hosting default domain
  `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`, // <-- Older Firebase Hosting domain format (still common)
  // Add any custom domains you configure for Firebase Hosting here:
  // 'https://your-custom-domain.com',
];

// Configure and enable the CORS middleware
// Importance: This middleware MUST be placed BEFORE any other middleware that might
//             process actual requests, such as `express.json()` or your authentication
//             middleware. This is because CORS pre-flight requests (OPTIONS method)
//             need to be handled first.
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl requests, or same-origin server requests)
    if (!origin) return callback(null, true);
    // Check if the requesting origin is in our allowed list
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.warn(msg); // Log the blocked origin for debugging
      return callback(new Error(msg), false); // Reject the request
    }
    return callback(null, true); // Allow the request
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // <-- Explicitly list HTTP methods your API will accept
  credentials: true // <-- Allows cookies and authorization headers to be sent cross-origin
}));

app.use(express.json()); // <-- Always ensure this is placed *before* your routes so it can parse JSON request bodies

// --- Placeholders for future middleware and routes ---
// The Firebase Authentication verification middleware (BD2's task, not yet implemented here)
// will be added *here* on Day 2, *after* CORS and *before* rbacMiddleware.

// Health check endpoint (common for Cloud Run)
// Concept: A simple endpoint that responds 'OK' to indicate the service is running.
// Importance: Used by Cloud Run (and other load balancers/orchestrators) to determine
//             if your application instance is healthy and ready to receive traffic.
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

// Main Endpoint for your teammate (Original Endpoint Preserved)
// 
// When BD2 implements the global Firebase Auth middleware, it will be placed *before*
// rbacMiddleware. At that point, the `rbacMiddleware` itself will rely on `req.user.role`
// populated by the Firebase Auth middleware.
app.get('/ai/sprint-summary', rbacMiddleware, async (req, res) => {
  try {
    // Logic to call your AI service will go here
    // In later steps, this will involve calling functions from formulaService.js
    // and passing data retrieved via Prisma.
    res.json({ message: "GIMSOI AI Engine Online", status: "Ready" });
  } catch (err) {
    // Security: Log full error for debugging, but only send a generic message to client.
    console.error('Error in /ai/sprint-summary endpoint:', err);
    res.status(500).json({ error: 'Internal server error processing sprint summary.' });
  }
});

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => console.log(`GIMSOI Backend running on port ${PORT}`));

// this app works
// --- Server Startup ---
// Concept: `process.env.PORT` is an environment variable set by hosting platforms
//          (like Cloud Run). If not set (e.g., during local development), a fallback is used.
// Importance: Cloud Run specifically requires your application to listen on the port
//             defined by the `PORT` environment variable, which is always `8080`.
// Security: Listening on the correct port ensures your application can receive traffic
//           as intended by the hosting environment.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`GIMSOI Backend running on port ${PORT}`));
