import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import circuitImg from '../assets/Screenshot 2025-04-03 102409.png';
import circuitImgRotated from '../assets/Screenshot 2025-04-03 102409 - Copy.png';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export default function AboutCard() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;
  const opacity = useTransform(scrollYProgress, [0.1, 1], [1, 0]);

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.section
      initial={{ y: 150, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 1 }}
      className="flex justify-center items-center min-h-screen m-5 pt-10"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform,
          opacity,
        }}
      >
        <Card
          style={{
            transform: 'translateZ(75px)',
            transformStyle: 'preserve-3d',
          }}
          className="bg-neutral-600 w-full max-w-[48rem] md:flex-row-reverse"
        >
          <CardHeader
            style={{
              transform: 'translateZ(75px)',
            }}
            shadow={false}
            floated={false}
            className="m-3 md:h-[400px] md:w-2/5 shrink-0 rounded-xl"
          >
            <img src={circuitImg} alt="card-image" className="h-full w-full object-cover md:block hidden" />
            <img src={circuitImgRotated} alt="card-image" className="h-full w-full object-cover md:hidden block" />
          </CardHeader>
          <CardBody
            style={{
              transform: 'translateZ(30px)',
            }}
          >
            <Typography variant="h6" className="mb-4 uppercase text-gray-400">
              the experience
            </Typography>
            <Typography variant="h4" className="mb-2 text-gray-600">
              Feel the adrenaline rush as you get behind the wheel of a high-performance sports car.
            </Typography>
            <Typography className="mb-8 font-normal text-gray-700">
              Choose your favorite supercar, select a world-class racing circuit, and push the limits in a safe and exhilarating environment. No speed limits—just pure
              driving excitement!
            </Typography>
            <Link to="/cars" className="inline-block">
              <Button variant="text" className="flex cursor-pointer items-center gap-2 bg-amber-100 hover:bg-amber-200">
                Show cars
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Button>
            </Link>
          </CardBody>
        </Card>
      </motion.div>
    </motion.section>
  );
}
