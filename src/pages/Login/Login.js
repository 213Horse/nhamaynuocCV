import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { authenticateUser } from "../../redux/slices/userLoginSlice/userLoginSlice";
import {
  accessTokenSelector,
  nameSelector,
  nhaMayIdsSelector,
  refreshTokenSelector,
  userIdSelector,
  userNameSelector,
  userRoleSelector,
} from "../../redux/selector";
import { useEffect, useState } from "react";
import { handleDangNhap } from "../../config/axiosInterceptor";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector(accessTokenSelector);
  const refresh = useSelector(refreshTokenSelector);
  const username = useSelector(userNameSelector);
  const userId = useSelector(userIdSelector);
  const name = useSelector(nameSelector);
  const role = useSelector(userRoleSelector);

  const [dispatchCalled, setDispatchCalled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const factories = useSelector(nhaMayIdsSelector);

  useEffect(() => {
    if (token !== null && token !== "" && token !== undefined) {
      handleDangNhap(token);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("refreshToken", refresh);
      sessionStorage.setItem("nhaMaysData", JSON.stringify(factories));
      sessionStorage.setItem("user_role", JSON.stringify(role))
      sessionStorage.setItem("current_factory_id", factories[0].nhaMayId);
    }
    if (username) {
      message.success("Welcome back user: " + username);
    }
  }, [dispatchCalled, username, token, refresh, userId, name, factories, role]);

  const handleLoginClick = (values) => {
    const data = { ...values };
    if (data) {
      setLoading(true);
      dispatch(authenticateUser(data))
        .unwrap()
        .then(() => {
          navigate("/home");
          setDispatchCalled(true);
        })
        .catch((error) => {
          setLoading(false);
          message.error(error);
        })
        .finally(() => {
          setLoading(false);
          setDispatchCalled(false);
        });
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
          <Spin
            size="large"
            style={{ fontSize: "77px", marginRight: "17px" }}
          ></Spin>
          <h1 style={{ color: "blue", marginTop: "33px", fontSize: "37px" }}>
            Vui Lòng Đợi Trong Giây Lát...
          </h1>
        </div>
      ) : (
        <>
          <Form
            onFinish={handleLoginClick}
            className="login-select-container position-relative"
          >
            <br></br>
            <main
              className="login position-absolute top-50 start-50 translate-middle blur"
              style={{ height: "290px" }}
            >
              <h1 className="text-center fw-bold text-white">Đăng nhập</h1>
              <br></br>
              <div className="mb-3">
                <Form.Item
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên đăng nhập!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
              </div>
              <div className="mb-3">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
              </div>
              <Form.Item
                className="text-center"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Link to="/forget_password">
                  <Button type="link" className="forgot-password-button">
                    Quên mật khẩu
                  </Button>
                </Link>
              </Form.Item>
              <Form.Item className="text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </main>
          </Form>
        </>
      )}
    </>
  );
};

export default Login;
