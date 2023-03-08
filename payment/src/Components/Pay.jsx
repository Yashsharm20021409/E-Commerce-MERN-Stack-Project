import React from "react";
import StripeCheckout from "react-stripe-checkout";


const Pay = () => {
    const KEY = "pk_test_51Mj5ZDSAj0EIjVubJGOehQ8kTZes4xSWiUFqZcWmBf3yFoOn7flyyqZJFt3WxqEKIF07jA7EvSGWh6zlCnteBGWY00EfjfQ4SS"

    const onToken = (token)=>{
        console.log(token)
    }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <StripeCheckout
        name="Yash Shop"
        image="https://api.freelogodesign.org/assets/thumb/logo/6294672_400.png?t=637945524870000000"
        billingAddress
        shippingAddress
        description="Your Total is $100"
        amount={20000}
        token={onToken}
        stripeKey = {KEY}

      >
        <button
          style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
      
    </div>
  );
};

export default Pay;
