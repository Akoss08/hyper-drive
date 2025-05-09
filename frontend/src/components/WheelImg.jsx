import wheelImg from '/home-page-main-images/wheel.avif';
import { motion } from 'framer-motion';

const WheelImg = ({ rotate, startingPosition }) => {
  return (
    <div className={`absolute ${startingPosition} w-[65px] h-[65px]`}>
      <motion.div style={{ rotate }}>
        <img src={wheelImg} className="rounded-full" />
      </motion.div>
    </div>
  );
};

export default WheelImg;
