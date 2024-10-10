import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { Option } from "antd/es/mentions";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getEnterIndexPageMenuData,
} from "../../../redux/selector";
import { useEffect } from "react";
import { fetchFilterListIndexDropdownPage, fetchFilterListIndexPage, fetchFilterThongKeListIndexPage } from "../../../redux/slices/tabListEnterIndexPageSlice/tabListEnterIndexPageSlice";
import dayjs from "dayjs";
export const AdvancedSearchForm = ({setDataFilter, setCurPage}) => {
  const [form] = Form.useForm()
  const dataForMenu = useSelector(getEnterIndexPageMenuData);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dispatch = useDispatch();
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayId=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  const createFilterFactoryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  const createFilterQueryString2 = (filterForm) => {
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
  useEffect(() => {
    dispatch(fetchFilterListIndexDropdownPage(createFilterQueryString()));
  }, [nhaMayId]);
  const onFinish = (values) => {
    const factoryURI = createFilterFactoryString();
    values.ThangTaoSoDoc = encodeURIComponent(
      dayjs(values.ThangTaoSoDoc).format("MM/YYYY")
    );
    setDataFilter(values)
    setCurPage(1)
    values.pageNumber = 1
    values.pageSize=10
    const formValueURI = createFilterQueryString2(values);
    const queryString = `${formValueURI}&${factoryURI}`;
    dispatch(fetchFilterListIndexPage(queryString));
    dispatch(fetchFilterThongKeListIndexPage(queryString));
    
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={12} lg={4} span={4}>
          <Form.Item
            className="custom-form-item"
            name="ThangTaoSoDoc"
            rules={[{ required: true, message: `Cần chọn tháng` }]}
          >
            <DatePicker
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              picker="month"
              placeholder="Chọn Tháng"
              // onChange={handleMonthChange}
              locale={locale}
              format="MM-YYYY"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} span={6}>
          <Form.Item name="CanboDocId">
            <Select
              size="small"
              placeholder="Chọn nhân viên"
              style={{ width: "100%", fontWeight: "bolder" }}
              name="CanboDocId"
              options={dataForMenu?.canBoDoc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={14}>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={12} md={12} lg={10}>
              <Form.Item
                className="custom-form-item"
                name="TuyenDocId"
              >
                <Select
                  size="small"
                  placeholder="Chọn Tuyến Đọc"
                  style={{ width: "100%", fontWeight: "bolder" }}
                  options={dataForMenu?.tuyenDoc?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={3} md={3} lg={5}>
              <Form.Item
                className="custom-form-item"
                size="small"
                style={{ width: "100%", fontWeight: "bolder" }}
                name="TenMaKeyId"
              >
                <AutoComplete
                  size="small"
                  allowClear
                  //    options={}

                  placeholder="Nhập mã KH"
                  style={{ color: "black" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={4} md={4} lg={5}>
              <Form.Item
                className="custom-form-item"
                size="small"
                style={{ width: "100%", fontWeight: "bolder" }}
                name="TenKhachHang"
              >
                <AutoComplete
                  size="small"
                  allowClear
                  //    options={}

                  placeholder="Tên Khách Hàng"
                  style={{ color: "black" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={5} md={5} lg={4}>
              <Form.Item
                className="custom-form-item"
                size="small"
                style={{ width: "100%", fontWeight: "bolder" }}
                name="KeyIdHopDong"
              >
                <AutoComplete
                  allowClear
                  // options={

                  // }
                  // value={contractKeyIdField}
                  // onChange={(value) => setContractKeyIdField(value)}
                  placeholder="Số hợp đồng"
                  size="small"
                  style={{ width: "100%", fontWeight: "bolder" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={12} lg={4}>
          <Form.Item
            className="custom-form-item"
            name="SoDocChiSoId"
          >
            <AutoComplete
              
              allowClear
              name="SoDocChiSoId"
              // options={

              // }

              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              placeholder="Nhập sổ ghi chỉ số"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={3}>
          <Form.Item name="TrangThaiGhiId">
            <Select
              placeholder="Chọn Trạng Thái"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              options={dataForMenu?.trangThaiGhi?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={3}>
          <Form.Item name="SeriDongHo">
            <Input
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              placeholder="Nhập Seri ĐH"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={3}>
          <Form.Item name="BatThuong">
            <Select
              placeholder="Chọn Bất Thường"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              name="BatThuong"
            >
              <Option value="1">Chưa nhập chỉ số</Option>
              <Option value="2">Sản lượng bằng không</Option>
              <Option value="3">Sản lượng nhỏ hơn không</Option>
              <Option value="4">Thay đồng hồ</Option>
              <Option value="5">
                Tháng trước không sử dụng tháng này có phát sinh
              </Option>
              <Option value="6">Tăng giảm 50</Option>
              <Option value="7">Tăng giảm 60</Option>
              <Option value="8">Tăng giảm 70</Option>
              <Option value="9">Tăng giảm 80</Option>
              <Option value="10">Tăng giảm 90</Option>
              <Option value="11">Tăng giảm 100</Option>
              <Option value="12">
                CSD tháng tiếp theo khác CSC tháng trước
              </Option>
              <Option value="13">KH có nhập ghi chú</Option>
              <Option value="14">Có ảnh</Option>
              <Option value="15">Không có ảnh</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={3}>
          <Form.Item name="KyHieuTieuThu">
            <Select
              placeholder="Chọn Kí Hiệu"
              size="small"
              style={{ width: "100%", fontWeight: "bolder" }}
              options={[
                {
                  label: ">",
                  value: 1,
                },
                {
                  label: "<",
                  value: 2,
                },
                {
                  label: "=",
                  value: 3,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={3}>
          <Form.Item
            name="TieuThu"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const kyHieuTieuThu = getFieldValue("KyHieuTieuThu");
                  if (kyHieuTieuThu && !value) {
                    return Promise.reject("Hãy nhập tiêu thụ");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              size="small"
              placeholder="Tiêu thụ"
              style={{ width: "100%", fontWeight: "bolder" }}
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={5} style={{ display: "flex" }}>
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
            style={{ width: "100%" }}
            className="custom-btn-reset"
            size="small"
            onClick={()=>{
              form.resetFields()
              setDataFilter({})
              setCurPage(1)
              dispatch(fetchFilterListIndexPage("pageNumber=1&pageSize=10"));
            }}
            icon={<RedoOutlined />}
          >
            Làm mới
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
