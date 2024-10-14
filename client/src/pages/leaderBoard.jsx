import React from "react";

const Leaderboard = ({ leaderboardData }) => {
  const maskPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.length <= 4) return phoneNumber;
  
    const firstTwo = phoneNumber.slice(0, 2); 
    const lastTwo = phoneNumber.slice(-2); 
    const middleSection = phoneNumber.slice(2, -2).replace(/\d/g, '*'); 
    
    return `${firstTwo}${middleSection}${lastTwo}`;
  };
  

  return (
    <div className="text-white flex flex-col justify-center items-center w-full mt-2">
      <h2 className="text-white font-bold text-2xl mb-6">Leaderboard</h2>
      <table className="table-auto text-white w-full max-w-lg">
        <thead>
          <tr className="border-b-2 border-white">
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Prize</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index} className="border-b border-gray-600">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{maskPhoneNumber(entry.phoneNumber)}</td>
              <td className="px-4 py-2">{entry.prizeDetails?.value || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
