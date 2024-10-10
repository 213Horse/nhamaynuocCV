import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { CloseOutlined, FormOutlined } from "@ant-design/icons";
import {
  btnClickTabListContractSelector,
  getSelectBillCollectorOptions,
  getSelectPaymentTypeOptions,
  isLoadingPaymentTypeSelector,
} from "../../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { postPayment } from "../../../../redux/slices/paymentSlice/paymentSlice";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
const { TextArea } = Input;

function FormPayForOneBillSelect({ hideModal }) {
  const dispatch = useDispatch();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
      md: { span: 7 },
      lg: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  //Get selector
  const selectBillCollectorOptionsSelector = useSelector(
    getSelectBillCollectorOptions
  );
  const clickTabListContractSelector = useSelector(
    btnClickTabListContractSelector
  );
  const selectPaymentTypeOptionsSelector = useSelector(
    getSelectPaymentTypeOptions
  );

  //Get loading data status
  const isLoadingPaymentTypeSelect = useSelector(isLoadingPaymentTypeSelector);

  useEffect(() => {
    console.log(clickTabListContractSelector);
  }, [clickTabListContractSelector]);

  // handle submit form
  const handleSubmit = (values) => {
    if (values.ghiChu === undefined) {
      values.ghiChu = "";
    }
    dispatch(
      postPayment({ ...values, thanhToanId: clickTabListContractSelector.id })
    );
  };

  // handle submit form error
  const handleSubmitFailed = (error) => {
    console.log({ error });
  };

  return (
    <>
      <Divider orientation="left">Thanh toán cho 1 đơn được chọn</Divider>

      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        {...formItemLayout}
      >
        {/* Đã thanh toán */}
        {/* <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item name="" valuePropName="checked" label="Đã thanh toán">
              <Checkbox name="" />
            </Form.Item>
          </Col>
        </Row> */}

        {/* Người thu tiền */}
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item name="nguoiThuTienId" label="Người thu tiền">
              <Select
                fieldNames="selectBillCollector"
                options={
                  selectBillCollectorOptionsSelector.nodes
                    ? selectBillCollectorOptionsSelector.nodes.map(
                        (option, index) => {
                          return {
                            value: option.id,
                            label: option.normalizedUserName,
                          };
                        }
                      )
                    : []
                }
                placeholder="Chọn người thu tiền"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Ngày thu tiền */}
        {/* <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item name="" label="Ngày thu tiền">
              <DatePicker
                name=""
                locale={locale}
                placeholder="Chọn ngày thu tiền"
                className="gutter-item-date-picker"
              />
            </Form.Item>
          </Col>
        </Row> */}

        {/* Hình thức thu tiền */}
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item name="hinhThucThanhToan" label="Hình thức thu tiền">
              <Select
                fieldNames="hinhThucThanhToan"
                options={[
                  {
                    value: 1,
                    label: "Chuyển khoản",
                  },
                  {
                    value: 2,
                    label: "Tiền mặt",
                  },
                  {
                    value: 3,
                    label: "Theo hợp đồng",
                  },
                ]}
                loading={isLoadingPaymentTypeSelect}
                placeholder="Chọn hình thức thu tiền"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Ghi chú */}
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item name="ghiChu" label="Ghi chú">
              <TextArea name="" placeholder="Nhập ghi chú"></TextArea>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        {/* Buttons */}
        <div className="func-payment-for-one-bill">
          <Button
            htmlType="submit"
            className="payment-for-one-bill-notion-btn custom-btn-add"
          >
            <FormOutlined />
            Ghi lại
          </Button>
          <Button onClick={() => hideModal()} className="custom-btn-close">
            <CloseOutlined /> Đóng
          </Button>
        </div>
      </Form>
    </>
  );
}

export default FormPayForOneBillSelect;
