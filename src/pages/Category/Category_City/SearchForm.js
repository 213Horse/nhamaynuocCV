import { Col, Form, Input, Row } from "antd";
import { useMediaQuery } from "react-responsive";
import TableCity from "./TableCity";

export const SearchForm = ({ onChange }) => {
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
                            <TableCity />
                        </Form.Item>
                    </Col>
                )}

                <Col span={isTabletOrMobile ? 24 : 8}>
                    <Form.Item
                        className="custom-form-item"
                        name="9"
                    >
                        <Input.Search
                            style={{
                                width: "100%",
                            }}
                            onChange={(e) => {
                                onChange(e.target.value);
                            }}
                            placeholder="Nhập mã thành phố/tỉnh"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
