
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children,path }) => {
  const { authUser } = useSelector((state) => state.usersdata);
  console.log("path",path)
  return <>{authUser ? children : <Navigate to={path} />}</>;
};