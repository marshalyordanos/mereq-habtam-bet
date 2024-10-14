import React from "react";

const CustomModal = ({
  children,
  setSelectedPuzzle,
  setInd,
  setOpenModal,
  openModal,
}) => {
  return (
    <div className=" absolute h-screen w-screen ">
      <div className="relative h-screen w-screen flex justify-center items-center">
        <div className="   z-50    ">{children}</div>
      </div>
      <div
        onClick={() => {
          setOpenModal(false);
          setInd(null);
          setSelectedPuzzle(null);
        }}
        className="z-40 bg-black/[.8] top-0 left-0 right-0 bottom-0 absolute bg flex justify-center items-center"
      ></div>
    </div>
  );
};

export default CustomModal;
