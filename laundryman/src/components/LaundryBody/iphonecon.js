import "../LaundryMain/index.css";

import "./excitingOffers.css";

import { Component } from "react";

class Iphonecon extends Component {
  render() {
    const { eachi } = this.props;
    const { iurl, fep1, lan, phonecon } = eachi;

    return (
      <div className={phonecon}>
        <img src={iurl} alt="iphone" />
        <div className="matter-phone">
          <div className="first-con-matter">
            <p>{fep1}</p>
            <p>{lan}</p>
          </div>
          <div className="second-con-matter">
            <div>
              <img src={this.props.eachi.image1} />
              <p>{this.props.eachi.feName1}</p>
            </div>
            <p>{this.props.eachi.fe1}</p>

            <div>
              <img src={this.props.eachi.image2} />
              <p>{this.props.eachi.feName2}</p>
            </div>
            <p>{this.props.eachi.fe2}</p>

            <div>
              <img src={this.props.eachi.image3} />

              <p>{this.props.eachi.feName3}</p>
            </div>
            <p>{this.props.eachi.fe3}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Iphonecon;
