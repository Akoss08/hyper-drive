import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import api from '../api';
import Model from '../components/Model';
import NavigationButtons from '../components/NavigationButtons';
import { difficultyColors } from '../constants';
import CircuitsCameraAndLight from '../components/CircuitsCameraAndLight';
import CircuitDetails from '../components/CircuitDetails';
import LoadingSpinner from '../components/LoadingSpinner';

function Circuits() {
  const [circuits, setCircuits] = useState([]);
  const [index, setIndex] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevtUrl] = useState(null);

  const fetchCircuits = useCallback(async (url) => {
    try {
      const resp = await api.get(url);
      const data = resp.data;

      data.results.forEach((track) => {
        useGLTF.preload(track.model_asset_path);
      });

      setCircuits((prevCircuits) => {
        const existingIds = new Set(prevCircuits.map((circuit) => circuit.id));
        const newCircuits = data.results.filter((circuit) => !existingIds.has(circuit.id));
        return [...prevCircuits, ...newCircuits];
      });

      setNextUrl(data.next);
      setPrevtUrl(data.previous);
    } catch (error) {
      console.log(error);
      const message = error.response ? error.response.data.detail : 'Something went wrong during loading the circuits!';
      alert(message);
    }
  }, []);

  useEffect(() => {
    fetchCircuits('/api/track/');
  }, [fetchCircuits]);

  const handleNext = () => {
    setIndex((prev) => {
      const nextIndex = prev + 1;

      if (nextIndex === circuits.length - 1 && nextUrl) {
        fetchCircuits(nextUrl);
      }

      return nextIndex % circuits.length;
    });
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + circuits.length) % circuits.length);
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <Canvas>
        <Suspense fallback={null}>
          <CircuitsCameraAndLight difficultyColor={difficultyColors[circuits[index]?.difficulty]}/>
          {circuits.length > 0 && circuits.map((circuit, idx) => <Model key={circuit.id} model={circuit.model_asset_path} isVisible={idx === index} />)}
        </Suspense>
      </Canvas>
      {circuits.length > 0 ? (
        <CircuitDetails circuit={circuits[index]} />
      ) : (
        <div className="absolute flex items-center justify-center scale-400">
          <LoadingSpinner />
        </div>
      )}

      <NavigationButtons onNext={handleNext} onPrev={handlePrev} isDisabled={!prevUrl && index === 0} />
    </div>
  );
}

export default Circuits;
