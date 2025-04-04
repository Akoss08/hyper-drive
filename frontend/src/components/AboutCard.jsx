import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import circuitImg from '../assets/Screenshot 2025-04-03 102409.png';
import circuitImgRotated from '../assets/Screenshot 2025-04-03 102409 - Copy.png';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;
