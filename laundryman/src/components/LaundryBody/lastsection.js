import "../LaundryMain/index.css";

import { AiOutlineInstagram } from "react-icons/ai";

import { FaFacebook } from "react-icons/fa";

import { AiFillTwitterCircle } from "react-icons/ai";

import { useEffect } from "react";

/**Last component that show's the washitup related static data and the social media icons related to washitup */
const Lastsetion = () => {
  return (
    <div className="background4">
      <div className="services-section">
        <p className="lastsection-para">
          Unlock Top-Tier Laundry Care Reserve Our Services Today!
        </p>
        <button
          style={{ cursor: "pointer" }}
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
              <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.href = "/";
                }}
                src="/washituplogo.png"
                className="subshead"
              />
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
                <button style={{ cursor: "pointer" }} className="b5butt">
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
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/washitup.in",
                      "_blank"
                    );
                  }}
                  className="last-section-icons1"
                />
                <AiOutlineInstagram
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/washitup.in/",
                      "_blank"
                    );
                  }}
                  className="last-section-icons"
                />
                <AiFillTwitterCircle
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open("https://twitter.com/washitup_in", "_blank");
                  }}
                  className="last-section-icons"
                />
              </div>
            </div>
            <div className="sar">
              <div style={{ cursor: "pointer" }} className="services">
                <h1 style={{ cursor: "pointer" }} className="b5head">
                  Company
                </h1>
                <p style={{ cursor: "pointer" }}>About Us</p>
                <p style={{ cursor: "pointer" }}>Meet the team</p>
                <p style={{ cursor: "pointer" }}>News & media</p>
                <p style={{ cursor: "pointer" }}>Our projects</p>
                <p style={{ cursor: "pointer" }}>Contact us</p>
              </div>
              <div style={{ cursor: "pointer" }} className="services">
                <h1 style={{ cursor: "pointer" }} className="b5head">
                  Services
                </h1>
                <p style={{ cursor: "pointer" }}>Lorem ipsum</p>
                <p style={{ cursor: "pointer" }}>Lorem ipsum</p>
                <p style={{ cursor: "pointer" }}>Lorem ipsum</p>
                <p style={{ cursor: "pointer" }}>Lorem ipsum</p>
              </div>
              <div style={{ cursor: "pointer" }} className="services">
                <h1 style={{ cursor: "pointer" }} className="b5head">
                  Support
                </h1>
                <p style={{ cursor: "pointer" }}>Terms & Conditions</p>
                <p style={{ cursor: "pointer" }}>Shipping Policy</p>
                <p style={{ cursor: "pointer" }}>Delivary Tips</p>
                <p style={{ cursor: "pointer" }}>Returns</p>
              </div>
            </div>
          </div>
          <div style={{ cursor: "pointer" }} className="last-3">
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
