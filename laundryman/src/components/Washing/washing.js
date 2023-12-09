import "./washing.css";

import { useState, useEffect } from "react";

{
  /**Final component in the main box that show's delivery boy animation in the main page */
}
const Washing = () => {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    // Check if the component has not scrolled into view yet
    if (!hasScrolledIntoView) {
      // Scroll into view
      const homeElement = document.getElementById("done1");
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: "smooth" });
        // Update state to indicate that scrolling has been performed
        setHasScrolledIntoView(true);
      }
    }
  }, [hasScrolledIntoView]);

  return (
    <>
      <div
        style={{ position: "absolute", top: 0, marginBottom: "5%" }}
        id="done1"
      ></div>
      <div className="washing-total-con-A">
        <div className="washing-note-A">
          <p>
            Note : Our WashIt Executive will reach you out at your preferred
            timing Relax !
          </p>
        </div>
        <img
          className="washing-anime-A"
          src="./deliveryboy.gif"
          alt="Washing"
        />
        <p
          className="go-back-button-A"
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

export default Washing;
