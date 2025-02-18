import React from 'react'
import { MdOutlinePushPin } from "react-icons/md"
import { MdCreate, MdDelete } from "react-icons/md"
import { motion } from "framer-motion";
import moment from "moment";
 


const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {

    return (
        <div className="border dark:border-slate-700 rounded p-4 bg-white dark:bg-slate-800 
                      hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium text-slate-900 dark:text-white">{title}</h6>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {moment(date).format('Do MMM YYYY')}
                    </span>
                </div>
                <MdOutlinePushPin 
                    className={`icon-btn ${
                        isPinned 
                            ? 'text-primary dark:text-blue-400' 
                            : 'text-slate-300 dark:text-slate-600'
                    }`} 
                    onClick={onPinNote}
                />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                {content?.slice(0,60)}
            </p>

            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                    {tags.map((item) => `#${item} `)}
                </div>
            
                <div className="flex items-center gap-2">
                    <MdCreate
                        className="icon-btn hover:text-green-600 dark:text-slate-400 
                                 dark:hover:text-green-400"
                        onClick={onEdit}
                    />
                    <MdDelete
                        className="icon-btn hover:text-red-500 dark:text-slate-400 
                                 dark:hover:text-red-400"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default NoteCard
