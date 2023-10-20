
import Dashboard from "./components/Dashboard";
import LandingMain from "./components/LandingMain";
import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ForgotPassword from "./components/ForgotPassword";
import { Toaster } from "react-hot-toast";
import AdminModal from "./components/AdminModal";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  
    return (
        <div className="w-full">
            <Router>
         <Toaster position="top-center"/>
         <AdminModal />
          <Login />
          <Register />
          <ForgotPassword />
          <Routes >
             <Route path="/admin" element={<AdminDashboard />}/> 
        <Route path="/dashboard" element={<Dashboard />}/> 
         <Route path="/" element={<LandingMain />}/>
          </Routes>
          </Router>
         
        </div>
        
    );
}

export default App;
