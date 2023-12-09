import "./success.css";

import { useEffect, useState } from "react";

{
  /**Component that show's booked animation and automatically redirects to washing that show's delivery boy animation */
}

const Success = (props) => {
  useEffect(() => {
    let audio = new Audio("/success.mp3");
    audio.play();
    setTimeout(() => {
      const { washing } = props;
      washing();
    }, 1000);
  }, []);

  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    // Check if the component has not scrolled into view yet
    if (!hasScrolledIntoView) {
      // Scroll into view
      const homeElement = document.getElementById("success1");
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: "smooth" });
        // Update state to indicate that scrolling has been performed
        setHasScrolledIntoView(true);
      }
    }
  }, [hasScrolledIntoView]);

  return (
    <>
      <div style={{ position: "absolute", top: 0 }} id="success1"></div>
      <div className="success-total-con-A">
        <img
          className="success-anime-A"
          src="./successful-animation.gif"
          alt="Successful"
        />
        <p className="success-para-A">Booked</p>
      </div>
      <audio id="audio">
        <source src="/success.mp3" type="audio/mp3"></source>
      </audio>
    </>
  );
};
export default Success;
