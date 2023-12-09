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

  var settings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false, // Hide the dots navigation
    arrows: false,
  };

  return (
    <div className="banner-con">
      <Slider
        style={{ cursor: "pointer" }}
        className="banner-desk"
        {...settings}
      >
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
      </Slider>
      <Slider
        style={{ cursor: "pointer" }}
        className="banner-mobile"
        {...settings2}
      >
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
        <img src="/offer1.webp" alt="offer1" />
        <img src="/offer2.webp" alt="offer2" />
      </Slider>
    </div>
  );
};

export default Banners;
