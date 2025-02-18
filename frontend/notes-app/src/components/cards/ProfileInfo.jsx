import React from 'react';
import { getInitials } from '../../utils/helper';


const ProfileInfo = ({ userInfo, onLogout }) => {
    return (
        userInfo && (
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full 
                             text-slate-900 dark:text-white font-medium 
                             bg-slate-100 dark:bg-slate-700">
                    {getInitials(userInfo.fullName)}
                </div>

                <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {userInfo.fullName}
                    </p>
                    <button 
                        className="text-sm text-slate-700 dark:text-slate-300 
                                 hover:text-primary dark:hover:text-blue-400 underline"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    );
};

export default ProfileInfo