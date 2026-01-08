import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
const SignUp = () => {
    const [error, setError] = useState<string | null>(null);
    const [passError, setPassError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [userData, setUserData] = useState<{fullName: string; email: string; password: string} | null>({fullName: "", email: "", password: ""});
    const navigate = useNavigate();
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const passRegex = /^\d{6}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fullName || !email || !password) {
            setError("All fields are required.");
            return;
        }else if(!passRegex.test(password)){
            setPassError("Password must be at least 6 characters long.");
            return;
        }else if(!emailRegex.test(email)){
            setEmailError("Please enter a valid email address.");
            return;
        }else{
            setError(null);
            setPassError(null);
            setEmailError(null);
            const response = await fetch("http://localhost:3200/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, email, password })
            });
            const data = await response.json();
            if (data.success) {
                alert("Sign up successful! Please log in.");
                form.reset();
                navigate("/login");
            } else {
                setError(data.message || "Sign up failed. Please try again.");
            }   
        }
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
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input type="text" name="fullName" onChange={(e)=>setUserData({...(userData || {fullName: "", email: "", password: ""}), fullName:e.target.value})} id="name" className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" name="email" onChange={(e)=>setUserData({...(userData || {fullName: "", email: "", password: ""}), email:e.target.value})} id="email" className="w-full px-3 py-2 border rounded" />
                        <p className="text-red-500">{emailError}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" name="password" onChange={(e)=>setUserData({...(userData || {fullName: "", email: "", password: ""}), password:e.target.value})} id="password" className="w-full px-3 py-2 border rounded" />
                        <p className="text-red-500">{passError}</p>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={()=> console.log(userData)}>Sign Up</button>
                    <p className="text-center text-red-500">{error}</p>
                </form>
                <Link to="/login" className="block mt-4 text-center text-blue-500 hover:text-blue-700">Already have an account? Login</Link>
            </div>
        </div>
    </main>
  )
}

export default SignUp

