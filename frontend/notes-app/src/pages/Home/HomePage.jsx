import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, BookMarked, Share2 } from 'lucide-react';
import ThemeToggle from '../../components/Theme/ThemeToggle';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
            {/* Navigation */}
            <nav className="bg-white dark:bg-slate-800 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-primary dark:text-blue-400">DevNotes</h1>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <Link to="/login" className="px-6 py-2 text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-blue-400 font-medium">
                                Login
                            </Link>
                            <Link to="/signup" className="px-6 py-2 bg-primary hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        Your Development Journey, Documented
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                        DevNotes helps you capture, organize, and share your programming knowledge. From quick code snippets to detailed project documentation.
                    </p>
                    <Link to="/signup" className="px-8 py-3 bg-primary hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg font-medium text-lg transition-colors inline-block">
                        Start Taking Notes
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <FeatureCard
                        icon={<Code2 className="w-6 h-6" />}
                        title="Code Snippets"
                        description="Save and organize your code snippets with syntax highlighting and tags"
                    />
                    <FeatureCard
                        icon={<BookMarked className="w-6 h-6" />}
                        title="Project Notes"
                        description="Document your projects with rich text formatting and attachments"
                    />
                    <FeatureCard
                        icon={<Share2 className="w-6 h-6" />}
                        title="Share Knowledge"
                        description="Collaborate with your team by sharing notes and documentation"
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all">
        <div className="text-primary dark:text-blue-400 mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
            {description}
        </p>
    </div>
);

export default HomePage;