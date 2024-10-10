import { PrinterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import dayjs from "dayjs";
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  PageBreak,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  UnderlineType,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { btnClickGetFactoryIdSelector, dataContractList, getDetailHopDongSelector, getPrintData } from "../../redux/selector";
// import { fetchListContract } from "../../redux/slices/invoiceSlice/invoiceSlice";
import { printHopDong } from "../../redux/slices/contractSlice/contractSlice";

function CustomWord({
  waterClocks,
  isTabletOrMobile,
  isUpdate,
  size = "middle",
}) {
  console.log("waterClocks word ->", waterClocks);

  const handleExport = useCallback(() => {
    const codeContract = waterClocks[0]?.hopDong?.keyId || "...";
    const codeCustomer = waterClocks[0]?.hopDong?.khachHang?.keyId || "...";
    const nameCustomer =
      waterClocks[0]?.hopDong?.khachHang?.tenKhachHang || "...";
    const emailCustomer = waterClocks[0]?.hopDong?.khachHang?.email || "...";
    const addressCustomer = waterClocks[0]?.hopDong?.khachHang?.diaChi || "...";
    const phone = waterClocks[0]?.hopDong?.khachHang?.dienThoai || "...";
    const khuVuc = waterClocks[0]?.hopDong?.dongHoNuocs[0]?.donViHC || "...";
    const nguoiDaiDien =
      waterClocks[0]?.hopDong?.khachHang?.nguoiDaiDien || "...";
    const soCMND = waterClocks[0]?.hopDong?.khachHang?.soCmnd || "...";
    const ngayCapCMND =
      waterClocks[0]?.hopDong?.khachHang?.ngayCapCmnd || "...";
    const noiCapCMND = waterClocks[0]?.hopDong?.khachHang?.noiCapCmnd || "...";
    const coDongHo =
      waterClocks[0]?.hopDong?.dongHoNuocs[0]?.duongKinh || "...";
    const mucDichSuDung = waterClocks[0]?.hopDong?.mucDichSuDung || "...";
    const ngayHienTai = new Date().getDate();
    const thangHienTai = new Date().getMonth() + 1;
    const namHienTai = new Date().getFullYear();

    const docx = new Document({
      sections: [
        {
          children: [
            // ---- START - HEADING: PAGE 1 ----
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "CÔNG TY AMAZING TECH ...",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 20,
                }),
              ],
            }),
            new Paragraph({
              text: "HỢP ĐỒNG DỊCH VỤ CẤP NƯỚC",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            // KHU VỰC ... + ĐIỆN THOẠI ...
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `KHU VỰC: ${khuVuc} - Điện thoại: ${phone}`,
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            // MÃ HỢP ĐỒNG ...
            new Table({
              columnWidths: [6505, 6505],
              rows: [
                new TableRow({
                  children: Array.from(codeContract, (_char) => {
                    return new TableCell({
                      width: {
                        size: 6505,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: `${_char}`,
                              font: "Times New Roman",
                              size: 24,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    });
                  }),
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "HĐDVCN",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            // MÃ KHÁCH HÀNG ...
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `Mã khách hàng: ${codeCustomer}`,
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            // TÊN KHÁCH HÀNG ...
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `Tên khách hàng: ${nameCustomer}`,
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            // CỠ ĐỒNG HỒ ...
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `Cỡ đồng hồ: ${coDongHo}`,
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            // SỐ ĐIỆN THOẠI ...
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `Số điện thoại: ${phone}`,
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            // SỐ FAX ...
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: "Số fax: ...",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            // EMAIL ...
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `Email: ${emailCustomer}`,
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
                new PageBreak(),
              ],
            }),
            // ---- END - HEADING: PAGE 1 ----
            // ---- START - HEADING: PAGE 2 ----
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Độc lập - Tự do - Hạnh phúc",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "HỢP ĐỒNG DỊCH VỤ CẤP NƯỚC",
                  font: "Times New Roman",
                  size: 32,
                  bold: true,
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            // MÃ HỢP ĐỒNG ...
            new Table({
              columnWidths: [6505, 6505],
              rows: [
                new TableRow({
                  children: Array.from(codeContract, (_char) => {
                    return new TableCell({
                      width: {
                        size: 6505,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: `${_char}`,
                              font: "Times New Roman",
                              size: 24,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    });
                  }),
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Căn cứ Bộ luật dân sự số 33/2005/QH11 của Quốc Hội nước CHXHCN Việt Nam;",
                  size: 28,
                  font: "Times New Roman",
                  italics: true, // in nghiên
                }),
              ],
              spacing: {
                line: 276, // line height 1.15
              },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Căn cứ luật bảo vệ Người tiêu dùng số 59/2010/QH12 ngày 17/11/2010 của Quốc Hội nước CHXHCN Việt Nam;",
                  size: 28,
                  font: "Times New Roman",
                  italics: true, // in nghiên
                }),
              ],
              spacing: {
                line: 276, // line height 1.15
              },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Căn cứ Nghị định 117/2007/NĐ-CP ngày 11/7/2007 của CP về sản xuất và tiêu thụ nước sạch;",
                  size: 28,
                  font: "Times New Roman",
                  italics: true, // in nghiên
                }),
              ],
              spacing: {
                line: 276, // line height 1.15
              },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Căn cứ Thông tư số 01/2008 TT-BXD ngày 02/01/2008 của Bộ trưởng Bộ Xây dựng hướng dẫn thực hiện Nghị định 117/2007/NĐ-CP ngày 11/7/2007 của Chính phủ về sản xuất, cung cấp và tiêu thụ nước sạch;",
                  size: 28,
                  font: "Times New Roman",
                  italics: true, // in nghiên
                }),
              ],
              spacing: {
                line: 276, // line height 1.15
              },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Căn cứ  nghị định 124/2011/NĐ-CP ngày 28/12/2011 sửa đổi nghị định 117/2007 NĐ-CP ngày 11 tháng 7 năm 2007  của Chính phủ về sản xuất, cung cấp và tiêu thụ nước sạch;",
                  size: 28,
                  font: "Times New Roman",
                  italics: true, // in nghiên
                }),
              ],
              spacing: {
                line: 276, // line height 1.15
              },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Căn cứ vào đơn (công văn) đăng ký lắp đặt và sử dụng nước của khách hàng ngày ... tháng ... năm .....",
                  size: 28,
                  font: "Times New Roman",
                  italics: true, // in nghiên
                }),
              ],
              spacing: {
                line: 276, // line height 1.15
              },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `Hôm nay, ngày ${ngayHienTai} tháng ${thangHienTai} năm ${namHienTai} Công ty CP xây dựng và CN môi trường Việt Nam, chúng tôi gồm:`,
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
              spacing: {
                line: 276, // line height 1.15
              },
            }),
            // I. KHÁCH HÀNG SỬ DỤNG NƯỚC (GỌI TẮT LÀ BÊN A)
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "I. Khách hàng sử dụng nước ( gọi tắt là Bên A ).",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `- Chủ hộ (hoặc tên cơ quan, DN): ${nameCustomer}`,
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `- Đại diện là ông (bà): ${nguoiDaiDien} Chức vụ: ...`,
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Theo giấy uỷ quyền số ........./...... ngày ... tháng .... năm 20…",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `- Số CMND (Hộ chiếu): ${soCMND}, cấp ngày: ${dayjs(
                    ngayCapCMND
                  ).format("DD/MM/YYYY")}, tại: ${noiCapCMND}`,
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `- Nơi thường trú (Địa chỉ cơ quan, DN): ${addressCustomer}`,
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `- Địa chỉ sử dụng nước: ${khuVuc}`,
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Tài khoản số: ...     tại Ngân hàng: ...",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Mã số thuế: ...",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `- Số điện thoại: ${phone} - Fax: ...`,
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // II. BÊN CUNG CẤP DỊCH VỤ (GỌI TẮT LÀ BÊN B)
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "II. Bên cung cấp dịch vụ ( gọi tắt là Bên B ).",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Công ty CP xây dựng và CN môi trường Việt Nam.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Đại diện là ông: ...                   Chức vụ: Giám đốc.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "-Trụ sở: ...",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Tài khoản số: ...               Tại: ...",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Mã số thuế: ...",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Cùng nhau thoả thuận ký kết hợp đồng dịch vụ cấp nước với các nội dung sau:",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 1
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 1: Đối tượng của Hợp đồng:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Hợp đồng này áp dụng đối với các khách hàng sử dụng sản phẩm nước sạch của Công ty CP xây dựng và CN môi trường Việt Nam.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 2
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 2: Điều kiện chất lượng dịch vụ:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "2.1 Lưu lượng nước sử dụng: Đáp ứng theo đăng ký của Bên A, được Bên B chấp thuận.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "2.2 Chất lượng nước: Tại điểm đấu nối theo tiêu chuẩn nước sạch quy định theo quy chuẩn số QCVN 01:2009/BYT ban hành ngày 17/6/2009 của Bộ Y tế.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "2.3 Thời gian sử dụng nước của khách hàng: Được tính từ ngày Bên B lắp đặt bàn giao công trình hệ thống cấp nước cho Bên A.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "2.4 Áp lực nước tại điểm đấu nối từ  0.5kg/cm2-1kg/cm2.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 3
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 3: Mục đích sử dụng, giá nước sạch:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "3.1 Mục đích sử dụng:",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // TABLE - MỤC ĐÍCH SỬ DỤNG
            new Table({
              columnWidths: [10000, 1200],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 10000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.LEFT,
                          children: [
                            new TextRun({
                              text: " Sinh hoạt",
                              font: "Times New Roman",
                              size: 28,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 1200,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: `${mucDichSuDung === "2" ? "X" : ""}`,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 10000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.LEFT,
                          children: [
                            new TextRun({
                              text: " Sản xuất",
                              font: "Times New Roman",
                              size: 28,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 1200,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: `${mucDichSuDung === "4" ? "X" : ""}`,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 10000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.LEFT,
                          children: [
                            new TextRun({
                              text: " Hành chính, Sự Nghiệp",
                              font: "Times New Roman",
                              size: 28,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 1200,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: `${mucDichSuDung === "1" ? "X" : ""}`,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 10000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.LEFT,
                          children: [
                            new TextRun({
                              text: " Sinh Hoạt_TB",
                              font: "Times New Roman",
                              size: 28,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 1200,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: `${mucDichSuDung === "3" ? "X" : ""}`,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "3.2 Giá nước sạch: Bao gồm giá nước theo Quyết định hiện hành của UBND tỉnh ... (giá đã bao gồm VAT 5%).",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Trường hợp giá nước có thay đổi, Bên B sẽ thông báo trên các phương tiện thông tin đại chúng hoặc thông báo trực tiếp đến Bên A biểu giá mới và thời điểm bắt đầu áp dụng.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "3.3 Khách hàng sử dụng nước sạch phải chịu phí bảo vệ môi trường theo quy định hiện hành của UBND tỉnh ... ",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 4
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 4: Xác định khối lượng nước sạch và mức thanh toán tối thiểu:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "4.1 Việc xác định khối nước sạch được thực hiện bằng đồng hồ đo nước loại …............ Số Series: ..................... , được Bên B lắp đặt tại …….................… nằm trong (ngoài)........................... vị trí quản lý của Bên A. ",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "4.2 Lắp đặt đồng hồ đo nước: Bên B có trách nhiệm đầu tư, lắp đặt đồng hồ đo nước, đảm bảo đồng hồ đo nước đã được kiểm định phù hợp với Tiêu chuẩn Việt Nam.  Hai bên có trách nhiệm bảo vệ đồng hồ và theo dõi ghi chỉ số nước hàng tháng.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "4.3 Trường hợp đồng hồ đo nước bị mất hoặc hư hỏng gây mất nước mà  nguyên nhân do lỗi của Bên B thì Bên B có trách nhiệm sửa chữa, thay thế đồng hồ đo nước và tiếp tục cấp nước cho Bên A; Nguyên nhân do lỗi của Bên A thì Bên A có trách nhiệm hoàn trả và bồi thường cho Bên B toàn bộ các chi phí và thiệt hại thực tế liên quan đến việc sửa chữa, thay thế và kiểm định đồng hồ đo nước. ",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "4.4 Bên A không được tự ý tháo gỡ, di chuyển đồng hồ đo nước sang vị trí khác so với vị trí lắp đặt ban đầu của Bên B trừ khi được Bên B đồng ý trước bằng văn bản và Bên A phải chịu toàn bộ các chi phí liên quan đến việc di chuyển đồng hồ đo nước.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "4.5 Xác định lượng nước sử dụng: Bên B sẽ tiến hành việc ghi chỉ số đồng hồ đo nước trong thời hạn từ ngày 01 đến  ngày 12 hàng tháng (đơn vị tính theo m3).",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "4.6. Đối với khách hàng là cơ quan, doanh nghiệp, đơn vị hành chính sự nghiệp lấy xác nhận khối lượng từ ngày 12 – 24 hàng tháng, thanh toán chuyển khoản hoặc nộp tiền mặt tại Phòng tài vụ Công ty từ ngày 25 đến ngày 30, 31 trong tháng đó.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 5
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 5: Phương thức, thời gian, địa điểm thanh toán:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "5.1. Địa điểm thanh toán tại các Phòng thu ngân của Công ty CP xây dựng và CN môi trường Việt Nam được đặt tại các khu vực sau:",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // TABLE
            new Table({
              columnWidths: [10000, 1200],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 10000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.LEFT,
                          children: [
                            new TextRun({
                              text: " ",
                              font: "Times New Roman",
                              size: 28,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 1200,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: " ",
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Hình thức thanh toán: Tiền mặt.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Thời hạn thanh toán: Tiền nước sử dụng trong tháng được thanh toán từ ngày 15 đến ngày cuối của tháng đó ( Riêng khu vực ........... lượng khách lớn sẽ triển khai thu ngân kể cả ngày thứ 7,chủ nhật, trong giờ hành chính theo quy định ).",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "5.2. Nếu Bên A chậm trả tiền nước quá 1 tháng so với thời hạn thanh toán của điều khoản này thì Bên A phải trả cả phần gốc và lãi của khoản chậm trả đó. Lãi suất chậm trả bằng số tiền chậm thanh toán nhân với mức lãi suất cho vay cao nhất áp dụng đối với khách hàng cá nhân của Ngân hàng mà Bên B có Tài khoản ghi trong Hợp Đồng này tại thời điểm thanh toán và nhân với số ngày chậm thanh toán, tính từ ngày cuối cùng của thời hạn thanh toán đến ngày Bên A thực tế thanh toán.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 6
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 6: Quyền và nghĩa vụ của Bên B.",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // ĐIỀU 6.1
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "6.1 Quyền: ",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "a. Được phép vào khu vực quản lý của Bên A để kiểm tra hệ thống cấp nước, ghi chỉ số tiêu thụ, lập biên bản sự việc khi cần thiết.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "b. Ngừng cấp nước hoặc đơn phương chấm dứt hợp đồng theo điều 9.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "c. Được nhận bồi thường thiệt hại do Bên A gây ra.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 6.2
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "6.2 Nghĩa vụ",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "a. Tuân thủ quy trình, quy phạm vận hành hệ thống cấp nước; xử lý sự cố, khôi phục việc cấp nước kịp thời.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "b. Thực hiện các quy định của pháp luật về tài nguyên nước, bảo vệ môi trường; bảo vệ an toàn nguồn nước cấp.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "c. Cung cấp nước đầy đủ về số lượng đảm bảo về chất lượng cho Bên A ( trừ khi có sự cố bất khả kháng xảy ra ).",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "d. Khi có sự cố, sửa chữa máy, đường ống phải ngừng cấp nước, Bên B phải thông báo mức độ, thời hạn ngừng cấp cho bên A biết để chủ động trong công việc.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "e. Bồi thường khi gây thiệt hại cho Bên A.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 7
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 7: Quyền và nghĩa vụ của Bên A",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // ĐIỀU 7.1
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "7.1 Quyền: ",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "a. Yêu cầu Bên B cung cấp nước đầy đủ, đảm bảo chất lượng, áp lực như trong hợp đồng, khắc phục sự cố mất nước trước đồng hồ.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "b. Yêu cầu Bên B cung cấp, giới thiệu các quy định, văn bản có liên quan đến việc cung cấp và sử dụng nước.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "c. Yêu cầu Bên B kiểm tra chất lượng dịch vụ, tính chính xác của thiết bị đo đếm, số tiền nước phải thanh toán.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 7.2
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "7.2 Nghĩa vụ: ",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "a. Thanh toán tiền sử dụng nước, đầy đủ, đúng hạn (kể cả lượng nước thất thoát sau đồng hồ do mọi nguyên nhân).",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "b. Sử dụng nước tiết kiệm và có trách nhiệm bảo quản giữ gìn an toàn đồng hồ, hệ thống đường ống cấp nước. Thông báo kịp thời cho Bên B khi phát hiện đồng hồ, hệ thống đường ống cấp nước bị mất, bị hỏng hoặc những dấu hiệu bất thường có thể gây ngừng nước, ảnh hưởng đến chất lượng nước, đọc, tính toán in hoá đơn sai.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "c. Sử dụng nước đúng mục đích như điều 3, không tự ý đấu nối và cho các hộ khách hàng khác sử dụng nước khi chưa có sự đồng ý bằng văn bản của Bên B. Thông báo cho Bên B trước 02 tuần khi thay đổi mục đích sử dụng nước hoặc khi có nhu cầu dừng, chấm dứt hợp đồng.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "d. Không tự ý sữa chữa trước đồng hồ, di chuyển vị trí đồng hồ, giữ đồng hồ luôn ở vị trí niêm phong.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "e. Tạo mọi điều kiện cho Bên B kiểm tra việc thực hiện hợp đồng và kiểm tra hệ thống cấp nước của Bên A theo định kỳ hoặc đột xuất.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "f. Bồi thường cho Bên B những thiệt hại do lỗi của mình gây ra.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 8
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 8: Sửa đổi hợp đồng:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Hợp đồng này được sửa đổi khi một hoặc hai bên thấy cần thiết và cùng nhất trí sửa đổi.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 9
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 9: Tạm ngừng cấp nước và chấm dứt Hợp đồng:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // ĐIỀU 9.1
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "9.1 Bên B sẽ tạm ngừng cấp nước đối với Bên A trong các trường hợp sau: ",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "a. Có đơn đề nghị ngừng cấp nước của Bên A.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "b. Bên A không thanh toán đúng hạn theo quy định tại điều 5 của Hợp đồng này. Thời gian ngừng cấp nước theo quy định hiện hành.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "c. Bên A không tạo điều kiện để Bên B ghi chỉ số, kiểm tra hệ thống cấp nước của Bên A.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "d. Bên A có hành vi đe doạ, hành hung, lăng mạ, xúc phạm đến nhân viên của Bên B khi đang thi hành nhiệm vụ.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "e. Bên A không sử dụng nước quá 08 tuần mà không có thông báo bằng văn bản cho Bên B.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "f. Mất điện có thông báo trước.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "g. Bên B thực hiện sửa chữa, bảo dưỡng hệ thống cấp nước theo kế hoạch.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "h. Mất điện đột xuất hoặc sự cố hệ thống cấp nước.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Lưu ý:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Các trường hợp a, b, c, d, e, chi phí cho việc ngừng cấp nước, cấp nước trở lại Bên A phải chi trả toàn bộ chi phí theo quy định hiện hành của Bên B.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "- Các trường hợp f, g, Bên B sẽ có thông báo trên phương tiện thông tin đại chúng hoặc bằng văn bản và bằng điện thoại trước 3 ngày.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 9.2
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "9.2. Bên B chấm dứt hiệu lực Hợp đồng đối với Bên A trong các trường hợp sau:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "a. Bên A không thực hiện nghĩa vụ thanh toán tiền nước và đã ngừng cấp nước sau 05 tuần.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "b. Bên A sử dụng nước không đúng mục đích như điều 3 của Hợp đồng này.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "c. Bên A tự ý di chuyển, gây hư hỏng đối với cụm đồng hồ, hệ thống đường ống, làm sai lệch hệ thống đo đếm.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "d. Bên A có hành vi gian lận trong quá trình sử dụng nước.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "e. Bên A không có nhu cầu sử dụng nước, nếu quá 08 tuần mà không thông báo cho Bên B biết.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Việc ký hợp đồng trở lại chỉ được tiến hành khi Bên A đã thực hiện đầy đủ các quy định của Bên B và chi trả các chi phí liên quan đến việc cắt, đấu nối lại hệ thống cấp nước.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 10
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 10: Bồi thường thiệt hại và phạt vi phạm Hợp đồng:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // ĐIỀU 10.1
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "10.1. Trách nhiệm bồi thường của bên A:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Bên A có trách nhiệm bồi thường thiệt hại cho Bên B trong các trường hợp sau:",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "a. Gây sự cố cho Hệ thống cấp nước hoặc có hành vi làm hư hỏng Hệ thống cấp nước, đồng hồ đo nước. Số tiền bồi thường sẽ bằng giá trị bù đắp lại phần hư hỏng của Hệ thống cấp nước, đồng hồ đo nước và các thiệt hại thực tế khác mà Bên B phải gánh chịu do vi phạm của Bên A. Mức bồi thường thiệt hại theo giá trị thực tế nhưng không dưới số tiền tương đương với 200m3 nước theo đơn giá cao nhất.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "b. Sử dụng nước sai mục đích đã thỏa thuận trong Hợp Đồng. Số tiền bồi thường sẽ bằng khoản tiền chênh lệch giá trong thời gian vi phạm mục đích sử dụng nước cộng với tiền lãi tính trên số tiền chênh lệch theo mức lãi suất cho vay cao nhất áp dụng đối với khách hàng cá nhân của Ngân hàng mà Bên B có Tài khoản ghi trong Hợp Đồng này tại thời điểm thanh toán cho khoảng thời gian tính từ ngày Bên A sử dụng nước sai mục đích đến ngày Bên A thực tế thanh toán toàn bộ tiền bồi thường cho Bên B. ",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "c. Bên A phải nộp tiền truy thu cho Bên B khi Bên A vi phạm các điểm a, b, c, d, e, ở mục 9.2 điều 9 của Hợp đồng này hoặc trường hợp đồng hồ đo đếm không chính xác vì lý do khách quan.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "d. Có các hành vi trộm cắp nước sạch dưới mọi hình thức, ngoài việc bị xử lý hành chính theo quy định của pháp luật, còn phải bồi thường thiệt hại cho Bên B; mức bồi thường thiệt hại theo giá trị thực tế nhưng không dưới số tiền tương đương với 800m3 nước theo đơn giá cao nhất.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "e. Vi phạm trách nhiệm, nghĩa vụ khác của Bên A theo Hợp Đồng này, hoặc các quy định của pháp luật về sử dụng nước, Bên A sẽ phải bồi thường cho Bên B toàn bộ thiệt hại thực tế do vi phạm của Bên A gây ra. ",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Thời hạn trả tiền bồi thường thiệt hại do hai bên tự thỏa thuận nhưng không quá 15 ngày kể từ ngày chấp nhận yêu cầu bồi thường thiệt hại. Nếu quá thời hạn trên, bên vi phạm phải chịu lãi suất chậm trả trên số tiền bồi thường thiệt hại theo quy định của pháp luật. Nếu bên vi phạm không thực hiện nghĩa vụ sẽ bị ngừng cấp nước đến khi bên vi phạm thực hiện nghĩa vụ của mình.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 10.2
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "10.2. Trách nhiệm bồi thường của Bên B:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "a. Bên B bồi thường thiệt hại cho Bên A trong các trường hợp: Cung cấp nước không đảm bảo tiêu chuẩn, sử dụng thiết bị đo đếm không chính xác, trì hoãn khắc phục sự cố gây ảnh hưởng tới việc cung cấp nước cho Bên A mà không có lý do chính đáng.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "b. Trường hợp Bên B ghi sai chỉ số đồng hồ đo nước, tính toán hóa đơn sai cho Bên A hoặc sử dụng đồng hồ đo nước không đạt tiêu chuẩn quy định dẫn đến thu tiền nước nhiều hơn số tiền Bên A thực tế phải trả, Bên B phải trả cho Bên A khoản tiền đã thu thừa cộng với tiền lãi tính trên số tiền chênh lệch theo mức lãi suất cho vay cao nhất áp dụng đối với khách hàng cá nhân của Ngân hàng mà Bên B có tài khoản ghi trong Hợp đồng tại thời điểm thanh toán;",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "     c. Trường hợp Bên B vi phạm các trách nhiệm, nghĩa vụ khác của Bên B theo Hợp Đồng này và gây thiệt hại cho Bên A, Bên B sẽ phải bồi thường cho Bên A theo thiệt hại thực tế mà Bên A phải gánh chịu do hành vi vi phạm của Bên B. ",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 10.3
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "10.3. Phạt vi phạm hợp đồng:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Ngoài bồi thường thiệt hại nêu trên: Bên A sẽ chịu phạt vi phạm với mức phạt bằng 20% số tiền bồi thường nếu có một trong các vi phạm nêu tại Khoản 10.1 Điều 10 của Hợp Đồng.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Bên B sẽ chịu phạt vi phạm với mức phạt bằng 20% số tiền bồi thường nếu có một trong các vi phạm nêu tại Khoản 10.2 Điều 10 của Hợp Đồng.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 11
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 11: Các thoả thuận khác:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // ĐIỀU 11.1
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "11.1 Trường hợp không xác định được chỉ số đồng hồ, thì khối lượng nước trong tháng được tính bằng trung bình của 3 tháng liền kề trước đó làm cơ sở in hoá đơn.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 11.2
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "11.2 Khi cần khiếu nại, góp ý các vấn đề liên quan đến việc cung cấp và sử dụng nước, Bên A liên hệ theo số máy đã ghi trong Hợp đồng hoặc có thể đến trực tiếp các điểm giao dịch, văn phòng của Bên B để phản ánh.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 11.3
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "11.3 Khi có sự thay đổi về các quy định và văn bản pháp lý liên quan đến việc cung cấp, sử dụng nước, giá nước thì hợp đồng này không nhất thiết phải ký lại. Bên B sẽ thông báo cho Bên A biết qua thông tin đại chúng hoặc bằng văn bản, phụ lục Hợp đồng khi cần thiết.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 12
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "Điều 12: Điều khoản chung:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // ĐIỀU 12.1
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "12.1 Hợp đồng này có hiệu lực kể từ ngày hai bên ký. Hai bên cam kết thực hiện đúng các điều khoản đã được ghi trong Hợp đồng. Bên nào vi phạm sẽ chịu trách nhiệm trước bên kia và trước pháp luật.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ĐIỀU 12.2
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: "12.2 Hợp đồng được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản.",
                  font: "Times New Roman",
                  size: 28,
                }),
              ],
            }),
            // ---- FOOTER ----
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              spacing: {
                line: 276,
              },
              children: [
                new TextRun({
                  text: "Điện thoại báo sự cố, sửa chữa các khu vực trong giờ hành chính:",
                  font: "Times New Roman",
                  size: 28,
                  bold: true,
                  underline: UnderlineType.SINGLE,
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            // TABLE
            new Table({
              columnWidths: [10000, 4200],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 10000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Khu vực",
                              font: "Times New Roman",
                              size: 28,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 4200,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Số điện thoại",
                              font: "Times New Roman",
                              size: 28,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            // break
            new Paragraph({
              children: [
                new TextRun({
                  break: 1,
                }),
              ],
            }),
            // TABLE
            new Table({
              columnWidths: [5000, 5000],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 5000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "ĐẠI DIỆN BÊN B",
                              font: "Times New Roman",
                              size: 28,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 5000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          pageBreakBefore: true,
                          children: [
                            new TextRun({
                              text: "ĐẠI DIỆN BÊN A",
                              font: "Times New Roman",
                              size: 28,
                              bold: true,
                            }),
                            new TextRun({
                              text: "\n ( Ký, ghi rõ họ tên, đóng dấu )",
                              font: "Times New Roman",
                              size: 28,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(docx).then((blob) => {
      saveAs(
        blob,
        `HopDong_${codeContract}_${dayjs(new Date()).format("DD-MM-YYYY")}.docx`
      );
      toast.success("In thành công hợp đồng.");
    });

    return docx;
  }, [waterClocks]);
  const dispatch = useDispatch();
  const nhaMayId = useSelector(btnClickGetFactoryIdSelector);
  const dataContract = useSelector(dataContractList);
  
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
    const queryString = createFilterQueryString()
    // dispatch(fetchListContract(queryString));
  }, [nhaMayId]);

  const selectedHopDong = useSelector(getDetailHopDongSelector);

  console.log("id",dataContract.find(data => data.keyId === selectedHopDong?.mHopDong?.maHopDong)?.id);

  const hopDongId = dataContract.find(data => data.keyId === selectedHopDong?.mHopDong?.maHopDong)?.id

  const handlePrint = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}hop-dong/in-hop-dong?hopDongId=${hopDongId}`;
    window.open(url, '_blank');
  }
  
  return (
    <>
    <Button
      size={size}
      className={
        isTabletOrMobile
          ? "footer-func-btn-item-print custom-btn-export"
          : "gutter-item custom-btn-export"
      }
      onClick={handlePrint}
      disabled={isUpdate ? false : true}
    >
      <PrinterOutlined />
      In hợp đồng
    </Button>
    </>
  );
}

export default memo(CustomWord);
