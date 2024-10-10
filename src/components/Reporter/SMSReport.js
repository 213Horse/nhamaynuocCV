import { Button, Col, Input, Modal, Row, Table } from "antd";

import "./Reporter.css";
import ExportFile from "../ExportFile/ExportFile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  fetchBaoCaoSMSSelector,
  isLoadingSMSSelector,
} from "../../redux/selector";
import { fetchBaoCaoSMS } from "../../redux/slices/invoiceSlice/invoiceSlice";
import { EyeOutlined } from "@ant-design/icons";

function SMSReport({ handleOnSearch, handleOnChange, curPage, setCurPage }) {
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const thongBaoSMS = useSelector(fetchBaoCaoSMSSelector);
  const loading = useSelector(isLoadingSMSSelector);
  const dataFilter = useSelector((state) => state.invoiceSlice.filterData);
  const dispatch = useDispatch();
  
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryID === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryID}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {

    const trangthai = 2;
    const nhaMayIds = createFilterQueryString();
    const pageNumber = 1;
    const pageSize = 10;
    const values = {  trangthai, nhaMayIds, pageNumber, pageSize };
    dispatch(fetchBaoCaoSMS(values));
  }, [factoryID]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => (curPage - 1) * 10 + index + 1,
      width: "5%",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "maKhachHang",
      key: "maKhachHang",
      width: "11%",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      key: "tenKhachHang",
      width: "11%",
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "maHoaDon",
      key: "maHoaDon",
      width: "11%",
    },
    {
      title: "Thời gian gửi",
      dataIndex: "lastUpdateTime",
      key: "lastUpdateTime",
      width: "11%",
    },
    {
      title: "Nội dung tin nhắn",
      dataIndex: "noiDung",
      key: "noiDung",
      render: (text, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            Modal.info({
              width: 1800,
              title: "Nội dung tin nhắn",
              content: (
                <div>
                  <p>{record.noiDung}</p>
                </div>
              ),
            });
          }}
        />
      ),
      width: "5%",
    },
    {
      title: "Thông tin kết quả trả về",
      dataIndex: "thongTin",
      key: "thongTin",
      width: "11%",
    },

    {
      title: "Số điện thoại gửi",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      width: "11%",
    },
    {
      title: "Trạng thái SMS",
      dataIndex: "trangThaiGui",
      key: "trangThaiGui",
      render: (text, record) => {
        console.log(record.trangThaiGui);
        if (record === 1) {
          return <p>Chưa Gửi</p>;
        } else if (record.trangThaiGui === 2) {
          return <p>Thành Công</p>;
        } else if (record.trangThaiGui === 3) {
          return <p>Thất Bại</p>;
        } else {
          return <p>Đang Gửi</p>;
        }
      },
      width: "11%",
    },
    {
      title: "Tên tuyến",
      dataIndex: "tenTuyen",
      key: "tenTuyen",
      width: "11%",
    },
  ];
  console.log("data", dataFilter);
  const handlePageChange = (page) => {
    setCurPage(page);
    const trangthai = 2;
    const nhaMayIds = createFilterQueryString();
    const pageNumber = page;
    const pageSize = 10;
    const values = { trangthai, nhaMayIds, pageNumber, pageSize };
    if (dataFilter) {
      if (dataFilter.TuNgay) {
        values.TuNgay = dataFilter.TuNgay;
      }
      if (dataFilter.DenNgay) {
        values.DenNgay = dataFilter.DenNgay;
      }
    }
    dispatch(fetchBaoCaoSMS(values));
  };
  return (
    <div>
      <Table
        loading={loading}
        dataSource={thongBaoSMS?.items}
        columns={columns}
        pagination={{
          total: thongBaoSMS?.totalPages,
          pageSize: 10,
          current: curPage,
          onChange: (page, pageSize) => {
            handlePageChange(page);
          },
        }}
      />
    </div>
  );
}

export default SMSReport;
