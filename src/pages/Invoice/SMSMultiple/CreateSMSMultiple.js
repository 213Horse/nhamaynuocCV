import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import SearchSMS from "./SearchSMS";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiFilterSoDocBinhThuongSelector,
  getInvoiceList,
  getInvoiceListModal,
  getSMSTypeSelector,
  getThangNam,
  isLoadingInvoiceListLoadingSelector,
} from "../../../redux/selector";
import { useMediaQuery } from "react-responsive";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  getSMSType,
  sendSMSMultiple,
} from "../../../redux/slices/invoiceSlice/invoiceSlice";

const CreateSMSMultiple = (props) => {
  const { isOpen, handleCancel } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [formMain] = Form.useForm();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isLoadingTable = useSelector(isLoadingInvoiceListLoadingSelector);
  const dispatch = useDispatch();
  const dataSourceTable = useSelector(getInvoiceListModal);
  const thangNam = useSelector(getThangNam);
  const nhaMayId = sessionStorage.getItem("current_factory_id");
  const nguoiGuiId = sessionStorage.getItem("userId");
  const smsTypes = useSelector(getSMSTypeSelector);
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Đã TT",
      dataIndex: "paid",
      key: "paid",
      render: (text, record) => paymentStatus(record.paid),
    },
    {
      title: "Ngày HĐ",
      dataIndex: "contractDate",
      key: "contractDate",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Số hợp đồng",
      dataIndex: "contractNumber",
      key: "contractNumber",
      width:200
    },
    {
      title: "Mã ĐH",
      dataIndex: "codeClock",
      key: "codeClock",
      width:200
    },
    {
      title: "Tuyến đọc",
      dataIndex: "readingRoute",
      key: "readingRoute",
    },
    {
      title: "Tên KH",
      dataIndex: "username",
      key: "username",
      width:200
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 500,
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "oldIndex",
      key: "oldIndex",
    },
    {
      title: "Chỉ số mới",
      dataIndex: "newIndex",
      key: "newIndex",
    },
    {
      title: "Tiêu thụ",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "Mã ĐT giá",
      dataIndex: "codePrice",
      key: "codePrice",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Phí DTĐN",
      dataIndex: "phiDTDN",
      key: "phiDTDN",
    },
    {
      title: "Phí BVMT",
      dataIndex: "phiBVMT",
      key: "phiBVMT",
    },
    {
      title: "Phí VAT",
      dataIndex: "phiVAT",
      key: "phiVAT",
    },

    {
      title: "Số hóa đơn",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Seri hóa đơn",
      dataIndex: "invoiceSeri",
      key: "invoiceSeri",
    },
    {
      title: "Ngày lập HĐ",
      dataIndex: "createDate",
      key: "createDate",
    },

    {
      title: "Ngày đầu kỳ",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày cuối kỳ",
      dataIndex: "endDate",
      key: "endDate",
    },

    {
      title: "Người thu tiền",
      dataIndex: "collector",
      key: "collector",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      width: 400,
    },
  ];

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log("newSelectedRowKeys", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys); // list hợp đồng id.
    // setTuyenDocId(selectedRows[0]?.tuyenDocId); // tuyến đọc id.
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleGuiVaDong = (values) => {
    values.guiLai = checkbox
    if (values && selectedRowKeys?.length > 0) {
      const data = values;
      data.listHoaDonId = selectedRowKeys;
      data.thangTaoSoDoc = dayjs(thangNam).format("MM/YYYY");
      data.nhaMayId = nhaMayId;
      data.nguoiGuiId = nguoiGuiId;
      data.tenNguoiGui = sessionStorage.getItem("name");
      dispatch(sendSMSMultiple(data))
        .unwrap()
        .then(() => {
          // setCheckbox(false)
          // handleCancel();
          // setSelectedRowKeys([]);
          // formMain.resetFields();
        });
    } else {
      toast.error("Bạn cần phải chọn hợp đồng!");
    }
  };

  const [selectedLoaiMauTin, setSelectedLoaiMauTin] = useState(0);

  const handleLoaiMauTinChange = (value, option) => {
    setSelectedLoaiMauTin(value);
    formMain.resetFields(["noiDungCustom"]);
  };

  useEffect(() => {
    if (isOpen === true) {
      formMain.resetFields(["inforDetail"]);
      formMain.setFieldValue("mauTinNhanId", null);
      setSelectedLoaiMauTin(0);
    }
  }, [isOpen]);
  useEffect(() => {
    dispatch(getSMSType());
  }, []);
  const paymentStatus = (status) => {
    switch (status) {
      case 1:
        return "Chưa thanh toán";
      case 2:
        return "Đã thanh toán";
      case 3:
        return "Chưa duyệt";
      default:
        return "";
    }
  };

  return (
    <Modal
      title="Gửi SMS đồng loạt"
      open={isOpen}
      onOk={props.handleOk}
      onCancel={handleCancel}
      width={1400}
      footer={null}
      centered
      destroyOnClose
    >
      <Collapse
        items={[
          {
            key: "1",
            label: "Tìm kiếm",
            children: <SearchSMS />,
          },
        ]}
        defaultActiveKey="1"
        size="small"
      />
      <Table
        rowKey="id"
        columns={columns}
        rowSelection={rowSelection}
        dataSource={dataSourceTable?.items?.map((item, index) => {
          return {
            id: item.id,
            keyId: item.keyId,
            stt: index + 1,
            contractNumber: item.maHopDong,
            codeClock: item.maDongHo,
            paymentDate:
              item.ngayThanhToan !== null
                ? dayjs(item.ngayThanhToan).format("DD/MM/YYYY HH:mm:ss")
                : null,
            readingRoute: item.tuyenDoc,
            username: item.tenKhachHang,
            phoneNumber: item.dienThoai,
            address: item.diaChi,
            oldIndex: item.chiSoDongHo.chiSoCu,
            newIndex: item.chiSoDongHo.chiSoMoi,
            consumption: item.tieuThu,
            codePrice: item.tenDoiTuongGia,
            totalAmount:
              item.tongTienTruocVat?.toLocaleString("en-US") + " " + "VND",
            phiVAT: item.vat?.toLocaleString("en-US") + " " + "VND",
            invoiceNumber: item.soHoaDon,
            invoiceSeri: item?.responseDanhMucSeriHoaDon?.soHoaDon,
            phiBVMT: item.phiBvmt?.toLocaleString("en-US") + " " + "VND",
            phiDTDN: item.phiDtdn?.toLocaleString("en-US") + " " + "VND",
            totalPrice:
              item.tongTienHoaDon?.toLocaleString("en-US") + " " + "VND",
            createDate: dayjs(item.ngayDoc).format("DD/MM/YYYY"),
            contractDate:
              item.ngayHoaDon === null
                ? ""
                : dayjs(item.ngayHoaDon).format("DD/MM/YYYY"),
            startDate:
              item.ngayDauKy === null
                ? ""
                : dayjs(item.ngayDauKy).format("DD/MM/YYYY"),
            endDate:
              item.ngayCuoiKy === null
                ? ""
                : dayjs(item.ngayCuoiKy).format("DD/MM/YYYY"),
            paid: item.trangThai,
            collector: item?.tenNguoiThuTien,
            note: item?.ghiChu,
          };
        })}
        loading={isLoadingTable}
        size="small"
        scroll={{
          x: 4000,
          y: 240,
        }}
        style={{ marginTop: "10px" }}
        bordered
        pagination={false}
      />
      <Form
        {...layout}
        form={formMain}
        style={{ margin: 10, marginBottom: 0 }}
        onFinish={handleGuiVaDong}
      >
        <Row gutter={24}>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="mauTinNhanId"
              label="Loại mẫu tin"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                style={{
                  width: "100%",
                }}
                fieldNames="mauTinNhanId"
                placeholder="Chọn nhân viên"
                options={smsTypes?.map((item) => ({
                  label: item.apiEndPoint === "customsms" ? "Mẫu tin tự chọn" : "Mẫu tin hóa đơn",          
                  value: item.id,
                }))}
                onChange={handleLoaiMauTinChange}
              />
            </Form.Item>
          </Col>
          {selectedLoaiMauTin === "yy28c1d287924491933e0cf702532cyy" && (
            <>
              <Col
                lg={8}
                style={{
                  width: "100%",
                }}
              >
                <Form.Item
                  name="tieuDeCustom"
                  label="Tiêu đề SMS"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="Nhập tiêu đề SMS"
                  />
                </Form.Item>
              </Col>
              <Col
                lg={8}
                style={{
                  width: "100%",
                }}
              >
                <Form.Item
                  name="noiDungCustom"
                  label="Thông tin SMS"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea
                    showCount
                    style={{
                      width: "100%",
                    }}
                    placeholder="Nhập thông tin SMS"
                    fieldNames="inforDetail"
                  />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
        <Row gutter={24}>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item name="guiLai" label="Gửi lại" >
              <Checkbox onClick={()=>{setCheckbox(!checkbox)}}></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 16,
            width: "100%",
          }}
        >
          <Col
            style={{
              // marginTop: `${isMobile ? "10px" : ""}`,
              textAlign: "end",
            }}
            sm={24}
            md={24}
            lg={12}
          >
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
              style={{
                marginRight: 5,
                width: `${isMobile ? "100%" : ""}`,
                marginTop: `${isTabletOrMobile ? "10px" : ""}`,
              }}
              className="create-modal tab-item-readingIndex-1"
            >
              Gửi
            </Button>
            <Button
              className="custom-btn-close"
              onClick={handleCancel}
              style={{
                marginRight: 5,
                width: `${isMobile ? "100%" : ""}`,
                marginTop: `${isMobile ? "10px" : ""}`,
              }}
            >
              <CloseOutlined />
              Đóng
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateSMSMultiple;
