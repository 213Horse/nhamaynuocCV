import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { useEffect, useState } from "react";
import { Lightbox } from "react-modal-image";

const formItem = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 15,
  },
  style: {
    marginBottom: "20px",
  },
};

const FormData = ({
  submit,
  setSubmit,
  form,
  submitForm,
  handleCancel,
  type,
}) => {
  // const onFinish = (values) => {
  //   console.log(values);
  // };

  //đinh dạng ảnh binary
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files) {
      setSubmit((prevSubmit) => ({
        ...prevSubmit,
        Image: files[0], // only send the first file
      }));
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    console.log("submit", submit.ImageChuKy);
    renderImage(submit.ImageChuKy);
  }, [isOpen]);
  useEffect(() => {
    // If it's an update and there's data for ImageChuKy, set it in the form
    if (type === "update" && submit.ImageChuKy) {
      form.setFieldsValue({
        Image: submit.ImageChuKy,
      });
    }
  }, [type, submit.ImageChuKy, form]);

  const renderImage = (text, record, index) => {
    const baseUrl = "https://api-awa-v2.amazingtech.vn";
    const validUrl = baseUrl + text;
    console.log("validUrl", validUrl);

    return (
      <img
        src={validUrl}
        alt="Image"
        onClick={() => {
          setCurrentImage(validUrl);
          setIsOpen(true);
        }}
        style={{ cursor: "pointer" }} // Add this to show a pointer cursor on hover
      />
    );
  };

  return (
    <Form
      form={form}
      name="FormData"
      onFinish={submitForm}
      style={{
        padding: "10px",
        overflowY: "auto",
      }}
    >
      <Row
        gutter={[10, 10]}
        style={{
          border: "1px solid #e5e5e5",
          padding: "20px",
          marginBottom: "30px",
          borderRadius: "5px",
        }}
      >
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 12 }}
        >
          <Form.Item
            {...formItem}
            name="KeyId"
            label="Mã nhà máy"
            rules={[{ required: true, message: "Vui lòng nhập mã nhà máy!" }]}
          >
            <Input
              disabled={type === "update"}
              placeholder="Nhập mã nhà máy"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  KeyId: e.target.value,
                  MaNhaMay: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="DiaChi"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            validateFirst
          >
            <Input
              placeholder="Nhập địa chỉ"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  DiaChi: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="DiaChiChiTiet"
            label="Địa chỉ văn phòng"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ văn phòng!" }]}
            validateFirst
          >
            <Input
              placeholder="Nhập địa chỉ văn phòng"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  DiaChiChiTiet: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="TaiKhoanNganHang"
            label="TK ngân hàng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số tài khoản ngân hàng!",
              },
            ]}
            validateFirst
          >
            <Input
              placeholder="Nhập số tài khoản ngân hàng"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  TaiKhoanNganHang: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="TenNganHang"
            label="Tên ngân hàng"
            rules={[
              { required: true, message: "Vui lòng nhập tên ngân hàng!" },
            ]}
            validateFirst
          >
            <Input
              placeholder="Nhập tên ngân hàng"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  TenNganHang: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="TenGiamDoc"
            label="Tên giám đốc NH"
            rules={[
              { required: true, message: "Vui lòng nhập tên giám đốc NH!" },
            ]}
            validateFirst
          >
            <Input
              placeholder="Nhập tên giám đốc NH"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  TenGiamDoc: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="ChiNhanhNganHang"
            label="Chi nhánh ngân hàng"
            rules={[
              { required: true, message: "Vui lòng nhập chi nhánh ngân hàng!" },
            ]}
            validateFirst
          >
            <Input
              placeholder="Nhập chi nhánh ngân hàng"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  ChiNhanhNganHang: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="ChuTaiKhoanNganHang"
            label="Chủ TK ngân hàng"
            rules={[
              { required: true, message: "Vui lòng nhập tên chủ tài khoản!" },
            ]}
            validateFirst
          >
            <Input
              placeholder="Nhập tên chủ tài khoản"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  ChuTaiKhoanNganHang: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item
            {...formItem}
            name="MaSoThue"
            label="Mã số thuế"
            rules={[{ required: true, message: "Vui lòng nhập mã số thuế!" }]}
            validateFirst
          >
            <Input
              placeholder="Nhập mã số thuế"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  MaSoThue: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="PhanLoaiNhaMay"
            label="Phân loại nhà máy"
            rules={[{ required: true, message: "Vui lòng phân loại nhà máy!" }]}
          >
            <Input
              placeholder="Nhập phân loại nhà máy"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  PhanLoaiNhaMay: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="Image"
            label="Chứ ký"
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
          >
            <Button>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Button>
          </Form.Item>
          <Form.Item {...formItem} label="Hình ảnh">
            {submit.Image && (
              <img
                src={URL.createObjectURL(submit.Image)} // use createObjectURL to display the uploaded image
                alt="Uploaded"
                style={{ maxWidth: "100%", cursor: "pointer" }}
                onClick={() => {
                  setCurrentImage(URL.createObjectURL(submit.Image));
                  setIsOpen(true);
                }}
              />
            )}

            {/* Display the existing image for update */}
            {type === "update" && submit.ImageChuKy && !submit.Image && (
              <img
                src={`https://api-awa-v2.amazingtech.vn${submit.ImageChuKy}`}
                alt="Existing Image"
                style={{ maxWidth: "100%", cursor: "pointer" }}
                onClick={() => {
                  setCurrentImage(
                    `https://api-awa-v2.amazingtech.vn${submit.ImageChuKy}`
                  );
                  setIsOpen(true);
                }}
              />
            )}
          </Form.Item>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 12 }}
        >
          <Form.Item
            {...formItem}
            name="TenNhaMay"
            label="Tên nhà máy"
            rules={[{ required: true, message: "Vui lòng nhập tên nhà máy!" }]}
          >
            <Input
              defaultValue={submit?.tenNhaMay}
              placeholder="Nhập tên nhà máy"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  TenNhaMay: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item
            {...formItem}
            name="PhamViPhucVu"
            label="Phạm vi phục vụ"
            rules={[
              { required: true, message: "Vui lòng nhập phạm vi phục vụ!" },
            ]}
          >
            <Input
              placeholder="Nhập phạm vi phục vụ"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  PhamViPhucVu: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item
            {...formItem}
            name="CongSuatThietKy"
            label="Công suất thiết kế"
            rules={[
              { required: true, message: "Vui lòng nhập công suất thiết kế!" },
            ]}
          >
            <Input
              placeholder="Nhập công suất thiết kế"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  CongSuatThietKy: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="DienThoai"
            label="Điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input
              placeholder="Nhập số điện thoại"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  DienThoai: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="DanhSachToaDo"
            label="Danh sách tọa độ"
            rules={[
              { required: true, message: "Vui lòng nhập danh sách tọa độ!" },
            ]}
          >
            <Input
              placeholder="Nhập danh sách tọa độ"
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  DanhSachToaDo: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="DienTichDat_m2"
            label="Diện tích đất m2"
            rules={[
              { required: true, message: "Vui lòng nhập diện tích đất!" },
            ]}
          >
            <InputNumber
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  DienTichDat_m2: e,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="NamVanHanh"
            label="Năm vận hành"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập năm vận hành!",
              },
            ]}
          >
            <InputNumber
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  NamVanHanh: e,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="DienTichNha_m2"
            label="Diện tích nhà máy m2"
            rules={[
              { required: true, message: "Vui lòng nhập diện tích nhà máy!" },
            ]}
          >
            <InputNumber
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  DienTichNha_m2: e,
                })
              }
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name="NamXayDung"
            label="Năm xây dựng"
            rules={[{ required: true, message: "Vui lòng nhập năm xây dựng!" }]}
          >
            <InputNumber
              onChange={(e) =>
                setSubmit({
                  ...submit,
                  NamXayDung: e,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      {isOpen && (
        <Lightbox
          medium={currentImage}
          large={currentImage}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Row gutter={[10, 10]} justify={"end"}>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Button danger onClick={handleCancel}>
            Hủy
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default FormData;
