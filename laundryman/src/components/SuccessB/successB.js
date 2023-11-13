import "./successB.css";

import { useEffect } from "react";

{
  /**Component that show's booked animation and automatically redirects to washing that show's delivery boy animation */
}

const SuccessB = (props) => {
  useEffect(() => {
    let audio = new Audio("/success.mp3");
    audio.play();
    setTimeout(() => {
      const { washing } = props;
      washing();
    }, 1000);
  }, []);

  return (
    <>
      <div className="success-total-con-B">
        <img
          className="success-anime-BC"
          src="./successful-animation.gif"
          alt="Successful"
        />
        <p className="success-para-BC">Booked</p>
      </div>
      <audio id="audio">
        <source src="/success.mp3" type="audio/mp3"></source>
      </audio>
    </>
  );
};
export default SuccessB;
