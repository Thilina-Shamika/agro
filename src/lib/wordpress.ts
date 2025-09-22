// WordPress API utilities
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://agro-rajaguru.local/wp-json/wp/v2/';
const WORDPRESS_ORIGIN = (() => {
  try {
    return new URL(WORDPRESS_API_URL).origin;
  } catch {
    return 'http://agro-rajaguru.local';
  }
})();

function toNextInternalLink(url: string | undefined | null): string {
  if (!url || url === '#') return '#';
  try {
    const parsed = new URL(url);
    // If this links to our WP site, convert to pathname for Next internal routing
    if (parsed.origin === WORDPRESS_ORIGIN) {
      // Treat home links as '/'
      return parsed.pathname === '/' ? '/' : parsed.pathname;
    }
    // External link: keep as-is
    return url;
  } catch {
    // Not a full URL, probably already relative
    return url.startsWith('/') ? url : `/${url}`;
  }
}

export interface HeaderData {
  logo: {
    url: string;
    alt: string;
  };
  navigation: Array<{
    acf_fc_layout: string;
    menu_item_name: string;
    menu_item_link: {
      title: string;
      url: string;
      target: string;
    };
  }>;
  button_text: string;
  button_link: {
    title: string;
    url: string;
    target: string;
  };
}

export interface HeroData {
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

export interface AboutData {
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

export interface AgriculturalSupportData {
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

export interface SolutionsData {
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

export interface AboutPageData {
  about_subheading: string;
  about_heading: string;
  banner_image?: { url: string; alt: string };
  first_section_subheading: string;
  first_section_heading: string;
  first_section_main_description: string;
  first_section_sub_description: string;
  first_section_image?: { url: string; alt: string };
  number_counter: Array<{ number: string; number_description: string }>;
  vision?: string;
  mission?: string;
}

export interface TestimonialsData {
  page_heading: string;
  page_subheading: string;
  banner_image?: { url: string; alt: string };
  testimonials: Array<{
    customer_name: string;
    profile_pic?: { url: string; alt: string };
    testimonials_texts: string;
  }>;
}

export interface TheFarmData {
  page_subheading: string;
  heading: string;
  banner_image?: { url: string; alt: string };
  secondary_heading: string;
  description: string;
  image_gallery: Array<{ url: string; alt: string }>;
}

export interface FooterData {
  footer_logo?: { url: string; alt: string };
  footer_description: string;
  social_media: Array<{ name: string; url: string }>;
  footer_menu: Array<{ name: string; url: string }>;
  copyright_text: string;
  design_by_text: string;
  important_links: Array<{ text: string; url: string }>;
  background_image?: { url: string; alt: string };
  contact_box: Array<{ type: string; info: string }>;
}

export interface ProductsData {
  products_page_subheading: string;
  products_page_heading: string;
  image_banner?: { url: string; alt: string };
}

export interface ProductListItem {
  slug: string;
  title: string;
  image?: { url: string; alt: string };
  short_description: string;
}

export interface ProductDetail extends ProductListItem {
  description: string;
}

export interface ContactData {
  page_title?: string;
  contact_us_subheading?: string;
  contact_heading: string;
  contact_boxes: Array<{
    acf_fc_layout: string;
    contact_type: string;
    info: string;
    contact_button_text: string;
    contact_button_link: { title: string; url: string; target: string };
  }>;
  contact_form_subheading: string;
  contact_form_heading: string;
  contact_form_description: string;
  google_map_address: { title: string; url: string; target: string };
  banner_image?: { url: string; alt: string };
}

export interface WordPressHeaderResponse {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  template: string;
  meta: {
    _acf_changed: boolean;
  };
  class_list: string[];
  acf: {
    logo: {
      ID: number;
      id: number;
      title: string;
      filename: string;
      filesize: number;
      url: string;
      link: string;
      alt: string;
      author: string;
      description: string;
      caption: string;
      name: string;
      status: string;
      uploaded_to: number;
      date: string;
      modified: string;
      menu_order: number;
      mime_type: string;
      type: string;
      subtype: string;
      icon: string;
      width: number;
      height: number;
      sizes: {
        thumbnail: string;
        'thumbnail-width': number;
        'thumbnail-height': number;
        medium: string;
        'medium-width': number;
        'medium-height': number;
        medium_large: string;
        'medium_large-width': number;
        'medium_large-height': number;
        large: string;
        'large-width': number;
        'large-height': number;
        '1536x1536': string;
        '1536x1536-width': number;
        '1536x1536-height': number;
        '2048x2048': string;
        '2048x2048-width': number;
        '2048x2048-height': number;
      };
    };
    navigation: Array<{
      acf_fc_layout: string;
      menu_item_name: string;
      menu_item_link: {
        title: string;
        url: string;
        target: string;
      };
    }>;
    button_text: string;
    button_link: {
      title: string;
      url: string;
      target: string;
    };
  };
  _links: {
    self: Array<{
      href: string;
      targetHints: {
        allow: string[];
      };
    }>;
    collection: Array<{
      href: string;
    }>;
    about: Array<{
      href: string;
    }>;
    'wp:attachment': Array<{
      href: string;
    }>;
    curies: Array<{
      name: string;
      href: string;
      templated: boolean;
    }>;
  };
}

export async function fetchHeaderData(): Promise<HeaderData> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}header`,
      process.env.NODE_ENV === 'production'
        ? { next: { revalidate: 60 } }
        : { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch header data: ${response.status}`);
    }

    const data: WordPressHeaderResponse[] = await response.json();
    
    if (data.length === 0) {
      throw new Error('No header data found');
    }

    const headerData = data[0];
    
    return {
      logo: {
        url: headerData.acf.logo.url,
        alt: headerData.acf.logo.alt || 'Logo',
      },
      navigation: headerData.acf.navigation.map((item) => ({
        ...item,
        menu_item_link: {
          ...item.menu_item_link,
          url: toNextInternalLink(item.menu_item_link?.url),
        },
      })),
      button_text: headerData.acf.button_text,
      button_link: {
        ...headerData.acf.button_link,
        url: toNextInternalLink(headerData.acf.button_link?.url),
      },
    };
  } catch (error) {
    console.error('Error fetching header data:', error);
    
    // Return the exact data structure from your provided endpoint
    return {
      logo: {
        url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/logo3.webp',
        alt: '',
      },
      navigation: [
        {
          acf_fc_layout: 'navigation_items',
          menu_item_name: 'Home',
          menu_item_link: { title: '', url: '/', target: '' },
        },
        {
          acf_fc_layout: 'navigation_items',
          menu_item_name: 'About us',
          menu_item_link: { title: '', url: '#', target: '' },
        },
        {
          acf_fc_layout: 'navigation_items',
          menu_item_name: 'Services',
          menu_item_link: { title: '', url: '#', target: '' },
        },
        {
          acf_fc_layout: 'navigation_items',
          menu_item_name: 'Our Team',
          menu_item_link: { title: '', url: '#', target: '' },
        },
        {
          acf_fc_layout: 'navigation_items',
          menu_item_name: 'Testimonials',
          menu_item_link: { title: '', url: '#', target: '' },
        },
        {
          acf_fc_layout: 'navigation_items',
          menu_item_name: 'Contact Us',
          menu_item_link: { title: '', url: '/contact-us', target: '' },
        },
      ],
      button_text: 'Get in touch',
      button_link: { title: '', url: '/', target: '' },
    };
  }
}

export async function fetchHeroData(): Promise<HeroData> {
  try {
    console.log('Fetching from URL:', `${WORDPRESS_API_URL}pages?slug=home`);
    
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=home`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Failed to fetch hero data: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API response:', data);
    
    if (data.length === 0) {
      throw new Error('No hero data found');
    }

    const pageData = data[0];
    console.log('Page data:', pageData);
    console.log('ACF data:', pageData.acf);
    console.log('ACF sliders:', pageData.acf?.sliders);
    console.log('ACF sliders type:', typeof pageData.acf?.sliders);
    console.log('ACF sliders is array:', Array.isArray(pageData.acf?.sliders));
    
    const result = {
      '1st_section_subheading': pageData.acf['1st_section_subheading'],
      '1st_section_heading': pageData.acf['1st_section_heading'],
      '1st_section_description': pageData.acf['1st_section_description'],
      '1st_section_button_text': pageData.acf['1st_section_button_text'],
      '1st_section_button_link': pageData.acf['1st_section_button_link'],
      sliders: pageData.acf.sliders && Array.isArray(pageData.acf.sliders) ? pageData.acf.sliders.map((slide: any) => ({
        acf_fc_layout: slide.acf_fc_layout,
        slider_carousal: {
          url: slide.slider_carousal.url,
          alt: slide.slider_carousal.alt || 'Hero Background',
        },
      })) : [],
    };
    
    console.log('Processed result:', result);
    console.log('Sliders in result:', result.sliders);
    console.log('Sliders length:', result.sliders.length);
    
    // If no sliders, use fallback data
    if (!result.sliders || result.sliders.length === 0) {
      console.log('No sliders found, using fallback data');
      return {
        '1st_section_subheading': pageData.acf['1st_section_subheading'] || 'We are committed to growing more than crops',
        '1st_section_heading': pageData.acf['1st_section_heading'] || 'Cultivating a Sustainable Future',
        '1st_section_description': pageData.acf['1st_section_description'] || 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English',
        '1st_section_button_text': pageData.acf['1st_section_button_text'] || 'Discover',
        '1st_section_button_link': pageData.acf['1st_section_button_link'] || { title: '', url: '#', target: '' },
        sliders: [
          {
            acf_fc_layout: 'slide_image',
            slider_carousal: {
              url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/img_1.jpg',
              alt: '',
            },
          },
          {
            acf_fc_layout: 'slide_image',
            slider_carousal: {
              url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/h1-1-1.webp',
              alt: '',
            },
          },
        ],
      };
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    
    // Return fallback data based on your API structure
    console.log('Using fallback data due to error:', error);
    return {
      '1st_section_subheading': 'We are committed to growing more than crops',
      '1st_section_heading': 'Cultivating a Sustainable Future',
      '1st_section_description': 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English',
      '1st_section_button_text': 'Discover',
      '1st_section_button_link': { title: '', url: '#', target: '' },
      sliders: [
        {
          acf_fc_layout: 'slide_image',
          slider_carousal: {
            url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/img_1.jpg',
            alt: '',
          },
        },
        {
          acf_fc_layout: 'slide_image',
          slider_carousal: {
            url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/h1-1-1.webp',
            alt: '',
          },
        },
      ],
    };
  }
}

export async function fetchAboutData(): Promise<AboutData> {
  try {
    console.log('Fetching about data from URL:', `${WORDPRESS_API_URL}pages?slug=home`);
    
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=home`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    console.log('About response status:', response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch about data: ${response.status}`);
    }

    const data = await response.json();
    console.log('About raw API response:', data);
    
    if (data.length === 0) {
      throw new Error('No about data found');
    }

    const pageData = data[0];
    console.log('About page data:', pageData);
    console.log('About ACF data:', pageData.acf);
    
    // Check if ACF data exists
    if (!pageData.acf) {
      throw new Error('No ACF data found');
    }
    
    const result = {
      '2nd_section_subheading': pageData.acf['2nd_section_subheading'] || '',
      '2nd_section_heading': pageData.acf['2nd_section_heading'] || '',
      '2nd_section_description': pageData.acf['2nd_section_description'] || '',
      '2nd_section_button_text': pageData.acf['2nd_section_button_text'] || '',
      '2nd_section_button_link': pageData.acf['2nd_section_button_link'] || { title: '', url: '#', target: '' },
      right_to_left_rolling_text: pageData.acf.right_to_left_rolling_text || '',
      image_boxes: pageData.acf.image_boxes && Array.isArray(pageData.acf.image_boxes) ? pageData.acf.image_boxes.map((box: any) => ({
        acf_fc_layout: box.acf_fc_layout || 'image_list',
        image_cards: {
          url: box.image_cards?.url || '',
          alt: box.image_cards?.alt || '',
        },
      })) : [],
    };
    
    console.log('About processed result:', result);
    console.log('About result keys:', Object.keys(result));
    console.log('About heading in result:', result['2nd_section_heading']);
    
    return result;
  } catch (error) {
    console.error('Error fetching about data:', error);
    
    // Return fallback data
    const fallbackData = {
      '2nd_section_subheading': 'About company',
      '2nd_section_heading': 'Our Mission: Better Farming for a Better Future',
      '2nd_section_description': 'With deep roots in tradition and a focus on innovation, our company provides high-quality agricultural products and solutions that support farmers, enhance food security, and promote sustainable practices. From soil to harvest, we offer expertise in crop production, agri-technology, supply chain logistics, and eco-conscious farming.',
      '2nd_section_button_text': 'Get in Touch',
      '2nd_section_button_link': { title: '', url: '#', target: '' },
      right_to_left_rolling_text: 'From Seed to Harvest.',
      image_boxes: [
        {
          acf_fc_layout: 'image_list',
          image_cards: {
            url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/a48cb57d-1d88-4d95-866e-5780c88f106b.jpeg',
            alt: '',
          },
        },
        {
          acf_fc_layout: 'image_list',
          image_cards: {
            url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/d557bd38-dbd9-4cf3-9d43-95a666928462.jpeg',
            alt: '',
          },
        },
        {
          acf_fc_layout: 'image_list',
          image_cards: {
            url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/2b1861cd-fdbb-481b-925d-c06b2d3f3e22.jpeg',
            alt: '',
          },
        },
        {
          acf_fc_layout: 'image_list',
          image_cards: {
            url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/f57403af-a670-479d-8d3a-213eb02ef7b7.jpeg',
            alt: '',
          },
        },
      ],
    };
    
    console.log('Using fallback about data:', fallbackData);
    return fallbackData;
  }
}

export async function fetchAgriculturalSupportData(): Promise<AgriculturalSupportData> {
  try {
    console.log('Fetching agricultural support data from URL:', `${WORDPRESS_API_URL}pages?slug=home`);
    
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=home`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    console.log('Agricultural support response status:', response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch agricultural support data: ${response.status}`);
    }

    const data = await response.json();
    console.log('Agricultural support raw API response:', data);
    
    if (data.length === 0) {
      throw new Error('No agricultural support data found');
    }

    const pageData = data[0];
    console.log('Agricultural support page data:', pageData);
    console.log('Agricultural support ACF data:', pageData.acf);
    
    // Check if ACF data exists
    if (!pageData.acf) {
      throw new Error('No ACF data found');
    }
    
    const result = {
      '3rd_section_subheading': pageData.acf['3rd_section_subheading'] || '',
      '3rd_section_heading': pageData.acf['3rd_section_heading'] || '',
      '3rd_section_button_text': pageData.acf['3rd_section_button_text'] || '',
      '3rd_section_button_link': pageData.acf['3rd_section_button_link'] || { title: '', url: '#', target: '' },
      '3rd_section_image': {
        url: pageData.acf['3rd_section_image']?.url || '',
        alt: pageData.acf['3rd_section_image']?.alt || '',
      },
      '3rd_section_columns': pageData.acf['3rd_section_columns'] && Array.isArray(pageData.acf['3rd_section_columns']) ? pageData.acf['3rd_section_columns'].map((column: any) => ({
        acf_fc_layout: column.acf_fc_layout || '3rd_section_column_list',
        '3rd_section_column_head': column['3rd_section_column_head'] || '',
        '3rd_section_column_description': column['3rd_section_column_description'] || '',
        '3rd_section_button_text': column['3rd_section_button_text'] || '',
        '3rd_section_button_link': column['3rd_section_button_link'] || { title: '', url: '#', target: '' },
      })) : [],
    };
    
    console.log('Agricultural support processed result:', result);
    console.log('Agricultural support result keys:', Object.keys(result));
    console.log('Agricultural support heading in result:', result['3rd_section_heading']);
    
    return result;
  } catch (error) {
    console.error('Error fetching agricultural support data:', error);
    
    // Return fallback data
    const fallbackData = {
      '3rd_section_subheading': 'Agricultural Support',
      '3rd_section_heading': 'Smart Farming for a Changing Planet',
      '3rd_section_button_text': 'Read More',
      '3rd_section_button_link': { title: '', url: '#', target: '' },
      '3rd_section_image': {
        url: 'http://agro-rajaguru.local/wp-content/uploads/2025/09/h1-3.webp',
        alt: 'Agricultural Support',
      },
      '3rd_section_columns': [
        {
          acf_fc_layout: '3rd_section_column_list',
          '3rd_section_column_head': 'Sustainability First',
          '3rd_section_column_description': 'We prioritize eco-friendly practices that protect natural resources and ensure long-term agricultural productivity for future generations.',
          '3rd_section_button_text': 'Read More',
          '3rd_section_button_link': { title: '', url: '#', target: '' },
        },
        {
          acf_fc_layout: '3rd_section_column_list',
          '3rd_section_column_head': 'Farmer Approach',
          '3rd_section_column_description': 'Every solution we offer is designed to support farmers — helping them increase yields, reduce risk, and grow with confidence.',
          '3rd_section_button_text': 'Read More',
          '3rd_section_button_link': { title: '', url: '#', target: '' },
        },
        {
          acf_fc_layout: '3rd_section_column_list',
          '3rd_section_column_head': 'Innovation That Works',
          '3rd_section_column_description': 'We embrace smart technologies and proven methods that bring efficiency, precision, and progress to modern farming.',
          '3rd_section_button_text': 'Read More',
          '3rd_section_button_link': { title: '', url: '#', target: '' },
        },
      ],
    };
    
    console.log('Using fallback agricultural support data:', fallbackData);
    return fallbackData;
  }
}

export async function fetchSolutionsData(): Promise<SolutionsData> {
  try {
    console.log('Fetching solutions data from URL:', `${WORDPRESS_API_URL}pages?slug=home`);
    
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=home`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    console.log('Solutions response status:', response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch solutions data: ${response.status}`);
    }

    const data = await response.json();
    console.log('Solutions raw API response:', data);
    
    if (data.length === 0) {
      throw new Error('No solutions data found');
    }

    const pageData = data[0];
    console.log('Solutions page data:', pageData);
    console.log('Solutions ACF data:', pageData.acf);

    const result = {
      '4th_section_subheading': pageData.acf['4th_section_subheading'] || '',
      '4th_section_heading': pageData.acf['4th_section_heading'] || '',
      '4th_section_cards': pageData.acf['4th_section_cards'] && Array.isArray(pageData.acf['4th_section_cards']) ? pageData.acf['4th_section_cards'].map((card: any) => ({
        acf_fc_layout: card.acf_fc_layout || '4th_section_card_list',
        cards_number: card.cards_number || '',
        card_heading: card.card_heading || '',
        card_link: card.card_link || { title: '', url: '#', target: '' },
        card_image: {
          url: card.card_image?.url || '',
          alt: card.card_image?.alt || '',
        },
      })) : [],
    };

    console.log('Solutions processed result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching solutions data:', error);
    
    // Return fallback data
    const fallbackData = {
      '4th_section_subheading': 'Farm Solutions',
      '4th_section_heading': 'What Our an Agricultural Company Offers',
      '4th_section_cards': [
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
      ],
    };
    
    console.log('Using fallback solutions data:', fallbackData);
    return fallbackData;
  }
}

export async function fetchContactData(): Promise<ContactData> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=contact-us`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contact data: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No contact data found');
    }

    const pageData = data[0];
    const acf = pageData.acf || {};

    const result: ContactData = {
      page_title: (pageData?.title?.rendered as string) || 'Contact',
      contact_us_subheading: acf.contact_us_subheading || 'Keep in touch',
      contact_heading: acf.contact_heading || 'Contacts',
      contact_boxes: (acf.contact_boxes || []).map((b: any) => ({
        acf_fc_layout: b.acf_fc_layout || 'contact_info',
        contact_type: b.contact_type || '',
        info: b.info || '',
        contact_button_text: b.contact_button_text || '',
        contact_button_link: b.contact_button_link || { title: '', url: '#', target: '' },
      })),
      contact_form_subheading: acf.contact_form_subheading || 'Drop us a line',
      contact_form_heading: acf.contact_form_heading || 'Let’s Start Working Together. Get in Touch',
      contact_form_description: acf.contact_form_description || 'Your email address will not be published. Required fields are marked *',
      google_map_address: acf.google_map_address || { title: '', url: '#', target: '' },
      banner_image: acf.banner_image ? { url: acf.banner_image.url, alt: acf.banner_image.alt || 'Contact banner' } : undefined,
    };

    return result;
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return {
      page_title: 'Contact',
      contact_us_subheading: 'Keep in touch',
      contact_heading: 'Contacts',
      contact_boxes: [
        {
          acf_fc_layout: 'contact_info',
          contact_type: 'Mail Us:',
          info: 'info@rajaguru.com',
          contact_button_text: 'Send an Email',
          contact_button_link: { title: '', url: '#', target: '' },
        },
        {
          acf_fc_layout: 'contact_info',
          contact_type: 'Call Us:',
          info: '+94 112 345 6789',
          contact_button_text: 'Call us Daily',
          contact_button_link: { title: '', url: '#', target: '' },
        },
        {
          acf_fc_layout: 'contact_info',
          contact_type: 'Visit Us',
          info: 'Our shop address,\nCity,\nCountry',
          contact_button_text: 'Our location',
          contact_button_link: { title: '', url: '#', target: '' },
        },
      ],
      contact_form_subheading: 'Drop us a line',
      contact_form_heading: 'Let’s Start Working Together. Get in Touch',
      contact_form_description: 'Your email address will not be published. Required fields are marked *',
      google_map_address: { title: '', url: '#', target: '' },
    };
  }
}

export async function fetchAboutPageData(): Promise<AboutPageData> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=about-us`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 600 } } : { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to fetch about page: ${response.status}`);
    const data = await response.json();
    const pageData = data[0];
    const acf = pageData?.acf || {};
    return {
      about_subheading: acf.about_subheading || 'Our Story',
      about_heading: acf.about_heading || (pageData?.title?.rendered ?? 'About Us'),
      banner_image: acf.banner_image ? { url: acf.banner_image.url, alt: acf.banner_image.alt || 'About banner' } : undefined,
      first_section_subheading: acf['1st_section_subheading'] || 'about company',
      first_section_heading: acf['1st_section_heading'] || '',
      first_section_main_description: acf['1st_section_main_description'] || '',
      first_section_sub_description: acf['1st_section_sub_description'] || '',
      first_section_image: acf['1st_section_image'] ? { url: acf['1st_section_image'].url, alt: acf['1st_section_image'].alt || '' } : undefined,
      number_counter: Array.isArray(acf.number_counter) ? acf.number_counter.map((n: any) => ({ number: String(n.number || ''), number_description: n.number_description || '' })) : [],
      vision: acf.vision || '',
      mission: acf.mission || '',
    };
  } catch (e) {
    console.error('Error fetching about page:', e);
    return {
      about_subheading: 'Our Story',
      about_heading: 'About Us',
      banner_image: undefined,
      first_section_subheading: 'about company',
      first_section_heading: 'Modern Solutions for Traditional Challenges',
      first_section_main_description: 'We don’t just grow crops — we grow trust, opportunity, and a better future. We are dedicated to supporting farmers, enhancing food security, and promoting sustainable agriculture.',
      first_section_sub_description: 'With years of experience and a deep understanding of local and global challenges, we provide high-quality seeds, modern farming solutions, expert field support, and agri-tech innovations that empower growers to increase productivity and protect natural resources. Our mission is rooted in more than just farming — it’s about building partnerships, preserving the land, and helping communities thrive.',
      first_section_image: undefined,
      number_counter: [
        { number: '20k', number_description: 'Hectares under sustainable cultivation' },
        { number: '98%', number_description: 'Customer Satisfaction based on service feedback' },
        { number: '15k', number_description: 'Farmers partnered with across regions' },
      ],
      vision: 'To be a sustainable plantation leader, nourishing people with innovative and value-driven products.',
      mission: 'At Rajaguru Plantations, we grow quality crops and eco-friendly products through responsible farming and technology. We empower communities, protect nature, and create value for all.',
    };
  }
}

export async function fetchTestimonialsData(): Promise<TestimonialsData> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=testimonials`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 600 } } : { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to fetch testimonials: ${response.status}`);
    const data = await response.json();
    const page = data[0];
    const acf = page?.acf || {};
    const testimonials = Array.isArray(acf.testimonials)
      ? acf.testimonials.map((t: any) => ({
          customer_name: t.customer_name || '',
          profile_pic: t.profile_pic ? { url: t.profile_pic.url, alt: t.profile_pic.alt || t.customer_name || '' } : undefined,
          testimonials_texts: (t.testimonials_texts || '').replace(/<[^>]+>/g, ''),
        }))
      : [];
    return {
      page_heading: acf.page_heading || (page?.title?.rendered ?? 'Testimonials'),
      page_subheading: acf.page_subheading || 'Testimonials',
      banner_image: acf.banner_image ? { url: acf.banner_image.url, alt: acf.banner_image.alt || 'Testimonials banner' } : undefined,
      testimonials,
    };
  } catch (e) {
    console.error('Error fetching testimonials:', e);
    return {
      page_heading: 'WHAT PEOPLE SAYS ABOUT AGRO',
      page_subheading: 'Testimonials',
      banner_image: undefined,
      testimonials: [],
    };
  }
}

export async function fetchTheFarmData(): Promise<TheFarmData> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=the-farm`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 600 } } : { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to fetch the-farm: ${response.status}`);
    const data = await response.json();
    const page = data[0];
    const acf = page?.acf || {};
    return {
      page_subheading: acf.page_subheading || '',
      heading: acf.heading || (page?.title?.rendered ?? ''),
      banner_image: acf.banner_image ? { url: acf.banner_image.url, alt: acf.banner_image.alt || 'The Farm banner' } : undefined,
      secondary_heading: acf.secondary_heading || '',
      description: acf.description || '',
      image_gallery: Array.isArray(acf.image_gallery) ? acf.image_gallery.map((img: any) => ({ url: img.url, alt: img.alt || '' })) : [],
    };
  } catch (e) {
    console.error('Error fetching the-farm:', e);
    return { page_subheading: 'Farming technology', heading: 'Our Farm', banner_image: undefined, secondary_heading: '', description: '', image_gallery: [] };
  }
}

export async function fetchFooterData(): Promise<FooterData> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}footer`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 600 } } : { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to fetch footer: ${response.status}`);
    const data = await response.json();
    const entry = data[0];
    const acf = entry?.acf || {};
    return {
      footer_logo: acf.footer_logo ? { url: acf.footer_logo.url, alt: acf.footer_logo.alt || 'Footer logo' } : undefined,
      footer_description: acf.footer_description || '',
      social_media: Array.isArray(acf.social_media) ? acf.social_media.map((s: any) => ({ name: s.social_media_name || '', url: toNextInternalLink(s.social_media_link?.url || '#') })) : [],
      footer_menu: Array.isArray(acf.footer_menu) ? acf.footer_menu.map((m: any) => ({ name: m.footer_menu_item_name || '', url: toNextInternalLink(m.footer_menu_item_link?.url || '#') })) : [],
      copyright_text: acf.copyright_text || '',
      design_by_text: acf.design_by_text || '',
      important_links: Array.isArray(acf.important_links) ? acf.important_links.map((l: any) => ({ text: l.important_link_text || '', url: toNextInternalLink(l.important_link?.url || '#') })) : [],
      background_image: acf.background_image ? { url: acf.background_image.url, alt: acf.background_image.alt || 'Footer background' } : undefined,
      contact_box: Array.isArray(acf.contact_box) ? acf.contact_box.map((c: any) => ({ type: c.contact_type || '', info: (c.contact_info || '').replace(/\r?\n/g, ' ') })) : [],
    };
  } catch (e) {
    console.error('Error fetching footer:', e);
    return { footer_description: '', social_media: [], footer_menu: [], copyright_text: '', design_by_text: '', important_links: [], contact_box: [] };
  }
}

export async function fetchProductsData(): Promise<ProductsData> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}pages?slug=our-products`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 600 } } : { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to fetch products page: ${response.status}`);
    const data = await response.json();
    const page = data[0];
    const acf = page?.acf || {};
    return {
      products_page_subheading: acf.products_page_subheading || 'Products',
      products_page_heading: acf.products_page_heading || (page?.title?.rendered ?? 'Our Products'),
      image_banner: acf.image_banner ? { url: acf.image_banner.url, alt: acf.image_banner.alt || 'Products banner' } : undefined,
    };
  } catch (e) {
    console.error('Error fetching products page:', e);
    return { products_page_subheading: 'Products', products_page_heading: 'Our Products', image_banner: undefined };
  }
}

export async function fetchProductList(): Promise<ProductListItem[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}product`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 600 } } : { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to fetch product list: ${response.status}`);
    const data = await response.json();
    return data.map((p: any) => ({
      slug: p.slug,
      title: p.acf?.product_name || p.title?.rendered || '',
      image: p.acf?.product_image ? { url: p.acf.product_image.url, alt: p.acf.product_image.alt || '' } : undefined,
      short_description: p.acf?.product_short_description || '',
    }));
  } catch (e) {
    console.error('Error fetching product list:', e);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}product?slug=${slug}`, process.env.NODE_ENV === 'production' ? { next: { revalidate: 600 } } : { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to fetch product ${slug}: ${response.status}`);
    const data = await response.json();
    const p = data[0];
    if (!p) return null;
    return {
      slug: p.slug,
      title: p.acf?.product_name || p.title?.rendered || '',
      image: p.acf?.product_image ? { url: p.acf.product_image.url, alt: p.acf.product_image.alt || '' } : undefined,
      short_description: p.acf?.product_short_description || '',
      description: p.acf?.product_description || '',
    };
  } catch (e) {
    console.error('Error fetching product detail:', e);
    return null;
  }
}
