import "./admin.css";

import { useState } from "react";

import Dashboard from "./dashboard";

import { CgProfile } from "react-icons/cg";

import Orders from "./orders";

import Customers from "./customer";

import Services from "./services";

import Vendors from "./vendor";

import Coupons from "./coupon";

import Driver from "./driver";

/**available Section is a variable used to show the section that are present in the dashboard */
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
  {
    imgUrl1: "/coupon1.png",
    imgUrl2: "/coupon2.png",
    section: "Coupons",
  },
  {
    imgUrl1: "/driver1.png",
    imgUrl2: "/driver2.png",
    section: "Driver",
  },
];

const AdminDashboard = () => {
  /**State used to store the section selected and display the component related to the selected section*/
  const [selectedSection, setSection] = useState("Dashboard");

  return (
    <div className="total-dashboard-container">
      {/**side box used to display the available sections form the variable available section*/}
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
              <option>Vamsi</option>
            </select>
            <h4>
              <CgProfile />
            </h4>
          </div>
        </header>
        {/**Ternary operators used to display the component's based onthe selected section*/}
        {selectedSection === "Dashboard" ? (
          <Dashboard />
        ) : selectedSection === "Orders" ? (
          <Orders />
        ) : selectedSection === "Services" ? (
          <Services />
        ) : selectedSection === "Customers" ? (
          <Customers />
        ) : selectedSection === "Vendors" ? (
          <Vendors />
        ) : selectedSection === "Coupons" ? (
          <Coupons />
        ) : (
          <Driver />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
