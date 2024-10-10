import { React, useState, useEffect } from "react";
import TableInstaller from "./TableInstaller.js";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import { Form, Input, Table, Popover, Col, Row, Tooltip } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";

// import kỳ lạ của Dương:
import {
  btnClickGetFactoryIdSelector,
  btnClickTabListInvoicePrintSelector,
  fetchApiGetAllDMTotalByTypeSelector,
  fetchApiGetAllInstallerSelector,
} from "../../../redux/selector.js";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import { getAllDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice.js";
moment.locale("vi");

function DMinstaller() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();

  // import kỳ lạ của Dương
  const tabListPO = useSelector(btnClickTabListInvoicePrintSelector);

  // handle row select
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
        selectedRows[0]
      )
    );
  };

  const [textInput, setTextInput] = useState("");
  // handle un-check radio
  const handleUncheckRadio = () => {
    dispatch(
      tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null)
    );
  };
  // Kết thúc import kỳ lạ của Dương

  const listData = useSelector(fetchApiGetAllInstallerSelector);

  // const initialData = Array.from({ length: 100 }, (_, i) => {
  //   return {
  //     key: "1",
  //     index: i + 1,
  //     keyId: `Mã người lắp đặt ${i + 1}`,
  //     tenNguoiLapDat: `Tên người lắp đặt ${i + 1}`,
  //   };
  // });
  // const [data1] = useState(initialData);

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const initialData = listData?.map((item, i) => ({
    key: item.id,
    stt: i + 1,
    ma: item.keyId,
    tenNguoiLapDat: item.value,
    mota: item.description,
    kyHieu: item.kyHieu,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
    },
    {
      title: "Mã/Ký hiệu",
      dataIndex: "kyHieu",
      key: "kyHieu",
    },
    // {
    //   title: "Mã",
    //   dataIndex: "ma",
    //   key: "ma",
    //   filteredValue: [textInput],
    //   onFilter: (value, record) => {
    //     return String(record.ma).toLowerCase().includes(value.toLowerCase());
    //   },
    // },
    {
      title: "Tên người lắp đặt",
      dataIndex: "tenNguoiLapDat",
      key: "tenNguoiLapDat",
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
    },
  ];

  const layout = {
    labelCol: {
      span: 0,
    },
  };
  const AdvancedSearchForm = () => {
    // return (
    //   <Form {...layout}>
    //     <Row>
    //       {!isTabletOrMobile && (
    //         <Col span={isTabletOrMobile ? 8 : 16}>
    //           <Form.Item>
    //             <TableInstaller />
    //           </Form.Item>
    //         </Col>
    //       )}
    //       <Col span={isTabletOrMobile ? 24 : 8}>
    //         <Form.Item className="custom-form-item">
    //           <Input.Search
    //             placeholder="Nhập và Enter để tìm kiếm"
    //             style={{
    //               marginRight: "5px",
    //               width: "100%",
    //             }}
    //             onChange={e => setTextInput(e.target.value)}
    //           />
    //         </Form.Item>
    //       </Col>
    //     </Row>
    //   </Form>
    // );
  };
  useEffect(() => {
    const queryString = createFilterQueryString();
    const filterData = {
      type: 2,
      queryString: queryString,
    };
    dispatch(getAllDMTotalByType(filterData));
  }, [nhaMayId]);

  return (
    <>
      <Form {...layout}>
        <Row>
          {!isTabletOrMobile && (
            <Col span={isTabletOrMobile ? 8 : 16}>
              <Form.Item>
                <TableInstaller />
              </Form.Item>
            </Col>
          )}
          <Col span={isTabletOrMobile ? 24 : 8}>
            <Form.Item className="custom-form-item">
              <Input.Search
                placeholder="Nhập và Enter để tìm kiếm"
                style={{
                  marginRight: "5px",
                  width: "100%",
                }}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        style={{ marginTop: "10px" }}
        size="small"
        bordered
        rowKey="stt"
        scroll={{ x: 1000, y: 480 }}
        columns={columns.map((column) => ({
          ...column,
          className: "cell-wrap",
        }))}
        dataSource={initialData}
        // import kỳ lạ của Dương
        onRow={(record, index) => {
          return {
            onClick: () => {
              // clicked row to check radio
              dispatch(
                tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(
                  record
                )
              );
            },
          };
        }}
        rowSelection={{
          type: "radio",
          columnTitle: () => {
            return (
              <Tooltip title="Bỏ chọn hàng hiện tại.">
                <RedoOutlined
                  className="icon-reset-rad-btn"
                  onClick={handleUncheckRadio}
                />
              </Tooltip>
            );
          },
          onChange: (selectedRowKeys, selectedRows) =>
            handleRowSelection(selectedRowKeys, selectedRows),
          selectedRowKeys: tabListPO ? [tabListPO.stt] : [],
        }}
        // kết thúc import kỳ lạ của Dương
      ></Table>
      {isTabletOrMobile && (
        <div className="contract-bottom">
          {/* check mobile */}
          {isTabletOrMobile ? (
            <Popover
              size="small"
              rootClassName="fix-popover-z-index"
              placement="bottomRight"
              trigger="click"
              content={<TableInstaller isTabletOrMobile={isTabletOrMobile} />}
            >
              <div className="contract-bottom-func">
                <PlusOutlined />
              </div>
            </Popover>
          ) : (
            <div className="contract-bottom-func">
              <TableInstaller />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DMinstaller;
