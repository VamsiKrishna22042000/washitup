import "./washing.css";

const Washing = (props) => {
  const { selectedTime } = props;

  return (
    <div className="washing-total-con">
      <div className="washing-note">
        <p>
          Note : Our WashIt Executive will reach you out at your preferred
          timing Relax !
        </p>
      </div>
      <img className="washing-anime" src="./deliveryboy.gif" alt="Washing" />
    </div>
  );
};

export default Washing;
