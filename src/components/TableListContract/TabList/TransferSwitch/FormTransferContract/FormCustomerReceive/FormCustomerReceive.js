import { CloseOutlined, RedoOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiTransferContract } from "../../../../../../redux/slices/contractSlice/contractSlice";
import {
  btnClickGetFactoryIdSelector,
  fetchApiGetByIdCustomerSelector,
  fetchApiGetCustomerByCMNDSelector,
  fetchApiGetCustomerIdFromOptionFactorySelector,
} from "../../../../../../redux/selector";
import { useEffect, useState } from "react";
import useDebounce from "../../../../../../hooks/useDebounce";
import {
  fetchApiGetCustomerByCMND,
  fetchApiGetCustomerIdFromOptionFactory,
} from "../../../../../../redux/slices/customerSlice/customerSlice";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
function FormCustomerReceive({
  modalTransferContract,
  hideModalTransferContract,
}) {
  const [formMain] = Form.useForm();
  const [valueCMND, setValCMND] = useState("");

  const dispatch = useDispatch();

  const debouncedValue = useDebounce(valueCMND, 800);

  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const primaryId = useSelector(fetchApiGetCustomerIdFromOptionFactorySelector);
  const customer = useSelector(fetchApiGetByIdCustomerSelector);
  const customerFromCMND = useSelector(fetchApiGetCustomerByCMNDSelector);

  // console.log("factoryId 2", factoryId);
  // console.log("primaryId 2", primaryId);
  // console.log("customer 2", customer);
  // console.log("customerFromCMND 2", customerFromCMND);

  useEffect(() => {
    debouncedValue && dispatch(fetchApiGetCustomerByCMND(debouncedValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // get (mã khách hàng mới) -> khi mở modal lần đầu tiên
  useEffect(() => {
    if (modalTransferContract) {
      factoryId && dispatch(fetchApiGetCustomerIdFromOptionFactory(factoryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factoryId, modalTransferContract]);

  // set fields (Khi tìm thấy KH)
  useEffect(() => {
    if (customerFromCMND) {
      formMain.setFieldsValue({ keyId: customerFromCMND?.keyId || primaryId });

      formMain.setFieldsValue({
        loaiKhachHang: customerFromCMND?.loaiKhachHang,
      });
      formMain.setFieldsValue({ tenKhachHang: customerFromCMND?.tenKhachHang });
      formMain.setFieldsValue({ tenThuongGoi: customerFromCMND?.tenThuongGoi });
      formMain.setFieldsValue({ soHo: customerFromCMND?.soHo });
      formMain.setFieldsValue({ soKhau: customerFromCMND?.soKhau });
      formMain.setFieldsValue({ email: customerFromCMND?.email });
      formMain.setFieldsValue({ dienThoai: customerFromCMND?.dienThoai });
      formMain.setFieldsValue({ diaChi: customerFromCMND?.diaChi });
      formMain.setFieldsValue({
        ngayCapCmnd: dayjs(customerFromCMND?.ngayCapCmnd),
      });
      formMain.setFieldsValue({ noiCapCmnd: customerFromCMND?.noiCapCmnd });
      formMain.setFieldsValue({ maSoThue: customerFromCMND?.maSoThue });
      formMain.setFieldsValue({ nguoiDaiDien: customerFromCMND?.nguoiDaiDien });
      formMain.setFieldsValue({ ghiChu: customerFromCMND?.ghiChu });
      formMain.setFieldsValue({ maSoThue: customerFromCMND?.maSoThue });
      // formMain.setFieldsValue({ doiTuong: customerFromCMND?.doiTuong });
      // formMain.setFieldsValue({
      //   nhaMayIdOfCustomer: customerFromCMND?.nhaMayId,
      // });
    } else if (primaryId) {
      formMain.setFieldsValue({ keyId: primaryId });

      formMain.setFieldsValue({
        loaiKhachHang: "CaNhan",
      });
      formMain.setFieldsValue({ tenKhachHang: "" });
      formMain.setFieldsValue({ tenThuongGoi: "" });
      formMain.setFieldsValue({ soHo: "" });
      formMain.setFieldsValue({ soKhau: "" });
      formMain.setFieldsValue({ email: "" });
      formMain.setFieldsValue({ dienThoai: "" });
      formMain.setFieldsValue({ addressOfCustomer: "" });
      formMain.setFieldsValue({
        ngayCapCmnd: "", //dayjs(ngayCapCmnd),
      });
      formMain.setFieldsValue({ noiCapCmnd: "" });
      formMain.setFieldsValue({ maSoThue: "" });
      formMain.setFieldsValue({ nguoiDaiDien: "" });
      formMain.setFieldsValue({ ghiChu: "" });
      formMain.setFieldsValue({ doiTuong: "" });
      // formMain.setFieldsValue({
      //   nhaMayIdOfCustomer: "",
      // });
    }
  }, [customerFromCMND, formMain, primaryId]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
      md: { span: 6 },
      lg: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  const handleHideModal = () => {
    hideModalTransferContract();
  };

  // handle change cmnd
  const handleChangeCMND = (e) => {
    const _value = e.target.value;
    console.log(_value);
    setValCMND(_value);
  };

  // handle reset customer Id
  // const handleResetCustomerId = () => {
  //   dispatch(fetchApiGetCustomerIdFromOptionFactory(factoryId));
  // };

  // handle submit form (Chuyển nhượng hợp đồng)
  const handleSubmit = (values) => {
    if (values && customer) {
      dispatch(
        fetchApiTransferContract({
          values: values,
          customer: customer,
        })
      );
      hideModalTransferContract();
    }
  };

  return (
    <Form
      form={formMain}
      onFinish={handleSubmit}
      fields={[{ name: "loaiKhachHang", value: "CaNhan" }]}
    >
      <Row>
        {/* Loại KH */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="loaiKhachHang" label="Loại KH" {...formItemLayout}>
            <Select
              fieldNames="loaiKhachHang"
              options={[
                { value: "CaNhan", label: "1 - Cá nhân" },
                { value: "ToChuc", label: "2 - Đơn vị, tổ chức" },
              ]}
              placeholder="Chọn loại khách hàng"
            />
          </Form.Item>
        </Col>

        {/* CMND */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            name="soCmnd"
            label="Số CMND"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập CMND.",
              },
            ]}
          >
            <Input
              name="soCmnd"
              onChange={handleChangeCMND}
              placeholder="Nhập số chứng minh"
            />
          </Form.Item>
        </Col>

        {/* Tên KH */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            name="tenKhachHang"
            label="Tên KH"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập tên khách hàng.",
              },
            ]}
          >
            <Input
              name="tenKhachHang"
              type="text"
              placeholder="Nhập tên khách hàng"
            />
          </Form.Item>
        </Col>

        {/* Mã KH */}
        <Col xs={23} sm={23} md={12} lg={12}>
          <Form.Item
            name="keyId"
            label="Mã KH"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập mã khách hàng.",
              },
            ]}
          >
            <Input
              name="keyId"
              placeholder="Nhập mã khách hàng"
              // disabled
            />
          </Form.Item>
        </Col>

        {/* <Col xs={1} sm={1} md={1} lg={1}>
          <Form.Item {...formItemLayout}>
            <Tooltip
              title="Làm mới mã KH"
              // className={`${isUpdate ? "disabled-is-update" : ""}`}
            >
              <Button
                className="custom-btn-reset-form-contract custom-btn-reset space-left-6 space-top-40"
                onClick={handleResetCustomerId}
              >
                <RedoOutlined />
              </Button>
            </Tooltip>
          </Form.Item>
        </Col> */}

        {/* Số hộ */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="soHo" label="Số hộ" {...formItemLayout}>
            <InputNumber
              name="soHo"
              placeholder="Nhập số hộ"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Số khẩu */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            name="soKhau"
            label="Số khẩu"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập số khẩu.",
              },
            ]}
          >
            <InputNumber
              name="soKhau"
              placeholder="Nhập số khẩu"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Địa chỉ KH */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="diaChi" label="Địa chỉ" {...formItemLayout}>
            <Input name="diaChi" placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Col>

        {/* Email */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="email" label="Email" {...formItemLayout}>
            <Input name="email" placeholder="Nhập email" />
          </Form.Item>
        </Col>

        {/* Sđt */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="dienThoai" label="Số ĐT" {...formItemLayout}>
            <Input name="dienThoai" placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>

        {/* Ngày cấp */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="ngayCapCmnd" label="Ngày cấp" {...formItemLayout}>
            <DatePicker
              name="ngayCapCmnd"
              locale={locale}
              placeholder="Chọn ngày cấp"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Mã số thuế */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="maSoThue" label="Mã số thuế" {...formItemLayout}>
            <Input name="maSoThue" placeholder="Nhập mã số thuế" />
          </Form.Item>
        </Col>

        {/* Nơi cấp */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="noiCapCmnd" label="Nơi cấp" {...formItemLayout}>
            <Input name="noiCapCmnd" placeholder="Nhập nơi cấp" />
          </Form.Item>
        </Col>

        {/* Ghi chú */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="ghiChu" label="Ghi chú" {...formItemLayout}>
            <Input name="ghiChu" placeholder="Nhập ghi chú" />
          </Form.Item>
        </Col>
      </Row>

      <div className="update-reading-footer">
        <Button htmlType="submit" className="custom-btn-add space-right-10">
          <SaveOutlined /> Ghi lại
        </Button>

        <Button className="custom-btn-close" onClick={handleHideModal}>
          <CloseOutlined /> Đóng
        </Button>
      </div>
    </Form>
  );
}

export default FormCustomerReceive;
