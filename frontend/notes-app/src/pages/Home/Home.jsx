import React, { useState, useEffect } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import moment from "moment";
//import ProfileInfo from "../../components/cards/ProfileInfo";
import NoteCard from '../../components/cards/NoteCard.jsx';
import { MdAdd, MdOutlineAlarmAdd } from "react-icons/md";
import AddEditNotes from '../../pages/Home/AddEditNotes.jsx';
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard.jsx';
import AddNotesImg from '/images/add-notes.svg';
import NoResultsImg from '/images/no-results.svg';
import { useTheme } from '../../utils/ThemeContext';

const Home = () => {

    const { isDark } = useTheme();

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,

    });
    
    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false, 
        message: "",
        type: "add",
    });


    const [allNotes, setAllNotes] = useState([]);

    const [userInfo, setUserInfo] = useState(null);

    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({isShown: true, data: noteDetails, type: "edit"})
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true, 
            message,
            type,
        });
    };

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false, 
            message: "",
            
        });
    };

    // get user info api call
    const getUserInfo = async () => {

        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user){
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401){
                localStorage.clear();
                navigate("/login");
            }
        }

    };

    // get all niotes 
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");

            if (response.data && response.data.notes ){
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again")
        }
    };

    // delete note 
    const deleteNote = async (data) => {

        const noteId = data._id; 

        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId);
    
            if (response.data && !response.data.error) {
                showToastMessage("DevNote Deleted Successfully", 'delete');
                getAllNotes();
            }

        } catch (error) {
            if (
                error.response &&
                error.response.data && 
                error.response.data.message
            ) {
                console.log("An unexpected error occurred. Please try again")
            }
        }

    };

    // search for a note 
    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/search-notes", {
                params: {query},
            });

            if (response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateIsPinned = async (noteData) => {

        const noteId = noteData._id;

        try {
            const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
                "isPinned" : !noteData.isPinned,
            });
    
            if (response.data && response.data.note) {
                showToastMessage("DevNote Updated Successfully!");
                getAllNotes();
            }

        } catch (error) {
           console.log(error);
        };
    };
    
    const handleClearSearch = () => {

        setIsSearch(false);
        getAllNotes();

    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
        return () => {};

    }, []);

    return (
        <>
        <Navbar 
            userInfo={userInfo} 
            onSearchNote={onSearchNote} 
            handleClearSearch={handleClearSearch} 
        />
 
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
            <div className="container mx-auto px-6 py-8">
                 {allNotes.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                         {allNotes.map((item) => (
                             <NoteCard 
                                 key={item._id}
                                 title={item.title}
                                 date={item.createdOn}
                                 content={item.content}
                                 tags={item.tags}
                                 isPinned={item.isPinned}
                                 onEdit={() => handleEdit(item)}
                                 onDelete={() => deleteNote(item)}
                                 onPinNote={() => updateIsPinned(item)}
                             />
                         ))}
                     </div>
                 ) : (
                     <EmptyCard 
                         imgSrc={isSearch ? NoResultsImg : AddNotesImg}
                         message={isSearch ? 
                             "Oops! No DevNotes matching your search." : 
                             'Create your first DeveloperNote! Click the "+" button to share projects, code, UI, or ideas.'
                         } 
                     />
                 )}
             </div>
 
             <button 
                 className="w-16 h-16 fixed right-10 bottom-10 flex items-center justify-center rounded-2xl 
                           bg-primary hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 
                           transition-colors"
                 onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null})}
             >
                 <MdAdd className="text-[64px] text-white" />
             </button>
 
             <Modal
                 isOpen={openAddEditModal.isShown}
                 onRequestClose={() => {}}
                 style={{
                     overlay: {
                         backgroundColor: "rgba(0,0,0,0.2)",
                     }
                 }}
                 className={`w-[40%] max-h-3/4 rounded-md mx-auto mt-14 p-5 overflow-scroll
                           ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} 
                           border`}
             >
                 <AddEditNotes
                     type={openAddEditModal.type}
                     noteData={openAddEditModal.data}
                     onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null})}
                     getAllNotes={getAllNotes}
                     showToastMessage={showToastMessage}
                 />
             </Modal>
 
             <Toast 
                 isShown={showToastMsg.isShown}
                 message={showToastMsg.message}
                 type={showToastMsg.type}
                 onClose={handleCloseToast}
             /> 
        </div>
        </>
     )
 }
//     return (
//        <>
//        <Navbar userInfo = {userInfo} onSearchNote = {onSearchNote} handleClearSearch = {handleClearSearch} />

//        <div className = "container mx-auto">
//             {allNotes.length > 0 ? (
//             <div className = "grid grid-cols-3 gap-4 mt-8">
//                 {allNotes.map((item,index) => (
//                     <NoteCard 
//                     key = {item._id}
//                     title ={item.title}
//                     date={item.createdOn}
//                     content={item.content}
//                     tags={item.tags}
//                     isPinned={item.isPinned}
//                     onEdit={() => handleEdit(item)}
//                     onDelete={()=> deleteNote(item)}
//                     onPinNote={()=> updateIsPinned(item)}
//                     />
//                 ))}
                
//             </div>
//             ) : (
//                 <EmptyCard 
//                 imgSrc={isSearch ? NoResultsImg : AddNotesImg}
//                  message={isSearch ? `Oops! No DevNotes matching your search.`: `Create your first DeveloperNote! Click the "+" button 
//                 to share projects, code, UI, or ideas.`} />
//             )}
//        </div>

//         <button className="w-16 h-16 items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
//             onClick={() => {
//                 setOpenAddEditModal({ isShown: true, type: "add", data: null});
//             }}
//         >
//             <MdAdd className="text-[64px] text-white" />
//         </button>

//         <Modal
//             isOpen={openAddEditModal.isShown}
//             onRequestClose={()=>{}}
//             style={{
//                 overlay: {
//                     backgroundColor: "rgba(0,0,0,0.2)",
//                 },
//             }}
//             contentLabel=""
//             className=" w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll
//             "
//         >
// {/* w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll
//  */} 

 
//             <AddEditNotes
//             type={openAddEditModal.type}
//             noteData={openAddEditModal.data}
//                 onClose={() => {
//                     setOpenAddEditModal({ isShown: false, type: "add", data: null});
//                 }}
//                 getAllNotes={getAllNotes}
//                 showToastMessage={showToastMessage}
//             />
//         </Modal>

//         <Toast 
//             isShown={showToastMsg.isShown}
//             message={showToastMsg.message}
//             type={showToastMsg.type}
//             onClose={handleCloseToast}
//         /> 
//        </>
//     )
// }

export default Home