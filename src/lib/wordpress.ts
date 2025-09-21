// WordPress API utilities
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://agro-rajaguru.local/wp-json/wp/v2/';

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
    const response = await fetch(`${WORDPRESS_API_URL}header`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

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
      navigation: headerData.acf.navigation,
      button_text: headerData.acf.button_text,
      button_link: headerData.acf.button_link,
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
          menu_item_link: { title: '', url: '#', target: '' },
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
          menu_item_link: { title: '', url: '#', target: '' },
        },
      ],
      button_text: 'Get in touch',
      button_link: { title: '', url: '#', target: '' },
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
