import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './utils/ThemeContext';

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import HomePage from './pages/Home/HomePage'
//      <Route path="/" exact element={<HomePage />} />



const routes = (

  <ThemeProvider>
  <Router>
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />

    </Routes>
  </Router>
</ThemeProvider>

)


const App = () => {

    return <div>{routes}</div>;
    // return (
    //     <div>
    //       <Home />
    //     </div>
    // )
}

export default App
