import { CloseCircleOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./ModalAddReading.css";
import { useDispatch, useSelector } from "react-redux";
import { addDMTuyenDoc, getAllTuyenDoc, getUserByBieuMau, getUserByNhaMay, getUserBySuaBieuMau, getUserThuTien } from "../../../../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { fetchApiAllArea, fetchApiAllAreaByNhaMay } from "../../../../../redux/slices/areaSlice/areaSlice";
import Captcha from "../../../../../components/Captcha/Captcha";
import { useMediaQuery } from "react-responsive";
import {
  btnClickGetFactoryIdSelector,
  fetchApiAllAreaByNhaMayIdSelector,
  fetchApiAllFactorySelector,
  getAllKySelector,
  getCanBoDocThuTien,
  getPhongBanSelector,
  getUserByBieuMauSelector,
  getUserBySuaBieuMauSelector,
  getUserNhaMaySelector,
} from "../../../../../redux/selector";
import moment from "moment";
import dayjs from "dayjs";
import { getAllNguoiDung, getNguoiDungNotManaging } from "../../../../../redux/slices/NguoiDungSlice/nguoidungSlice";
import { getAllKy } from "../../../../../redux/slices/DMKy/kySlice";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { fetchPhongBan } from "../../../../../redux/slices/phongBanSlice/phongBanSlice";

const ModalAddReading = ({
  isOpenModalAddReading,
  setIsOpenModalAddReading,
}) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const tabList = useSelector((state) => state.tabListContractSlice.tabList);
  const factoryList = useSelector(fetchApiAllFactorySelector);
  const listKy = useSelector(getAllKySelector);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const listAreas = useSelector(fetchApiAllAreaByNhaMayIdSelector);
  const danhSachNguoiDungNotManage = useSelector(
    (state) => state.nguoidung.danhSachNguoiDungNotManage
  );
  const danhSachNguoiDung = useSelector(getCanBoDocThuTien);
  const nhanVienXemBieuMau = useSelector(getUserByBieuMauSelector)
  const nhanVienSuaBieuMau = useSelector(getUserBySuaBieuMauSelector)
  const userByNhaMay = useSelector(getUserNhaMaySelector);
  const [loadings, setLoadings] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha
  const captchaRef = useRef();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  
  useEffect(() => {
    const nhaMayId = createFilterQueryString();
    dispatch(getUserByNhaMay(nhaMayId));
  }, [factoryId]);

  
  useEffect(() => {
    dispatch(fetchPhongBan());
  }, [factoryId]);


  useEffect(() => {
    const queryString = createFilterQueryString()
    dispatch(getNguoiDungNotManaging(queryString));
  }, [factoryId]);

  useEffect(() => {
    const queryString = createFilterQueryString()
    dispatch(getUserThuTien(queryString));
  }, [factoryId]);

  useEffect(() => {
    const nhaMayId = createFilterQueryString()
    // const phongBanId = "1f625a1af4ee4630b31616d7a11ed46b" //id phòng ban xem biểu mẩu
    const data = {nhaMayId}
    dispatch(getUserByBieuMau(data));
  }, [factoryId]); 

  useEffect(() => {
    const nhaMayId = createFilterQueryString()
    // const phongBanId = "042f36dacb644b9b87499172f8d6e7e7"//id phòng ban sửa biểu mẩu
    const data = {nhaMayId}
    dispatch(getUserBySuaBieuMau(data));
  }, [factoryId]); 

 

  useEffect(() => {
    dispatch(fetchApiAllAreaByNhaMay(factoryId));
  }, []);

  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(getAllKy(queryString));
  }, [factoryId]);

  useEffect(() => {
    dispatch(getAllNguoiDung());
  }, [factoryId]);

  const onFinish = async (values) => {
    const queryString = createFilterQueryString();
    const data = {
      ...values,
      thoiGianThu: dayjs(values.thoiGianThu)
        .locale("vi")
        .format("YYYY-MM-DDTHH:mm:ssZ"),
      ngayGhiCSTu: dayjs(values.ngayGhiCSTu)
        .locale("vi")
        .format("YYYY-MM-DDTHH:mm:ssZ"),
      ngayGhiCSDen: dayjs(values.ngayGhiCSDen)
        .locale("vi")
        .format("YYYY-MM-DDTHH:mm:ssZ"),
    };
    if (data) {
      await dispatch(addDMTuyenDoc(data));
       dispatch(getAllTuyenDoc(queryString))
    }
    setIsOpenModalAddReading(false);
    form.resetFields();
  };

  const handleSaveAndContinue = async () => {
    const values = await form.validateFields();
    const data = {
      ...values,
      thoiGianThu: dayjs(values.thoiGianThu)
        .locale("vi")
        .format("YYYY-MM-DDTHH:mm:ssZ"),
      ngayGhiCSTu: dayjs(values.ngayGhiCSTu)
        .locale("vi")
        .format("YYYY-MM-DDTHH:mm:ssZ"),
      ngayGhiCSDen: dayjs(values.ngayGhiCSDen)
        .locale("vi")
        .format("YYYY-MM-DDTHH:mm:ssZ"),
    };

    if (data) {
      const date_from = new Date(values.ngayBatDau.toDate()).getTime();
      const date_to = new Date(values.ngayKetThuc.toDate()).getTime();
      // thời gian bat đầu phải nhỏ hon ket thuc
      if (date_from > date_to) {
        alert("Ngày gửi không thể lớn hơn ngày nhận:");
        return;
      }
      dispatch(addDMTuyenDoc(data));
    }
    form.resetFields();
    setIsCaptcha(false);
    captchaRef.current.reset();
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };

  return (
    <Form
      onFinish={onFinish}
      labelCol={{ lg: { span: 8 }, md: { span: 4 } }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      form={form}
    >
      <Row>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Nhân viên"
            name="nguoiQuanLyId"
            rules={[{ required: true, message: "Hãy chọn nhân viên!" }]}
          >
           <Select
            options={
              userByNhaMay?.map((item) => ({
                label: item.name,
                value: item.userId,
              })) || []
            }
            placeholder="Chọn Nhân Viên"
          ></Select>
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Số thứ tự"
            name="stt"
            rules={[{ required: true, message: "Hãy nhập số thứ tự!" }]}
          >
            <InputNumber
              min={1}
              size="middle"
              placeholder="Số thứ tự"
              style={{ width: "100%" }}
              required
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Mã tuyến"
            name="keyId"
            rules={[{ required: true, message: "Hãy nhập vào mã tuyến!" }]}
          >
            <Input placeholder="Mã tuyến" required />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Tên tuyến"
            name="tenTuyen"
            rules={[{ required: true, message: "Hãy nhập vào tên tuyến!" }]}
          >
            <Input placeholder="Tên tuyến" required />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="NV thu tiền"
            name="nguoiThuTienId"
            rules={[
              { required: true, message: "Hãy chọn nhân viên thu tiền!" },
            ]}
          >
            <Select
              mode="multiple"
              size="middle"
              placeholder="Chọn nhân viên"
              style={{ width: "100%" }}
              options={
              userByNhaMay?.map((item) => ({
                label: item.name,
                value: item.userId,
              })) || []
            }
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="Số ĐT người thu" name="sdtNguoiThu" {...rules}>
            <Input placeholder="Số ĐT người thu" required />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="Địa chỉ thu" name="diaChiThu" {...rules}>
            <Input placeholder="Địa chỉ thu" required />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="Thời gian thu" name="thoiGianThu" {...rules}>
            <DatePicker
              placeholder="Thời gian thu"
              locale={locale}
              style={{ width: "100%" }}
              format={dateFormatList}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="Số ĐT hóa đơn" name="sdtHoaDon" {...rules}>
            <Input placeholder="Số ĐT hóa đơn" required />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="Số ĐT sửa chữa" name="sdtSuaChua" {...rules}>
            <Input required placeholder="Số ĐT sửa chữa" />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="Kỳ ghi chỉ số" name="kyGhiChiSoId" {...rules}>
            <Select
              size="middle"
              placeholder="Kỳ ghi chỉ số"
              style={{ width: "100%" }}
              options={listKy?.map((item) => ({
                value: item.id,
                label: item.moTa,
              }))}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Khu vực"
            name="khuVucId"
            rules={[{ required: true, message: "Khu vực không được để trống" }]}
          >
            <Select
              size="middle"
              placeholder="Chọn khu vực"
              style={{ width: "100%" }}
              options={listAreas?.map((item) => ({
                value: item.id,
                label: item.tenKhuVuc,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="NV xem biểu mẫu" name="nhanVienXem" {...rules}>
            <Select
              size="middle"
              placeholder="Chọn nhân viên xem biểu mẫu"
              style={{ width: "100%" }}
              options={
              userByNhaMay?.map((item) => ({
                label: item.name,
                value: item.userId,
              })) || []
            }
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="NV sửa biểu mẫu" name="nhanVienSua" {...rules}>
            <Select
              size="middle"
              placeholder="Chọn nhân viên sửa biểu mẫu"
              style={{ width: "100%" }}
              options={
              userByNhaMay?.map((item) => ({
                label: item.name,
                value: item.userId,
              })) || []
            }
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="Đơn vị" name="nhaMayId" {...rules}>
            <Select
              size="middle"
              placeholder="Chọn đơn vị"
              style={{ width: "100%" }}
              options={factoryList?.map((item) => ({
                value: item.id,
                label: item.tenNhaMay,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
      <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="NV đọc chỉ số"
            name="nhanVienDocChiSoId"
            rules={[{ required: true, message: "Hãy chọn nhân viên!" }]}
          >
           <Select
           mode="multiple"
            options={
              userByNhaMay?.map((item) => ({
                label: item.name,
                value: item.userId,
              })) || []
            }
            placeholder="Chọn Nhân Viên Đọc Chỉ Số"
          ></Select>
          </Form.Item>
        </Col>
      <Col lg={8} md={24} xs={24}>
          <Form.Item label="Ngày ghi CS từ" name="ngayGhiCSTu" {...rules}>
            <DatePicker
              placeholder="Chọn ngày ghi từ"
              locale={locale}
              style={{ width: "100%" }}
              format={dateFormatList}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item label="Ngày ghi CS đến" name="ngayGhiCSDen" {...rules}>
            <DatePicker
              placeholder="Chọn ngày ghi từ"
              locale={locale}
              style={{ width: "100%" }}
              format={dateFormatList}
            />
          </Form.Item>
        </Col>
      </Row>

      {tabList && (
        <div style={{ marginBottom: "10px" }}>
          <span style={{ fontWeight: "600" }}>
            Nếu bạn muốn sửa nhân viên quản lý thì dùng chức năng:{" "}
            <span style={{ fontWeight: "600", color: "red" }}>
              Chuyển cán bộ quản lý
            </span>
          </span>
        </div>
      )}

      {/* //captcha */}
      <Row>
        <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
          <Form.Item className="captcha-wrapper">
            <Captcha
              className="captcha-reading"
              onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
              ref={captchaRef}
            />
          </Form.Item>
        </Col>
      </Row>
      {/* //captcha */}

      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        {/* <Button
          type="primary"
          icon={<SaveOutlined />}
          disabled={!isCaptcha}
          className="custom-btn-reset-d"
          onClick={handleSaveAndContinue}
        >
          Lưu và thêm tiếp
        </Button> */}
        <Button
          htmlType="submit"
          icon={<SaveOutlined />}
          className="custom-btn-attachment-d"
          loading={loadings}
          disabled={!isCaptcha}
          style={{
            marginLeft: "10px",
          }}
        >
          Lưu và đóng
        </Button>
        <Button
          icon={<CloseCircleOutlined />}
          onClick={() => {
            setIsOpenModalAddReading(false);
            setIsCaptcha(false);
          }}
          className="custom-btn-close-d"
          style={{
            marginLeft: "10px",
          }}
        >
          Đóng
        </Button>
      </Row>
    </Form>
  );
};

export default ModalAddReading;
