import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useCallback } from 'react';
import api from '../api';
import { useGLTF } from '@react-three/drei';
import CameraAndLight from '../components/CameraAndLight';
import CarModel from '../components/CarModel';
import LoadingSpinner from '../components/LoadingSpinner';
import CarDetails from '../components/CarDetails';
import NavigationButtons from '../components/NavigationButtons';

function Cars() {
  const [cars, setCars] = useState([]);
  const [index, setIndex] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevtUrl] = useState(null);

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
