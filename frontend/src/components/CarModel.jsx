import { useEffect } from 'react';
import { Mesh, Box3, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';

function CarModel() {
  const { scene } = useGLTF('/3d-car-models/porsche-911-gt3-rs/scene-v1.glb');

  useEffect(() => {
    scene.scale.set(0.5, 0.5, 0.5);
    scene.rotateY(-Math.PI * 0.51);

    const box = new Box3().setFromObject(scene);
    const center = new Vector3();
    box.getCenter(center);
    scene.position.sub(center);
    scene.position.y += 1.3;

    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      <ambientLight />
      <primitive object={scene} />
    </>
  );
}

export default CarModel;
