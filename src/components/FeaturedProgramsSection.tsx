import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import api from '../services/api';
import { Sector } from '../data/programs';

const FeaturedProgramsSection: React.FC = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get('/programs');
        setSectors(res.data);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading programs...</div>;
  }

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Featured Programs</h2>
        <p className="text-slate-600 mt-2">Explore our top-rated academic sectors and find your path.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => {
          // Dynamically get the icon component from lucide-react
          const IconComponent = (Icons as any)[sector.iconName] || Icons.BookOpen;

          return (
            <div 
              key={sector.id} 
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <IconComponent className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">{sector.name}</h3>
              <p className="text-slate-600 text-sm mb-8 flex-grow leading-relaxed">
                {sector.description}
              </p>
              
              <Link
                to={`/programs/${sector.slug}`}
                className="inline-flex items-center justify-center w-full bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-semibold py-3 px-4 rounded-xl transition-colors border border-slate-100 hover:border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white"
              >
                Explore Programs
                <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProgramsSection;
