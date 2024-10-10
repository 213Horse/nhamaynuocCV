import {
  CloseOutlined,
  FolderFilled,
  ProjectOutlined,
  QuestionCircleOutlined,
  SaveFilled,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Col, Collapse, Form, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import TableModifyPrice from "../AddInvoice/TableModifyPrice";
import { FormClock } from "./FormClock";
import { FormUserInfo } from "./FormUserInfo";
import { GeneralInfo } from "./GeneralInfo";
import { useMediaQuery } from "react-responsive";
import "./EditInvoice.css";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { allInvoiceDetailSelector, btnClickGetFactoryIdSelector, getInvoiceDetail } from "../../../redux/selector";
import dayjs from "dayjs";
import { fetchApiGetAllHoaDon, fetchUpdateInvoiceDetail } from "../../../redux/slices/invoiceSlice/invoiceSlice";
import { fetchGetMember } from "../../../redux/slices/thanhVienSlice/thanhVienSlice";

export const EditInvoice = (props) => {
  const [formEditInvoice] = useForm();
  const dispatch = useDispatch();

  const { isOpenEdit, setIsOpenModalEditInvoice, rowSelection } = props;
  const [isOpenTablePrice, setIsOpenTablePrice] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const invoiceDetailSelector = useSelector(getInvoiceDetail);
  const invoiceDetail= useSelector(allInvoiceDetailSelector) 
  const factoryID = useSelector(btnClickGetFactoryIdSelector);

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




  const clockInfo = [
    {
      key: "1",
      label: "Thông tin đồng hồ",
      children: <FormClock formEditInvoice={formEditInvoice} />,
    },
  ];

  const userInfo = [
    {
      key: "1",
      label: "Thông tin khách hàng",
      children: <FormUserInfo />,
    },
  ];

  const generalInfo = [
    {
      key: "1",
      label: "Thông tin chung",
      children: (
        <GeneralInfo
          seriHoaDonOptions={
            (invoiceDetailSelector && invoiceDetailSelector.listSeriHoaDon) ||
            []
          }
        />
      ),
    },
  ];

  //get hinh thuc thanh toan id from name
  const handleGetIdOfHinhThucThanhToan = (name) => {
    if (name === "Chuyển khoản") {
      return 1;
    } else if (name === "Tiền mặt") {
      return 2;
    } else if (name === "Theo hợp đồng") {
      return 3;
    } else {
      return "";
    }
  };


  function handleUpdateInvoice(values) {
    formEditInvoice.validateFields().then((values) => {
      if (invoiceDetail) {
        //Quân sửa ở đây ràng buộc
        const cSdau = parseFloat(values.cSdau);
    const cScuoi = parseFloat(values.cScuoi);

    if (cScuoi < cSdau) {
        // Hiển thị thông báo hoặc xử lý lỗi ở đây nếu cần thiết
        console.log("Giá trị cScuoi không được nhỏ hơn cSdau");
        return; // Dừng việc dispatch action và xử lý tiếp theo
    }
        if (values.thangTaoHoaDon || values.thangTaoHoaDon !== "") {
          values = {
            ...values,
            thangTaoHoaDon: dayjs(values.thangTaoHoaDon)
              .locale("vi")
              .format("MM/YYYY"),
          };
        }
        if (values.ngayDauKy || values.ngayDauKy !== "") {
          values = {
            ...values,
            ngayDauKy: dayjs(values.ngayDauKy)
              .locale("vi")
              .format("YYYY-MM-DDTHH:mm:ssZ"),
          };
        }
        if (values.ngayCuoiKy || values.ngayCuoiKy !== "") {
          values = {
            ...values,
            ngayCuoiKy: dayjs(values.ngayCuoiKy)
              .locale("vi")
              .format("YYYY-MM-DDTHH:mm:ssZ"),
          };
        }
        if (values.ngayLapHoaDon || values.ngayLapHoaDon !== "") {
          values = {
            ...values,
            ngayLapHoaDon: dayjs(values.ngayLapHoaDon)
              .locale("vi")
              .format("YYYY-MM-DDTHH:mm:ssZ"),
          };
        }
        //Quân sửa ở đây ràng buộc
        const userId = sessionStorage.getItem("userId");
    const hoaDonId = rowSelection.id;
    console.log("values", values);
    const formData = {
        hoaDonId,
        userId,
        data: {
            chiSoCu: values.cSdau,
            chiSoMoi: values.cScuoi,
            tthu: values.cScuoi - values.cSdau,
            doiTuongGiaId: values.doiTuongGiaId,
            soDienThoai:values.soDienThoai
        },
    };
    dispatch(fetchUpdateInvoiceDetail(formData));
    formEditInvoice.resetFields();
    setIsOpenModalEditInvoice(false);
}
    });
  }
  console.log("formData", rowSelection);
  return (
    <Modal
      title="Cập nhật hóa đơn"
      open={isOpenEdit}
      onOk={() => setIsOpenModalEditInvoice(false)}
      onCancel={() => setIsOpenModalEditInvoice(false)}
      width={1066}
      footer={null}
      centered
    >
      <Form
        size="small"
        form={formEditInvoice}
        fields={[
          {
            name: "nhanVienQuanLyId",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.nguoiThuTienID.split(',')
              : "",
          },
          {
            name: "tuyenDocId",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.tuyenDocID
              : "",
          },
          {
            name: "soHopDong",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.maHopDong
              : "",
          },
          {
            name: "maDongHo",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.maDongHo : "",
          },
          {
            name: "cSdau",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.chiSoCu : "",
          },
          {
            name: "cScuoi",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.chiSoMoi : "",
          },
          {
            name: "cSdauCu",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.csDauCu : "",
          },
          {
            name: "cScuoiCu",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.csCuoiCu : "",
          },
          {
            name: "tenVung",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.tenVung : "",
          },
          {
            name: "tenKhuVuc",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.tenKhuVuc
              : "",
          },
          {
            name: "tieuThu",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.tieuThu
              : "",
          },
          {
            name: "soNuocKM",
            value:  invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.soNuocKM
              : "",
          },
          {
            name: "truyThu",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.truyThu
              : "",
          },
          {
            name: "hinhThucThanhToan",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.phuongThucThanhToan
              : "",
          },
          {
            name: "doiTuongGiaId",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.doiTuongGiaID
              : "",
          },

          //userInfo
          {
            name: "khachHangKeyId",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.maKhachHang
              : "",
          },
          {
            name: "tenKH",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.tenKhachHang
              : "",
          },
          {
            name: "maSoThue",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.maSoThue
              : "",
          },
          {
            name: "soDienThoai",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.soDienThoai
              : "",
          },
          {
            name: "diaChi",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.diaChiKhachHang
              : "",
          },
          {
            name: "soHo",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.soHo
              : "",
          },
          {
            name: "soKhau",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.soKhau
              : "",
          },
          {
            name: "tenNganHang",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.tenNganHang
              : "",
          },
          {
            name: "taiKhoanNH",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.taiKhoanNganHang
              : "",
          },
          {
            name: "tenTaiKhoan",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.tenTaiKhoan
              : "",
          },

          //generalInfo
          {
            name: "thangTaoHoaDon",
            value:  invoiceDetail
              ? dayjs(invoiceDetail?.modelHoaDons[0]?.thangTaoSoDoc, "MM/YYYY") 
              : "",
          },
          {
            name: "kyGhiChiSoId",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.kyGhiChiSoID
              : "",
          },
          {
            name: "ngayDauKy",
            value:  invoiceDetail
              ? dayjs(invoiceDetail?.modelHoaDons[0]?.ngayDauKy) 
              : "",
          },
          {
            name: "ngayCuoiKy",
            value:  invoiceDetail
              ? dayjs(invoiceDetail?.modelHoaDons[0]?.ngayCuoiKy) 
              : "",
          },
          {
            name: "ngayLapHoaDon",
            value: invoiceDetail
              ? dayjs(invoiceDetail?.ngayLapHoaDon)
              : "",
          },
          {
            name: "seriHoaDon",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.seriHoaDon
              : "",
          },
          {
            name: "trangThaiDoc",
            value: invoiceDetail
              ?
               invoiceDetail?.modelHoaDons[0]?.trangThaiGhi === "Đã ghi" ? 1 : 2
              : "",
          },
          {
            name: "ghiChu",
            value: invoiceDetail
              ? invoiceDetail?.modelHoaDons[0]?.ghiChuHoaDon
              : "",
          },
        ]}
      >
        <Collapse defaultActiveKey={["1"]} items={clockInfo} size="small" />
        <Collapse
          defaultActiveKey={["1"]}
          items={userInfo}
          size="small"
          style={{ marginTop: "10px" }}
        />
        <Collapse
          defaultActiveKey={["1"]}
          items={generalInfo}
          size="small"
          style={{ marginTop: "10px" }}
        />
      </Form>
      <Row
        className="invoice_footer"
        style={{ display: "flex", marginTop: "10px" }}
      >
        <Col>
          <Button
            size="small"
            type="primary"
            danger
            style={{ width: `${isMobile ? "100%" : ""}` }}
          >
            Chỉ số tháng sau: 1155
          </Button>
          <Button
            className="tab-item-readingIndex-3"
            size="small"
            style={{
              marginLeft: `${isDesktopOrLaptop ? "3px" : 0}`,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
          >
            Không lấy chỉ số theo hóa đơn này
          </Button>
          <Button
            icon={<FolderFilled />}
            style={{
              marginLeft: `${isDesktopOrLaptop ? "3px" : 0}`,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            size="small"
            className="custom-btn-export-Invoice"
          >
            Tệp đính kèm
          </Button>
        </Col>
        <Col
          style={{
            marginLeft: "auto",
            marginTop: `${isMobile || isTabletOrMobile ? "10px" : "0"}`,
          }}
        >
          <Button
            icon={<ProjectOutlined />}
            style={{
              marginLeft: `${isDesktopOrLaptop ? "3px" : 0}`,
              width: `${isMobile ? "100%" : ""}`,
            }}
            onClick={() => setIsOpenTablePrice(true)}
            size="small"
            className="tab-item-EditInvoice-3"
          >
            Chỉnh bảng giá
          </Button>
          <Button
            icon={<SyncOutlined />}
            style={{
              marginLeft: `${isDesktopOrLaptop ? "3px" : 0}`,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            onClick={() => setModalConfirm(true)}
            size="small"
            className="tab-item-EditInvoice-8"
          >
            Đồng bộ từ hợp đồng
          </Button>
          <Button
            type="primary"
            icon={<SaveFilled />}
            style={{
              marginLeft: `${isDesktopOrLaptop ? "3px" : 0}`,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            size="small"
            onClick={handleUpdateInvoice}
          >
            Lưu
          </Button>
          <Button
            className="custom-btn-close"
            style={{
              marginLeft: `${isDesktopOrLaptop ? "3px" : 0}`,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            onClick={() => {
              setIsOpenModalEditInvoice(false);
              formEditInvoice.resetFields();
            }}
            size="small"
          >
            <CloseOutlined />
            Đóng
          </Button>
        </Col>
      </Row>
      <TableModifyPrice
        isOpen={isOpenTablePrice}
        setIsOpen={setIsOpenTablePrice}
      />
      <Modal
        title="Thông báo"
        open={modalConfirm}
        onCancel={() => setModalConfirm(false)}
        onOk={() => setModalConfirm(false)}
        footer={null}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <QuestionCircleOutlined style={{ fontSize: "40px" }} />
          <p>
            Đồng bộ thông tin từ hợp đồng sẽ làm thay đổi lại thông tin về khách
            hàng, đồng hồ, số hợp đồng bạn có muốn thay đổi không
          </p>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Button type="primary" style={{ marginLeft: "10px" }}>
            Có
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => setModalConfirm(false)}
          >
            Không
          </Button>
        </div>
      </Modal>
    </Modal>
  );
};
