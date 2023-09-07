import React, { useEffect, useState } from "react";

function VendorDetails({ vendorId }) {
  const [vendorDetails, setVendorDetails] = useState(null);

  useEffect(() => {
    // Fetch vendor details using the vendorId
    fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/getVendorById/${vendorId}`
    )
      .then((response) => response.json())
      .then((data) => setVendorDetails(data))
      .catch((error) => console.error("Error fetching vendor details:", error));
  }, [vendorId]);

  if (!vendorDetails) {
    return <div>Loading vendor details...</div>;
  }

  if (vendorDetails) {
    console.log(vendorDetails, "ven");
  }

  const headingStyle = {
    fontSize: "24px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  const pStyle = {
    fontSize: "16px",
    margin: "10px 0",
  };

  return (
    <div>
      <h3 style={headingStyle}>Vendor Details</h3>
      <p style={pStyle}>
        <strong>Name:</strong> {vendorDetails?.data.name}
      </p>
      <p style={pStyle}>
        <strong>Address:</strong> {vendorDetails?.data.address}
      </p>
      <p style={pStyle}>
        <strong>Email:</strong> {vendorDetails?.data.email}
      </p>
      <p style={pStyle}>
        <strong>Location:</strong> {vendorDetails?.data.location}
      </p>
      <p style={pStyle}>
        <strong>Mobile Number:</strong> {vendorDetails?.data.mobileNumber}
      </p>
      <p style={pStyle}>
        <strong>Shop Name:</strong> {vendorDetails?.data.shopName}
      </p>
      <p style={pStyle}>
        <strong>Pin Code:</strong> {vendorDetails?.data.pinCode}
      </p>
      <p style={pStyle}>
        <strong>Fifty Days Revenue:</strong> {vendorDetails.fiftDaysRevenue}
      </p>
      <p style={pStyle}>
        <strong>Lifetime Revenue:</strong> {vendorDetails.lifetimeRevenue}
      </p>
      <p style={pStyle}>
        <strong>Seven Day Revenue:</strong> {vendorDetails.sevenDayRevenue}
      </p>
      <p style={pStyle}>
        <strong>Thirty Days Revenue:</strong> {vendorDetails.thirtyDaysRevenue}
      </p>
      <p style={pStyle}>
        <strong>Today Revenue:</strong> {vendorDetails.todayRevenue}
      </p>
      {/* 
    <h4 style={{ fontSize: '20px', marginTop: '20px' }}>Orders</h4>
    <ul>
      {vendorDetails.orders.map((order, index) => (
        <li key={index}>
       
        </li>
      ))}
    </ul> */}
    </div>
  );
}

export default VendorDetails;
