'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroData {
  '1st_section_subheading': string;
  '1st_section_heading': string;
  '1st_section_description': string;
  '1st_section_button_text': string;
  '1st_section_button_link': {
    title: string;
    url: string;
    target: string;
  };
  sliders: Array<{
    acf_fc_layout: string;
    slider_carousal: {
      url: string;
      alt: string;
    };
  }>;
}

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Debug: Check if we have sliders data
  console.log('Hero data received:', data);
  console.log('Sliders array:', data.sliders);
  console.log('Sliders length:', data.sliders?.length);
  
  // Test if we can load a simple image
  if (data.sliders && data.sliders.length > 0) {
    console.log('First slider URL:', data.sliders[0].slider_carousal.url);
  }

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || data.sliders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.sliders.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, data.sliders.length]);


  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {data.sliders && data.sliders.length > 0 ? data.sliders.map((slide, index) => {
          console.log(`Rendering slide ${index}:`, slide);
          console.log(`Image URL:`, slide.slider_carousal.url);
          return (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Ken Burns Effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, -20, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Image
                src={slide.slider_carousal.url}
                alt={slide.slider_carousal.alt || 'Hero Background'}
                fill
                className="object-cover"
                priority={index === 0}
                onLoad={() => console.log(`Image ${index} loaded successfully`)}
                onError={(e) => console.error(`Image ${index} failed to load:`, e)}
              />
              {/* Debug indicator */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs">
                Slide {index + 1}
              </div>
            </motion.div>
          </motion.div>
          );
        }) : (
          // Fallback when no sliders
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
              No slider images available
            </div>
          </div>
        )}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-yellow-400 font-medium mb-4 tracking-wide"
          >
            {data['1st_section_subheading']}
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {data['1st_section_heading']}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {data['1st_section_description']}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link
              href={data['1st_section_button_link'].url}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <div className="w-2 h-2 bg-green-900 rounded-full"></div>
              {data['1st_section_button_text']}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Slider Navigation Controls */}
      {data.sliders && data.sliders.length > 1 && (
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-3">
          {data.sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
