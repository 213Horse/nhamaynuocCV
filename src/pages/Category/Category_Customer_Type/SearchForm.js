import { Col, Form, Input, Row } from "antd";
import { useMediaQuery } from "react-responsive";
import TableListPC from "./TableListPC";

export const AdvancedSearchForm = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: 0,
    },
  };

  return (
    <Form {...layout}>
      <Row>
        {!isTabletOrMobile && (
          <Col span={16}>
            <Form.Item>
              <TableListPC />
            </Form.Item>
          </Col>
        )}

        <Col span={isTabletOrMobile ? 24 : 8}>
          <Form.Item
            className="custom-form-item"
            // label="Nhập và Enter để tìm kiếm"
            name="9"
          >
            <Input
              style={{
                width: "100%",
              }}
              placeholder="Nhập ký hiệu"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
