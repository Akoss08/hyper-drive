import { useState } from 'react';
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Checkbox } from '@material-tailwind/react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

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
                {loading && (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                {loading ? 'Signing In...' : 'Sign In'}
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
