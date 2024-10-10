import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../components/GlobalStyles/GlobalStyles.css";
import "../../Manager/Contract/Contract.css";
import { Table, Popover, Tooltip, Form, Row, Col, Input } from "antd";
import { PlusOutlined, RedoOutlined, SnippetsOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/vi";
import "react-toastify/dist/ReactToastify.css";

import { useMediaQuery } from "react-responsive";
import { fetchApiAllPaymentMethod } from "../../../redux/slices/paymentMethodSlice/paymentMethodSlice";
import {
   btnClickGetFactoryIdSelector,
   btnClickTabListInvoicePrintSelector,
   fetchApiAllPaymentMethodSelector,
   fetchApiGetAllDMTotalByTypeSelector,
   fetchApiGetAllNethodPaymentSelector,
   isLoadingAllPaymentMethodSelector,
} from "../../../redux/selector";
import tabListInvoicePrintSlice from "../../../redux/slices/tabListInvoicePrintSlice/tabListInvoicePrintSlice";
import TableListPC from "./TableListPC";
moment.locale("vi");

function ListPaymentMethod() {
   const [resultSearch, setResultSearch] = useState("");
   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
   const dispatch = useDispatch();

   const tabListbc = useSelector(btnClickTabListInvoicePrintSelector);
   const isLoading = useSelector(isLoadingAllPaymentMethodSelector);
   const listData = useSelector(fetchApiAllPaymentMethodSelector)


   const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
   // console.log("regions", regions);
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
   useEffect(() => {
     console.log("Data nha may:", nhaMayId);
     const queryString = createFilterQueryString();
     dispatch(fetchApiAllPaymentMethod(queryString));
   }, [nhaMayId]);

   const columns = [
      {
         title: 'STT',
         dataIndex: 'stt',
         key: 'stt',
         width: '5%',
      },
      {
         title: 'Phương thức thanh toán',
         dataIndex: 'pttt',
         key: 'pttt',
         filteredValue: [resultSearch],
         onFilter: (value, record) => {
            return String(record.pttt).toLowerCase().includes(value.toLowerCase());
         },
      },
      {
         title: "Mô tả",
         dataIndex: "mota",
         key: "mota",
      },
   ];
   // handle row select
   const handleRowSelection = (selectedRowKeys, selectedRows) => {
      dispatch(tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(selectedRows[0]));
   };

   // handle un-check radio
   const handleUncheckRadio = () => {
      dispatch(tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(null));
   };
   const layout = {
      labelCol: {
         span: 0,
      },
   };
console.log(listData);
   const initialData = listData?.map((item, i) => ({
      key: item.id,
      stt: i + 1,
      ma: item.id,
      keyId: item.keyId,
      pttt: item.kyHieu,
      mota: item.moTaPhuongThuc
   }))
   return (
      <>
         {/* <AdvancedSearchForm /> */}
         <Form {...layout}>
            <Row>
               {!isTabletOrMobile && (
                  <Col span={isTabletOrMobile ? 8 : 16}>
                     <Form.Item>
                        <TableListPC />
                     </Form.Item>
                  </Col>
               )}

               <Col span={isTabletOrMobile ? 24 : 8}>
                  <Form.Item className="custom-form-item" name="9">
                     <Input.Search
                        style={{
                           width: "100%",
                        }}
                        onSearch={(value) => {
                           setResultSearch(value);
                        }}
                        onChange={(e) => {
                           setResultSearch(e.target.value);
                        }}
                        placeholder="Nhập phương thức thanh toán"
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
            loading={isLoading}
            onRow={(record, index) => {
               return {
                  onClick: () => {
                     // clicked row to check radio
                     dispatch(tabListInvoicePrintSlice.actions.btnClickTabListInvoicePrint(record));
                  },
               };
            }}
            rowSelection={{
               type: "radio",
               columnTitle: () => {
                  return (
                     <Tooltip title="Bỏ chọn hàng hiện tại.">
                        <RedoOutlined className="icon-reset-rad-btn" onClick={handleUncheckRadio} />
                     </Tooltip>
                  );
               },
               onChange: (selectedRowKeys, selectedRows) =>
                  handleRowSelection(selectedRowKeys, selectedRows),
               selectedRowKeys: tabListbc ? [tabListbc.stt] : [],
            }}
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
                     content={<TableListPC isTabletOrMobile={isTabletOrMobile} />}
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
export default ListPaymentMethod;
