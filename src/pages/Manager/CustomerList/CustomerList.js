import { Collapse, Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./CustomerList.css";
import TableListOfCustomer from "../../../components/TableListOfCustomer/TableListOfCustomer";
import Reporter from "../../../components/Reporter/Reporter";
import reportContractSlice from "../../../redux/slices/reportContractSlice/reportContractSlice";
import FormFilterCustomer from "../../../components/TableListOfCustomer/FormFilterCustomer/FormFilterCustomer";

function CustomerList() {
  const [resultSearch, setResultSearch] = useState("");

  const dispatch = useDispatch();

  // Collapse filter
  const items = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: <FormFilterCustomer />,
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
      <TableListOfCustomer resultSearch={resultSearch} />
    </>
  );
}

export default CustomerList;
