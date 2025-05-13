"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import image1 from "/images/logo/Logo-Main.svg";
import image2 from "/images/logo/Logo-Main.svg";
import image3 from "/images/logo/Logo-Main.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "./videos/SliderVideo1.mp4" },
  { src: "./videos/SliderVideo2.mp4" },
  { src: "./videos/SliderVideo3.mp4" },
];

const headings = [
  { h1: "Empowering Applications", description: "Developing Innovative and User-Friendly Applications That Empower Your Business and Your Users." },
  { h1: "Captivating Websites", description: "Designing and Building Visually Stunning and Highly Functional Websites That Captivate Your Audience." },
  { h1: "Development That Delivers", description: "Providing Expert Development Services That Deliver Scalable, Reliable, and High-Quality Digital Solutions." },
];

export default function Slider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 500); // Match the duration of the transition
  };

  const nextSlide = (): void => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 500); // Match the duration of the transition
  };


  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isHovered, currentIndex]); // Ensure consistent dependencies


  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };
  return (
    <div className="relative mx-auto mt-0 w-full">
      <div className={`group relative h-[460px] transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        } `}>
         {/* Video Background */}
      <div
        className="absolute top-0 left-0 w-full h-full"
      >
          <video
            src={images[currentIndex].src}
            // alt={`Slider Image ${currentIndex + 1}`}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 h-full w-full object-cover"
            style={{opacity: 0.7}}
          />
        </div>
        <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50"></div>

        {/* Text Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold">
            {headings[currentIndex].h1}
          </h1>
          <p className="text-lg">{headings[currentIndex].description}</p>
        </div>
      </div>
       <button
        className="group z-20 absolute left-0 top-1/2 mx-1 -mt-[14px] h-[459px] -translate-y-1/2 transform bg-transparent p-2 text-white hover:bg-[#1a222f]"
        onClick={prevSlide}  onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0.6 }}
      >
        <ChevronLeft className="text-gray-400 group-hover:text-white" />
      </button>
      <button
        className="group z-20 absolute right-0 top-1/2 mx-1 -mt-[14px] h-[459px] -translate-y-1/2 transform bg-transparent p-2 text-white hover:bg-[#1a222f]"
        onClick={nextSlide}  onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0.6 }}
      >
        <ChevronRight className="text-gray-400 group-hover:text-white" />
      </button> 
       <div className="mt-6 flex justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-1 w-10 ${
              index === currentIndex
                ? "rounded-xl bg-primary"
                : "rounded-xl bg-gray-300"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div> 
    </div>
  );
}
