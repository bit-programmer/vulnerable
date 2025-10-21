import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: ProtectedRouteProps) => {
  const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
