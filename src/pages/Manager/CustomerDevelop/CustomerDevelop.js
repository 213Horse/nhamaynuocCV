import { useEffect, useState } from "react";
import { Collapse, Divider } from "antd";
import { useDispatch } from "react-redux";

import "./CustomerDevelop.css";
import TableReportCustomer from "../../../components/TableReportCustomer/TableReportCustomer";
import reportContractSlice from "../../../redux/slices/reportContractSlice/reportContractSlice";
import Reporter from "../../../components/Reporter/Reporter";
import FormFilterReportCustomer from "../../../components/TableReportCustomer/FormFilterReportCustomer/FormFilterReportCustomer";

function CustomerDevelop() {
  const [resultSearch, setResultSearch] = useState("");

  const dispatch = useDispatch();

  // Collapse filter
  const items = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: <FormFilterReportCustomer />,
    },
  ];

  useEffect(() => {
    dispatch(reportContractSlice.actions.btnClickOptionFactory("all"));
  }, []);

  // handle on search
  const handleOnSearch = (value) => {
    setResultSearch(value);
  };

  // handle on onChange
  const handleOnChange = (e) => {
    setResultSearch(e.target.value);
  };
  

  return (
    <>
      <Collapse
        key="1"
        items={items}
        accordion={false}
        defaultActiveKey={["1"]}
        style={{ marginBottom: "12px" }}
        size="small"
      />

      <Divider />

      <Reporter
        handleOnSearch={handleOnSearch}
        handleOnChange={handleOnChange}
      />

      <Divider />

      {/* render table */}
      <TableReportCustomer resultSearch={resultSearch} />
    </>
  );
}

export default CustomerDevelop;
