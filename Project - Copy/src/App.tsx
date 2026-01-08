import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Protected from "./components/Protected"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Protected><Navbar/><Dashboard /></Protected>} />
      <Route path="/login" element={<><Navbar/><Login /></>} />
      <Route path="/signup" element={<><Navbar/><SignUp /></>} />
      <Route path="/*" element={<Protected><Navbar/><Dashboard /></Protected>}/>
    </Routes>
  )
}

export default App
