import { Divider, Typography } from "antd";
import "./ThongBaoLoi.css"
const { Title } = Typography;
const ThongBaoLoi = () => {
    return (
        <div className="thong-bao-loi">
            <div className="title">
                <Title style={{ color: "#A6425E" }}>BẠN KHÔNG CÓ QUYỀN TRUY CẬP TRANG NÀY HOẶC TRANG KHÔNG TỒN TẠI</Title>
                <Divider></Divider>
            </div>
        </div>
    );
};

export default ThongBaoLoi;
