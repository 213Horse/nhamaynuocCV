import { Collapse, Divider } from "antd";

import Reporter from "../Reporter/Reporter";
import FormFilterConsumptionLarge from "./FormFilterConsumptionLarge/FormFilterConsumptionLarge";
import TableConsumptionLarge from "./TableConsumptionLarge/TableConsumptionLarge";

function CustomerConsumptionLarge() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <FormFilterConsumptionLarge />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableConsumptionLarge />
    </>
  );
}

export default CustomerConsumptionLarge;
