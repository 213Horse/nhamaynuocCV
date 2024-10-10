import { SearchOutlined } from "@ant-design/icons";
import {
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  dataContractList,
} from "../../redux/selector";
import {
  fetchFilterWaterSituation,
  fetchListContract,
} from "../../redux/slices/invoiceSlice/invoiceSlice";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import dayjs from "dayjs";
export const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const dataListContract = useSelector(dataContractList);
  const factoryID = useSelector(btnClickGetFactoryIdSelector);
  const [selectedItems, setSelectedItems] = useState();
  const [form] = Form.useForm();
  const formStyle = {
    maxWidth: "none",
    // background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
  };
  const dispatch = useDispatch();
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
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const postData = {
      ...values,
      TuyenDocId: selectedItems?.tuyenDocId,
      TenKH: selectedItems?.khachHangId,
      SoHopDong: selectedItems?.id,
      MaKH: selectedItems?.khachHang.keyId,
      DiaChi: selectedItems?.khachHang.diaChi,
      NguoiQuanLyId: selectedItems?.canboDocId,
      NhaMayIds: createFactoryQueryString(),
      DenNgay: values?.denNgay?.format("DD-MM-YYYY"),
      TuNgay: values?.tuNgay?.format("DD-MM-YYYY"),
    };

    console.log("Received values of form2: ", postData);
    dispatch(fetchFilterWaterSituation(postData));
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  useEffect(() => {
    console.log("selectedItems", selectedItems);
  }, [selectedItems]);
  const handleSelectChange = (value, option) => {
    console.log("Selected Items:", option.data);
    setSelectedItems(option.data);
    form.setFieldsValue({ maKH: option.data?.khachHang.keyId || "" });
    form.setFieldsValue({ tenTuyen: option.data?.tenTuyen || "" });
    form.setFieldsValue({ tenKH: option.data?.tenKhachHang || "" });
    form.setFieldsValue({ diaChi: option.data?.khachHang.diaChi || "" });
    form.setFieldsValue({ canBoDoc: option.data?.canboDocId || "" });
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
      size="small"
    >
      <Row gutter={24}>
        <Col md={12} lg={7} style={{ width: "100%" }}>
          <Form.Item name="soHopDong" label="Số hợp đồng">
            <Select
              fieldNames="soHopDong"
              showSearch
              placeholder="Nhập hợp đồng"
              value={
                selectedItems
                  ? { key: selectedItems.id, label: selectedItems.keyId }
                  : undefined
              }
              onChange={handleSelectChange}
              style={{
                width: "100%",
              }}
              options={dataListContract?.map((contract) => ({
                value: contract.id,
                label: contract.keyId,
                data: contract,
              }))}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Form.Item>
        </Col>
        <Col md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="maKH" label="Mã KH">
            <Input disabled placeholder="Nhập mã khách hàng" />
          </Form.Item>
        </Col>
        <Col md={12} lg={5} style={{ width: "100%" }}>
          <Form.Item name="tuNgay" label="Từ ngày">
            <DatePicker
              placeholder="Từ ngày"
              allowClear
              locale={locale}
              style={{ width: "100%" }}
              format="DD-MM-YYYY"
            />
          </Form.Item>
        </Col>
        <Col md={12} lg={6} style={{ width: "100%" }}>
          <Form.Item name="denNgay" label="Đến ngày">
            <DatePicker
              placeholder="Đến ngày"
              allowClear
              style={{ width: "100%" }}
              format="DD-MM-YYYY"
              locale={locale}
              disabledDate={disabledDate}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="tenKH" label="Tên KH">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="tenTuyen" label="Tuyến đọc">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="diaChi" label="Địa chỉ">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="canBoDoc" label="Nhân viên ghi">
            <Input disabled style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Button type="primary" htmlType="submit">
          <SearchOutlined />
          Tìm kiếm
        </Button>
      </div>
    </Form>
  );
};
