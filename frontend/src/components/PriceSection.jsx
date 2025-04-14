import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Carousel } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import SkeletonLoadingComponent from './SkeletonLoadingComponent';

function PriceSection() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true });
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        if (inView && !cars.length) {
          const resp = await api.get('/api/car/');
          setCars(resp.data.results);
        }
      } catch (error) {
        console.log(error);
        const message = error.response ? error.response.data.detail : 'Something went wrong during loading the cars!';
        alert(message);
      }
    }
    fetchCars();
  }, [inView, cars]);

  return (
    <motion.section
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 1 }}
      className="flex justify-center py-28"
    >
      {cars.length ? (
        <Carousel loop={true} autoplay={true}>
          {cars.map((car) => (
            <div key={car.id} className="flex justify-center">
              <Card className="w-136 bg-blue-gray-200">
                <CardHeader shadow={false} floated={false} className="h-56 bg-gradient-to-bl from-blue-gray-300 to-blue-gray-900">
                  <img src={car.image_asset_path} alt="card-image" className="max-h-full w-full object-cover" />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {car.make} {car.model}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      ${car.price}
                    </Typography>
                  </div>
                  <ul className="text-gray-700 text-sm font-normal opacity-75">
                    <li>Horsepower: {car.horsepower} HP</li>
                    <li>Top speed: {car.top_speed} km/h</li>
                    <li>0-100 km/h: {car.kph_from_zero_to_hundred}s</li>
                  </ul>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    onClick={() => navigate('/cars')}
                    ripple={false}
                    fullWidth={true}
                    className="cursor-pointer bg-blue-gray-900/50 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    Show all
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </Carousel>
      ) : (
        <SkeletonLoadingComponent />
      )}
    </motion.section>
  );
}

export default PriceSection;
