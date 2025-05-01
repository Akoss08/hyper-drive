import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { LinearSRGBColorSpace, RepeatWrapping, TextureLoader } from 'three';
import terrainRoughnessUrl from '/textures/terrain-roughness.avif';
import terrainNormalUrl from '/textures/terrain-normal.avif';

export function Ground() {
  const [roughness, normal] = useLoader(TextureLoader, [terrainRoughnessUrl, terrainNormalUrl]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    normal.colorSpace = LinearSRGBColorSpace;
  }, [normal, roughness]);

  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <circleGeometry args={[35, 6]} />
      <MeshReflectorMaterial
        normalMap={normal}
        normalScale={[1, 1]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        debug={0}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}
