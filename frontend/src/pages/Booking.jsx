import { useLocation } from 'react-router-dom';

function Booking() {
  const location = useLocation();
  const { carId } = location.state;

  return <div className='mt-10'>{carId}</div>;
}

export default Booking;
