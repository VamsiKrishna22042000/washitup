import "./typeOfWashing.css";

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
