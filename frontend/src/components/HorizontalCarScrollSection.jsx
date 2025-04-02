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
