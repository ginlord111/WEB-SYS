
import Dashboard from "./components/Dashboard";
import LandingMain from "./components/LandingMain";
import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  
    return (
        <div className="w-full">
            <Router>
          <Login />
          <Register />
          <Routes >
        <Route path="/dashboard" element={<Dashboard />}/> 
         <Route path="/" element={<LandingMain />}/>
          </Routes>
          </Router>
        </div>
        
    );
}

export default App;
