import { motion } from "framer-motion";
import ClockChangeEffect from "./ClockChangeEffect";
import { BiCheckCircle } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CheckOutlined } from "@ant-design/icons";
import { Badge, Space } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// const SquishyCard = () => {
//   return (
//     <section className="bg-neutral-900 px-4 py-12">
//       <div className="mx-auto w-fit">
//         <Card />
//       </div>
//     </section>
//   );
// };

const PricingCard = ({
  id,
  tier,
  type,
  amount,
  description = [],
  mode,
  recommended = false,
  jobLimit,
  isFixed,
  subInfo,
}) => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleCheckOut = (id) => {
    let data;
    data = {
      subInfo: subInfo,
      userId: user?.id,
      subscriptionPricingId: id,
      jobLimit: jobLimit,
      amount: amount,
      expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      isFixed: isFixed,
    };
    navigate("/checkout", { state: data }); // navigate with state
  };
  return recommended ? (
    <div className="flex flex-col items-center bg-white justify-center">
      <motion.div
        whileHover="hover"
        initial={{ scale: 1.05 }}
        transition={{
          duration: 1,
          ease: "backInOut",
        }}
        variants={{
          hover: {
            scale: 1.1,
          },
        }}
        className={`relative h-[26rem] bg-white w-[20rem] shrink-0
      
       rounded-xl bg-[168A53] border-x-[1.5px] border-t-[1.5px] border-b-[8px] scale-105 flex flex-col justify- items- border-black text- `}>
        <div className="border- border-green-900 flex items-end justify-end w-full px-6">
          <p className="text-center rounded w-[10rem] self-center borde border-red-900  bg-black text-white px- ik pt-1 pb-2 z-[9999] mt-[-1.2rem] ">
            Recommended
          </p>
        </div>
        <div className="relative z-10 text-white p-8">
          <span
            className="mb-3 block w-fit 
        rounded-full bg-gray-20 px- py-0.5 text-s 
        font-black text-2xl text-black">
            {tier}
          </span>
          <motion.span
            initial={{ scale: 1.05 }}
            variants={{
              hover: {
                scale: 1.1,
              },
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            className="my-2 block borde border-red-900 overflow-hidden text-black origin-top-left font-robo
            leading-[1.2]">
            <ClockChangeEffect amount={amount} type={type} />

            {/* <br /> */}
          </motion.span>
          <p className="text-black"></p>

          <ul>
            {description.map((des) => (
              <li className="flex items-center text-black mb-2">
                <CheckOutlined className="w- text-l mr-2 " />
                <p>{des}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => handleCheckOut(id)}
          className="absolute bottom-4 left-4 right-4 z-20
       rounded
        hover:border-2 hover:border-black bg-black py-2
         text-center font-organetto font-black uppercase
          text-white backdrop-blur transition-colors
           hover:bg-white/30 hover:text-black">
          Get it now
        </button>
      </motion.div>
    </div>
  ) : (
    <div className="flex flex-col mt- rounded-xl bg-white">
      <motion.div
        whileHover="hover"
        transition={{
          duration: 1,
          ease: "backInOut",
        }}
        variants={{
          hover: {
            scale: 1.05,
          },
        }}
        className={`relative h-[28rem] w-[20rem] shrink-0
       overflow-hidden
       rounded-xl bg-[168A53] bg-white border-[1.5px] border-gray-300 text- p-8`}>
        <div className="relative z-10 text-white">
          <span
            className="mb-3 block w-fit 
        rounded-full bg-gray-20 px- py-0.5 text-s 
        font-black text-2xl text-black">
            {tier}
          </span>
          <motion.span
            initial={{ scale: 0.85 }}
            variants={{
              hover: {
                scale: 1,
              },
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            className="my-2 block borde border-red-900 overflow-hidden text-black origin-top-left font-robo
            leading-[1.2]">
            <ClockChangeEffect amount={amount} type={type} />

            {/* <br /> */}
          </motion.span>
          <p className="text-black"></p>

          <ul>
            {description.map((des) => (
              <li className="flex items-center text-black mb-2">
                <CheckOutlined className="w- text-l mr-2 " />
                <p>{des}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => handleCheckOut(id)}
          className="absolute bottom-4 left-4 right-4 z-20
       rounded
        hover:border-2 hover:border-black bg-black py-2
         text-center font-organetto font-black uppercase
          text-white backdrop-blur transition-colors
           hover:bg-white/30 hover:text-black">
          Get it now
        </button>
      </motion.div>
    </div>
  );
};
const handleMode = (mode) => {
  switch (mode) {
    case "star":
      return <StarBackground />;
    case "hexagon":
      return <HexagonBackground />;
    case "square":
      return <SquareBackground />;
    case "diamond":
      return <DiamondBackground />;
    default:
      return <Background />;
  }
};
const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}>
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};
const SquareBackground = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}>
      <motion.rect
        variants={{
          hover: {
            scale: 1.2,
            rotate: 10,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        x="60"
        y="80"
        width="200"
        height="200"
        fill="#262626"
      />
      <motion.rect
        variants={{
          hover: {
            scale: 0.8,
            rotate: -10,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        x="100"
        y="120"
        width="120"
        height="120"
        fill="#262626"
      />
    </motion.svg>
  );
};
const HexagonBackground = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}>
      <motion.polygon
        variants={{
          hover: {
            scale: 1.2,
            rotate: 15,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        points="160,40 230,100 230,180 160,240 90,180 90,100"
        fill="#262626"
      />
      <motion.polygon
        variants={{
          hover: {
            scale: 0.8,
            rotate: -15,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        points="160,80 200,120 200,160 160,200 120,160 120,120"
        fill="#262626"
      />
    </motion.svg>
  );
};
const StarBackground = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}>
      <motion.polygon
        variants={{
          hover: {
            scale: 1.2,
            rotate: 30,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        points="160,10 185,105 280,105 200,160 225,255 160,200 95,255 120,160 40,105 135,105"
        fill="#262626"
      />
      <motion.polygon
        variants={{
          hover: {
            scale: 0.8,
            rotate: -30,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        points="160,30 175,85 230,85 185,125 200,175 160,140 120,175 135,125 90,85 145,85"
        fill="#262626"
      />
    </motion.svg>
  );
};
const DiamondBackground = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}>
      <motion.polygon
        variants={{
          hover: {
            rotate: 45,
            scale: 1.2,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        points="160,10 310,160 160,310 10,160"
        fill="#262626"
      />
      <motion.polygon
        variants={{
          hover: {
            rotate: -45,
            scale: 0.8,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        points="160,50 270,160 160,270 50,160"
        fill="#262626"
      />
    </motion.svg>
  );
};
export default PricingCard;
