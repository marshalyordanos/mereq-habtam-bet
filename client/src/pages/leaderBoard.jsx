// import React from "react";
// import { Carousel } from 'antd';
// import styled from 'styled-components';
// import { TrophyOutlined } from '@ant-design/icons';



// const Leaderboard = ({ leaderboardData }) => {
//   const maskPhoneNumber = (phoneNumber) => {
//     if (!phoneNumber || phoneNumber.length <= 4) return phoneNumber;
  
//     const firstTwo = phoneNumber.slice(0, 2); 
//     const lastTwo = phoneNumber.slice(-2); 
//     const middleSection = phoneNumber.slice(2, -2).replace(/\d/g, '*'); 
    
//     return `${firstTwo}${middleSection}${lastTwo}`;
//   };
  

//   return (
//     // <div className="text-white flex flex-col justify-center items-center w-full mt-2">
//     //   <h2 className="text-white font-bold text-2xl mb-6">Leaderboard</h2>
//     //   <table className="table-auto text-white w-full max-w-lg">
//     //     <thead>
//     //       <tr className="border-b-2 border-white">
//     //         <th className="px-4 py-2 text-left">Rank</th>
//     //         <th className="px-4 py-2 text-left">Phone</th>
//     //         <th className="px-4 py-2 text-left">Prize</th>
//     //       </tr>
//     //     </thead>
//     //     <tbody>
//     //       {leaderboardData.map((entry, index) => (
//     //         <tr key={index} className="border-b border-gray-600">
//     //           <td className="px-4 py-2">{index + 1}</td>
//     //           <td className="px-4 py-2">{maskPhoneNumber(entry.phoneNumber)}</td>
//     //           <td className="px-4 py-2">{entry.prizeDetails?.value || 'N/A'}</td>
//     //         </tr>
//     //       ))}
//     //     </tbody>
//     //   </table>
//     // </div>
//     <StyledCarousel autoplay>
//       <div>
//         <StyledItem>
//           <div className="amount">
//             <TrophyOutlined style={{color :""}}/>
//             entry.prizeDetails?.value </div>
//           <div className="phone">{maskPhoneNumber(entry.phoneNumber)}</div>
//         </StyledItem>
//       </div>
//       <div>
//         <StyledItem>
//           <div className="amount">
//             <TrophyOutlined style={{ color: '#FFD700' }} /> 30,000br
//           </div>
//           <div className="phone">+251932****45</div>
//         </StyledItem>
//       </div>
//       {/* Add more items as needed */}
//     </StyledCarousel>
//   );
// };

// export default Leaderboard;



import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import { TrophyOutlined } from "@ant-design/icons";

const Leaderboard = ({ leaderboardData }) => {
  console.log("[[[[[")
  const maskPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.length <= 4) return phoneNumber;

    const firstTwo = phoneNumber.slice(0, 2); // Get the first two digits
    const lastTwo = phoneNumber.slice(-2); // Get the last two digits
    const middleSection = phoneNumber.slice(2, -2).replace(/\d/g, "*"); // Mask middle digits

    return `${firstTwo}${middleSection}${lastTwo}`;
  };

  return (
    <StyledCarousel autoplay>
      {leaderboardData?.map((entry, index) => (
        <div key={index}>

          <StyledItem>
            <div className="amount">
              <TrophyOutlined style={{ color: "#FFD700" }} />
              {entry.prizeDetails?.value || "N/A"}
            </div>
            <div className="phone">{maskPhoneNumber(entry.phoneNumber)}</div>
          </StyledItem>
        </div>
      ))}
    </StyledCarousel>
  );
};

export default Leaderboard;

// Styled Components
const StyledCarousel = styled(Carousel)`
  width: 100%;
  .slick-dots li button {
    background-color: white;
  }
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;


const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: #333;
  font-size: 18px;

  .amount {
    font-weight: bold;
    color: #FFD700;
  }

  .phone {
    color: white;
    font-size: 18px;
    margin-left: 10px;
    font-weight : 500
  }

  .description {
    font-size: 14px;
    color: #888;
    margin-left: auto;
  }

  svg {
    font-size: 24px;
    margin-right: 5px;
  }
`;