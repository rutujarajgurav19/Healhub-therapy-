import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Assessment from "./Components/Assessment/Assessment";
import DepressionTherapy from "./Components/Theraphy/Depression";
import TraumaTherapy from "./Components/Theraphy/Truma";
import Contact from "./Components/Contact/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/therapy/depression" element={<DepressionTherapy />} />
        <Route path="/therapy/trauma" element={<TraumaTherapy />} />
      </Routes>
    </Router>
  );
}

export default App;
