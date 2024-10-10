import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { fetchApiAllFactory } from "../../../redux/slices/factorySlice/factorySlice";
import { fetchApiAllReading } from "../../../redux/slices/readingSlice/readingSlice";
import dayjs from "dayjs";
import {
  btnClickGetFactoryIdSelector,
  fetchApiAllFactorySelector,
  fetchApiAllReadingSelector,
} from "../../../redux/selector";
import { GetUserQuery } from "../../../graphql/users/usersQuery";
import "./formfilter.css";
import {
  fetchBaoCaoSMS,
  invoiceSlice,
} from "../../../redux/slices/invoiceSlice/invoiceSlice";
function FormFilterNotReadNumber({ setCurPage }) {
  const [ngayLapDat, setNgayLapDat] = useState(null);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const factoryID = useSelector(btnClickGetFactoryIdSelector);

  // get from graphql
  const { data: users } = useQuery(GetUserQuery);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: `${isTabletOrMobile ? 8 : 6}`,
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

  const handleSubmitForm = (values) => {
    const nhaMayIds = createFilterQueryString();
    values.nhaMayIds = nhaMayIds;
    if (values.TuNgay) {
      values.TuNgay = encodeURIComponent(
        dayjs(values.TuNgay).format("DD/MM/YYYY")
      );
    }
    if (values.DenNgay) {
      values.DenNgay = encodeURIComponent(
        dayjs(values.DenNgay).format("DD/MM/YYYY")
      );
    }

    values.pageNumber = 1;
    values.pageSize = 10;
    dispatch(invoiceSlice.actions.setFilterData(values));
    dispatch(fetchBaoCaoSMS(values));
    setCurPage(1);
  };

  const handleReset = () => {
    const trangthai = 2;
    const nhaMayIds = createFilterQueryString();
    const pageNumber = 1;
    const pageSize = 10;
    const values = { trangthai, nhaMayIds, pageNumber, pageSize };
    dispatch(fetchBaoCaoSMS(values));
    dispatch(invoiceSlice.actions.setFilterData(null));
    form.resetFields();
    setCurPage(1);
  };

  const handleSubmitFormFailed = (error) => {
    console.log({ error });
  };

  return (
    <Form
      form={form}
      {...layout}
      onFinish={handleSubmitForm}
      onFinishFailed={handleSubmitFormFailed}
    >
      <Row>
        {/* Đơn vị */}
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Item name="TuNgay" label="Từ ngày: " className="text-start">
            <DatePicker
              placeholder="Chọn ngày"
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              locale={locale}
            />
          </Form.Item>
        </Col>{" "}
        <Col xs={12} sm={6} md={6} lg={6}>
          <Form.Item name="DenNgay" label="Đến ngày: " className="text-start">
            <DatePicker
              placeholder="Chọn ngày"
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              locale={locale}
            />
          </Form.Item>
        </Col>
        {/* Nhân viên */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item
            className="text-start"
            name="trangthai"
            style={{
              marginLeft: 12,
            }}
            label="Trạng thái: "
            initialValue={2}
          >
            <Select
              placeholder="Chọn trạng thái gửi SMS"
              options={[
                {
                  label: "Chưa Gửi",
                  value: 1,
                },
                {
                  label: "Thành Công",
                  value: 2,
                },
                {
                  label: "Thất Bại",
                  value: 3,
                },
                {
                  label: "Đang Gửi",
                  value: 4,
                },
                {
                  label: "Tất cả",
                  value: null,
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={22} sm={22} md={22} lg={22}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              htmlType="submit"
              className="gutter-item-btn custom-btn-watch-report"
            >
              Xem báo cáo
            </Button>
          </div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleReset} className="gutter-item-btn">
              Làm mới
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default FormFilterNotReadNumber;
