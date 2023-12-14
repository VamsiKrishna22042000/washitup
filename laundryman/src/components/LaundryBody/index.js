import "../LaundryMain/index.css";

import "./excitingOffers.css";

import { Component, useEffect, useState } from "react";
import FeatureBox from "./featurebox";

import Iphonecon from "./iphonecon.js";

import TestimonialSlider from "./testimonialSlider";

import Alliphones from "./alliphones";

import Lastsetion from "./lastsection";

/**Varible stores data to pass it to second component to why to choose washitup */
const fearturesOfback2 = [
  {
    id: "fe1",
    con1: "fes1",
    imageUrl: "fastdelivery.png",
    featureName: "Lightning-Fast Turnaround",
    feature:
      "When you choose our services, you can count on us for quick, efficient service, ensuring your clothes are back in no time, and you get back to what you love.",
  },

  {
    id: "fe2",
    con1: "fes2 show-feature",
    imageUrl: "exprtise.png",
    featureName: "Expertise and Quality",
    feature:
      "Our team of experts uses top-notch equipment and premium detergents for meticulous garment care, ensuring your clothes receive the best treatment.",
  },

  {
    id: "fe3",
    con1: "fes3 show-feature",
    imageUrl: "price.png",
    featureName: "Competitive Pricing",
    feature:
      "Our transparent, budget-friendly rates for high-quality laundry services make premium care accessible to all, allowing you to enjoy top-notch cleanliness.",
  },

  {
    id: "fe4",
    con1: "fes4 show-feature",
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
    iurl: "/womenwashituppic1.png",
    fep1: "FEATURES",
    lan: "WashIt Up Features",
    phonecon: "phones-con1",
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
    iurl: "/womenwashituppic2.png",
    fep1: "FEATURES",
    lan: "WashIt Up Features",
    phonecon: "phones-con2",
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

const LaundryBody = (props) => {
  /**Function to change the feature on clicking the dots in the mobile mode*/

  const [changeDot, setDot] = useState("dt1");

  useEffect(() => {
    setTimeout(() => {
      boxchange();
    }, 2000);
  });

  const boxchange = () => {
    if (changeDot === "dt1") {
      let box1 = document.getElementById("fe1");
      let box2 = document.getElementById("fe2");
      let box3 = document.getElementById("fe3");
      let box4 = document.getElementById("fe4");

      // console.log(event.target);
      // console.log(box1);
      box1.classList.remove("show-feature");
      box2.classList.add("show-feature");
      box3.classList.add("show-feature");
      box4.classList.add("show-feature");
      setDot("dt2");
    } else if (changeDot === "dt2") {
      let box1 = document.getElementById("fe1");
      let box2 = document.getElementById("fe2");
      let box3 = document.getElementById("fe3");
      let box4 = document.getElementById("fe4");

      // console.log(event.target);
      // console.log(box2);
      box1.classList.add("show-feature");
      box2.classList.remove("show-feature");
      box3.classList.add("show-feature");
      box4.classList.add("show-feature");
      setDot("dt3");
    } else if (changeDot === "dt3") {
      let box1 = document.getElementById("fe1");
      let box2 = document.getElementById("fe2");
      let box3 = document.getElementById("fe3");
      let box4 = document.getElementById("fe4");

      // console.log(event.target);
      // console.log(box3);
      box1.classList.add("show-feature");
      box2.classList.add("show-feature");
      box3.classList.remove("show-feature");
      box4.classList.add("show-feature");
      setDot("dt4");
    } else if (changeDot === "dt4") {
      let box1 = document.getElementById("fe1");
      let box2 = document.getElementById("fe2");
      let box3 = document.getElementById("fe3");
      let box4 = document.getElementById("fe4");

      // console.log(event.target);
      // console.log(box4);
      box1.classList.add("show-feature");
      box2.classList.add("show-feature");
      box3.classList.add("show-feature");
      box4.classList.remove("show-feature");
      setDot("dt1");
    }
  };

  return (
    <>
      {!props.typeAB && (
        <div style={{ overflow: "hidden" }} className="offers-background">
          <h1>Exciting Offers</h1>
          <div>
            <img src="/offer1.webp" alt="offer1" />
            <img src="/offer2.webp" alt="offer2" />
          </div>
        </div>
      )}
      <>
        <h1 className="feature-head-text">
          Why To Choose
          <span> WashIt Up </span>?
        </h1>
        <div className="feature-background">
          {fearturesOfback2.map((each) => (
            <FeatureBox each={each} key={each.con1} />
          ))}
        </div>
        <div className="dots">
          <button id="dt1" className="d1" onClick={boxchange}></button>
          <button id="dt2" className="d1" onClick={boxchange}></button>
          <button id="dt3" className="d1" onClick={boxchange}></button>
          <button id="dt4" className="d1" onClick={boxchange}></button>
        </div>
        {iphones.map((eachi) => (
          <Iphonecon key={eachi.iurl} eachi={eachi} />
        ))}
        <TestimonialSlider />
        <Alliphones />
        <Lastsetion />
      </>
    </>
  );
};
export default LaundryBody;
