import { Button, Collapse, Divider } from "antd";

import FormFilterNotReadNumber from "./FormFilterNotReadNumber/FormFilterNotReadNumber";
import Reporter from "../Reporter/Reporter";
import TableNotReadingNumber from "./TableNotReadingNumber/TableNotReadingNumber";
import SMSReport from "../Reporter/SMSReport";
import { useState } from "react";

function CustomerNotReadNumber() {
  const [curPage, setCurPage] = useState(1);
  return (
    <>
      <Collapse
        key="collapse1"
        size="small"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <FormFilterNotReadNumber setCurPage={setCurPage} />,
          },
        ]}
        accordion={false}
        defaultActiveKey={["1"]}
      />

      <Divider />

      <SMSReport curPage={curPage} setCurPage={setCurPage} />
    </>
  );
}

export default CustomerNotReadNumber;
