import React, { useRef, useState } from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";
import {
    CloseOutlined,
    FileAddOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { addCity } from "../../../redux/slices/citySlice/citySlice";
import Captcha from "../../../components/Captcha/Captcha";

const AddCity = ({ hideModal }) => {
    const dispatch = useDispatch();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const [isCaptcha, setIsCaptcha] = useState(false); //captcha
    const captchaRef = useRef();

    const layout = {
        labelCol: {
            span: 7,
        },
    };

    // handle submit form (main)
    const handleSubmit = (values) => {
        console.log(values);
        if (values) {
            dispatch(addCity(values));
        }
        hideModal();
        form.resetFields();
    };
    const handleSubmitAndAdd = async () => {
        const values = await form.validateFields();
        dispatch(addCity(values))
        captchaRef.current.reset();
        setIsCaptcha(false)
    }

    // handle submit error (main)
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
                        <Form.Item {...rules} name="keyId" label="Mã Thành phố/Tỉnh">
                            <Input name="keyId" placeholder="Nhập mã Thành phố/Tỉnh" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col
                        span={24}
                        className={isTabletOrMobile ? "" : "gutter-item"}
                    >
                        <Form.Item {...rules} name="ten" label="Tên Thành phố/Tỉnh">
                            <Input name="ten" placeholder="Nhập tên Thành phố/Tỉnh" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        span={24}
                        className={isTabletOrMobile ? "" : "gutter-item"}
                    >
                        <Form.Item style={{ width: 'fit-content', margin: "22px auto" }}>
                            <Captcha
                                onChangeReCaptcha={(value) => setIsCaptcha(value != null)}
                                ref={captchaRef}
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
                    {/* <Button
                        style={{
                            marginLeft: "10px",
                        }}
                        icon={<FileAddOutlined />}
                        className="custom-btn-reset-d"
                        onClick={handleSubmitAndAdd}
                        disabled={!isCaptcha}
                    >
                        Lưu và thêm tiếp
                    </Button> */}

                    <Button

                        style={{
                            marginLeft: "10px",
                        }}
                        htmlType="submit"
                        icon={<SaveOutlined />}
                        className="custom-btn-attachment-d"
                        disabled={!isCaptcha}
                    >
                        Lưu và đóng
                    </Button>

                    <Button
                        style={{
                            marginLeft: "10px",
                        }}
                        icon={<CloseOutlined />}
                        className="custom-btn-close-d"
                        onClick={() => {
                            captchaRef.current.reset()
                            hideModal()
                        }}
                    >
                        Đóng
                    </Button>
                </Row>
            </Form>
        </>
    );
};

export default AddCity;