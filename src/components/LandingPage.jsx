import React from 'react';
import { Link } from 'react-router-dom';
import videoFile from '../assets/landing.mp4'; // Adjust the path to your actual video file
import AdminDashboard from './updated/My-duka-e-commerce/frontend/src/components/AdminDashboard';

const LandingPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoFile} // Reference to your video file from assets
        autoPlay
        loop
        muted
      />

      {/* Overlay and Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center space-x-2">
          <h1 className="text-white text-4xl font-bold">MY DUKA</h1>
          <img
            src="https://png.pngtree.com/png-clipart/20211116/original/pngtree-green-store-png-image_6942085.png" // URL of the icon image
            alt="Store Icon"
            className="w-10 h-10" // Tailwind CSS to set the size of the icon
          />
        </div>

        {/* Main text content */}
        <div className= "text-center text-white max-w-3xl">
          <h2 className= "text-8xl font-bold">Your One-Stop Shop</h2>
          <h2 className= "text-7xl font-bold mt-3">for</h2>
          <h2 className= "text-8xl font-bold mt-3">Everything You Need</h2>
        </div>

        {/* Get Started Button */}
        <div className="mt-8">
          <Link to="/auth">
            <button className= "bg-green-500 text-white font-semibold px-6 py-5 rounded-full hover:bg-green-900 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
