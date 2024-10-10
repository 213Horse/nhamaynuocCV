import { Form, Modal, message } from "antd";
import FormData from "./FormData";
import { useState } from "react";
import { postRequest } from "../../../../services";
import { useDispatch } from "react-redux";
import { fetchApiAllFactory } from "../../../../redux/slices/factorySlice/factorySlice";
import { fetchAdd } from "../../../../redux/slices/readingIndexSlice/readingIndexSlice";

const FactoryPopupAdd = ({ isModalOpen, setIsModalOpen }) => {
  const [submit, setSubmit] = useState({});
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const submitForm = () => {
    console.log("submit", submit);
    // if (!submit.KeyId) {
    //   message.error("Vui lòng nhập mã nhà máy");
    // } else if (!submit.TenNhaMay) {
    //   message.error("Vui lòng nhập tên nhà máy");
    // } else if (!submit.DiaChi) {
    //   message.error("Vui lòng nhập địa chỉ");
    // } else if (!submit.PhanLoaiNhaMay) {
    //   message.error("Vui lòng nhập phân loại nhà máy");
    // } else if (!submit.CongSuatThietKy) {
    //   message.error("Vui lòng nhập công suất thiết kế");
    // } else if (!submit.DienTichNha_m2) {
    //   message.error("Vui lòng nhập diện tích nhà");
    // } else if (!submit.DienTichDat_m2) {
    //   message.error("Vui lòng nhập diện tích đất");
    // } else if (!submit.NamXayDung) {
    //   message.error("Vui lòng nhập năm xây dựng");
    // } else if (!submit.NamVanHanh) {
    //   message.error("Vui lòng nhập năm vận hành");
    // } else if (!submit.PhamViPhucVu) {
    //   message.error("Vui lòng nhập phạm vi phục vụ");
    // } else if (!submit.TenNganHang) {
    //   message.error("Vui lòng nhập tên ngân hàng");
    // } else if (!submit.TenGiamDoc) {
    //   message.error("Vui lòng nhập tên giám đốc");
    // } else if (!submit.ChiNhanhNganHang) {
    //   message.error("Vui lòng nhập chi nhánh ngân hàng");
    // } 
    // else {
        dispatch(fetchAdd(submit))
        .unwrap()
        .then(() => {
          setIsModalOpen(false);
          dispatch(fetchApiAllFactory());
        });  
    // postRequest("nha-may/add", submit).then((res) => {
    //     console.log("res", res);
    //     if (res?.data?.code == "Success!") {
    //       setSubmit({});
    //       form.resetFields();
    //       message.success("Thêm thành công");
    //       setTimeout(() => {
    //         setIsModalOpen(false);
    //       }, 50);
    //       dispatch(fetchApiAllFactory());
    //     } else {
    //       setSubmit({});
    //       message.error("Thêm thất bại");
    //     }
    //   });
    // }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSubmit({});
    form.resetFields();
  };

  return (
    <Modal
      title="Thêm nhà máy"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1000}
    >
      <FormData
        submit={submit}
        setSubmit={setSubmit}
        form={form}
        submitForm={submitForm}
        handleCancel={handleCancel}
        type="add"
      />
    </Modal>
  );
};
export default FactoryPopupAdd;
