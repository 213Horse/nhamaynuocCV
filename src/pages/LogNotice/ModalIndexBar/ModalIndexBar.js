import { Col, Modal, Progress, Row } from "antd";

export const ModalIndexBarLogNotice= (props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <Modal 
      title="Chỉ số"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={260} 
      footer={null}
      style={{
        top: 20, 
      }}
      centered
    >
      <div style={{ display: "flex", marginTop: "10px" }}>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col xs={24} sm={24} md={6} lg={24}>
            <Progress percent={10} size={[200, 20]} strokeColor="#ff8033" />
          </Col>
          <Col xs={24} sm={24} md={6} lg={24}>
            <Progress percent={10} size={[200, 20]} strokeColor="#ff8033" />
          </Col>
          <Col xs={24} sm={24} md={6} lg={24}>
            <Progress percent={10} size={[200, 20]} strokeColor="#ff8033" />
          </Col>
          <Col xs={24} sm={24} md={6} lg={24}>
            <Progress percent={10} size={[200, 20]} strokeColor="#ff8033" />
          </Col>
          <Col xs={24} sm={24} md={6} lg={24}>
            <Progress percent={10} size={[200, 20]} strokeColor="#ff8033" />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
