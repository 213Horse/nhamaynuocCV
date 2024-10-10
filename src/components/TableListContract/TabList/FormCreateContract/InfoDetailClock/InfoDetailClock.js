import {
  AutoComplete,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  btnClickGetFactoryIdSelector,
  btnClickRowClockWaterSelector,
  fetchApiAllRegionSelector,
  fetchApiGetAllClockWaterSelector,
  fetchApiGetAllDongHoTheoLoaiSelector,
  fetchApiGetAllKieuDongHoSelector,
  fetchApiGetAllLyDoHuySelector,
  fetchApiGetAllLyDoThaySelector,
  fetchApiGetAllManufacturerSelector,
  fetchApiGetAllProducingCountrySelector,
  fetchApiGetByKhuVucIdSelector,
  fetchApiGetByKhuVucIdV2Selector,
  fetchApiGetByVungIdSelector,
  fetchApiGetClockWhenOnChangeInputSeriSelector,
  fetchApiGetDongHoBlockFromTuyenDocSelector,
  getDataForMenuContractCreate,
  getHuyenData,
  getListTuyenDoc,
  getTinhData,
  getTinhHuyenXaData,
  getTuyenDocDataSelector,
  getTuyenDocSelector,
  getXaData,
} from "../../../../../redux/selector";
import {
  fetchApiAllRegion,
  fetchApiGetByKhuVucId,
  fetchApiGetByKhuVucIdV2,
} from "../../../../../redux/slices/regionSlice/regionSlice";

import {
  fetchApiHuyen,
  fetchApiTinh,
  fetchApiTinhHuyenXa,
  fetchApiXa,
  fetchTuyenDoc,
  fetchTuyenDocDataForOther,
} from "../../../../../redux/slices/contractSlice/contractSlice";

function InfoDetailClock({ formMain, isUpdate }) {
  const selectedDH = useSelector(btnClickRowClockWaterSelector);
  const [optionSeri, setOptionSeri] = useState([]);
  const [tinhId, setTinhId] = useState("");
  const [huyenId, setHuyenId] = useState("");
  const [vungId, setVungId] = useState("");
  const [khuVucId, setKhuVucId] = useState("");
  const [factoryIdArr, setFactoryIdArr] = useState([]);
  const [selectedTuyenDoc, setSelectedTuyenDoc] = useState(null);
  const [nguoiQuanLyId, setNguoiQuanLyId] = useState(null);
  const dispatch = useDispatch();

  // get from redux
  const factoryId = useSelector(btnClickGetFactoryIdSelector);

  // const listReading = useSelector(fetchApiAllReadingSelector);
  const readings = useSelector(fetchApiGetByKhuVucIdV2Selector);
  const clocks = useSelector(fetchApiGetAllClockWaterSelector);
  const clockBySeri = useSelector(
    fetchApiGetClockWhenOnChangeInputSeriSelector
  );

  const dongHoBlock = useSelector(fetchApiGetDongHoBlockFromTuyenDocSelector);
  const dataForMenu = useSelector(getDataForMenuContractCreate);

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

  const tuyenDocData = [];
  readings?.forEach((item) => {
    tuyenDocData?.push({
      id: item.id,
      tenTuyen: item.tenTuyen,
      nguoiQuanLyId: item.nguoiQuanLyId,
      tenNguoiQuanLy: item.tenNguoiQuanLy,
    });
  });

  const createFilterQueryString = () => {
    let factoryQueryString = "";
    if (factoryId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `NhaMayIds=${factory.nhaMayId}`;
        } else {
          factoryQueryString += `&NhaMayIds=${factory.nhaMayId}`;
        }
      });
    } else {
      factoryQueryString = `NhaMayIds=${factoryId}`;
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
    const nhaMayIds = createFilterQueryString2();
    dispatch(fetchTuyenDoc(nhaMayIds));
  }, [factoryId]);

  const tuyenDoc = useSelector(getTuyenDocSelector);
  console.log("tuyenDoc", tuyenDoc);

  const formItemLayout = {
    labelCol: {
      xs: { span: 22 },
      sm: { span: 5 },
      md: { span: 7 },
      lg: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 22 },
      sm: { span: 22 },
      md: { span: 22 },
      lg: { span: 22 },
    },
  };

  useEffect(() => {
    if (clockBySeri) {
      formMain.setFieldsValue({ soThuTu: clockBySeri?.soThuTu });
      formMain.setFieldsValue({ seriDongHo: clockBySeri?.seriDongHo });
      formMain.setFieldsValue({ seriChi: clockBySeri?.seriChi });
      formMain.setFieldsValue({ chiSoDau: selectedDH?.chiSoDau });
      formMain.setFieldsValue({ chiSoCuoi: clockBySeri?.chiSoCuoi });
      formMain.setFieldsValue({ lyDoHuy: clockBySeri?.lyDoHuy });
      formMain.setFieldsValue({ nuocSXId: clockBySeri?.nuocSXId });
      formMain.setFieldsValue({ hangSXId: clockBySeri?.hangSXId });
      formMain.setFieldsValue({ kieuDongHoId: clockBySeri?.kieuDongHoId });
      formMain.setFieldsValue({
        loaiDongHo:
          clockBySeri?.loaiDongHo === "TONG"
            ? 1
            : clockBySeri?.loaiDongHo === "BLOCK"
            ? 2
            : 3,
      });
      formMain.setFieldsValue({ toaDo: clockBySeri?.toaDo });
      formMain.setFieldsValue({ viDo: clockBySeri?.viDo });
      formMain.setFieldsValue({ kinhDo: clockBySeri?.kinhDo });
      formMain.setFieldsValue({ duongKinh: clockBySeri?.duongKinh });
      formMain.setFieldsValue({ hopBaoVe: clockBySeri?.hopBaoVe });
      formMain.setFieldsValue({ viTriLapDat: clockBySeri?.viTriLapDat });
      formMain.setFieldsValue({ vanMotChieu: clockBySeri?.vanMotChieu });
      formMain.setFieldsValue({ soTem: clockBySeri?.soTem });
      formMain.setFieldsValue({ soPhieuThay: clockBySeri?.soPhieuThay });
      formMain.setFieldsValue({ khuyenMai: clockBySeri?.khuyenMai });
      formMain.setFieldsValue({ ongDan: clockBySeri?.ongDan });
      formMain.setFieldsValue({ daiKhoiThuy: clockBySeri?.daiKhoiThuy });
    }
  }, [clockBySeri, formMain]);

  // set field đồng hồ block theo tuyến đọc (Khi chọn tuyến đọc)
  useEffect(() => {
    formMain.setFieldsValue({
      dongHoChaId: dongHoBlock ? dongHoBlock?.id : "",
    });
    formMain.setFieldsValue({
      nguoiQuanLyId: nguoiQuanLyId,
    });
  }, [dongHoBlock, formMain]);

  const createFilterQueryString1 = () => {
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
    const queryString = createFilterQueryString1();
    dispatch(fetchApiAllRegion(queryString));
  }, []);

  // handle change option (khu vực)
  // const handleChangeOptionArea = useCallback(
  //   (value) => {
  //     dispatch(fetchApiGetByKhuVucIdV2(value));

  //     setKhuVucId(value);
  //     console.log("Khu vuc", value);
  //     formMain.resetFields(["tuyenDocId"]);
  //   },
  //   [khuVucId]
  // );
  // useEffect(() => {
  //   dispatch(fetchApiGetByKhuVucIdV2(selectedDH?.khuVucID));
  // }, [selectedDH]);

  const [selectedOptions, setSelectedOptions] = useState({
    tinh: null,
    huyen: null,
    xa: null,
  });

  // handle change option (tỉnh)
  const handleChangeOptionCity = useCallback(
    (value, option) => {
      setSelectedOptions({
        tinh: option,
        huyen: null,
        xa: null,
      });
      setTinhId(value);
      formMain.resetFields(["donViHCHuyen", "donViHC"]);
      setHuyenId(null);
    },
    [formMain, tinhId]
  );

  // handle change option (huyện)
  const handleChangeOptionDistrict = useCallback(
    (value, option) => {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        huyen: option,
        xa: null,
      }));
      setHuyenId(value);
      formMain.resetFields(["donViHC"]);
    },
    [formMain, huyenId]
  );

  // handle change option (Xã)
  const handleChangeOptionXa = useCallback(
    (value, option) => {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        xa: option,
      }));
    },
    [formMain]
  );

  useEffect(() => {
    formMain.setFieldsValue({
      diachiOfDetailClock: `${
        selectedOptions.tinh ? selectedOptions.tinh : ""
      }${selectedOptions.huyen ? `-${selectedOptions.huyen}` : ""}${
        selectedOptions.xa ? `-${selectedOptions.xa}` : ""
      }`,
    });
  }, [selectedOptions, formMain]);

  // handle click input seri

  const [loading, setLoading] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const handleChangeTuyenDoc = (e) => {
    // dispatch(fetchApiGetDongHoBlockFromTuyenDoc(values));
    setLoading(true);
    // const selectedDoc = tuyenDocData.find((doc) => doc.id === values);
    // setNguoiQuanLyId(selectedDoc ? selectedDoc.nguoiQuanLyId : null);
    // setTenNguoiQuanLyId(selectedDoc ? selectedDoc.tenNguoiQuanLy : null);
    setSelectedTuyenDoc(e);

    dispatch(fetchTuyenDocDataForOther(e))
      .unwrap()
      .then(() => {
        formMain.resetFields(["vungId", "khuVucID", "nguoiQuanLyId"]);
        setIsClick(true);
      });
    // console.log("TuyenDocID: ", values);
    setLoading(false);
  };

  const dataTuyenDoc = useSelector(getTuyenDocDataSelector);

  useEffect(() => {
    if (isClick === true) {
      if (dataTuyenDoc && dataTuyenDoc.nhanVien) {
        formMain.setFieldsValue({
          nguoiQuanLyId: dataTuyenDoc.nhanVien.nhanVienId,
        });
      }
      setIsClick(false);
    }
  }, [isClick]);

  

  const [khuVuc, setKhuVuc] = useState();
  // handle change option (vùng)
  const handleChangeOptionRegion = useCallback(
    (value) => {
      // dispatch(fetchApiGetByVungId(value));
      // setVungId(value);
      // formMain.resetFields(["khuVucId", "tuyenDocId"]);
      // setKhuVucId(null);
      if (dataTuyenDoc && Array.isArray(dataTuyenDoc.vung)) {
        const foundIndex = dataTuyenDoc.vung.find(
          (item) => item.vungId === value
        );
        formMain.resetFields(["khuVucID"]);
        // formMain.setFieldsValue({
        //   nguoiQuanLyId: dataTuyenDoc.nhanVien?.nhanVienId,
        // });
        setKhuVuc(foundIndex);
      }
    },
    [dataTuyenDoc, vungId]
  );

  useEffect(() => {
    if (dataTuyenDoc && Array.isArray(dataTuyenDoc.vung)) {
      const foundIndex = dataTuyenDoc.vung.find(
        (item) => item.vungId === selectedDH?.vungID
      );
      setKhuVuc(foundIndex);
    }
  }, [selectedDH]);
  // handle autocomplete search
  const handleSearch = useCallback(
    (value) => {
      setOptionSeri(
        value && clocks?.length > 0
          ? clocks?.map((_clockWater) => {
              return {
                value: _clockWater.seriDongHo,
                label: _clockWater.seriDongHo,
                key: _clockWater.keyId,
              };
            })
          : []
      );
    },
    [clocks]
  );

  const tinhData = useSelector(getTinhData);
  const huyenData = useSelector(getHuyenData);
  const xaData = useSelector(getXaData);
  useEffect(() => {
    dispatch(fetchApiTinh());
  }, [dispatch]);

  useEffect(() => {
    if (tinhId) {
      dispatch(fetchApiHuyen(tinhId));
    }
  }, [tinhId]);

  useEffect(() => {
    if (huyenId) {
      dispatch(fetchApiXa(huyenId));
    }
  }, [huyenId]);

  return (
    <div className="container-detail-clock">
      <Row>
        {/* Đơn vị HC (Tỉnh) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="donViHCTinh"
            label="Đơn vị HC (tỉnh)"
            {...formItemLayout}
          >
            <Select
              size="small"
              fieldNames="donViHCTinh"
              options={
                tinhData?.filters?.length <= 0
                  ? []
                  : tinhData?.filters?.map((_city) => ({
                      label: _city.ten,
                      value: _city.id,
                    }))
              }
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0
              }
              showSearch
              placeholder="Đơn vị hành chính tỉnh"
              onChange={(value, option) => {
                handleChangeOptionCity(value, option.label);
              }}
              // onPopupScroll={handleOnPopupScrollTinh}
            />
          </Form.Item>
        </Col>

        {/* Đơn vị HC (Huyện) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="donViHCHuyen"
            label="Đơn vị HC (huyện)"
            {...formItemLayout}
          >
            <Select
              size="small"
              fieldNames="donViHCHuyen"
              options={
                huyenData?.filters?.length <= 0
                  ? []
                  : huyenData?.filters?.map((_district) => ({
                      label: _district.ten,
                      value: _district.id,
                    }))
              }
              placeholder="Đơn vị hành chính huyện"
              onChange={(value, option) => {
                handleChangeOptionDistrict(value, option.label);
              }}
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0
              }
              showSearch
              // onPopupScroll={handleOnPopupScrollHuyen}
              disabled={isUpdate ? false : !tinhId}
            />
          </Form.Item>
        </Col>

        {/* Đơn vị HC (xã) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item {...formItemLayout} name="donViHC" label="Đơn vị HC (xã)">
            <Select
              size="small"
              fieldNames="donViHC"
              placeholder="Đơn vị HC xã"
              options={
                xaData?.filters?.length <= 0
                  ? []
                  : xaData?.filters?.map((_ward) => ({
                      label: _ward.ten,
                      value: _ward.id,
                    }))
              }
              onChange={(value, option) => {
                handleChangeOptionXa(value, option.label);
              }}
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0
              }
              showSearch
              // onPopupScroll={handleOnPopupScrollXa}
              disabled={isUpdate ? false : !huyenId}
            />
          </Form.Item>
        </Col>

        {/* Vùng -> load from api */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="vungId"
            label="Vùng"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn vùng.",
            //   },
            // ]}
          >
            <Select
              size="small"
              fieldNames="vungId"
              options={dataForMenu?.vung?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn vùng"
              disabled={isUpdate ? false : !selectedTuyenDoc}
              loading={loading}
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0
              }
              showSearch
              onChange={(e) => handleChangeOptionRegion(e)}
            />
          </Form.Item>
        </Col>

        {/* Khu vực -> load from api (*No get) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="khuVucID"
            label="Khu vực"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn khu vực.",
            //   },
            // ]}
          >
            <Select
              size="small"
              fieldNames="khuVucID"
              options={
                khuVuc?.khuVuc?.length <= 0
                  ? []
                  : khuVuc?.khuVuc?.map((_area) => ({
                      label: _area?.tenKhuVuc,
                      value: _area?.khuVucId,
                    }))
              }
              // onChange={handleChangeOptionArea}
              disabled={isUpdate ? false : !selectedTuyenDoc}
              loading={loading}
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0
              }
              showSearch
              placeholder="Chọn khu vực"
            />
          </Form.Item>
        </Col>

        {/* Tuyến đọc id (load from api) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="tuyenDocId"
            label="Tuyến đọc"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Bạn cần phải chọn tuyến đọc.",
              },
            ]}
          >
            <Select
              size="small"
              fieldNames="tuyenDocId"
              options={
                tuyenDoc?.length > 0 &&
                tuyenDoc?.map((__reding) => ({
                  label: __reding.tenTuyen,
                  value: __reding.id,
                }))
              }
              onChange={(e) => handleChangeTuyenDoc(e)}
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0
              }
              showSearch
              loading={loading}
              // onPopupScroll={handleOnPopupScrollTuyenDoc}
              placeholder="Chọn tuyến đọc"
            />
          </Form.Item>
        </Col>

        {/* Người quản lý id -> load from api */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="nguoiQuanLyId"
            label="Nhân viên"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn nhân viên.",
            //   },
            // ]}
          >
            <Select
              size="small"
              fieldNames="nguoiQuanLyId"
              // options={
              //   users?.GetUsers?.nodes?.length <= 0
              //     ? []
              //     : users?.GetUsers?.nodes?.map((_nameManager) => ({
              //         label: _nameManager.userName,
              //         value: _nameManager.id,
              //       }))
              // }
              options={[
                {
                  value: dataTuyenDoc?.nhanVien?.nhanVienId,
                  label: dataTuyenDoc?.nhanVien?.nhanVienName,
                },
              ]}
              disabled
              loading={loading}
              placeholder="Chọn nhân viên"
            />
          </Form.Item>
        </Col>

        {/* Id */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="keyIdOfClockDetail"
            label="Mã đồng hồ"
            {...formItemLayout}
          >
            <Input
              size="small"
              value="hello"
              name="keyIdOfClockDetail"
              placeholder="Mã đồng hồ"
              disabled
            />
          </Form.Item>
        </Col>

        {/* Đồng hồ block */}
        {/* <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="dongHoChaId"
            label="ĐH nhánh"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Bạn cần phải chọn đồng hồ nhánh.",
              },
            ]}
          >
            <Select
              size="small"
              fieldNames="dongHoChaId"
              // options={[
              //   {
              //     value: dongHoBlock ? dongHoBlock?.id : null,
              //     label: dongHoBlock ? dongHoBlock?.keyId : null,
              //   },
              // ]}
              options={dsDongHoBlock?.map((_dhBlock) => ({
                value: _dhBlock.id,
                label: _dhBlock.keyId,
              }))}
              disabled
              placeholder="Chọn đồng hồ block"
            />
          </Form.Item>
        </Col> */}

        {/* Thứ tự + button (Thứ tự) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="soThuTu"
            label="Thứ tự: "
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải chọn số thứ tự.",
            //   },
            // ]}
          >
            <InputNumber
              size="small"
              name="soThuTu"
              defaultValue={0}
              placeholder="Nhập thứ tự"
              className="space-right-10"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Seri + Checkbox (Seri)  */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="seriDongHo"
            label="Seri"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng không bỏ trống!",
            //   },
            // ]}
          >
            {/*  <AutoComplete
              options={optionSeri}
              filterOption={true}
              onSearch={handleSearch}
              onSelect={handleSelect}
          >*/}
            <Input
              size="small"
              name="seriDongHo"
              placeholder="Nhập seri"
              className="space-right-10"
              // onClick={handleClickInputSeri}
            />
            {/*  </AutoComplete> >*/}
          </Form.Item>
        </Col>

        {/* Chỉ số bắt đầu */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="chiSoDau" label="CS đầu" {...formItemLayout}>
            <InputNumber
              size="small"
              name="chiSoDau"
              placeholder="Chỉ số đầu"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Chỉ số cuối */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="chiSoCuoi"
            label="CS cuối"
            {...formItemLayout}
            // rules={[
            //   {
            //     required: true,
            //     message: "Bạn cần phải nhập chỉ số cuối.",
            //   },
            // ]}
          >
            <InputNumber
              size="small"
              name="chiSoCuoi"
              placeholder="Chỉ số cuối"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Seri chì */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="seriChi" label="Seri chì" {...formItemLayout}>
            <Input size="small" name="seriChi" placeholder="Nhập seri chì" />
          </Form.Item>
        </Col>

        {/* Ngày lắp đặt (*No get) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="ngayLapDatOfDetailClock"
            label="Ngày LĐ"
            {...formItemLayout}
          >
            <DatePicker
              size="small"
              locale={locale}
              name="ngayLapDatOfDetailClock"
              placeholder="Nhập ngày lắp đặt"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Ngày sử dụng */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="ngaySuDung" label="Ngày sử dụng" {...formItemLayout}>
            <DatePicker
              size="small"
              locale={locale}
              name="ngaySuDung"
              placeholder="Chọn ngày sử dụng"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Địa chỉ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="diachiOfDetailClock"
            label="Địa chỉ"
            {...formItemLayout}
          >
            <Input
              disabled
              size="small"
              name="diachiOfDetailClock"
              placeholder="Nhập địa chỉ"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Trạng thái sử dụng */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="trangThaiSuDung"
            label="Trạng thái SD"
            {...formItemLayout}
          >
            <Select
              size="small"
              fieldNames="trangThaiSuDung"
              options={[
                {
                  value: 1,
                  label: "Đang sử dụng",
                },
                {
                  value: 2,
                  label: "Ngưng sử dụng",
                },
                {
                  value: 3,
                  label: "Hủy",
                },
              ]}
              placeholder="Chọn trạng thái"
            />
          </Form.Item>
        </Col>

        {/* Lý do hủy -> load from api */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="lyDoHuy" label="Lý do hủy" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="lyDoHuy"
              placeholder="Chọn lý do hủy"
              options={dataForMenu?.lyDoHuy?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              // onClick={handleGetAllLyDoHuy}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="nuocSXId" label="Nước sản xuất" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="nuocSXId"
              placeholder="Nhập nước sản xuất"
              className="space-right-10"
              options={dataForMenu?.nuocSanXuat?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              // onClick={handleGetAllNuocSX}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="ngayHuy" label="Ngày hủy" {...formItemLayout}>
            <DatePicker
              size="small"
              locale={locale}
              name="ngayHuy"
              placeholder="Chọn ngày hủy"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Hãng sản xuất */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="hangSXId" label="Hãng sản xuất" {...formItemLayout}>
            <Select
              size="small"
              name="hangSXId"
              placeholder="Nhập hãng sản xuất"
              className="space-right-10"
              options={dataForMenu?.hangSanXuat?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              // onClick={handleGetAllHangSX}
            />
          </Form.Item>
        </Col>

        {/* Kiểu đồng hồ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="kieuDongHoId" label="Kiểu ĐH" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="kieuDongHoId"
              options={dataForMenu?.kieuDongHo?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn kiểu đồng hồ"
            />
          </Form.Item>
        </Col>

        {/* Loại đồng hồ (id) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="loaiDongHo" label="Loại ĐH" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="loaiDongHo"
              options={[
                {
                  value: 1,
                  label: "ĐH tổng",
                },
                {
                  value: 2,
                  label: "ĐH block",
                },
                {
                  value: 3,
                  label: "Hộ dân",
                },
              ]}
              placeholder="Chọn loại đồng hồ"
            />
          </Form.Item>
        </Col>

        {/* Tọa độ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="toaDo" label="Tọa độ" {...formItemLayout}>
            <Input size="small" name="toaDo" placeholder="Nhập tọa độ" />
          </Form.Item>
        </Col>

        {/* Kinh độ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="kinhDo" label="Kinh độ" {...formItemLayout}>
            <Input
              size="small"
              name="kinhDo"
              placeholder="Nhập kinh độ"
              disabled
            />
          </Form.Item>
        </Col>

        {/* Vĩ độ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="viDo" label="Vĩ độ" {...formItemLayout}>
            <Input size="small" name="viDo" placeholder="Nhập vĩ độ" disabled />
          </Form.Item>
        </Col>

        {/* Đường kính */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="duongKinh" label="Đường kính" {...formItemLayout}>
            <InputNumber
              size="small"
              name="duongKinh"
              placeholder="Nhập đường kính"
              className="space-right-10"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Hộp bảo vệ */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="hopBaoVe" label="Hộp bảo vệ" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="hopBaoVe"
              options={dataForMenu?.hopBaoVe?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn hộp bảo vệ"
            />
          </Form.Item>
        </Col>

        {/* Vị trí lắp đặt */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="viTriLapDat" label="Vị trí LĐ" {...formItemLayout}>
            <Input
              size="small"
              name="viTriLapDat"
              placeholder="Nhập vị trí lắp đặt"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Ngày kiểm định */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="ngayKiemDinh" label="Ngày KĐ" {...formItemLayout}>
            <DatePicker
              size="small"
              locale={locale}
              name="ngayKiemDinh"
              placeholder="Chọn ngày có kiểm định"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Hiệu lực kiểm định */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="hieuLucKD" label="Hiệu lực KĐ" {...formItemLayout}>
            <DatePicker
              size="small"
              locale={locale}
              name="hieuLucKD"
              placeholder="Chọn hiệu lực kiểm định"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Lý do kiểm định */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="lyDoKiemDinh" label="Lý do KĐ" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="lyDoKiemDinh"
              options={dataForMenu?.lyDoKiemDinh?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn lý do kiểm định"
            />
          </Form.Item>
        </Col>

        {/* Van 1 chiều */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="vanMotChieu"
            label="Van 1 chiều"
            {...formItemLayout}
            valuePropName="checked"
          >
            <Checkbox size="small" name="vanMotChieu" />
          </Form.Item>
        </Col>

        {/* Số tem */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="soTem" label="Số tem" {...formItemLayout}>
            <Input
              size="small"
              name="soTem"
              placeholder="Nhập số tem"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Số phiếu thay */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="soPhieuThay"
            label="Số phiếu thay"
            {...formItemLayout}
          >
            <Input
              size="small"
              name="soPhieuThay"
              placeholder="Nhập số phiếu thay"
              className="space-right-10"
            />
          </Form.Item>
        </Col>

        {/* Hình thức xử lý (*No get) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="hinhThucXL" label="HT xử lý" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="hinhThucXL"
              placeholder="Nhập hình thức xử lý"
              className="space-right-10"
              options={dataForMenu?.hinhThucXuLy?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>

        {/* Lý do thay */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="lyDoThay" label="Lý do thay" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="lyDoThay"
              placeholder="Chọn lý do thay"
              options={dataForMenu?.lyDoThay?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              // onClick={handleGetAllLyDoThay}
            />
          </Form.Item>
        </Col>

        {/* Mã ĐH thay */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="maDHThay" label="Mã ĐH thay" {...formItemLayout}>
            <Input
              size="small"
              name="maDHThay"
              placeholder="Nhập mã đồng hồ thay"
            />
          </Form.Item>
        </Col>

        {/* Người thay */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="nguoiThayId" label="Người thay" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="nguoiThayId"
              options={dataForMenu?.nguoiThay?.map((item) => ({
                label: item.value,
                value: item.id,
              }))}
              placeholder="Chọn người thay"
            />
          </Form.Item>
        </Col>

        {/* Loại khuyến mãi */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="loaiKM" label="Loại KM" {...formItemLayout}>
            <Select
              size="small"
              fieldNames="loaiKM"
              options={[
                {
                  value: 1,
                  label: "Trừ tiêu thụ hàng tháng",
                },
                {
                  value: 2,
                  label: "Trừ tiêu thụ dần",
                },
                {
                  value: 4,
                  label: "Không khuyến mãi",
                },
              ]}
              placeholder="Chọn loại KM"
            />
          </Form.Item>
        </Col>

        {/* Trạng thái đồng hồ lắp */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="trangThaiDHLap"
            label="Trạng thái ĐH lắp"
            {...formItemLayout}
          >
            <Select
              size="small"
              fieldNames="trangThaiDHLap"
              options={[
                { value: "DongHoMoi", label: "Đồng hồ mới" },
                { value: "DongHoCu", label: "Đồng hồ cũ" },
              ]}
              placeholder="Chọn trạng thái"
            />
          </Form.Item>
        </Col>

        {/* Khuyến mãi + text (*No get) */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="khuyenMai"
            label="Khuyến mãi"
            {...formItemLayout}
            rules={[
              {
                pattern: /^\d+$/,
                message: "Vui lòng nhập số.",
              },
            ]}
          >
            <Input
              size="small"
              name="khuyenMai"
              placeholder="Chọn số"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Ống dẫn */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="ongDan" label="Ống dẫn" {...formItemLayout}>
            <Input size="small" name="ongDan" placeholder="Nhập ống dẫn" />
          </Form.Item>
        </Col>

        {/* Đai khởi thủy */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item name="daiKhoiThuy" label="Đai KT" {...formItemLayout}>
            <Input
              size="small"
              name="daiKhoiThuy"
              placeholder="Nhập đai khởi thủy"
            />
          </Form.Item>
        </Col>

        {/* Chip chỉ số đồng hồ Id */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="chipDongHoNuocId"
            label="Chip đồng hồ nước"
            {...formItemLayout}
          >
            <Input
              size="small"
              name="chipDongHoNuocId"
              placeholder="Nhập chip đồng hồ"
            />
          </Form.Item>
        </Col>

        {/* Chip chỉ số đồng hồ Id
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="chipChiSoDongHoId"
            label="Chip đồng hồ nước"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống!",
              },
            ]}
          >
            <Input name="chipChiSoDongHoId" placeholder="Nhập chip đồng hồ" />
          </Form.Item>
        </Col> */}

        {/* Hợp đồng id (update) */}
        {/* <Col xs={24} sm={24} md={11} lg={12}>
          <Form.Item name="hopDongId" label="HĐ id" {...formItemLayout} hidden>
            <Input name="hopDongId" placeholder="Nhập vị trí lắp đặt" />
          </Form.Item>
        </Col> */}

        {/* Loại đồng hồ (sau thì bỏ cái này) */}
        {/* <Col xs={24} sm={22} md={11} lg={10}>
          <Form.Item name="loaiDongHo" {...formItemLayout} hidden>
            <Input name="loaiDongHo" />
          </Form.Item>
        </Col> */}

        {/* Loại điểm */}
        <Col xs={24} sm={22} md={11} lg={12}>
          <Form.Item
            name="loaiDiemId"
            label="Loại điểm"
            {...formItemLayout}
            hidden
          >
            <Select
              size="small"
              fieldNames="loaiDiemId"
              options={[{ value: 3, label: "Đồng hồ hộ dân" }]}
              placeholder="Chọn loại điểm"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export default memo(InfoDetailClock);
