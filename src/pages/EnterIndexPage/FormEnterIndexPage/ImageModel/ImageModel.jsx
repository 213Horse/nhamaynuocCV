import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Upload, Form, Input, Select, Col } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  fetchApiAllPriceObject2Selector,
  rowSelectSelector,
} from "../../../../redux/selector";
import { fetchApiUploadImage } from "../../../../redux/slices/readingIndexSlice/readingIndexSlice";
import {
  setRefreshTable,
  setRowSelect,
} from "../../../../redux/slices/currentPageSlice/currentPageSlice";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ReloadOutlined } from "@ant-design/icons";
import { fetchApiAllPriceObject2 } from "../../../../redux/slices/priceObjectSlice/priceObjectSlice";
import { updateChiSoMoi } from "../../../../redux/slices/tabListEnterIndexPageSlice/tabListEnterIndexPageSlice";
const ImageModal = ({ visible, onClose, imagePath, imageData, recordData }) => {
  const [form] = Form.useForm()
  const image = `https://api-awa-v2.amazingtech.vn${imagePath}`;
  const handleRotate = () => {
    // Góc xoay tăng thêm 90 độ mỗi lần nút được nhấn
    setRotationAngle((angle) => angle + 90);
  };
  const [rotationAngle, setRotationAngle] = useState(0);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const [fileList, setFileList] = useState([]);
  const ChiSoDongHoId = useSelector(rowSelectSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imagePath) {
      setFileList([
        {
          uid: "-1",
          name: "Hình ảnh",
          status: "done",
          url: imagePath,
          thumbUrl: imagePath,
        },
      ]);
    }
    form.setFieldsValue({
      chiSoCu: recordData ? recordData.chiSoCu : "",
      chiSoMoi: recordData ? recordData.chiSoMoi : "",
      doiTuongGiaId: recordData ? recordData.doiTuongGiaId : "",
    });
  }, [imagePath, recordData, form]);

  const handleCancel = () => {
    dispatch(setRowSelect(null));
    form.resetFields();
    setFileList([]);
    setRotationAngle(0); // Reset rotation angle
    onClose();
  };
  
  const handleOk = () => {
    const image = fileList[fileList.length - 1]; 
    console.log("image", image);
    const values = { ChiSoDongHoId, image: image.originFileObj }; 
    dispatch(fetchApiUploadImage(values))
      .unwrap()
      .then(() => {
        dispatch(setRefreshTable(true));
        onClose();
      });
  };

  const handleFinishForm = (values) => {
    values.userId = sessionStorage.getItem('userId')
    values.chiSoDongHoId = recordData.id
    dispatch(updateChiSoMoi(values))
    form.resetFields();
    handleCancel()
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(
      fileList.map((file) => {
        if (file.originFileObj instanceof Blob) {
          return {
            ...file,
            thumbUrl: URL.createObjectURL(file.originFileObj),
            lastModifiedDate: file.originFileObj.lastModifiedDate,
          };
        } else {
          return file;
        }
      })
    );
  };


  const columns = [
    {
      title: "Tên tệp tin",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 120,
    },
    {
      title: "Tiêu thụ",
      dataIndex: "tthu",
      key: "tthu",
      align: "center",
      render: () => {
        return <p>{recordData.tthu}</p>;
      },
    },
    {
      title: "Seri đồng hồ",
      dataIndex: "seriDongHo",
      key: "name",
      align: "center",
      render: () => {
        return <p>{recordData.seriDongHo}</p>;
      },
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "chiSoCu",
      key: "chiSoCu",
      align: "center",
      render: () => {
        return <p>{recordData.chiSoCu}</p>;
      },
    },
    {
      title: "Chỉ số mới",
      dataIndex: "chiSoMoi",
      key: "chiSoMoi",
      align: "center",
      render: () => {
        return <p>{recordData.chiSoMoi}</p>;
      },
    },
   
  ];


  const createFilterQueryStringPayment = () => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      // eslint-disable-next-line array-callback-return
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
    return `${factoryQueryString}`;
  };
  const objPrices = useSelector(fetchApiAllPriceObject2Selector);
  useEffect(() => {
    const queryString = createFilterQueryStringPayment();
    dispatch(fetchApiAllPriceObject2(queryString));
  }, [nhaMayId]);

  return (
    <>
      <Modal
        title="Thông tin tệp đính kèm"
        width={1300}
        centered={true}
        style={{
          top: 20,
          height: "800px",
        }}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div>
            <Button
              onClick={handleOk}
              className="custom-btn-update-d"
              style={{
                marginLeft: "10px",
              }}
            >
              Lưu
            </Button>
            <Upload
              onChange={handleUploadChange}
              fileList={fileList}
              beforeUpload={() => false}
              showUploadList={false}
            >
              <Button
                className="custom-btn-watch-report-d"
                style={{
                  marginLeft: "10px",
                }}
              >
                Tải tệp lên
              </Button>
            </Upload>
            <Button
              onClick={handleCancel}
              className="custom-btn-close-d"
              style={{
                marginLeft: "10px",
              }}
            >
              Đóng
            </Button>
          </div>,
        ]}
      >
        <div style={{ position: "relative", marginTop: "40px", top: -30 }}>
          {imagePath && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
                maxWidth: "700px",
                // maxHeight: "600px",
                margin: "auto",
                position: "relative",
              }}
            >
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={image}
                    alt=""
                    style={{
                      transform: `rotate(${rotationAngle}deg)`,
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
          )}
          <Button
            onClick={handleRotate}
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
            }}
            icon={<ReloadOutlined style={{ color: "gold" }} />}
          >
            Xoay ảnh
          </Button>
        </div>
        <Table
          dataSource={fileList}
          scroll={{ x: 1000, y: 290 }}
          columns={columns}
          style={{ maxHeight: "400px", overflowY: "auto" }}
        />
        <Col span={6}>
          <Form onFinish={handleFinishForm} form={form}>
            <Form.Item
              initialValue={recordData ? recordData.chiSoCu : ""}
              name="chiSoCu"
              label="Chỉ số cũ"
            >
              <Input placeholder="Nhập chỉ số cũ"></Input>
            </Form.Item>

            <Form.Item
              initialValue={recordData ? recordData.chiSoMoi : ""}
              name="chiSoMoi"
              label="Chỉ số mới"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const chiSoCu = getFieldValue("chiSoCu");
                    if (!chiSoCu || parseFloat(value) >= parseFloat(chiSoCu)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Chỉ số mới không thể nhỏ hơn chỉ số cũ."
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Nhập chỉ số mới"></Input>
            </Form.Item>

            <Form.Item
              initialValue={recordData ? recordData.doiTuongGiaId : ""}
              name="doiTuongGiaId"
              label="Đối tượng giá"
            >
              <Select
                options={
                  objPrices?.length <= 0
                    ? []
                    : objPrices?.map((_objPrice) => ({
                        label: `${_objPrice?.danhSachDoiTuongGia?.kyHieu} - ${_objPrice?.danhSachDoiTuongGia?.moTa}`,
                        value: _objPrice.id,
                      }))
                }
                placeholder="Chọn đối tượng giá"
              ></Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Lưu chỉ số</Button>
            </Form.Item>
          </Form>
        </Col>
      </Modal>
    </>
  );
};

export default ImageModal;
