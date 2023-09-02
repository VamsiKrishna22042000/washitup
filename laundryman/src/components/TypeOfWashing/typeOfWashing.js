import "./typeOfWashing.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsArrowRight } from "react-icons/bs";

{
  /**Second componet in the main box to select type of wash that a user want */
}
const TypeOfWashing = (props) => {
  const { type } = props;

  return (
    <div className="type-of-wash">
      <h1 className="type-of-head">Select Type of Wash</h1>
      <button
        onClick={() => {
          type("drycleaning");
        }}
        className="type-of-button"
      >
        <img className="type-of-image" src="/drycleaning.png" />
        Dry Cleaning
      </button>
      <button
        onClick={() => {
          type("wash&fold");
        }}
        className="type-of-button"
      >
        <img className="type-of-image" src="/wash&fold.png" /> Wash & Fold
      </button>
      <button
        onClick={() => {
          type("wash&iron");
        }}
        className="type-of-button"
      >
        <img className="type-of-image" src="/wash&iron.png" /> Wash & Iron
      </button>
    </div>
  );
};

export default TypeOfWashing;
