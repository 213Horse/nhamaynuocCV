import { useDispatch, useSelector } from "react-redux";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  btnClickGetFactoryIdSelector,
  fetchApiAllFactorySelector,

  getAllCitySelector,
  getDataForMenuKeKhachHang,
  getHuyenData,
  getTuyenDocOption,
  getXaData,
} from "../../../redux/selector";
import customerSlice, {
  fetchApiGetListOfCustomer,
} from "../../../redux/slices/customerSlice/customerSlice";
import { fetchApiAllPriceObject } from "../../../redux/slices/priceObjectSlice/priceObjectSlice";
import { getAllCities } from "../../../redux/slices/citySlice/citySlice";
import { fetchApiHuyen, fetchApiXa, fetchDataDSKeKhachHang } from "../../../redux/slices/contractSlice/contractSlice";




function FormFilterCustomer() {
  const [ngayLapDat, setNgayLapDat] = useState(null);
  const [ngayKyHopDong, setKyHopDong] = useState(null);
  const [ngaySuDung, setNgaySuDung] = useState(null);
  const [form] = Form.useForm()
  const [huyenId, setHuyenId] = useState("");
  const [tinhId, setTinhId] = useState(null)
  const huyenData = useSelector(getHuyenData);
  const xaData = useSelector(getXaData);
  const dispatch = useDispatch();
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const factoryNames = useSelector(fetchApiAllFactorySelector);
  const listCity = useSelector(getAllCitySelector);
  const dataForMenu =useSelector(getDataForMenuKeKhachHang)
  useEffect(() => {
    if (tinhId) {
      dispatch(fetchApiHuyen(tinhId));
    }
  }, [tinhId]);

  useEffect(() => {
    if (huyenId) {
      dispatch(fetchApiXa(huyenId));
    }
  }, [huyenId]);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: `${isTabletOrMobile ? 6 : 4}`,
    },
    wrapperCol: {
      span: 24,
    },
  };

  useEffect(() => {
    dispatch(fetchApiAllPriceObject());
  }, []);

  const createFilterQueryString2 = () => {
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
    return `${factoryQueryString}`;
  };
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayId=${factoryId}`;
    }
    return `${factoryQueryString}`;
  };


  useEffect(() => {
    dispatch(fetchDataDSKeKhachHang(createFilterQueryString()));
  }, [factoryId]);


  const handleSubmit = (values) => {
    dispatch(fetchApiGetListOfCustomer(values));
    dispatch(
      customerSlice.actions.btnFilterBangKeKH({
        listNhaMayId: values.listNhaMayId,
      })
    );
  };

  const handleFailed = (error) => {
    console.log({ error });
  };
  const handleChangeNgayLapDat = (date) => {
    if (date) {
      const lastDayOfMonth = moment(date).endOf("month");
      setNgayLapDat(lastDayOfMonth);
    }
  };


  const handleChangeNgayDangKyHopDong = (date) => {
    if (date) {
      const lastDayOfMonth = moment(date).endOf("month");
      setKyHopDong(lastDayOfMonth);
    }
  };

  const handleChangeNgaySuDung = (date) => {
    if (date) {
      const lastDayOfMonth = moment(date).endOf("month");
      setNgaySuDung(lastDayOfMonth);
    }
  };

  const handleChangeOptionTinh = (value) => {
    setTinhId(value);
    form.setFieldsValue({quanHuyenId:null, xaPhuongId:null})
  };
  const handleChangeOptionDistrict = (value) => {
    setHuyenId(value);
    form.setFieldsValue({xaPhuongId:null})
  };

  useEffect(() => {
    dispatch(getAllCities());
  }, []);




  return (
    <Form
      {...layout}
      onFinish={handleSubmit}
      onFinishFailed={handleFailed}
      form={form}
      fields={[
        { name: "listNhaMayId", value: factoryNames[0]?.id },
        { name: "trangThaiSuDung", value: 1 },
        { name: "ngayLapDatEnd", value: ngayLapDat ? dayjs(ngayLapDat) : "" },
        {
          name: "ngayKyHopDongEnd",
          value: ngayKyHopDong ? dayjs(ngayKyHopDong) : "",
        },
        { name: "ngaySuDungEnd", value: ngaySuDung ? dayjs(ngaySuDung) : "" },
        { name: "loaiKhachHang", value: "" },
      ]}
    >
      <Row gutter={24}>
        {/* Người quản lý */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="nguoiQuanLyId" label="Nhân viên: ">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              fieldNames="nguoiQuanLyId"

              placeholder="Chọn nhân viên"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="tuyenDoc" label="Tuyến đọc: ">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              fieldNames="tuyenDoc"
              placeholder="Chọn tuyến đọc"
              options={dataForMenu?.tuyenDoc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            ></Select>
          </Form.Item>
        </Col>

        {/* Đối tượng giá */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="doiTuongGia" label="Đối tượng giá">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              fieldNames="doiTuongGia"
              placeholder="Chọn đối tượng giá"
              options={dataForMenu?.doiTuongGia?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
                          >
             
            </Select>
          </Form.Item>
        </Col>

        {/* Kiểu đồng hồ */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="loaiDongHo" label="Kiểu ĐH">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              fieldNames="loaiDongHo"
              placeholder="Chọn kiểu đồng hồ"
              options={dataForMenu?.kieuDongHo?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            >
            </Select>
          </Form.Item>
        </Col>

        {/* Kích cỡ */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="duongKinh" label="Kích cỡ: ">
            <Input
              style={{ fontWeight: "bolder" }}
              size="small"
              name="duongKinh"
              placeholder="Kích cỡ"
            />
          </Form.Item>
        </Col>

        {/* Tình trạng đồng hồ */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="trangThaiSuDung" label="Tình trạng">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              fieldNames="trangThaiSuDung"
              options={dataForMenu?.tinhTrang?.map((item) => ({
                label: item.value,
                value: Number(item.id),
              }))}
              placeholder="Chọn tình trạng của đồng hồ"
            />
          </Form.Item>
        </Col>

        {/* Từ ngày (Ngày lắp đặt) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngayLapDatStart" label="Từ ngày: ">
            <DatePicker
              style={{ fontWeight: "bolder" }}
              size="small"
              name="ngayLapDatStart"
              className="date-time-inp"
              placeholder="Chọn ngày lắp đặt"
              onChange={handleChangeNgayLapDat}
              locale={locale}
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
        </Col>

        {/*  Đến ngày (Ngày lắp đặt) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngayLapDatEnd" label="Đến ngày: ">
            <DatePicker
              style={{ fontWeight: "bolder" }}
              size="small"
              name="ngayLapDatEnd"
              className="date-time-inp"
              placeholder="Chọn ngày lắp đặt"
              locale={locale}
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
        </Col>

        {/*  Từ ngày (Ngày đăng ký hợp đồng) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngayKyHopDongStart" label="Từ ngày: ">
            <DatePicker
              style={{ fontWeight: "bolder" }}
              size="small"
              name="ngayKyHopDongStart"
              className="date-time-inp"
              placeholder="Chọn ngày đăng ký hợp đồng"
              onChange={handleChangeNgayDangKyHopDong}
              locale={locale}
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
        </Col>

        {/*  Đến ngày (Ngày đăng ký hợp đồng) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngayKyHopDongEnd" label="Đến ngày: ">
            <DatePicker
              style={{ fontWeight: "bolder" }}
              size="small"
              name="ngayKyHopDongEnd"
              className="date-time-inp"
              placeholder="Chọn ngày đăng ký hợp đồng"
              locale={locale}
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
        </Col>

        {/*  Từ ngày (Ngày sử dụng) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngaySuDungStart" label="Từ ngày: ">
            <DatePicker
              style={{ fontWeight: "bolder" }}
              size="small"
              name="ngaySuDungStart"
              className="date-time-inp"
              placeholder="Chọn ngày sử dụng"
              onChange={handleChangeNgaySuDung}
              locale={locale}
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
        </Col>

        {/*  Đến ngày (Ngày sử dụng) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngaySuDungEnd" label="Đến ngày: ">
            <DatePicker
              style={{ fontWeight: "bolder" }}
              size="small"
              name="ngaySuDungEnd"
              className="date-time-inp"
              placeholder="Chọn ngày sử dụng"
              locale={locale}
              format={"DD/MM/YYYY"}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="tinhId" label="Tỉnh: ">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              options={listCity.map((item) => ({
                value: item.id,
                label: item.ten,
              }))}
              onChange={handleChangeOptionTinh}
              placeholder="Chọn tỉnh"
            ></Select>
          </Form.Item>
          </Col>
        {/* Quận/ Huyện */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="quanHuyenId" label="Quận/ Huyện">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              options={
                huyenData?.filters?.length <= 0
                  ? []
                  : huyenData?.filters?.map((_district) => ({
                      label: _district.ten,
                      value: _district.id,
                    }))
              }
              placeholder="Chọn quận - huyện"
              disabled={!tinhId}
              onChange={handleChangeOptionDistrict}
            ></Select>
          </Form.Item>
        </Col>

        {/* Xã/ Phường */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="xaPhuongId" label="Xã/ Phường">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              options={
                xaData?.filters?.length <= 0
                  ? []
                  : xaData?.filters?.map((_district) => ({
                      label: _district.ten,
                      value: _district.id,
                    }))
              }
              placeholder="Chọn xã - phường"
              disabled={!huyenId}
            ></Select>
          </Form.Item>
        </Col>

        {/* Loại khách hàng */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="loaiKhachHang" label="Loại KH">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              fieldNames="loaiKhachHang"
              options={[
                { value: "CaNhan", label: "1 - Cá nhân" },
                { value: "DonViToChuc", label: "2 - Đơn vị, tổ chức" },
                { value: "", label: "Tất cả" },
              ]}
              placeholder="Chọn loại khách hàng"
            />
          </Form.Item>
        </Col>
        
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="phuongThucThanhToanId" label="Hình thức TT">
            <Select
              style={{ fontWeight: "bolder" }}
              size="small"
              fieldNames="phuongThucThanhToanId"
              options={dataForMenu?.hinhThucThanhToan?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn hình thức thanh toán"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              htmlType="submit"
              className="gutter-item-btn custom-btn-watch-report"
            >
              Xem báo cáo
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default FormFilterCustomer;
