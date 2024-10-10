import { Collapse, Divider } from "antd";
import Reporter from "../Reporter/Reporter";
import FormFilterCustomerNotUseWater from "./FormFilterCustomerNotUseWater/FormFilterCustomerNotUseWater";
import TableNotReadingNumber from "../CustomerNotReadNumber/TableNotReadingNumber/TableNotReadingNumber";

function CustomerNotUseWater() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <FormFilterCustomerNotUseWater />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableNotReadingNumber />
    </>
  );
}

export default CustomerNotUseWater;
