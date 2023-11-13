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
      const homeElement = document.getElementById("home");
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: "smooth" });
        // Update state to indicate that scrolling has been performed
        setHasScrolledIntoView(true);
      }
    }
  }, [hasScrolledIntoView]);

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
