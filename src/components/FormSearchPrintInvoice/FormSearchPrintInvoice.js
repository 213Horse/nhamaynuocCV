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
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { ModalAdvanceSearch } from "../../pages/Invoice/ModalAdvanceSearch";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
// import graphql
import { gql, useQuery } from "@apollo/client";
import { getRequest, postRequest } from "../../services";
import apolloClient from "../../config/apolloClient";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getCanBoDoc,
  getTuyenDocOption,
} from "../../redux/selector";
import { fetchCanBoDoc } from "../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { fetchTuyendoc } from "../../redux/slices/readingIndexSlice/readingIndexSlice";

const months = [
  {
    value: 1,
    label: "Tháng 1",
  },
  {
    value: 2,
    label: "Tháng 2",
  },
  {
    value: 3,
    label: "Tháng 3",
  },
  {
    value: 4,
    label: "Tháng 4",
  },
  {
    value: 5,
    label: "Tháng 5",
  },
  {
    value: 6,
    label: "Tháng 6",
  },
  {
    value: 7,
    label: "Tháng 7",
  },
  {
    value: 8,
    label: "Tháng 8",
  },
  {
    value: 9,
    label: "Tháng 9",
  },
  {
    value: 10,
    label: "Tháng 10",
  },
  {
    value: 11,
    label: "Tháng 11",
  },
  {
    value: 12,
    label: "Tháng 12",
  },
];

export const AdvancedSearchForm = ({
  setClickReset,
  fetchFilterInvoiceList,
  setCurPage,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const canBoDocSelector = useSelector(getCanBoDoc);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const tuyenDoc = useSelector(getTuyenDocOption);
  const dispatch = useDispatch();
  const tuyenDocData = [];

  tuyenDoc?.items?.forEach((item) => {
    item.danhMucTuyenDocResponses.forEach((tuyen) => {
      // Trích xuất giá trị "tenTuyen" và "id" và thêm vào mảng
      tuyenDocData?.push({
        id: tuyen.id,
        tenTuyen: tuyen.tenTuyen,
      });
    });
  });
  const optionsTuyenDoc =
    tuyenDocData?.map(({ id, tenTuyen }) => ({
      key: id,
      label: tenTuyen,
      value: tenTuyen,
    })) || [];
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    dispatch(fetchCanBoDoc(createFilterQueryString()));
    dispatch(fetchTuyendoc(createFilterQueryString()));
    setClickReset();
    form.resetFields();
  }, [nhaMayId]);

  const [soHoaDon, setSoHoaDon] = useState([]);

  const [inputSearchKH, setInputSearchKH] = useState("");
  const [resultSearchKH, setResultSearchKH] = useState([]);
  const [inputSearchSDT, setInputSearchSDT] = useState("");
  const [resultSearchSDT, setResultSearchSDT] = useState([]);
  const [innputSearchHopDong, setInputSearchHopDong] = useState("");
  const [resultSearchHopDong, setResultSearchHopDong] = useState([]);
  const [inputSearchTuyenDoc, setInputSearchTuyenDoc] = useState();
  const [resultSearchTuyenDoc, setResultSearchTuyenDoc] = useState([]);
  const [saveTuyenDocId, setSaveTuyenDocId] = useState("");

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

  const GET_KHACH_HANG_SDT = gql`
    query GetKhachHangs($first: Int, $phoneNumber: String) {
      GetKhachHangs(
        first: $first
        where: { dienThoai: { contains: $phoneNumber }, isHide: { eq: false } }
      ) {
        nodes {
          id
          dienThoai
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

  // const GET_TUYEN_DOC = gql`
  //   query GetTuyenDocs($first: Int, $name: String) {
  //     GetTuyenDocs(
  //       first: $first
  //       order: { createdTime: DESC }
  //       where: {
  //         keyId: { contains: $name }
  //         deletedTime: { eq: null }
  //         isHide: { eq: false }
  //       }
  //     ) {
  //       nodes {
  //         id
  //         keyId
  //         tenTuyen
  //       }
  //     }
  //   }
  // `;

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
        query: GET_KHACH_HANG_SDT,
        variables: {
          first: 10,
          phoneNumber: inputSearchSDT,
        },
      })
      .then((result) => {
        console.log(result);
        setResultSearchSDT(result.data.GetKhachHangs.nodes);
      });
  }, [inputSearchSDT]);

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

  // useEffect(() => {
  //   apolloClient
  //     .query({
  //       query: GET_TUYEN_DOC,
  //       variables: {
  //         first: 10,
  //         name: inputSearchTuyenDoc,
  //       },
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setResultSearchTuyenDoc(result.data.GetTuyenDocs.nodes);
  //     });
  // }, [inputSearchTuyenDoc]);

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
    values.ThangTaoHoaDon = encodeURIComponent(
      values.ThangTaoHoaDon?.format("MM/YYYY")
    );

    if (values.TenKhachHang) {
      values.TenKhachHang = encodeURIComponent(values.TenKhachHang);
    }

    if (values.TuyenDocId) {
      values = { ...values, TuyenDocId: saveTuyenDocId };
    }
    fetchFilterInvoiceList(values);
  }

  return (
    <Form form={form} name="advanced_search" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item
            name="ThangTaoHoaDon"
            label="Chọn tháng"
            rules={[{ required: true, message: `Cần chọn tháng` }]}
          >
            <DatePicker
              allowClear
              name="monthYear"
              placeholder="Chọn tháng"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              locale={locale}
              format="MM-YYYY"
              picker="month"
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="CanboDocId" label="Cán bộ đọc">
            <Select
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              allowClear
              listHeight={"13rem"}
              options={
                canBoDocSelector?.length <= 0
                  ? []
                  : canBoDocSelector?.map((_nameManager) => ({
                      label: _nameManager.normalizedUserName,
                      value: _nameManager.id,
                    }))
              }
              placeholder="Cán bộ đọc"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="TuyenDocId" label="Tuyến đọc">
            <AutoComplete
              allowClear
              options={optionsTuyenDoc}
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              value={inputSearchTuyenDoc}
              onChange={(value, record) => {
                setInputSearchTuyenDoc(value);
                Object.keys(record).length > 0 &&
                  setSaveTuyenDocId(record?.key);
              }}
              placeholder="Tuyến đọc"
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="KeyIdHopDong" label="Số hợp đồng">
            <AutoComplete
              allowClear
              options={resultSearchHopDong?.map((item) => ({
                label: item.keyId,
                value: item.keyId,
              }))}
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              onChange={(value) => {
                setInputSearchHopDong(value);
              }}
              placeholder="Số hợp đồng"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6} xs={24} sm={12} lg={6}>
          {/* <Form.Item name="tenKhachHang" label="Khách hàng">
            <Input placeholder="Tên khách hàng" />
          </Form.Item> */}
          <Form.Item
            name="TenKhachHang"
            label="Khách hàng"
            style={{ marginRight: "70px", width: "100%" }}
          >
            <AutoComplete
              allowClear
              options={resultSearchKH?.map((item) => ({
                label: item.tenKhachHang,
                value: item.tenKhachHang,
              }))}
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              onChange={(value) => {
                setInputSearchKH(value);
              }}
              placeholder="Tên khách hàng"
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="SeriHoaDon" label="Số hóa đơn">
            <Select
              allowClear
              // defaultValue="--Chọn số hóa đơn--"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              options={soHoaDon?.map((item) => ({
                value: item.id,
                label: item.soHoaDon,
              }))}
            />
          </Form.Item>
        </Col>

        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="Tu" label="Từ">
            <Select
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              allowClear
              placeholder="Tu"
              options={months}
            />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="Den" label="Đến">
            <Select
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              allowClear
              placeholder="Đến"
              options={months}
            />
          </Form.Item>
        </Col>

        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="TrangThaiHoaDon" label="TT Hóa đơn">
            <Select
              allowClear
              // defaultValue="--Chọn in hóa đơn--"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              options={[
                {
                  value: 1,
                  label: "Chưa thanh toán",
                },
                {
                  value: 2,
                  label: "Đã thanh toán",
                },
                {
                  value: 3,
                  label: "Chưa duyệt",
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={6} xs={24} sm={12} lg={6}>
          <Form.Item name="SoDienThoaiKhachHang" label="Số điện thoại">
            <AutoComplete
              allowClear
              options={resultSearchSDT
                ?.filter((item) => item.dienThoai !== "")
                ?.map((item) => ({
                  label: item.dienThoai,
                  value: item.dienThoai,
                }))}
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              onChange={(value) => {
                setInputSearchSDT(value);
              }}
              placeholder="Số điện thoại"
            />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={12}
          lg={8}
          style={{
            display: "flex",
          }}
        >
          <Button
            size="small"
            style={{ width: "100%" }}
            className="custom-btn-search"
            htmlType="submit"
          >
            <SearchOutlined />
            Tìm kiếm
          </Button>
          <Button
            size="small"
            style={{ width: "100%" }}
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

