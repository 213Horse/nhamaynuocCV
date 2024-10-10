import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, theme, message } from "antd";
import {
    CloseOutlined,
    FileAddOutlined,
    SaveOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { updateCity } from "../../../redux/slices/citySlice/citySlice";
import Captcha from "../../../components/Captcha/Captcha";

const EditCity = ({ tabCity, hideModal }) => {
    const [isCaptcha, setIsCaptcha] = useState(false); //captcha
    const dispatch = useDispatch();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const layout = {
        labelCol: {
            span: 7,
        },
    };

    const handleSubmit = (values) => {
        if (values) {
            dispatch(updateCity({ ...values, keyId: tabCity?.codeName }));
            form.resetFields();
            hideModal();
        }
    };

    const handleFailed = (error) => {
        console.log({ error });
    };

    const rules = { rules: [{ required: true, message: "Vui lòng không được bỏ trống." }] }

    return (
        <>
            <Form
                {...layout}
                form={form}
                onFinish={handleSubmit}
                onFinishFailed={handleFailed}
                style={{
                    maxWidth: "none",
                    background: token.colorFillAlter,
                    borderRadius: token.borderRadiusLG,
                    padding: 24,
                }}
            >
                <Row gutter={24}>
                    <Col
                        span={24}
                        className={isTabletOrMobile ? "" : "gutter-item"}
                    >
                        <Form.Item initialValue={tabCity?.codeName} {...rules} name="codeName" label="Mã Thành Phố/ Tỉnh">
                            <Input name="codeName" placeholder="Nhập mã Thành Phố/ Tỉnh" style={{ width: "100%" }} readOnly />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col
                        span={24}
                        className={isTabletOrMobile ? "" : "gutter-item"}
                    >
                        <Form.Item initialValue={tabCity?.ten} {...rules} name="ten" label="Tên Thành Phố/ Tỉnh">
                            <Input name="ten" placeholder="Nhập tên Thành Phố/ Tỉnh" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col
                        span={24}
                        className={isTabletOrMobile ? "" : "gutter-item"}
                    >
                        <Form.Item {...rules} style={{ width: "fit-content", margin: "22px auto" }}>
                            <Captcha
                                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                                ref={null}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                    }}
                >
                    <Button
                        htmlType="submit"
                        style={{
                            marginLeft: "10px",
                        }}
                        icon={<FileAddOutlined />}
                        className="custom-btn-reset-d"
                        disabled={!isCaptcha}
                    >
                        Cập nhật
                    </Button>

                    <Button
                        style={{
                            marginLeft: "10px",
                        }}
                        icon={<CloseOutlined />}
                        className="custom-btn-close-d"
                        onClick={hideModal}
                    >
                        Đóng
                    </Button>
                </Row>
            </Form>
        </>
    );
};

export default EditCity;