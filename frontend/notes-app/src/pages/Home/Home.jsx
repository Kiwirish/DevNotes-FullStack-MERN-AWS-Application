import React from 'react'
import Navbar from "../../components/Navbar/Navbar";
//import ProfileInfo from "../../components/cards/ProfileInfo";
import NoteCard from '/Users/blakeleahy/Desktop/MERN-Note-App/frontend/notes-app/src/components/cards/NoteCard.jsx';
import { MdAdd } from "react-icons/md"
const Home = () => {
    return (
       <>
       <Navbar />

       <div className = "container mx-auto">
            <div className = "grid grid-cols-3 gap-4 mt-8">
                <NoteCard title ="Meeting on 7th april" 
                date="3rd april 2024"
                content="Meeting on 7th april" 
                tags="#meeting"
                isPinned={true}
                onEdit={()=>{}}
                onDelete={()=>{}}
                onPinNote={()=>{}}
                />
            </div>
       </div>

        <button className="w-16 h-16 items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {}}>
            <MdAdd className="text-[32px] text-white" />
        </button>


       </>
    )
}

export default Home