import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./views/dashboard/Dashboard";
import Login from "./views/auth/Login";
import PrizesList from "./views/prizes/PrizesList";
import PuzzlesList from "./views/puzzles/PuzzlesList";
import HomePage from "./views/home/home";
import PrivateRoutes from "./utils/ProtectedRoutes";

function App() {
  const [count, setCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <Dashboard collapsed={collapsed} setCollapsed={setCollapsed}>
                <div
                  className={`${
                    collapsed ? "ml-[80px]" : "ml-[200px]"
                  } transition-all ease-in mt-10 px-10 pb-10`}
                >
                  <PrizesList />
                </div>
              </Dashboard>
            }
            path="/prize"
          />
          <Route
            element={
              <Dashboard collapsed={collapsed} setCollapsed={setCollapsed}>
                <div
                  className={`${
                    collapsed ? "ml-[80px]" : "ml-[200px]"
                  } transition-all ease-in mt-10 px-10 pb-10`}
                >
                  <PuzzlesList />
                </div>
              </Dashboard>
            }
            path="/puzzle"
          />
          <Route
            element={
              <Dashboard collapsed={collapsed} setCollapsed={setCollapsed}>
                <div
                  className={`${
                    collapsed ? "ml-[80px]" : "ml-[200px]"
                  } transition-all ease-in mt-10 px-10 pb-10`}
                >
                  <HomePage />
                </div>
              </Dashboard>
            }
            path="/"
          />
          {/* <Route
          element={ 
            <Dashboard collapsed={collapsed} setCollapsed={setCollapsed}>
              <Jobs collapsed={collapsed} setCollapsed={setCollapsed} />
            </Dashboard>
          }
          path="/jobs/:id"
        /> */}
        </Route>

        <Route element={<Login />} path="/login" />
        {/* <Route element={<Login />} path="/" /> */}
      </Routes>
    </>
  );
}

export default App;
