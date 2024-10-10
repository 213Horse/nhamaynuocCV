import React, { useState } from "react";
import { Button, Modal, Row } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
const ChartButton = () => {
  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  // Đoạn mã của bạn ở đây
  return (
    <>
      <div className="button-container1">
        <Button
          size="small"
          onClick={handleButtonClick}
          style={{ marginRight: "10px" }}
          type="primary"
          icon={<LineChartOutlined />}
        >
          Xem biểu đồ
        </Button>
      </div>
      <Modal
        title="Xem biểu đồ"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Row justify="end">
          <Button>Cập Nhật</Button>
          <Button onClick={handleModalCancel}>Đóng</Button>
        </Row>
      </Modal>
    </>
  );
};

export default ChartButton;
