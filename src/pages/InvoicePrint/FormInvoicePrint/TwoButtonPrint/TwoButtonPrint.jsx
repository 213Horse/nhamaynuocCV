import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  theme,
} from "antd";
import {
  CloseOutlined,
  PrinterOutlined,
  RedoOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

import { useMediaQuery } from "react-responsive";
import { gql, useQuery } from "@apollo/client";
import { getRequest, postRequest } from "../../../../services";
import apolloClient from "../../../../config/apolloClient";
import { useDispatch, useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector } from "../../../../redux/selector";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import ListInvoicePrint from "../PrintButton/ListInvoicePrint";
import { fetchFilterInKetHoaDon } from "../../../../redux/slices/invoicePrintSlice/invoicePrintSlice";
const TwoButtonPrint = ({ hideModal, values }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };
  // handle submit error (main)
  const handleFailed = (error) => {
    console.log({ error });
  };
  const { Option } = Select;
  const [form1] = Form.useForm();
  const { token } = theme.useToken();
  const onReset = () => {
    form1.resetFields();
  };
  const layout = {
    labelCol: {
      span: 5,
    },
    // wrapperCol: {
    //   span: 40,
    // },
  };
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  useEffect(() => {
    // setClickReset();
    form1.resetFields();
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
    values.NgayLapHD = encodeURIComponent(
      values.NgayLapHD?.format("DD/MM/YYYY")
    );

    if (values.KyHieu) {
      values.KyHieu = encodeURIComponent(values.KyHieu);
    }
    if (values.TuSo) {
      values.TuSo = encodeURIComponent(values.TuSo);
    }
    if (values.SoHoaDonBD) {
      values.SoHoaDonBD = encodeURIComponent(values.SoHoaDonBD);
    }
    fetchFilterInKetHoaDon(values);
    setVisible(true);
  }
  const createFactoryQueryString = () => {
    let factoryQueryString = "";
    if (factoryID === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${factoryID}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  const createFilterQueryString = (filterForm) => {
    let queryString = "";
    for (const key in filterForm) {
      if (filterForm[key]) {
        if (queryString === "") {
          queryString += `${key}=${filterForm[key]}`;
        } else {
          queryString += `&${key}=${filterForm[key]}`;
        }
      }
    }
    console.log(`${queryString}`);
    return `${queryString}`;
  };
  const dispatch = useDispatch();
  const fetchFilterInvoiceList = (formValue, setParamString, setIsFilter) => {
    const factoryURI = createFactoryQueryString();
    const formValueURI = createFilterQueryString(formValue);
    const queryString = `${formValueURI}&${factoryURI}&invoiceParameter.pageSize=10&invoiceParameter.PageNumber=1`;
    dispatch(fetchFilterInKetHoaDon(queryString));
    setParamString(queryString);
    setIsFilter(true);
  };
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
        <Row gutter={24}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={24}
            span={24}
            className={isTabletOrMobile ? "" : "gutter-item"}
          >
            <Form.Item name="KyHieu" label="Ký hiệu">
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
            <Form.Item name="TuSo" label="Từ số">
              <InputNumber min={1} max={10} style={{ width: "100%" }} />
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
            <Form.Item name="SoHoaDonKT" label="Số hóa đơn KT">
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
          ></Col>
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
            <Form.Item name="NgayLapHD" label="Ngày lập">
              <DatePicker
                locale={locale}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
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
          <Button
            key="reset"
            style={{
              marginLeft: "10px",
            }}
            icon={<RedoOutlined />}
            className="custom-btn-reset-d"
            onClick={onReset}
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
          <ListInvoicePrint
            fetchFilterInvoiceList={fetchFilterInvoiceList}
            visible={visible}
            onCancel={onCancel}
          />

          <Button
            style={{
              marginLeft: "10px",
            }}
            icon={<CloseOutlined />}
            htmlType="submit"
            className="custom-btn-close-d"
            // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
            onClick={() => hideModal()}
          >
            Đóng
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default TwoButtonPrint;
