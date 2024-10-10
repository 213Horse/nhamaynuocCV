import { Collapse, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import "./Payment.css";
import TableListPayment from "../../../components/TableListPayment/TableListPayment";
import TabList from "../../../components/TableListPayment/Tablist/Tablist";
import FormFilterPayment from "../../../components/TableListPayment/FormFilterPayment/FormFilterPayment";

function Payment() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  // Collapse filter
  const items = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: <FormFilterPayment />,
    },
  ];

  return (
    <div className="payment-wrapper">
      <Collapse
        key="1"
        items={items}
        accordion={false}
        defaultActiveKey={["1"]}
        style={{ marginBottom: "12px" }}
        size="small"
      />

      {/* Render table payment */}
      <TableListPayment />

      {/* func bottom */}
      <div className="contract-bottom">
        <div className="contract-bottom-func">
          {/* check mobile */}
          {isTabletOrMobile ? (
            <Popover
              rootClassName="fix-popover-z-index"
              placement="bottomRight"
              trigger="click"
              content={<TabList isTabletOrMobile={isTabletOrMobile} />}
            >
              <PlusOutlined />
            </Popover>
          ) : (
            <TabList />
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
