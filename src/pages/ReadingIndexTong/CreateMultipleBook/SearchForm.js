import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import readingIndexSlice, {
  fetchApiGetListTuyenDocChuaTaoSo,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

export const SearchForm = ({ optionsKGCS }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  // set default fields
  useEffect(() => {
    form.setFieldsValue({ monthYear: dayjs(new Date()) });
  }, [form]);

  // handle submit form
  const onFinish = (values) => {
    if (values) {
      dispatch(
        fetchApiGetListTuyenDocChuaTaoSo({
          values: values,
          nhaMayId: nhaMayId,
        })
      );
      dispatch(readingIndexSlice.actions.setOptionThangNam(values.monthYear));
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      onFinish={onFinish}
      // size="small"
    >
      <Row gutter={24}>
        <Col lg={12} style={{ width: "100%" }}>
          <Form.Item name="monthYear" label="Tháng">
            <DatePicker
              name="monthYear"
              allowClear
              locale={locale}
              placeholder="Chọn tháng"
              format="MM-YYYY"
              style={{ width: "100%" }}
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col lg={12} style={{ width: "100%" }}>
          <Form.Item name="KgcsId" label="Kỳ ghi chỉ số">
            <Select
              fieldNames="KgcsId"
              style={{ width: "100%" }}
              options={optionsKGCS}
            />
          </Form.Item>
        </Col>
      </Row>
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Button htmlType="submit" className="custom-btn-search gutter-item-btn">
          <SearchOutlined />
          Tìm kiếm
        </Button>
      </div>
    </Form>
  );
};
