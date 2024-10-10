import {
  CloseCircleFilled,
  FolderFilled,
  ProjectOutlined,
  SaveFilled,
} from "@ant-design/icons";
import { Button, Col, Collapse, Modal, Row } from "antd";
import { useState } from "react";
import TableModifyPrice from "./TableModifyPrice";
import { FormClock } from "../EditInvoice/FormClock";
import { FormUserInfo } from "../EditInvoice/FormUserInfo";
import { GeneralInfo } from "../EditInvoice/GeneralInfo";
import { useMediaQuery } from "react-responsive";

export const AddInvoice = (props) => {
  const { isOpen, handleCancel, handleOk, rowSelection } = props;
  const [isOpenTablePrice, setIsOpenTablePrice] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [ClockInfo, setClockInfo] = useState(null);
  const [UserInfo, setUserInfo] = useState(null);
  const [GeneralInfomation, setGeneralInfomation] = useState(null);

  // {
  //   "ghiChu": "string",
  //   "thangTaoHoaDon": "string",
  //   "kyGhiChiSoId": "string",
  //   "ngayLapHoaDon": "2023-10-26T16:50:00.839Z",
  //   "seriHoaDon": "string",
  //   "nguoiTaoId": "string",
  //   "ngayDauKy": "2023-10-26T16:50:00.839Z",
  //   "ngayCuoiKy": "2023-10-26T16:50:00.839Z",
  //   "thongTinDongHo": {
  //     "soHopDong": "string",
  //     "tuyenDocId": "string",
  //     "maDongHo": "string",
  //     "tieuThu": 0,
  //     "hinhThucThanhToan": 1,
  //     "nhanVienQuanLyId": "string",
  //     "doiTuongGia": "string"
  //   },
  //   "thongTinKhachHang": {
  //     "khachHangKeyId": "string",
  //     "tenKH": "string",
  //     "maSoThue": "string",
  //     "dienThoai": "string",
  //     "diaChi": "string",
  //     "soHo": "string",
  //     "soKhau": "string",
  //     "tenNganHang": "string",
  //     "taiKhoanNH": "string",
  //     "tenTaiKhoan": "string"
  //   }
  // }

  function onFinished() {
    console.log("ClockInfo", ClockInfo);
    console.log("UserInfo", UserInfo);
    console.log("GeneralInfomation", GeneralInfomation);
  }

  const clockInfo = [
    {
      key: "1",
      label: "Thông tin đồng hồ",
      children: (
        <FormClock rowSelection={rowSelection} setClockInfo={setClockInfo} />
      ),
    },
  ];

  const userInfo = [
    {
      key: "1",
      label: "Thông tin khách hàng",
      children: <FormUserInfo rowSelection={rowSelection} />,
    },
  ];

  const generalInfo = [
    {
      key: "1",
      label: "Thông tin chung",
      children: <GeneralInfo rowSelection={rowSelection} />,
    },
  ];

  return (
    <Modal
      title="Thêm hóa đơn"
      open={isOpen}
      onOk={() => handleOk("", "addInvoice")}
      onCancel={() => handleCancel("", "addInvoice")}
      width={1200}
      footer={null}
      centered
    >
      <Collapse defaultActiveKey={"1"} items={clockInfo} size="small" />
      <Collapse
        defaultActiveKey={"1"}
        items={userInfo}
        size="small"
        style={{ marginTop: "10px" }}
      />
      <Collapse
        defaultActiveKey={"1"}
        items={generalInfo}
        size="small"
        style={{ marginTop: "10px" }}
      />

      <Row style={{ display: "flex", marginTop: !isMobile && "10px" }}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Button
            type="primary"
            danger
            style={{
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
              marginLeft: "3px",
            }}
          >
            Chỉ số tháng sau: 1155
          </Button>
          {/*<Button
            type="primary"
            icon={<FolderFilled />}
            style={{
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
              marginLeft: "3px",
            }}
          >
            Tệp đính kèm
          </Button>*/}
        </Col>

        <Col lg={12} md={12} sm={24} xs={24} style={{ textAlign: "end" }}>
          <Button
            type="primary"
            icon={<ProjectOutlined />}
            style={{
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
              marginLeft: "3px",
            }}
            onClick={() => setIsOpenTablePrice(true)}
          >
            Chỉnh bảng giá
          </Button>
          <Button
            type="primary"
            icon={<SaveFilled />}
            style={{
              // marginLeft: `${isDesktopOrLaptop ? "3px" : 0}`,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
              marginLeft: "3px",
            }}
          >
            Lưu
          </Button>
          <Button
            type="primary"
            icon={<CloseCircleFilled />}
            style={{
              // marginLeft: `${isDesktopOrLaptop ? "3px" : 0}`,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
              marginLeft: "3px",
            }}
            onClick={() => handleCancel("", "addInvoice")}
          >
            Đóng
          </Button>
        </Col>
      </Row>

      <TableModifyPrice
        isOpen={isOpenTablePrice}
        setIsOpen={setIsOpenTablePrice}
      />
    </Modal>
  );
};
