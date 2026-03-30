# Chloris-The-DIU-AI-Concierge

# 🌿 Chloris AI Concierge

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

**Chloris** is a modern, AI-powered student portal and virtual concierge designed for Daffodil International University (DIU). It combines a sleek React frontend with a powerful "Hybrid AI" Python backend to give students instant, accurate access to their academic data, university policies, and campus services.

## ✨ Features

* **🔒 Secure Student Authentication:** JWT-based login system tied to university credentials.
* **📊 Academic Dashboard:** Quick overview of CGPA, completed credits, and upcoming class schedules.
* **🤖 Hybrid AI Chat Assistant:**
    * *Rule-Based Engine:* 100% accurate, hallucination-free retrieval of personal student data (grades, schedules) via secure API calls.
    * *RAG Engine:* Context-aware answers to university policy and handbook questions using Vector Database retrieval.
    * *UI:* Features realistic AI typing effects and dynamic chat bubbles.
* **📅 Room Booking System:** Interactive calendar view for reserving campus study rooms.

## 🏗️ Architecture

Chloris operates on a decoupled architecture:
1.  **Frontend:** React 18, TypeScript, Tailwind CSS, built with Vite.
2.  **Backend (The Brain):** FastAPI (Python) acting as a strict security layer and intent router.
3.  **AI Layer:** Routes deterministic queries to structured databases (SQL) and unstructured queries to an LLM via Retrieval-Augmented Generation (RAG).

## 📂 Frontend Project Structure

The React frontend is strictly organized by responsibility to maintain clean, scalable code:

```text
chloris-frontend/
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── components/         # 🧩 UI Building Blocks
│   │   ├── calendar/       # Room booking calendar components
│   │   ├── chat/           # Chat bubbles, input fields, and UI
│   │   ├── common/         # Reusable buttons, inputs, spinners
│   │   └── layout/         # Sidebar, Navbar, Footer, MainLayout
│   ├── context/            # 🌍 Global State
│   │   └── AuthContext.tsx # Manages user login state & JWT tokens
│   ├── hooks/              # 🪝 Custom React Hooks
│   │   └── useChatStream.ts# Simulates AI typing effect
│   ├── pages/              # 📄 Full Webpages
│   │   ├── ChatAssistant.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── RoomBooking.tsx
│   ├── services/           # 🔌 API Connectors (Axios)
│   │   ├── api.ts          # Axios base config & Auth Interceptors
│   │   ├── authService.ts  # Login/Logout API calls
│   │   └── chatService.ts  # AI messaging API calls
│   ├── App.tsx             # Main Router & Route Protection
│   ├── index.css           # Tailwind directives & Global variables
│   └── main.tsx            # React Entry Point
├── package.json
└── tailwind.config.js
