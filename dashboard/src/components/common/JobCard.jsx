import React from "react";
import { FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Avatar, Rate } from "antd";
TimeAgo.addDefaultLocale(en);

const JobCard = ({
  createdAt,
  applications,
  daysRemaining,
  gainPercentage,
  clientName,
  clientProfile,
}) => {
  return (
    <div className="max-w-sm p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition-transform hover:shadow-xl duration-300">
      {/* Job Information */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Job Application
        </h3>
        <p className="text-gray-500 text-sm">
          Posted{" "}
          <ReactTimeAgo
            date={new Date(createdAt)}
            locale="en-US"
            className="text-gray-500"
          />{" "}
        </p>
      </div>

      {/* Applications and Gain Percentage */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-900">
            {applications} Job Applications
          </p>
          <p className="text-gray-600 font-medium text-sm">
            Gain: {gainPercentage}
          </p>
        </div>
      </div>
      <div className="flex items-center mb-4">
        {" "}
        <FaCalendarAlt className="text-[#168A53] mr-2" size={20} />
        <p className="text-gray-700 text-sm">
          Complete within {daysRemaining} days
        </p>
      </div>

      {/* Client Information */}
      <div className="flex items-center mb-4">
        <Avatar
          // size={40}
          src={clientProfile}
          alt={clientName}
          className="mr-2"
        />
        <div>
          <p className="text-gray-900 font-semibold text-g">{clientName}</p>
          <Rate
            style={{ color: "#168A53", fontSize: "15px" }}
            allowHalf
            disabled
            defaultValue={4.5}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button className="bg-[#168A53] text-white font-medium py-2 px-6 rounded-d hover:bg-[#0e6b41] transition duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
