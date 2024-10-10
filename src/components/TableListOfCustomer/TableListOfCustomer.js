import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./TableListOfCustomer.css";
import { fetchApiGetListOfCustomer } from "../../redux/slices/customerSlice/customerSlice";
import {
  fetchApiGetListOfCustomerSelector,
  isLoadingAllCustomerSelector,
  nhaMayChangeSelector,
} from "../../redux/selector";
import TableChildListOfCustomer from "./TableChildListOfCustomer/TableChildListOfCustomer";
import { setNhaMayChange } from "../../redux/slices/currentPageSlice/currentPageSlice";

function TableListOfCustomer({ resultSearch }) {
  const dispatch = useDispatch();

  const listOfCustomer = useSelector(fetchApiGetListOfCustomerSelector);
  const isLoading = useSelector(isLoadingAllCustomerSelector);
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


  // console.log("listOfCustomer", listOfCustomer);

  const cols = [
    {
      key: "index",
      title: "STT",
      width: "6%",
      dataIndex: "index",
    },
    {
      key: "maKhachHangKeyId",
      title: "Mã KH",
      dataIndex: "maKhachHangKeyId",
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
    {
      key: "hopDongKeyId",
      title: "Số hợp đồng",
      dataIndex: "hopDongKeyId",
    },
    {
      key: "diaChi",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      key: "dienThoai",
      title: "Điện thoại",
      dataIndex: "dienThoai",
    },
  ];

  useEffect(() => {
    dispatch(fetchApiGetListOfCustomer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="title-report-cus">
        <h1>{selectedFactory}</h1>

        <div className="title-tbl-report-cus">
          <h1>BẢNG KÊ DANH SÁCH KHÁCH HÀNG</h1>
          <p>Đối tượng giá: Tất cả</p>
        </div>

        <div className="container-tbl-list-cus">
          <Table
            id="table"
            rowKey="index"
            size="small"
            columns={cols}
            loading={isLoading}
            bordered={true}
            dataSource={
              listOfCustomer?.length <= 0
                ? []
                : listOfCustomer?.data?.map((_customer, index) => ({
                    index: index + 1,
                    maKhachHangKeyId: _customer.khachHang.keyId,
                    tenKhachHang: _customer.khachHang.tenKhachHang,
                    hopDongKeyId: _customer.keyId,
                    diaChi: _customer.khachHang.diaChi,
                    doiTuongGia: _customer.doiTuongGia,
                    dienThoai: _customer.khachHang.dienThoai,
                  }))
            }
            expandable={{
              expandedRowRender: (record, index) => {
                return (
                  <div key={index}>
                    <TableChildListOfCustomer
                      listOfCustomer={listOfCustomer}
                      record={record}
                      isLoading={isLoading}
                    />
                  </div>
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
            rowClassName="record-title-name"
          ></Table>
        </div>
      </div>
    </>
  );
}

export default TableListOfCustomer;
