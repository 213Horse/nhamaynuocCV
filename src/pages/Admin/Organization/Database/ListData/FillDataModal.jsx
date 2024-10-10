import React from "react";
import {
  Form,
  theme,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  InputNumber,
} from "antd";
import { useMediaQuery } from "react-responsive";
import { SaveOutlined, BackwardOutlined } from "@ant-design/icons";
const FillDataModal = ({ valueRadio, hideModalTypeResource }) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  console.log(valueRadio);
  const isTabletOrMobile = useMediaQuery({ maxWidth: "991px" });
  const isMobile = useMediaQuery({ maxWidth: "576px" });
  const rules = {
    rules: [{ required: true, message: "Vui lòng không được bỏ trống." }],
  };
  const getTitle = (value) => {
    if (value === 1) {
      return "Shapefile";
    } else if (value === 2) {
      return "Excel";
    } else if (value === 3) {
      return "CSV";
    } else if (value === 4) {
      return "File Geodatabase";
    } else if (value === 5) {
      return "GML";
    }
  };
  const layout = {
    labelCol: {
      span: 6,
    },
  };
  const onChangeCheckBox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const onChangeNumber = (value) => {
    console.log("changed", value);
  };
  return (
    <div>
      <h2>Nhập dữ liệu {getTitle(valueRadio)}</h2>
      <Form
        {...layout}
        form={form}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        <Row>
          <Col span={isTabletOrMobile ? 20 : 24} style={{ padding: "0" }}>
            <Form.Item {...rules} name="departmentParent" label="Đường dẫn">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Input name="departmentParent" style={{ width: "100%" }} />
                <Button
                  className="custom-btn-reset"
                  style={{ marginLeft: "6px" }}
                >
                  <span>....</span>
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
        {valueRadio === 4 && (
          <>
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Tiền tố lớp dữ liệu"
                >
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Tiền tố chủ đề dữ liệu"
                >
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {valueRadio === 2 && (
          <Row gutter={24}>
            <Col
              span={isMobile ? 24 : 18}
              push={isMobile ? 0 : 6}
              style={{ paddingLeft: "0.7rem" }}
            >
              <Form.Item {...rules}>
                <Checkbox onChange={onChangeCheckBox}>
                  Chọn tiêu đề là dòng đầu tiên
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        )}
        {valueRadio === 2 && (
          <Row gutter={24}>
            <Col
              span={isMobile ? 24 : 18}
              push={isMobile ? 0 : 6}
              style={{ paddingLeft: "0.7rem" }}
            >
              <Form.Item
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={3}
                  onChange={onChangeNumber}
                />{" "}
                <span>Chọn dòng bắt đầu dữ liệu</span>
              </Form.Item>
            </Col>
          </Row>
        )}
        {valueRadio === 2 && (
          <Row gutter={24}>
            <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
              <Form.Item {...rules} name="departmentParent" label="Chọn bảng">
                <Input name="departmentParent" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {valueRadio === 3 && (
          <>
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Tên bảng dữ liệu"
                >
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ padding: "0" }}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Ký tự phân cách"
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Input name="departmentParent" style={{ width: "100%" }} />
                    <Button
                      className="custom-btn-reset"
                      style={{ marginLeft: "6px" }}
                    >
                      <span>....</span>
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {valueRadio !== 4 && (
          <Row gutter={24}>
            <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
              <Form.Item
                {...rules}
                name="departmentParent"
                label="Điều kiện lọc"
              >
                <Input name="departmentParent" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {valueRadio !== 4 && (
          <>
            <h4>Thông tin nguồn dữ liệu</h4>
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Dữ liệu không gian"
                >
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        {valueRadio === 4 && (
          <Row gutter={24}>
            <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
              <Form.Item
                {...rules}
                name="departmentParent"
                label="Hệ tọa độ đích"
              >
                <Input name="departmentParent" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {valueRadio === 1 ||
          (valueRadio === 5 && (
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Trường không gian"
                >
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          ))}
        {valueRadio === 2 ||
          (valueRadio === 3 && (
            <>
              <Row gutter={24}>
                <Col
                  span={24}
                  className={isTabletOrMobile ? "" : "gutter-item"}
                >
                  <Form.Item
                    {...rules}
                    name="departmentParent"
                    label="Trường kinh độ"
                  >
                    <Input name="departmentParent" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col
                  span={24}
                  className={isTabletOrMobile ? "" : "gutter-item"}
                >
                  <Form.Item
                    {...rules}
                    name="departmentParent"
                    label="Trường vĩ độ"
                  >
                    <Input name="departmentParent" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ))}
        <Row gutter={24}>
          <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
            <Form.Item
              {...rules}
              name="departmentParent"
              label="Hệ tọa độ nguồn"
            >
              <Input name="departmentParent" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        {valueRadio !== 4 && (
          <>
            <h4>Thông tin lớp dữ liệu đích</h4>
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Tên lớp dữ liệu"
                >
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Tên bảng dữ liệu"
                >
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item
                  {...rules}
                  name="departmentParent"
                  label="Chủ đề cha"
                >
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} className={isTabletOrMobile ? "" : "gutter-item"}>
                <Form.Item {...rules} name="departmentParent" label="Hệ tọa độ">
                  <Input name="departmentParent" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<BackwardOutlined />}
            className="custom-btn-reset-d"
            onClick={hideModalTypeResource}
          >
            Trở lại
          </Button>

          <Button
            style={{
              marginLeft: "10px",
            }}
            htmlType="submit"
            icon={<SaveOutlined />}
            className="custom-btn-attachment-d"
          >
            Nhập dữ liệu
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default FillDataModal;
