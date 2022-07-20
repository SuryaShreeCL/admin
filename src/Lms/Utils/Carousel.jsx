import { useRef } from "react";
import MagicSliderDots from "react-magic-slider-dots";
import Slider from "react-slick";
import "../Assets/css/Preview/Carousel.css";
import React from "react";

function Carousel({ children }) {
  const ref = useRef();

  const handleChange = () => {
    var obj = ref.current?.innerSlider?.state;
    if (obj) {
      let count = obj.slideCount;
      let activeIndex = obj.currentSlide + 1;
      var element = window.document.querySelector(".carousel");
      if (count > 1) {
        element.setAttribute("content", `${activeIndex}/${count}`);
      } else {
        element.setAttribute("content", "");
      }
    }
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "carousel",
    appendDots: (dots) => {
      return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={20} />;
    },
    onReInit: handleChange,
    ref: ref,
  };

  return <Slider {...settings}>{children}</Slider>;
}

export default Carousel;
