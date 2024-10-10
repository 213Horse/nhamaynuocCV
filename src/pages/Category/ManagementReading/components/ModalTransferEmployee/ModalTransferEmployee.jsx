import { CloseCircleOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ModalTransferEmployee.css";
import {
  btnClickGetFactoryIdSelector,
  getCanBoDoc,
  getTuyenDocByID,
  isLoadingNewEmployeeSelectSelector,
} from "../../../../../redux/selector";
import tuyenDocSlice, {
  fetchCanBoDoc,
  fetchCanBoThu,
  tranferCanBoDoc,
  tranferCanBoThu,
} from "../../../../../redux/slices/DMTuyenDoc/tuyenDocSlice";

const ModalTransferEmployee = ({
  isOpenBillCollector,
  handleCancel,
  handleOk,
  openTransferManagers,
}) => {
  const tabList = useSelector((state) => state.tabListContractSlice.tabList);
  const tuyenDocDetailSelector = useSelector(getTuyenDocByID);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const rowSelected = useSelector(
    (state) => state.tabListReadingSlice.rowSelected
  );
  const canBoDocSelector = useSelector(getCanBoDoc);
  const isLoadingNewEmployee = useSelector(isLoadingNewEmployeeSelectSelector);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [valueNewEmployee, setValueNewEmployee] = useState();
  const [employeeOptions, setEmployeeOptions] = useState([]);

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
    console.log(tuyenDocDetailSelector);

    if (openTransferManagers) {
      form.setFieldValue("oldEmployee", tuyenDocDetailSelector?.tenNguoiQuanLy);
    } else {
      form.setFieldValue(
        "oldEmployee",
        tuyenDocDetailSelector?.tenNguoiThuTien
      );
    }
    form.setFieldValue("codeLine", tuyenDocDetailSelector?.keyId);
    form.setFieldValue("nameLine", tuyenDocDetailSelector?.tenTuyen);
  }, [tuyenDocDetailSelector]);

  useEffect(() => {
    if (isOpenBillCollector) {
      const nhaMayIds = createFilterQueryString();

      if (openTransferManagers) {
        dispatch(fetchCanBoDoc(nhaMayIds));
      } else {
        dispatch(fetchCanBoThu(nhaMayIds));
      }
    } else {
      // clear canBoDoc
      dispatch(tuyenDocSlice.actions.btnClickResetCanBo());
      //reset form
      form.resetFields();
    }
  }, [isOpenBillCollector]);

  useEffect(() => {
    if (canBoDocSelector) {
      const options = canBoDocSelector?.map((option) => ({
        value: option.id,
        label: option.normalizedUserName,
      }));
      setEmployeeOptions(options);
    }
  }, [canBoDocSelector]);

  // useEffect(() => {
  //   form.setFieldValue("oldEmployee", tabList?.cashier || "");
  //   form.setFieldValue("codeLine", tabList?.codeLine || "");
  //   form.setFieldValue("nameLine", tabList?.nameLine || "");
  // }, [tabList, openTransferManagers, form]);

  // useEffect(() => {
  //   if (!isOpenBillCollector) return;
  //   return () => {
  //     form.setFieldValue("oldEmployee", "");
  //     form.setFieldValue("codeLine", "");
  //     form.setFieldValue("nameLine", "");
  //   };
  // }, [isOpenBillCollector]);

  const handleChangeValue = (e) => {
    form.setFieldValue(e.target.name, e.target.value);
  };

  const handleSubmit = (values) => {
    console.log("Submit", values);
    if (openTransferManagers) {
      //handle submit for canBoDoc
      let newEmployeeId = rowSelected.nguoiQuanLyId;
      if (values.newEmployee !== newEmployeeId) {
        //update data when change new canBoDoc
        newEmployeeId = values.newEmployee;
      }
      const formData = {
        tuyenDocId: rowSelected.id,
        nguoiQuanLyId: newEmployeeId,
        chuyenHoaDon: values.transferBill,
      };
      dispatch(tranferCanBoDoc(formData));
      handleCancel("transferManager")
    } else {
      //handle submit for canBoThu
      let newEmployeeId = rowSelected.nguoiThuTienId;
      if (values.newEmployee !== newEmployeeId) {
        //update data when change new canBoThu
        newEmployeeId = values.newEmployee;
      }
      const formData = {
        tuyenDocId: rowSelected.id,
        nguoiThuTienId: newEmployeeId,
        chuyenHoaDon: values.transferManager ? 2 : 3,
      };
      dispatch(tranferCanBoThu(formData));
      handleCancel("transferEmployee")
    }
  };

  return (
    <Modal
      title={
        openTransferManagers
          ? "Chuyển cán bộ quản lý tuyến"
          : "Chuyển cán bộ quản lý thu"
      }
      open={isOpenBillCollector}
      onOk={() => handleOk("transferEmployee")}
      onCancel={() => handleCancel("transferEmployee")}
      className="popup-add-transfer-employee"
      width={600}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 15 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item label="Nhân viên cũ:" name="oldEmployee">
          <Input
            name="oldEmployee"
            placeholder="Nhân viên cũ"
            onChange={handleChangeValue}
            disabled
          />
        </Form.Item>
        <Form.Item label="Mã tuyến:" name="codeLine">
          <Input
            name="codeLine"
            placeholder="Mã tuyến"
            onChange={handleChangeValue}
            disabled
          />
        </Form.Item>
        <Form.Item label="Tên tuyến:" name="nameLine">
          <Input
            name="nameLine"
            placeholder="Tên tuyến"
            onChange={handleChangeValue}
            disabled
          />
        </Form.Item>
        {openTransferManagers ? (
          <Form.Item
            label="Nhân viên mới:"
            name="newEmployee"
            rules={[{ required: true, message: "Hãy chọn nhân viên mới!" }]}
          >
            <Select
              name="newEmployee"
              size="middle"
              placeholder="Chọn nhân viên mới"
              style={{ width: "100%" }}
              options={employeeOptions}
            />
          </Form.Item>
        ) : (
          <Form.Item
            label="Nhân viên thu mới:"
            name="newEmployee"
            rules={[{ required: true, message: "Hãy chọn nhân viên mới!" }]}
          >
            <Select
              name="newEmployee"
              size="middle"
              placeholder="Chọn nhân viên mới"
              style={{ width: "100%" }}
              options={employeeOptions}
              loading={isLoadingNewEmployee}
            />
          </Form.Item>
        )}
        {openTransferManagers && (
          <Form.Item
            label="Chuyển hóa đơn:"
            name="transferBill"
            rules={[{ required: true, message: "Hãy chọn háo đơn!" }]}
          >
            <Select
              name="transferBill"
              size="middle"
              placeholder="Chọn hóa đơn"
              style={{ width: "100%" }}
              options={[
                {
                  value: 1,
                  label: "Chuyển hết hoá đơn",
                },
                {
                  value: 2,
                  label: "Chuyển hoá đơn chưa thanh toán",
                },
                {
                  value: 3,
                  label: "Không chuyển hoá đơn",
                },
              ]}
            />
          </Form.Item>
        )}
        {!openTransferManagers && (
          <div className="transfer-manager-select">
            {/* <Form.Item name="status">
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Radio value={true}>Theo tuyến đọc</Radio>
                <Radio value={false}>Theo tuyến thu</Radio>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item
              name="transferManager"
              valuePropName="checked"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Checkbox name="transferManager" style={{ marginRight: "5px" }}>
                Chuyển hóa đơn chưa thanh toán
              </Checkbox>
            </Form.Item>
          </div>
        )}
        <Form.Item className="form-item-button">
          <Space size={5} className="modal-button-actions">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              style={{
                marginRight: 5,
                width: "100%",
                backgroundColor: "#13DEB9",
                color: "#FFFFFF",
              }}
              htmlType="submit"
              size="middle"
              // disabled={!(valueSymbol && valueDescribe)}
            >
              Thực hiện
            </Button>
            <Button
              key="submit"
              icon={<CloseCircleOutlined />}
              onClick={() => handleCancel("transferEmployee")}
              style={{
                width: "100%",
                backgroundColor: "#FA896B",
                color: "#FFFFFF",
                border: "none",
              }}
              size="middle"
            >
              Đóng
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTransferEmployee;
