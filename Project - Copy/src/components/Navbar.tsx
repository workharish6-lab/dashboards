import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = () => {
    const checkLoggedIn = localStorage.getItem('login')
    const [loggedIn] = useState(checkLoggedIn)
  return (
    <main>
        <nav className="flex justify-between items-center p-4 bg-gray-300 text-gray-600">
            <div className="text-xl font-bold"><img src={Logo} alt="Logo" /></div>
            <div className="flex space-x-4 text-lg font-semibold">
                {
                loggedIn?
                    <>
                        <Link to="/" className="hover:text-gray-500 px-2 py-1 rounded bg-gray-400 duration-300 text-gray-300">Home</Link>
                        <Link to="/login" className="hover:text-gray-500 px-2 py-1 rounded bg-red-500 text-gray-300 duration-300"
                            onClick={()=>{
                                localStorage.removeItem('login')
                                localStorage.setItem('loggedIn', 'false')
                                localStorage.removeItem('fullName')
                                return <Navigate to="/login"/>
                            }}
                        >Log Out</Link>
                        
                    </>
                :
                    <Link to="/login" className="hover:text-gray-300">Login</Link>
                }
            </div>
        </nav>
    </main>
  )
}

export default Navbar;