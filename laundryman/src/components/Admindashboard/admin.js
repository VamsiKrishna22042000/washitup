import "./admin.css";

import { useState } from "react";

import Dashboard from "./dashboard";

import { CgProfile } from "react-icons/cg";

import Orders from "./orders";

import Customers from "./customer";

import Services from "./services";

import Vendors from "./vendor";

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
  {
    imgUrl1: "/service1.png",
    imgUrl2: "/service2.png",
    section: "Services",
  },
  {
    imgUrl1: "/customer1.png",
    imgUrl2: "/customer2.png",
    section: "Customers",
  },
  {
    imgUrl1: "/vendor1.png",
    imgUrl2: "/vendor2.png",
    section: "Vendors",
  },
];

const AdminDashboard = () => {
  const [selectedSection, setSection] = useState("Dashboard");

  return (
    <div className="total-dashboard-container">
      <aside className="aside-board">
        <img
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
                  selectedSection === each.section ? each.imgUrl1 : each.imgUrl2
                }
                alt="dashboard"
              />
              <h5>{each.section}</h5>
            </div>
          ))}
        </section>
      </aside>
      <div className="header-body">
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
              <option>Vamsi</option>
            </select>
            <h4>
              <CgProfile />
            </h4>
          </div>
        </header>
        {selectedSection === "Dashboard" ? (
          <Dashboard />
        ) : selectedSection === "Orders" ? (
          <Orders />
        ) : selectedSection === "Services" ? (
          <Services />
        ) : selectedSection === "Customers" ? (
          <Customers />
        ) : (
          <Vendors />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
