import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./banners.css";
import React from "react";
import Slider from "react-slick";

const Banners = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false, // Hide the dots navigation
    arrows: false,
  };
  return (
    <div className="banner-con">
      <Slider {...settings}>
        <img src="/offer1.png" alt="offer1" />
        <img src="/offer2.png" alt="offer2" />
        <img src="/offer1.png" alt="offer1" />
        <img src="/offer2.png" alt="offer2" />
        <img src="/offer1.png" alt="offer1" />
        <img src="/offer2.png" alt="offer2" />
        <img src="/offer1.png" alt="offer1" />
        <img src="/offer2.png" alt="offer2" />
        <img src="/offer1.png" alt="offer1" />
        <img src="/offer2.png" alt="offer2" />
        <img src="/offer1.png" alt="offer1" />
        <img src="/offer2.png" alt="offer2" />
      </Slider>
    </div>
  );
};

export default Banners;
