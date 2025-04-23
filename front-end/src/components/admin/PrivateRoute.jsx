import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/admin/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
        localStorage.removeItem('adminToken');
      }
    };

    if (token) {
      verifyToken();
    } else {
      setAuth(false);
    }
  }, [token]);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
