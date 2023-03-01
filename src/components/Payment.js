import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
const generatePayload = require('promptpay-qr')

export default function Payment() {
  const phoneNumber = ("097-265-4762");
  const amount =(1.0);
  const [qrCode, setqrCode] = useState("");
  
  // Function to handle payment processing
  function handleQR() {
    setqrCode(generatePayload(phoneNumber, { amount }));
  }
  useEffect(()=> {
    handleQR();

    },[])
  
 

  return (
    <React.Fragment>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <QRCode value={qrCode} />
    </div>
  </React.Fragment>
  );
}
