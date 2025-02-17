import React, { useState } from 'react';
import ProfileInfo from '../cards/ProfileInfo.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useNavigate, useLocation } from "react-router-dom";




import ThemeToggle from '../Theme/ThemeToggle';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    
    const isDashboard = location.pathname === '/dashboard';

    const onLogout = () => {
        localStorage.clear(); 
        navigate("/");
    };

    const handleSearch = () => {
        if(searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    return (
        <div className="bg-white dark:bg-slate-800 flex items-center justify-between px-6 py-2 shadow-sm">
            <h2 className="text-xl font-medium text-slate-900 dark:text-white">DevNotes</h2>
            
            <div className="flex items-center gap-4">
                {/* Only show SearchBar on dashboard */}
                {isDashboard && (
                    <SearchBar 
                        value={searchQuery}
                        onChange={({ target }) => setSearchQuery(target.value)}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />
                )}

                {/* Always show ThemeToggle */}
                <ThemeToggle />
                
                {/* Show ProfileInfo when userInfo exists */}
                {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
            </div>
        </div>
    );
};

export default Navbar;