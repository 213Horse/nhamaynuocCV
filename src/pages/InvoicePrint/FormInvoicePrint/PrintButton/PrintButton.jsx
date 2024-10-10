import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  AutoComplete,
  theme,
} from "antd";
import {
  CloseOutlined,
  PrinterOutlined,
  RedoOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import ListInvoicePrint from "./ListInvoicePrint";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
// import graphql
import { gql, useQuery } from "@apollo/client";
import { getRequest, postRequest } from "../../../../services";
import apolloClient from "../../../../config/apolloClient";
import { useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector } from "../../../../redux/selector";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { fetchFilterInHoaDon } from "../../../../redux/slices/invoicePrintSlice/invoicePrintSlice";
const PrintButton = ({ hideModal }) => {
  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };
  const { Option } = Select;
  const [form1] = Form.useForm();
  const onReset = () => {
    form1.resetFields();
  };
  // const onSubmit = () => {
  //   setVisible(true);
  // };

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 40,
    },
  };
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  useEffect(() => {
    // setClickReset();
    form.resetFields();
  }, [factoryID]);

  const canBoDoc = useQuery(gql`
    query {
      GetUsers(
        first: 100
        where: { phongBan: { name: { eq: "Cán bộ đọc" } } }
      ) {
        nodes {
          id
          userName
          normalizedUserName
          phongBan {
            id
            name
          }
          normalizedUserName
        }
        totalCount
      }
    }
  `);

  const [soHoaDon, setSoHoaDon] = useState([]);
  const [dataHopDong, setDataHopDong] = useState(null);
  const [inputSearchKH, setInputSearchKH] = useState("");
  const [resultSearchKH, setResultSearchKH] = useState([]);
  const [innputSearchHopDong, setInputSearchHopDong] = useState("");
  const [resultSearchHopDong, setResultSearchHopDong] = useState([]);
  const [inputSearchTuyenDoc, setInputSearchTuyenDoc] = useState("");
  const [resultSearchTuyenDoc, setResultSearchTuyenDoc] = useState([]);

  const GET_KHACH_HANGS = gql`
    query GetKhachHangs($first: Int, $name: String) {
      GetKhachHangs(
        first: $first
        where: { tenKhachHang: { contains: $name }, isHide: { eq: false } }
      ) {
        nodes {
          id
          tenKhachHang
        }
      }
    }
  `;
  const GET_HOP_DONG = gql`
    query GetHopDongs($first: Int, $name: String) {
      GetHopDongs(
        first: $first
        where: { keyId: { contains: $name }, isHide: { eq: false } }
      ) {
        nodes {
          id
          keyId
        }
      }
    }
  `;

  const GET_TUYEN_DOC = gql`
    query GetTuyenDocs($first: Int, $name: String) {
      GetTuyenDocs(
        first: $first
        order: { createdTime: DESC }
        where: {
          keyId: { contains: $name }
          deletedTime: { eq: null }
          isHide: { eq: false }
        }
      ) {
        nodes {
          id
          keyId
          tenTuyen
        }
      }
    }
  `;

  useEffect(() => {
    apolloClient
      .query({
        query: GET_KHACH_HANGS,
        variables: {
          first: 10,
          name: inputSearchKH,
        },
      })
      .then((result) => {
        console.log(result);
        setResultSearchKH(result.data.GetKhachHangs.nodes);
      });
  }, [inputSearchKH]);
  const GET_SO_HOP_DONG = gql`
    query GetHopDongs($first: Int, $ids: [String]) {
      GetHopDongs(first: $first, where: { id: { in: $ids } }) {
        nodes {
          id
          keyId
          doiTuongGia
        }
      }
    }
  `;

  function getSoHopDong(ids) {
    console.log("ids", ids);
    apolloClient
      .query({
        query: GET_SO_HOP_DONG,
        variables: {
          first: 10,
          ids: ids,
        },
      })
      .then((result) => {
        console.log("hop dong", result?.data?.GetHopDongs?.nodes);
        setDataHopDong(result?.data?.GetHopDongs?.nodes);
      });
  }

  useEffect(() => {
    apolloClient
      .query({
        query: GET_HOP_DONG,
        variables: {
          first: 10,
          name: innputSearchHopDong,
        },
      })
      .then((result) => {
        console.log(result);
        setResultSearchHopDong(result.data.GetHopDongs.nodes);
      });
  }, [innputSearchHopDong]);

  useEffect(() => {
    apolloClient
      .query({
        query: GET_TUYEN_DOC,
        variables: {
          first: 10,
          name: inputSearchTuyenDoc,
        },
      })
      .then((result) => {
        console.log(result);
        setResultSearchTuyenDoc(result.data.GetTuyenDocs.nodes);
      });
  }, [inputSearchTuyenDoc]);

  useEffect(() => {
    getRequest("danh-muc-seri-hoa-don/get-all").then(
      (res) => {
        console.log(res);
        setSoHoaDon(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  function onFinish(values) {
    console.log(values);
    form1.resetFields();
    setVisible(true);
    values.ThangTaoHoaDon = encodeURIComponent(
      values.ThangTaoHoaDon?.format("MM/YYYY")
    );

    // if (values.TenKhachHang) {
    //   values.TenKhachHang = encodeURIComponent(values.TenKhachHang);
    // }

    fetchFilterInHoaDon(values);
  }
  return (
    <>
      <Form
        {...layout}
        form={form1}
        onFinish={onFinish}
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
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="ThangTaoHoaDon" label="Chọn tháng">
              <DatePicker
                locale={locale}
                picker="month"
                style={{ width: "100%" }}
                format="MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="CanBoThuTienId" label="Cán bộ đọc">
              <Select
                allowClear
                listHeight={"13rem"}
                options={canBoDoc?.data?.GetUsers?.nodes?.map((item) => ({
                  value: item.id,
                  label: item.normalizedUserName,
                }))}
                placeholder="Cán bộ đọc"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="tuyenDocIds" label="Tuyến đọc">
              <AutoComplete
                allowClear
                options={resultSearchTuyenDoc?.map((item) => ({
                  label: item.tenTuyen,
                  value: item.tenTuyen,
                }))}
                style={{
                  width: "100%",
                }}
                onChange={(value) => {
                  setInputSearchTuyenDoc(value);
                }}
                placeholder="Tuyến đọc"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          {/* <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="phamvi" label="Phạm vi">
              <Select style={{ width: "100%" }}>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
              </Select>
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={24}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="LoaiKhachHang" label="Loại khách hàng">
              <Select style={{ width: "100%" }}>
                <Option value="1">1 - Cá nhân</Option>
                <Option value="2">2 - Đơn vị, tổ chức</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="SoHopDong" label="Số hợp đồng">
              <Input min={1} max={10} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="TieuThu" label="Tiêu thụ >=">
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="TenPhien " label="Tên phiên">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="SoHoaDon " label="Ký hiệu">
              <Select
                allowClear
                placeholder="Chọn ký hiệu"
                style={{
                  width: "100%",
                }}
                options={soHoaDon?.map((item) => ({
                  value: item.id,
                  label: item.soHoaDon,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="SoHoaDonBD" label="Số hóa đơn BĐ">
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="SoHoaDonKT" label="Số hóa đơn KT">
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* <Row>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="SoHopDong" label="Số HĐ gợi ý">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row> */}
        <Row>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="NgayLapHoaDon" label="Ngày lập">
              <DatePicker
                locale={locale}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={24}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="Canbothutien" label="Cán bộ thu tiền">
              <Select style={{ width: "100%" }}>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row> */}
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button
            key="reset"
            icon={<RedoOutlined />}
            className="custom-btn-reset-d"
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
            onClick={onReset}
            style={{
              marginLeft: "10px",
            }}
          >
            Làm mới
          </Button>
          <Button
            icon={<OrderedListOutlined />}
            htmlType="submit"
            className="custom-btn-watch-report-d"
            style={{
              marginLeft: "10px",
            }}
          >
            Danh sách
          </Button>
          <ListInvoicePrint visible={visible} onCancel={onCancel} />
          {/* <Button
            key="submit"
            className="custom-btn-attachment-d"
            // htmlType="submit"
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
            icon={<PrinterOutlined />}
            style={{
              marginLeft: "10px",
            }}
          >
            In
          </Button> */}
          <Button
            icon={<CloseOutlined />}
            // htmlType="submit"
            className="custom-btn-close-d"
            // type="primary"
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
            onClick={() => hideModal()}
            style={{
              marginLeft: "10px",
            }}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};
export default PrintButton;
