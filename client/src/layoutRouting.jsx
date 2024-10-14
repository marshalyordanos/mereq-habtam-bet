import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
// import LayoutApp from "./components/layout/LayoutApp";
import PrizePage from "./pages/PrizeList";
import PuzzlePage from "./pages/PuzzlePage";
import SpinWheel from "./pages/PrizePage";

const LayoutRouting = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<PuzzlePage />} />
        <Route path="prizes" element={<PrizePage />} />
        {/* <Route path="Puzzle" element={<PuzzlePage />} /> */}
        <Route path="SpinWheel" element={<SpinWheel />} />
      </Route>
    </Routes>
  );
};

export default LayoutRouting;
