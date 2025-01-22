import React, { useState } from 'react';
import ProfileInfo from '/Users/blakeleahy/Desktop/MERN-Note-App/frontend/notes-app/src/components/cards/ProfileInfo.jsx';
import SearchBar from '/Users/blakeleahy/Desktop/MERN-Note-App/frontend/notes-app/src/components/SearchBar/SearchBar.jsx';
import { useNavigate } from "react-router-dom";




const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate;

    const onLogout = () => {
        navigate("/login");
    }

    const handleSearch = () => {};

    const onClearSearch = () => {
        setSearchQuery("");
    }

    

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Notes</h2>
            <SearchBar 
                value={searchQuery}
                onChange={({ target }) => {
                    setSearchQuery(target.value);
                }}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}

            />

            <ProfileInfo onLogout={onLogout} />
            
        </div>
    );
};

export default Navbar;