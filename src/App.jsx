import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FestiveHighlights from './components/FestiveHighlights';
import PersonalizedWish from './components/PersonalizedWish';
import QuoteSection from './components/QuoteSection';
import Footer from './components/Footer';
import LightDiyaWidget from './components/LightDiyaWidget';

export const App = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-[#070A14] text-[#FFF7E6] selection:bg-[#FFD700] selection:text-[#070A14] relative">
      {/* Fixed Navigation Bar */}
      <Navbar soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* Main Festive Content */}
      <main>
        {/* 1. Hero Section with Interactive Fireworks & "Light Up the Sky" */}
        <HeroSection soundEnabled={soundEnabled} />

        {/* 2. Exactly One Section: The 4 Festive Cards in Single Row (Mithai, Gifts, Patakhe, Rangoli/Diyas) */}
        <FestiveHighlights soundEnabled={soundEnabled} />

        {/* 3. Interactive Personalized Wishes Generator ("All of you" & "Shalu yadav") */}
        <PersonalizedWish soundEnabled={soundEnabled} />

        {/* 4. Special Festive Quote Section */}
        <QuoteSection />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Floating Interactive Diya Lighting Widget */}
      <LightDiyaWidget soundEnabled={soundEnabled} />
    </div>
  );
};

export default App;
