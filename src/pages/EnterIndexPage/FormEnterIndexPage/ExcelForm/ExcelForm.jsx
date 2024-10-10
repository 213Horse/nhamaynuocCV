import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Modal, Row } from "antd";
import { CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { fetchApiImportToExcel } from "../../../../redux/slices/excelSlice/excelSlice";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
const ExcelForm = ({ hideModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const data = values;
    data.FilePath = fileList;
    data.FilePath = dispatch(fetchApiImportToExcel(values))
      .unwrap()
      .then(() => {
        hideModal();
      });
  };

  const handleFileChange = (e) => {
    // Handle the file here as needed
    const fileList = e.target.files;
    console.log("Selected File:", fileList[0]);
    setFileList(fileList[0]);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 24,
    },
  };

  // Đoạn mã của bạn ở đây
  return (
    <>
      {/* <div className="button-container1"> */}
      {/* <Button
          icon={<FileExcelOutlined />}
          size="small"
          onClick={handleButtonClick}
          style={{ marginRight: "10px" }}
          type="primary"
        >
          Nhập excel
        </Button> */}
      <Form {...layout} form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col
            lg={24}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="FilePath"
              label="Chọn file excel"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Button>
                <input
                  type="file"
                  name="excelFile"
                  accept=".xls, .xlsx"
                  onChange={handleFileChange}
                />
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            lg={24}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="ThangTaoChiSo"
              label="Chọn tháng tạo chỉ số"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                picker="month"
                allowClear
                locale={locale}
                placeholder="Chọn tháng tạo chỉ số"
                style={{ width: "100%" }}
                format="MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 16,
            width: "100%",
          }}
        >
          <Col
            style={{
              // marginTop: `${isMobile ? "10px" : ""}`,
              textAlign: "end",
            }}
            sm={24}
            md={24}
            lg={12}
          >
            <Button
              htmlType="submit"
              style={{
                marginRight: 5,
              }}
              icon={<FilePdfOutlined />}
              className="custom-btn-export"
            >
              Nhập file
            </Button>
            <Button
              className="custom-btn-close"
              onClick={() => hideModal()}
              style={{
                marginRight: 5,
              }}
            >
              <CloseOutlined />
              Đóng
            </Button>
          </Col>
        </Row>
      </Form>
      {/* </div> */}
      {/* <Modal
        title="Nhập execel"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Row justify="end">
          <Button>Cập Nhật</Button>
          <Button onClick={handleModalCancel}>Đóng</Button>
        </Row>
      </Modal> */}
    </>
  );
};

export default ExcelForm;
