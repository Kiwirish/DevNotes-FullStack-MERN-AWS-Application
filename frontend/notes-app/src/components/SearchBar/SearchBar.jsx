import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-80 flex items-center px-4 bg-slate-100 dark:bg-slate-700 rounded-md">
            <input 
                type="text"
                placeholder="Search DevNotes"
                className="w-full text-xs bg-transparent py-[11px] outline-none
                         text-slate-900 dark:text-white
                         placeholder-slate-500 dark:placeholder-slate-400"
                value={value}
                onChange={onChange}
            />

            {value && (
                <IoMdClose 
                    className="text-xl text-slate-500 dark:text-slate-400 
                             cursor-pointer hover:text-black dark:hover:text-white mr-3" 
                    onClick={onClearSearch} 
                />
            )}
            <FaMagnifyingGlass 
                className="text-slate-400 dark:text-slate-500 
                          cursor-pointer hover:text-black dark:hover:text-white" 
                onClick={handleSearch} 
            />
        </div>
    );
};

export default SearchBar;


