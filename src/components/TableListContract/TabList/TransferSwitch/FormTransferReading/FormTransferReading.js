import { Collapse, Table } from "antd";
import { useState } from "react";

import FormFilterTransferReading from "./FormFilterTransferReading/FormFilterTransferReading";
import { dataContract } from "../../../../../utils/dataContract";
import FormUpdateReading from "./FormUpdateReading/FormUpdateReading";

function FormTransferReading({ hideModalTransferReading }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  //   console.log("selectedRowKeys", selectedRowKeys);

  // collapse
  const items = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: <FormFilterTransferReading />,
    },
  ];

  // cols table
  const cols = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
    },
    {
      key: "ttg",
      title: "TT ghi",
      dataIndex: "ttg",
    },
    {
      key: "tenKH",
      title: "Tên khách hàng",
      dataIndex: "tenKH",
    },
    {
      key: "soHopDong",
      title: "Số hợp đồng",
      dataIndex: "soHopDong",
    },
    {
      key: "maDongHo",
      title: "Mã đồng hồ",
      dataIndex: "maDongHo",
    },
    {
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      key: "trangThaiSuDung",
      title: "Trạng thái",
      dataIndex: "trangThaiSuDung",
    },
  ];

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <div>
      <Collapse
        key="1"
        items={items}
        defaultActiveKey={["1"]}
        style={{ margin: "3rem 0px" }}
        size="small"
      />

      {/* Table (Đồng hồ nước) */}
      <Table
        columns={cols}
        rowKey="index"
        dataSource={dataContract.map((_con, index) => ({
          index: index + 1,
        }))}
        onRow={(record, index) => {
          return {
            onClick: () => {
              const _selectedRowKeys = [...selectedRowKeys];

              if (_selectedRowKeys.indexOf(record.index) >= 0) {
                _selectedRowKeys.splice(
                  _selectedRowKeys.indexOf(record.index),
                  1
                );
              } else {
                _selectedRowKeys.push(record.index);
              }

              setSelectedRowKeys(_selectedRowKeys);
            },
          };
        }}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) =>
            handleRowSelection(selectedRowKeys, selectedRows),
          selectedRowKeys: selectedRowKeys?.length > 0 ? selectedRowKeys : [],
        }}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          x: 1200,
          y: 200,
        }}
      ></Table>

      {/* Form update (tuyến đọc) */}
      <FormUpdateReading hideModalTransferReading={hideModalTransferReading} />
    </div>
  );
}

export default FormTransferReading;
