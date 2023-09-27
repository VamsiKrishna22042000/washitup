import { useEffect, useState } from "react";
import "./admin.css";

import { TailSpin } from "react-loader-spinner";
import { OrderChart } from "./chart";

const Dashboard = () => {
  /**State used to store the dashboard data obtained for getDashboardData function*/
  const [dashboardData, setDashBoardData] = useState([]);
  const [revenueData, setRevenueData] = useState({
    todayRevenue: 0,
    totalRevenue: 0,
  });

  const [load, setLoad] = useState(true);

  useEffect(() => {
    getDashboardData();
  }, []);

  /**Function to get all the dashboard Data */
  const getDashboardData = async () => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllCounts`;

      const respone = await fetch(url);

      const data = await respone.json();

      if (respone.ok) {
        // console.log(data,"dataaa");
        setDashBoardData(data.data);
        setLoad(false);
      }
      const revenueUrl = `${process.env.REACT_APP_ROOT_URL}/api/admin/totalRevenue`;
      const revenueResponse = await fetch(revenueUrl);
      const revenueData = await revenueResponse.json();

      if (revenueResponse.ok) {
        // console.log(revenueData.data[0].total,"rev")
        setRevenueData((prevData) => ({
          ...prevData,
          totalRevenue: revenueData.data[0].total,
        }));
      }
      const todayRevenueUrl = `${process.env.REACT_APP_ROOT_URL}/api/admin/todayRevenue`;
      const todayRevenueResponse = await fetch(todayRevenueUrl);
      const todayRevenueData = await todayRevenueResponse.json();

      if (todayRevenueResponse.ok) {
        // console.log(todayRevenueData.todaySale, "reve")
        setRevenueData((prevData) => ({
          ...prevData,
          todayRevenue: todayRevenueData.todaySale,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return !load ? (
    <>
      <div style={{ overflowY: "scroll" }}>
        <section style={{ overflowY: "scroll" }} className="dashboard-body">
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
                <h4 style={{ color: "#6759ff" }}>
                  ₹ {dashboardData.totalSale}
                </h4>
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
              ) : dashboardData.items > 100000 &&
                dashboardData.items < 1000000 ? (
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
            <div
              style={{ display: "flex", height: "80%", position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  height: "80%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexWrap: "wrap",
                  left: "45%",
                  top: "-20%",
                }}
              >
                {dashboardData.totalOrders > 1000 &&
                dashboardData.totalOrders < 100000 ? (
                  <h4 style={{ color: "#6759ff" }}>
                    {parseInt(dashboardData.totalOrders) / 1000} K
                  </h4>
                ) : dashboardData.totalOrders > 100000 &&
                  dashboardData.totalOrders < 1000000 ? (
                  <h4 style={{ color: "#6759ff" }}>
                    {parseInt(dashboardData.totalOrders) / 100000} L
                  </h4>
                ) : dashboardData.totalOrders > 1000000 ? (
                  <h4 style={{ color: "#6759ff" }}>
                    {parseInt(dashboardData.totalOrders) / 1000000} M
                  </h4>
                ) : (
                  <h4 style={{ color: "#6759ff" }}>
                    {dashboardData.totalOrders}
                  </h4>
                )}
              </div>
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
              {dashboardData.vendors > 1000 &&
              dashboardData.vendors < 100000 ? (
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

        <section
          style={{
            backgroundColor: "#e8e6ff",
            display: "flex",
            justifyContent: "center",
            marginBottom: "-90px",
            padding: "20px 0",
          }}
        >
          <div style={{ width: "300px", height: "300px" }}>
            <OrderChart data={dashboardData} />
          </div>
          <div style={{ width: "300px", height: "300px" }}>
            <OrderChart data={revenueData} />
          </div>
        </section>
      </div>
    </>
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
