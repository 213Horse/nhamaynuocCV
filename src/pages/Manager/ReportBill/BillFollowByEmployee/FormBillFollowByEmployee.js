import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiAllFactorySelector,
  fetchApiAllReadingSelector,
} from "../../../../redux/selector";
import { GetUserQuery } from "../../../../graphql/users/usersQuery";
import { useQuery } from "@apollo/client";
import { fetchApiAllFactory } from "../../../../redux/slices/factorySlice/factorySlice";
import { fetchApiAllReading } from "../../../../redux/slices/readingSlice/readingSlice";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

function FormBillFollowByEmployee() {
  const [ngayLapDat, setNgayLapDat] = useState(null);

  const dispatch = useDispatch();

  // get from redux
  const factoryNames = useSelector(fetchApiAllFactorySelector);
  const readings = useSelector(fetchApiAllReadingSelector);

  // get from graphql
  const { data: users } = useQuery(GetUserQuery);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: `${isTabletOrMobile ? 8 : 6}`,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const handleGetAllFactory = () => {
    dispatch(fetchApiAllFactory());
  };

  const handleGetAllReading = () => {
    dispatch(fetchApiAllReading());
  };

  // handle change ngày lắp đặt
  const handleChangeNgayLapDat = (date) => {
    if (date) {
      const lastDayOfMonth = moment(date).endOf("month");
      setNgayLapDat(lastDayOfMonth);
    }
  };

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  const handleSubmitFormFailed = (error) => {
    console.log({ error });
  };

  const [fromDate, setFromDate] = useState(false);
  const [toDate, setToDate] = useState(false);
  const [biggerThan, setBiggerThan] = useState(false);
  const [smallerThan, setSmallerThan] = useState(false);

  return (
    <Form
      {...layout}
      onFinish={handleSubmitForm}
      onFinishFailed={handleSubmitFormFailed}
      fields={[
        { name: "ngayLapDatEnd", value: ngayLapDat ? dayjs(ngayLapDat) : "" },
      ]}
    >
      <Row>
        {/* Đơn vị */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="listNhaMayId" label="Đơn vị: ">
            <Select fieldNames="listNhaMayId" onClick={handleGetAllFactory}>
              {factoryNames?.length > 0
                ? factoryNames?.map((_factory) => {
                    return (
                      <Select.Option key={_factory.id} value={_factory.id}>
                        {_factory.tenNhaMay}
                      </Select.Option>
                    );
                  })
                : []}
            </Select>
          </Form.Item>
        </Col>

        {/* Nhân viên */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="nhanVienXem" label="Nhân viên: ">
            <Select
              fieldNames="nhanVienXem"
              options={
                users?.GetUsers?.nodes?.length <= 0
                  ? []
                  : users?.GetUsers?.nodes?.map((_nameManager) => ({
                      label: _nameManager.userName,
                      value: _nameManager.id,
                    }))
              }
              placeholder="Chọn nhân viên"
            />
          </Form.Item>
        </Col>

        {/* Tìm kiếm tuyến */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="timTuyen" label="Tìm kiếm tuyến ">
            <Input name="timTuyen" placeholder="Tìm kiếm tuyến" />
          </Form.Item>
        </Col>

        {/* Tuyến đọc */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="tuyenDoc" label="Tuyến đọc: ">
            <Select
              fieldNames="tuyenDoc"
              placeholder="Chọn tuyến đọc"
              onClick={handleGetAllReading}
            >
              <Select.Option value="">Tất cả</Select.Option>
              {readings?.length <= 0
                ? []
                : readings?.map((_reading) => {
                    return (
                      <Select.Option key={_reading.id} value={_reading.id}>
                        {_reading.tenTuyen}
                      </Select.Option>
                    );
                  })}
            </Select>
          </Form.Item>
        </Col>

        {/* Từ ngày (Ngày lắp đặt) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngayLapDatStart" label="Từ ngày: ">
            <Row>
              <Col span={2}>
                <Checkbox onClick={() => setFromDate(!fromDate)} />
              </Col>
              <Col span={22}>
                <DatePicker
                  locale={locale}
                  name="ngayLapDatStart"
                  className="date-time-inp"
                  placeholder="Chọn ngày lắp đặt"
                  onChange={handleChangeNgayLapDat}
                  disabled={!fromDate}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>

        {/*  Đến ngày (Ngày lắp đặt) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngayLapDatEnd" label="Đến ngày: ">
            <Row>
              <Col span={2}>
                <Checkbox onClick={() => setToDate(!toDate)} />
              </Col>
              <Col span={22}>
                <DatePicker
                  locale={locale}
                  name="ngayLapDatEnd"
                  className="date-time-inp"
                  placeholder="Chọn ngày lắp đặt"
                  disabled={!toDate}
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>

        {/* Lớn hơn */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="lonhon" label="Lớn hơn (>=)">
            <Row>
              <Col span={2}>
                <Checkbox onClick={() => setBiggerThan(!biggerThan)} />
              </Col>
              <Col span={22}>
                <Input name="lonhon" disabled={!biggerThan} />
              </Col>
            </Row>
          </Form.Item>
        </Col>

        {/* Nhỏ hơn */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="nhohon" label="Nhỏ hơn (<=)">
            <Row>
              <Col span={2}>
                <Checkbox onClick={() => setSmallerThan(!smallerThan)} />
              </Col>
              <Col span={22}>
                <Input name="nhohon" disabled={!smallerThan} />
              </Col>
            </Row>
          </Form.Item>
        </Col>

        {/* Tình trạng thu */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item
            name="tinhTrangThu"
            label="Tình trạng thu"
            initialValue={"all"}
          >
            <Select
              fieldNames="tinhTrangThu"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "ChuaThu", label: "Chưa thu" },
                { value: "DaThu", label: "Đã thu" },
              ]}
              placeholder="Chọn tình trạng thu"
            />
          </Form.Item>
        </Col>

        {/* Loại khách hàng */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item
            name="loaiKhachHang"
            label="Loại khách hàng"
            initialValue={"all"}
          >
            <Select
              fieldNames="loaiKhachHang"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "canhan", label: "Cá nhân" },
                { value: "tochuc", label: "đơn vị/ tổ chức" },
              ]}
              placeholder="Chọn loại khách hàng"
            />
          </Form.Item>
        </Col>

        {/* Hình thức thanh toán */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item
            name="hinhThucThanhToan"
            label="Hình thức thanh toán"
            initialValue={"all"}
          >
            <Select
              fieldNames="hinhThucThanhToan"
              options={[
                { value: "all", label: "Tất cả" },
                { value: "tienmat", label: "Tiền mặt" },
                { value: "chuyenkhoan", label: "Chuyển khoản" },
                { value: "TMCK", label: "TM hoặc CK" },
                { value: "truluong", label: "Trừ lương" },
              ]}
              placeholder="Chọn hình thức thanh toán"
            />
          </Form.Item>
        </Col>

        {/* Nhân viên thu */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="nhanVienThu" label="Nhân viên thu">
            <Select
              fieldNames="nhanVienThu"
              options={[]}
              placeholder="Chọn nhân viên thu"
            />
          </Form.Item>
        </Col>

        {/* Nhân viên thu tuyến */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="nhanVienThuTuyen" label="Nhân viên thu tuyến">
            <Select
              fieldNames="nhanVienThuTuyen"
              options={[]}
              placeholder="Chọn nhân viên thu tuyến"
            />
          </Form.Item>
        </Col>

        {/* Trạng thái số đọc */}
        {/* <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="trangThaiSoDoc" label="Trạng thái số đọc">
            <Select
              fieldNames="trangThaiSoDoc"
              options={[
                { value: "", label: "Tất cả" },
                { value: "ChuaGhi", label: "Chưa ghi" },
                { value: "DaGhi", label: "Đã ghi" },
                { value: "DHCat", label: "Đồng hồ cắt" },
                { value: "DHKhongSD", label: "Đồng hồ không sử dụng" },
                { value: "VangChu", label: "Vắng chủ" },
                { value: "TamThu", label: "Tạm thu" },
                { value: "TamNgung", label: "Tạm ngưng" },
              ]}
              placeholder="Chọn trạng thái số đọc"
              onClick={handleGetAllReading}
            />
          </Form.Item>
        </Col> */}
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

export default FormBillFollowByEmployee;
