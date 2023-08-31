import "../LaundryMain/index.css";

import { Component } from "react";

class Iphonecon extends Component {
  render() {
    const { eachi } = this.props;
    const { iurl, fep1, lan, phonecon } = eachi;

    return (
      <div className={phonecon}>
        <img className={this.props.eachi.class} src={iurl} alt="iphone" />
        <div className="phone1-matter">
          <div className="pph2">
            <p className="fep1">{fep1}</p>
            <p className="lan">{lan}</p>
          </div>
          <div>
            <div className="fename">
              <img src={this.props.eachi.image1} className="feature-icons" />
              <p className="fep2">{this.props.eachi.feName1}</p>
            </div>
            <p className="fep3">{this.props.eachi.fe1}</p>

            <div className="fename">
              <img src={this.props.eachi.image2} className="feature-icons" />
              <p className="fep2">{this.props.eachi.feName2}</p>
            </div>
            <p className="fep3">{this.props.eachi.fe2}</p>

            <div className="fename">
              <img src={this.props.eachi.image3} className="feature-icons" />

              <p className="fep2">{this.props.eachi.feName3}</p>
            </div>
            <p className="fep3">{this.props.eachi.fe3}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Iphonecon;
