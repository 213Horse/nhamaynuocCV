import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";

export function Printer({ data }) {
  useEffect(() => {
    let dialog = document.getElementById("dialog-printer");
    let message = document.getElementById("message-printer");
    let printButton = document.getElementById("print-printer");
    let printCharacteristic;

    function handleError(error) {
      console.log(error);
      printCharacteristic = null;
      dialog.open();
    }
    function sendTextData() {
      const centerAlign = "\x1B\x61\x01"; // ESC a 1 (center align)
      const lineFeed = "\n";
      const fontSize = "\x1D\x21\x01"; // GS ! 1 (select font size)
      const smallSize = "\x1D\x21\x01";
      const normalSize = "\x1D\x21\x00";

      const vietnameseText = `
        ${centerAlign}${normalSize}
        Cong ty Co phan Xay dung va CN moi truong Viet Nam
        ${
          data.trangThaiThanhToan === "chuathanhtoan"
            ? "BIEN NHAN DA THANH TOAN TIEN NUOC"
            : "GIAY BAO TIEN NUOC"
        }
        ${normalSize}
        Dia chi: ${data.diaChi}
        Tieu thu: ${data.tieuThu}
        <div style="display: flex;">
        Chi so cu: ${data.chiSoDongHo.chiSoCu} Chi so moi: ${
        data.chiSoDongHo.chiSoMoi
      }
      </div>
        So luong: ${data.tieuThu}
        Thanh tien: ${data.tongTienTruocVat.toLocaleString()}
        Thue GTGT: ${data.vat.toLocaleString()}
        ${lineFeed}${lineFeed}`;
      const element = document.createElement("div");
      element.innerHTML = vietnameseText;

      const latinText = convertToLatin(vietnameseText);

      // Convert the Latin text to UTF-8 encoded bytes
      const encoder = new TextEncoder("utf-8");
      const textBytes = encoder.encode(latinText);

      return printCharacteristic
        .writeValueWithResponse(textBytes.buffer)
        .then(() => {
          console.log("Write done.");
        })
        .catch(handleError);
    }

    // Custom function to convert Vietnamese characters to Latin
    function convertToLatin(text) {
      const vietnameseMap = {
        à: "a",
        á: "a",
        ả: "a",
        ã: "a",
        ạ: "a",
        ă: "a",
        ằ: "a",
        ắ: "a",
        ẳ: "a",
        ẵ: "a",
        ặ: "a",
        â: "a",
        ầ: "a",
        ấ: "a",
        ẩ: "a",
        ẫ: "a",
        ậ: "a",
        è: "e",
        é: "e",
        ẻ: "e",
        ẽ: "e",
        ẹ: "e",
        ê: "e",
        ề: "e",
        ế: "e",
        ể: "e",
        ễ: "e",
        ệ: "e",
        ì: "i",
        í: "i",
        ỉ: "i",
        ĩ: "i",
        ị: "i",
        ò: "o",
        ó: "o",
        ỏ: "o",
        õ: "o",
        ọ: "o",
        ô: "o",
        ồ: "o",
        ố: "o",
        ổ: "o",
        ỗ: "o",
        ộ: "o",
        ơ: "o",
        ờ: "o",
        ớ: "o",
        ở: "o",
        ỡ: "o",
        ợ: "o",
        ù: "u",
        ú: "u",
        ủ: "u",
        ũ: "u",
        ụ: "u",
        ư: "u",
        ừ: "u",
        ứ: "u",
        ử: "u",
        ữ: "u",
        ự: "u",
        ỳ: "y",
        ý: "y",
        ỷ: "y",
        ỹ: "y",
        ỵ: "y",
        đ: "d",
        Đ: "D",
      };

      return text
        .split("")
        .map((char) => vietnameseMap[char] || char)
        .join("");
    }
    function sendPrinterData() {
      sendTextData().catch(handleError);
    }

    function pressPrintButton() {
      if (printCharacteristic == null) {
        if (navigator.bluetooth) {
          navigator.bluetooth
            .requestDevice({
              filters: [
                {
                  services: ["000018f0-0000-1000-8000-00805f9b34fb"],
                },
              ],
            })
            .then((device) => {
              console.log("> Found " + device.name);
              console.log("Connecting to GATT Server...");
              return device.gatt.connect();
            })
            .then((server) =>
              server.getPrimaryService("000018f0-0000-1000-8000-00805f9b34fb")
            )
            .then((service) =>
              service.getCharacteristic("00002af1-0000-1000-8000-00805f9b34fb")
            )
            .then((characteristic) => {
              // Cache the characteristic
              printCharacteristic = characteristic;
              sendPrinterData();
            })
            .catch(handleError);
        } else {
          alert(
            "Web Bluetooth API is not available.\n" +
              "Please make sure the Web Bluetooth flag is enabled."
          );
        }
      } else {
        sendPrinterData();
      }
    }

    printButton.addEventListener("click", pressPrintButton);

    return () => {
      printButton.removeEventListener("click", pressPrintButton);
    };
  }, []);
  return (
    <div id="cards">
      <paper-card style={{ display: "flex", justifyContent: "center" }}>
        <div className="card-content">
          <paper-button id="print-printer" raised className="colorful">
            Print
          </paper-button>
        </div>
      </paper-card>

      <paper-dialog id="dialog-printer">
        <h2>Error</h2>
        <p>Could not connect to bluetooth device!</p>
      </paper-dialog>
    </div>
  );
}
