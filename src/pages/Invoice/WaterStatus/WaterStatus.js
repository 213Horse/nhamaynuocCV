import { Button, Collapse, DatePicker, Form, Modal, Table } from "antd";
import {
  CloseCircleFilled,
  CloseOutlined,
  SaveFilled,
} from "@ant-design/icons";
import ChartJS from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./WaterStatus.css";
import { AdvancedSearchForm as FormSearchWaterStatus } from "../../../components/FormSearchWaterStatus/FormSearchWaterStatus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListContract } from "../../../redux/slices/invoiceSlice/invoiceSlice";
import {
  btnClickTabListEnterIndexPageSelector,
  dataContractList,
  getChartDataTheoDongHoSelector,
  getDataTheoDongHoSelector,
} from "../../../redux/selector";
import tabListEnterIndexPageSlice, {
  fetchChartDataFromDongHoNuoc,
  fetchDataTheoDongHoNuoc,
} from "../../../redux/slices/tabListEnterIndexPageSlice/tabListEnterIndexPageSlice";
import dayjs from "dayjs";

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    width: 50,
  },
  {
    title: "Tiêu thụ",
    dataIndex: "tthu",
    key: "tthu",
  },
  {
    title: "Chỉ số cũ",
    dataIndex: "chiSoCu",
    key: "chiSoCu",
  },
  {
    title: "Chỉ số mới",
    dataIndex: "chiSoMoi",
    key: "chiSoMoi",
  },
  {
    title: "Ngày đọc",
    dataIndex: "ngayDoc",
    key: "ngayDoc",
    render: (record) => {
      return dayjs(record?.ngayDoc).format("DD/MM/YYYY");
    },
  },
  {
    title: "Chỉ số đầu cũ",
    dataIndex: "chiSoDauCu",
    key: "chiSoDauCu",
  },
  {
    title: "Chỉ số cuối cũ",
    dataIndex: "chiSoCuoiCu",
    key: "chiSoCuoiCu",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghiChu",
    key: "ghiChu",
  },
  {
    title: "Trạng thái đọc",
    dataIndex: "tenTrangThaiGhi",
    key: "tenTrangThaiGhi",
  },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const WaterStatus = (props) => {
  const [namTH, setNamTH] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { isOpen, setIsOpen } = props;
  const tabList = useSelector(btnClickTabListEnterIndexPageSelector);
  const dataTheoDongHo = useSelector(getDataTheoDongHoSelector);
  const dataChartTheoDongHo = useSelector(getChartDataTheoDongHoSelector);
  const dataListContract = useSelector(dataContractList);
  const dataSource = dataTheoDongHo;
  const dispatch = useDispatch();
  const labels = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
  ];

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ sử dụng nước",
      },
    },
    barThickness: 10,
  };

  const items = [
    {
      key: "1",
      label: "Tìm kiếm",
      children: <FormSearchWaterStatus />,
    },
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataChartTheoDongHo,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  useEffect(() => {
    if (tabList) {
      setLoading(true);
      const dongHoNuocId = tabList?.dongHoNuocId;
      if (namTH === undefined || namTH === "Invalid Date") {
        const nam = dayjs().format("YYYY");
        dispatch(fetchDataTheoDongHoNuoc({ dongHoNuocId, nam }))
          .unwrap()
          .then(() => {
            setLoading(false);
          });
      } else {
        const nam = namTH;
        dispatch(fetchDataTheoDongHoNuoc({ dongHoNuocId, nam }))
          .unwrap()
          .then(() => {
            setLoading(false);
          });
      }
    }
  }, [tabList, namTH]);

  useEffect(() => {
    if (tabList) {
      const dongHoNuocId = tabList?.dongHoNuocId;

      if (namTH === undefined || namTH === "Invalid Date") {
        const nam = dayjs().format("YYYY");
        dispatch(fetchChartDataFromDongHoNuoc({ dongHoNuocId, nam }));
      } else {
        const nam = namTH;
        dispatch(fetchChartDataFromDongHoNuoc({ dongHoNuocId, nam }));
      }
    }
  }, [tabList, namTH]);
  return (
    <Modal
      title="Tình hình sử dụng nước"
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => {
        setIsOpen(false);
        setNamTH(undefined);
        dispatch(
          tabListEnterIndexPageSlice.actions.btnClickTabListEnterIndexPage(null)
        );
      }}
      width={1100}
      centered
      footer={[
        <Button
          className="custom-btn-close"
          onClick={() => {
            setIsOpen(false);
            setNamTH(undefined);
            dispatch(
              tabListEnterIndexPageSlice.actions.btnClickTabListEnterIndexPage(
                null
              )
            );
          }}
          icon={<CloseOutlined />}
        >
          Đóng
        </Button>,
      ]}
    >
      <Form>
        <Form.Item>
          <DatePicker
            picker="year"
            onChange={(year) => {
              console.log(dayjs(year).format("YYYY"));
              setNamTH(dayjs(year).format("YYYY"));
            }}
          ></DatePicker>
        </Form.Item>
      </Form>
      <Table
        loading={loading}
        dataSource={dataTheoDongHo?.map((item, index) => ({
          index: index + 1,
          thangTaoSoDoc: item?.thangTaoSoDoc,
          tthu: item?.tthu,
          chiSoCu: item?.chiSoCu,
          chiSoMoi: item?.chiSoMoi,
          ngayDoc: item?.ngayDoc,
          chiSoDauCu: item?.chiSoDauCu,
          chiSoCuoiCu: item?.chiSoCuoiCu,
          ghiChu: item?.ghiChu,
          trangThaiGhiId: item?.trangThaiGhiId,
          tenTrangThaiGhi: item?.tenTrangThaiGhi,
        }))}
        columns={columns}
        size="small"
        pagination={false}
        bordered
        style={{ marginTop: 10 }}
        scroll={{
          x: 2000,
          y: 240,
        }}
      />
      <Button
        style={{ marginTop: 5 }}
        type="primary"
        size="small"
        icon={<SaveFilled />}
      >
        Xuất tình hình sử dụng nước
      </Button>
      <div style={{ height: "270px", display: "grid", placeItems: "center" }}>
        <Bar options={options} data={data} updateMode="resize" />
      </div>
      <Button
        style={{ marginTop: 5 }}
        type="primary"
        size="small"
        icon={<SaveFilled />}
      >
        Lưu biểu đồ
      </Button>
    </Modal>
  );
};
