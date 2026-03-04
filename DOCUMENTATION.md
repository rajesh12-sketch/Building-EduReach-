# 🎓 EduReach: Comprehensive Technical Documentation

Welcome to the official documentation for **EduReach**, a next-generation, AI-powered university management and student portal platform. This document provides an in-depth explanation of the application's architecture, features, database schema, API endpoints, and the underlying technologies used to build it.

---

## Table of Contents
1. [Introduction & Vision](#1-introduction--vision)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Core Features Explained](#4-core-features-explained)
   - [Authentication & Security](#authentication--security)
   - [Dynamic Course Catalog](#dynamic-course-catalog)
   - [End-to-End Application System](#end-to-end-application-system)
   - [Personalized Student Portal](#personalized-student-portal)
   - [Agentic AI Voice Counselor](#agentic-ai-voice-counselor)
5. [Database Schema (MongoDB)](#5-database-schema-mongodb)
6. [API Reference](#6-api-reference)
7. [Application Boot Sequence](#7-application-boot-sequence)

---

## 1. Introduction & Vision

**EduReach** is designed to modernize the higher education experience. Traditional university websites are often static and difficult to navigate. EduReach solves this by combining a sleek, modern interface with an intelligent, voice-enabled AI assistant that guides students through their academic journey—from discovering courses to submitting applications and managing their student life.

The platform is built as a **Single Page Application (SPA)** with a robust backend, ensuring fast load times, seamless transitions, and secure data handling.

---

## 2. Technology Stack

EduReach utilizes a modern, JavaScript-centric "MERN-like" stack, optimized for performance and developer experience.

### Frontend (Client-Side)
* **React 18:** The core UI library, allowing for component-based architecture and efficient DOM updates.
* **TypeScript:** Adds static typing to JavaScript, catching errors early and improving code maintainability.
* **Vite:** A lightning-fast build tool and development server that replaces older tools like Create React App (CRA).
* **Tailwind CSS:** A utility-first CSS framework used for rapid, responsive, and highly customizable styling without writing custom CSS files.
* **React Router DOM:** Handles client-side routing, enabling navigation between pages (e.g., Home, Login, Portal) without reloading the browser.
* **Lucide React:** A library providing clean, consistent SVG icons used throughout the UI.
* **Web Speech API:** Native browser APIs (`SpeechRecognition` and `SpeechSynthesis`) used to power the voice input and output features of the AI chatbot.

### Backend (Server-Side)
* **Node.js:** The JavaScript runtime environment executing the server code.
* **Express.js:** A minimal and flexible web application framework used to build the RESTful API.
* **MongoDB:** A NoSQL document database used to store user profiles, course data, and student applications.
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB, providing schema validation and a simpler query interface.
* **JSON Web Tokens (JWT):** Used for secure, stateless user authentication.
* **bcryptjs:** A library used to securely hash user passwords before storing them in the database.

### Artificial Intelligence
* **Google Gemini API (`@google/genai`):** The Large Language Model (LLM) powering the Agentic AI Counselor. It uses a Retrieval-Augmented Generation (RAG) approach, meaning it is fed specific university data to answer questions accurately.

---

## 3. System Architecture

EduReach uses a **Full-Stack (Express + Vite)** architecture. 

Unlike traditional setups where the frontend and backend run on separate ports (e.g., React on 5173 and Express on 5000), EduReach integrates them into a single process during development. 

1. **The Express Server (`server.ts`)** starts on port 3000.
2. It defines all the `/api/*` routes for data handling.
3. It then attaches **Vite as middleware**. This means Express handles API requests, and Vite handles serving the React frontend and hot-module replacement (HMR) on the *same port*.
4. This architecture eliminates Cross-Origin Resource Sharing (CORS) issues and simplifies deployment.

---

## 4. Core Features Explained

### Authentication & Security
Security is paramount for a student portal. 
* **Registration:** When a user signs up, their password is encrypted using `bcryptjs` before being saved to MongoDB.
* **Login:** Upon successful login, the server generates a **JWT (JSON Web Token)**. This token is sent back to the client and stored in `localStorage`.
* **Protected Routes:** The frontend uses an `AuthContext` to wrap the application. If a user tries to access `/student-portal` without a valid token, they are redirected to the login page.
* **API Protection:** Backend routes (like submitting an application) use an `auth.middleware.ts` function. This middleware intercepts the request, verifies the JWT in the `Authorization` header, and attaches the user's ID to the request object before allowing it to proceed.

### Dynamic Course Catalog
The university offers various programs grouped into **Sectors** (e.g., Computer Science, Business).
* **Data Flow:** Instead of hardcoding courses in the React components, the frontend makes a `GET` request to `/api/programs`.
* **UI Presentation:** The `ProgramsPage.tsx` dynamically renders course cards based on the database response. Each card displays critical details: Duration, Mode (Online/Hybrid/On-Campus), Intake semester, and Availability (Open, Limited Seats, Closed).

### End-to-End Application System
EduReach allows students to apply for courses directly.
* **The Flow:** A student clicks "Apply Now" on an open course. A modal appears.
* **Data Collection:** The modal pre-fills the student's Name and Email (pulled from their Auth context). It requires them to input their Phone Number, Previous Education, and a Statement of Purpose.
* **Submission:** Upon clicking submit, a `POST` request is sent to `/api/applications`. The backend verifies the user hasn't already applied for this specific course, saves the application to MongoDB with a default status of "Pending", and returns a success response.

### Personalized Student Portal
The `/student-portal` is the authenticated user's dashboard.
* **Dynamic Greeting:** Welcomes the user by name.
* **My Applications:** Makes a `GET` request to `/api/applications` to fetch only the applications belonging to the logged-in user. It displays the course name, application date, and current status (Pending, Accepted, Rejected).
* **Upcoming Courses & Events:** Displays hardcoded (for now) upcoming courses and campus events to keep the student engaged.
* **Action Modals:** Buttons like "Edit Profile" or "View All" trigger a clean UI modal explaining that the feature is coming soon, rather than using jarring browser alerts.

### Agentic AI Voice Counselor
The standout feature of EduReach is the AI Chatbot (`Chatbot.tsx` and `useChat.ts`).
* **Knowledge Base (RAG):** The AI is not just a generic chatbot. In `useChat.ts`, we construct a massive string containing all the university's data (courses, events, contact info) and pass it to the Gemini API as a `systemInstruction`. This ensures the AI only answers questions based on EduReach's specific offerings.
* **Voice Input (Speech-to-Text):** Users can click the microphone icon. The app uses the browser's `SpeechRecognition` API to listen to the user's voice, transcribe it into text, and send it to the AI.
* **Voice Output (Text-to-Speech):** Users can click the speaker icon next to an AI response. The app uses the browser's `SpeechSynthesis` API to read the text aloud, making the platform highly accessible.

---

## 5. Database Schema (MongoDB)

The application uses Mongoose to define strict schemas for the MongoDB database.

### `User` Model (`server/models/User.ts`)
Stores student credentials.
* `name`: String, required.
* `email`: String, required, unique.
* `password`: String, required (hashed).
* `role`: String, defaults to 'student'.

### `Sector` Model (`server/models/Program.ts`)
Stores the categories of study and their nested courses.
* `name`, `slug`, `iconName`, `description`: Strings.
* `courses`: An array of sub-documents containing:
  * `courseId`, `courseName`, `duration`, `mode`, `intake`, `availability`, `description`.

### `Application` Model (`server/models/Application.ts`)
Stores the submitted course applications.
* `user`: ObjectId, references the `User` model (links the application to a specific student).
* `courseId`, `courseName`: Strings.
* `fullName`, `email`, `phone`: Strings (contact info).
* `education`, `statement`: Strings (academic background).
* `status`: String Enum ('Pending', 'Under Review', 'Accepted', 'Rejected'), defaults to 'Pending'.
* `appliedAt`: Date, defaults to `Date.now()`.

---

## 6. API Reference

### Auth Routes (`/api/auth`)
* **`POST /register`**: Expects `{ name, email, password }`. Creates a new user and returns a JWT.
* **`POST /login`**: Expects `{ email, password }`. Verifies credentials and returns a JWT.
* **`GET /me`**: Requires Bearer Token. Returns the profile data of the currently authenticated user.

### Program Routes (`/api/programs`)
* **`GET /`**: Returns an array of all program sectors and their courses.
* **`GET /:sectorName`**: Returns a specific sector object based on its URL slug (e.g., `/api/programs/computer-science-engineering`).
* **`POST /seed`**: (Internal use) Clears the `Sector` collection and re-inserts the default course catalog defined in `src/data/programs.ts`.

### Application Routes (`/api/applications`)
* **`POST /`**: Requires Bearer Token. Expects `{ courseId, courseName, fullName, email, phone, education, statement }`. Creates a new application.
* **`GET /`**: Requires Bearer Token. Returns an array of all applications submitted by the currently authenticated user, sorted by date (newest first).

---

## 7. Application Boot Sequence

Understanding how the application starts is crucial for debugging and deployment.

1. **Execution:** The command `npm run dev` executes `tsx server.ts`.
2. **Environment Variables:** `dotenv.config()` loads variables (like `GEMINI_API_KEY` and `JWT_SECRET`).
3. **Database Connection:** `connectDB()` establishes a connection to the MongoDB cluster.
4. **Data Seeding:** `seedPrograms()` runs automatically. It deletes all existing program data and re-inserts the fresh data from `src/data/programs.ts`. This ensures the database is never out of sync with the frontend data definitions.
5. **Middleware Setup:** `cors()` and `express.json()` are applied to parse incoming requests.
6. **Route Mounting:** The API routes (`/api/auth`, `/api/programs`, `/api/applications`) are mounted to the Express app.
7. **Vite Integration:** If running in development mode, `createViteServer` is called, and Vite's middleware is attached to Express to serve the React frontend.
8. **Listening:** The server begins listening for traffic on port 3000.
