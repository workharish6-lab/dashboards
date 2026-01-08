import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<{fullName: string; email: string; password: string} | null>({fullName: "", email: "", password: ""});
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3200/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if(data.success){
            localStorage.setItem("login", userData?.email || "" );
            localStorage.setItem("fullName", data.user.fullName);
            localStorage.setItem("login", data.user.email);

            document.cookie = "token="+data.token
            navigate("/");
            
        }else{
            alert("Login failed. Please try again.");   }
    }
    useEffect(() => {
        const loggedInUser = localStorage.getItem("login");
        if (loggedInUser) {
            navigate("/");
        }
    });
  return (
    <main>
        <div className="bg-gray-200 h-screen w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" name="email" onChange={(e)=>setUserData({...(userData || {fullName: "", email: "", password: ""}), email:e.target.value})} id="email" className="w-full px-3 py-2 border rounded" />
                        <p className="text-red-500"></p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" name="password" onChange={(e)=>setUserData({...(userData || {fullName: "", email: "", password: ""}), password:e.target.value})} id="password" className="w-full px-3 py-2 border rounded" />
                        <p className="text-red-500"></p>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleLogin}>Login</button>
                </form>
                <Link to="/signup" className="block mt-4 text-center text-blue-500 hover:text-blue-700">Don't have an account? Sign up</Link>
            </div>
        </div>
    </main>
    
  )
}

export default Login