import { useEffect } from 'react';
import { Mesh, Box3, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { MODEL_SETTINGS } from '../constants';

function Model({ model, isVisible }) {
  const { scene } = useGLTF(model);

  useEffect(() => {
    const name = model.split('/').at(-2);
    const config = MODEL_SETTINGS[name];
    scene.scale.set(config.scale, config.scale, config.scale);
    scene.rotateY(-Math.PI * 0.51);

    const box = new Box3().setFromObject(scene);
    const center = new Vector3();
    box.getCenter(center);
    scene.position.sub(center);
    scene.position.y += config.yOffset;

    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
      }
    });
  }, [scene, model]);

  return (
    <>
      <primitive object={scene} visible={isVisible} />
    </>
  );
}

export default Model;
