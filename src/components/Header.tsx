'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationItem {
  acf_fc_layout: string;
  menu_item_name: string;
  menu_item_link: {
    title: string;
    url: string;
    target: string;
  };
}

interface HeaderData {
  logo: {
    url: string;
    alt: string;
  };
  navigation: NavigationItem[];
  button_text: string;
  button_link: {
    title: string;
    url: string;
    target: string;
  };
}

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4">
      {/* Glassmorphism Header Container */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[95vw] mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl"
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-[150px] h-16">
                <Image
                  src={data.logo.url}
                  alt={data.logo.alt || 'Logo'}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {data.navigation.map((item, index) => (
              <Link
                key={index}
                href={item.menu_item_link.url}
                className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
              >
                {item.menu_item_name}
              </Link>
            ))}
          </nav>

          {/* Right Section - Button */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <Link
              href={data.button_link.url}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              {data.button_text}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-yellow-300 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/20"
            >
              <div className="px-6 py-4 space-y-4">
                {data.navigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.menu_item_link.url}
                    className="block text-white hover:text-yellow-300 transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.menu_item_name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
