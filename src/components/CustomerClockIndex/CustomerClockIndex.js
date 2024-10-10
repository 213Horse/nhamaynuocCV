import { Collapse, Divider } from "antd";

import FormFilterClockIndex from "./FormFilterClockIndex/FormFilterClockIndex";
import Reporter from "../Reporter/Reporter";
import TableClockIndex from "./TableClockIndex/TableClockIndex";

function CustomerClockIndex() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <FormFilterClockIndex />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableClockIndex />
    </>
  );
}

export default CustomerClockIndex;
