import React, { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSubscriptionState } from "../../views/home/subscriptionReducer";

const SubscriptionsCard = ({
  id,
  tier,
  type,
  features,
  jobsRemaining,
  noOfJobs,
}) => {
  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle the expand/collapse state
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false); // Toggle for collapsible feature
  const handleViewJobs = async () => {
    navigate(`/jobs/${id}`);
  };
  return (
    <div className="max-w-md p-6 rounded-lg shadow-lg bg-white border border-gray-200">
      {/* Tier and Type */}
      <div className="flex items-center justify-between">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">{tier}</h2>
          <p className="text-sm text-gray-600">{type}</p>
        </div>

        {/* Jobs Remaining */}
        <div className="text-lg font-medium text-green-600 mb-4">
          <span>Total jobs: </span>
          {noOfJobs}
        </div>
      </div>
      {/* Features List */}
      {/* Collapsible Features List */}
      <div className="mb-6">
        <button
          onClick={toggleExpand}
          className="flex items-center justify-between w-full text-left focus:outline-none">
          <span className="text-lg font-medium text-gray-900">Features</span>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Collapsible List */}
        {isExpanded && (
          <ul className="mt-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center mb-2">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="border-b pb-4 mb-4 text-center">
        <p className="text-sm text-gray-500">
          You have {jobsRemaining} applications remaining with your
          subscription.
        </p>
      </div>
      <div className="flex justify-en space-x-4 mt-4">
        {/* View Jobs Button */}
        <button
          onClick={handleViewJobs}
          className="bg-[#168A53] text-white px-4 py-2 
           hover:bg-[#168A53] transition">
          View
        </button>

        {/* Manage Subscription Button */}
        {/* <button
          // onClick={handleManageSubscription}
          className="bg-white text-[#168A53] border border-[#168A53] px-4 py-2  hover:bg-gray-600 transition">
          Manage
        </button> */}
      </div>
    </div>
  );
};

export default SubscriptionsCard;
