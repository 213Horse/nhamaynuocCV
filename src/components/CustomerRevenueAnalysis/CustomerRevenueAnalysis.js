import { Collapse, Divider } from "antd";
import Reporter from "../Reporter/Reporter";
import FormFilterCustomerRevenueAnalysis from "./FormFilterCustomerRevenueAnalysis/FormFilterCustomerRevenueAnalysis";
import TableCustomerRevenueAnalysis from "./TableCustomerRevenueAnalysis;/TableCustomerRevenueAnalysis;";

function CustomerRevenueAnalysis() {
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <FormFilterCustomerRevenueAnalysis />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <Reporter />

      <Divider />

      <TableCustomerRevenueAnalysis />
    </>
  );
}

export default CustomerRevenueAnalysis;
