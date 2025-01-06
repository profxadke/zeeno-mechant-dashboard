import React, { useState } from "react";

const AdditionalOptions = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscounts, setPromoDiscounts] = useState("");
  const [groupTicketOptions, setGroupTicketOptions] = useState("");

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePromoDiscountsChange = (e) => {
    setPromoDiscounts(e.target.value);
  };

  const handleGroupTicketOptionsChange = (e) => {
    setGroupTicketOptions(e.target.value);
  };

  return (
    <div>
      <h2 className="section-title">Additional Options</h2>
      <div className="options-setup">
        <div className="form-grid">
          {/* Promo Code Field */}
          <div className="form-field">
            <label>Promo Code (If Available)</label>
            <input
              className="payment"
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
          </div>

          {/* Set Promo Discounts Field */}
          <div className="form-field">
            <label>Set Promo Discounts</label>
            <input
              className="payment"
              type="number"
              placeholder="Enter Promo Discount (%)"
              value={promoDiscounts}
              onChange={handlePromoDiscountsChange}
            />
          </div>

          {/* Choose Group Ticket Options Dropdown */}
          <div className="form-field">
            <label>Choose Group Ticket Options</label>
            <select
              className="payment"
              value={groupTicketOptions}
              onChange={handleGroupTicketOptionsChange}
            >
              <option value="">Select Group Option</option>
              <option value="Individual">Individual</option>
              <option value="Group Discount">Group Discount</option>
              <option value="VIP Package">VIP Package</option>
            </select>
          </div>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .section-title {
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
        }

        /* Options Setup box styling */
        .options-setup {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Grid Layout */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr; 
          gap: 15px;
        }

        .form-field {
          margin-bottom: 10px;
        }

        /* Input Styling */
        .payment {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }

        /* Optional: specific styling for select dropdown */
        .options-setup select.payment {
          width: 100%;
        }

        /* Ensure form fields are responsive on smaller screens */
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr; /* Single column for smaller screens */
          }
        }
      `}</style>
    </div>
  );
};

export default AdditionalOptions;
