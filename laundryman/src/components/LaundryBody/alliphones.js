import "../LaundryMain/index.css";

/**Component that show's screen 4 to download the mobile app in the home page of the user */
const Alliphones = () => {
  return (
    <div className="alliphones">
      <div className="back3-content">
        <p className="b3para">WashIt Up</p>
        <h1 className="b3head">Our Mobile App Coming Soon...</h1>
        <p className="b3des">
          Our Cutting-Edge Mobile App Is on the Horizon! Stay Tuned for
          Effortless & Convenient Laundry Service at your Finger Tips.
        </p>
        <div className="b33">
          <button className="b3butt">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "5px" }}
              src="/appstore.png"
              alt="appstore"
            />
          </button>
          <button className="b3butt">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "5px" }}
              src="/playstore.png"
              alt="playstore"
            />
          </button>
        </div>
      </div>
      <img src="./all iphones.png" className="iphoness" alt="alliphones" />
    </div>
  );
};
export default Alliphones;
