import ReactApexChart from "react-apexcharts";
import { Button, Form, Select, Typography } from "antd";
import { MinusOutlined, PlusCircleOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickDashboardData,
  btnClickDashboardDataTieuThu,
  btnClickGetFactoryIdSelector,
  fetchApiGetListTuyenDocChuaTaoSoSelector,
  getListTuyenDoc,
  getListTuyenDocByNhaMay,
  gettuyendocAddselection,
  getTuyenDocByNhaMaySelector,
  getTuyenDocGetAllSelector,
  gettuyendocselection,
} from "../../../../redux/selector";
import {
  fetchListTuyenDocByNhaMay,
  getDashBoardDataTieuThu,
} from "../../../../redux/slices/dashBoardSlice/dashBoardSlice";
import { useEffect, useState } from "react";

function LineChart({ fromDate, toDate }) {
  const { Title, Paragraph } = Typography;
  const [form] = Form.useForm()
  const [valueTuyenDoc, setValueTuyenDoc] = useState([1]);
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  
  const handleChange = (value) => {
    console.log("Selected value: ", value);
    setValueTuyenDoc(value);
  };
  const dashBoardDataTieuThu = useSelector(btnClickDashboardDataTieuThu);
  const getTuyenDocAll = useSelector(gettuyendocselection);
  const tuyenDocByNhaMay = useSelector(getListTuyenDoc);
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const gettuyendocoption = useSelector(gettuyendocAddselection);

  console.log("Data theo tuyen", dashBoardDataTieuThu);
  const seriesData =
    dashBoardDataTieuThu?.data?.list?.map((tuyen) => ({
      name: tuyen?.tenTuyen || "",
      data:
        tuyen?.list?.map((item) => ({ x: item.month, y: item.tongTieuThu })) ||
        [],
      offsetY: 0,
    })) || [];
  console.log("Dashboard series: ", tuyenDocByNhaMay);
  const dispatch = useDispatch();
  const eChart2 = {
    series: seriesData,

    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: true,
        },
      },
      colors: ["#008FFB", "#00E396", "#CED4DC"],

      legend: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  const createFilterQueryString = () => {
    let tuyenDocQueryString = "";

    if (valueTuyenDoc?.length > 1) {
      valueTuyenDoc?.map((tuyenDoc) => {
        tuyenDocQueryString += `&tuyenDocIds=${tuyenDoc}&FromMonth=${fromDate}&ToMonth=${toDate}`;
      });
    } else if (valueTuyenDoc) {
      tuyenDocQueryString = `tuyenDocIds=${valueTuyenDoc}&FromMonth=${fromDate}&ToMonth=${toDate}`;
    }

    console.log(`${tuyenDocQueryString}`);
    return `${tuyenDocQueryString}`;
  };
  const handleLineChart = () => {
    console.log("QueryString", createFilterQueryString());
    dispatch(getDashBoardDataTieuThu(createFilterQueryString()));
  };

  useEffect(() => {
    setValueTuyenDoc([1]);
    form.resetFields()
  }, [nhaMayId]);
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Tiêu thụ theo tuyến</Title>
          <Form form={form}>
          <Form.Item name="tuyenDoc">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Chọn tuyến"
              onChange={handleChange}
              options={
                gettuyendocoption?.length > 0
                  ? gettuyendocoption?.map((danhMucTuyenDocResponses) => ({
                      label: danhMucTuyenDocResponses?.tenTuyen,
                      value: danhMucTuyenDocResponses?.id,
                    }))
                  : []
              }
            />
            </Form.Item>
          </Form>
        </div>
        <div className="button-add-1">
          <Button
            onClick={handleLineChart}
            className="button"
            type="primary"
            icon={<PlusCircleOutlined />}
            style={{
              backgroundColor: "#FA896B",
              height: "32px",
              borderRadius: "6px",
            }}
            size="small"
          >
            Tra cứu
          </Button>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={eChart2.options}
        series={eChart2.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
