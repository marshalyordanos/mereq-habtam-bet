import { apiPrivate } from "../utils/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
// import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
// import useRefreshToken from "./useRefreshToken";
import {
  logOutAsync,
  logout,
  updateAccessToken,
} from "../views/Authentication/redux/authRedux";
const useAPIPrivate = () => {
  // const { state } = useAuth();
  //change htis ot redux persisit token
  const refresh = useRefreshToken();

  const { isLoggedIn, user, accessToken } = useSelector(
    (state) => state.auth.auth
  );

  // const accessToken = user?.data?.token?.active;
  const dispatch = useDispatch();
  useEffect(() => {
    const requestInterceptor = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          console.log(accessToken, "old access token");

          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        const jojo = { ...error.config };
        jojo["sent"] = false;

        console.log(jojo, "err jojo copy");
        console.log(jojo.sent, "ent config");
        console.log(prevRequest["sent"], "prv req sent$$$$$$$$$$$$$$$$$$$");
        // console.log(prevRequest, "prv req sent$$$$$$$$$$$$$$$$$$$");
        console.log(error?.response?.status, "prv req sent$$$$$$$$$$$$$$$$$$$");
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          jojo["sent"] = false;

          const newAccessToken = await refresh();
          console.log(newAccessToken, "new access token");
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiPrivate(prevRequest);
        } else if (error?.response?.status === 403 && prevRequest?.sent) {
          dispatch(logout());
          message.info("Session expired. Please log in again.");
          console.log("request has been sent twice");
          const response = await dispatch(logOutAsync());
          console.log(response, "logout response");
          return Promise.reject(error);
        }
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestInterceptor);

      apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [isLoggedIn, refresh]);
  return apiPrivate;
};
export default useAPIPrivate;
