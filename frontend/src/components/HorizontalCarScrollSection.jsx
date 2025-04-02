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
