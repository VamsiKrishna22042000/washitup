import LaundryNavB from "../LaundryMainB/indexb.js";

import LaundryBody from "../LaundryBody/index";

import { useEffect, useState } from "react";

const LaundryB = () => {
  const [typeAB, setAB] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    url.slice(-1) === "b" && setAB(true);
  }, []);

  /**console.log(typeAB);*/

  return (
    <>
      <LaundryNavB />
      <LaundryBody typeAB={typeAB} />
    </>
  );
};

export default LaundryB;
