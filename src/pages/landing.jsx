import Default from "../layout/default";
import landing from "../assets/landing.png";
import service from "../assets/SERVICES.png";

import phone from "../assets/4-removebg-preview (1) 1.png";
import feature from "../assets/FEATURE.png";
import { Button, List } from "flowbite-react";

const LandingPage = () => {
  return (
    <Default>
      <div
        className="landing w-full h-[30vh] md:h-[50vh] lg:h-[80vh]"
        style={{
          backgroundImage: `url(${landing})`, // Using the imported image
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="service flex justify-center items-center h-[30vh] md:h-[50vh] lg:h-[80vh] mt-20">
        <img src={service} className="w-[25rem] lg:w-[40rem]" alt="" />
      </div>
      <div className="wrapper flex container mx-auto flex-wrap px-10 my-20 py-20">
        <div className="basis-12/12 lg:basis-6/12 flex justify-center">
          <img src={phone} alt="" />
        </div>
        <div className="basis-12/12 lg:basis-6/12 mt-5">
          <h1 className="text-5xl font-bold mb-5" style={{ color: "#FF7E00" }}>
            Join Us and Become One of Our Proud Riders
          </h1>
          <p className="text-lg">
            Are you ready to drive with us? At BEAR RIDE EXPRESS, we’re looking
            for enthusiastic riders to join our growing team. Enjoy flexible
            hours, competitive pay, and the opportunity to be part of a company
            that values its team. Plus, if you’re already a rider with another
            company, you can still join us and bring your experience along!
          </p>
          <p className="text-lg font-bold my-5">Perks of Joining:</p>
          <List>
            <List.Item>Flexible scheduling to fit your lifestyle </List.Item>
            <List.Item>Competitive earnings and bonuses</List.Item>
            <List.Item>Supportive team environments</List.Item>
            <List.Item>Access to our latest technology and tools</List.Item>
          </List>
          <Button className="mt-5" color={"failure"}>
            Become a rider
          </Button>
        </div>
      </div>
      <div className="service flex justify-center items-center mt-10 h-[30vh] md:h-[50vh] lg:h-[80vh] my-20">
        <img src={feature} alt="" />
      </div>
    </Default>
  );
};

export default LandingPage;
