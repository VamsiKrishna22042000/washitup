import "./success.css";

import { useEffect } from "react";

{
  /**Component that show's booked animation and automatically redirects to washing that show's delivery boy animation */
}

const Success = (props) => {
  useEffect(() => {
    setTimeout(() => {
      const { washing } = props;
      washing();
    }, 2200);
  }, []);

  return (
    <div className="success-total-con">
      <img
        className="success-anime"
        src="./successful-animation.gif"
        alt="Successful"
      />
      <p className="success-para">Booked</p>
    </div>
  );
};
export default Success;
