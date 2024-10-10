import { Col, Input, Row } from "antd";

import "./Reporter.css";
import ExportFile from "../ExportFile/ExportFile";

function Reporter({ handleOnSearch, handleOnChange }) {
  return (
    <div className="wrapper-reporter">
      <Row gutter={[10, 10]}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 20 }}
          xl={{ span: 20 }}
        >
          <Input.Search
            size="middle"
            placeholder="Tìm kiếm theo tên khách hàng..."
            enterButton
            className="reporter-search"
            onSearch={handleOnSearch}
            onChange={handleOnChange}
            style={{
              width: '100%',
            }}
          />
        </Col>

        {/* <Button className="reset-report-btn custom-btn-reset">
          Làm mới <UndoOutlined />
        </Button> */}

        {/* Export file */}
        <Col
          xs={{ span: 9 }}
          sm={{ span: 9 }}
          md={{ span: 9 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
        >
          <ExportFile />
        </Col>
      </Row>
    </div>
  );
}

export default Reporter;
