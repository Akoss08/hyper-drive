import GalleryCenterImage from './GalleryCenterImage';
import GalleryParallaxImages from './GalleryParallaxImages';

const SECTION_HEIGHT = 1500;

const GallerySection = () => {
  return (
    <section style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
      <GalleryCenterImage />

      <GalleryParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </section>
  );
};

export default GallerySection;
