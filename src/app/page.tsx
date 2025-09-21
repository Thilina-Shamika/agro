import Hero from '@/components/Hero';
import About from '@/components/About';
import { fetchHeroData, fetchAboutData } from '@/lib/wordpress';

export default async function Home() {
  console.log('Fetching hero and about data...');
  const heroData = await fetchHeroData();
  const aboutData = await fetchAboutData();
  
  console.log('Hero data received:', heroData);
  console.log('About data received:', aboutData);
  console.log('About data keys:', Object.keys(aboutData || {}));
  console.log('About heading:', aboutData?.['2nd_section_heading']);

  return (
    <div>
      <Hero data={heroData} />
      <About data={aboutData} />
    </div>
  );
}
