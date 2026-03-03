<img width="2100" height="1500" alt="social-collage" src="https://github.com/user-attachments/assets/b31e7403-1636-4447-b67a-bad39014a915" />

# 🚀 River Breeze | Smart Scheduling & Quoting Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![Testing](https://img.shields.io/badge/UAT-Passing-brightgreen?style=for-the-badge)](#)

> **A custom-built, full-stack scheduling and lead generation platform designed to eliminate calendar fragmentation for local service businesses.**

**🌐 Live Site:** [Insert Live URL Here]

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#%EF%B8%8F-tech-stack--architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Testing & QA](#-testing--qa)
- [Project Documentation](#-project-documentation)
- [Contact](#-contact)

---

## 🎯 About the Project

A custom-built, full-stack web application designed to automate the operational bottleneck of service-based businesses: **quoting and scheduling**. Built with the MERN stack and styled with Tailwind CSS, this platform replaces manual text-message negotiations with an automated funnel that generates instant, highly accurate quotes while mathematically protecting the business owner's calendar.

**The Problem:** For mobile service businesses (like domestic detailing, plumbing, or landscaping), scheduling is a game of Tetris. If a 1.5-hour job is booked in the middle of a 4-hour open block, it leaves awkward, unbookable gaps on either side—costing the business owner daily revenue.  

**The Solution:** This app features a custom **Two-Pass Smart Anchor Engine**. When a user requests a time slot, the backend algorithm calculates the job footprint (job time + 15-minute travel buffer) and uses an "Anchor & Step" algorithm to offer times that sit perfectly flush against existing jobs or shift boundaries, stepping outward in strict 120-minute increments to enforce schedule density. To maximize revenue, if the schedule is tight, the engine automatically executes a **"Squeeze Pass"**—stripping the 15-minute travel buffer to try and mathematically cram the appointment into the exact remaining daily footprint before ever rejecting a lead.

---

## ✨ Key Features

* ⚡ **Dynamic Quoting Engine:** A complex, state-driven React calculator that adjusts price and time estimates instantly based on base variables (square footage, rooms) and high-friction multipliers (pets, deep-clean add-ons).
* 🛡️ **The Smart Anchor Engine (v2.0):** A custom Node.js algorithm utilizing interval merging and a two-pass chronological sorting system to absolutely prevent schedule fragmentation and maximize daily capacity.
* 🔄 **Frictionless Returning Client Flow:** Returning users bypass the quoting calculator by verifying their identity (Address + Phone/Email) against the MongoDB database, instantly loading their property specs and historical pricing for a 2-click rebooking process.
* 🔐 **Admin Dashboard & CRM-Lite:** A protected JWT-authenticated route allowing the business owner to manage availability shifts, identify "New" vs "Returning" clients, finalize completed jobs with internal property notes, and soft-archive inactive clients.
* 📱 **Interactive UI/UX:** Features modern design patterns, including Apple-style glassmorphism, fully responsive mobile-first layouts, and a custom CSS `clip-path` "Magic Reveal" animation to transition seamlessly between states.

---

## 🛠️ Tech Stack & Architecture

**Frontend:**
* React.js (Vite)
* Tailwind CSS
* React Router DOM
* Zustand (State Management)
* React Hot Toast (UI Notifications)

**Backend:**
* Node.js & Express.js
* RESTful API Architecture
* JWT (JSON Web Tokens) Authentication

**Database & Infrastructure:**
* MongoDB & Mongoose ODM
* Google Maps Places API (Address Autocomplete)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm or yarn
* MongoDB locally installed or a MongoDB Atlas URI

### Installation

1. **Clone the repository**
   ```sh
   git clone [https://github.com/hughmorris01/river-breeze-platform.git](https://github.com/hughmorris01/river-breeze-platform.git)
   cd river-breeze-platform
   ```
2. **Install NPM packages**
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Set up Environment Variables** Configure your `.env` files in both the `backend` and `frontend` directories (See section below).
4. **Seed the Database**
   This project includes custom scripts to populate your database with initial testing data. Run these from the `backend` directory:
   ```sh
    # To import specifically client data
   npm run data:clients

   # To import full initial dataset
   npm run data:import
   
   ```
5. **Run the development servers**
   Open two terminal windows:
   ```sh
   # Terminal 1 (Backend)
   cd backend
   npm run dev
   
   # Terminal 2 (Frontend)
   cd frontend
   npm run dev
   ```

---

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables. Create a `.env` file in both the `backend` and `frontend` root directories.

**Backend (`/backend/.env`)**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
```

**Frontend (`/frontend/.env`)**
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_places_api_key
```

---

## 🧪 Testing & QA

Quality assurance is integral to the River Breeze platform.

* **Manual Testing & Validation:** Every feature underwent a rigorous "test-as-you-build" phase to ensure logical consistency and UI responsiveness.
* **User Acceptance Testing (UAT):** The platform passed a strict manual testing protocol covering algorithmic stepping, flush anchoring, and race-condition prevention.
* **Architecture:** Modular codebase designed to support future automated integration with **Jest** and **React Testing Library**.

*View the full [UAT Protocol & Evidence](./docs/03-uat-plan.md).*

---

## 📂 Project Documentation

This project follows a strict Software Development Life Cycle (SDLC). Comprehensive documentation, including the PRD, TDD, and architectural overviews, can be found in the `/docs` directory.

👉 **[View the complete Documentation Guide](./docs/README.md)**

---

## 💡 Note to Employers / Recruiters

This project was built to demonstrate an understanding of **translating real-world business requirements into scalable code**. The focus was on creating a bulletproof, gap-preventing scheduling algorithm and a UI/UX that actively drives conversions and retains existing clients. I am actively seeking full-stack MERN opportunities—feel free to reach out!

## 📞 Contact

**Greg Farrell** - Lead Full-Stack Engineer  
📧 **Email:** [greg.farrll82@gmail.com](mailto:greg.farrll82@gmail.com)  
📱 **Phone:** (585) 439-8235  
🔗 **LinkedIn:** [linkedin.com/in/gregory-farrell](https://www.linkedin.com/in/gregory-farrell)

Project Link: [https://github.com/hughmorris01/river-breeze-platform](https://github.com/hughmorris01/river-breeze-platform)