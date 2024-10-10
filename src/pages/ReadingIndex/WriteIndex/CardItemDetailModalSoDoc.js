import { BorderOutlined, EyeOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CameraComponent from "./ConnectCamera";
import {
  fetchApiDsTrangThaiGhiSelector,
  fetchApiGetChiSoDongHoByIdSelector,
  setImageGhiChiSoSelector,
  btnClickGetFactoryIdSelector,
} from "../../../redux/selector";
import { fetchApiGhiChiSo } from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { toast } from "react-toastify";

function CardItemDetailModalSoDoc({
  item,
  isModalOpen,
  handleOk,
  handleCancel,
}) {
  //   const [typeClock, setTypeClock] = useState("loai 1");
  const [formUpdate] = Form.useForm();
  const [currentMonth, setCurrentMonth] = useState("");
  const [trangThaiGhiId, setTrangThaiGhiId] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // selector
  const chiSoDongHo = useSelector(fetchApiGetChiSoDongHoByIdSelector);
  const dsTrangThaiGhi = useSelector(fetchApiDsTrangThaiGhiSelector);
  const imageGhiChiSo = useSelector(setImageGhiChiSoSelector);

  console.log("chiSoDongHo", chiSoDongHo);

  // handle date
  useEffect(() => {
    const _newMonth = new Date().getMonth();

    // Tháng hiện tại
    const _currentMonth = parseInt(_newMonth) + 1;
    setCurrentMonth(_currentMonth);
  }, []);
  console.log("Current month:", currentMonth);
  // handle submit form (Ghi chỉ số)
  const handleSubmitFormGhiChiSo = (values) => {
    console.log("values", values);
    setLoading(true);
    if (imageGhiChiSo === null && !chiSoDongHo?.imageUrl) {
      toast.error("Bạn cần phải chọn ảnh!");
      return;
    }

    if (values) {
      dispatch(
        fetchApiGhiChiSo({
          values: values,
          ChiSoDongHoId: item.id, // ChiSoDongHoId
          imageGhiChiSo: imageGhiChiSo || null,
          urlImage: chiSoDongHo?.imageUrl || null,
          TrangThaiGhiId: trangThaiGhiId,
        })
      )
        .unwrap()
        .then(() => {
          setLoading(false);
        });
    }
  };

  const styleIndex = {
    fontSize: 20,
    padding: "1rem",
  };

  const styleTitle = {
    fontSize: 15,
    padding: "1rem",
    backgroundColor: "rgb(211, 211, 211)",
    fontWeight: "bold",
    color: "gray",
  };

  // handle change (trạng thái ghi)
  const handleChangeTrangThaiGhi = (value) => {
    value && setTrangThaiGhiId(value);
  };

  // Lần đầu tiên mở modal lên -> Ghi chỉ số
  useEffect(() => {
    chiSoDongHo &&
      setTrangThaiGhiId(chiSoDongHo?.responseTrangThaiGhiModel?.id);
  }, [chiSoDongHo]);

  // set default fields -> Ghi chỉ số
  useEffect(() => {
    formUpdate.setFieldsValue({
      TrangThaiGhiId: chiSoDongHo
        ? chiSoDongHo?.responseTrangThaiGhiModel?.id
        : trangThaiGhiId,
    });
    formUpdate.setFieldsValue({
      ChiSoMoi: chiSoDongHo ? chiSoDongHo?.chiSoMoi : "",
    });
    formUpdate.setFieldsValue({
      DienThoai: chiSoDongHo ? chiSoDongHo?.dienThoai : "",
    });
    formUpdate.setFieldsValue({
      seriDongHo: chiSoDongHo
        ? chiSoDongHo?.responseDongHoNuocModel?.seriDongHo
        : "",
    });
    formUpdate.setFieldsValue({
      loaiDongHo: chiSoDongHo
        ? chiSoDongHo?.responseDongHoNuocModel?.loaiDongHoId === "HoDan"
          ? "Hộ dân"
          : chiSoDongHo?.responseDongHoNuocModel?.loaiDongHoId === "Block"
          ? "Block"
          : chiSoDongHo?.responseDongHoNuocModel?.loaiDongHoId === "Tong"
          ? "Tổng"
          : ""
        : "",
    });
    formUpdate.setFieldsValue({
      maVach: chiSoDongHo ? chiSoDongHo?.responseHopDongModel?.maVach : "",
    });
    formUpdate.setFieldsValue({
      GhiChu: chiSoDongHo
        ? chiSoDongHo?.ghiChu === "null"
          ? ""
          : chiSoDongHo?.ghiChu
        : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chiSoDongHo, formUpdate]);

  return (
    <Modal
      //   title={item.title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered={true}
      footer={null}
      width={1600}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "84vh",
          }}
        >
          <Spin
            size="large"
            style={{ fontSize: "77px", marginRight: "17px" }}
          ></Spin>
          <h1 style={{ color: "blue", marginTop: "33px", fontSize: "37px" }}>
            Vui Lòng Đợi Trong Giây Lát...
          </h1>
        </div>
      ) : (
        <>
          <Form
            // id="write-index"
            form={formUpdate}
            onFinish={handleSubmitFormGhiChiSo}
            style={{
              height: "90vh",
              overflowY: "scroll",
              borderRadius: "1rem",
            }}
            // fields={[
            //   {
            //     name: "TrangThaiGhiId",
            //     value: chiSoDongHo
            //       ? chiSoDongHo?.responseTrangThaiGhiModel?.id
            //       : "",
            //   },
            //   {
            //     name: "ChiSoMoi",
            //     value:
            //       Object?.keys(chiSoDongHo).length > 0 ? chiSoDongHo?.chiSoMoi : "",
            //   },
            // ]}
          >
            <Row>
              <Form.Item name="TrangThaiGhiId">
                <Select
                  fieldNames="TrangThaiGhiId"
                  placeholder="Chọn trạng thái ghi"
                  style={{ width: "200px" }}
                  onChange={handleChangeTrangThaiGhi}
                  options={dsTrangThaiGhi?.map((_trangThaiGhi) => ({
                    label: (
                      <>
                        <BorderOutlined
                          style={{
                            color: `${_trangThaiGhi.maMau}`,
                            backgroundColor: `${_trangThaiGhi.maMau}`,
                            marginRight: "6px",
                          }}
                        />
                        {_trangThaiGhi.tenTrangThai}
                      </>
                    ),
                    value: _trangThaiGhi.id,
                  }))}
                />
              </Form.Item>
              <Col span={2}>
                <Tooltip title="Cập nhật chỉ số">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    style={{ marginLeft: "10px" }}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
                {/* Nhập chỉ số */}

                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
                <Row>
                  <h3>Hình ảnh</h3>
                </Row>
                <Row>
                  <Col span={24}>
                    <CameraComponent chiSoDongHo={chiSoDongHo} />
                  </Col>
                </Row>
                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 11, offset: 1 }}
              >
                {/* <Row>
                  <Col span={24} style={{ margin: "1rem 0" }}>
                    
                  </Col>
                </Row> */}
                <Row>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Row>
                      <Card style={{ width: "100%" }}>
                        <h2
                          style={{ textAlign: "center", lineHeight: ".5rem" }}
                        >
                          {chiSoDongHo?.responseHopDongModel?.doiTuongGia}
                        </h2>
                      </Card>
                    </Row>
                  </div>
                </Row>
                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
                <Row>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Row>
                      <Col span={24} style={{ margin: "1rem 0" }}>
                        <div
                          style={{
                            overflow: "hidden",
                            borderRadius: "5px",
                            border: ".5px gray solid",
                          }}
                        >
                          {/* Tiêu đề */}
                          {/* <Row>
                    <Col span={10}></Col>
                    <Col span={11}>
                      <strong style={{ marginLeft: "26px" }}>Chỉ số</strong>
                    </Col>
                    <Col>
                      <strong style={{ marginLeft: "16px" }}>Tiêu thụ</strong>
                    </Col>
                  </Row> */}
                          {/* Tháng trước trước đó */}
                          <Row style={{ border: ".5px gray solid" }}>
                            <Col span={10} style={styleTitle}>
                              Tháng{" "}
                              {parseInt(
                                chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                10
                              ) -
                                2 ===
                              0
                                ? 12
                                : parseInt(
                                    chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                    10
                                  ) -
                                    2 ===
                                  -1
                                ? 11
                                : parseInt(
                                    chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                    10
                                  ) - 2}
                            </Col>
                            <Col span={7} push={1} style={styleIndex}>
                              <i className="lbl-item">Chỉ số: </i>
                              <Tooltip
                                title={`Chỉ số mới tháng ${
                                  parseInt(
                                    chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                    10
                                  ) -
                                    2 ===
                                  0
                                    ? 12
                                    : parseInt(
                                        chiSoDongHo?.thangTaoSoDoc?.split(
                                          "/"
                                        )[0],
                                        10
                                      ) -
                                        2 ===
                                      -1
                                    ? 11
                                    : parseInt(
                                        chiSoDongHo?.thangTaoSoDoc?.split(
                                          "/"
                                        )[0],
                                        10
                                      ) - 2
                                }`}
                              >
                                <b className="chi-so-dh">
                                  {chiSoDongHo?.chiSoMoi2ThangTruoc}
                                </b>
                              </Tooltip>
                            </Col>
                            <Col
                              span={6}
                              style={{ ...styleIndex, textAlign: "right" }}
                            >
                              <i className="lbl-item">Tiêu thụ: </i>
                              <Tooltip
                                title={`Tiêu thụ tháng ${
                                  parseInt(
                                    chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                    10
                                  ) -
                                    2 ===
                                  0
                                    ? 12
                                    : parseInt(
                                        chiSoDongHo?.thangTaoSoDoc?.split(
                                          "/"
                                        )[0],
                                        10
                                      ) -
                                        2 ===
                                      -1
                                    ? 11
                                    : parseInt(
                                        chiSoDongHo?.thangTaoSoDoc?.split(
                                          "/"
                                        )[0],
                                        10
                                      ) - 2
                                }`}
                              >
                                <b className="tthu">
                                  {chiSoDongHo?.tthu2ThangTruoc}
                                </b>
                              </Tooltip>
                              <EyeOutlined
                                onClick={() => {
                                  Modal.info({
                                    width: 1800,
                                    title: "Hình ảnh 1 tháng trước",
                                    content: (
                                      <>
                                      {
                                        chiSoDongHo?.image1ThangTruoc ? (<img src={`${process.env.REACT_APP_IMAGE}${chiSoDongHo?.image1ThangTruoc}`} alt="" />) : (<h1>Chưa có hình ảnh</h1>)
                                      }
                                       
                                      </>
                                    ),
                                  });
                                }}
                                style={{ marginLeft: "10px" }}
                              ></EyeOutlined>
                            </Col>
                          </Row>
                          {/* Tháng trước đó */}
                          <Row style={{ border: ".5px gray solid" }}>
                            <Col span={10} style={styleTitle}>
                              Tháng{" "}
                              {parseInt(
                                chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                10
                              ) -
                                1 ===
                              0
                                ? 12
                                : parseInt(
                                    chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                    10
                                  ) -
                                    1 ===
                                  -1
                                ? 11
                                : parseInt(
                                    chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                    10
                                  ) - 1}
                            </Col>
                            <Col span={7} push={1} style={styleIndex}>
                              <i className="lbl-item">Chỉ số: </i>
                              <Tooltip
                                title={`Chỉ số mới tháng ${
                                  parseInt(
                                    chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                    10
                                  ) -
                                    1 ===
                                  0
                                    ? 12
                                    : parseInt(
                                        chiSoDongHo?.thangTaoSoDoc?.split(
                                          "/"
                                        )[0],
                                        10
                                      ) -
                                        1 ===
                                      -1
                                    ? 11
                                    : parseInt(
                                        chiSoDongHo?.thangTaoSoDoc?.split(
                                          "/"
                                        )[0],
                                        10
                                      ) - 1
                                }`}
                              >
                                <b className="chi-so-dh">
                                  {chiSoDongHo?.chiSoMoiThangTruoc}
                                </b>
                              </Tooltip>
                            </Col>
                            <Col
                              span={6}
                              style={{ ...styleIndex, textAlign: "right" }}
                            >
                              <i className="lbl-item">Tiêu thụ: </i>
                              <Tooltip
                                title={`Tiêu thụ tháng ${
                                  parseInt(
                                    chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                    10
                                  ) -
                                    1 ===
                                  0
                                    ? 12
                                    : parseInt(
                                        chiSoDongHo?.thangTaoSoDoc?.split(
                                          "/"
                                        )[0],
                                        10
                                      ) -
                                        1 ===
                                      -1
                                    ? 11
                                    : parseInt(
                                        chiSoDongHo?.thangTaoSoDoc?.split(
                                          "/"
                                        )[0],
                                        10
                                      ) - 1
                                }`}
                              >
                                <b className="tthu">
                                  {chiSoDongHo?.tthuThangTruoc}
                                </b>
                              </Tooltip>
                              <EyeOutlined
                                onClick={() => {
                                  Modal.info({
                                    width: 1800,
                                    title: "Hình ảnh 2 tháng trước",
                                    content: (
                                      <>
                                      {
                                        chiSoDongHo?.image1ThangTruoc ? (<img src={`${process.env.REACT_APP_IMAGE}${chiSoDongHo?.image2ThangTruoc}`} alt="" />) : (<h1>Chưa có hình ảnh</h1>)
                                      }
                                       
                                      </>
                                    ),
                                  });
                                }}
                                style={{ marginLeft: "10px" }}
                              ></EyeOutlined>
                            </Col>
                          </Row>
                          {/* Tháng hiện tại */}
                          <Row style={{ border: ".5px gray solid" }}>
                            <Col span={10} style={styleTitle}>
                              <Tooltip
                                title={`Chỉ số cũ: ${chiSoDongHo?.chiSoCu} - Chỉ số mới: ${chiSoDongHo?.chiSoMoi}`}
                              >
                                Tháng{" "}
                                {parseInt(
                                  chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                  10
                                )}
                              </Tooltip>
                            </Col>
                            <Col span={7} push={1} style={styleIndex}>
                              <i className="lbl-item">Chỉ số: </i>
                              <Tooltip
                                title={`Chỉ số mới tháng ${parseInt(
                                  chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                  10
                                )}`}
                              >
                                <b className="chi-so-dh">
                                  {chiSoDongHo ? chiSoDongHo?.chiSoMoi : "..."}
                                </b>
                              </Tooltip>
                            </Col>
                            <Col
                              span={6}
                              style={{ ...styleIndex, textAlign: "right" }}
                            >
                              <i className="lbl-item">Tiêu thụ: </i>
                              <Tooltip
                                title={`Tiêu thụ tháng ${parseInt(
                                  chiSoDongHo?.thangTaoSoDoc?.split("/")[0],
                                  10
                                )}`}
                              >
                                <b className="tthu">
                                  {chiSoDongHo && chiSoDongHo?.chiSoMoi > 0
                                    ? chiSoDongHo?.tthu
                                    : "..."}
                                </b>
                              </Tooltip>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24} style={{ margin: "1rem 0" }}>
                        <Form.Item
                          name="ChiSoMoi"
                          rules={[
                            {
                              required: true,
                              message: "Bạn cần phải nhập chỉ số mới.",
                            },
                          ]}
                        >
                          <InputNumber
                            name="ChiSoMoi"
                            placeholder="Nhập chỉ số mới"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Row>
                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
                <Row>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Row>
                      <h3>Mục đích sử dụng</h3>
                      <br />
                      <br />
                      <Input
                        defaultValue={
                          chiSoDongHo?.responseHopDongModel?.mucDichSuDung
                        }
                        disabled
                      />
                    </Row>
                  </div>
                </Row>
                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
                <Row>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>Số hiệu đồng hồ</h3>
                    <Form.Item name="seriDongHo">
                      <Input name="seriDongHo" disabled />
                    </Form.Item>
                  </div>
                </Row>
                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
                <Row>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>Số điện thoại</h3>

                    <Form.Item name="DienThoai">
                      <Input
                        name="DienThoai"
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Item>
                  </div>
                </Row>
                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
                <Row>
                  <Col span={24}>
                    <h3>Loại đồng hồ</h3>
                    <Row>
                      <Form.Item name="loaiDongHo">
                        <Input name="loaiDongHo" disabled />
                      </Form.Item>
                      <Col
                        span={9}
                        style={{
                          textAlign: "right",
                        }}
                      >
                        {/* <Select
                      defaultValue={typeClock}
                      onChange={(e) => setTypeClock(e)}
                    >
                      <Option value="loai 1">loai 1</Option>
                      <Option value="loai 2">loai 2</Option>
                      <Option value="loai 3">loai 3</Option>
                      <Option value="loai 4">loai 4</Option>
                    </Select> */}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
                <Row>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>Mã vạch</h3>
                    <Form.Item name="maVach">
                      <Input name="maVach" disabled />
                    </Form.Item>
                  </div>
                </Row>
                <hr
                  style={{
                    borderBottom: ".1px cornflowerblue solid",
                    margin: "2rem 0",
                  }}
                />
                <Row style={{ display: "flex", flexDirection: "column" }}>
                  <h3>Ghi chú</h3>
                  <Form.Item name="GhiChu">
                    <Input name="GhiChu" placeholder="Nhập ghi chú" />
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Modal>
  );
}

export default CardItemDetailModalSoDoc;
