import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@apollo/client";
import moment from "moment";
import dayjs from "dayjs";
import { useState } from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  fetchApiAllFactorySelector,
  fetchApiAllReadingSelector,
} from "../../../redux/selector";
import { fetchApiAllFactory } from "../../../redux/slices/factorySlice/factorySlice";
import { GetUserQuery } from "../../../graphql/users/usersQuery";
import { fetchApiAllReading } from "../../../redux/slices/readingSlice/readingSlice";

function FormFilterClockIndex() {
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
      span: `${isTabletOrMobile ? 6 : 4}`,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const handleGetAllFactory = () => {
    dispatch(fetchApiAllFactory());
  };

  const handleGetAllReading = () => {
    dispatch(fetchApiAllReading());
  };

  const handleSubmitForm = (values) => {
    const date_from = new Date(values.ngayLapDatStart.toDate()).getTime();
    const date_to = new Date(values.ngayLapDatEnd.toDate()).getTime();
    if (date_from > date_to) {
      alert("Ngày gửi không thể lớn hơn ngày nhận:");
      return;
    }

    values.ngayLapDatStart = moment(date_from).format("DD-MM-YYYY");
    values.ngayLapDatEnd = moment(date_to).format("DD-MM-YYYY");

    console.log(values);
  };

  const handleSubmitFormFailed = (error) => {
    console.log({ error });
  };

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
        <Col xs={24} sm={24} md={12} lg={12}>
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

        {/* Tiêu chí */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="tieuChi" label="Tiêu chí">
            <Select
              fieldNames="tieuChi"
              options={[
                { value: "", label: "Tất cả" },
                { value: "CoSanLuong", label: "Có sản lượng" },
                { value: "KhongCoSanLuong", label: "Không có sản lượng" },
              ]}
              placeholder="Chọn tiêu chí"
            />
          </Form.Item>
        </Col>

        {/* Vùng */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="vung" label="Vùng">
            <Select
              fieldNames="vung"
              options={[
                { value: "", label: "Tất cả" },
                { value: "baovinh", label: "Bảo Vinh" },
              ]}
              placeholder="Chọn vùng"
            />
          </Form.Item>
        </Col>

        {/* Khu vực */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="khuVuc" label="Khu vực">
            <Select
              fieldNames="khuVuc"
              options={[
                { value: "", label: "Tất cả" },
                { value: "baovinh", label: "Bảo Vinh" },
              ]}
              placeholder="Chọn khu vực"
            />
          </Form.Item>
        </Col>

        {/* Nhân viên */}
        <Col xs={24} sm={24} md={12} lg={12}>
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

        {/* Tuyến đọc */}
        <Col xs={24} sm={24} md={12} lg={12}>
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
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="ngayLapDatStart" label="Từ ngày: ">
            <DatePicker
              locale={locale}
              name="ngayLapDatStart"
              className="date-time-inp"
              placeholder="Chọn ngày lắp đặt"
            />
          </Form.Item>
        </Col>

        {/*  Đến ngày (Ngày lắp đặt) */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="ngayLapDatEnd" label="Đến ngày: ">
            <DatePicker
              locale={locale}
              name="ngayLapDatEnd"
              className="date-time-inp"
              placeholder="Chọn ngày lắp đặt"
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

export default FormFilterClockIndex;
