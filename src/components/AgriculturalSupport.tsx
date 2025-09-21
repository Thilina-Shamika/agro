'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wheat, Tractor, Flower } from 'lucide-react';

interface AgriculturalSupportData {
  '3rd_section_subheading': string;
  '3rd_section_heading': string;
  '3rd_section_button_text': string;
  '3rd_section_button_link': {
    title: string;
    url: string;
    target: string;
  };
  '3rd_section_image': {
    url: string;
    alt: string;
  };
  '3rd_section_columns': Array<{
    acf_fc_layout: string;
    '3rd_section_column_head': string;
    '3rd_section_column_description': string;
    '3rd_section_button_text': string;
    '3rd_section_button_link': {
      title: string;
      url: string;
      target: string;
    };
  }>;
}

interface AgriculturalSupportProps {
  data: AgriculturalSupportData;
}

export default function AgriculturalSupport({ data }: AgriculturalSupportProps) {
  // Icons for each column
  const columnIcons = [
    <Wheat key="wheat" className="w-8 h-8 text-green-600" />,
    <Tractor key="tractor" className="w-8 h-8 text-green-600" />,
    <Flower key="flower" className="w-8 h-8 text-green-600" />
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Subheading */}
            <div>
              <span className="text-gray-700 text-sm font-medium uppercase tracking-wider">
                {data['3rd_section_subheading'] || 'Agricultural Support'}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {data['3rd_section_heading'] || 'Smart Farming for a Changing Planet'}
            </h2>

            {/* CTA Button */}
            <div>
              <Link
                href={data['3rd_section_button_link']?.url || '#'}
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                {data['3rd_section_button_text'] || 'Read More'}
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={data['3rd_section_image']?.url || 'http://agro-rajaguru.local/wp-content/uploads/2025/09/h1-3.webp'}
                alt={data['3rd_section_image']?.alt || 'Agricultural Support'}
                width={1200}
                height={808}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Three Columns Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {(data['3rd_section_columns'] && data['3rd_section_columns'].length > 0 ? data['3rd_section_columns'] : [
            {
              '3rd_section_column_head': 'Sustainability First',
              '3rd_section_column_description': 'We prioritize eco-friendly practices that protect natural resources and ensure long-term agricultural productivity for future generations.',
              '3rd_section_button_text': 'Read More',
              '3rd_section_button_link': { title: '', url: '#', target: '' },
            },
            {
              '3rd_section_column_head': 'Farmer Approach',
              '3rd_section_column_description': 'Every solution we offer is designed to support farmers — helping them increase yields, reduce risk, and grow with confidence.',
              '3rd_section_button_text': 'Read More',
              '3rd_section_button_link': { title: '', url: '#', target: '' },
            },
            {
              '3rd_section_column_head': 'Innovation That Works',
              '3rd_section_column_description': 'We embrace smart technologies and proven methods that bring efficiency, precision, and progress to modern farming.',
              '3rd_section_button_text': 'Read More',
              '3rd_section_button_link': { title: '', url: '#', target: '' },
            },
          ]).map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">
                {columnIcons[index]}
              </div>

              {/* Heading */}
              <h3 className="text-xl font-bold text-gray-900">
                {column['3rd_section_column_head'] || `Column ${index + 1}`}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {column['3rd_section_column_description'] || 'Description placeholder'}
              </p>

              {/* Button */}
              <div>
                <Link
                  href={column['3rd_section_button_link']?.url || '#'}
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                >
                  {column['3rd_section_button_text'] || 'Read More'}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
