import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import carMeetImg from '/gallery-section/sport-cars-parade-race-highway.avif';

const GalleryCenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [2300, 3700], [25, 0]);
  const clip2 = useTransform(scrollY, [2300, 3700], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [2300, 4000], ['170%', '100%']);
  const opacity = useTransform(scrollY, [3500, 4200], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${carMeetImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

export default GalleryCenterImage;
