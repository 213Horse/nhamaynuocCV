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
import React, { useEffect, useState } from "react";
import "../ModalAddReading/ModalAddReading.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTuyenDoc, getUserByBieuMau, getUserByNhaMay, getUserBySuaBieuMau, getUserThuTien, updateTuyenDoc } from "../../../../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { fetchApiAllArea, fetchApiAllAreaByNhaMay } from "../../../../../redux/slices/areaSlice/areaSlice";
import Captcha from "../../../../../components/Captcha/Captcha";
import { useMediaQuery } from "react-responsive";
import {
  btnClickGetFactoryIdSelector,
  fetchApiAllAreaByNhaMayIdSelector,
  fetchApiAllFactorySelector,
  getAllKySelector,
  getCanBoDocThuTien,
  getUserByBieuMauSelector,
  getUserBySuaBieuMauSelector,
  getUserNhaMaySelector,
} from "../../../../../redux/selector";
import moment from "moment";
import dayjs from "dayjs";
import { getAllKy } from "../../../../../redux/slices/DMKy/kySlice";
import { getAllNguoiDung, getNguoiDungNotManaging } from "../../../../../redux/slices/NguoiDungSlice/nguoidungSlice";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import tabListReadingSlice from "../../../../../redux/slices/tabListReading/tabListReaingSlice";
const ModalEditReading = ({
  isOpenModalEditReading,
  setIsOpenModalEditReading,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const tabList = useSelector((state) => state.tabListContractSlice.tabList);
  const factoryList = useSelector(fetchApiAllFactorySelector);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const listKy = useSelector(getAllKySelector);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listAreas = useSelector(fetchApiAllAreaByNhaMayIdSelector);
  const userByNhaMay = useSelector(getUserNhaMaySelector);
  const danhSachNguoiDung = useSelector(
    (state) => state.nguoidung.danhSachNguoiDungNotManage
  );
  const danhSachNguoiDungThuTien = useSelector(getCanBoDocThuTien);
  const nhanVienXemBieuMau = useSelector(getUserByBieuMauSelector)
  const nhanVienSuaBieuMau = useSelector(getUserBySuaBieuMauSelector)
  // const danhSachNguoiDung = useSelector(
  //   (state) => state.nguoidung.danhSachNguoiDungNotManage
  // );
  const [loadings, setLoadings] = useState(false);
  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );
  const [isCaptcha, setIsCaptcha] = useState(false); //captcha

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
    dispatch(getAllNguoiDung());
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
    const phongBanId = "1f625a1af4ee4630b31616d7a11ed46b" //id phòng ban xem biểu mẩu
    const data = {nhaMayId, phongBanId}
    dispatch(getUserByBieuMau(data));
  }, [factoryId]); 

  useEffect(() => {
    const nhaMayId = createFilterQueryString()
    const phongBanId = "042f36dacb644b9b87499172f8d6e7e7" //id phòng ban sửa biểu mẩu
    const data = {nhaMayId, phongBanId}
    dispatch(getUserBySuaBieuMau(data));
  }, [factoryId]); 

  useEffect(() => {
    const queryString = createFilterQueryString();
    dispatch(getAllKy(queryString));
  }, [factoryId]);

  useEffect(() => {
    const nhaMayId = createFilterQueryString();
    dispatch(getUserByNhaMay(nhaMayId));
  }, [factoryId]);

  console.log("lsad",listAreas);
  const onFinish = async (values) => {
    const queryString = createFilterQueryString();
    const data = {
      ...values,
      prevKeyId: rowSelected.keyId,
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
      await dispatch(updateTuyenDoc(data));
      dispatch(tabListReadingSlice.actions.btnClickTabListReading(null));
      dispatch(getAllTuyenDoc(queryString))
      console.log(data);
    }
    setIsOpenModalEditReading(false);
    form.resetFields();
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };
console.log("row",rowSelected);
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
            initialValue={rowSelected?.nguoiQuanLyId}
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
            initialValue={rowSelected?.stt || 0}
          >
            <InputNumber
              min={1}
              size="middle"
              placeholder="Số thứ tự"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Mã tuyến"
            name="keyId"
            rules={[{ required: true, message: "Hãy nhập vào mã tuyến!" }]}
            initialValue={rowSelected?.keyId}
          >
            <Input placeholder="Mã tuyến" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Tên tuyến"
            name="tenTuyen"
            rules={[{ required: true, message: "Hãy nhập vào tên tuyến!" }]}
            initialValue={rowSelected?.tenTuyen}
          >
            <Input placeholder="Tên tuyến" />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="NV thu tiền"
            name="nguoiThuTienId"
            rules={[
              { required: true, message: "Hãy chọn nhân viên thu tiền!" },
            ]}
            initialValue={rowSelected?.listNhanVienThuTien ? rowSelected.listNhanVienThuTien.map(nhanVien => nhanVien.nhanVienId) : []}
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
          <Form.Item
            label="Số ĐT người thu"
            name="sdtNguoiThu"
            {...rules}
            initialValue={rowSelected?.sdtNguoiThu}
          >
            <Input placeholder="Số ĐT người thu" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Địa chỉ thu"
            name="diaChiThu"
            {...rules}
            initialValue={rowSelected?.diaChiThu}
          >
            <Input placeholder="Địa chỉ thu" />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Thời gian thu"
            name="thoiGianThu"
            {...rules}
            initialValue={dayjs(rowSelected?.thoiGianThu)}
          >
            <DatePicker
              placeholder="Thời gian thu"
              locale={locale}
              style={{ width: "100%" }}
              format={dateFormatList}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Số ĐT hóa đơn"
            name="sdtHoaDon"
            {...rules}
            initialValue={rowSelected?.sdtHoaDon}
          >
            <Input placeholder="Số ĐT hóa đơn" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Số ĐT sửa chữa"
            name="sdtSuaChua"
            {...rules}
            initialValue={rowSelected?.sdtSuaChua}
          >
            <Input placeholder="Số ĐT sửa chữa" />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} xs={24}>
          <Form.Item
            label="Kỳ ghi chỉ số"
            name="kyGhiChiSoId"
            {...rules}
            initialValue={rowSelected?.kyGhiChiSoId}
          >
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
            initialValue={listAreas.find((item) => item.tenKhuVuc === rowSelected?.khuVucId)?.id}
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
          <Form.Item
            label="NV xem biểu mẫu"
            name="nhanVienXem"
            {...rules}
            initialValue={rowSelected?.nhanVienXem}
          >
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
          <Form.Item
            label="NV sửa biểu mẫu"
            name="nhanVienSua"
            {...rules}
            initialValue={rowSelected?.nhanVienSua}
          >
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
          <Form.Item
            label="Đơn vị"
            name="nhaMayId"
            {...rules}
            initialValue={rowSelected?.nhaMayId}
          >
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
            label="NV Đọc Chỉ Số"
            name="nhanVienDocChiSoId"
            rules={[{ required: true, message: "Hãy chọn nhân viên!" }]}
            initialValue={rowSelected?.nhanVienDocChiSoId ? rowSelected.nhanVienDocChiSoId.split(',') : []}
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
          <Form.Item
            label="Ngày ghi CS từ"
            name="ngayGhiCSTu"
            {...rules}
            initialValue={dayjs(rowSelected?.ngayGhiCSTu)}
          >
            <DatePicker
              placeholder="Chọn ngày ghi từ"
              locale={locale}
              style={{ width: "100%" }}
              format={dateFormatList}
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} xs={24}>
          <Form.Item
            label="Ngày ghi CS đến"
            name="ngayGhiCSDen"
            {...rules}
            initialValue={dayjs(rowSelected?.ngayGhiCSDen)}
          >
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
              ref={null}
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
        <Button
          type="primary"
          icon={<SaveOutlined />}
          disabled={!isCaptcha}
          className="custom-btn-reset-d"
          loading={loadings}
          htmlType="submit"
        >
          Lưu
        </Button>
        <Button
          icon={<CloseCircleOutlined />}
          onClick={() => {
            setIsOpenModalEditReading(false);
            form.resetFields();
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

export default ModalEditReading;
