import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function App() {
  const [inputValue, setInputValue] = useState("");

  const download = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");

      // Name of the QR code image
      downloadLink.download = "MyQR.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="App" style={{ textAlign: "center", backgroundColor: "#f0f0f0", padding: "20px" }}>
      <h1>QR Code Generate and Download</h1>
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={inputValue}
          viewBox={`0 0 256 256`}
          id='QRCode'
        />
      </div>
      <p>{inputValue}</p>
      <input
        type='text'
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "80%", padding: "10px", marginTop: "10px" }}
        placeholder="Enter text"
      />
      <br />
      <button
      type='reset'
        onClick={download}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Click here to Download QR
      </button>
    </div>
  );
}

export default App;
