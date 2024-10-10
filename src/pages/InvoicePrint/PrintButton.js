import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import React from "react";
import { Button } from "antd";

class WaterUsageReport extends React.Component {
  render() {
    // Thay đổi nội dung của biên bản tại đây
    return (
      <div style={{ display: "none" }}>
        <h1>Biên bản sử dụng nước</h1>
        <p>Thông tin khách hàng: {this.props.customerName}</p>
        <p>Địa chỉ: {this.props.address}</p>
        <p>Chỉ số cũ: {this.props.oldIndex}</p>
        <p>Chỉ số mới: {this.props.newIndex}</p>
        <p>Tiêu thụ: {this.props.newIndex - this.props.oldIndex} m3</p>
      </div>
    );
  }
}

class PrintButton extends React.Component {
  state = {
    // Dữ liệu của biên bản sử dụng nước
    reportData: {
      customerName: "Trần Thị B",
      address: "123 Đường ABC, Phường XYZ, Quận 1",
      oldIndex: 100,
      newIndex: 150,
    },
  };

  handlePrint = (record) => {
    // Xử lý in biên bản sử dụng nước
    // record chứa thông tin của hàng được chọn
    this.setState({
      reportData: {
        customerName: "Trần Thị B",
        address: "123 Đường ABC, Phường XYZ, Quận 1",
        oldIndex: 100,
        newIndex: 150,
      },
    });
  };

  render() {
    return (
      <>
        <ReactToPrint
          trigger={() => (
            <Button icon={<PrinterOutlined />} onClick={this.handlePrint}>
              In
            </Button>
          )}
          content={() => this.componentRef}
        />
        <WaterUsageReport
          ref={(el) => (this.componentRef = el)}
          {...this.state.reportData}
        />
      </>
    );
  }
}

export default PrintButton;
