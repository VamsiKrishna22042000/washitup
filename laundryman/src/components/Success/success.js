import "./success.css";

import { useEffect } from "react";

{
  /**Component that show's booked animation and automatically redirects to washing that show's delivery boy animation */
}

const Success = (props) => {
  useEffect(() => {
    let audio = new Audio("/success.mp3");
    audio.play();
    setTimeout(() => {
      audio.pause();
      const { washing } = props;
      washing();
    }, 2200);
  }, []);

  return (
    <>
      <div className="success-total-con">
        <img
          className="success-anime"
          src="./successful-animation.gif"
          alt="Successful"
        />
        <p className="success-para">Booked</p>
      </div>
      <audio id="audio">
        <source src="/success.mp3" type="audio/mp3"></source>
      </audio>
    </>
  );
};
export default Success;
