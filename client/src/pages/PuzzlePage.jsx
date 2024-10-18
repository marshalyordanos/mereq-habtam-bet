import React, { useEffect, useState } from "react";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import styled from "styled-components";
import api from "../api";
import AssetMain from "../assets/Asset_18.svg";
import AssetOne from "../assets/Asset_19.png";
import AssetTwo from "../assets/Asset_20.png";
import AssetThree from "../assets/Asset_21.png";
import AssetFour from "../assets/Asset_22.png";
import AssetFive from "../assets/Asset_23.png";
import AssetSix from "../assets/Asset_24.png";
import AssetSeven from "../assets/Asset_25.png";
import AssetEigth from "../assets/Asset_26.png";
import AssetNine from "../assets/Asset_27.png";
import CustomModal from "../compoents/CustomModal";
import { Button, message, Spin } from "antd";
import { useUser, useUserLogin } from "../userContex";
import { NavLink } from "react-router-dom";
import Leaderboard from "./leaderBoard";
// Array of assets for the puzzle pieces
const assets = [
  AssetOne,
  AssetTwo,
  AssetThree,
  AssetFour,
  AssetFive,
  AssetSix,
  AssetSeven,
  AssetEigth,
  AssetNine,
];

const PuzzlePage = () => {
  const user = useUser();
  const userLogin = useUserLogin();
  console.log("user", user);
  const [loadingSpin, setLoadingSpin] = useState(false);
  // console.log("user", user);

  // const numbers = ["H", "A", "B", "T", "A", "M", "B", "E", "T"];
  const [numbers, setNumbers] = useState([]);
  const [wonPuzles, wonPuzzles] = useState([{ count: 0, id: 1 }]);
  const [openModal, setOpenModal] = useState(false);
  const [openPrizeModal, setOpenPrizeModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [roundsLeft, setRoundsLeft] = useState(2);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [ind, setInds] = useState(null);
  const [phone, setPhone] = useState("");
  const [loadding, setLoading] = useState(false);
  const [prizesData, setPrizesData] = useState([]); 
  const [loadingPrizes, setLoadingPrizes] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLeaderboardVisible , setIsLeaderboardVisible] = useState(true);

  const [getPuzzle, setGetPuzzle] = useState(false);

  useEffect(() => {
    // setLoadingSpin(false);

    featchUserPuzzle();
  }, [user]);
  const featchUserPuzzle = async () => {
    //http://localhost:8000/api/v1/
    try {
      setLoading(true);
      if (user) {
        const res = await api.get(`/puzzle/user/` + user?.data?.user?._id);
        console.log("data", res.data?.data);
        setNumbers(res.data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchPuzzleDetails = async (leaderboardData) => {
    try {
      const detailedLeaderboard = await Promise.all(
        leaderboardData.map(async (user) => {
          if (user.prize_id) {
            const prizeResponse = await api.get(`/prize/${user.prize_id}`);
            const prizeDetails = prizeResponse.data.data;
            console.log("hhhh", prizeDetails);

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
         
      
        const leaderboardResponse = await api.get("/prize/PrizedUser");
        const leaderboardData = leaderboardResponse.data.data;

        fetchPuzzleDetails(leaderboardData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);




  
  const fetchUserPrize = async () => {
    try {
      
      (true); // Start loading
      if (user) {
        const res = await api.get(`/prize/history/` + user?.data?.user?._id);
        console.log("datwwwa", res.data?.data);
        setPrizesData(res.data?.data); // Store prizes in state
        // setOpenPrizeModal(true); // Open the modal after fetching data
      }
      setLoadingPrizes(false); // Stop loading
    } catch (error) {
      // 
      setLoadingPrizes(false);
      (false);
      console.log(error);
    }
  };
  useEffect(() => {
    // setLoadingSpin(false);

    featchUserPuzzle();
    fetchUserPrize();
  }, [user]);



  const featchPice = async () => {
    const res = await api.get(`/puzzle?page=${1}&limit=${9}`);
    console.log("data", res.data?.data);
    setNumbers(res.data?.data);
  };
  const spinApiHandler = async () => {
    setLoadingSpin(true);

    try {
      const res = await api.post(`/spin`, {
        userId: user?.data?.user?._id,
      });
      console.log("spin num:", res.data?.piece.name);
      handleSpin(res.data?.piece?.name);
      if (res.data?.message) {
        window.location.reload();
      }
      setLoadingSpin(false);
    } catch (error) {
      if (error.response.data.message) {
        message.error(error.response.data.message);
      }
      setLoadingSpin(false);

      console.log(error);
    }
  };
  const handleSpin = (name) => {
    const totalSpins = 2 * numbers.length; // Total spins to perform
    let spinCount = 0;
    const puzzleObj = {
      one: 0,
      two: 1,
      three: 2,
      four: 3,
      five: 4,
      six: 5,
      seven: 6,
      eight: 7,
      nine: 8,
    };
    let x = 9 - puzzleObj[name];

    const spinInterval = setInterval(() => {
      if (spinCount < totalSpins) {
        setActiveIndex(numbers[spinCount % numbers.length]); // Cycle through numbers
        if (totalSpins - x == spinCount) {
          clearInterval(spinInterval);
          setActiveIndex(numbers[spinCount % numbers.length]); // Cycle through numbers
          const d = numbers.map((number) => {
            if (numbers[spinCount % numbers.length]?.id == number.id) {
              console.log("5555555555555555555555");
              return { ...number, count: number.count + 1 };
            }
            return number;
          });
          setInds(spinCount % numbers.length);
          setGetPuzzle(true);
          setNumbers(d);
          console.log("d: ", d);
          setLoading(false);
          userLogin({
            ...user,
            data: {
              ...user?.data,
              user: {
                ...user?.data?.user,
                spinChance: user?.data?.user?.spinChance - 1,
              },
            },
          });
          return;
        }
        spinCount++;
      } else {
        clearInterval(spinInterval);
        setActiveIndex(null); // Reset after spinning
        setRoundsLeft((prev) => prev - 1); // Decrement rounds left
      }
    }, 300);
  };
  const handleShare = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/sharing`, {
        phoneNumber: phone,
        puzzleId: selectedPuzzle.id,
        userId: user?.data?.user?._id,
      });

      console.log("spin num:", res.data);
      const x = numbers.map((number) => {
        if (number.id == res.data?.data?.sharedPuzzle?.puzzle_id) {
          return { ...number, count: number.count - 1 };
        }
        return number;
      });
      setNumbers(x);
      setOpenModal(false);
      // setOpenPrizeModal(false);
      message.success(res.data?.message);
    } catch (error) {
      if (error.response.data.message) {
        message.error(error.response.data.message);
      }
      console.log(error);
    }
  };
  console.log("][[[",leaderboardData)
  return (
    <Container className="text-white ] flex flex-col justify-center items-center w-full  ">
      {openModal && (
        <CustomModal
          setInd={setInds}
          setSelectedPuzzle={setSelectedPuzzle}
          openModal={openModal}
          setOpenModal={setOpenModal}

        >
          <div class="z-50 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Do you want to share this puzzle pice?
              </h5>
            </a>
            <div className="flex justify-center mb-10">
              {ind}
              {ind != null && (
                <img
                  style={{
                    height: 100,
                    width: 100,
                    objectFit: "contain",
                  }}
                  // className={` opacity-[0.1] hover:opacity-1 `}
                  src={assets[ind]}
                  alt=""
                />
              )}
            </div>
            <form onSubmit={handleShare}>
              <div className="mb-5">
                <label
                  for="phone"
                  class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  type="tel"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0998765432"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-[#ace403] rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </CustomModal>
      )}
    {openPrizeModal && (
        <CustomModal
          openPrizeModal={openPrizeModal}
          setOpenPrizeModal={setOpenPrizeModal}
        >
          {/* Adjusting the width of the modal and labeling prize name & status */}
          <div className="z-50 w-[500px] p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Prizes
            </h5>
            {loadingPrizes ? (
              <Spin />
            ) : (
              <>
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-left text-gray-400">
                      <th className="px-4 py-2">Prize Name</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prizesData.length > 0 ? (
                      prizesData.map((prize, index) => (
                        <tr
                          key={index}
                          className="border-t border-gray-600 text-gray-300"
                        >
                          <td className="px-4 py-2">{prize.prizeName}</td>
                          <td className="px-4 py-2">{prize.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="px-4 py-2 text-center">
                          No prizes found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Button
                  onClick={() => setOpenPrizeModal(false)} // Close the modal when clicked
                  className="mt-4"
                  type="primary"
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </CustomModal>
      )}

      {getPuzzle && (
        <CustomModal
          setInd={setInds}
          openModal={getPuzzle}
          setOpenModal={setGetPuzzle}
        >
          <div class="z-50 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                You won this puzzle?
              </h5>
            </a>
            <div className="flex justify-center mb-10">
              {ind}
              {ind != null && (
                <img
                  style={{
                    height: 100,
                    width: 100,
                    objectFit: "contain",
                  }}
                  // className={` opacity-[0.1] hover:opacity-1 `}
                  src={assets[ind]}
                  alt=""
                />
              )}
            </div>
          </div>
        </CustomModal>
      )}
      <div className="max-w-[360px]   flex flex-col justify-center text-center items-center mt-10 ">
        <p className="text-white font-black text-2xl">Puzzle</p>
        {/* <div className="bg-white">
          <img className=" absolute  border z-30" src={AssetMain} />
        </div> */}
        <p className="">Play our puzzle game and win exciting prizes!</p>
  
        <div className="flex justify-start align-start w-full mt-4">
  <Button
    className="spin-btn bg-[#ace403] text-black"
    type="primary"
    onClick={() => {
      setOpenPrizeModal(true);
    }}
  >
    Prizes
  </Button>
</div>

    
        
        <div className="mb-10"></div>
        {/* <div className=" border h-72 w-72 mt-10 rounded-lg"></div> */}
        {loadding ? (
          <div className="p-16">
            <Spin />
          </div>
        ) : (
          <div className="flex relative justify-center items-center    ">
            <div className="flex flex-wrap  max-w-[320px]">
              {numbers?.map((number, i) => (
                <div
                  style={{
                    marginLeft:
                      i == 1
                        ? -14
                        : i == 2
                        ? -16
                        : i == 4
                        ? -14
                        : i == 5
                        ? -16
                        : i == 7
                        ? -15
                        : i == 8
                        ? -15
                        : 0,
                    marginTop:
                      i == 1
                        ? -1
                        : i == 2
                        ? -2
                        : i == 3
                        ? -23
                        : i == 4
                        ? -23
                        : i == 5
                        ? -25
                        : i == 6
                        ? -20
                        : i == 7
                        ? -20
                        : i == 8
                        ? -23
                        : 0,

                    height: i == 1 ? 100 : i == 2 ? 100 : 96,
                    width:
                      i == 1
                        ? 110
                        : i == 2
                        ? 110
                        : i == 4
                        ? 125
                        : i == 7
                        ? 110
                        : i == 8
                        ? 110
                        : 96,
                    // backgroundColor: activeIndex === i && "#ace403",
                    // color: activeIndex === i && "black",
                  }}
                  key={number._id}
                  className={`flex justify-center  items-center  text-2xl font-bold ${
                    activeIndex?.id === number.id ? "active" : ""
                  }}`}
                  // className="bg-white"
                >
                  <img
                    style={{
                      opacity:
                        activeIndex?.id === number.id
                          ? 1
                          : number.count !== 0
                          ? 0.7
                          : 0.2,
                    }}
                    className="w-full  opacity-[0.5] h-full  object-contain"
                    width={100}
                    height={100}
                    src={assets[i]}
                    alt=""
                  />
                  {/* <p>{i}</p> */}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10">
          {user?.data?.user?.prizeChance > 0 ? (
            <NavLink
              to={"/SpinWheel"}
              className={`flex cursor-pointer items-center gap-2 border rounded-md px-20  py-[13px] text-black  text-md font-medium ${
                loadding ? "inactive_btn" : "active_btn"
              }`}
            >
              Collect Prize
            </NavLink>
          ) : (
            <Button
              disabled={loadingSpin}
              onClick={spinApiHandler}
              className={`flex cursor-pointer  items-center gap-2 border rounded-md px-20  py-[13px] text-black  text-md font-medium ${
                loadingSpin ? "inactive_btn" : "active_btn"
              }`}
              type="primary"
              size="small"
              loading={loadingSpin}
            >
              <PiSpinnerBallDuotone size={24} />
              <p> Sipn</p>
              Loading
            </Button>
          )}

          <p className="text-sm mt-2">
            You Have to {user?.data?.user?.spinChance} spin left
          </p>
        </div>
        <div>
          <div className="max-w-[360px] mb-24 md:mb-10   mt-4">
          {isLeaderboardVisible && (
            // <div className="max-h-[200px] overflow-y-scroll  bg-black rounded-md p-4">
            //   <Leaderboard leaderboardData={leaderboardData} />
            // </div>
            <div
              style={{
                // overflowY: "scroll",
                // maxHeight: "200px",
                // scrollbarWidth: "thin",
                // scrollbarColor: "white transparent", // Firefox
                // p: 4,
              }}
            >
             
              <Leaderboard leaderboardData={leaderboardData} />
            </div>
          )}
          
            <p className="font-bold mt-10">Puzzle Pieces</p>
            <div className="flex mt-5 overflow-auto  bg-[#404040]">
              {numbers?.map((number, i) => (
                <div
                  onClick={() => {
                    if (number?.count > 0) {
                      setSelectedPuzzle(number);
                      setInds(i);
                      setOpenModal(true);
                    }
                  }}
                  key={number?._id}
                  className=" p-3   "
                >
                  <div className="relative  w-[70px] h-[70px]   ">
                    <span className="  z-20 absolute right-[-15px] top-[-4px] inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {number.count}
                    </span>
                    {number.name == "five" && (
                      <span className="  z-20 absolute left-[15px] bottom-[-10px] inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {"rare"}
                      </span>
                    )}
                    <img
                      style={{
                        height: 70,
                        width: 70,
                        opacity: number.count !== 0 ? 9 : 0.3,
                        objectFit: "contain",
                      }}
                      // className={` opacity-[0.1] hover:opacity-1 `}
                      src={assets[i]}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  .active {
    background-color: #ace403;
    color: black;
  }
  .active_btn {
    background-color: #ace403;
    color: black;
  }
  .inactive_btn {
    background-color: #e3e3e3;
    color: black;
  }
`;
export default PuzzlePage;
