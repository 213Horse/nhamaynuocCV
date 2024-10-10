import React, { useEffect, useState } from "react";
import { DatePicker, Table, Tag, theme } from "antd";
import "./WaterLoss.css";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import fetchGetAllWaterLoss from "../../redux/slices/waterLossSlice/waterLossSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  btnClickGetFactoryIdSelector,
  getAllWaterLoss,
  isLoadingGetAllWaterLoss,
} from "../../redux/selector";

const WaterLoss = () => {
  const dataWaterLossGetAll = useSelector(getAllWaterLoss);
  const isLoadingWaterLoss = useSelector(isLoadingGetAllWaterLoss);
  const dispatch = useDispatch();
  const [transformedData, setTransformedData] = useState([]);
  const { token } = theme.useToken();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);

  const createFilterDate = (chonThang) => {
    let factoryQueryString = "";
    if (nhaMayId === "all") {
      const factoryIdArr = JSON.parse(sessionStorage.getItem("nhaMaysData"));
      factoryIdArr.map((factory) => {
        if (factoryQueryString === "") {
          factoryQueryString += `nhaMayIds=${factory.nhaMayId}&thangThatThoat=${chonThang}`;
        } else {
          factoryQueryString += `&nhaMayIds=${factory.nhaMayId}&thangThatThoat=${chonThang}`;
        }
      });
    } else {
      factoryQueryString = `nhaMayIds=${nhaMayId}&thangThatThoat=${chonThang}`;
    }
    console.log(`${factoryQueryString}`);
    return `${factoryQueryString}`;
  };
  useEffect(() => {
    const queryString = createFilterDate("");
    dispatch(fetchGetAllWaterLoss(queryString));
  }, [nhaMayId]);

  const pickerMonthChange = (date, dateString) => {
    console.log("Tháng:", dateString);
    const queryString = createFilterDate(dateString);
    try {
      dispatch(fetchGetAllWaterLoss(queryString));
    } catch (error) {
      console.error("Error occurred:", error);
      setTransformedData(null);
    }
  };
  useEffect(() => {
    const transformData = () => {
      const newData = [];

      dataWaterLossGetAll?.items.forEach((item, index) => {
        const { dongHoNuocId, dongHoTongId } = item;

        const isParent = dongHoNuocId === dongHoTongId;

        const newDongHo = {
          key: index + 1,
          tenDongHo: item.tenDongHo,
          dongHoNuocId: item.dongHoNuocId,
          maDongHo: item.maDongHo,
          loaiDongHo: item.loaiDongHo,
          dongHoTongId: item.dongHoTongId,
          thatThoat: item.thatThoat,
        };

        if (isParent) {
          newDongHo.cacDongHoBlock = dataWaterLossGetAll.items
            .filter(
              (childDongHo) =>
                childDongHo.dongHoTongId === dongHoNuocId &&
                childDongHo.loaiDongHo === 2
            )
            .map((childDongHo, index) => ({
              key: index + 1,
              tenDongHo: childDongHo.tenDongHo,
              dongHoNuocId: childDongHo.dongHoNuocId,
              maDongHo: childDongHo.maDongHo,
              loaiDongHo: childDongHo.loaiDongHo,
              dongHoTongId: childDongHo.dongHoTongId,
              thatThoat: childDongHo.thatThoat,
            }));
        }

        newData.push(newDongHo);
        const filteredItems = newData.filter((item) => item.loaiDongHo === 1);
        console.log("Data after filter:", filteredItems);
        setTransformedData(filteredItems);
      });
    };
    transformData();
  }, [dataWaterLossGetAll]);
  console.log("Data water convert:", transformedData);

  const generateDynamicColumns = () => {
    let dynamicColumns = [];

    transformedData[0]?.thatThoat.forEach((thang) => {
      const thangTitle = thang.thangTaoThatThoat;

      // Calculate the maximum width needed for each column based on content length
      const maxColumnWidth = Math.max(
        // Calculate max width for each content
        ...[
          `sanLuong_${thangTitle}`,
          `xucXa_${thangTitle}`,
          `congIch_${thangTitle}`,
          `khac_${thangTitle}`,
          `tyLeThatThoat_${thangTitle}`,
        ].map((dataIndex) =>
          Math.max(
            ...transformedData.map(
              (item) => String(item[dataIndex] || "").length
            )
          )
        )
      );

      dynamicColumns.push({
        align: "center",
        title: thangTitle,
        children: [
          {
            align: "center",
            title: "SL(m3)",
            dataIndex: `sanLuong_${thangTitle}`,
            key: `sanLuong_${thangTitle}`,
          },
          {
            align: "center",
            title: "Xúc xả(m3)",
            dataIndex: `xucXa_${thangTitle}`,
            key: `xucXa_${thangTitle}`,
          },
          {
            align: "center",
            title: "Công ích(m3)",
            dataIndex: `congIch_${thangTitle}`,
            key: `congIch_${thangTitle}`,
          },
          {
            title: "Khác(m3)",
            dataIndex: `khac_${thangTitle}`,
            key: `khac_${thangTitle}`,
            align: "center",
          },
          {
            align: "center",
            title: "TT(%)",
            dataIndex: `tyLeThatThoat_${thangTitle}`,
            key: `tyLeThatThoat_${thangTitle}`,
            render: (text) => (
              <>
                <Tag color="red">{text}</Tag>
              </>
            ),
          },
        ],
      });
    });

    return dynamicColumns;
  };

  const columns = [
    // Các cột tĩnh
    {
      align: "center",
      title: "Mã tổng - Mã ĐH",
      dataIndex: "codeTong",
      key: "codeTong",
      fixed: "left",
      width: 150, // Adjust the multiplier as needed
    },
    {
      align: "center",
      title: "Tên tổng",
      dataIndex: "nameTong",
      key: "nameTong",
      fixed: "left",
      width: 200, // Adjust the multiplier as needed
    },
    // Các cột động
    ...generateDynamicColumns(),
  ];

  const expandedRowRender = (record) => {
    const generateDynamicColumnsForBlock = (block) => {
      let dynamicColumns = [];

      block.thatThoat.forEach((thang) => {
        const thangTitle = thang.thangTaoThatThoat;

        dynamicColumns.push({
          align: "center",
          title: thangTitle,
          children: [
            {
              align: "center",
              title: "SL(m3)",
              dataIndex: `sanLuong_${thangTitle}`,
              key: `sanLuong_${thangTitle}`,
              width: 90, // Set a default minimum width
            },
            {
              align: "center",
              title: "Xúc xả(m3)",
              dataIndex: `xucXa_${thangTitle}`,
              key: `xucXa_${thangTitle}`,
              width: 90, // Set a default minimum width
            },
            {
              align: "center",
              title: "Công ích(m3)",
              dataIndex: `congIch_${thangTitle}`,
              key: `congIch_${thangTitle}`,
              width: 100, // Set a default minimum width
            },
            {
              align: "center",
              title: "Khác(m3)",
              dataIndex: `khac_${thangTitle}`,
              key: `khac_${thangTitle}`,
              width: 90, // Set a default minimum width
            },
            {
              align: "center",
              title: "TT(%)",
              dataIndex: `tyLeThatThoat_${thangTitle}`,
              key: `tyLeThatThoat_${thangTitle}`,
              width: 90, // Set a default minimum width
              render: (text) => (
                <>
                  <Tag color="red">{text}</Tag>
                </>
              ),
            },
          ],
        });
      });

      return dynamicColumns;
    };

    // Các cột cố định cho block
    const staticColumnsForBlock = [
      {
        align: "center",
        title: "Mã block - Mã HĐ",
        dataIndex: "codeBlock",
        key: "codeBlock",
        fixed: "left",
        width: 50,
      },
      {
        align: "center",
        title: "Tên block",
        dataIndex: "tenDongHo",
        key: "tenDongHo",
        fixed: "left",
        width: 50,
      },
    ];

    // Các cột động cho từng block
    const dynamicColumnsForBlock = generateDynamicColumnsForBlock(record);

    // Tổng hợp các cột cho từng block
    const columnsForBlock = [
      ...staticColumnsForBlock,
      ...dynamicColumnsForBlock,
    ];

    return (
      <div>
        <Table
          columns={columnsForBlock}
          dataSource={transformDataForBlock(record)}
          bordered
          size="small"
          pagination={false}
          scroll={{
            x: 3500,
            y: 330,
          }}
        />
      </div>
    );
  };

  const transformDataForBlock = (record) => {
    const transformedDataForBlock = record.cacDongHoBlock.map((item) => {
      const transformedItemForBlock = {
        codeBlock: item.maDongHo, // Thay đổi từ codeBlock sang maDongHo
        tenDongHo: item.tenDongHo, // Thêm trường tenDongHo
      };
      item.thatThoat.forEach((thang) => {
        const thangTitle = thang.thangTaoThatThoat;
        transformedItemForBlock[`sanLuong_${thangTitle}`] = thang.sanLuong;
        transformedItemForBlock[`xucXa_${thangTitle}`] = thang.xucXa;
        transformedItemForBlock[`congIch_${thangTitle}`] = thang.congIch;
        transformedItemForBlock[`khac_${thangTitle}`] = thang.khac;
        transformedItemForBlock[`sldhc_${thangTitle}`] = thang.sldhc;
        transformedItemForBlock[`tyLeThatThoat_${thangTitle}`] =
          thang.tyLeThatThoat;
      });
      return transformedItemForBlock;
    });

    return transformedDataForBlock;
  };

  const transformedData2 = transformedData.map((item) => {
    const transformedItem = {
      ...item,
      codeTong: item.maDongHo,
      nameTong: item.tenDongHo,
    };
    item.thatThoat.forEach((thang) => {
      const thangTitle = thang.thangTaoThatThoat;
      transformedItem[`sanLuong_${thangTitle}`] = thang.sanLuong;
      transformedItem[`xucXa_${thangTitle}`] = thang.xucXa;
      transformedItem[`congIch_${thangTitle}`] = thang.congIch;
      transformedItem[`khac_${thangTitle}`] = thang.khac;
      transformedItem[`sldhc_${thangTitle}`] = thang.sldhc;
      transformedItem[`tyLeThatThoat_${thangTitle}`] = thang.tyLeThatThoat;
      // ... Chuyển đổi các trường dữ liệu khác tương tự
    });
    return transformedItem;
  });
  console.log("Data test:", transformedData2);

  return (
    <div>
      <DatePicker
        picker="month"
        onChange={pickerMonthChange}
        locale={locale}
        format="MM/YYYY"
      />
      <div
        style={{
          lineHeight: "200px",
          textAlign: "center",
          marginTop: 7,
          position: "relative",
        }}
      >
        <Table
          style={{
            whiteSpace: "nowrap",
          }}
          columns={columns}
          loading={isLoadingWaterLoss}
          bordered
          size="small"
          pagination={false}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ["0"],
          }}
          dataSource={transformedData2}
          scroll={{
            x: 3500,
            y: 330,
          }}
        />
      </div>
    </div>
  );
};
export default WaterLoss;
