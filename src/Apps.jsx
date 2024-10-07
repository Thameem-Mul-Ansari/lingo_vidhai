import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Navbar from "./components/Navbar";          // Corrected path for Navbar
import Hero from "./components/Hero";              // Corrected path for Hero
import ListItems from "./components/ListItems";    // Corrected path for ListItems
import About from "./components/About";            // Corrected path for About
import ServiceCards from "./components/ServiceCards";  // Corrected path for ServiceCards
import Contact from "./components/Contact";        // Corrected path for Contact
import VideoSection from "./components/VideoSection"; // Corrected path for VideoSection
import { SignIn, SignUp } from "./pages/auth";

function Apps() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div id="hero" className="bg-[#F2F7FF]"> 
            <Navbar />                          
            <Hero />                            
            <ListItems />                       
            <div id="about">                    
              <About />
            </div>
            <div id="service-cards" className="bg-[#F2F7FF]"> 
              <ServiceCards />
            </div>
            <div id="video-section">            
              <VideoSection />
            </div>
            <div id="contact">                  
              <Contact />
            </div>
          </div>
        } 
      />
      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/sign-in/" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />

    </Routes>
  );
}

export default Apps;