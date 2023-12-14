import "./excitingOffers.css";

/**Component that show's screen 4 to download the mobile app in the home page of the user */
const Alliphones = () => {
  return (
    <div className="all-phones-con-main-background">
      <div className="phones-all-con">
        <p>WashIt Up</p>
        <h1>Our Mobile App Coming Soon...</h1>
        <p>
          Our Cutting-Edge Mobile App Is on the Horizon! Stay Tuned for
          Effortless & Convenient Laundry Service at your Finger Tips.
        </p>
        <div>
          <button>
            <img src="/appstore.png" alt="appstore" />
          </button>
          <button>
            <img src="/playstore.png" alt="playstore" />
          </button>
        </div>
      </div>
      <img
        src="./all iphones.png"
        className="alliphone-image"
        alt="alliphones"
      />
    </div>
  );
};
export default Alliphones;
