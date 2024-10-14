import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Pagination, Table } from "antd";

const HomePage = () => {
  const [users, setUser] = useState([]);
  const [stat, setStat] = useState(null);

  useEffect(() => {
    featchStat();
    featchUser();
  }, []);
  const featchStat = async () => {
    try {
      const res = await api.get("/user/stat");
      console.log("Some stats: ", res.data);
      setStat(res.data?.data);
    } catch (error) {}
  };
  const featchUser = async () => {
    try {
      const res = await api.get("/user");
      console.log("Some Users: ", res.data);
      setUser(res.data?.data.users);
    } catch (err) {
      console.log(err);
    }
  };
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    // handlePagination(current, pageSize);
  };

  const columns = [
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (text, recored) => {
        return <p>{text}</p>;
      },
      sorter: true,
    },

    {
      title: "Spin Chance",
      dataIndex: "spinChance",
      sorter: true,
    },

    {
      title: "Prize Chance",
      dataIndex: "prizeChance",
      render: (text, recored) => <p>{text}</p>,
      sorter: true,
    },

    {
      title: "Number of Prize won",
      dataIndex: "prize_type",
      sorter: true,
      render: (text, recored) => <p>{recored?.userPrizes.length}</p>,
    },

    {
      title: "Number of Puzzles have with out rare",
      dataIndex: "prize_type",
      sorter: true,
      render: (text, recored) => <p>{recored?.userPuzzles.length}</p>,
    },
  ];
  return (
    <div>
      <div className="border rounded-lg max-w-[700px] text-white bg-gray-900 p-6">
        <div>
          <p className="text-lg ">Overview</p>
          <p className="font-light mt-2 text-gray-200">
            Visualize you main acitivityes data
          </p>
        </div>
        <div className="flex mt-5">
          <div className="border-r border-gray-600 w-[250px] py-3">
            <p className="text-gray-400 text-[15px] mb-2 font-light">
              Total Users
            </p>
            <p className="text-lg">{stat?.totalUsers}</p>
          </div>
          <div className="border-r border-gray-600 ml-6 w-[250px]  py-3">
            <p className="text-gray-400 text-[15px] mb-2  font-light">
              Total Left Prize
            </p>
            <p className="text-lg">{stat?.totalPrizeCount}</p>
          </div>
          <div className="border-r border-gray-600  ml-6 w-[250px] py-3">
            <p className="text-gray-400 text-[15px] mb-2 font-light">
              Total Won Prize
            </p>
            <p className="text-lg">{stat?.totalUserPrizes}</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <p className="text-2xl my-2 ">User List</p>
        <div className="h-[2px] bg-slate-300 mb-4"></div>
        <Table
          columns={columns}
          total={10}
          pagination={false}
          dataSource={users}
        />
      </div>
      <div className="flex justify-end py-4">
        <Pagination
          total={10}
          defaultPageSize={5}
          defaultCurrent={1}
          pageSizeOptions={["5", "10", "20"]}
          showSizeChanger={true}
          onChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

export default HomePage;
