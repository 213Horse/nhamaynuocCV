import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import { ViewDetailListClock } from "../ViewDetail/ViewDetailListClock";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import {
  btnClickGetFactoryIdSelector,
  fetchApiGetListTuyenDocChuaTaoSoSelector,
  fetchApiGetNgayTrongSoDocTheoKySelector,
  getAllKySelector,
  setOptionThangNamSelector,
} from "../../../redux/selector";
import {
  fetchApiGetNgayTrongSoDocTheoKy,
  fetchApiTaoSoDocChiSoDongLoat,
} from "../../../redux/slices/readingIndexSlice/readingIndexSlice";
import { getAllKy } from "../../../redux/slices/DMKy/kySlice";
import { toast } from "react-toastify";
import { gql, useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";

export const CreateMultipleBook = (props) => {
  const [form1] = Form.useForm();

  const { isOpen, handleOk, handleCancel } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isOpenModalViewDetail, setIsOpenModalViewDetail] = useState(false);
  
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // const dataKGCS = useSelector(getKGCSToCreateBookSelector);
  // const dataListCreateBook = useSelector(getListToCreateBookSelector);
  // const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dsKyGhiChiSo = useSelector(getAllKySelector);
  const dsTuyenChuaTaoSoDoc = useSelector(
    fetchApiGetListTuyenDocChuaTaoSoSelector
  );
  const optionThangNam = useSelector(setOptionThangNamSelector);
  const dataOptionThangNam = useSelector(
    fetchApiGetNgayTrongSoDocTheoKySelector
  );

  // console.log("dsKyGhiChiSo", dsKyGhiChiSo);
  console.log("dsTuyenChuaTaoSoDoc", dsTuyenChuaTaoSoDoc);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set default fields (sau khi chọn Kỳ ghi chỉ số)
  useEffect(() => {
    form1.setFieldsValue({
      invoiceDate: dataOptionThangNam
        ? dayjs(dataOptionThangNam?.ngayHoaDon)
        : "",
    });
    form1.setFieldsValue({
      startDate: dataOptionThangNam ? dayjs(dataOptionThangNam?.ngayDauKy) : "",
    });
    form1.setFieldsValue({
      endDate: dataOptionThangNam ? dayjs(dataOptionThangNam?.ngayCuoiKy) : "",
    });
  }, [dataOptionThangNam, form1]);

  const hanldeShowDetail = () => {
    setIsOpenModalViewDetail(true);
  };

  // load kỳ ghi chỉ số
  const optionsKGCS = dsKyGhiChiSo?.map((item) => ({
    label: item.moTa,
    value: item.id,
  }));
  const canBoDoc = useQuery(gql`
    query {
      GetUsers(
        first: 100
          ) {
        nodes {
          id
          userName
          normalizedUserName
        }
      }
    }
  `);
  const kyGhi = useQuery(gql`
  query {
    GetKyGhiChiSos(first:100) {
       nodes {
          id,
          keyId,
          moTa,
       }
    }
 }
  `)
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: 100,
    },
    {
      title: "Nhân viên",
      dataIndex: "tenNguoiQuanLy",
      key: "tenNguoiQuanLy",
    },
    {
      title: "Mã tuyến đọc",
      dataIndex: "keyId",
      key: "keyId",
    },
    {
      title: "Tên tuyến đọc",
      dataIndex: "tenTuyen",
      key: "tenTuyen",
    },
    {
      title: "Kỳ ghi chỉ số",
      dataIndex: "tenKyGhiChiSo",
      key: "tenKyGhiChiSo",
    },
    // {
    //   title: "Đã tạo",
    //   dataIndex: "created",
    //   key: "created",
    // },
    {
      title: "",
      dataIndex: "eye",
      key: "eye",
      width: 40,
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("ds tuyen doc ->", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Form info search (Tạo sổ ghi chỉ số)
  const items = [
    {
      key: "1",
      label: "Tìm kiếm",
      children: <SearchForm optionsKGCS={optionsKGCS} />,
    },
  ];

  // Handle change (Kỳ ghi chỉ số -> tạo ra các ngày)
  const handleChangeKyGhiChiSo = (value) => {
    console.log("id ky ghi chi so ->", value);
    dispatch(
      fetchApiGetNgayTrongSoDocTheoKy({
        value: value,
        optionThangNam: optionThangNam,
      })
    );
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 24,
    },
  };

  // handle submit from (Tạo sổ đọc chỉ số đồng loạt)
  const handleCreateBookMutiple = () => {
    form1
      .validateFields()
      .then((values) => {
        console.log("values", values);
        if (values && selectedRowKeys?.length > 0) {
          dispatch(
            fetchApiTaoSoDocChiSoDongLoat({
              values: values,
              nhaMayId: nhaMayId,
              optionThangNam: optionThangNam,
              selectedRowKeys: selectedRowKeys, // list id -> của tuyến đọc chưa có sổ.
            })
          );

          handleCancel();
          setSelectedRowKeys([]);
          form1.resetFields();
        } else if (selectedRowKeys?.length === 0) {
          toast.error("Bạn cần phải chọn tuyến đọc!");
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const handleCreateBookMutipleAndContinue = () => {
    form1
      .validateFields()
      .then((values) => {
        console.log("values", values);
        if (values && selectedRowKeys?.length > 0) {
          dispatch(
            fetchApiTaoSoDocChiSoDongLoat({
              values: values,
              nhaMayId: nhaMayId,
              optionThangNam: optionThangNam,
              selectedRowKeys: selectedRowKeys, // list id -> của tuyến đọc chưa có sổ.
            })
          );
          setSelectedRowKeys([]);
          form1.resetFields();
        } else if (selectedRowKeys?.length === 0) {
          toast.error("Bạn cần phải chọn tuyến đọc!");
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
      onOk={() => handleOk("", "multiple")}
      onCancel={() => handleCancel("", "multiple")}
      width={1000}
      footer={null}
      centered
    >
      <Collapse
        items={items}
        key="collapse1"
        size="small"
        accordion={false}
        defaultActiveKey={["1"]}
      />
      <div
        style={{
          marginTop: 16,
        }}
      >
        <Table
          rowSelection={rowSelection}
          rowKey="id"
          dataSource={
            dsTuyenChuaTaoSoDoc?.length > 0
              ? dsTuyenChuaTaoSoDoc?.map((_tuyenDocChuaTaoSo, index) => ({
                  index: index + 1,
                  id: _tuyenDocChuaTaoSo.id,
                  tenNguoiQuanLy: _tuyenDocChuaTaoSo.tenNguoiQuanLy,
                  keyId: _tuyenDocChuaTaoSo.keyId,
                  tenTuyen: _tuyenDocChuaTaoSo.tenTuyen,
                  tenKyGhiChiSo: _tuyenDocChuaTaoSo.kyGhiChiSoId,
                }))
              : []
          }
          columns={columns}
          size="small"
          pagination={false}
          scroll={{
            x: 1000,
            y: 240,
          }}
          bordered
        />
        <Form {...layout} form={form1}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="kgcsId"
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
                  options={optionsKGCS}
                  onChange={handleChangeKyGhiChiSo}
                />
              </Form.Item>
              <Form.Item
                name="startDate"
                label="Ngày đầu kỳ"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  allowClear
                  placeholder="Chọn ngày"
                  style={{ width: "100%" }}
                  locale={locale}
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="invoiceDate"
                label="Ngày hóa đơn"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  allowClear
                  placeholder="Chọn ngày"
                  style={{ width: "100%" }}
                  locale={locale}
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="Ngày cuối kỳ"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  allowClear
                  placeholder="Chọn ngày"
                  style={{ width: "100%" }}
                  locale={locale}
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Row
        style={{
          display: "flex",
          justifyContent: "justify-between",
          marginBottom: 16,
          marginTop: 16,
          width: "100%",
        }}
      >

        <div style={{ marginLeft: "auto" }}>
        <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            style={{
              marginRight: 5,
              width: `${isMobile ? "100%" : ""}`,
              marginTop: `${isMobile ? "10px" : ""}`,
            }}
            className="create-modal tab-item-readingIndex-1"
            onClick={handleCreateBookMutipleAndContinue}
          >
            Tạo sổ và tạo tiếp
          </Button>
          <Button
            icon={<PlusCircleOutlined />}
            className="tab-item-readingIndex-2 "
            style={{ marginRight: 5 }}
            onClick={handleCreateBookMutiple}
          >
            Tạo sổ đồng loạt
          </Button>
          <Button
            onClick={() => handleCancel("", "multiple")}
            size="middle"
            className="custom-btn-close"
          >
            <CloseOutlined />
            Đóng
          </Button>
        </div>
      </Row>
      <ViewDetailListClock
        isOpen={isOpenModalViewDetail}
        handleOk={() => setIsOpenModalViewDetail(false)}
        setIsOpen={setIsOpenModalViewDetail}
      />
    </Modal>
  );
};
