import "../LaundryMain/index.css";

import "./lastsection.css";

import { AiOutlineInstagram } from "react-icons/ai";

import { FaFacebook } from "react-icons/fa";

import { AiFillTwitterCircle } from "react-icons/ai";

/**Last component that show's the washitup related static data and the social media icons related to washitup */
const Lastsetion = () => {
  return (
    <div className="footer-container">
      <div className="footer-first-con">
        <p>Unlock Top-Tier Laundry Care Reserve Our Services Today!</p>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            document
              .getElementById("home")
              .scrollIntoView({ behavior: "smooth" });
          }}
          type="button"
        >
          Book Now
        </button>
        <img src="./purplelastsection.png" alt="purplesvg" />
      </div>
      <div className="footer-second-con">
        <div>
          <div className="contact-section-con">
            <div>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.href = "/";
                }}
                src="/washituplogo.png"
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit, sed do eiusmod tempor incididunt
                <br />
                ut labore et dolore magna aliqua.
              </p>
              <p id="subscribe-para">Subscribe to get latest news</p>
              <div className="subscribe-email">
                <input id="email" type="text" placeholder="Email address" />
                <button style={{ cursor: "pointer" }}>Subscribe</button>
              </div>
              <div className="subscribe-icons-con">
                <FaFacebook
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/washitup.in",
                      "_blank"
                    );
                  }}
                />
                <AiOutlineInstagram
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/washitup.in/",
                      "_blank"
                    );
                  }}
                />
                <AiFillTwitterCircle
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open("https://twitter.com/washitup_in", "_blank");
                  }}
                />
              </div>
            </div>
            <div className="footer-subsection">
              <div id="items-subs1" style={{ cursor: "pointer" }}>
                <h1 style={{ cursor: "pointer" }}>Company</h1>
                <p
                  onClick={() => {
                    window.location.href = "/about";
                  }}
                  style={{ cursor: "pointer" }}
                >
                  About Us
                </p>
                <p style={{ cursor: "pointer" }}>Meet the team</p>
                <p style={{ cursor: "pointer" }}>News & media</p>
                <p style={{ cursor: "pointer" }}>Our projects</p>
                <p style={{ cursor: "pointer" }}>Contact us</p>
              </div>
              <div id="items-subs2" style={{ cursor: "pointer" }}>
                <h1 style={{ cursor: "pointer" }}>Services</h1>
                <p
                  onClick={() => {
                    window.location.href = "/apply/delivery";
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Drive for Us
                </p>
                <p
                  onClick={() => {
                    window.location.href = "/apply/vendor";
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Join Our Vendor Network
                </p>
                <p style={{ cursor: "pointer" }}>Carrers</p>
                <p style={{ cursor: "pointer" }}>Lorem ipsum</p>
                <p style={{ cursor: "pointer" }}>Lorem ipsum</p>
              </div>
              <div id="items-subs3" style={{ cursor: "pointer" }}>
                <h1 style={{ cursor: "pointer" }}>Support</h1>
                <p style={{ cursor: "pointer" }}>Terms & Conditions</p>
                <p style={{ cursor: "pointer" }}>Shipping Policy</p>
                <p style={{ cursor: "pointer" }}>Delivary Tips</p>
                <p style={{ cursor: "pointer" }}>Returns</p>
                <p style={{ cursor: "pointer" }}>Lorem ipsum</p>
              </div>
            </div>
          </div>
          <div className="copy-rights" style={{ cursor: "pointer" }}>
            <p
              onClick={() => {
                window.open("https://ioninks.com/", "_blank");
              }}
            >
              © 2023 All Rights Reserved, By IonInks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lastsetion;
