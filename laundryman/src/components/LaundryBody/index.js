import "../LaundryMain/index.css";
import { Component } from "react";
import FeatureBox from "./featurebox";

import Iphonecon from "./iphonecon.js";

import TestimonialSlider from "./testimonialSlider";

import Alliphones from "./alliphones";

import Lastsetion from "./lastsection";

const fearturesOfback2 = [
  {
    id: "fe1",
    con1: "f1",
    imageUrl: "stars_outline_24star",
  },

  {
    id: "fe2",
    con1: "f2 boxshow",
    imageUrl: "list_check_outline_24",
  },

  {
    id: "fe3",
    con1: "f3 boxshow",
    imageUrl: "donate_outline_24",
  },

  {
    id: "fe4",
    con1: "f4 boxshow",
    imageUrl: "services_outline_24",
  },
];
const iphones = [
  {
    iurl: "iphone",
    fep1: "FEATURES",
    lan: "Laundry App Features",
    phonecon: "phone1",
  },
  {
    iurl: "iphone2",
    fep1: "CHOOSE FROM DIFFRENT STORES",
    lan: "Laundry Stores Near You",
    phonecon: "phone2",
  },
];
class LaundryBody extends Component {
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
      <div className="background-2">
        <h1 className="back2-head">
          Why To Choose <span className="span2"> WashIt Up </span>?
        </h1>
        <p className="tagline">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>

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
    );
  }
}
export default LaundryBody;
