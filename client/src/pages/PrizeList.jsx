import React  , {useEffect,useState} from "react";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import PrizeCard from "../compoents/PrizeCard";
import api from "../api";

const PrizePage = () => {
  const [prizes, setPrizes] = useState([]);
  useEffect(()=>{
    const fetchPrizes = async () => {
      try {
        const res = await api.get("/prize");
        console.log("..",res)
       setPrizes(res.data.data)

        
      } catch (error) {
        console.error("Error fetching prizes:", error);
        
      }
    }
    fetchPrizes()
  },[])


 
  return (
    <div className="text-white ] flex flex-col justify-center items-center w-full  ">
      <div className="max-w-[360px] mb-20 md:mb-10  flex flex-col justify-center text-center items-center mt-10 ">
        <p className="text-white font-black text-2xl">Prizes</p>
        <p className="">
        Check out our amazing prizes! there's something for everyone.
        </p>
        <div className="mb-10"></div>
      
        <div className="flex max-w-[360px] flex-wrap gap-7 text-white justify-start items-center  ">
          {prizes.map((prize) => (
            <PrizeCard
            key={prize._id}  
            image={prize.image}
            name={prize.value}  
            
            />
            
          ))}
        </div>
      
      </div>
    </div>
  );
};

export default PrizePage;
