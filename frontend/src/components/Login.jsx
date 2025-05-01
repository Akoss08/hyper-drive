import { useState } from 'react';
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Checkbox } from '@material-tailwind/react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function Login({ onToggle, isOpen }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/token/', { username, password });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      window.dispatchEvent(new Event('storage'));

      navigate('/');
      onToggle();
    } catch (error) {
      console.log(error);
      const message = error.response ? error.response.data.detail : 'Something went wrong!';
      alert(message);
    } finally {
      setPassword('');
      setUsername('');
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog size="xs" open={isOpen} handler={onToggle} className="bg-transparent shadow-none">
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Sign In
              </Typography>
              <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
                Enter your username and password to Sign In.
              </Typography>

              <Typography className="-mb-2" variant="h6">
                Your Username
              </Typography>

              <Input label="Username" size="lg" required type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input label="Password" size="lg" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" className="cursor-pointer flex items-center justify-center" fullWidth type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoadingSpinner />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <Typography variant="small" className="mt-4 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold cursor-pointer"
                  onClick={() => {
                    onToggle();
                    navigate('/register');
                  }}
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}

export default Login;
