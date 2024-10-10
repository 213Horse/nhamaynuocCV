import { Collapse, Divider } from "antd";
import Reporter from "../Reporter/Reporter";
import FormFilterCustomerAboutUseWater from "./FormFilterCustomerAboutUseWater/FormFilterCustomerAboutUseWater";
import TableCustomerAboutUseWater from "./TableCustomerAboutUseWater/TableCustomerAboutUseWater";

function CustomerAboutUseWater() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <FormFilterCustomerAboutUseWater />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableCustomerAboutUseWater />
    </>
  );
}

export default CustomerAboutUseWater;
