import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Form, Modal, Row, Select, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import SearchSMS from "./SearchSMS";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  fetchApiFilterSoDocBinhThuongSelector,
  fetchApiGetNgayTrongSoDocTheoKySelector,
  getAllKySelector,
  getCanBoDoc,
  getKeyIdTuyenDoc,
  getThangNam,
  isLoadingDsSoDocSelector,
  setOptionThangNamSelector,
} from "../../../redux/selector";
import { fetchApiGetNgayTrongSoDocTheoKy } from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { toast } from "react-toastify";
import { sendSMSSingle } from "../../../redux/slices/invoiceSlice/invoiceSlice";

const CreateSMS = (props) => {
  const dispatch = useDispatch();
  const { isOpen, handleCancel } = props;
  const [formMain] = Form.useForm();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  //   const canBoDocSelector = useSelector(getCanBoDoc);

  const [selectedRowKeys, setSelectedRowKeys] = useState("");
  //   const [formatTenSo, setFormatTenSo] = useState("");
  const nhaMayId = sessionStorage.getItem("current_factory_id");
  const nguoiGuiId = sessionStorage.getItem("userId");

  //   const dsKyGhiChiSo = useSelector(getAllKySelector);
  const dsSoDocBinhThuong = useSelector(fetchApiFilterSoDocBinhThuongSelector);
  const optionThangNam = useSelector(getThangNam);
  const loading = useSelector(isLoadingDsSoDocSelector);

  //   const dataOptionThangNam = useSelector(
  //     fetchApiGetNgayTrongSoDocTheoKySelector
  //   );
  //   const maTuyenDoc = useSelector(getKeyIdTuyenDoc);

  //   useEffect(() => {
  //     formMain.setFieldsValue({
  //       ngayHoaDon: dataOptionThangNam
  //         ? dayjs(dataOptionThangNam?.ngayHoaDon)
  //         : "",
  //     });
  //     formMain.setFieldsValue({
  //       ngayDauKy: dataOptionThangNam ? dayjs(dataOptionThangNam?.ngayDauKy) : "",
  //     });
  //     formMain.setFieldsValue({
  //       ngayCuoiKy: dataOptionThangNam
  //         ? dayjs(dataOptionThangNam?.ngayCuoiKy)
  //         : "",
  //     });
  //   }, [dataOptionThangNam, formMain]);

  //   useEffect(() => {
  //     formMain.setFieldsValue({ tenSo: formatTenSo ? formatTenSo : "" });
  //   }, [formMain, formatTenSo, optionThangNam]);

  //   const optionsKGCS = dsKyGhiChiSo?.map((item) => ({
  //     label: item.moTa,
  //     value: item.id,
  //   }));

  const columns = [
    {
      title: "Số HĐ",
      dataIndex: "keyIdHopDong",
      key: "keyIdHopDong",
    },
    {
      title: "Mã ĐH",
      dataIndex: "keyIdDongHo",
      key: "keyIdDongHo",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      key: "tenKhachHang",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
      width: 300,
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "chiSoCu",
      key: "chiSoCu",
      width: 200,
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
    setSelectedRowKeys(newSelectedRowKeys); // list hợp đồng id.
    // setTuyenDocId(selectedRows[0]?.tuyenDocId); // tuyến đọc id.
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //   // Handle change (Kỳ ghi chỉ số -> tạo ra các ngày)
  //   const handleChangeKyGhiChiSo = (value) => {
  //     dispatch(
  //       fetchApiGetNgayTrongSoDocTheoKy({
  //         value: value,
  //         optionThangNam: optionThangNam,
  //       })
  //     );
  //   };

  //   // handle change (Cán bộ đọc)
  //   const handleChangeCanBodoc = (value, { label }) => {
  //     setFormatTenSo(
  //       `Tháng ${dayjs(optionThangNam).format("MM/YYYY")} ${
  //         maTuyenDoc?.keyId
  //       } ${label}`
  //     );
  //   };

  const handleGuiVaDong = (values) => {
    if (values && selectedRowKeys?.length > 0) {
      const data = values;
      data.nhaMayId = nhaMayId;
      data.nguoiGuiId = nguoiGuiId;
      data.thangTaoSoDoc = optionThangNam;
      data.soDocChiSoId = selectedRowKeys;
      dispatch(sendSMSSingle(data))
        .unwrap()
        .then(() => {
          handleCancel();
          setSelectedRowKeys(null);
          // setTuyenDocId({});
          formMain.resetFields();
        });
    } else {
      toast.error("Bạn cần phải chọn hợp đồng!");
    }
  };

  //   const [selectedLoaiMauTin, setSelectedLoaiMauTin] = useState(0);

  //   const handleLoaiMauTinChange = (value) => {
  //     // Update the selectedLoaiMauTin state when the value changes
  //     setSelectedLoaiMauTin(value);
  //     formMain.resetFields(["inforDetail"]);
  //   };

  return (
    <Modal
      title="Gửi SMS riêng lẻ"
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
        loading={loading}
        dataSource={
          dsSoDocBinhThuong?.length > 0
            ? dsSoDocBinhThuong?.map((_hopDong, index) => ({
                id: _hopDong.id,
                keyIdHopDong: _hopDong.keyId,
                keyIdDongHo: _hopDong.keyId,
                tenKhachHang: _hopDong.khachHangId,
                diaChi: _hopDong.diachi,
                tuyenDocId: _hopDong?.dongHoNuocList[0]?.tuyenDocId,
                chiSoCu: _hopDong.chiSoCu,
              }))
            : []
        }
        size="small"
        scroll={{
          x: 1300,
          y: 240,
        }}
        style={{ marginTop: "10px" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              onSelectChange([record.id], [record]); // Update selected row keys
            },
          };
        }}
        bordered
      />
      <Form
        {...layout}
        form={formMain}
        style={{ margin: 10, marginBottom: 0 }}
        onFinish={handleGuiVaDong}
      >
        {/* <Row gutter={24}>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="loaiMauTin"
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
                fieldNames="loaiMauTin"
                placeholder="Chọn nhân viên"
                options={[
                  {
                    value: 1,
                    label: "Mẫu tin tự chọn",
                  },
                  {
                    value: 2,
                    label: "Mẫu tin hóa đơn",
                  },
                ]}
                onChange={handleLoaiMauTinChange}
              />
            </Form.Item>
          </Col>
          {selectedLoaiMauTin === 1 && (
            <Col
              lg={8}
              style={{
                width: "100%",
              }}
            >
              <Form.Item
                name="inforDetail"
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
          )}
        </Row> */}
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
              Gửi và đóng
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

export default CreateSMS;
