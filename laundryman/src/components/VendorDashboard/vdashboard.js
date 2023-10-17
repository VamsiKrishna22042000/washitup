import { useEffect, useState } from "react";
import "../Admindashboard/admin.css";

import { TailSpin } from "react-loader-spinner";
import { OrderChart } from "../Admindashboard/chart";

import Cookies from "js-cookie";

const Dashboard = () => {
  /**State used to store the dashboard data obtained for getDashboardData function*/
  const [dashboardData, setDashBoardData] = useState([]);
  const [revenueData, setRevenueData] = useState({
    todayRevenue: 0,
    totalRevenue: 0,
  });

  const [load, setLoad] = useState(true);

  useEffect(() => {
    getVendorData();
  }, []);

  /**Function to get all the dashboard Data */
  const getVendorData = async () => {
    const url = `${
      process.env.REACT_APP_ROOT_URL
    }/api/admin/getVendorById/${Cookies.get("jwt_vendorId")}`;

    const vendorObtained = await fetch(url);

    const data = await vendorObtained.json();

    if (vendorObtained.ok) {
      console.log(data);
      setRevenueData({
        todayRevenue: data.todayRevenue,
        totalRevenue: data.lifetimeRevenue,
      });
      setDashBoardData({
        totalSale: data.lifetimeRevenue,
        totalOrders: data.totalOrders,
        thirtyDaysRevenue: data.thirtyDaysRevenue,
        fiftDaysRevenue: data.fiftDaysRevenue,
        sevenDayRevenue: data.sevenDayRevenue,
        activeOrdersCount: data.activeCount,
        cancelCount: data.cancelCount,
        completedOrdersCount: data.completeCount,
        inProgressCount: data.inProgressCount,
      });
      setLoad(false);
    } else {
      window.location.herf = "/vendordashboard";
    }
  };

  return !load ? (
    <>
      <section className="dashboard-body">
        <div style={{ height: "40%" }} className="total-orders-card">
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
            {/**{dashboardData.totalSale > 1000 &&
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
              )}*/}
            <h4 style={{ color: "#6759ff" }}>₹ {dashboardData.totalSale}</h4>
          </div>
        </div>

        <div
          style={{
            height: "40%",
          }}
          className="total-orders-card"
        >
          {/**Total Orders obtained From the dashboardData state  */}
          <h5>Total Orders</h5>
          <div style={{ display: "flex", height: "80%", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                display: "flex",
                height: "80%",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
                left: "45%",
                top: "-25%",
              }}
            >
              {/**{dashboardData.totalOrders > 1000 &&
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
                )}*/}
              <h4 style={{ color: "#6759ff" }}>{dashboardData.totalOrders}</h4>
            </div>
            <div
              style={{
                marginTop: "10%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  height: "10%",
                  width: "40%",

                  display: "felx",
                  justifyContent: "space-between",
                }}
                className="active-orders"
              >
                <p>Active</p>
                {dashboardData.activeOrdersCount > 1000 &&
                dashboardData.activeOrdersCount < 100000 ? (
                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
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
                    }}
                  >
                    {parseInt(dashboardData.activeOrdersCount) / 100000} L
                  </p>
                ) : dashboardData.activeOrdersCount > 1000000 ? (
                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {parseInt(dashboardData.activeOrdersCount) / 1000000} M
                  </p>
                ) : (
                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {dashboardData.activeOrdersCount}
                  </p>
                )}
              </div>
              <div
                style={{
                  height: "10%",
                  width: "40%",

                  display: "felx",
                  justifyContent: "space-between",
                }}
                v
                className="active-orders"
              >
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
              <div
                style={{
                  height: "10%",
                  width: "40%",

                  display: "felx",
                  justifyContent: "space-between",
                }}
                className="active-orders"
              >
                <p>Inprogress</p>
                {dashboardData.inProgressCount > 1000 &&
                dashboardData.inProgressCount < 100000 ? (
                  <p
                    style={{
                      color: "#6759ff",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    {parseInt(dashboardData.inProgressCount) / 1000} K
                  </p>
                ) : dashboardData.inProgressCount > 100000 &&
                  dashboardData.inProgressCount < 1000000 ? (
                  <p
                    style={{
                      color: "#6759ff",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    {parseInt(dashboardData.inProgressCount) / 100000} L
                  </p>
                ) : dashboardData.inProgressCount > 1000000 ? (
                  <p
                    style={{
                      color: "#6759ff",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    {parseInt(dashboardData.inProgressCount) / 1000000} M
                  </p>
                ) : (
                  <p
                    style={{
                      color: "#6759ff",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    {dashboardData.inProgressCount}
                  </p>
                )}
              </div>
              <div
                style={{
                  height: "10%",
                  width: "40%",

                  display: "felx",
                  justifyContent: "space-between",
                }}
                className="active-orders"
              >
                <p>Cancel</p>
                {dashboardData.cancelCount > 1000 &&
                dashboardData.cancelCount < 100000 ? (
                  <p
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    {parseInt(dashboardData.cancelCount) / 1000} K
                  </p>
                ) : dashboardData.cancelCount > 100000 &&
                  dashboardData.cancelCount < 1000000 ? (
                  <p
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    {parseInt(dashboardData.cancelCount) / 100000} L
                  </p>
                ) : dashboardData.cancelCount > 1000000 ? (
                  <p
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    {parseInt(dashboardData.cancelCount) / 1000000} M
                  </p>
                ) : (
                  <p
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    {dashboardData.cancelCount}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <section className="pie-charts">
          <div style={{ width: "300px", height: "300px" }}>
            <OrderChart data={dashboardData} />
          </div>
          <div style={{ width: "300px", height: "300px" }}>
            <OrderChart data={revenueData} />
          </div>
        </section>
      </section>
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
