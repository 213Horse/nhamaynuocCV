import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Row, Select, Space, theme } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getUserNhaMaySelector,
} from "../../redux/selector";
import { fetchListWriteIndex } from "../../redux/slices/invoiceSlice/invoiceSlice";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { getUserByNhaMay } from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";
const FormSearchWriteIndex = ({setCurPage, setFilterData}) => {
  const [form] = Form.useForm();
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const dispatch = useDispatch();
  const canBoDocs = useSelector(getUserNhaMaySelector);

  const { token } = theme.useToken();
  const formStyle = {
    maxWidth: "none",
    borderRadius: token.borderRadiusLG,
    padding: 5,
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
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `${factory.nhaMayId}`;
        } else {
          factoryQueryString += `${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    const nhaMayId = createFilterQueryString();
    dispatch(getUserByNhaMay(nhaMayId));
  }, [factoryId]);

  const onFinish = (values) => {
    values.nhaMayIds = factoryId;
    setCurPage(1)
    setFilterData(values)
    if (values) {
      dispatch(fetchListWriteIndex(values))
        .unwrap()
        .then(() => {
          
        });
    }
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
          <Form.Item name="thangGhi" label="Chọn tháng" {...rules}>
            <DatePicker
              allowClear
              name="thangGhi"
              placeholder="Chọn tháng"
              style={{ width: "100%" }}
              locale={locale}
              format="MM-YYYY"
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} lg={7}>
          <Form.Item name="userId" label="Nhân viên" {...rules}>
            <Select
              fieldNames="userId"
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
    </Form>
  );
};

export default FormSearchWriteIndex;
