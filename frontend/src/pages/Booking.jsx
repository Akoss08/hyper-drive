import { useLocation } from 'react-router-dom';

function Booking() {
  const location = useLocation();
  const { carId } = location.state;
  const { circuitId } = location.state;

  return <div className="mt-10">{carId || circuitId}</div>;
}

export default Booking;
