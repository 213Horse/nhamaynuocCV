import "./ForgotPassword.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Spin, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { changePassword } from "../../redux/slices/forgotChangePasswordSlice/passwordSlice";
import { isChangePasswordOKSelector } from "../../redux/selector";

const ChangePassword = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get('userName');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isChangeSuccess = useSelector(isChangePasswordOKSelector);
    console.log("🚀 isChangeSuccess:", isChangeSuccess);

    const handleLoginClick = (values) => {
        const data = {
            ...values,
            userName
        }

        if (values) {
            setLoading(true);
            dispatch(changePassword(data))
                .unwrap()
                .then(() => {
                    message.success("Đã đổi mật khẩu thành công ~ Vui lòng đăng nhập lại");
                    navigate('/');
                })
                .catch((error) => {
                    setLoading(false);
                    message.error(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    };

    const [form] = Form.useForm();
    

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
                    <Form form={form} onFinish={handleLoginClick} className="login-select-container position-relative">
                        <br></br>
                        <main className="login position-absolute top-50 start-50 translate-middle password-blur" style={{ height: "310px" }}>
                            <h1 className="text-center fw-bold text-white">Đổi mật khẩu</h1>
                            <br></br>
                            <div className="mb-3">
                                <Form.Item
                                    name="oldPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mật khẩu hiện tại!",
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Your Old Password"
                                    />
                                </Form.Item>
                            </div>

                            <div className="mb-3">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mật khẩu mới!",
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Your New Password"
                                    />
                                </Form.Item>
                            </div>
                            <div className="mb-3">
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng xác nhận mật khẩu mới!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Mật khẩu mà bạn vừa nhập không khớp!"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Confirm Your New Password"
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

export default ChangePassword;