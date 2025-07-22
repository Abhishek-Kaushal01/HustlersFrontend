import React from "react";
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/animate.css";
import "./css/animate.min.css";
import "./App.css";
import Header from "./components/common/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  Home,
  Booking,
  AboutUs,
  Contact,
  PageNotFound,
  Room,
  Services,
  Team,
  Testimonial,
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ChangePasswordPage,
} from "./pages/index";
import Footer from "./components/common/Footer";
import RoomDetailPage from "./pages/RoomDetailPage";
import LuxuryRoomsPage from "./pages/LuxuryRoomsPage";
export default function App() {
  return (
    <>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/team" element={<Team />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rooms/:roomId" element={<RoomDetailPage />} />
            <Route path="/luxury-rooms" element={<LuxuryRoomsPage />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/services" element={<Services />} />
            {/* Auth routes */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}
