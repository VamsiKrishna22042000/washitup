import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TestimonialSlider.css";

// Existing code above...

const testimonialData = [
  {
    id: 1,
    name: "John Doe",
    text: "I can't express how satisfied I am with WashIt Up! The convenience of booking laundry services for all my clothes, from dry cleaning to wash and fold, is a game-changer. The quality of service is top-notch, and my clothes always come back looking fresh and clean. Thank you for making laundry day stress-free!",
    image: "/customer-review1.jpg",
    bgColor: "#2d69f0",
  },
  {
    id: 2,
    name: "Sarah Smith",
    text: "WashIt Up is a lifesaver! As a busy professional, I don't have time to do laundry, and WashIt Up has made my life so much easier. They connect me with reliable laundry services, and I can choose the type of wash I need. My clothes are handled with care, and I love the wash and iron option for my work attire. Highly recommended!",
    image: "/customer4.jpg",
    bgColor: "#0cae74",
  },
  {
    id: 3,
    name: "David Brown",
    text: "I've been using WashIt Up for a while now, and I'm impressed every time. The platform is user-friendly, and the range of services they offer is fantastic. Whether it's a delicate item that needs dry cleaning or a pile of laundry for wash and fold, WashIt Up has me covered. The best part is the reliability and quick turnaround time!",
    image: "/customer3.jpg",
    bgColor: "#dd246e",
  },
  {
    id: 4,
    name: "Lisa Johnson",
    text: "WashIt Up has simplified my laundry routine, and I couldn't be happier! The convenience of scheduling a laundry pickup and drop-off is a game-changer. Plus, the quality of the wash and iron service is outstanding. My clothes look and feel amazing. I'm a loyal customer, and I highly recommend them.",
    image: "/customer-review2.jpeg",
    bgColor: "#6759ff",
  },
  {
    id: 5,
    name: "Michael Wilson",
    text: "WashIt Up is the ultimate laundry solution. I used to dread doing laundry, but not anymore! Their platform is intuitive, and the options for different types of washes suit all my needs. Whether it's my business attire or casual clothes, they handle it all with care. It's a time-saver and a quality service rolled into one.",
    image: "/customer5.jpg",
    bgColor: "#808080",
  },
  // Add more testimonial objects here
];

// Rest of the existing code...

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />, // Custom arrow component for previous slide
    nextArrow: <CustomNextArrow />, // Custom arrow component for next slide
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev" onClick={onClick}>
        ❮
      </div>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="custom-arrow next" onClick={onClick}>
        ❯
      </div>
    );
  }

  return (
    <div className="testimonial-slider">
      <h1 className="testimonial-head">REVIEWS FROM OUR HAPPY CUSTOMERS</h1>
      <Slider {...settings}>
        {testimonialData.map((testimonial) => (
          <div
            style={{ backgroundColor: testimonial.bgColor }}
            key={testimonial.id}
            className="testimonial"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="customer-image"
            />
            <p>{testimonial.text}</p>
            <p className="testimonial-name">{testimonial.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
