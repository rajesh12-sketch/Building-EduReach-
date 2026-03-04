import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { achievements, courses, mentors, studentLife, events, hiringStats } from '../data/content';
import { BookOpen, Users, Trophy, ChevronRight, Lock, PhoneCall, Calendar } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <header className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/campus/1920/1080?blur=2"
            alt="Campus"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Welcome to <span className="text-indigo-400">EduReach</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed">
            Empowering the next generation of leaders through world-class education, agentic AI support, and a vibrant community.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                Apply Now <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center justify-center"
              >
                Student Portal
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/student-portal"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                Go to Portal <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Public Content: About & Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose EduReach?</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item) => (
              <div key={item.id} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:shadow-xl transition-shadow duration-300">
                <Trophy className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Content: Courses & Mentors */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-bold text-slate-900">Featured Programs</h2>
              </div>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-colors">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
                      <span className="text-sm text-indigo-600 font-medium">{course.category}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Users className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-bold text-slate-900">World-Class Faculty</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-slate-50"
                      referrerPolicy="no-referrer"
                    />
                    <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
                    <p className="text-sm text-slate-500">{mentor.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gated Content Area */}
      {!user ? (
        <section className="py-24 bg-slate-900 text-center px-4">
          <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-12 rounded-3xl">
            <Lock className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Unlock the Full Experience</h2>
            <p className="text-lg text-slate-300 mb-8">
              Sign up to access student life resources, event galleries, hiring statistics, and our exclusive AI Voice Counselor.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-indigo-500/30"
            >
              Create Student Account
            </Link>
          </div>
        </section>
      ) : (
        <div className="bg-white">
          {/* Student Life & Events */}
          <section className="py-20 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Exclusive Content</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Student Life & Events</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {events.map((event) => (
                  <div key={event.id} className="group rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-900 flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {event.date}
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                      <button className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hiring Stats & Counselor */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Recent Alumni Placements</h3>
                  <div className="space-y-4">
                    {hiringStats.map((stat) => (
                      <div key={stat.id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                        <span className="font-semibold text-slate-700">{stat.company}</span>
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                          {stat.hires} Hires
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-900 p-8 rounded-3xl text-white relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute -right-10 -top-10 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-50"></div>
                  <div className="relative z-10">
                    <PhoneCall className="w-12 h-12 text-indigo-300 mb-6" />
                    <h3 className="text-3xl font-bold mb-4">AI Voice Counselor</h3>
                    <p className="text-indigo-200 mb-8 text-lg leading-relaxed">
                      Need guidance on courses, career paths, or campus life? Talk to our advanced AI counselor anytime, anywhere.
                    </p>
                    <button 
                      onClick={() => {
                        const chatBtn = document.querySelector('button[aria-label="Open AI Chat"]') as HTMLButtonElement;
                        if (chatBtn) chatBtn.click();
                      }}
                      className="bg-white text-indigo-900 hover:bg-slate-50 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 w-max"
                    >
                      Start Voice Call <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      
      {/* Contact Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Have questions about admissions, programs, or campus life? Our staff is here to help you clarify all your doubts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-500 mb-4">Mon-Fri from 8am to 6pm.</p>
              <a href="tel:+1234567890" className="text-indigo-600 font-semibold hover:text-indigo-700">
                +1 (555) 123-4567
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-500 mb-4">We'll respond within 24 hours.</p>
              <a href="mailto:admissions@edureach.edu" className="text-emerald-600 font-semibold hover:text-emerald-700">
                admissions@edureach.edu
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Campus</h3>
              <p className="text-slate-500 mb-4">Schedule a guided campus tour.</p>
              <span className="text-violet-600 font-semibold">
                123 University Ave, Tech City
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-center">
        <p>© 2026 EduReach Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
