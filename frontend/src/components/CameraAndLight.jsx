import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Ground } from '../components/Ground';

function CameraAndLight() {
  return (
    <>
      <OrbitControls enablePan={false} maxDistance={15} autoRotate={true} autoRotateSpeed={1} minDistance={7} target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[6, 2, 12]} />
      <color args={[0, 0, 0]} attach="background" />
      <spotLight color={[1, 1, 1]} intensity={600} angle={1.6} penumbra={0.6} position={[0, 5, 0]} castShadow shadow-bias={-0.0001} />
      <ambientLight />

      <Ground />
    </>
  );
}

export default CameraAndLight;
