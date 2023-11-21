import "../LaundryMain/index.css";
import { Component } from "react";
import FeatureBox from "./featurebox";

import Iphonecon from "./iphonecon.js";

import TestimonialSlider from "./testimonialSlider";

import Alliphones from "./alliphones";

import Lastsetion from "./lastsection";

/**Varible stores data to pass it to second component to why to choose washitup */
const fearturesOfback2 = [
  {
    id: "fe1",
    con1: "f1",
    imageUrl: "fastdelivery.png",
    featureName: "Lightning-Fast Turnaround",
    feature:
      "When you choose our services, you can count on us for quick, efficient service, ensuring your clothes are back in no time, and you get back to what you love.",
  },

  {
    id: "fe2",
    con1: "f2 boxshow",
    imageUrl: "exprtise.png",
    featureName: "Expertise and Quality",
    feature:
      "Our team of experts uses top-notch equipment and premium detergents for meticulous garment care, ensuring your clothes receive the best treatment.",
  },

  {
    id: "fe3",
    con1: "f3 boxshow",
    imageUrl: "price.png",
    featureName: "Competitive Pricing",
    feature:
      "Our transparent, budget-friendly rates for high-quality laundry services make premium care accessible to all, allowing you to enjoy top-notch cleanliness.",
  },

  {
    id: "fe4",
    con1: "f4 boxshow",
    imageUrl: "eco.png",
    featureName: "Eco-Friendly Approach",
    feature:
      "We take pride in eco-conscious practices, minimizing our environmental impact while maintaining your clothes' freshness, quality, and sustainability.",
  },
];

/**Variable that stores the features which are passed to 3rd&4th component toshow the features of the wash itup */
const iphones = [
  {
    class: "women1",
    iurl: "/womenwashituppic1.webp",
    fep1: "FEATURES",
    lan: "WashIt Up Features",
    phonecon: "phone1",
    image1: "/garmentcare.png",
    feName1: "Professional Garment Care",
    fe1: "We handle your clothes with the utmost care, using advanced equipment and premium detergents to ensure they look and feel their best.",
    image2: "/pickupanddelivery.png",
    feName2: "Convenient Pickup and Delivery",
    fe2: "Enjoy the luxury of not leaving your home. Schedule a pickup and delivery time that suits you, and leave the rest to us.",
    image3: "/pricetransparency.png",
    feName3: "Transparent Pricing",
    fe3: "No hidden costs or surprises. Our competitive pricing structure keeps your budget in check while maintaining high-quality standards.",
  },
  {
    class: "women2",
    iurl: "/womenwashituppic2.webp",
    fep1: "FEATURES",
    lan: "WashIt Up Features",
    phonecon: "phone2",
    image1: "/fragrence.png",
    feName1: "Fragrance Options",
    fe1: "Choose from a range of delightful scents to add that extra freshness to your freshly laundered clothes.",
    image2: "/stainremover.png",
    feName2: "Stain Removal Experts",
    fe2: "Stubborn stains are no match for our experienced team. We're equipped to tackle the toughest spots and spills.",
    image3: "/customercentricsupport.png",
    feName3: "Customer-Centric Support",
    fe3: "Have a question or need assistance? Our friendly customer support team is here to assist you every step of the way.",
  },
];

class LaundryBody extends Component {
  /**Function to change the feature on clicking the dots in the mobile mode*/
  boxchange = (event) => {
    if (event.target.id === "dt1") {
      let box1 = document.getElementById("fe1");
      let box2 = document.getElementById("fe2");
      let box3 = document.getElementById("fe3");
      let box4 = document.getElementById("fe4");

      console.log(event.target);
      console.log(box1);
      box1.classList.remove("boxshow");
      box2.classList.add("boxshow");
      box3.classList.add("boxshow");
      box4.classList.add("boxshow");
    } else if (event.target.id === "dt2") {
      let box1 = document.getElementById("fe1");
      let box2 = document.getElementById("fe2");
      let box3 = document.getElementById("fe3");
      let box4 = document.getElementById("fe4");

      console.log(event.target);
      console.log(box2);
      box1.classList.add("boxshow");
      box2.classList.remove("boxshow");
      box3.classList.add("boxshow");
      box4.classList.add("boxshow");
    } else if (event.target.id === "dt3") {
      let box1 = document.getElementById("fe1");
      let box2 = document.getElementById("fe2");
      let box3 = document.getElementById("fe3");
      let box4 = document.getElementById("fe4");

      console.log(event.target);
      console.log(box3);
      box1.classList.add("boxshow");
      box2.classList.add("boxshow");
      box3.classList.remove("boxshow");
      box4.classList.add("boxshow");
    } else if (event.target.id === "dt4") {
      let box1 = document.getElementById("fe1");
      let box2 = document.getElementById("fe2");
      let box3 = document.getElementById("fe3");
      let box4 = document.getElementById("fe4");

      console.log(event.target);
      console.log(box4);
      box1.classList.add("boxshow");
      box2.classList.add("boxshow");
      box3.classList.add("boxshow");
      box4.classList.remove("boxshow");
    }
  };

  render() {
    return (
      <>
        {!this.props.typeAB && (
          <div style={{ overflow: "hidden" }} className="background22">
            <h1 className="offer-22-head">Exiting Offers</h1>
            <img className="offer-22" src="/offer1.png" alt="offer1" />
            <img className="offer-22" src="/offer2.png" alt="offer2" />
          </div>
        )}
        <div className="background-2">
          <h1 className="back2-head">
            Why To Choose
            <span className="span2"> WashIt Up </span>?
          </h1>
          <h1 className="back2-head2">
            Why To Choose
            <br />
            <span className="span2"> WashIt Up </span>?
          </h1>
          <p className="tagline"></p>

          <div className="features">
            {fearturesOfback2.map((each) => (
              <FeatureBox each={each} key={each.con1} />
            ))}
          </div>
          <div className="dots">
            <button id="dt1" className="d1" onClick={this.boxchange}></button>
            <button id="dt2" className="d1" onClick={this.boxchange}></button>
            <button id="dt3" className="d1" onClick={this.boxchange}></button>
            <button id="dt4" className="d1" onClick={this.boxchange}></button>
          </div>
          {iphones.map((eachi) => (
            <Iphonecon key={eachi.iurl} eachi={eachi} />
          ))}
          <TestimonialSlider />
          <Alliphones />
          <Lastsetion />
        </div>
      </>
    );
  }
}
export default LaundryBody;
