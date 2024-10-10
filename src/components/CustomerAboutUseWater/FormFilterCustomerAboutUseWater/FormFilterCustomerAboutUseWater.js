import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

import {
  fetchApiAllFactorySelector,
  fetchApiAllReadingSelector,
} from "../../../redux/selector";
import { GetUserQuery } from "../../../graphql/users/usersQuery";
import { fetchApiAllFactory } from "../../../redux/slices/factorySlice/factorySlice";
import { fetchApiAllReading } from "../../../redux/slices/readingSlice/readingSlice";

function FormFilterCustomerAboutUseWater() {
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

        {/* Từ ngày (Ngày lắp đặt) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngayLapDatStart" label="Từ ngày: ">
            <DatePicker
            locale={locale}
              name="ngayLapDatStart"
              className="date-time-inp"
              placeholder="Chọn ngày lắp đặt"
              onChange={handleChangeNgayLapDat}
            />
          </Form.Item>
        </Col>

        {/*  Đến ngày (Ngày lắp đặt) */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="ngayLapDatEnd" label="Đến ngày: ">
            <DatePicker
              name="ngayLapDatEnd"
              locale={locale}
              className="date-time-inp"
              placeholder="Chọn ngày lắp đặt"
            />
          </Form.Item>
        </Col>

        {/* Lớn hơn */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="lonHon" label="Lớn hơn ">
            <Input name="lonHon" placeholder="Lớn hơn" />
          </Form.Item>
        </Col>

        {/* Nhỏ hơn */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name="nhoHon" label="Nhỏ hơn ">
            <Input name="nhoHon" placeholder="Nhỏ hơn" />
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

export default FormFilterCustomerAboutUseWater;
