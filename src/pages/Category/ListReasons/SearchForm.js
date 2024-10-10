import { Col, Form, Input, Row } from "antd";
import { useMediaQuery } from "react-responsive";
import TableListPC from "./TableListPC";

export const AdvancedSearchForm = ({setSearchQuery}) => {
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
          <Col span={isTabletOrMobile ? 8 : 16}>
            <Form.Item>
              <TableListPC />
            </Form.Item>
          </Col>
        )}

        <Col span={isTabletOrMobile ? 24 : 8}>
          <Form.Item
            className="custom-form-item"
            name="9"
          >
            <Input
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Nhập mã lý do thay"
              onChange={(e) => {
                setSearchQuery(e.target.value);
             }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
