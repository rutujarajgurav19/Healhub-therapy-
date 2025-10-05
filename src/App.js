import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Assessment from "./Components/Assessment/Assessment";
import DepressionTherapy from "./Components/Theraphy/Depression";
import TraumaTherapy from "./Components/Theraphy/Truma";
import Parenting from "./Components/Theraphy/Parenting";
import RelationshipCounseling from "./Components/Theraphy/RelationshipCounseling";
import Addication from "./Components/Theraphy/Addication";
import Resources from "./Components/Resources/Resources";
import Contact from "./Components/Contact/Contact";
import Therapyinfo from "./Components/Therapistinfo/Therapistinfo";
import Booking from "./Components/Booking/Booking";
import ProfilePage from "./Components/Profile/ProfilePage";
import ForgotPassword from "./Components/Profile/ForgotPassword";
import Feedback from "./Components/Feedback/Feedback";

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
          <Route path="/therapy/parenting" element={<Parenting />} />
          <Route path="/therapy/relationship" element={<RelationshipCounseling />} />
          <Route path="/therapy/addiction" element={<Addication />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Removed redundant profile sub-routes */}
          <Route path="/profile/current" element={<ProfilePage />} />
          <Route path="/profile/past" element={<ProfilePage />} />
          <Route path="/profile/therapists" element={<ProfilePage />} />
          <Route path="/profile/assessment" element={<ProfilePage />} />
          <Route path="/profile/payments" element={<ProfilePage />} />
          <Route path="/profile/settings" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
