import "./vendordashboard.js";

const VendorLogin = () => {
  return (
    <div className="vendorlogincon">
      <div className="vendor-card1">
        <img src="/washingload.gif" alt="washingload" />
      </div>

      <div className="vendor-card2">
        <div className="vendor-login-logo-card">
          <img className="login-logo" src="/logosymbol.png" alt="logo" />
          <h1 className="login-head">Login</h1>
          <p className="login-text">to get access to you dashboard</p>
          <div className="login-box">
            <p className="logo-para">Enter Phone Number</p>
            <input
              className="login-input"
              type="number"
              placeholder="Enter Mobile number"
            />
            <button className="button-login" type="button">
              Get Otp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
