import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import FeaturedProgramsSection from '../components/FeaturedProgramsSection';
import { Bell, Calendar, FileText, MessageSquare, BookOpen, Clock, MonitorPlay } from 'lucide-react';
import api from '../services/api';
import { programSectors } from '../data/programs';

const StudentPortalPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [actionModal, setActionModal] = useState<{show: boolean, title: string, message: string}>({show: false, title: '', message: ''});
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  // Hardcode first 3 courses from the first sector for "Upcoming Courses"
  const upcomingCourses = programSectors[0]?.courses.slice(0, 3) || [];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications');
        setApplications(res.data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoadingApps(false);
      }
    };
    fetchApplications();
  }, []);

  const handleAction = (actionName: string) => {
    setActionModal({
      show: true,
      title: actionName,
      message: `The ${actionName} feature is currently being processed. This functionality will be fully available in the next platform update.`
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      {/* Action Modal */}
      {actionModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{actionModal.title}</h3>
            <p className="text-slate-600 mb-8">
              {actionModal.message}
            </p>
            <button 
              onClick={() => setActionModal({show: false, title: '', message: ''})}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-indigo-200"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Top Section: Welcome & Profile Summary */}
        <header className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome back, <span className="text-indigo-600">{user?.name}</span>!
            </h1>
            <p className="text-lg text-slate-600">
              Here's what's happening with your academic journey today.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xl">
              {user?.name?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{user?.email}</p>
              <p className="text-sm text-slate-500 capitalize">{user?.role || 'Student'}</p>
            </div>
            <button 
              onClick={() => handleAction('Edit Profile')}
              className="ml-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Edit
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Programs Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <FeaturedProgramsSection />
            </div>

            {/* My Applications */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-indigo-500" />
                  My Applications
                </h2>
                <button 
                  onClick={() => handleAction('View All Applications')}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View All
                </button>
              </div>
              
              {loadingApps ? (
                <div className="py-8 text-center text-slate-500">Loading applications...</div>
              ) : applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app._id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-200 transition-colors">
                      <div>
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 block">
                          {app.courseId}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">{app.courseName}</h3>
                        <p className="text-sm text-slate-500 mt-1">Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {app.status}
                        </span>
                        <button 
                          onClick={() => handleAction(`View Application: ${app.courseName}`)}
                          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                  <FileText className="w-12 h-12 text-slate-400 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No active applications</h3>
                  <p className="text-slate-500 max-w-sm">
                    You haven't applied to any programs yet. Explore our featured programs above to get started.
                  </p>
                  <button 
                    onClick={() => handleAction('Start New Application')}
                    className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Start Application
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area (1/3 width) */}
          <div className="space-y-8">
            
            {/* Upcoming Courses */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  Upcoming Courses
                </h2>
                <button 
                  onClick={() => handleAction('View All Courses')}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View All
                </button>
              </div>
              
              {upcomingCourses.length > 0 ? (
                <div className="space-y-4">
                  {upcomingCourses.map((course) => (
                    <div key={course.courseId} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 hover:border-indigo-100 transition-colors">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{course.courseName}</h4>
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-indigo-400" /> {course.duration}</span>
                        <span className="flex items-center gap-1"><MonitorPlay className="w-3 h-3 text-indigo-400" /> {course.mode}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 text-center flex flex-col items-center justify-center">
                  <BookOpen className="w-8 h-8 text-slate-400 mb-3" />
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">No enrolled courses</h3>
                  <p className="text-slate-500 text-xs max-w-[200px]">
                    You are not enrolled in any upcoming courses yet.
                  </p>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  Upcoming Events
                </h2>
                <button 
                  onClick={() => handleAction('View All Events')}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Tech Symposium 2026', date: 'Oct 15, 2026', type: 'Campus' },
                  { title: 'Alumni Networking', date: 'Nov 2, 2026', type: 'Virtual' },
                ].map((event, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleAction(`View Event: ${event.title}`)}
                    className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors cursor-pointer group"
                  >
                    <div className="bg-white w-14 h-14 rounded-xl shadow-sm flex flex-col items-center justify-center shrink-0 border border-slate-200 group-hover:border-indigo-200">
                      <span className="text-xs font-bold text-indigo-600 uppercase">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-extrabold text-slate-900">{event.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">{event.title}</h4>
                      <span className="inline-block px-2 py-1 bg-slate-200 text-slate-600 text-xs rounded-md font-medium">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-indigo-500" />
                  Announcements
                </h2>
                <button 
                  onClick={() => handleAction('View All Announcements')}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div 
                  onClick={() => handleAction('Read Announcement: Fall 2026 Registration')}
                  className="p-4 rounded-2xl bg-amber-50 border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors"
                >
                  <h4 className="font-semibold text-amber-900 text-sm mb-1">Fall 2026 Registration</h4>
                  <p className="text-amber-700 text-xs leading-relaxed">Early bird registration for Fall 2026 courses opens next week. Prepare your course list.</p>
                </div>
                <div 
                  onClick={() => handleAction('Read Announcement: New AI Counselor')}
                  className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors"
                >
                  <h4 className="font-semibold text-indigo-900 text-sm mb-1">New AI Counselor</h4>
                  <p className="text-indigo-700 text-xs leading-relaxed">Try our new Agentic AI Chatbot for instant answers about courses and campus life.</p>
                </div>
              </div>
            </div>

            {/* AI Chat Quick Access */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <MessageSquare className="w-10 h-10 text-indigo-200 mb-4 relative z-10" />
              <h3 className="text-2xl font-bold mb-2 relative z-10">Need Help?</h3>
              <p className="text-indigo-100 text-sm mb-6 relative z-10 leading-relaxed">
                Our AI Counselor is available 24/7 to answer your questions about programs, admissions, and more.
              </p>
              <button 
                onClick={() => {
                  // Find the floating chat button and click it to open the drawer
                  const chatBtn = document.querySelector('button[aria-label="Open AI Chat"]') as HTMLButtonElement;
                  if (chatBtn) chatBtn.click();
                }}
                className="w-full bg-white text-indigo-700 hover:bg-slate-50 font-bold py-3 px-4 rounded-xl transition-colors relative z-10 shadow-sm"
              >
                Open AI Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortalPage;
