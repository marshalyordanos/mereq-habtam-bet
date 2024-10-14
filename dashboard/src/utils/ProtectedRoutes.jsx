import { Outlet, Navigate, useNavigate } from "react-router-dom";
import useLocalStorageGetter from "../hooks/useLocalStorageGetter";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoutes = () => {
  const token = useLocalStorageGetter("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  //   console.log(authenticated, "state........................");
  if (!token && !isLoggedIn) {
    console.log("not authenticated");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
