  useEffect(() => {
    async function auth() {
      const token = localStorage.getItem(ACCESS_TOKEN);

      try {
        if (!token) {
          setIsAuthorized(false);
          return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          await refreshToken();
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      }
    }

    auth();
  }, []);
