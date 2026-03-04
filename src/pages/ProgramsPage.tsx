import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sector, Course } from '../data/programs';
import { ArrowLeft, Clock, MonitorPlay, CalendarDays, CheckCircle2, AlertCircle, XCircle, X } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProgramsPage: React.FC = () => {
  const { sectorName } = useParams<{ sectorName: string }>();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [sector, setSector] = useState<Sector | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    phone: '',
    education: '',
    statement: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSector = async () => {
      try {
        const res = await api.get(`/programs/${sectorName}`);
        setSector(res.data);
      } catch (error) {
        console.error('Failed to fetch sector:', error);
        navigate('/student-portal');
      } finally {
        setLoading(false);
      }
    };
    fetchSector();
  }, [sectorName, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  if (!sector) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Sector not found.</div>;
  }

  const getAvailabilityBadge = (status: Course['availability']) => {
    switch (status) {
      case 'Open':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Open
          </span>
        );
      case 'Limited Seats':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5" /> Limited Seats
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5" /> Closed
          </span>
        );
      default:
        return null;
    }
  };

  const handleApplyClick = (course: Course) => {
    setSelectedCourse(course);
    setShowFormModal(true);
    setError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !user) return;

    setIsSubmitting(true);
    setError('');

    try {
      await api.post('/applications', {
        courseId: selectedCourse.courseId,
        courseName: selectedCourse.courseName,
        fullName: user.name,
        email: user.email,
        phone: formData.phone,
        education: formData.education,
        statement: formData.statement
      });
      
      setShowFormModal(false);
      setShowSuccessModal(true);
      setFormData({ phone: '', education: '', statement: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      {/* Application Form Modal */}
      {showFormModal && selectedCourse && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Course Application</h3>
                <p className="text-slate-500 text-sm mt-1">Applying for: <span className="font-semibold text-indigo-600">{selectedCourse.courseName}</span></p>
              </div>
              <button onClick={() => setShowFormModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input type="text" value={user.name} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input type="email" value={user.email} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Previous Education *</label>
                <input 
                  type="text" 
                  required
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="e.g., High School Diploma, BSc in Mathematics"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Statement of Purpose *</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.statement}
                  onChange={(e) => setFormData({...formData, statement: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none" 
                  placeholder="Why do you want to join this program? What are your career goals?"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Success Modal */}
      {showSuccessModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
            <p className="text-slate-600 mb-8">
              You have successfully applied for <span className="font-semibold text-slate-900">{selectedCourse.courseName}</span>. Our admissions team will review your application and contact you shortly.
            </p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/student-portal');
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-indigo-200"
            >
              Go to My Applications
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <Link 
            to="/student-portal" 
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portal
          </Link>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
              <span className="text-3xl font-bold">{sector.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                {sector.name}
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                {sector.description}
              </p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sector.courses.map((course) => (
              <div 
                key={course.courseId} 
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
              >
                {/* Availability Badge */}
                <div className="absolute top-6 right-6">
                  {getAvailabilityBadge(course.availability)}
                </div>

                <div className="mb-6 pr-24">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block">
                    {course.courseId}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    {course.courseName}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm mb-8 flex-grow leading-relaxed">
                  {course.description}
                </p>

                {/* Two-column structure for course details */}
                <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium mb-1 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Duration
                    </span>
                    <span className="text-sm font-semibold text-slate-800">{course.duration}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium mb-1 flex items-center">
                      <MonitorPlay className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Mode
                    </span>
                    <span className="text-sm font-semibold text-slate-800">{course.mode}</span>
                  </div>
                  <div className="flex flex-col col-span-2 mt-2 pt-2 border-t border-slate-200">
                    <span className="text-xs text-slate-500 font-medium mb-1 flex items-center">
                      <CalendarDays className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Intake
                    </span>
                    <span className="text-sm font-semibold text-slate-800">{course.intake}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyClick(course)}
                  disabled={course.availability === 'Closed'}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 mt-auto ${
                    course.availability === 'Closed'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300'
                  }`}
                >
                  {course.availability === 'Closed' ? 'Applications Closed' : 'Apply Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
