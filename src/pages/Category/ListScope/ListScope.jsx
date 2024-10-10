import { React, useState } from "react";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import { Table, Popover } from "antd";
import { PlusOutlined, SnippetsOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import { AdvancedSearchForm } from "./SearchForm";
import { useMediaQuery } from "react-responsive";
moment.locale("vi");

function ListScope() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const initialData = Array.from({ length: 100 }, (_, i) => {
    return {
      key: "1",
      stt: i + 1,
      maphamvi: `Mã phạm vi ${i + 1}`,
      tenphamvi: `Tên phạm vi ${i + 1}`,
    };
  });
  const [data1] = useState(initialData);

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 70,
    },
    {
      title: "Mã phạm vi",
      dataIndex: "maphamvi",
      key: "kihieu",
      width: 170,
      render: (text, record) => (
        <>
          <SnippetsOutlined />
          {text}
        </>
      ),
    },
    {
      title: "Tên phạm vi",
      dataIndex: "tenphamvi",
      key: "tenphamvi",
    },
  ];

  return (
    <>
      <AdvancedSearchForm />

      <Table
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="index"
        scroll={{ x: 1000, y: 480 }}
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={data1}
      />
      {isTabletOrMobile && (
        <div className="contract-bottom">
          {/* check mobile */}
          {isTabletOrMobile ? (
            <Popover
              size="small"
              rootClassName="fix-popover-z-index"
              placement="bottomRight"
              trigger="click"
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">{/* <TabListBC /> */}</div>
          )}
        </div>
      )}
    </>
  );
}
export default ListScope;
