import DefaultLayout from "../layout/default";
import landing from "../assets/landing.png";

import phone from "../assets/4-removebg-preview (1) 1.png";
import feature from "../assets/FEATURE.png";
import { Button, List } from "flowbite-react";
import img1 from "../assets/pexels-kindelmedia-6868456 1.png";
import cover from "../assets/Group 99.png";
import service from "../assets/Group 100.png";
import img2 from "../assets/Group 103.png";

const AboutPage = () => {
  return (
    <DefaultLayout>
      <div className="w-full h-[30vh] md:h-[50vh] lg:h-[70vh] flex justify-center items-center flex-col">
        <div>
          <h1 className="text-2xl lg:text-3xl w-12/12 lg:w-5/12 m-20 font-bold">
            Our mission is to deliver exceptional service, driven by innovation
            and customer satisfaction.out
          </h1>
        </div>
        <img
          className="hidden md:flex"
          src={img1}
          alt=""
          style={{
            width: 900,
            height: 900,
            marginBottom: "-10rem",
            objectFit: "contain",
          }}
        />
      </div>
      <div
        style={{
          backgroundImage: `url(${cover})`, // Using the imported image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-[30vh] md:h-[50vh] lg:h-[130vh] flex justify-end items-center flex-col"
      >
        <img className="px-5" src={service} alt="" />
      </div>
      <div className="service flex justify-center items-center mt-10 h-[30vh] md:h-[50vh] lg:h-[100vh] my-20">
        <img className="p-20" src={img2} alt="" />
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;
