import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Assessment from "./Components/Assessment/Assessment";
import DepressionTherapy from "./Components/Theraphy/Depression";
import TraumaTherapy from "./Components/Theraphy/Truma";
import Contact from "./Components/Contact/Contact";
import Therapyinfo from "./Components/Therapistinfo/Therapistinfo";
import Booking from "./Components/Booking/Booking";
import ProfilePage from "./Components/Profile/ProfilePage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/therapist" element={<Therapyinfo />} />
          <Route path="/therapistinfo" element={<Therapyinfo />} />
          <Route path="/therapy/depression" element={<DepressionTherapy />} />
          <Route path="/therapy/trauma" element={<TraumaTherapy />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Removed redundant profile sub-routes */}
          <Route path="/profile/current" element={<ProfilePage />} />
          <Route path="/profile/past" element={<ProfilePage />} />
          <Route path="/profile/therapists" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ProfilePage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
