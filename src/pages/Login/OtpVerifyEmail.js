import "./ForgotPassword.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Spin, message } from "antd";
import { verifyRegisterEmail } from "../../redux/slices/registerSlice/registerSlice";
import './otp.css';

const OtpVerifyEmail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get('userName');
    const email = queryParams.get('email');

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    // ==========================================================================
    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value) || value === '') {
            const newDigits = [...digits];
            newDigits[index] = value;
            setDigits(newDigits);
            if (value === '') {
                if (index > 0) {
                    document.getElementById(`digit${index}`).focus();
                }
            } else if (index < 5) {
                document.getElementById(`digit${index + 2}`).focus();
            }
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && digits[index] === '') {
            document.getElementById(`digit${index}`).focus();
        }
    };
    // ==========================================================================

    const handleLoginClick = () => {
        const formattedDigits = digits.join('');
        const data = {
            token: `${formattedDigits}`,
            userName
        }
        if (formattedDigits.length === 6) {
            setLoading(true);
            dispatch(verifyRegisterEmail(data))
                .unwrap()
                .then(() => {
                    message.success("Đã tạo tài khoản thành công!");
                    navigate("/");
                }).catch((error) => {
                    message.error(error);
                    setLoading(false);
                }).finally(() => {
                    setLoading(false);
                })
        } else {
            message.warning("Mã OTP không hợp lệ!");
        }
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
                    <Form form={form} onFinish={handleLoginClick} className="login-select-container position-relative">
                        <br></br>
                        <main className="login position-absolute top-50 start-50 translate-middle password-blur" style={{ height: "310px" }}>
                            <h1 className="text-center fw-bold text-white">Xác Nhận Email</h1>
                            <br></br>
                            <br></br>
                            <div className="mb-3">
                                <Form.Item
                                    style={{
                                        marginLeft: '7px'
                                    }}
                                    name="token"
                                    rules={[
                                        {
                                            pattern: /^[0-9]*$/,
                                            message: "OTP không hợp lệ",
                                        },
                                    ]}
                                >
                                    {digits.map((digit, index) => (
                                        <Input
                                            key={index}
                                            type="text"
                                            id={`digit${index + 1}`}
                                            className="digit-input"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                        />
                                    ))}
                                </Form.Item>
                            </div>
                            <h4 style={{ color: 'green', fontSize: '13px', fontStyle: 'italic', textAlign: 'center' }}>Mã OTP đã được gửi đến email: <br></br> {email}</h4>
                            <br></br>
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

export default OtpVerifyEmail;