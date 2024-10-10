import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
} from "antd";
import { ModalAdvanceSearch } from "../../pages/Invoice/ModalAdvanceSearch";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
// import graphql
import { gql, useQuery } from "@apollo/client";
import { getRequest, postRequest } from "../../services";
import apolloClient from "../../config/apolloClient";
import { useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector } from "../../redux/selector";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

export const AdvancedSearchForm = ({
  setClickReset,
  fetchFilterInvoiceList,
  setCurPage,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  useEffect(() => {
    setClickReset();
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

  const [inputSearchKH, setInputSearchKH] = useState("");
  const [resultSearchKH, setResultSearchKH] = useState([]);
  const [inputSearchSDT, setInputSearchSDT] = useState("");
  const [resultSearchSDT, setResultSearchSDT] = useState([]);
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
    values.NgayTao = encodeURIComponent(values.NgayTao?.format("MM/YYYY"));

    // if (values.TenKhachHang) {
    //   values.TenKhachHang = encodeURIComponent(values.TenKhachHang);
    // }

    fetchFilterInvoiceList(values);
  }

  return (
    <Form
      form={form}
      name="advanced_search"
      style={{
        maxWidth: "none",
        borderRadius: token.borderRadiusLG,
      }}
      onFinish={onFinish}
      labelCol={{ span: 8 }}
    >
      <Row gutter={24}>
        <Col span={8} xs={24} sm={12} lg={6}>
          <Form.Item
            name="NgayTao"
            label="Chọn tháng"
            // rules={[{ required: true, message: `Cần chọn tháng` }]}
          >
            <DatePicker
            size="small"
              style={{
                width: "100%", fontWeight:"bolder"
              }}
              picker="month"
              locale={locale}
              placeholder="Chọn tháng"
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} lg={6}>
          <Form.Item name="NguoiQuanLyId" label="Cán bộ đọc">
            <Select
            size="small"
              style={{
                width: "100%", fontWeight:"bolder"
              }}
              allowClear
              listHeight={"13rem"}
              options={canBoDoc?.data?.GetUsers?.nodes?.map((item) => ({
                value: item.id,
                label: item.normalizedUserName,
              }))}
              placeholder="Cán bộ đọc"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} lg={6}>
          <Form.Item name="TuyenDocId" label="Tuyến đọc">
            <AutoComplete
              allowClear
              options={resultSearchTuyenDoc?.map((item) => ({
                label: item.tenTuyen,
                value: item.tenTuyen,
              }))}
              size="small"
              style={{
                width: "100%", fontWeight:"bolder"
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
        <Col span={8} xs={24} sm={12} lg={6}>
          <Form.Item name="DaInXong" label="In hóa đơn">
            <Select
              allowClear
              placeholder="Chọn in hóa đơn"
              // defaultValue="--Chọn in hóa đơn--"
              size="small"
              style={{
                width: "100%", fontWeight:"bolder"
              }}
              options={[
                {
                  value: true,
                  label: "Chưa in xong",
                },
                {
                  value: false,
                  label: "Đã in xong",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} lg={6}>
          <Form.Item name="SeriHoaDon" label="Số hóa đơn">
            <Select
              allowClear
              placeholder="Chọn số hóa đơn"
              size="small"
              style={{
                width: "100%", fontWeight:"bolder"
              }}
              options={soHoaDon?.map((item) => ({
                value: item.id,
                label: item.soHoaDon,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={12} lg={6}>
          <Form.Item name="tenPhien" label="Tên phiên">
            <Input
              allowClear
              size="small"
              style={{
                width: "100%", fontWeight:"bolder"
              }}
              placeholder="Tên phiên"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={6} style={{
              display: "flex",
            }}>       
      
          <Button
          size="small"
          style={{ width: "100%"}} 
            className="custom-btn-search"
            htmlType="submit"
          >
            <SearchOutlined />
            Tìm kiếm
          </Button>
          <Button
          size="small"
          style={{ width: "100%"}} 
            danger
            onClick={() => {
              setClickReset();
              form.resetFields();
            }}
          >
            Làm mới
        </Button>

        </Col>   
      </Row>
      
    </Form>
  );
};
