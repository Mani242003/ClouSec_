import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "../OptimizedImage";
import AspectRatioBox from "../AspectRatioBox";
import a from "/bg1.jpg";

import AnimatedText from "../common/AnimatedText";
import GradientLinkButton from "../common/GradientLinkButtonProps";

// Custom Hook to detect if an element is in view
const useInView = (offset = 100) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const handleScroll = () => {
      if (!element) return;
      const top = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - offset) {
        setIsInView(true);
      }
    };

    handleScroll(); // check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return { ref, isInView };
};

const Hero: React.FC = () => {
  const { ref: heroRef, isInView: heroVisible } = useInView(150);
  const { ref: textRef, isInView: textVisible } = useInView(100);

  return (
    <>
      <div className="px-0   ">
        <div
          className="bg-no-repeat bg-cover  overflow-hidden pt-[40px]"
          style={{ backgroundImage: `url(${a})` }}
        >
          <div
            ref={heroRef}
            className={`px-4 md:px-6 pr-0 min-h-[700px] md:min-h-[650px] flex transition-all duration-1000 ease-in-out ${heroVisible ? "animate-fade-in visible" : ""
              }`}
          >
            <div className="flex      w-full ">
              {/* Text Section */}
              <div
                ref={textRef}
                className={` flex flex-col w-full lg:w-[50%] space-y-2 sm:space-y-4 md:space-y-5 mt-[125px] sm:mt-24  md:text-left transition-all duration-1000 ease-in-out ${textVisible ? "animate-fade-in visible" : ""
                  }`}
              >
                <AnimatedText
                  className=" w-[350px] spacing  text-white_ font-bolder mb-3 border-b border-dashed"
                  data="Welcome	to	ClouSec	Technologies	Pvt	Ltd "
                />


                <span className="  font-Grotesk text-[33px] sm:text-[45px]  text-white_ font-bold leading-[40px] sm:leading-[50px] ">
                  The AI-Powered RegTech Platform for Effortless Cloud Compliance
                </span> 


<div className="py-1 sm:py-0">

</div>

                <p className="text-white_ text-[15px] sm:text-[17px]  leading-[25px] ">
                 ClouSec is an intelligent RegTech platform that unifies CNAPP, CIEM, and CCoE to secure cloud infrastructures at any scale. It automates regulatory compliance, streamlines cloud security with AI-driven insights and optimizes cloud operations to reduce monthly costs
                </p>
                
                <div className=" w- flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6 ">
              
                   <GradientLinkButton className="w-[250px]"  path="/book-demo">
                   Request a Demo
                        </GradientLinkButton>
                  
                  <Link
                    to="/platform-overview"
                    className="px-6 py-3 border-2 w-[250px] border-white hover:bg-white hover:text-primary2 text-white rounded-full transition"
                  >
                    Take a Product Tour →
                  </Link>
                </div>
               
              </div>

              <div
                className='  absolute  flex flex-1 h-full  lg:w-[50%]  right-[-100px] mt-11 hidden lg:block '
              >
                <div className="  w-full h-full pl-[10px] ">

                  <AspectRatioBox ratio="">
                    <OptimizedImage
                      src="/banner.jpg"
                      alt="ClouSec cloud security platform visualization"
                      priority={true}
                      // width={1000}
                      // height={550}
                      className="absolute"
                    />
                  </AspectRatioBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Hero;


