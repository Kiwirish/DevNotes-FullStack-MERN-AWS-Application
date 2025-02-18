import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';


const SignUp = () => {
    
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name ){
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email) ){
            setError("Please enter a valid email");
            return;
        }

        if (!password ){
            setError("Please enter a password");
            return;
        }

        setError("");

        // SignUp API Call !! 
        try { 
            // successful login response 
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email, 
                password: password,
            });

            if (response.data && response.data.error){
                setError(response.data.message);
                return
            }

            if (response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken)
                navigate("/dashboard")
            }

        } catch (error) {
            // handle login error 
            if (error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);

            }else{
                setError("An unexpected error occurred. Please try again")
            }
        }

    };


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
            <Navbar />
            <div className="flex items-center justify-center pt-20">
                <div className="w-96 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 px-7 py-10 shadow-sm">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl mb-7 text-slate-900 dark:text-white font-medium">Sign Up</h4>

                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="w-full text-sm bg-transparent border px-5 py-3 rounded mb-3
                                     text-slate-900 dark:text-white
                                     border-slate-200 dark:border-slate-600
                                     focus:border-primary dark:focus:border-blue-400
                                     outline-none transition-colors
                                     placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input 
                            type="text" 
                            placeholder="Email" 
                            className="w-full text-sm bg-transparent border px-5 py-3 rounded mb-3
                                     text-slate-900 dark:text-white
                                     border-slate-200 dark:border-slate-600
                                     focus:border-primary dark:focus:border-blue-400
                                     outline-none transition-colors
                                     placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                        <button type="submit" 
                                className="w-full bg-primary hover:bg-blue-600 dark:bg-blue-600 
                                         dark:hover:bg-blue-500 text-white rounded py-3 
                                         transition-colors duration-200">
                            Create Account
                        </button>

                        <p className="text-sm text-center mt-4 text-slate-600 dark:text-slate-400">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-primary dark:text-blue-400 hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp