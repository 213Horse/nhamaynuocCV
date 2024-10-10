import { Collapse, Divider } from "antd";

import FormFilterRevenueMoney from "./FormFilterRevenueMoney/FormFilterRevenueMoney";
import Reporter from "../Reporter/Reporter";
import TableRevenueMoney from "./TableRevenueMoney/TableRevenueMoney";

function CustomerRevenueMoneyWater() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin khách hàng",
            children: <FormFilterRevenueMoney />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableRevenueMoney />
    </>
  );
}

export default CustomerRevenueMoneyWater;
