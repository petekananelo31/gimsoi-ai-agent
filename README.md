# GIMSOI AI Agent 🤖
> **Enterprise-Grade Project Intelligence Engine**

This repository contains the core AI engine and modular backend for the GIMSOI project. Built with Gemini 2.5 Flash, it provides predictive analytics to evaluate sprint health and contributor consistency.

---

## 🚀 System Features
- **Predictive Risk Scoring:** Uses proprietary weighted formulas (4.1 & 4.2) to calculate project danger zones before they happen.
- **Context-Aware Security:** Implements RBAC (Role-Based Access Control) to mask sensitive data based on user roles (PM, Dev, Client).
- **Automated Governance:** Integrated CI/CD via GitHub Actions to ensure zero-regression deployments.

## 🛠 Tech Stack
- **AI Model:** Google Gemini 2.5 Flash
- **Orchestration:** Genkit Framework
- **Backend:** Node.js / Express
- **Validation:** Zod (Type-safe AI responses)
- **Database:** PostgreSQL

## 📂 Repository Structure
- `/backend`: The core Node.js API and AI logic.
- `/docs`: Architectural diagrams and mathematical proofs.
- `.github/workflows`: CI/CD safety checks and branch protection rules.

## ⚙️ Setup for Teammates
1. **Clone the repo:** `git clone https://github.com/petekananelo31/gimsoi-ai-agent.git`
2. **Setup Env:** Create a `.env` in `/backend` with `GOOGLE_GENAI_API_KEY`.
3. **Install:** Run `npm install` inside the `backend` folder.
4. **Run:** `npm start` to launch the server on port 3400.

---
