import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

import { font } from "./Roboto-Regular-normal";

// Handle export file Excel (.xlsx)
const exportToExcel = (apiData, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = XLSX.utils.json_to_sheet(apiData);

  /* custom headers */
  // XLSX.utils.sheet_add_aoa(ws, [["Name", "Birthday", "Age", "City"]], {
  //   origin: "A1",
  // });

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);

  toast.success("Xuất thành công file với định dạng .xlsx.");
};

// Handle export file PDF (.pdf)
const exportToPDF = (
  tableColumn,
  tableRows,
  fileName,
  { options: { nameCompany, titleFile, anyString } }
) => {
  const doc = new jsPDF("p", "pt", "a4");

  // convert utf-8
  doc.addFileToVFS("./Roboto-Regular-normal.js", font);
  doc.setFont("Roboto-Regular");

  // name company
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(nameCompany, 10, 20);

  // tile
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(titleFile, 200, 40);

  // date (from ... to ...)
  doc.setFontSize(8);
  doc.setTextColor(0);
  doc.text(anyString, 230, 55);

  // startY is basically margin-top
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    pageBreak: "avoid",
    styles: {
      overflow: "linebreak",
      valign: "middle",
      fontSize: 4,
      font: "Roboto-Regular",
    },
    headStyles: {
      fontSize: 4,
      font: "Roboto-Regular",
    },
    bodyStyles: {
      fontSize: 4,
      font: "Roboto-Regular",
    },
    startY: 75,
  });

  // bottom
  doc.setTextColor(0);
  doc.setFontSize(6);
  doc.text(
    "Ngày ... tháng ... năm ...",
    doc.internal.pageSize.width - 20,
    doc.internal.pageSize.height - 70,
    "right"
  );
  doc.text(
    "Người lập",
    doc.internal.pageSize.width - 34,
    doc.internal.pageSize.height - 60,
    "right"
  );
  doc.text(
    "Ký, họ tên",
    doc.internal.pageSize.width - 34,
    doc.internal.pageSize.height - 50,
    "right"
  );

  // we define the name of our PDF file.
  doc.save(`${fileName}.pdf`);

  toast.success("Xuất thành công file với định dạng .pdf.");
};

export { exportToExcel, exportToPDF };
