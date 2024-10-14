import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "./utils/ProtectedRoute";

import LayoutRouting from "./layoutRouting";
// import LoginPage from "./views/auth/LoginPage";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "./redux/auth/authSlice";

const AppRoute = () => {
    //   const user = useSelector(selectCurrentUser);
    //   console.log(user);
    return (
        <div>
            <Routes>
                {/* {user && ( */}
                {/* <Route element={<ProtectedRoute />}> */}
                <Route path="/*" element={<LayoutRouting />} />

                {/* <Route > */}

                {/* <Route element={<Navigate to="/bet" />} path="/" /> */}
                {/* <Route element={<Navigate to="/bet" />} path="/login" /> */}
                {/* </Route> */}

            </Routes>
        </div>
    );
};

export default AppRoute;
