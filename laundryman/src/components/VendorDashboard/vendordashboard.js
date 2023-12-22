import "./vendordashboard.css";

import "../Admindashboard/admin.css";

import "../Admindashboard/chart.js";

import Cookies from "js-cookie";

import { CgProfile } from "react-icons/cg";

import Dashboard from "./vdashboard.js";

import VOrders from "./vorders.js";

import { useState } from "react";

const availableSection = [
  {
    imgUrl1: "/dashboard1.png",
    imgUrl2: "/dashboard2.png",
    section: "Dashboard",
  },
  {
    imgUrl1: "/order1.png",
    imgUrl2: "/order2.png",
    section: "Orders",
  },
];

const VendorDashboard = () => {
  /**State used to store the section selected and display the component related to the selected section*/
  const [selectedSection, setSection] = useState("Dashboard");

  return (
    <>
      <div className="vendortotal-dashboard-container">
        {/**side box used to display the available sections form the variable available section*/}
        <aside className="aside-board">
          <img
            onClick={() => {
              window.location.href = "/";
            }}
            className="aside-logo"
            src="/washituplogo.png"
            alt="dashboard-logo"
          />
          <section className="section-in-aside-dashboard">
            {availableSection.map((each) => (
              <div
                onClick={() => {
                  setSection(each.section);
                }}
                key={each.section}
                className={
                  selectedSection === each.section
                    ? "each-section-1"
                    : "each-section-2"
                }
              >
                <img
                  className="each-section-logo"
                  src={
                    selectedSection === each.section
                      ? each.imgUrl1
                      : each.imgUrl2
                  }
                  alt="dashboard"
                />
                <h5>{each.section}</h5>
              </div>
            ))}
          </section>
        </aside>
        <div className="header-body">
          {/**Header box which shows the admin name */}
          <header className="dashboard-header">
            <h5 style={{ color: "#53545c", marginLeft: "3%" }}>Dashboard</h5>
            <div
              style={{
                display: "flex",
                color: "#53545C",
                marginRight: "5%",
                width: "auto",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <select className="header-select">
                <option>{Cookies.get("jwt_vendorName")}</option>
              </select>
              <h4>
                <CgProfile />
              </h4>
              <button
                onClick={() => {
                  Cookies.remove("jwt_vendorName");
                  Cookies.remove("jwt_vendorNumber");
                  Cookies.remove("jwt_vendorId");
                  window.location.href = "/vendordashboard";
                }}
                type="button"
                style={{
                  borderWidth: 0,
                  width: "8vw",
                  marginLeft: "5%",
                  color: "#fff",
                  backgroundColor: "#6759ff",
                  borderRadius: "7px",
                  padding: ".3rem .4rem",
                }}
              >
                Log Out
              </button>
            </div>
          </header>
          {/**Ternary operators used to display the component's based onthe selected section*/}
          {selectedSection === "Dashboard" ? <Dashboard /> : <VOrders />}
        </div>
      </div>
      <div className="vendortotal-dashboard-container2">
        <p>Open Vendor Dashboard in Laptop or PC</p>
      </div>
    </>
  );
};

export default VendorDashboard;
