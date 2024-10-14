import React, { useEffect, useState } from "react";

const Card = ({
  statusname,
  statusamount,
  logo,
  logobg,
  className,
  cardStyle = `py-6 px-6  `,
}) => {
  const [logoBg, setLogoBg] = useState("bg-white");
  useEffect(() => {
    if (logoBg === "blue") {
      setLogoBg("bg-[#E7EDFF]");
    }
  }, [logobg]);
  return (
    <div className={` bg-white rounded-2xl flex lg:inline-block ${className}`}>
      <div className={`flex justify-start items-center ${cardStyle}`}>
        {logo}

        <div className="flex flex-col items-start justify-start borer borer-red-900">
          <p className="text-[#718EBF]">{statusname}</p>
          <p className="font-medium text-xl">{statusamount}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
