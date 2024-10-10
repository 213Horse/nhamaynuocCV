import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, theme } from "antd";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { FILTER_MODAL_INFO_CUSTOMERS } from "../../graphql/customers/queries";
import customerSlice from "../../redux/slices/customerSlice/customerSlice";

function FormInfoContract({ formModalInfoCustomer }) {
  const { token } = theme.useToken();

  const [ngayLapDat, setNgayLapDat] = useState(null);
  const [ngayKyHD, setNgayNgayKyHD] = useState(null);
  const [filterSearch, setFilterSearch] = useState({});

  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  // get from graphql
  const { data: filterListCustomer } = useQuery(FILTER_MODAL_INFO_CUSTOMERS, {
    variables: {
      hopDongKeyId: filterSearch ? filterSearch?.hopDongKeyId : "",
      ngayKyHopDongTu: filterSearch ? filterSearch?.ngayKyHopDongTu : null,
      ngayKyHopDongDen: filterSearch ? filterSearch?.ngayKyHopDongDen : null,
      nguoiLapDat: filterSearch ? filterSearch?.nguoiLapDat : "",
      ngayLapDatTu: filterSearch ? filterSearch?.ngayLapDatTu : null,
      ngayLapDatDen: filterSearch ? filterSearch?.ngayLapDatDen : null,
    },
  });

  const layout = {
    labelCol: {
      span: isTabletOrMobile ? 24 : 0,
    },
  };

  useEffect(() => {
    filterListCustomer?.GetHopDongs?.nodes?.length >= 0 &&
      dispatch(
        customerSlice.actions.setFilterModalInfoCustomer(filterListCustomer)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterListCustomer]);

  // handle change ngày ký hợp đồng
  const handleChangeNgayKyHopDong = (date) => {
    if (date) {
      const lastDayOfMonth = moment(date).endOf("month");
      setNgayNgayKyHD(lastDayOfMonth);
    }
  };

  // handle change ngày lắp đặt
  const handleChangeNgayLapDat = (date) => {
    if (date) {
      const lastDayOfMonth = moment(date).endOf("month");
      setNgayLapDat(lastDayOfMonth);
    }
  };

  const handleSubmit = (values) => {
    setFilterSearch(values);
    dispatch(
      customerSlice.actions.btnClickFilterModalInfoCustomer(
        "filterModalInfoCustomer"
      )
    );
  };

  const handleSubmitFailed = (err) => {
    console.log({ err });
  };

  return (
    <>
      <Form
        {...layout}
        form={formModalInfoCustomer}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        style={{
          maxWidth: "none",
          // background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          // paddingTop: 24,
        }}
        fields={[
          {
            name: "ngayKyHopDongDen",
            value: ngayKyHD ? dayjs(ngayKyHD) : null,
          },
          {
            name: "ngayLapDatDen",
            value: ngayLapDat ? dayjs(ngayLapDat) : null,
          },
        ]}
        initialValues={{
          ngayKyHopDongTu: null,
          ngayLapDatTu: null,
          nguoiLapDat: "",
        }}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Form.Item label="Số hợp đồng" name="hopDongKeyId">
              <Input
                name="hopDongKeyId"
                style={{ width: "100%" }}
                placeholder="Nhập số hợp đồng"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={8}>
            <Form.Item label="Ngày ký HD từ" name="ngayKyHopDongTu">
              <DatePicker
                name="ngayKyHopDongTu"
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                onChange={handleChangeNgayKyHopDong}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={8}>
            <Form.Item label="Đến" name="ngayKyHopDongDen">
              <DatePicker
                name="ngayKyHopDongDen"
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Form.Item label="Người lắp đặt" name="nguoiLapDat">
              <Input
                name="nguoiLapDat"
                style={{ width: "100%" }}
                placeholder="Chọn người lắp đặt"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={8}>
            <Form.Item label="Ngày lắp đặt từ" name="ngayLapDatTu">
              <DatePicker
                name="ngayLapDatTu"
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                onChange={handleChangeNgayLapDat}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={8}>
            <Form.Item label="Đến" name="ngayLapDatDen">
              <DatePicker
                name="ngayLapDatDen"
                locale={locale}
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormInfoContract;
