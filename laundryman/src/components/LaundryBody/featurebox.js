import "../LaundryMain/index.css";

import "./excitingOffers.css";

import { Component } from "react";

/**Second component why to choose washitup feature box*/
class FeatureBox extends Component {
  render() {
    const { each } = this.props;
    const { id, con1, imageUrl, featureName, feature } = each;

    return (
      <div id={id} className={`features-boxes ${con1}`}>
        <img src={imageUrl} alt="icon" />
        <p>{featureName}</p>
        <p>{feature}</p>
      </div>
    );
  }
}
export default FeatureBox;
