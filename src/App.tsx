/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './components/Chatbot';
import StudentPortalPage from './pages/StudentPortalPage';
import ProgramsPage from './pages/ProgramsPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col relative">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/student-portal" element={<StudentPortalPage />} />
                <Route path="/programs/:sectorName" element={<ProgramsPage />} />
              </Route>
            </Routes>
          </main>
          
          {/* Global AI Chatbot */}
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}
