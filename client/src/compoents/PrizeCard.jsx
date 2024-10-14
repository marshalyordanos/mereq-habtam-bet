import React from "react";

const PrizeCard = ({ image, name }) => {
  return (
  <div className="border-[#141414ff] rounded-[15px] bg-[#141414ff] w-40 h-40 flex flex-col items-center justify-center p-2">

      <img src={image} alt={name} className="w-full h-3/4 object-cover mb-2 border-2 border-[#89b504ff] rounded-[15px]" />
      <p className="text-white text-center">{name}</p>  
    </div>
  );
};

export default PrizeCard;



