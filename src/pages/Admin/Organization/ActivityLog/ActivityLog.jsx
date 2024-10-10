import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SidebarFolder from "./SidebarFolder";
import "./ActivityLog.css";
import FolderContent from "./FolderContent";
import tabListInvoicePrintSlice from "../../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { useDispatch } from "react-redux";
export const SearchContext = React.createContext();

const ActivityLog = () => {
  const dispatch = useDispatch();
  const Title = () => {
    return (
      <h1 style={{ textAlign: "left", marginBottom: "10px" }}>
        Nhật ký hoạt động
      </h1>
    );
  };
  useEffect(() => {
    return () => {
      dispatch(
        tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
      );
    };
  }, []);
  const [searchParams, setSearchParams] = useState({
    fromDate: null,
    toDate: null,
    account: "",
  });
  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      <div style={{ height: "96%" }}>
        <Title />
        <Row gutter={[10, 10]} style={{ height: "100%" }}>
          <Col lg={6} md={6} sm={24} xs={24}>
            <SidebarFolder showTitle />
          </Col>
          <Col lg={18} md={18} sm={24} xs={24}>
            <FolderContent showTitle />
          </Col>
        </Row>
      </div>
    </SearchContext.Provider>
  );
};

export default ActivityLog;
