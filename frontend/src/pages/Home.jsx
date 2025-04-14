import HorizontalCarScrollSection from '../components/HorizontalCarScrollSection';
import { ReactLenis } from 'lenis/dist/lenis-react';
import AboutCard from '../components/AboutCard';
import GallerySection from '../components/GallerySection';
import PriceSection from '../components/PriceSection';

const Home = () => {
  return (
    <div>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <HorizontalCarScrollSection />
        <AboutCard />
        <GallerySection />
        <PriceSection />
      </ReactLenis>
    </div>
  );
};

export default Home;
