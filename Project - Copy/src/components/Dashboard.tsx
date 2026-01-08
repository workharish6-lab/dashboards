import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch("http://localhost:3200/users", {
        credentials: "include" 
      });

      const data = await response.json();

      if (data.success) {
        setUser({
          fullName: data.result.fullName,
          email: data.result.email
        });
      }
    };

    getUserData();
  }, []);

  return (
    <main >
      <div className="w-full flex justify-center ">
        <div className="bg-white p-8 rounded shadow-md w-100 my-5">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;