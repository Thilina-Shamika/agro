'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AboutData {
  '2nd_section_subheading': string;
  '2nd_section_heading': string;
  '2nd_section_description': string;
  '2nd_section_button_text': string;
  '2nd_section_button_link': {
    title: string;
    url: string;
    target: string;
  };
  right_to_left_rolling_text: string;
  image_boxes: Array<{
    acf_fc_layout: string;
    image_cards: {
      url: string;
      alt: string;
    };
  }>;
}

interface AboutProps {
  data: AboutData;
}

export default function About({ data }: AboutProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Debug: Check what data we're receiving
  console.log('About component data:', data);
  console.log('About data keys:', Object.keys(data || {}));
  console.log('About heading:', data?.['2nd_section_heading']);
  console.log('About image boxes:', data?.image_boxes);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Always show content for now to debug
  console.log('About component: Rendering with data:', data);
  console.log('Data exists:', !!data);
  console.log('Heading exists:', !!data?.['2nd_section_heading']);
  console.log('Heading value:', data?.['2nd_section_heading']);
  console.log('Image boxes:', data?.image_boxes);
  console.log('Image boxes length:', data?.image_boxes?.length);

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#8b9271', paddingTop: '50px', paddingBottom: '50px' }}>
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Subheading and Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Subheading */}
            <div className="inline-block">
              <span className="text-white text-sm font-medium">
                {data['2nd_section_subheading'] || 'About company'}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {data['2nd_section_heading'] || 'Our Mission: Better Farming for a Better Future'}
            </h2>
          </motion.div>

          {/* Right Column - Description and Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Description */}
            <p className="text-sm text-white leading-relaxed">
              {data['2nd_section_description'] || 'With deep roots in tradition and a focus on innovation, our company provides high-quality agricultural products and solutions that support farmers, enhance food security, and promote sustainable practices. From soil to harvest, we offer expertise in crop production, agri-technology, supply chain logistics, and eco-conscious farming.'}
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href={data['2nd_section_button_link'].url}
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <div className="w-2 h-2 bg-green-900 rounded-full"></div>
                {data['2nd_section_button_text'] || 'Get in Touch'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Text Section */}
      <div className="relative pb-6 overflow-hidden">
        <div 
          className="text-9xl md:text-[12rem] lg:text-[13rem] font-bold whitespace-nowrap"
          style={{
            animation: 'scrollLeft 20s linear infinite',
            color: '#6e744f'
          }}
        >
          {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'} {data.right_to_left_rolling_text || 'From Seed to Harvest.'}
        </div>
        <style jsx>{`
          @keyframes scrollLeft {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>

      {/* Image Gallery Section - Below Rolling Text */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {(data.image_boxes && data.image_boxes.length > 0 ? data.image_boxes : [
            {
              image_cards: {
                url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/a48cb57d-1d88-4d95-866e-5780c88f106b.jpeg',
                alt: 'Agricultural image 1'
              }
            },
            {
              image_cards: {
                url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/d557bd38-dbd9-4cf3-9d43-95a666928462.jpeg',
                alt: 'Agricultural image 2'
              }
            },
            {
              image_cards: {
                url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/2b1861cd-fdbb-481b-925d-c06b2d3f3e22.jpeg',
                alt: 'Agricultural image 3'
              }
            },
            {
              image_cards: {
                url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/f57403af-a670-479d-8d3a-213eb02ef7b7.jpeg',
                alt: 'Agricultural image 4'
              }
            }
          ]).map((box, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
              className="relative aspect-square rounded-full overflow-hidden shadow-lg cursor-pointer"
              style={{
                transform: `
                  translate(${scrollPosition * 0.02}px, ${scrollPosition * 0.01}px)
                  translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)
                  rotateX(${mousePosition.y * 10}deg)
                  rotateY(${mousePosition.x * 10}deg)
                  perspective(1000px)
                `,
                transformStyle: 'preserve-3d',
              }}
            >
              <Image
                src={box.image_cards.url}
                alt={box.image_cards.alt || `Agricultural image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>


      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-green-900 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </section>
  );
}
