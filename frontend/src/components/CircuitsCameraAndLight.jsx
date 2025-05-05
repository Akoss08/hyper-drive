import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function CircuitsCameraAndLight({ difficultyColor }) {
  return (
    <>
      <OrbitControls enablePan={false} maxDistance={15} autoRotate={true} autoRotateSpeed={1} minDistance={7} target={[0, 0.35, 0]} maxPolarAngle={1.2} />
      <PerspectiveCamera makeDefault fov={50} position={[6, 2, 12]} />
      <spotLight color={difficultyColor} intensity={80} angle={1.6} penumbra={0.6} position={[0, 5, 0]} />
    </>
  );
}

export default CircuitsCameraAndLight;
