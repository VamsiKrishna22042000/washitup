import "../LaundryMain/index.css";

import { Component } from "react";

/**Second component why to choose washitup feature box*/
class FeatureBox extends Component {
  render() {
    const { each } = this.props;
    const { id, con1, imageUrl, featureName, feature } = each;

    let con = `feature-name ${con1}`;

    return (
      <>
        <div id={id} className={con}>
          <img className="ic" src={imageUrl} alt="icon" />
          <p className="p1">{featureName}</p>
          <p className="tagline1">{feature}</p>
        </div>
      </>
    );
  }
}
export default FeatureBox;
