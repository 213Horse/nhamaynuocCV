import { Col, Divider, Progress, Row, Space } from "antd";

function StatisticalPay() {
  return (
    <>
      <Divider />

      <div className="custom-progress-mobile">
        <Space direction="vertical" size={20}>
          <Row>
            <Col xs={24} sm={24} md={9} lg={24}>
              <Progress
                percent={60}
                strokeColor="yellow"
                status="active"
                size={[470, 20]}
                format={(percent) => `${percent * 10}`}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={9} lg={24}>
              <Progress
                percent={10}
                strokeColor="blu"
                status="active"
                size={[470, 20]}
                format={(percent) => `${percent * 10}`}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={9} lg={24}>
              <Progress
                percent={30}
                strokeColor="red"
                status="active"
                size={[470, 20]}
                format={(percent) => `${percent * 10}`}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={9} lg={24}>
              <Progress
                percent={90}
                strokeColor="green"
                status="active"
                size={[470, 20]}
                format={(percent) => `${percent * 10}`}
              />
            </Col>
          </Row>
        </Space>
      </div>
    </>
  );
}

export default StatisticalPay;
