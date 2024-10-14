// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import PuzzlePage from "./pages/PuzzlePage";
// // import viteLogo from '/vite.svg'
// import "./App.css";
import NavBar from "./compoents/NavBar";
// import PrizePage from "./pages/PrizeList";
// import SpinWheel from "./pages/PrizePage";
// import Leaderboard from "./pages/leaderBoard";
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <NavBar />
//       <div className="mt-10 md:mt-[90px]">
//         {/* <PrizePage /> */}
//         {/* <PuzzlePage /> */}
//         {/* <PrizePage /> */}
//         {/* <Leaderboard /> */}
//         <SpinWheel />
//       </div>
//     </>
//   );
// }

// export default App;

import "./App.css";

// import { useDispatch } from 'react-redux';
// import { login, setCredential } from './redux/auth/authSlice';
import AppRoute from "./app-routing";
import SpinWheel from "./pages/PrizePage";
import UserProvider, { useUser, useUserLogin } from "./userContex";
import axios from "axios";
import api from "./api";
import { useEffect } from "react";

function App() {
  // const dispatch = useDispatch();
  const user = useUser();

  const userLogin = useUserLogin();
  console.log("app ------------");

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const res = await api.post("/auth", {
        phoneNumber: "0986680094",
        spinChance: 10,
      });
      userLogin(res.data);
      console.log("=====", user, userLogin, res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full ">
      <NavBar />
      {/* <SpinWheel /> */}
      <div className="mt-10 md:mt-[90px]">
        <AppRoute />
      </div>
    </div>
  );
}

export default App;
