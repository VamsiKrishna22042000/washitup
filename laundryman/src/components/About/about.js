import "../LaundryMain/index.css";

import "../MyProfile/myprofile.css";

import { AiOutlineInstagram } from "react-icons/ai";

import { FaFacebook } from "react-icons/fa";

import { AiFillTwitterCircle } from "react-icons/ai";

import "./about.css";

import Cookies from "js-cookie";

import { useState } from "react";

const About = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  const navcontentshamberger = () => {
    setShowNavBar(!showNavBar);
  };

  return (
    <div className="about-us">
      <div
        style={{ backgroundColor: "#ffffff" }}
        className="bar-nav"
        bg="#b8dde3"
        variant="light"
      >
        <div className="nav-bar-contents">
          <img
            style={{
              cursor: "pointer",
              marginRight: "28%",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
            href="#logo"
            src="./washituplogo.png"
            alt="Main Logo"
          />
          <p
            onClick={() => {
              window.location.href = "/";
            }}
            className="home"
          >
            Home
          </p>
          <p
            onClick={() => {
              window.location.href = "/about";
            }}
          >
            About Us
          </p>
          <p href="#pricing">Blog</p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              Cookies.get("jwt_userId") !== undefined
                ? (window.location.href = "/myorders")
                : (window.location.href = "/userlogin");
            }}
            href="#myorders"
          >
            My Orders
          </p>
          {Cookies.get("jwt_userId") !== undefined ? (
            <button
              style={{ cursor: "pointer" }}
              type="button"
              onClick={() => {
                Cookies.remove("jwt_userToken");
                Cookies.remove("jwt_userId");
                Cookies.remove("jwt_userName");
                Cookies.remove("jwt_mobileNumber");
                // Cookies.remove("jwt_adminLogin");
                Cookies.remove("jwt_dono");
                Cookies.remove("jwt_landmark");
                Cookies.remove("jwt_location");
                window.location.href = "/";
              }}
            >
              Log Out
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                window.location.href = "/userlogin";
              }}
            >
              Log In
            </button>
          )}
        </div>
        {showNavBar && (
          <div
            id="nav-bar-id"
            className={
              showNavBar
                ? "nav-bar-contents-mobile"
                : "nav-bar-contents-mobile1"
            }
          >
            <button
              onClick={navcontentshamberger}
              className="cross-mark-nav-bar"
            >
              ✖
            </button>
            <img
              style={{ visibility: "hidden" }}
              onClick={() => {
                window.location.href = "/";
              }}
              href="#logo"
              src="./washituplogo.png"
              alt="Main Logo"
            />
            <p
              onClick={() => {
                window.location.href = "/";
              }}
              className="home"
            >
              Home
            </p>
            <p
              onClick={() => {
                window.location.href = "/about";
              }}
            >
              About Us
            </p>
            <p href="#pricing">Blog</p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                Cookies.get("jwt_userId") !== undefined
                  ? (window.location.href = "/myorders")
                  : (window.location.href = "/userlogin");
              }}
              href="#myorders"
            >
              My Orders
            </p>
            {Cookies.get("jwt_userId") !== undefined ? (
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => {
                  Cookies.remove("jwt_userToken");
                  Cookies.remove("jwt_userId");
                  Cookies.remove("jwt_userName");
                  Cookies.remove("jwt_mobileNumber");
                  // Cookies.remove("jwt_adminLogin");
                  Cookies.remove("jwt_dono");
                  Cookies.remove("jwt_landmark");
                  Cookies.remove("jwt_location");
                  window.location.href = "/";
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/userlogin";
                }}
              >
                Log In
              </button>
            )}
          </div>
        )}
        {showNavBar && (
          <div
            onClick={navcontentshamberger}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#22222250",
              zIndex: 4,
            }}
          ></div>
        )}
        <div className="hamburger-icon">
          <svg
            onClick={navcontentshamberger}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11ZM21 4H3C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6H21C21.5523 6 22 5.55228 22 5C22 4.44772 21.5523 4 21 4ZM3 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18H3C2.44772 18 2 18.4477 2 19C2 19.5523 2.44772 20 3 20Z"
              fill="#0F1621"
            />
          </svg>
        </div>
      </div>
      <div className="about">
        <h2>
          LAUNDRY BELONGS IN <span>WASHITUP</span>
        </h2>
        <p>
          An average human spends between 12000 hours of their adult life in
          cleaning and managing their clothes. We have all grown upon a heavy
          dose of detergent commercials propagating the idea of
          <span>‘whiter the better’</span>.
        </p>
        <div>
          <img src="/about.png" about="about-image" />
          <div>
            <p>
              But none of these commercials talked about the hours of hard work
              required to get that blinding whiteness. Do the words ‘enzyme
              soak’, hot water cleaning’, ‘bluing’ ring a bell? How we wish
              maintaining outwrite clothes was easy as watching those
              commercials. With WASHITUP, <span>it is Easier!</span>
            </p>
            <p>
              <span>At WASHITUP</span>, we bring the best-in-class Laundry, Dry
              Cleaning and Home Cleaning Services at your doorstep!
            </p>
            <p>
              WASHITUP operates an expanding network of over 30+ mini
              laundromats across 8+ cities, making
              <span>
                {" "}
                it the Largest Laundry & Dry-Cleaning Chain in India.
              </span>
              Your nearest WASHITUP store offerslive laundry, steam ironing and
              dry-cleaning services, with freehome pick & drop, and a promise to
              deliver your clothes in less than 24 hours*.
            </p>
          </div>
        </div>
        <h1>Our Promise</h1>
        <div className="promise">
          <div>
            <img src="/quality.png" alt="promise" />
            <h3>QUALITY</h3>
            <p>Expert professionals handlingyour clothes with utmost care.</p>
          </div>
          <div>
            <img src="/transparency.png" alt="promise" />
            <h3>TRANSPARENCY</h3>
            <p>
              Neighbourhood live laundry storesoffering service as you please.
            </p>
          </div>
          <div>
            <img src="/speed.png" alt="promise" />
            <h3>SPEED</h3>
            <p>Shorter turnaround times, deliverywithin24 hours of pick up.</p>
          </div>
        </div>
        <div className="aim">
          <div>
            <img className="aim-img1" src="/weaim.png" alt="we aim" />
            <div>
              <h3>WE AIM</h3>
              <p id="aim-para1">
                To provide all cleaning solutions on a click.
              </p>
            </div>
          </div>
          <div>
            <img className="aim-img2" src="/weaspair.png" alt="we aim" />
            <div>
              <h3>WE ASPIRE</h3>
              <p id="aim-para2">
                To become India’s largest and most preferred brand of cleaning
                services.
              </p>
            </div>
          </div>
        </div>
      </div>
      <img className="star1" src="Star 1.png" alt="star1" />
      <img className="star2" src="Star 2.png" alt="star1" />
      <div
        style={{ marginTop: 0, backgroundColor: "#6759ff30" }}
        className="footer-container"
      >
        {/* <div className="footer-first-con">
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
      </div> */}
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
    </div>
  );
};

export default About;
