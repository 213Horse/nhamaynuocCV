/* eslint-disable react/no-unescaped-entities */
import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Spin, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { sendEmail } from "../../redux/slices/forgotChangePasswordSlice/passwordSlice";
import { isChangePasswordOKSelector } from "../../redux/selector";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleLoginClick = (values) => {
        const queryParams = new URLSearchParams();
        queryParams.append('userName', values.userName);
        setLoading(true);
        dispatch(sendEmail(values))
            .unwrap()
            .then(() => {
                navigate(`/otp_forget?${queryParams.toString()}`);
            })
            .catch((error) => {
                setLoading(false);
                message.error(error);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70vh",
                    }}
                >
                    <Spin size="large" style={{ fontSize: "77px", marginRight: '17px' }}></Spin>
                    <h1 style={{ color: 'blue', marginTop: '33px', fontSize: '37px' }}>Vui Lòng Đợi Trong Giây Lát...</h1>
                </div>
            ) : (
                <>
                    <Form onFinish={handleLoginClick} className="login-select-container position-relative">
                        <br></br>
                        <main className="login position-absolute top-50 start-50 translate-middle password-blur">
                            <h1 className="text-center fw-bold text-white">Quên mật khẩu</h1>
                            <br></br>
                            <div className="mb-3">
                                <Form.Item
                                    name="userName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập userName!",
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Username"
                                    />
                                </Form.Item>
                            </div>


                            <Form.Item className="text-center">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    style={{ marginTop: 10 }}
                                    block
                                >
                                    Xác nhận
                                </Button>
                            </Form.Item>
                        </main>
                    </Form>
                </>
            )}
        </>
    );
};

export default ForgotPassword;