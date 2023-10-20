import "../LaundryMain/index.css";

import { AiOutlineInstagram } from "react-icons/ai";

import { FaFacebook } from "react-icons/fa";

import { AiFillTwitterCircle } from "react-icons/ai";

/**Last component that show's the washitup related static data and the social media icons related to washitup */
const Lastsetion = () => {
  return (
    <div className="background4">
      <div className="services-section">
        <p className="lastsection-para">
          Unlock Top-Tier Laundry Care Reserve Our Services Today!
        </p>
        <button
          onClick={() => {
            document
              .getElementById("home")
              .scrollIntoView({ behavior: "smooth" });
          }}
          type="button"
          className="buttons"
        >
          Book Now
        </button>
        <img className="purple" src="./purplelastsection.png" alt="purplesvg" />
      </div>
      <div className="card55">
        <div className="background5">
          <div className="contentb5">
            <div className="subscription">
              <img src="/washituplogo.png" className="subshead" />
              <p className="subspara">
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit, sed do eiusmod tempor incididunt
                <br />
                ut labore et dolore magna aliqua.
              </p>
              <p className="subsnews">Subscribe to get latest news</p>
              <div className="button-container-5">
                <input
                  id="email"
                  className="subsinput"
                  type="text"
                  placeholder="Email address"
                />
                <button className="b5butt">
                  Subscribe
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 1L7.3 8.7"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 1L10.1 15L7.3 8.7L1 5.9L15 1Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <FaFacebook
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/washitup.in",
                      "_blank"
                    );
                  }}
                  className="last-section-icons1"
                />
                <AiOutlineInstagram
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/washitup.in/",
                      "_blank"
                    );
                  }}
                  className="last-section-icons"
                />
                <AiFillTwitterCircle
                  onClick={() => {
                    window.open("https://twitter.com/washitup_in", "_blank");
                  }}
                  className="last-section-icons"
                />
              </div>
            </div>
            <div className="sar">
              <div className="services">
                <h1 className="b5head">Company</h1>
                <p>About Us</p>
                <p>Meet the team</p>
                <p>News & media</p>
                <p>Our projects</p>
                <p>Contact us</p>
              </div>
              <div className="services">
                <h1 className="b5head">Services</h1>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
                <p>Lorem ipsum</p>
              </div>
              <div className="services">
                <h1 className="b5head">Support</h1>
                <p>Terms & Conditions</p>
                <p>Shipping Policy</p>
                <p>Delivary Tips</p>
                <p>Returns</p>
              </div>
            </div>
          </div>
          <div className="last-3">
            © 2022 Laundry Shop, All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lastsetion;
