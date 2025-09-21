import Hero from '@/components/Hero';
import About from '@/components/About';
import AgriculturalSupport from '@/components/AgriculturalSupport';
import Solutions from '@/components/Solutions';
import { fetchHeroData, fetchAboutData, fetchAgriculturalSupportData, fetchSolutionsData } from '@/lib/wordpress';

export default async function Home() {
  console.log('Fetching hero, about, agricultural support, and solutions data...');
  const heroData = await fetchHeroData();
  const aboutData = await fetchAboutData();
  const agriculturalSupportData = await fetchAgriculturalSupportData();
  const solutionsData = await fetchSolutionsData();
  
  console.log('Hero data received:', heroData);
  console.log('About data received:', aboutData);
  console.log('Agricultural support data received:', agriculturalSupportData);
  console.log('Solutions data received:', solutionsData);
  console.log('About data keys:', Object.keys(aboutData || {}));
  console.log('About heading:', aboutData?.['2nd_section_heading']);
  console.log('Agricultural support heading:', agriculturalSupportData?.['3rd_section_heading']);
  console.log('Solutions heading:', solutionsData?.['4th_section_heading']);

  return (
    <div>
      <Hero data={heroData} />
      <About data={aboutData} />
      <AgriculturalSupport data={agriculturalSupportData} />
      <Solutions data={solutionsData} />
    </div>
  );
}
