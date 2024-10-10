import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Row, Select, Space, theme } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  fetchListWorkStatistic,
  invoiceSlice,
} from "../../redux/slices/invoiceSlice/invoiceSlice";
import {
  setClickFilter,
  setIdFilter,
  setLoading,
} from "../../redux/slices/currentPageSlice/currentPageSlice";
import { btnClickGetFactoryIdSelector, idFilterSelector, nhaMayChangeSelector } from "../../redux/selector";

const FormSearchWorkStatistic = ({ canBoDocs }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const formStyle = {
    maxWidth: "none",
    borderRadius: token.borderRadiusLG,
    padding: 5,
  };

  const dispatch = useDispatch();
  const id = useSelector(idFilterSelector);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);

  useEffect(() => {
    form.setFieldsValue({ ThangTaoHoaDon: dayjs(new Date()) });
    form.setFieldsValue({ UserId: id });
  }, [form]);

  const nhaMayChangeClick = useSelector(nhaMayChangeSelector);

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
    form.setFieldsValue({ UserId: null });
    dispatch(invoiceSlice.actions.resetWorkStatistics());
  }, [nhaMayChangeClick]);

  const onFinish = (values) => {
    dispatch(setLoading(true));
    dispatch(setClickFilter(1));
   
    values.nhaMayIds = factoryId
    if (values) {
      dispatch(fetchListWorkStatistic(values))
        .unwrap()
        .then(() => {
          dispatch(setIdFilter(values.UserId));
          dispatch(invoiceSlice.actions.resetWorkStatistics2());
          dispatch(setLoading(false));
          dispatch(setClickFilter(0));
        });
    }
  };

  const layout = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 22,
    },
  };

  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };
  return (
    <Form
      {...layout}
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
      // size="small"
    >
      <Row gutter={24}>
        <Col span={8} xs={24} sm={12} lg={7}>
          <Form.Item name="ThangTaoHoaDon" label="Chọn tháng" {...rules}>
            <DatePicker
              allowClear
              name="ThangTaoHoaDon"
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              locale={locale}
              format="MM-YYYY"
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} lg={7}>
          <Form.Item name="UserId" label="Nhân viên" {...rules}>
            <Select
              fieldNames="UserId"
              options={
                canBoDocs?.length <= 0
                  ? []
                  : canBoDocs?.map((_nameManager) => ({
                      label: _nameManager.name,
                      value: _nameManager.userId,
                    }))
              }
              placeholder="Chọn nhân viên"
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={7}>
          <div
            style={{
              textAlign: "left",
            }}
          >
            <Space size="small">
              <Button
                htmlType="submit"
                className="custom-btn-search gutter-item-btn"
              >
                <SearchOutlined />
                Tìm kiếm
              </Button>
              {/* <Button
                onClick={() => {
                  form.resetFields();
                }}
                className="custom-btn-search gutter-item-btn"
              >
                <SearchOutlined />
                Tìm mới
              </Button> */}
            </Space>
          </div>
        </Col>
      </Row>
      <Row gutter={24}></Row>
    </Form>
  );
};

export default FormSearchWorkStatistic;
