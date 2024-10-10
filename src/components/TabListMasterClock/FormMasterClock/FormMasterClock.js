import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";

import { getAllDMTotalByType } from "../../../redux/slices/DmTotalSlice/DmTotalSlice";
import {
  btnClickGetFactoryIdSelector,
  fetchApiAllRegionSelector,
  fetchApiGetAllInstallerSelector,
  fetchApiGetAllKieuDongHoSelector,
  fetchApiGetAllLyDoThaySelector,
  fetchApiGetAllManufacturerSelector,
  fetchApiGetAllProducingCountrySelector,
  fetchApiGetByKhuVucIdSelector,
  fetchApiGetByVungIdSelector,
  fetchApiGetDongHoBlockFromTuyenDocSelector,
  getDataForDropDownDongHoTong,
  getTuyenDocDataSelector,
  getTuyenDocSelector,
  setRowSelectedSelector,
} from "../../../redux/selector";
import {
  fetchApiGetDongHoBlockFromTuyenDoc,
  fetchDropdownListThemDongHoTong,
} from "../../../redux/slices/waterClockSlice/waterClockSlice";
import { fetchApiAllReading } from "../../../redux/slices/readingSlice/readingSlice";
import { GetUserQuery } from "../../../graphql/users/usersQuery";
import {
  fetchApiAllRegion,
  fetchApiGetByKhuVucId,
} from "../../../redux/slices/regionSlice/regionSlice";
import { fetchApiGetByVungId } from "../../../redux/slices/areaSlice/areaSlice";
import {
  fetchApiCreateMasterClock,
  fetchApiUpdateMasterClock,
} from "../../../redux/slices/masterClockSlice/masterClockSlice";
import { LOAD_TUYEN_DOC_BY_NHA_MAY_ID } from "../../../graphql/reading/queries";
import { fetchTuyendocAddselection } from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import {
  fetchTuyenDoc,
  fetchTuyenDocDataForOther,
} from "../../../redux/slices/contractSlice/contractSlice";

const pageSizeTuyenDoc = 10;

function FormMasterClock({ formMain, isUpdate, hideModal }) {
  const [factoryIdArr, setFactoryIdArr] = useState([]);
  const dispatch = useDispatch();
  const dataForMenu = useSelector(getDataForDropDownDongHoTong);
  const dongHoBlock = useSelector(fetchApiGetDongHoBlockFromTuyenDocSelector);
  const readings = useSelector(fetchApiGetByKhuVucIdSelector);
  const tuyenDoc = useSelector(getTuyenDocSelector);
  const areas = useSelector(fetchApiGetByVungIdSelector);
  const regions = useSelector(fetchApiAllRegionSelector);
  const tuyenDocData = useSelector(getTuyenDocDataSelector);
  const factoryId = useSelector(btnClickGetFactoryIdSelector);
  const rowSelected = useSelector(setRowSelectedSelector);
  const [vungId, setVungId] = useState("");
  const [khuVucId, setKhuVucId] = useState("");
  const [tuyenDocId, setTuyenDocId] = useState("");
  const [dongHoId, setDongHoId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    vung: null,
    khuvuc: null,
    tuyendoc: null,
    dongho: null,
  });
  //get array nhaMayId
  useEffect(() => {
    let factory = [];
    if (factoryId === "all") {
      factory = JSON.parse(sessionStorage.getItem("nhaMaysData")).map(
        (factory) => factory.nhaMayId
      );
    } else {
      factory = [factoryId];
    }
    console.log(factory);
    setFactoryIdArr(factory);
  }, [factoryId]);

  // get from graphql
  const { data: tuyenDocs, fetchMore: fetchMoreTuyenDoc } = useQuery(
    LOAD_TUYEN_DOC_BY_NHA_MAY_ID,
    {
      variables: {
        first: pageSizeTuyenDoc,
        nhaMayId: factoryIdArr ? factoryIdArr : null,
      },
    }
  );
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const layout = {
    labelCol: {
      span: 9,
    },
    // wrapperCol: {
    //   span: 30,
    // },
  };

  const handleSaveMasterClock = () => {
    formMain
      .validateFields()
      .then((values) => {
        console.log("values", values);
        if (values) {
          dispatch(
            fetchApiCreateMasterClock({
              values: values,
              nhaMayId: factoryId,
            })
          );

          hideModal();
          formMain.resetFields();
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  // handle update master clock
  const handleUpdateMasterClock = () => {
    formMain
      .validateFields()
      .then((values) => {
        console.log("values", values);
        if (values) {
          dispatch(
            fetchApiUpdateMasterClock({
              values: values,
              rowSelected: rowSelected,
            })
          );

          hideModal();
          formMain.resetFields();
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  // handle submit form failed
  const handleFailed = (error) => {
    console.log({ error });
  };

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayId=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  const createFilterQueryString2 = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayId=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&nhaMayId=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayId=${factoryId}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };

  useEffect(() => {
    dispatch(fetchApiGetByVungId(vungId));
  }, [vungId]);

  useEffect(() => {
    dispatch(fetchApiGetByKhuVucId(khuVucId));
  }, [khuVucId]);

  useEffect(() => {
    dispatch(fetchApiGetDongHoBlockFromTuyenDoc(tuyenDocId));
  }, [tuyenDocId]);

  useEffect(() => {
    const nhaMayId = createFilterQueryString();
    dispatch(fetchTuyenDoc(createFilterQueryString(nhaMayId)));
  }, [factoryId]);
  useEffect(() => {
    if (tuyenDocId) {
      formMain.setFieldsValue({
        nguoiQuanLyId: tuyenDocData?.nhanVien?.nhanVienId,
      });
      dispatch(fetchTuyenDocDataForOther(tuyenDocId));
    }
  }, [tuyenDocId]);

  const handleChangeOptionVung = useCallback(
    (value, option) => {
      setSelectedOptions({
        mavung: option,
        khuvuc: null,
        // tuyendoc: null,
        dongho: null,
      });
      setVungId(value);
      formMain.resetFields(["maVung", "khuVuc", "dongHoChaId"]);
      setKhuVucId(null);
      // setTuyenDocId(null);
      setDongHoId(null);
    },
    [formMain, vungId]
  );

  const handleChangeOptionArea = useCallback(
    (value, option) => {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        khuvuc: option,
        // tuyendoc: null,
        dongho: null,
      }));
      setKhuVucId(value);
      // setTuyenDocId(null);
      setDongHoId(null);
      formMain.resetFields(["dongHoChaId"]);
    },
    [formMain, khuVucId]
  );
  const handleChangeOptionTuyenDoc = useCallback(
    (value, option) => {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        tuyendoc: option,
        khuvuc:null,
        mavung:null,
        dongho: null,
      }));
      setTuyenDocId(value);
      setVungId(null)
      setKhuVucId(null)
      setDongHoId(null);
      formMain.resetFields(["dongHoChaId", "vungId", "khuVuc"]);
    },
    [formMain]
  );

  const handleChangeOptionDongHo = useCallback(
    (value, option) => {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        dongho: option,
      }));
      setDongHoId(value);
    },
    [formMain]
  );
  useEffect(() => {
    formMain.setFieldsValue({
      maVung: vungId,
      khuVuc: khuVucId,
      tuyenDocId: tuyenDocId,
      dongHoChaId: dongHoId,
    });
  }, [selectedOptions, formMain]);

  useEffect(() => {
    dispatch(fetchDropdownListThemDongHoTong(createFilterQueryString2()));
  }, [factoryId]);

  console.log("dongho", dongHoBlock);

  return (
    <Form {...layout} form={formMain} onFinishFailed={handleFailed}>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="keyId" label="Mã ĐH tổng">
            <Input
              style={{ width: "100%" }}
              name="keyId"
              placeholder="Nhập mã đồng hồ tổng"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="tenDongHo" label="Tên ĐH tổng">
            <Input
              style={{ width: "100%" }}
              name="tenDongHo"
              placeholder="Nhập tên đồng hồ tổng"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="lyDoThay" label="Lý do thay">
            <Select
              fieldNames="lyDoThay"
              placeholder="Chọn lý do thay"
              options={dataForMenu?.lyDoThay?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={{ span: 24, flex: "auto" }}>
          <Form.Item
            name="diaChi"
            label="Địa chỉ"
            labelCol={isTabletOrMobile ? { span: 9 } : { span: 3 }}
          >
            <Input
              style={{ width: "100%" }}
              name="diaChi"
              placeholder="Nhập địa chỉ"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="seriDongHo" label="Seri">
            <Input
              style={{ width: "100%" }}
              name="seriDongHo"
              placeholder="Nhập seri đồng hồ"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="sohieu" label="Số hiệu">
            <Input
              style={{ width: "100%" }}
              name="sohieu"
              placeholder="Nhập số hiệu"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="maVach" label="Mã vạch">
            <Input
              style={{ width: "100%" }}
              name="maVach"
              placeholder="Nhập mã vạch"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="ngayLapDat" label="Ngày lắp">
            <DatePicker
              format="DD/MM/YYYY"
              name="ngayLapDat"
              locale={locale}
              placeholder="Chọn ngày lắp đặt"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="nguoiLapDat" label="Người lắp">
            <Select
              fieldNames="nguoiLapDat"
              options={dataForMenu?.nguoiLapDat?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn người lắp đặt"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="vungId" label="Mã vùng">
            <Select
              fieldNames="vungId"
              options={tuyenDocData?.vung?.map((item) => ({
                label: item.tenVung,
                value: item.vungId,
              }))}
              placeholder="Chọn vùng"
              disabled={!tuyenDocId}
              onChange={(value, option) => {
                handleChangeOptionVung(value, option.label);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="khuVuc" label="Khu vực">
            <Select
              fieldNames="khuVuc"
              options={
                areas?.length <= 0
                  ? []
                  : areas?.map((_area) => ({
                      label: _area?.tenKhuVuc,
                      value: _area?.id,
                    }))
              }
              onChange={(value, option) => {
                handleChangeOptionArea(value, option.label);
              }}
              disabled={!vungId}
              placeholder="Chọn khu vực"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="nguoiQuanLyId" label="Nhân viên">
            <Select
              fieldNames="nguoiQuanLyId"
              options={[
                {
                  value: tuyenDocData?.nhanVien?.nhanVienId,
                  label: tuyenDocData?.nhanVien?.nhanVienName,
                },
              ]}
              placeholder="Chọn nhân viên"
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            name="tuyenDocId"
            label="Mã tuyến đọc"
            rules={[
              {
                required: true,
                message: "Bạn cần phải chọn tuyến đọc.",
              },
            ]}
          >
            <Select
              fieldNames="tuyenDocId"
              options={tuyenDoc?.map((item) => ({
                label: item.tenTuyen,
                value: item.id,
              }))}
              onChange={(value, option) => {
                handleChangeOptionTuyenDoc(value, option.label);
              }}
              // onPopupScroll={handleOnPopupScrollTuyenDoc}
              // disabled={!khuVucId}
              placeholder="Chọn tuyến đọc"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="dongHoChaId" label="Đồng hồ nhánh">
            <Select
              fieldNames="dongHoChaId"
              options={[
                {
                  value: dongHoBlock ? dongHoBlock?.id : null,
                  label: dongHoBlock ? dongHoBlock?.keyId : null,
                },
              ]}
              onChange={(value, option) => {
                handleChangeOptionDongHo(value, option.label);
              }}
              placeholder="Chọn đồng hồ nhánh"
              disabled={!tuyenDocId}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            name="chiSoDau"
            label="Chỉ số đầu"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập chỉ số đầu.",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              name="chiSoDau"
              placeholder="Nhập chỉ số đầu"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            name="chiSoCuoi"
            label="Chỉ số cuối"
            rules={[
              {
                required: true,
                message: "Bạn cần phải nhập chỉ số cuối.",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              name="chiSoCuoi"
              placeholder="Nhập chỉ số cuối"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            name="trangThaiSuDung"
            label="Trạng thái"
            rules={[
              {
                required: true,
                message: "Bạn cần phải chọn trạng thái.",
              },
            ]}
            initialValue={1}
          >
            <Select
              fieldNames="trangThaiSuDung"
              options={dataForMenu?.trangThai?.map((item) => ({
                label:
                  item.value === "DangSuDung"
                    ? "Đang Sử Dụng"
                    : item.value === "NgungSuDung"
                    ? "Ngưng Sử Dụng"
                    : "Hủy Sử Dụng",
                value: Number(item.id),
              }))}
              placeholder="Chọn trạng thái"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="ngaySuDung" label="Ngày BĐ">
            <DatePicker
              style={{ width: "100%" }}
              name="ngaySuDung"
              format="DD/MM/YYYY"
              placeholder="Chọn ngày bắt đầu sử dụng"
              locale={locale}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="ngayKetThuc" label="Ngày kết thúc">
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              locale={locale}
              name="ngayKetThuc"
              placeholder="Chọn ngày kết thúc"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="nuocSX" label="Nước SX">
            <Select
              fieldNames="nuocSX"
              placeholder="Nhập nước sản xuất"
              className="space-right-10"
              options={dataForMenu?.nuocSX?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="hangSX" label="Hãng SX">
            <Select
              name="hangSX"
              placeholder="Nhập hãng sản xuất"
              className="space-right-10"
              options={dataForMenu?.hangSX?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="kieuDongHo" label="Kiểu đồng hồ">
            <Select
              fieldNames="kieuDongHo"
              options={dataForMenu?.kieuDongHo?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn kiểu đồng hồ"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="duongKinh" label="Đường kính">
            <InputNumber
              style={{ width: "100%" }}
              name="duongKinh"
              placeholder="Nhập đường kính"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="hopBaoVe" label="Hộp bảo vệ">
            <Select
              fieldNames="hopBaoVe"
              options={[
                { value: 1, label: "Bê tong" },
                { value: 2, label: "Gang đôi" },
                { value: 3, label: "Gang đơn" },
                { value: 4, label: "Inox" },
                { value: 5, label: "Tôn" },
                { value: 6, label: "Khác" },
              ]}
              placeholder="Chọn hộp bảo vệ"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="viTriLapDat" label="Vị trí lắp đặt">
            <Input
              style={{ width: "100%" }}
              name="viTriLapDat"
              placeholder="Nhập vị trí lắp đặt"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="ngayKiemDinh" label="Ngày kiểm định">
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              name="ngayKiemDinh"
              locale={locale}
              placeholder="Chọn ngày kiểm định"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="hieuLucKD" label="Hiệu lực KĐ">
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              name="hieuLucKD"
              locale={locale}
              placeholder="Chọn ngày kiểm định"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="soPhieuThay" label="Số phiếu thay">
            <Input
              style={{ width: "100%" }}
              name="soPhieuThay"
              placeholder="Nhập số phiếu thay"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="hinhthucxl" label="Hình thức XL">
            <Select
              style={{ width: "100%" }}
              fieldNames="hinhthucxl"
              options={dataForMenu?.hinhThucXL?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="kinhDo" label="Kinh độ">
            <Input name="kinhDo" placeholder="Nhập kinh độ" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="viDo" label="Vĩ độ">
            <Input name="viDo" placeholder="Nhập vĩ độ" />
          </Form.Item>
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          key="SaveAndClose"
          onClick={isUpdate ? handleUpdateMasterClock : handleSaveMasterClock}
          icon={<SaveOutlined />}
          style={{
            marginLeft: "10px",
          }}
          className="custom-btn-watch-report-d"
          // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
        >
          {isUpdate ? "Cập nhật" : "Lưu và đóng"}
        </Button>
        <Button
          icon={<CloseOutlined />}
          // className={isTabletOrMobile ? "gutter-item-btn" : "gutter-item"}
          style={{
            marginLeft: "10px",
          }}
          className="custom-btn-close-d"
          onClick={() => hideModal()}
        >
          Đóng
        </Button>
      </Row>
    </Form>
  );
}

export default FormMasterClock;
