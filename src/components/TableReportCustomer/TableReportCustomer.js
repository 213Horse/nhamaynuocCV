import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./TableReportCustomer.css";
import TableChildReportCustomer from "./TableChildReportCustomer/TableChildReportCustomer";
import {
  fetchApiGetReportListCustomerNewSelector,
  isLoadingAllCustomerSelector,
  nhaMayChangeSelector,
} from "../../redux/selector";
import { fetchApiGetListReportCustomerNew } from "../../redux/slices/customerSlice/customerSlice";
import { formatDate } from "../../utils/formatDateToString";
import { setNhaMayChange } from "../../redux/slices/currentPageSlice/currentPageSlice";

function TableReportCustomer({ resultSearch }) {
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");

  const newCustomers = useSelector(fetchApiGetReportListCustomerNewSelector);
  const isLoading = useSelector(isLoadingAllCustomerSelector);
  const dispatch = useDispatch();
  const nhaMayName = sessionStorage.getItem("current_factory_id");
  const nhaMayArray = JSON.parse(sessionStorage.getItem("nhaMaysData"));
  const [selectedFactory, setSelectedFactory] = useState("");
  const nhaMayChange = useSelector(nhaMayChangeSelector);

  useEffect(() => {
    if (nhaMayName !== "all") {
      const foundFactory = nhaMayArray.find(
        (factory) => factory.nhaMayId === nhaMayName
      );

      if (foundFactory) {
        setSelectedFactory(foundFactory.tenNhaMay);
        dispatch(setNhaMayChange(0));
      }
    } else {
      setSelectedFactory("Tất cả nhà máy");
      dispatch(setNhaMayChange(0));
    }
  }, [nhaMayName, nhaMayChange, dispatch]);
  // console.log("isLoading ->", isLoading);
  // console.log("new report cus ->", newCustomers);
  // console.log("resultSearch ->", resultSearch);

  const cols = [
    {
      key: "index",
      title: "STT",
      dataIndex: "index",
      width: "4%",
    },
    {
      key: "tenKhachHang",
      title: "Tên KH",
      dataIndex: "tenKhachHang",
      filteredValue: [resultSearch],
      onFilter: (value, record) => {
        return String(record.tenKhachHang)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
  ];

  // handle date
  useEffect(() => {
    // Lấy ngày đầu tiên của tháng hiện tại
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Lấy ngày cuối cùng của tháng hiện tại
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const firstDayFormatted = formatDate(firstDayOfMonth);
    const lastDayFormatted = formatDate(lastDayOfMonth);

    setFirstDay(firstDayFormatted);
    setLastDay(lastDayFormatted);
  }, []);

  // handle get list new customers
  useEffect(() => {
    dispatch(fetchApiGetListReportCustomerNew());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="title-report-cus">
        <h1>{selectedFactory}</h1>

        <div className="title-tbl-report-cus">
          <h1>BÁO CÁO PHÁT TRIỂN KHÁCH HÀNG MỚI</h1>
          <p>
            Từ: ngày {firstDay} - Đến: ngày {lastDay}
          </p>
        </div>
      </div>

      <div className="container-tbl-report-cus">
        <Table
          showHeader={false}
          bordered={true}
          loading={isLoading}
          columns={cols}
          dataSource={newCustomers?.data?.map((_customer, index) => ({
            index: index + 1,
            keyId: _customer.keyId,
            tenKhachHang: _customer.tenKhachHang,
          }))}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <>
                  <div className="inner-line">
                    <p>{record?.tuyenDoc}</p>
                  </div>

                  {/* record: if để lấy dữ liệu con (get .keyId) */}
                  <TableChildReportCustomer
                    newCustomers={newCustomers}
                    record={record}
                    isLoading={isLoading}
                  />
                </>
              );
            },
            defaultExpandAllRows: true,
            // defaultExpandedRowKeys: ["0"],
            expandRowByClick: true,
          }}
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            x: 2000,
          }}
          rowKey="index"
          // key={["0"]}
          size="small"
          rowClassName="record-title-name"
        ></Table>
      </div>

      <div className="footer-signature">
        <p>Ngày ... tháng ... năm 2023</p>

        <div className="footer-signature-inner">
          <p className="signature-creator">Người lập</p>
          <p>Ký, họ tên</p>
        </div>
      </div>
    </>
  );
}

export default TableReportCustomer;
