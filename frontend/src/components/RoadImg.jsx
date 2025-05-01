import roadImg from '/home-page-main-images/ChatGPT_Image_2025._ápr._1._12_57_37-removebg-preview.avif';

const RoadImg = () => {
  return (
    <div className="absolute inset-0 z-0">
      <img src={roadImg} alt="Road" className="w-full h-full object-cover" />
    </div>
  );
};

export default RoadImg;
