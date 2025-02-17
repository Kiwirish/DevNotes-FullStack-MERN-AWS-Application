import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LightBulbIcon, PencilIcon, ShareIcon } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">DevNotes</h1>
            <div className="space-x-4">
              <Link to="/login" className="px-6 py-2 text-primary hover:text-blue-600 font-medium">
                Login
              </Link>
              <Link to="/signup" className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Capture Your Code Ideas with DevNotes
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              A modern note-taking platform designed specifically for developers. Store snippets, document projects, and share your knowledge.
            </p>
            <Link to="/signup" className="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium text-lg transition-colors inline-block">
              Get Started Free
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 lg:mt-0"
          >
            <FeatureCard 
              icon={<LightBulbIcon className="w-8 h-8" />}
              title="Capture Ideas"
              description="Quick and easy note-taking for your development journey"
            />
            <FeatureCard 
              icon={<PencilIcon className="w-8 h-8" />}
              title="Code Snippets"
              description="Store and organize your code snippets efficiently"
            />
            <FeatureCard 
              icon={<ShareIcon className="w-8 h-8" />}
              title="Share Knowledge"
              description="Collaborate and share notes with your team"
            />
            <FeatureCard 
              icon={<LightBulbIcon className="w-8 h-8" />}
              title="Stay Organized"
              description="Tag and categorize your notes for easy access"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

export default HomePage;