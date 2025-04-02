import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import RoadImg from './RoadImg';
import CarImg from './CarImg';
import WheelImg from './WheelImg';

const HorizontalCarScrollSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '190%']);
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '1500deg']);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ opacity }}>
          <RoadImg />
        </motion.div>
        <motion.div style={{ x, opacity }}>
          <CarImg />
          <WheelImg rotate={rotate} startingPosition={'bottom-[34.8%] left-[16.9%]'} />
          <WheelImg rotate={rotate} startingPosition={'bottom-[35.1%] right-[20.7%]'} />
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalCarScrollSection;
