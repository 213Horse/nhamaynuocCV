import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import "../assets/styles/main.css";
import "../assets/styles/responsive.css";
import { useSelector } from "react-redux";
import { btnClickDashboardData } from "../../../../redux/selector";

function EChart() {
  const { Title, Paragraph } = Typography;
  const dashboardData = useSelector(btnClickDashboardData);

  const seriesData = dashboardData?.map((item) => ({
    x: item.thang,
    y: item.tongTienSauVat,
  }));
  const seriesDataPreVat = dashboardData?.map((item) => ({
    x: item.thang,
    y: item.tongTienTruocVat,
  }));
  console.log("Dashboard series: ", seriesData);

  const eChart2 = {
    series: [
      { name: "Tổng tiền trước VAT", data: seriesDataPreVat },
      { name: "Tổng tiền sau VAT", data: seriesData },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },

      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        type: "category",
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: "#fff",
            fontSize: "12px",
            fontFamily: "Quicksand_500Medium",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
          format: undefined,
          formatter: undefined,
        },
      },

      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: ["#fff"],
          },
        },
        title: {
          text: "(VND)",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Quicksand_500Medium",
            color: "#fff",
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val + " VND";
          },
        },
      },
    },
  };

  const items = [
    {
      Title: "1000",
      user: "Tổng tiêu thụ",
    },
    {
      Title: "50 Triệu",
      user: "Doanh thu",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart2.options}
          series={eChart2.series}
          type="bar"
          height={220}
        />
      </div>
    </>
  );
}

export default EChart;
