import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getDataForMenuContract,
  getListContractDataFilter,
  nhaMayChangeSelector,
} from "../../../redux/selector";
import {
  fetchApiGetContract,
  fetchApiGetContractFilter,
  fetchDataForMenuContract,
} from "../../../redux/slices/contractSlice/contractSlice";
import {
  setClickFilter,
  setCurrentPage,
  setDataFilter,
  setFilter,
  setNhaMayChange,
} from "../../../redux/slices/currentPageSlice/currentPageSlice";
import "../TableListContract.css";
import { useMediaQuery } from "react-responsive";

const { Text } = Typography;

function FormFilterContract() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const dispatch = useDispatch();
  const dataFilter = useSelector(getListContractDataFilter);
  const nhaMayId = sessionStorage.getItem("current_factory_id");
  const nhaMayIds = useSelector(btnClickGetFactoryIdSelector)
  const nhaMayChangeClick = useSelector(nhaMayChangeSelector);

  useEffect(() => {
    dispatch(fetchApiGetContractFilter(nhaMayId));
    dispatch(setNhaMayChange(0));
  }, [nhaMayId, nhaMayChangeClick]);

  // handle submit form
  const handleSubmit = (values) => {
    dispatch(setClickFilter(1));
    const data = { ...values };
    data.soLuong = 10;
    data.soTrang = 1;
    data.nhaMayId = nhaMayId;
    dispatch(fetchApiGetContract(data));
    dispatch(setFilter(1));
    dispatch(setCurrentPage(1));
    dispatch(setDataFilter(data));
  };

  const [form] = Form.useForm();

  const resetFilter = (values) => {
    dispatch(setClickFilter(1));
    const data = { ...values };
    data.soLuong = 10;
    data.soTrang = 1;
    data.nhaMayId = nhaMayId;
    form.resetFields();
    dispatch(fetchApiGetContract(data));
    dispatch(setFilter(0));
    dispatch(setCurrentPage(1));
    dispatch(setDataFilter(null));
  };

  // handle submit error
  const handleFailed = (error) => {
    console.log({ error });
  };

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayIds === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${nhaMayIds}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const dataForMenu = useSelector(getDataForMenuContract);

  useEffect(() => {
    dispatch(fetchDataForMenuContract(createFilterQueryString()));
  }, [nhaMayIds]);

  return (
    <Form form={form} onFinish={handleSubmit} onFinishFailed={handleFailed}>
      <Row gutter={[6, 6]}>
        {/* Số hợp đồng */}
        <Col
          xs={23}
          sm={12}
          md={12}
          lg={6}
          style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}
        >
          <Form.Item name="soHopDong" className="soHopDong">
            <Input
              allowClear
              style={{ width: "100%", fontWeight: "bolder" }}
              size="small"
              name="soHopDong"
              placeholder="Nhập số hợp đồng"
            />
          </Form.Item>
        </Col>
        {/* Mã khách hàng */}
        <Col xs={23} sm={12} md={12} lg={6}  style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}>
          <Form.Item
            name="maKhachHang"
            // className="maKhachHang"
          >
            <Input
              allowClear
              style={{ width: "100%", fontWeight: "bolder" }}
              name="maKhachHang"
              size="small"
              placeholder="Nhập mã khách hàng hoặc IDKH"
            />
          </Form.Item>
        </Col>
        {/* Tên khách hàng */}
        <Col xs={23} sm={12} md={12} lg={6}  style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}>
          <Form.Item
            name="tenKhachHang"
            // className="tenKhachHang"
          >
            <Input
              allowClear
              style={{ fontWeight: "bolder" }}
              name="tenKhachHang"
              size="small"
              placeholder="Nhập tên khách hàng"
            />
          </Form.Item>
        </Col>
        {/* Seri đồng hồ */}
        <Col xs={12} sm={6} md={6} lg={3}  style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}>
          <Form.Item
            name="seriDongHo"
            // className="seriDongHo"
          >
            <Input
              allowClear
              style={{ fontWeight: "bolder" }}
              name="seriDongHo"
              size="small"
              placeholder="Nhập seri đồng hồ"
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={6} md={6} lg={3}  style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}>
          <Form.Item
            name="soDienThoai"
          >
            <Input
              allowClear
              style={{ fontWeight: "bolder" }}
              name="soDienThoai"
              size="small"
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
        </Col>
        {/* Số hộ */}
      </Row>

      <Row gutter={[6, 6]}>
        <Col xs={23} sm={12} md={12} lg={3}  style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}>
          <Form.Item
            name="soHo"
            // className="soHo"
          >
            <InputNumber
              allowClear
              name="soHo"
              id="number"
              size="small"
              placeholder="Nhập số hộ"
              style={{ width: "100%", fontWeight: "bolder" }}
            />
          </Form.Item>
        </Col>
        {/* Số hộ từ */}
        <Col xs={23} sm={12} md={12} lg={3}  style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}>
          <Form.Item
            name="soHoTu"
            // className="soHoTu"
          >
            <InputNumber
              allowClear
              name="soHoTu"
              id="number"
              size="small"
              placeholder="Nhập số hộ từ"
              style={{ width: "100%", fontWeight: "bolder" }}
            />
          </Form.Item>
        </Col>
        <Col xs={23} sm={12} md={12} lg={6}  style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}>
          <Form.Item
            name="canBoDoc"
            // className="canBoDoc"
          >
            <Select
              size="small"
              allowClear
              fieldNames="canBoDoc"
              options={dataForMenu?.canBoQuanLy?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn cán bộ đọc"
              style={{ fontWeight: "bolder" }}
            />
          </Form.Item>
        </Col>

        <Col xs={23} sm={12} md={12} lg={6}  style={{
            marginLeft: isTabletOrMobile ? "5px" : "0",
          }}>
          <Form.Item
            name="tuyenDocId"
            // className="tuyenDocId"
          >
            <Select
              size="small"
              placeholder="Chọn tuyến đọc"
              allowClear
              options={dataForMenu?.tuyenDoc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              style={{ fontWeight: "bolder" }}
            ></Select>
          </Form.Item>
        </Col>

        <Col xs={23} sm={12} lg={6} style={{
              display: "flex",
            }}>
          <Button
            size="small"
            htmlType="submit"
            className="custom-btn-search gutter-item-btn"
            style={{ width: "100%", marginTop: "4px" }}
          >
            <SearchOutlined />
            Tìm kiếm
          </Button>
          <Button
            style={{  width: "100%", marginTop: "4px" }}
            className="custom-btn-reset gutter-item-btn"
            onClick={resetFilter}
            size="small"
          >
            <FilterOutlined />
            Xóa Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormFilterContract;
