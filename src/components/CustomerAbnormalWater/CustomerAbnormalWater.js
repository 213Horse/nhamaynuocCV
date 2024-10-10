import { Collapse, Divider } from "antd";
import Reporter from "../Reporter/Reporter";
import FormFilterAbnormalWater from "./FormFilterAbnormalWater/FormFilterAbnormalWater";
import TableAbnormalWater from "./TableAbnormalWater/TableAbnormalWater";

function CustomerAbnormalWater() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <FormFilterAbnormalWater />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableAbnormalWater />
    </>
  );
}

export default CustomerAbnormalWater;
