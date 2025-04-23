import React, { useState, useEffect } from "react";
import BackgroundSlider from "./Background";
import Body from "./Body";
import Family from "./Family";
import President from "./President";
import Quotes from "../components/Quotes";
import ImageLink from "../components/ImageLink";
import VIsitingTime from "../components/VIsitingTime";
import Event from "../components/Event";
import History from "../components/History";
import VIdeoLink from "../components/VIdeoLink"
import ParticipateStructers from "../components/participative-structures/ParticipateStructers";

const Home = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowContent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <BackgroundSlider />
      <div className={`content ${showContent ? "visible" : "hidden"}`}>
      <Event />
      <President />
      <History />
     
          <Quotes />
       
        <VIsitingTime />
        <ImageLink /> 
        
         <VIdeoLink />
        <Family /> 
        <ParticipateStructers/>
      </div>
    </div>
  );
};

export default Home;
