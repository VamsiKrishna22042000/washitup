import { useEffect, useState } from "react";
import "./admin.css";

import { TailSpin } from "react-loader-spinner";

const Dashboard = () => {
  /**State used to store the dashboard data obtained for getDashboardData function*/
  const [dashboardData, setDashBoardData] = useState([]);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    getDashboardData();
  }, []);

  /**Function to get all the dashboard Data */
  const getDashboardData = async () => {
    const url = "https://washitup.onrender.com/api/admin/getAllCounts";

    const respone = await fetch(url);

    const data = await respone.json();

    if (respone.ok) {
      console.log(data);
      setDashBoardData(data.data);
      setLoad(false);
    }
  };

  return !load ? (
    <section className="dashboard-body">
      <div className="total-orders-card">
        <h5>Total Sales</h5>
        <div
          style={{
            display: "flex",
            height: "80%",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/**Total Sale obtained From the dashboardData state  */}
          {dashboardData.totalSale > 1000 &&
          dashboardData.totalSale < 100000 ? (
            <h4 style={{ color: "#6759ff" }}>
              ₹ {parseInt(dashboardData.totalSale) / 1000} K
            </h4>
          ) : dashboardData.totalSale > 100000 &&
            dashboardData.totalSale < 1000000 ? (
            <h4 style={{ color: "#6759ff" }}>
              ₹ {parseInt(dashboardData.totalSale) / 100000} L
            </h4>
          ) : dashboardData.totalSale > 1000000 ? (
            <h4 style={{ color: "#6759ff" }}>
              ₹ {parseInt(dashboardData.totalSale) / 1000000} M
            </h4>
          ) : (
            <h4 style={{ color: "#6759ff" }}>₹ {dashboardData.totalSale}</h4>
          )}
        </div>
      </div>
      <div className="total-orders-card">
        {/**Total Items obtained From the dashboardData state  */}
        <h5>Total Items</h5>
        <div
          style={{
            display: "flex",
            height: "80%",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {dashboardData.items > 1000 && dashboardData.items < 100000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.items) / 1000} K
            </h4>
          ) : dashboardData.items > 100000 && dashboardData.items < 1000000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.items) / 100000} L
            </h4>
          ) : dashboardData.items > 1000000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.items) / 1000000} M
            </h4>
          ) : (
            <h4 style={{ color: "#6759ff" }}>{dashboardData.items}</h4>
          )}
        </div>
      </div>
      <div className="total-orders-card">
        {/**Total Orders obtained From the dashboardData state  */}
        <h5>Total Orders</h5>
        <div style={{ display: "flex", height: "80%" }}>
          <div className="active-orders">
            <p>Active</p>
            {dashboardData.activeOrdersCount > 1000 &&
            dashboardData.activeOrdersCount < 100000 ? (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginLeft: "3%",
                }}
              >
                {parseInt(dashboardData.activeOrdersCount) / 1000} K
              </p>
            ) : dashboardData.activeOrdersCount > 100000 &&
              dashboardData.activeOrdersCount < 1000000 ? (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginLeft: "3%",
                }}
              >
                {parseInt(dashboardData.activeOrdersCount) / 100000} L
              </p>
            ) : dashboardData.activeOrdersCount > 1000000 ? (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginLeft: "3%",
                }}
              >
                {parseInt(dashboardData.activeOrdersCount) / 1000000} M
              </p>
            ) : (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginLeft: "3%",
                }}
              >
                {dashboardData.activeOrdersCount}
              </p>
            )}
          </div>
          <div className="active-orders">
            <p>Completed</p>
            {dashboardData.completedOrdersCount > 1000 &&
            dashboardData.completedOrdersCount < 100000 ? (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: "3%",
                }}
              >
                {parseInt(dashboardData.completedOrdersCount) / 1000} K
              </p>
            ) : dashboardData.completedOrdersCount > 100000 &&
              dashboardData.completedOrdersCount < 1000000 ? (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: "3%",
                }}
              >
                {parseInt(dashboardData.completedOrdersCount) / 100000} L
              </p>
            ) : dashboardData.completedOrdersCount > 1000000 ? (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: "3%",
                }}
              >
                {parseInt(dashboardData.completedOrdersCount) / 1000000} M
              </p>
            ) : (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: "3%",
                }}
              >
                {dashboardData.completedOrdersCount}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="total-orders-card">
        {/**Total Customers obtained From the dashboardData state  */}
        <h5>Total Customers</h5>
        <div
          style={{
            display: "flex",
            height: "80%",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {dashboardData.customers > 1000 &&
          dashboardData.customers < 100000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.customers) / 1000} K
            </h4>
          ) : dashboardData.customers > 100000 &&
            dashboardData.customers < 1000000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.customers) / 100000} L
            </h4>
          ) : dashboardData.customers > 1000000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.customers) / 1000000} M
            </h4>
          ) : (
            <h4 style={{ color: "#6759ff" }}>{dashboardData.customers}</h4>
          )}
        </div>
      </div>
      <div className="total-orders-card">
        {/**Total Vendors obtained From the dashboardData state  */}
        <h5>Total Vendors</h5>
        <div
          style={{
            display: "flex",
            height: "80%",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {dashboardData.vendors > 1000 && dashboardData.vendors < 100000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.vendors) / 1000} K
            </h4>
          ) : dashboardData.vendors > 100000 &&
            dashboardData.vendors < 1000000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.vendors) / 100000} L
            </h4>
          ) : dashboardData.vendors > 1000000 ? (
            <h4 style={{ color: "#6759ff" }}>
              {parseInt(dashboardData.vendors) / 1000000} M
            </h4>
          ) : (
            <h4 style={{ color: "#6759ff" }}>{dashboardData.vendors}</h4>
          )}
        </div>
      </div>
    </section>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="order-body"
    >
      <TailSpin color="#6759ff" height={50} width={50} />
    </div>
  );
};

export default Dashboard;
