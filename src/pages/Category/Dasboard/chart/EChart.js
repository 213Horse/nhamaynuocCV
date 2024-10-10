import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import "../assets/styles/main.css";
import "../assets/styles/responsive.css";
import { useSelector } from "react-redux";
import { btnClickDashboardData, btnClickTotalClock, btnClickTotalContract } from "../../../../redux/selector";

function EChart() {
  const { Title, Paragraph } = Typography;
  const dashboardData = useSelector(btnClickDashboardData);
  const totalContract = useSelector(btnClickTotalContract);
  const totalClock = useSelector(btnClickTotalClock);

  const tongTatCaHopDong = totalContract?.reduce((tong, item) => {
    return tong + item.tongSoHopDong;
  }, 0);
  const tongDoanhThu = dashboardData?.reduce((tong, item) => {
    return tong + item.tongTienSauVat;
  }, 0);

  const formatTongDoanhThu = new Intl.NumberFormat("en-US", {
    currency: "VND",
  }).format(tongDoanhThu);

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
      Title: `${formatTongDoanhThu}`,
      user: "Doanh thu",
    },
    {
      Title: totalClock.tongSoLuongDongHo,
      user: "Số lượng đồng hồ",
    },
    {
      Title: `${tongTatCaHopDong}`,
      user: "Số lượng hợp đồng",
    }
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
      <div className="chart-vistior">
        <Title level={5}>Thống kê theo năm 2024</Title>
        <Paragraph className="lastweek"></Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
