import roadImg from '../assets/ChatGPT_Image_2025._ápr._1._12_57_37-removebg-preview.png';

const RoadImg = () => {
  return (
    <div className="absolute inset-0 z-0">
      <img src={roadImg} alt="Road" className="w-full h-full object-cover" />
    </div>
  );
};

export default RoadImg;
