import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListInvoice,
  paymentInvoice,
} from "../../../redux/slices/invoiceSlice/invoiceSlice";
import {
  btnClickGetFactoryIdSelector,
  getUserNhaMaySelector,
} from "../../../redux/selector";
import { getUserByNhaMay } from "../../../redux/slices/DMTuyenDoc/tuyenDocSlice";

const PaymentInvoice = (props) => {
  const { isOpenModalThanhToan, setIsOpenModalThanhToan, rowSelection, setRowSelection,fetchFilterInvoiceList, filterData } = props;
  const dispatch = useDispatch();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const userId = sessionStorage.getItem("userId");
  const userByNhaMay = useSelector(getUserNhaMaySelector);
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMays=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMays=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMays=${nhaMayId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const createFilterQueryString2 = () => {
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
    const nhaMayId = createFilterQueryString2();
    dispatch(getUserByNhaMay(nhaMayId));
  }, [nhaMayId]);

  const onFinish = async (values) => {
    const queryString = `${createFilterQueryString()}&userId=${userId}&PageSize=10&PageNumber=1`;
    values.hoaDonId = rowSelection.id;
    if (values) {
      await dispatch(paymentInvoice(values));
      fetchFilterInvoiceList(filterData)
      setIsOpenModalThanhToan(false);
      form.resetFields();
      setRowSelection(null)
    }
  };

  return (
    <Modal
      title="Thanh Toán"
      open={isOpenModalThanhToan}
      onCancel={() => {
        setIsOpenModalThanhToan(false);
        form.resetFields();
      }}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} {...layout}>
        <Form.Item name="nguoiThuTienId" label="Nhân Viên">
          <Select
            options={
              userByNhaMay?.map((item) => ({
                label: item.name,
                value: item.userId,
              })) || []
            }
            placeholder="Chọn Nhân Viên"
          ></Select>
        </Form.Item>
        <Form.Item name="hinhThucThanhToan" label="HTTT">
          <Select
            options={[
              {
                label: "Chuyển Khoản",
                value: 1,
              },
              {
                label: "Tiền Mặt",
                value: 2,
              },
              {
                label: "Theo Hợp Đồng",
                value: 3,
              },
            ]}
            placeholder="Chọn Hình Thức Thanh Toán"
          ></Select>
        </Form.Item>
        <Form.Item name="ghiChu" label="Ghi Chú">
          <Input placeholder="Nhập Ghi Chú"></Input>
        </Form.Item>
        <Row justify={"end"}>
          <Form.Item>
            <Button
              className="custom-btn-close"
              icon={<CloseOutlined />}
              onClick={() => {
                setIsOpenModalThanhToan(false);
                form.resetFields();
                setRowSelection(null)
              }}
            >
              Đóng
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<CheckOutlined />} htmlType="submit">
              Thanh Toán
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default PaymentInvoice;