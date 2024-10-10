import React from "react";
import { Tabs } from "antd";
import WorkStatistic from "./WorkStatistic";
import WriteIndex from "./WriteIndex";

function TabStatisticWork() {
  const items = [
    {
      key: "1",
      label: `Hóa đơn`,
      children: <WorkStatistic />,
    },
    {
      key: "2",
      label: "Ghi chỉ số",
      children: <WriteIndex />,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        destroyInactiveTabPane
      />
    </>
  );
}

export default TabStatisticWork;
