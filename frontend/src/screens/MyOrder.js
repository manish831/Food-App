import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          {orderData && orderData.order_data && orderData.order_date ? (
            orderData.order_data.map((orderArray, index) => (
              <div key={index} className="m-auto mt-5">
                {orderArray.map((item, itemIndex) => (
                  <div key={itemIndex} className="col-12 col-md-6 col-lg-3">
                    <div
                      className="card mt-3"
                      style={{ width: "16rem", maxHeight: "360px" }}
                    >
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "120px", objectFit: "fill" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div
                          className="container w-100 p-0"
                          style={{ height: "38px" }}
                        >
                          <span className="m-1">{item.qty}</span>
                          <span className="m-1">{item.size}</span>
                          <span className="m-1">
                            {orderData.order_date[itemIndex].Order_date}
                          </span>
                          <div className="d-inline ms-2 h-100 w-20 fs-5">
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <hr />
              </div>
            ))
          ) : (
            <p>No order data available.</p>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
