import React, { useState } from 'react';
import './Carousel.css';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption, 
  Button
} from 'reactstrap';

import pic1 from "../../assets/slider1.jpg";
import pic2 from "../../assets/slider2.jpg";
import pic3 from "../../assets/slider3.jpg";

const items = [
  {
    src: pic1,
    altText: 'Slide 1',
    caption: <span>
      <h1 align="left" style={{color:'#F39C12'}}>E-Retail</h1>
      <p>E-Retail is a leading professional e-commerce company in Nepal. Try us for amazing shopping experience if u haven't yet.</p>
      {/* <Button className="btnCarousel" outline href="/contact" size="lg">CONTACT US</Button> */}
    </span>
  },
  {
    src: pic2,
    altText: 'Slide 2',
  },
  {
    src: pic3,
    altText: 'Slide 3',
  }
];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (        
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} className="carouselImg" alt={item.altText} />
        <CarouselCaption className="sliderContent fade-in" captionText={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <div>
        <Carousel
        className="carouselDiv"
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>

        </div>
  );
}

export default Example;