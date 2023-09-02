import '../LaundryMain/index.css'

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
            <div className="card55">
                <div className="background5">
                    <div className="contentb5">
                        <div className="subscription">
                            <h1 className="subshead">Logo Space</h1>
                            <p className="subspara">Lorem ipsum dolor sit amet, consectetur<br/>adipiscing elit, sed do eiusmod tempor incididunt<br/>ut labore et dolore magna aliqua. </p>
                            <p className="subsnews">Subscribe to get latest news</p>
                            <div className="button-container-5">
                            <input id="email" className="subsinput" type="text" placeholder="Email address" />
                            <button className="b5butt">
                                Subscribe
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 1L7.3 8.7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 1L10.1 15L7.3 8.7L1 5.9L15 1Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            </div>
                            <div>
                                <svg className="fb" width="116" height="30" viewBox="0 0 116 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15" cy="15" r="15" fill="#DD246E" />
                                    <path d="M19 8H16.8182C15.8538 8 14.9288 8.38312 14.2469 9.06507C13.5649 9.74702 13.1818 10.6719 13.1818 11.6364V13.8182H11V16.7273H13.1818V22.5455H16.0909V16.7273H18.2727L19 13.8182H16.0909V11.6364C16.0909 11.4435 16.1675 11.2585 16.3039 11.1221C16.4403 10.9857 16.6253 10.9091 16.8182 10.9091H19V8Z" fill="white" />
                                    <circle cx="58" cy="15" r="15" fill="#DD246E" />
                                    <path d="M60.5007 12.4995C61.6942 12.4995 62.8388 12.9736 63.6827 13.8175C64.5266 14.6614 65.0007 15.806 65.0007 16.9995V22.2495H62.0007V16.9995C62.0007 16.6017 61.8427 16.2201 61.5614 15.9388C61.2801 15.6575 60.8985 15.4995 60.5007 15.4995C60.1029 15.4995 59.7214 15.6575 59.4401 15.9388C59.1588 16.2201 59.0007 16.6017 59.0007 16.9995V22.2495H56.0007V16.9995C56.0007 15.806 56.4748 14.6614 57.3187 13.8175C58.1627 12.9736 59.3072 12.4995 60.5007 12.4995Z" fill="white" />
                                    <path d="M53 13.25H50V22.25H53V13.25Z" fill="white" />
                                    <path d="M51.5 11C52.3284 11 53 10.3284 53 9.5C53 8.67157 52.3284 8 51.5 8C50.6716 8 50 8.67157 50 9.5C50 10.3284 50.6716 11 51.5 11Z" fill="white" />
                                    <circle cx="101" cy="15" r="15" fill="#DD246E" />
                                    <path d="M109 9.00686C108.347 9.46741 107.624 9.81966 106.859 10.05C106.448 9.57789 105.903 9.24324 105.296 9.09135C104.689 8.93947 104.05 8.97767 103.465 9.2008C102.88 9.42393 102.378 9.82122 102.027 10.3389C101.676 10.8567 101.492 11.4698 101.5 12.0955V12.7773C100.302 12.8084 99.1145 12.5426 98.0439 12.0038C96.9732 11.4649 96.0525 10.6696 95.3636 9.68867C95.3636 9.68867 92.6364 15.825 98.7727 18.5523C97.3685 19.5055 95.6958 19.9834 94 19.9159C100.136 23.325 107.636 19.9159 107.636 12.075C107.636 11.8851 107.617 11.6957 107.582 11.5091C108.278 10.8229 108.769 9.95643 109 9.00686Z" fill="white" />
                                </svg>
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
            <div className="last-3">© 2022 Laundry Shop, All Rights Reserved.</div>
        </div>
        </div>
        </div>

    )
}
export default Lastsetion