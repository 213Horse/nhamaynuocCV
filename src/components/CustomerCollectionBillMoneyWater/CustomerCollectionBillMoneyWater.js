import { Collapse, Divider } from "antd";

import FormFilterCollectionBill from "./FormFilterCollectionBill/FormFilterCollectionBill";
import Reporter from "../Reporter/Reporter";
import TableCollectionBill from "./TableCollectionBill/TableCollectionBill";

function CustomerCollectionBillMoneyWater() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin khách hàng",
            children: <FormFilterCollectionBill />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableCollectionBill />
    </>
  );
}

export default CustomerCollectionBillMoneyWater;
