import { useNavigate } from 'react-router-dom';

function CircuitDetails({ circuit }) {
  const navigate = useNavigate();

  const lapTime = circuit.avg_lap_time_minute;
  const minutes = Math.floor(lapTime);
  const seconds = lapTime.toString().split('.')[1];
  const formattedTime = `${minutes}:${seconds}`;

  return (
    <div className="absolute flex flex-col h-[75vh] w-[75vw] text-gray-400 pointer-events-none">
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col justify-center items-center py-2">
          <h1 className="text-3xl font-bold">{circuit.name}</h1>
          <h2 className="text-gray-500">{circuit.location}</h2>
        </div>

        <div className="text-xl flex flex-col justify-evenly flex-1 px-4">
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-start">
              <h2 className="text-gray-500">{formattedTime} m</h2>
              <p className="text-sm text-gray-600">Average lap time / minutes</p>
            </div>
            <div className="flex flex-col items-end">
              <h2 className="text-gray-500">{circuit.distance_km} km</h2>
              <p className="text-sm text-gray-600">Lap length</p>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-start">
              <h2 className="text-gray-500">{circuit.difficulty}</h2>
              <p className="text-sm text-gray-600">Difficulty</p>
            </div>
            <div className="flex flex-col items-end">
              <h2 className="text-gray-500">{circuit.number_of_turns}</h2>
              <p className="text-sm text-gray-600">Number of turns</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pointer-events-auto">
        <button onClick={() => navigate('/booking', { state: { circuitId: circuit.id } })} className="cursor-pointer bg-gray-800 hover:bg-blue-gray-900 p-2 rounded-md">
          Book this circuit
        </button>
      </div>
    </div>
  );
}

export default CircuitDetails;
