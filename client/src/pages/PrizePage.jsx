import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import Confetti from "react-confetti";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Leaderboard from "./leaderBoard";
import PuzzlePage from "./PuzzlePage";
import { useUser, useUserLogin } from "../userContex";

Modal.setAppElement("#root"); // Accessibility

const SpinWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(0);
  const [prize, setPrize] = useState(null);
  const [rouletteData, setRouletteData] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const user2 = useUser();
  const userLogin = useUserLogin();
  const navigate = useNavigate();

  const colors = [
    "#746dadff",
    "#1eaad9ff",
    "#4ac4edff",
    "#f26a52ff",
    "#58bfa9ff",
    "#faad41ff",
    "#58bfa9ff",
  ];

  // Fetch puzzle details and merge with PrizedUser data
  const fetchPuzzleDetails = async (leaderboardData) => {
    try {
      const detailedLeaderboard = await Promise.all(
        leaderboardData.map(async (user) => {
          if (user.prize_id) {
            const prizeResponse = await api.get(`/prize/${user.prize_id}`);
            const prizeDetails = prizeResponse.data.data;

            return { ...user, prizeDetails };
          }
          return user;
        })
      );
      const rankedLeaderboard = detailedLeaderboard.sort(
        (a, b) => b.prizeDetails.price - a.prizeDetails.price
      );
      setLeaderboardData(rankedLeaderboard);
    } catch (error) {
      console.error("Error fetching puzzle details:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // const userResponse = await api.get("/user/" + user?.data?.user?._id);
        // const user = userResponse.data.data;
        // setSpinsLeft(user.prizeChance);
        setSpinsLeft(user2?.data?.user?.prizeChance);

        const prizeResponse = await api.get("/prize");
        const prizes = prizeResponse.data.data;
        const calculateFontSize = () => {
          const screenWidth = window.innerWidth;

          if (screenWidth >= 1200) {
            return 18;
          } else if (screenWidth >= 768) {
            return 16;
          } else {
            return 17;
          }
        };
        const formattedPrizes = prizes.map((prize, index) => ({
          option: prize.value,
          value: prize._id,
          // image: { uri: prize.image ,offsetX : 20,offsetY :20 , sizeMultiplier:0.6},
          style: {
            backgroundColor: colors[index % colors.length],
            textColor: "black",
            // fontSize: 14,
            fontSize: calculateFontSize(),
            fontWeight: 700,
            // font:bold,
          },
        }));

        setRouletteData(formattedPrizes);

        const leaderboardResponse = await api.get("/prize/PrizedUser");
        const leaderboardData = leaderboardResponse.data.data;

        fetchPuzzleDetails(leaderboardData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleSpinClick = async () => {
    try {
      const response = await api.post("/spin/prize", {
        userId: "670647442648a652d5ee2b0c",
      });
      const selectedPrize = response.data.data.prize;

      const prizeIndex = rouletteData.findIndex(
        (item) => item.value === selectedPrize._id
      );
      if (prizeIndex >= 0) {
        setPrizeNumber(prizeIndex);
        setMustSpin(true);
        setIsSpinning(true);
        setShowConfetti(false);
      }
      setPrize(selectedPrize);
    } catch (error) {
      console.error("Error spinning the prize:", error);
    }
  };

  const updateLeaderboard = async () => {
    try {
      const leaderboardResponse = await api.get("/prize/PrizedUser");
      const leaderboardData = leaderboardResponse.data.data;
      fetchPuzzleDetails(leaderboardData);
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowConfetti(false);
    navigate("/");
  };
  console.log(";;;;", leaderboardData);

  return (
    <div className="relative bg-black z-0 text-center py-8 flex items-center justify-center min-h-screen">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
        />
      )}

      <div
        className={`flex flex-col items-center justify-center w-full max-w-lg mx-auto px-4 md:px-8 transition-opacity ${
          isModalOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="mb-8 text-center">
          <p className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">
            Spin the Wheel
          </p>
          <p className="text-white text-sm md:text-md lg:text-lg">
            Take a chance and win big! Spin the wheel now.
          </p>
        </div>

        <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] mx-auto flex justify-center items-center">
          {rouletteData.length > 0 ? (
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={rouletteData}
              outerBorderColor={"#f5f5f5ff"}
              outerBorderWidth={8}
              radiusLineColor={"#000000"}
              radiusLineWidth={4}
              outerRadius={80}
              innerRadius={25}
              textColors={["#000"]}
              onStopSpinning={() => {
                setMustSpin(false);
                setIsSpinning(false);
                setShowConfetti(true);
                setIsModalOpen(true);
                updateLeaderboard();
              }}
            />
          ) : (
            <p className="text-white">Loading prizes...</p>
          )}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-[80px] sm:h-[100px] md:h-[120px] lg:h-[140px] bg-[#218f2cff] rounded-full z-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#4da355ff] font-bold text-sm sm:text-lg md:text-xl lg:text-2xl z-20">
            Spin Now
          </div>
        </div>

        <div className="mt-8  w-full  ">
          <div className=" flex justify-center mb-4 ">
            <button
              // disabled={loadding}
              onClick={handleSpinClick}
              className={`flex cursor-pointer w-[280px] items-center justify-center gap-2 border bg-[#ADE404] hover:bg-[#86ad0f] rounded-md px-20  py-[13px] text-black  text-md font-medium 
           
            }`}
            >
              <PiSpinnerBallDuotone size={24} />
              <p> Spin</p>
            </button>
          </div>
          <div className=" flex justify-center ">
            <button
              // disabled={loadding}
              onClick={() => setIsLeaderboardVisible(!isLeaderboardVisible)}
              className={`flex cursor-pointer w-[280px] items-center justify-center gap-2 border bg-[#ADE404] hover:bg-[#86ad0f] rounded-md px-10  py-[13px] text-black  text-md font-medium 
              
            }`}
            >
              {isLeaderboardVisible ? "Hide Leaderboard" : "Show Leaderboard"}
            </button>
          </div>

          {isLeaderboardVisible && (
            // <div className="max-h-[200px] overflow-y-scroll  bg-black rounded-md p-4">
            //   <Leaderboard leaderboardData={leaderboardData} />
            // </div>
            <div
              style={{
                overflowY: "scroll",
                maxHeight: "200px",
                scrollbarWidth: "thin",
                scrollbarColor: "white transparent", // Firefox
                p: 4,
              }}
            >
              <style>
                {`
      /* For Chrome, Safari, and Edge */
      ::-webkit-scrollbar {
        width: 12px;
      }

      ::-webkit-scrollbar-track {
        background: transparent; /* Transparent background */
      }

      ::-webkit-scrollbar-thumb {
        background-color: white; /* Color of the scroll thumb */
        border-radius: 20px; /* Roundness */
        border: 3px solid black; /* Padding around the thumb */
      }
    `}
              </style>

              <Leaderboard leaderboardData={leaderboardData} />
            </div>
          )}
        </div>
      </div>

      {!isSpinning && prize && (
        <Modal
          isOpen={isModalOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          className="bg-[#ADE404]  w-[60%]  p-3 lg:p-10  rounded-md shadow-md max-w-md mx-auto mt-20 relative z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        >
          <h2
            className="text-2xl font-bold text-center mb-4"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 20%, rgba(255,255,0,1) 40%, rgba(0,255,0,1) 60%, rgba(0,0,255,1) 80%, rgba(139,0,255,1) 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Congratulations!
          </h2>
          <p className="text-lg text-center mb-6 lg:mt-10">
            You won: <span className="font-bold">{prize.value}</span>
          </p>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-green-500 text-white px-6 py-2 lg:mt-12  rounded-md"
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SpinWheel;
