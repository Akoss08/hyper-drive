import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import CarScene from "../components/CarScene";

function Cars() {
  return (
    <div className="h-screen">
      <Canvas shadows>
        <Suspense fallback={null}>
          <CarScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Cars;
