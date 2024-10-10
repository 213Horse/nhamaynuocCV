import { Collapse, Divider } from "antd";

import FormFilterOweMoney from "./FormFilterOweMoney/FormFilterOweMoney";
import Reporter from "../Reporter/Reporter";
import TableOweMoney from "./TableOweMoney/TableOweMoney";

function CustomerOweMoneyWater() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin khách hàng",
            children: <FormFilterOweMoney />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableOweMoney />
    </>
  );
}

export default CustomerOweMoneyWater;
