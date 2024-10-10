import { DashOutlined, RedoOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Modal,
  Tooltip,
} from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import ModalInfoCustomer from "../../../../FormInfoCustomer/ModalInfoCustomer";
import { getAllDMTotalByType } from "../../../../../redux/slices/DmTotalSlice/DmTotalSlice";
import {
  btnClickGetFactoryIdSelector,
  fetchApiGetAllObjectSelector,
  fetchApiGetContractIdNewSelector,
  fetchApiGetCustomerByCMNDSelector,
  fetchApiGetCustomerIdFromOptionFactorySelector,
  getDataForMenuContractCreate,
  getDetailHopDongSelector,
} from "../../../../../redux/selector";
import { fetchApiGetCustomerByCMND } from "../../../../../redux/slices/customerSlice/customerSlice";
import useDebounce from "../../../../../hooks/useDebounce";

function InfoCustomer({ handleResetCustomerId, isUpdate, formMain }) {
  const [formModalInfoCustomer] = Form.useForm();
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const doiTuongs = useSelector(fetchApiGetAllObjectSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const selectedHopDong = useSelector(getDetailHopDongSelector);
  const dataForMenu = useSelector(getDataForMenuContractCreate);
  const formItemLayout = {
    labelCol: {
      xs: { span: 22 },
      sm: { span: 5 },
      md: { span: 7 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 22 },
      lg: { span: 22 },
    },
  };

  const hideModal = () => {
    setIsModal(false);
    formModalInfoCustomer.resetFields();
  };

  // handle show info customer
  const handleShowInfoCustomer = () => {
    setIsModal(true);
  };

  const createFilterQueryString = () => {
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

  useEffect(() => {
    if (nhaMayId) {
      const queryString = createFilterQueryString();
      const filterData = {
        type: 1,
        queryString: queryString,
      };
      dispatch(getAllDMTotalByType(filterData));
    }
  }, [nhaMayId]);

  console.log(
    "id",
    doiTuongs?.find(
      (item) => item.tenKhuVuc === selectedHopDong?.mKhachHang?.doiTuong
    )?.id
  );
  const validateOnlyWords = (_, values) => {
    // if (values && /\d/.test(values)) {
    //   return Promise.reject("Chỉ được nhập chữ!");
    // }
    return Promise.resolve();
  };

  return (
    <div className="container-info-customer">
      <Row>
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="loaiKhachHang"
            label="Loại KH"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Bạn cần chọn loại khách hàng.",
              },
            ]}
          >
            <Select
              size="small"
              fieldNames="loaiKhachHang"
              options={[
                { value: "CaNhan", label: "1 - Cá nhân" },
                { value: "DonViToChuc", label: "2 - Đơn vị, tổ chức" },
              ]}
              placeholder="Chọn loại khách hàng"
            />
          </Form.Item>
        </Col>

        {/* Mã khách hàng + Button reset */}
        <Col xs={20} sm={22} md={11} lg={11}>
          <Form.Item name="keyIdOfCustomer" label="Mã KH" {...formItemLayout}>
            <Input
              size="small"
              placeholder="Mã khách hàng"
              // className="space-right-10"
              disabled
            />
          </Form.Item>
        </Col>

        {/* Tên khách hàng + */}
        <Col xs={20} sm={22} md={11} lg={11}>
          <Form.Item
            name="tenKhachHang"
            label="Tên KH"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập tên khách hàng.",
              },
              {
                validator: validateOnlyWords,
              },
            ]}
          >
            <Input
              size="small"
              name="tenKhachHang"
              placeholder="Nhập tên khách hàng"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="soCMND"
            label="Số CMND: "
            {...formItemLayout}
            rules={[
              {
                pattern: /^\d+$/,
                message: "Chỉ được nhập số!",
              },
              {
                pattern: /^\d{12}$/,
                message: "CMND phải đủ 12 số!",
              },
            ]}
          >
            {/* <div className="container-label-input"> */}
            <Input
              name="soCMND"
              size="small"
              placeholder="Nhập CMND"
              className="space-right-10"
              // onChange={handleChangeCMND}
            />
          </Form.Item>
        </Col>

        {/* Địa chỉ khách hàng */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="addressOfCustomer"
            label="Địa chỉ"
            {...formItemLayout}
          >
            <Input
              size="small"
              name="addressOfCustomer"
              placeholder="Nhập địa chỉ khách hàng"
            />
          </Form.Item>
        </Col>

        {/* <Col xs={24} sm={22} md={1} lg={1}></Col> */}

        {/* Tên thường gọi */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="tenThuongGoi"
            label="Tên TG"
            {...formItemLayout}
            rules={[
              {
                validator: validateOnlyWords,
              },
            ]}
          >
            <Input
              size="small"
              name="tenThuongGoi"
              placeholder="Nhập tên thường gọi"
            />
          </Form.Item>
        </Col>

        {/* Số hộ */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="soHo"
            label="Số hộ: "
            {...formItemLayout}
            rules={[
              {
                pattern: /^\d+$/,
                message: "Chỉ được nhập số!",
              },
            ]}
          >
            <Input
              size="small"
              name="soHo"
              placeholder="Nhập số hộ"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Số khẩu + Button ... (số khẩu) */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="soKhau"
            label="Số khẩu: "
            {...formItemLayout}
            rules={[
              {
                pattern: /^\d+$/,
                message: "Chỉ được nhập số!",
              },
            ]}
          >
            {/* <div className="container-label-input"> */}
            <Input
              name="soKhau"
              size="small"
              placeholder="Nhập số khẩu"
              className="space-right-10"
              style={{ width: "100%" }}
            />
            {/* <Button type="primary" className="custom-btn-3-form-contract">
                ...
              </Button> */}
            {/* </div> */}
          </Form.Item>
        </Col>

        {/* Email + button (email) */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="email"
            label="Email: "
            {...formItemLayout}
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
          >
            {/* <div className="container-label-input"> */}
            <Input
              name="email"
              size="small"
              placeholder="Nhập email"
              className="space-right-10"
            />
            {/* <Checkbox name="" /> */}
            {/* </div> */}
          </Form.Item>
        </Col>

        {/* Điện thoại */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="dienThoai"
            label="Điện thoại: "
            {...formItemLayout}
            rules={[
              {
                pattern: /^(\d{10})$|^(\d{11}$)/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input
              size="small"
              name="dienThoai"
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
        </Col>

        {/* Ngày cấp */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="ngayCapCMND" label="Ngày cấp" {...formItemLayout}>
            <DatePicker
              size="small"
              locale={locale}
              name="ngayCapCMND"
              placeholder="Chọn ngày cấp"
              className="gutter-item-date-picker"
            />
          </Form.Item>
        </Col>

        {/* Nơi cấp */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="noiCapCMND" label="Nơi cấp: " {...formItemLayout}>
            <Input size="small" name="noiCapCMND" placeholder="Nhập nơi cấp" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="maSoThue" label="Mã số thuế:" {...formItemLayout}>
            <Input size="small" name="maSoThue" placeholder="Nhập mã số thuế" />
          </Form.Item>
        </Col>

        {/* Người ĐD */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="nguoiDaiDien" label="Người ĐD: " {...formItemLayout}>
            <Input
              size="small"
              name="nguoiDaiDien"
              placeholder="Nhập tên người đại điện"
            />
          </Form.Item>
        </Col>

        {/* Ghi chú */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="ghiChuOfCustomer"
            label="Ghi chú: "
            {...formItemLayout}
          >
            <Input
              size="small"
              name="ghiChuOfCustomer"
              placeholder="Nhập ghi chú"
            />
          </Form.Item>
        </Col>

        {/* Đối tượng */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item name="doiTuong" label="Đối tượng: " {...formItemLayout}>
            <Select
              size="small"
              fieldNames="doiTuong"
              options={dataForMenu?.doiTuongKhachHang?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              // onClick={handleGetAllDoiTuongGia}
              placeholder="Chọn đối tượng"
            />
          </Form.Item>
        </Col>

        {/* Tài khoản ngân hàng */}
        {/* <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="taiKhoanNganHang"
            label="Số tài khoản: "
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống!",
              },
            ]}
          >
            <Input size="small" name="taiKhoanNganHang" placeholder="Nhập số tài khoản" />
          </Form.Item>
        </Col> */}

        {/* Ngân hàng */}
        {/* <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="nganHang"
            label="Ngân hàng: "
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống!",
              },
            ]}
          >
            <Input name="nganHang" placeholder="Nhập tên ngân hàng" />
          </Form.Item>
        </Col> */}

        {/* Id thẻ điện lực */}
        <Col xs={24} sm={22} md={11} lg={11}>
          <Form.Item
            name="idTheDienLuc"
            label="Id thẻ điện lực: "
            {...formItemLayout}
          >
            <Input
              size="small"
              name="idTheDienLuc"
              placeholder="Nhập id thẻ điện lực"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        {/* Nhà máy id */}
        <Col xs={24} sm={22} md={11} lg={10}>
          <Form.Item
            name="nhaMayIdOfCustomer"
            label="Nhà máy"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn tên nhà máy.",
            //   },
            // ]}
            style={{ display: "none" }}
          >
            <Input size="small" name="nhaMayIdOfCustomer" disabled />
          </Form.Item>
        </Col>
      </Row>

      {/* Modal (Tên khách hàng) */}
      <Modal
        open={isModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered={true}
        width={2000}
        onCancel={hideModal}
      >
        <h2>Chọn khách hàng</h2>
        <ModalInfoCustomer
          formModalInfoCustomer={formModalInfoCustomer}
          hideModal={hideModal}
        />
      </Modal>
    </div>
  );
}

export default memo(InfoCustomer);
