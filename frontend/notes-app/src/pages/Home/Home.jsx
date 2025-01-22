import React from 'react'
import Navbar from "../../components/Navbar/Navbar";
//import ProfileInfo from "../../components/cards/ProfileInfo";
import NoteCard from '/Users/blakeleahy/Desktop/MERN-Note-App/frontend/notes-app/src/components/cards/NoteCard.jsx';

const Home = () => {
    return (
       <>
       <Navbar />

       <div className = "container mx-auto">
            <NoteCard />
       </div>
       </>
    )
}

export default Home