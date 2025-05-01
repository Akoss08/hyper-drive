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

  const fetchCars = useCallback(async (url) => {
    try {
      const resp = await api.get(url);
      const data = resp.data;

      data.results.forEach((car) => {
        useGLTF.preload(car.model_asset_path);
      });

      setCars((prevCars) => {
        const existingIds = new Set(prevCars.map((car) => car.id));
        const newCars = data.results.filter((car) => !existingIds.has(car.id));
        return [...prevCars, ...newCars];
      });

      setNextUrl(data.next);
      setPrevtUrl(data.previous);
    } catch (error) {
      console.log(error);
      const message = error.response ? error.response.data.detail : 'Something went wrong during loading the cars!';
      alert(message);
    }
  }, []);

  useEffect(() => {
    fetchCars('/api/car/');
  }, [fetchCars]);


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
