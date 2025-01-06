import React from "react";
import "../../assets/paymentsetup.css";

const PaymentSetup = () => {
  return (
    <div>
      <h2 className="section-title">Payment Setup</h2>
      <div className="payment-setup">
        <label>Registration Fee</label>
        <input className="payment" type="text" placeholder="Enter Registration Fee" />
      </div>
    </div>
  );
};

export default PaymentSetup;
