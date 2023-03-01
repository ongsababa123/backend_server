import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

export default function RandomNumberGenerator() {
  const [randomNumber, setRandomNumber] = useState("");

  function handleGenerateNumber() {
    const newNumber = Math.floor(Math.random() * 100000);
    setRandomNumber(newNumber.toString().padStart(5, "0"));
  }
  useEffect(() => {
    handleGenerateNumber();
  }, []);
  return (
    <React.Fragment>
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <p>Room Password : {randomNumber}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <QRCode value={randomNumber} />
      </div>
    </React.Fragment>
  );
}
