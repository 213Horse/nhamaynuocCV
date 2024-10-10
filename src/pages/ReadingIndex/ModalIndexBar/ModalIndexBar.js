import { Col, Modal, Progress, Row } from "antd";

export const ModalIndexBar = (props) => {
  const { isOpen, handleCancel, handleOk } = props;

  return (
    <Modal
      title="Chỉ số"
      open={isOpen}
      onOk={() => handleOk("", "indexBar")}
      onCancel={() => handleCancel("", "indexBar")}
      width={300}
      footer={null}
      centered
    >
      <div style={{ display: "flex", marginTop: "10px" }}>
        <Row>
          <Col xs={24}>
            <Progress percent={10} size={[300, 20]} />
          </Col>
          <Col xs={24}>
            <Progress percent={10} size={[300, 20]} strokeColor="#ff8033" />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
