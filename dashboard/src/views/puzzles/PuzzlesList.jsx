import React, { useEffect, useRef, useState } from "react";
import CommonTable from "../../components/commons/CommonTable";
import { MoreOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Select } from "antd";
import styled from "styled-components";
import CommonModal from "../../components/commons/CommonModel";

import puzzlesService from "./PuzzlesService";
import PuzzlesEdit from "./PuzzlesEdit";
import { NavLink, useSearchParams } from "react-router-dom";
//import { HeaderStyle, SearchInputStyle } from '../../components/commons/CommonStyles';
import CommonDeleteModal from "../../components/commons/CommonDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPuzzles,
  updatePuzzlesState,
  puzzlesSearchText,
} from "./PuzzlesRedux";

const PuzzlesList = () => {
  const [puzzlesData, setPuzzlesData] = useState([]);
  const [total, setTotal] = useState();

  const searchText = useSelector(puzzlesSearchText);
  const [loading, setLoading] = useState();
  const [puzzlesSelection, setPuzzlesSelection] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [modeID, setModeID] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const delayTimerRef = useRef(null);
  const dispatch = useDispatch();

  const getPaginationInfo = () => {
    return [searchParams.get("page") || 1, searchParams.get("limit") || 5];
  };

  useEffect(() => {
    const [page, limit] = getPaginationInfo();
    dispatch(updatePuzzlesState({ page: page, limit: limit }));
    // setSearchParams({ ...Object.fromEntries(searchParams), 'searchText': e.target.value })
    searchData();
  }, []);

  async function searchData() {
    try {
      setLoading(true);
      const { payload } = await dispatch(searchPuzzles());
      setPuzzlesData(payload.data);
      setTotal(payload.total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const searchHandler = (e) => {
    const { value } = e.target;
    const [page, limit] = getPaginationInfo();

    // setSearchParams({ page: page, limit: limit })
    dispatch(
      updatePuzzlesState({ page: page, limit: limit, searchText: value })
    );
    clearTimeout(delayTimerRef.current);
    delayTimerRef.current = setTimeout(() => {
      searchData();
    }, 500);
  };

  const handlePagination = async (page, pageSize) => {
    // permmission exmple

    // if (!(await authService.checkPermmision('puzzles', 'read'))) {
    //     return message.error('You have not a permmission');
    // }

    setSearchParams({ page: page, limit: pageSize });
    dispatch(updatePuzzlesState({ page: page, limit: pageSize }));

    searchData();
  };

  const tableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    dispatch(updatePuzzlesState({ sort: field, order: order }));

    searchData();
  };

  const handleReload = () => {
    const [page, limit] = getPaginationInfo();

    setSearchParams({ page: 1, limit: 5 });
    dispatch(
      updatePuzzlesState({
        page: 1,
        limit: 5,
        sort: "",
        order: "",
        searchText: "",
      })
    );
    searchData();
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const data = await puzzlesService.deletePuzzle(modeID);
      setIsDeleteModalOpen(false);

      searchData();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onClick = ({ key }, record) => {
    if (key == "edit") {
      setIsModalOpen(true);
    } else if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const items = [
    {
      key: "edit",
      label: <Button type="text">Edit</Button>,
    },
    {
      key: "delete",
      label: <Button type="text"> Delete</Button>,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  const columns = [
    // {
    //   title: " ",
    //   dataIndex: "action",
    //   render: (_, recored) => {
    //     return (
    //       <Dropdown
    //         menu={{
    //           items,
    //           onClick: (value) => onClick(value, recored),
    //         }}
    //         trigger={["click"]}
    //         placement="bottomLeft"
    //       >
    //         <Button
    //           type="text"
    //           icon={<MoreOutlined style={{ fontSize: 20 }} />}
    //           onClick={() => {
    //             setModeID(recored._id);
    //           }}
    //         ></Button>
    //       </Dropdown>
    //     );
    //   },
    // },

    {
      title: "Name",
      dataIndex: "name",
      render: (text, recored) => {
        return (
          <NavLink
            style={{ color: "#2f1dca" }}
            state={recored}
            to={`${recored._id}`}
          >
            {text}
          </NavLink>
        );
      },
      sorter: true,
    },

    {
      title: "is_rare",
      dataIndex: "is_rare",
      render: (text, recored) => {
        return recored.is_rare ? <p>true</p> : <p>false</p>;
      },
    },
  ];

  return (
    <div>
      {isModalOpen ? (
        <CommonModal
          width={1000}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        >
          <PuzzlesEdit
            puzzlesData={puzzlesData}
            searchData={searchData}
            setMode={setModeID}
            mode={modeID}
            isModelOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </CommonModal>
      ) : (
        ""
      )}

      {isDeleteModalOpen ? (
        <CommonDeleteModal
          setIsModalOpen={setIsDeleteModalOpen}
          handleDelete={handleDelete}
          loading={loading}
          isModalOpen={isDeleteModalOpen}
        >
          <h1 className=" text-2xl">Are you sure?</h1>
        </CommonDeleteModal>
      ) : (
        ""
      )}

      <span className="flex md:flex-row flex-col justify-between items-start md:items-end borde border-rose-700">
        <div className="flex flex-col p-6 md:w-[45vw] w-full">
          <h1 className="text-2xl font-bold pb-4">Puzzless</h1>
          <div className="flex">
            {/* <Input
              onChange={searchHandler}
              placeholder="Search"
              value={searchText}
              allowClear
              style={{ borderRadius: "0px 0px 0px 0px" }}
              className=" drop-shadow-sm rounded-r py-[0.55rem]"
            /> */}
            <div className="hover:border-[#4096FF] transition-all delay-75 ease-in hover:border border-y-[0.5px] py-[0.15rem] border-r-[0.5px] rounded-r-[8px] border-[#CCCCCC] searchSelect"></div>
          </div>
        </div>
        <span className="flex ml-6 mb-6 md:mr-6">
          <button
            onClick={handleReload}
            className="
             border border-green-600 py-2 px-3
             text-green-600 rounded mr-4 flex items-center justify-center"
          >
            <ReloadOutlined className=" boder boder-red-900" />
          </button>

          {/* <button
            className="px-4  py-2 border border-green-600 
            text-white bg-green-600 rounded"
            onClick={() => {
              setIsModalOpen(true);
              setModeID("");
            }}
          >
            <span className="flex flex-row">
              <PlusOutlined />
              <p className="pl-2">Add Item</p>
            </span>
          </button> */}
        </span>
      </span>

      <CommonTable
        rowSelectionType={"checkbox"}
        data={puzzlesData}
        columns={columns}
        setSelection={setPuzzlesSelection}
        handlePagination={handlePagination}
        total={total}
        loadding={loading}
        tableChange={tableChange}
      />
    </div>
  );
};

export default PuzzlesList;
