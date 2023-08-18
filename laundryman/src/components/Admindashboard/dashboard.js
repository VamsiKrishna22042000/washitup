import "./admin.css";

const Dashboard = (props) => {
  return (
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
          <h4 style={{ color: "#6759ff" }}>0</h4>
        </div>
      </div>
      <div className="total-orders-card">
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
          <h4 style={{ color: "#6759ff" }}>0</h4>
        </div>
      </div>
      <div className="total-orders-card">
        <h5>Total Orders</h5>
        <div style={{ display: "flex", height: "80%" }}>
          <div className="active-orders">
            <p>Active</p>
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                marginLeft: "3%",
              }}
            >
              0
            </p>
          </div>
          <div className="active-orders">
            <p>Completed</p>
            <p style={{ color: "red", fontWeight: "bold", marginLeft: "3%" }}>
              0
            </p>
          </div>
        </div>
      </div>
      <div className="total-orders-card">
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
          <h4 style={{ color: "#6759ff" }}>0</h4>
        </div>
      </div>
      <div className="total-orders-card">
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
          <h4 style={{ color: "#6759ff" }}>0</h4>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
