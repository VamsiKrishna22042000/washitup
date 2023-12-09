import "./washingB.css";

import { useState, useEffect } from "react";

{
  /**Final component in the main box that show's delivery boy animation in the main page */
}
const WashingBC = () => {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    // Check if the component has not scrolled into view yet
    if (!hasScrolledIntoView) {
      // Scroll into view
      const homeElement = document.getElementById("done2");
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: "smooth" });
        // Update state to indicate that scrolling has been performed
        setHasScrolledIntoView(true);
      }
    }
  }, [hasScrolledIntoView]);

  return (
    <>
      <div style={{ position: "absolute", top: 0 }} id="done2"></div>
      <div className="washing-total-con-B">
        <div className="washing-note-B">
          <p>
            Note : Our WashIt Executive will reach you out at your preferred
            timing Relax !
          </p>
        </div>
        <img
          className="washing-anime-B"
          src="./deliveryboy.gif"
          alt="Washing"
        />
        <p
          className="go-back-button-B"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Order Again →
        </p>
      </div>
    </>
  );
};

export default WashingBC;
