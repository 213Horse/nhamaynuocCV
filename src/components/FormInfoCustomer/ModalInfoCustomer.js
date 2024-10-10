import { Button, Collapse, Row } from "antd";
import React from "react";
import FormInfoContract from "./FormInfoContract";
import TableInfoClock from "./TableInfoClock";
import { CloseOutlined, FileAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { btnClickTabListContractSelector } from "../../redux/selector";
import { fetchApiGetByIdCustomer } from "../../redux/slices/customerSlice/customerSlice";

function ModalInfoCustomer({ formModalInfoCustomer, hideModal }) {
  const dispatch = useDispatch();

  // get from redux
  // const customers = useSelector(setListCustomerSelector);
  const tabList = useSelector(btnClickTabListContractSelector);

  const handleRowSelectedFromOptionNameCustomer = () => {
    tabList && dispatch(fetchApiGetByIdCustomer(tabList.keyId)); // get info customer -> load to fields //dispatch(fetchApiGetWaterClock(tabList.keyId));
    hideModal();
  };

  // collapse
  const items = [
    {
      key: "1",
      label: "Thông tin hợp đồng",
      children: (
        <FormInfoContract formModalInfoCustomer={formModalInfoCustomer} />
      ),
    },
    {
      key: "2",
      label: "Thông tin đồng hồ",
      children: <TableInfoClock tabList={tabList} />,
    },
  ];

  return (
    <>
      <Collapse
        key="1"
        items={items}
        defaultActiveKey={["1", "2"]}
        style={{ margin: "12px 0px" }}
        size="small"
      />
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          style={{
            marginLeft: "10px",
          }}
          icon={<FileAddOutlined />}
          className="custom-btn-reset-d"
          onClick={handleRowSelectedFromOptionNameCustomer}
        >
          Chọn
        </Button>
        <Button
          style={{
            marginLeft: "10px",
          }}
          icon={<CloseOutlined />}
          className="custom-btn-close-d"
          onClick={() => {
            hideModal();
          }}
        >
          Đóng
        </Button>
      </Row>
    </>
  );
}

export default ModalInfoCustomer;
