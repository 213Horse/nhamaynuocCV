import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { btnClickGetFactoryIdSelector } from "../../../redux/selector";
import {
  cancelPaymentInvoice,
  fetchListInvoice,
} from "../../../redux/slices/invoiceSlice/invoiceSlice";

const CancelPaymentInvoice = (props) => {
  const { isOpenModalHuyThanhToan, setIsOpenModalHuyThanhToan, rowSelection, setRowSelection, filterData, fetchFilterInvoiceList } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const userId = sessionStorage.getItem("userId");
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
  

  const onFinish = async (values) => {
    const queryString = `${createFilterQueryString()}&userId=${userId}&PageSize=10&PageNumber=1`;
    values.hoaDonId = rowSelection.id;
    console.log(values);
    if (values) {
      await dispatch(cancelPaymentInvoice(values));
      fetchFilterInvoiceList(filterData)
      setIsOpenModalHuyThanhToan(false);
      form.resetFields();
      setRowSelection(null)
    }
  };

  return (
    <Modal
      title="Hủy Thanh Toán"
      open={isOpenModalHuyThanhToan}
      onCancel={() => {
        setIsOpenModalHuyThanhToan(false);
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
        <Form.Item name="ghiChu" label="Ghi Chú">
          <Input placeholder="Nhập Ghi Chú"></Input>
        </Form.Item>
        
        
        <Row justify={"end"}>
          <Form.Item>
            <Button
              className="custom-btn-close"
              icon={<CloseOutlined />}
              onClick={() => {
                setIsOpenModalHuyThanhToan(false);
                form.resetFields();
                setRowSelection(null)
              }}
            >
              Đóng
            </Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<CheckOutlined />} htmlType="submit">
             Hủy Thanh Toán
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>

  );
    
};

export default CancelPaymentInvoice;
