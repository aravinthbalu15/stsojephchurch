import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setAuth(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/verify-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuth(res.status === 200);
      } catch (err) {
        setAuth(false);
        localStorage.removeItem("adminToken");
      }
    };

    verifyToken();
  }, []);

  if (auth === null) {
    return (
      <div className="text-center mt-5 fw-bold">
        Validating session...
      </div>
    );
  }

  return auth ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
