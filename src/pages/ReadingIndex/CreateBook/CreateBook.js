import {
  FilePdfOutlined,
  PlusCircleOutlined,
  CloseOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { SearchForm } from "./SearchForm";
import {
  btnClickGetFactoryIdSelector,
  currentPageSelector,
  fetchApiFilterSoDocBinhThuongSelector,
  fetchApiGetNgayTrongSoDocTheoKySelector,
  filterDataSelector,
  filterSelector,
  getAllKySelector,
  getCanBoDoc,
  setOptionThangNamSelector,
} from "../../../redux/selector";
import {
  fetchApiFilterSoDocBinhThuong,
  fetchApiGetNgayTrongSoDocTheoKy,
  fetchApiTaoSoDocBinhThuong,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { getAllKy } from "../../../redux/slices/DMKy/kySlice";
import { toast } from "react-toastify";
import { getKeyIdTuyenDoc } from "../../../redux/selector";
import { fetchCanBoDoc } from "../../../redux/slices/DMTuyenDoc/tuyenDocSlice";
import { setCurrentPage } from "../../../redux/slices/currentPageSlice/currentPageSlice";

export const CreateBook = (props) => {
  const { isOpen, canBoDocs, handleCancel } = props;
  const [formMain] = Form.useForm();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const canBoDocSelector = useSelector(getCanBoDoc);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [formatTenSo, setFormatTenSo] = useState("");
  // const [tuyenDocId, setTuyenDocId] = useState({});

  const dispatch = useDispatch();

  // get from redux
  const dsKyGhiChiSo = useSelector(getAllKySelector);
  const dsSoDocBinhThuong = useSelector(fetchApiFilterSoDocBinhThuongSelector);
  const optionThangNam = useSelector(setOptionThangNamSelector);
  const dataOptionThangNam = useSelector(
    fetchApiGetNgayTrongSoDocTheoKySelector
  );
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const maTuyenDoc = useSelector(getKeyIdTuyenDoc);

  console.log("ma tuyen doc ->", maTuyenDoc);

  console.log("dsSoDocBinhThuong", dsSoDocBinhThuong);
  // console.log("tuyenDocId", tuyenDocId);
  // console.log("optionThangNam", optionThangNam);
  console.log("ds hop dong ->", selectedRowKeys);
  // console.log("dataOptionThangNam", dataOptionThangNam);

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
    const queryString = createFilterQueryString();
    dispatch(getAllKy(queryString));
    dispatch(fetchCanBoDoc(queryString));
  }, [nhaMayId]);

  useEffect(() => {
    formMain.setFieldsValue({
      ngayHoaDon: dataOptionThangNam
        ? dayjs(dataOptionThangNam?.ngayHoaDon)
        : "",
    });
    formMain.setFieldsValue({
      ngayDauKy: dataOptionThangNam ? dayjs(dataOptionThangNam?.ngayDauKy) : "",
    });
    formMain.setFieldsValue({
      ngayCuoiKy: dataOptionThangNam
        ? dayjs(dataOptionThangNam?.ngayCuoiKy)
        : "",
    });
  }, [dataOptionThangNam, formMain]);

  // set default field Tên sổ
  useEffect(() => {
    formMain.setFieldsValue({ tenSo: formatTenSo ? formatTenSo : "" });
  }, [formMain, formatTenSo, optionThangNam]);

  const optionsKGCS = dsKyGhiChiSo?.map((item) => ({
    label: item.moTa,
    value: item.id,
  }));

  const columns = [
    {
      title: "Số HĐ",
      dataIndex: "keyIdHopDong",
      key: "keyIdHopDong",
    },
    {
      title: "Mã ĐH",
      dataIndex: "keyIdDongHo",
      key: "keyIdDongHo",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      key: "tenKhachHang",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Chỉ số cũ",
      dataIndex: "chiSoCu",
      key: "chiSoCu",
    },
  ];

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys); // list hợp đồng id.
    // setTuyenDocId(selectedRows[0]?.tuyenDocId); // tuyến đọc id.
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Handle change (Kỳ ghi chỉ số -> tạo ra các ngày)
  const handleChangeKyGhiChiSo = (value) => {
    dispatch(
      fetchApiGetNgayTrongSoDocTheoKy({
        value: value,
        optionThangNam: optionThangNam,
      })
    );
  };

  // handle change (Cán bộ đọc)
  const handleChangeCanBodoc = (value, { label }) => {
    setFormatTenSo(
      `Tháng ${dayjs(optionThangNam).format("MM/YYYY")} ${
        maTuyenDoc?.keyId
      } ${label}`
    );
  };

  // handle submit form (Tạo sổ và đóng)
  const handleTaoSoVaDong = () => {
    formMain
      .validateFields()
      .then((values) => {
        console.log("values", values);
        if (values && selectedRowKeys?.length > 0) {
          dispatch(
            fetchApiTaoSoDocBinhThuong({
              values: values,
              selectedRowKeys: selectedRowKeys, // list id hợp đồng.
              tuyenDocId: maTuyenDoc.id , // id tuyến đọc.
              optionThangNam: optionThangNam,
              nhaMayId: nhaMayId,
            })
          );

          handleCancel();
          setSelectedRowKeys([]);
          // setTuyenDocId({});
          formMain.resetFields();
        } else {
          toast.error("Bạn cần phải chọn hợp đồng!");
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  
  // handle submit form (Tạo sổ và tạo tiếp)
  const handleTaoSoVaTaoTiep = () => {
    formMain
      .validateFields()
      .then((values) => {
        console.log("values", values);
        if (values && selectedRowKeys?.length > 0) {
          dispatch(
            fetchApiTaoSoDocBinhThuong({
              values: values,
              selectedRowKeys: selectedRowKeys, // list id hợp đồng.
              tuyenDocId: maTuyenDoc.id , // id tuyến đọc.
              optionThangNam: optionThangNam,
              nhaMayId: nhaMayId,
            })
          );
          setSelectedRowKeys([]);
          // setTuyenDocId({});
          formMain.resetFields();
        } else {
          toast.error("Bạn cần phải chọn hợp đồng!");
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <Modal
      title="Tạo sổ ghi chỉ số"
      open={isOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={1700}
      footer={null}
      centered
    >
      <Collapse
        items={[
          {
            key: "1",
            label: "Tìm kiếm",
            children: (
              <SearchForm optionsKGCS={optionsKGCS} canBoDocs={canBoDocs} />
            ),
          },
        ]}
        defaultActiveKey="1"
        size="small"
      />
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        dataSource={
          dsSoDocBinhThuong?.length > 0
            ? dsSoDocBinhThuong?.map((_hopDong, index) => ({
                id: _hopDong.id,
                keyIdHopDong: _hopDong.keyId,
                keyIdDongHo: _hopDong.dongHoNuocList[0]?.keyId,
                tenKhachHang: _hopDong.khachHangId,
                diaChi: _hopDong.diachi,
                tuyenDocId: _hopDong?.dongHoNuocList[0]?.tuyenDocId,
                chiSoCu: _hopDong.chiSoCu,

              }))
            : []
        }
        columns={columns}
        size="small"
        scroll={{
          x: 1200,
          y: 240,
        }}
        style={{ marginTop: "10px" }}
        bordered
        pagination={false} // hide pagination
      />
      <Form {...layout} form={formMain}>
        <Row gutter={24}>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="nguoiQuanLyId"
              label="Cán bộ đọc"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {/*<Select
                style={{
                  width: "100%",
                }}
                fieldNames="nguoiQuanLyId"
                placeholder="Chọn nhân viên"
                options={
                  canBoDocs?.GetUsers?.nodes?.length <= 0
                    ? []
                    : canBoDocs?.GetUsers?.nodes?.map((_nameManager) => ({
                        label: _nameManager.normalizedUserName,
                        value: _nameManager.id,
                      }))
                }
                onChange={handleChangeCanBodoc}
              />*/}
              <Select
                style={{
                  width: "100%",
                }}
                fieldNames="nguoiQuanLyId"
                placeholder="Chọn nhân viên"
                options={
                  canBoDocSelector?.length <= 0
                    ? []
                    : canBoDocSelector?.map((_nameManager) => ({
                        label: _nameManager.normalizedUserName,
                        value: _nameManager.id,
                      }))
                }
                onChange={handleChangeCanBodoc}
              />
            </Form.Item>
          </Col>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="kyGhiChiSoId"
              label="Kỳ ghi chỉ số"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                style={{
                  width: "100%",
                }}
                placeholder="Chọn kỳ ghi chỉ số"
                fieldNames="kyGhiChiSoId"
                options={optionsKGCS}
                onChange={handleChangeKyGhiChiSo}
              />
            </Form.Item>
          </Col>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="ngayDauKy"
              label="Ngày đầu kỳ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                allowClear
                name="ngayDauKy"
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                locale={locale}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="tenSo"
              label="Tên sổ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Nhập tên"
                name="tenSo"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="ngayHoaDon"
              label="Ngày hóa đơn"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                allowClear
                name="ngayHoaDon"
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                locale={locale}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
          <Col
            lg={8}
            style={{
              width: "100%",
            }}
          >
            <Form.Item
              name="ngayCuoiKy"
              label="Ngày cuối kỳ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                allowClear
                name="ngayCuoiKy"
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
                locale={locale}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 16,
          width: "100%",
        }}
      >
        {/* <Col sm={24} md={24} lg={12}>
          <Checkbox style={{ marginRight: "13px" }}>Tạo biểu mẫu</Checkbox>
          <Checkbox style={{ marginRight: "13px" }}>Không SD kỳ</Checkbox>
          <Checkbox style={{ marginRight: "13px" }}>Ghi chỉ số online</Checkbox>
        </Col> */}
        <Col
          style={{
            // marginTop: `${isMobile ? "10px" : ""}`,
            textAlign: "end",
          }}
          sm={24}
          md={24}
          lg={12}
        >
          {/* <Button
            onClick={props.handleCancel}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            icon={<FilePdfOutlined />}
            className="custom-btn-export"
          >
            Xuất bảng kê
          </Button> */}
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            className="create-modal tab-item-readingIndex-1"
            onClick={handleTaoSoVaTaoTiep}
          >
            Tạo sổ và tạo tiếp
          </Button>
         
          <Button
            type="primary"
            key="TaoSoVaDong"
            onClick={handleTaoSoVaDong}
            icon={<PlusCircleOutlined />}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isTabletOrMobile ? "10px" : ""}`,
            }}
            className="create-modal tab-item-readingIndex-1"
          >
            Tạo sổ và đóng
          </Button>
          <Button
            className="custom-btn-close"
            onClick={props.handleCancel}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
          >
            <CloseOutlined />
            Đóng
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
