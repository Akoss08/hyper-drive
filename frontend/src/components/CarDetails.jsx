import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';

function CarDetails({ car }) {
  const navigate = useNavigate();

  return (
    <div className="absolute flex flex-col h-[75vh] w-[75vw] text-gray-400 z-50 pointer-events-none">
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col justify-center items-center py-2">
          <h1 className="text-3xl font-bold">
            {car.make} {car.model} {car.year}
          </h1>
          <h2 className="text-gray-500">${car.price} / session</h2>
        </div>

        <div className="text-xl flex flex-col justify-evenly flex-1 px-4">
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-start">
              <CountUp end={car.engine_size} decimals={1} duration={3} suffix="L" />
              <p className="text-sm text-gray-600">Engine size (liters)</p>
            </div>
            <div className="flex flex-col items-end">
              <CountUp end={car.horsepower} duration={3} suffix="HP" />
              <p className="text-sm text-gray-600">Horsepower</p>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-start">
              <CountUp end={car.cylinders} duration={3} prefix="V" />
              <p className="text-sm text-gray-600">Number of cylinders</p>
            </div>
            <div className="flex flex-col items-end">
              <CountUp end={car.torque} duration={3} suffix="Nm" />
              <p className="text-sm text-gray-600">Max. torque (Nm)</p>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-start">
              <CountUp end={car.kph_from_zero_to_hundred} decimals={1} duration={3} suffix="s" />
              <p className="text-sm text-gray-600">Acceleration 0-100 km/h</p>
            </div>
            <div className="flex flex-col items-end">
              <CountUp end={car.top_speed} duration={3} suffix="km/h" />
              <p className="text-sm text-gray-600">Top speed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pointer-events-auto">
        <button onClick={() => navigate('/booking', { state: { carId: car.id } })} className="cursor-pointer bg-gray-800 hover:bg-blue-gray-900 p-2 rounded-md">
          Book this car
        </button>
      </div>
    </div>
  );
}

export default CarDetails;
