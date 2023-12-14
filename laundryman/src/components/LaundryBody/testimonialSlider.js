import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TestimonialSlider.css";

// Existing code above...

/**Variable to store the data showed in the testimonial slider */
const testimonialData = [
  {
    id: 0,
    name: "Aniket Mishra",
    text: "I can't express how satisfied I am with WashIt Up! The convenience of booking laundry services for all my clothes, from dry cleaning to wash and fold, is a game-changer. The quality of service is top-notch, and my clothes always come back looking fresh and clean. Thank you for making laundry day stress-free!",
    image: "/Aniket Mishra.png",
    reviewstar: "/starreview.jpg",
    bgColor: "#2d69f0",
  },
  {
    id: 1,
    name: "Hema Bijwaas",
    text: "WashIt Up is a lifesaver! As a busy professional, I don't have time to do laundry, and WashIt Up has made my life so much easier. They connect me with reliable laundry services, and I can choose the type of wash I need. My clothes are handled with care, and I love the wash and iron option for my work attire. Highly recommended!",
    image: "/Hema Bijwaas.png",
    reviewstar: "/starreview.jpg",
    bgColor: "#0cae74",
  },

  {
    id: 2,
    name: "Kriti Nadar",
    text: "WashIt Up has simplified my laundry routine, and I couldn't be happier! The convenience of scheduling a laundry pickup and drop-off is a game-changer. Plus, the quality of the wash and iron service is outstanding. My clothes look and feel amazing. I'm a loyal customer, and I highly recommend them.",
    image: "/Kirti Nadar.png",
    reviewstar: "/starreview.jpg",
    bgColor: "#6759ff",
  },
  {
    id: 3,
    name: "Sneha Chandaa",
    text: "WashIt Up is the ultimate laundry solution. I used to dread doing laundry, but not anymore! Their platform is intuitive, and the options for different types of washes suit all my needs. Whether it's my business attire or casual clothes, they handle it all with care. It's a time-saver and a quality service rolled into one.",
    image: "/Sneha Chandaa.png",
    reviewstar: "/starreview.jpg",
    bgColor: "#808080",
  },
];

// Rest of the existing code...

/**Slide developed by using react-slick library for both mobile and desktop to show customer reviews*/
const TestimonialSlider = () => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   autoplay: true, // Enable autoplay
  //   autoplaySpeed: 3000,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   prevArrow: <CustomPrevArrow />, // Custom arrow component for previous slide
  //   nextArrow: <CustomNextArrow />, // Custom arrow component for next slide
  //   responsive: [
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 660,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  // function CustomPrevArrow(props) {
  //   const { onClick } = props;
  //   return (
  //     <div className="custom-arrow prev" onClick={onClick}>
  //       ❮
  //     </div>
  //   );
  // }

  // function CustomNextArrow(props) {
  //   const { onClick } = props;
  //   return (
  //     <div className="custom-arrow next" onClick={onClick}>
  //       ❯
  //     </div>
  //   );
  // }

  // return (
  //   <div className="testimonial-slider">
  //     <h1 className="testimonial-head">REVIEWS FROM OUR HAPPY CUSTOMERS</h1>
  //     <Slider {...settings}>
  //       {testimonialData.map((testimonial) => (
  //         <div
  //           style={{ backgroundColor: testimonial.bgColor }}
  //           key={testimonial.id}
  //           className="testimonial"
  //         >
  //           <img
  //             src={testimonial.image}
  //             alt={testimonial.name}
  //             className="customer-image"
  //           />
  //           <p>{testimonial.text}</p>
  //           <p className="testimonial-name">{testimonial.name}</p>
  //         </div>
  //       ))}
  //     </Slider>
  //   </div>
  // );

  const [activeProfile, setActiveProfile] = useState(0);

  const [changeAnimation, setAnimation] = useState("slider-container2");

  useEffect(() => {
    setTimeout(() => {
      if (activeProfile !== parseInt(testimonialData.length - 1)) {
        setActiveProfile(activeProfile + 1);
      } else if (activeProfile === parseInt(testimonialData.length - 1)) {
        setActiveProfile(0);
      }
    }, 5000);
  });

  // useEffect(() => {
  //   setInterval(() => {
  //     setAnimation("slider-container2");
  //     setInterval(() => {
  //       setAnimation("slider-container3");
  //       setInterval(() => {
  //         setAnimation("slider-container2");
  //       }, 1);
  //     }, 1000);
  //   }, 1000);
  // }, [activeProfile]);

  return (
    <div className="sliding">
      <h2>Testimonials</h2>
      <ul className="slider-container">
        {testimonialData.map((each) => (
          <li key={each.id}>
            <img
              id={
                activeProfile === each.id
                  ? "customer-image2"
                  : "customer-image1"
              }
              src={each.image}
              alt={each.name}
            />
          </li>
        ))}
      </ul>

      <ul className={changeAnimation}>
        {testimonialData.map(
          (each) =>
            each.id === activeProfile && (
              <li key={each.id}>
                <div>
                  <img src={each.reviewstar} alt={each.name} />
                  <img src={each.reviewstar} alt={each.name} />
                  <img src={each.reviewstar} alt={each.name} />
                  <img src={each.reviewstar} alt={each.name} />
                  <img src={each.reviewstar} alt={each.name} />
                </div>
                <h3>{each.name}</h3>
                <h4>Satified Customer</h4>
                <p>{each.text}</p>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default TestimonialSlider;
