import { Form, Modal, message } from "antd";
import FormData from "./FormData";
import { useEffect, useState } from "react";
import { putRequestMultipartFormData } from "../../../../services";
import { useDispatch } from "react-redux";
import { fetchApiAllFactory } from "../../../../redux/slices/factorySlice/factorySlice";
import { fetchUpdate } from "../../../../redux/slices/readingIndexSlice/readingIndexSlice";

const FactoryPopupUpdate = ({ isModalOpen, setIsModalOpen, factory }) => {
  const dispatch = useDispatch();

  const [submit, setSubmit] = useState({});
  const [form] = Form.useForm();

  const submitForm = () => {
    dispatch(fetchUpdate(submit))
      .unwrap()
      .then(() => {
        setIsModalOpen(false);
        dispatch(fetchApiAllFactory());
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.setFieldsValue({
      KeyId: factory?.keyId,
      TenNhaMay: factory?.tenNhaMay,
      DiaChi: factory?.diaChi,
      DiaChiChiTiet: factory?.diaChiChiTiet,
      MaNhaMay: factory?.maNhaMay,
      PhanLoaiNhaMay: factory?.phanLoaiNhaMay,
      CongSuatThietKy: factory?.congSuatThietKy,
      DienTichNha_m2: factory?.dienTichNha_m2,
      DienTichDat_m2: factory?.dienTichDat_m2,
      NamXayDung: factory?.namXayDung,
      NamVanHanh: factory?.namVanHanh,
      PhamViPhucVu: factory?.phamViPhucVu,
      TaiKhoanNganHang: factory?.taiKhoanNganHang,
      DienThoai: factory?.dienThoai,
      ChuTaiKhoanNganHang: factory?.chuTaiKhoanNganHang,
      TenNganHang: factory?.tenNganHang,
      TenGiamDoc: factory?.tenGiamDoc,
      ChiNhanhNganHang: factory?.chiNhanhNganHang,
      Image: factory?.image,
      DanhSachToaDo: factory?.danhSachToaDo,
      MaSoThue: factory?.maSoThue,
      ImageChuKy: factory?.imageChuKy,
    });
  };
console.log("factory",factory)
  // khi open modal thì set lại giá trị cho submit
  useEffect(() => {
    setSubmit({
      KeyId: factory?.keyId,
      TenNhaMay: factory?.tenNhaMay,
      DiaChi: factory?.diaChi,
      DiaChiChiTiet: factory?.diaChiChiTiet,
      MaNhaMay: factory?.maNhaMay,
      PhanLoaiNhaMay: factory?.phanLoaiNhaMay,
      CongSuatThietKy: factory?.congSuatThietKy,
      DienTichNha_m2: factory?.dienTichNha_m2,
      DienTichDat_m2: factory?.dienTichDat_m2,
      NamXayDung: factory?.namXayDung,
      NamVanHanh: factory?.namVanHanh,
      PhamViPhucVu: factory?.phamViPhucVu,
      TaiKhoanNganHang: factory?.taiKhoanNganHang,
      DienThoai: factory?.dienThoai,
      ChuTaiKhoanNganHang: factory?.chuTaiKhoanNganHang,
      TenNganHang: factory?.tenNganHang,
      TenGiamDoc: factory?.tenGiamDoc,
      ChiNhanhNganHang: factory?.chiNhanhNganHang,
      Image: factory?.image,
      DanhSachToaDo: factory?.danhSachToaDo,
      MaSoThue: factory?.maSoThue,
      ImageChuKy: factory?.imageChuKy,
    });
    form.setFieldValue("KeyId", factory?.keyId);
    form.setFieldValue("TenNhaMay", factory?.tenNhaMay);
    form.setFieldValue("DiaChi", factory?.diaChi);
    form.setFieldValue("DiaChiChiTiet", factory?.diaChiChiTiet);
    form.setFieldValue("MaNhaMay", factory?.maNhaMay);
    form.setFieldValue("DanhSachToaDo", factory?.danhSachToaDo);
    form.setFieldValue("MaSoThue", factory?.maSoThue);
    form.setFieldValue("DienThoai", factory?.dienThoai);
    form.setFieldValue("PhanLoaiNhaMay", factory?.phanLoaiNhaMay);
    form.setFieldValue("CongSuatThietKy", factory?.congSuatThietKy);
    form.setFieldValue("DienTichNha_m2", factory?.dienTichNha_m2);
    form.setFieldValue("DienTichDat_m2", factory?.dienTichDat_m2);
    form.setFieldValue("NamXayDung", factory?.namXayDung);
    form.setFieldValue("NamVanHanh", factory?.namVanHanh);
    form.setFieldValue("PhamViPhucVu", factory?.phamViPhucVu);
    form.setFieldValue("TaiKhoanNganHang", factory?.taiKhoanNganHang);
    form.setFieldValue("ChuTaiKhoanNganHang", factory?.chuTaiKhoanNganHang);
    form.setFieldValue("TenNganHang", factory?.tenNganHang);
    form.setFieldValue("TenGiamDoc", factory?.tenGiamDoc);
    form.setFieldValue("ChiNhanhNganHang", factory?.chiNhanhNganHang);
    form.setFieldValue("Image", factory?.image);
  }, [isModalOpen]);

  return (
    <Modal
      title="Cập nhật nhà máy"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1000}
      destroyOnClose
    >
      <FormData
        submit={submit}
        setSubmit={setSubmit}
        form={form}
        submitForm={submitForm}
        handleCancel={handleCancel}
        type="update"
      />
    </Modal>
  );
};
export default FactoryPopupUpdate;
