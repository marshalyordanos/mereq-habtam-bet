import React, { useState } from "react";
import { Divider, Empty, Pagination, Radio, Table } from "antd";
import styled from "styled-components";

const CommonTable = React.memo(
  ({
    data,
    columns,
    rowSelectionType,
    setSelection,
    handlePagination,
    total,
    loadding,
    tableChange,
    type,
    scroll,
  }) => {
    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
      handlePagination(current, pageSize);
    };

    let rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        setSelection(selectedRows);
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: (record) => ({
        disabled: type,
        name: type ? "" : record?.name,
      }),
    };

    console.log("common table");

    return (
      <div className="mx-6 border-[1px] border-[#F0F0F0] rounded">
        <div className="common_table">
          <Table
            scroll={{ x: "full" }}
            rowSelection={{
              type: rowSelectionType,
              ...rowSelection,
            }}
            loading={loadding}
            rowKey={"_id"}
            locale={{
              emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
            }}
            columns={columns}
            dataSource={data}
            onChange={tableChange}
            pagination={false}
            className=" text-base"
          />
        </div>

        {type ? (
          ""
        ) : (
          <div className="flex justify-end py-4">
            <Pagination
              total={total}
              defaultPageSize={5}
              defaultCurrent={1}
              pageSizeOptions={["5", "10", "20"]}
              showSizeChanger={true}
              onChange={onShowSizeChange}
            />
          </div>
        )}
      </div>
    );
  }
);

export const TableStyle = styled.div`
  border: 1px solid whitesmoke;

  margin: 0 24px;
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  .common_table {
    width: 100%;
    overflow-x: auto;
  }
  .common_pagination {
    margin: 40px 15px;
    display: flex;
    justify-content: flex-end;
  }

  th {
    font-size: 15px;

    background-color: #fafafa !important;
  }

  tr {
    font-size: 15px;
  }

  tr:n {
    font-size: 15px;
    background-color: #ffffff;
  }
`;

export default CommonTable;
