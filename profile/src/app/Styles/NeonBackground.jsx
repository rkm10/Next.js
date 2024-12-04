'use client'; 
import React, { useEffect, useState } from "react";

const NeonBackground = () => {
  const [isMouseMoveActive, setIsMouseMoveActive] = useState(window.innerWidth > 767);

  // Function to handle mouse movement
  const handleMouseMove = (e) => {
    if (!isMouseMoveActive) return;

    const { clientX: x, clientY: y } = e;
    const { innerWidth: width, innerHeight: height } = window;

    // Calculate percentage positions
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    // Create dynamic gradient
    const gradient = `radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      rgba(51, 68, 119, 0.2) 5%, 
      rgba(17, 47, 102, 0.3) 15%, 
      rgba(0, 0, 0, 0) 25%)`;

    // Apply gradient as background
    document.body.style.background = gradient;
  };

  // Function to handle viewport width change
  const handleResize = () => {
    setIsMouseMoveActive(window.innerWidth > 767);
  };

  // Set up event listeners
  useEffect(() => {
    // Add mousemove listener if active
    if (isMouseMoveActive) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
    }

    // Clean up on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseMoveActive]);

  // Listen for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return null; // No UI needed, background is applied directly to the body
};

export default NeonBackground;
