import { BrowserRouter, Route, Routes } from "react-router-dom";

import endPoints from "./routers";
import Login from "./pages/Login/Login";
import Manager from "./pages/Manager/Manager";
import ForgotPassword from "./pages/Login/ForgotPassword";
import OtpForgotPass from "./pages/Login/OtpForgotPass";
import ChangePassword from "./pages/Login/ChangePassword";
// import { useEffect, useState } from "react";
import ThongBaoLoi from "./pages/Login/ThongBaoLoi";
import OtpVerifyEmail from "./pages/Login/OtpVerifyEmail";
import "./global.css";
function App() {
  // const [token, setToken] = useState('');

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={endPoints.LOGIN} element={<Login />} />

        <Route path={endPoints.OTP_VERIFY} element={<OtpVerifyEmail />} />

        <Route path={endPoints.FORGET_PASSWORD} element={<ForgotPassword />} />

        <Route path={endPoints.OTP_FORGET} element={<OtpForgotPass />} />

        <Route path={endPoints.CHANGE_PASSWORD} element={<ChangePassword />} />

        <Route path={endPoints.PUBLIC} element={<Manager />} />

        <Route path={endPoints.ALL} element={<ThongBaoLoi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
