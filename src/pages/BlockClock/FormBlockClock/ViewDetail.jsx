import { Button, Col, DatePicker, Form, Input, Row, Table, theme } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  CloseOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import viVN from "antd/es/date-picker/locale/vi_VN";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { addThatThoatDongHoBlock } from "../../../redux/slices/waterLossSlice/waterLossSlice";

const ViewDetail = ({ hideModal }) => {
  const dispatch = useDispatch();
  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Mã block",
      dataIndex: "blockCode",
      key: "blockCode",
    },
    {
      title: "Tên block",
      dataIndex: "blockName",
      key: "blockName",
    },
    {
      title: "Tháng",
      children: [
        {
          title: "SL(m3)",
          dataIndex: "sl",
          key: "sl",
        },
        {
          title: "Xúc xả(m3)",
          dataIndex: "xx",
          key: "xx",
        },
        {
          title: "Công ích(m3)",
          dataIndex: "ci",
          key: "ci",
        },
        {
          title: "Khác(m3)",
          dataIndex: "other",
          key: "other",
        },
        {
          title: "SLĐHC(m3)",
          dataIndex: "sldhc",
          key: "sldhc",
        },
        {
          title: "TT(%)",
          dataIndex: "tt",
          key: "tt",
          render: (value) => (
            <div style={{ backgroundColor: "green", color: "white" }}>
              {value}
            </div>
          ),
        },
      ],
    },
  ];

  // handle submit form (main)
  const handleSubmit = (values) => {
    values.maDongHo = rowSelected.keyId;
    values.thangTaoThatThoat = dayjs(values.thangTaoThatThoat).format(
      "MM/YYYY"
    );
    console.log("values", values);
    dispatch(addThatThoatDongHoBlock(values));
  };
  const handleClick = () => {
    console.log(rowSelected);
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };

  const { token } = theme.useToken();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [form1] = Form.useForm();
  moment.locale("vi");
  const handleMonthChange = (date) => {
    if (date) {
      form1.setFieldsValue({ month: date.format("M/YYYY") });
    } else {
      form1.setFieldsValue({ month: undefined });
    }
  };
  return (
    <>
      <Form
        form={form1}
        onFinish={handleSubmit}
        onFinishFailed={handleFailed}
        style={{
          maxWidth: "none",
          background: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: 24,
        }}
      >
        <Row>
          <Col
            span={isTabletOrMobile ? 24 : 5}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item
              className="custom-form-item"
              label="Chọn tháng"
              name="thangTaoThatThoat"
            >
              <DatePicker
                locale={viVN}
                picker="month"
                style={{ width: "100%" }}
                onChange={handleMonthChange}
                format="MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col
            span={isTabletOrMobile ? 24 : 5}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Button className="custom-btn-watch-report">
              <SearchOutlined />
              Xem
            </Button>
          </Col>
          <Col
            span={isTabletOrMobile ? 24 : 13}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="nhapdongho" label="Nhập đồng hồ cần tìm">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={isTabletOrMobile ? 24 : 24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Table
              size="small"
              rowKey="index"
              pagination={{
                current: 1,
                pageSize: 18,
              }}
              scroll={{ x: 1200, y: 440 }}
              columns={columns}
              // dataSource={dataSource}
            />
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
            key="submit"
            htmlType="submit"
            icon={<WarningOutlined />}
            style={{
              marginLeft: "10px",
            }}
            className="custom-btn-save-and-add-d"
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          >
            Tính thất thoát
          </Button>

          <Button
            icon={<CloseOutlined />}
            htmlType="submit"
            className="custom-btn-close-d"
            // type="primary"
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
            style={{
              marginLeft: "10px",
            }}
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};
export default ViewDetail;
