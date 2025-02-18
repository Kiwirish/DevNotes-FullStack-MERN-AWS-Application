import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';


const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {

    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);

    const [error, setError] = useState("");

    // add new note API call
    const addNewNote = async () => {

        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
            });
    
            if (response.data && response.data.note) {
                showToastMessage("DevNote added Successfully");
                getAllNotes();
                onClose();
            }
            
        } catch (error) {
            if (
                error.response &&
                error.response.data && 
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        };
    };
    // edit current note API call 
    const editNote = async () => {
        const noteId = noteData._id; 
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags,
            });
    
            if (response.data && response.data.note) {
                showToastMessage("DevNote Updated Successfully");
                getAllNotes();
                onClose();
            }

        } catch (error) {
            if (
                error.response &&
                error.response.data && 
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        };
    };


    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title");
            return;
        }

        if (!content) {
            setError("Please enter the content");
            return;
        }

        setError("");

        if(type === 'edit'){
            editNote();
        }else{
            addNewNote();
        }


    };

    return (
        <div className="relative">
            <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 
                             bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 
                             transition-colors"
                    onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400 dark:text-slate-300" />
            </button>

            <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                    TITLE
                </label>
                <input
                    type="text"
                    className="text-2xl bg-transparent text-slate-900 dark:text-white outline-none"
                    placeholder="Note title..."
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                    CONTENT
                </label>
                <textarea
                    className="text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white 
                             outline-none p-3 rounded min-h-[200px] resize-none"
                    placeholder="Write your note content..."
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                    TAGS
                </label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button 
                className="w-full mt-5 bg-primary hover:bg-blue-600 dark:bg-blue-600 
                         dark:hover:bg-blue-500 text-white rounded py-3 
                         transition-colors duration-200" 
                onClick={handleAddNote}
            >
                {type === 'edit' ? 'UPDATE' : 'ADD'}
            </button>
        </div>
    );
};

export default AddEditNotes;