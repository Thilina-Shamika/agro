'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SolutionsData {
  '4th_section_subheading': string;
  '4th_section_heading': string;
  '4th_section_cards': Array<{
    acf_fc_layout: string;
    cards_number: string;
    card_heading: string;
    card_link: {
      title: string;
      url: string;
      target: string;
    };
    card_image: {
      url: string;
      alt: string;
    };
  }>;
}

interface SolutionsProps {
  data: SolutionsData;
}

export default function Solutions({ data }: SolutionsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <style jsx>{`
        .solutions-heading {
          font-family: 'Raleway', sans-serif !important;
          font-weight: 700 !important;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: 2 Columns - Subheading and Heading on Left */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-12 items-start mb-16"
        >
          {/* Left Column - Subheading and Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 lg:col-span-8"
          >
            {/* Subheading */}
            <div>
              <span className="text-gray-700 text-sm font-medium uppercase tracking-wider">
                {data['4th_section_subheading'] || 'Farm Solutions'}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight solutions-heading">
              {data['4th_section_heading'] || 'What Our an Agricultural Company Offers'}
            </h2>
          </motion.div>

          {/* Right Column - Empty for now, can be used for additional content later */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden lg:block lg:col-span-4"
          >
            {/* This column is empty for now, can be used for additional content */}
          </motion.div>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(data['4th_section_cards'] && data['4th_section_cards'].length > 0 ? data['4th_section_cards'] : [
            {
              acf_fc_layout: '4th_section_card_list',
              cards_number: '01',
              card_heading: 'Seeds & Planting Material',
              card_link: { title: '', url: '#', target: '' },
              card_image: {
                url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/VerdaAgro-Agriculture-Companies-Organic-Farms-WordPress-Theme-Preview-ThemeForest-09-22-2025_04_38_AM.png',
                alt: 'Seeds & Planting Material',
              },
            },
            {
              acf_fc_layout: '4th_section_card_list',
              cards_number: '02',
              card_heading: 'Fertilizers & Soil Solutions',
              card_link: { title: '', url: '#', target: '' },
              card_image: {
                url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/fe1b4715-3212-4ee7-a9d2-0b717c8d5309.png',
                alt: 'Fertilizers & Soil Solutions',
              },
            },
            {
              acf_fc_layout: '4th_section_card_list',
              cards_number: '03',
              card_heading: 'Crop Protection Products',
              card_link: { title: '', url: '#', target: '' },
              card_image: {
                url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/VerdaAgro-Agriculture-Companies-Organic-Farms-WordPress-Theme-Preview-ThemeForest-09-22-2025_04_39_AM.png',
                alt: 'Crop Protection Products',
              },
            },
          ]).map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
            >
              {/* Card Content */}
              <div className="p-8 flex-1 flex flex-col">
                {/* Card Number */}
                <p className="text-6xl font-bold text-gray-300 mb-4">
                  {card.cards_number || `0${index + 1}`}
                </p>

                {/* Card Heading */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {card.card_heading || 'Solution Title'}
                </h3>

                {/* Card Link */}
                <Link
                  href={card.card_link?.url || '#'}
                  className="inline-flex items-center text-gray-900 hover:text-green-600 font-medium transition-colors duration-200 mt-auto"
                >
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>

              {/* Card Image - Positioned at bottom */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={card.card_image?.url || 'http://agro-rajaguru.local/wp-content/uploads/2025/09/img_1.jpg'}
                  alt={card.card_image?.alt || card.card_heading || 'Solution Image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
