import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import React, { useEffect } from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMaSoTuIdTuyenDoc,
  fetchTuyendocAddselection,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import {
  btnClickGetFactoryIdSelector,
  gettuyendocAddselection,
} from "../../../redux/selector";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  fetchFilterListInvoiceModal,
  invoiceSlice,
} from "../../../redux/slices/invoiceSlice/invoiceSlice";

const SearchSMS = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const gettuyendocoption = useSelector(gettuyendocAddselection);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  useEffect(() => {
    if (nhaMayId) {
      dispatch(fetchTuyendocAddselection(nhaMayId));
    }
  }, [nhaMayId]);

  const onFinish = (values) => {
    if (values) {
      const data = values;
      data.NhaMayIds = nhaMayId;
      dispatch(fetchFilterListInvoiceModal(data));
      dispatch(invoiceSlice.actions.setThangNam(data.ThangTaoHoaDon));
    }
  };

  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const handleChangeTuyenDocGetMaTuyenDoc = (value) => {
    console.log("val tuyen doc ->", value);
    dispatch(fetchMaSoTuIdTuyenDoc(value));
  };

  useEffect(() => {
    form.setFieldsValue({ ThangTaoHoaDon: dayjs(new Date()) });
  }, [form]);

  return (
    <Form {...layout} form={form} onFinish={onFinish}>
      <Row gutter={24}>
        <Col sx={24} sm={24} md={12} lg={8} style={{ width: "100%" }}>
          <Form.Item
            name="ThangTaoHoaDon"
            label="Tháng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              name="ThangTaoHoaDon"
              allowClear
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              locale={locale}
              format={"MM-YYYY"}
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={8} style={{ width: "100%" }}>
          <Form.Item
            name="TuyenDocId"
            label="Tuyến đọc"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          >
            <Select
              fieldNames="TuyenDocId"
              allowClear
              options={
                gettuyendocoption?.length > 0
                  ? gettuyendocoption?.map((danhMucTuyenDocResponses) => ({
                      label: danhMucTuyenDocResponses?.tenTuyen,
                      value: danhMucTuyenDocResponses?.id,
                    }))
                  : []
              }
              placeholder="Chọn tuyến đọc"
              onChange={handleChangeTuyenDocGetMaTuyenDoc}
            />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={8} style={{ width: "100%" }}>
          <Form.Item name="TenKhachHang" label="Tên khách hàng">
            <Input
              style={{
                width: "100%",
              }}
              placeholder="Nhập tên khách hàng"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col sx={24} sm={24} md={12} lg={8} style={{ width: "100%" }}>
          <Form.Item
            name="TrangThaiHoaDon"
            label="Trạng thái HĐ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Chọn trạng thái hóa đơn"
              allowClear
              style={{ width: "100%", fontWeight: "bolder" }}
              options={[
                {
                  value: 1,
                  label: "Chưa thanh toán",
                },
                {
                  value: 2,
                  label: "Đã thanh toán",
                },
                {
                  value: 3,
                  label: "Chưa duyệt",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={8} style={{ width: "100%" }} >
        <Form.Item
            name="MaKhachHang"
            style={{ marginRight: "70px", width: "100%" }}
            label="Mã khách hàng"
          >
            <Input placeholder="Mã khách hàng" />
          </Form.Item>
        </Col>
        <Col sx={24} sm={24} md={12} lg={5} style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Space size="small">
              <Button
                htmlType="submit"
                className="custom-btn-search gutter-item-btn"
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
                className="custom-btn-search gutter-item-btn"
                icon={<SearchOutlined />}
              >
                Tìm mới
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchSMS;
