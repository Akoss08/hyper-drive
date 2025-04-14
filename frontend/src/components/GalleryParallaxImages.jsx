import carGallery1 from '/gallery-section/milan-csizmadia-CzDNZDO53n0-unsplash.webp';
import carGallery2 from '/gallery-section/todd-jiang-uFbmTCtLkqg-unsplash (1).jpg';
import carGallery3 from '/gallery-section/tyler-clemmensen-kGCvCx5qyjM-unsplash.webp';
import carGallery4 from '/gallery-section/wes-tindel-M-eRTCunPYo-unsplash.webp';
import GalleryParallaxImage from './GalleryParallaxImage';

const GalleryParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <GalleryParallaxImage src={carGallery1} start={-200} end={200} className="w-1/3 rounded-lg" />
      <GalleryParallaxImage src={carGallery2} start={200} end={-250} className="rounded-lg mx-auto w-1/3" />
      <GalleryParallaxImage src={carGallery3} start={-200} end={200} className="rounded-lg ml-auto w-1/5" />
      <GalleryParallaxImage src={carGallery4} start={0} end={-500} className="rounded-lg ml-24 w-5/12" />
    </div>
  );
};

export default GalleryParallaxImages;
