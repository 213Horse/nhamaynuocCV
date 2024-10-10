import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Select, Button } from "antd";
import { useMediaQuery } from "react-responsive";
import { BarChartOutlined } from "@ant-design/icons";

const { Option } = Select;

const FromBarChart = () => {
  const [month, setMonth] = useState("1");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991px)" });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ sử dụng nước",
      },
    },
    barThickness: isTabletOrMobile ? 20 : 40,
    scales: {
      x: {
        title: {
          display: true,
          text: "Tháng năm",
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Sản lượng m3",
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
    },
  };
  const year = 2022;
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
  ].map((label) => {
    const month = label.slice(1);
    return `${month}/${year}`;
  });

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Sản lượng m3",
        data: labels.map(() => getRandomNumber(0, 40000)),
        backgroundColor: "rgba(0, 128, 0, 0.5)",
      },
    ],
  };

  const handleViewClick = () => {
    // Xử lý khi nhấn nút Xem
  };

  return (
    <>
      <Select
        defaultValue={month}
        style={{ width: isTabletOrMobile ? 80 : 120 }}
        onChange={(value) => setMonth(value)}
      >
        {labels.map((label) => (
          <Option value={label.slice(0, label.indexOf("/"))}>{label}</Option>
        ))}
      </Select>
      <Button
        style={{ marginLeft: "10px" }}
        className="custom-btn-watch-report"
        icon={<BarChartOutlined />}
        onClick={handleViewClick}
      >
        Xem
      </Button>
      <div style={{ overflowX: "scroll", maxWidth: "100%" }}>
        <Bar
          options={options}
          data={data}
          updateMode="resize"
          width={800}
          height={400}
        />
      </div>
    </>
  );
};

export default FromBarChart;
