import React, { lazy,  useEffect, useState } from 'react';
import Hero from '@/components/common/Hero';
import BlogList from '@/components/Blog/BlogList';
import CaseStudyList from '@/components/CaseStudy/CaseStudyList';
import GradientLinkButton from '@/components/common/GradientLinkButtonProps';
import Newsletter from '@/components/Newsletter';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Layout/Footer';

// Lazy-loaded components

const Services = lazy(() => import("../components/common/KeyBenifits"));
const ClouSecOverview = lazy(() => import("../components/common/ClouSecOverview"));
const PricingSection = lazy(() => import("../components/PriceSection"));
const ClouSecPlatform = lazy(() => import("../components/ClouSecPlatform"));
const Popup = lazy(() => import('@/components/Popup/Popup'));
const VideoContentSlider = lazy(() => import('@/components/VideoContentSlider'));


const HomePage: React.FC = () => {

    useEffect(() => {
    window.scrollTo(0, 0);
    // document.title = "ClouSec - Home Page";
  }, []);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    const hasPopupBeenShown = localStorage.getItem('popupShown');

    if (!hasPopupBeenShown) {
      const timer = setTimeout(() => {
        setPopupVisible(true);
        localStorage.setItem('popupShown', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setPopupVisible(false); // Explicitly ensure it's not shown
    }
  }, []);

  const closePopup = (): void => {
    setPopupVisible(false);
  };

  return (
    <>
     <Helmet>
                <title>Home | ClouSec</title>
              </Helmet>
      {isPopupVisible && (
        <Popup show={isPopupVisible} onClose={closePopup} />
      )}
          
      <div className=" w-full">
        {/* Hero Section */}
        <Hero />
        <Services />
        <ClouSecOverview />
        
         {/* Featured Case Studies Section */}
        <section className="">
          <div className="flex justify-between items-center  px-5 pt-6  ">
           <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3 ">
   Case Studies
</h2>
           <div className="text-center mt-6">
              {/* <Link 
                to="" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                
              </Link> */}

               <GradientLinkButton  icon='true'  path="/case-studies " className='rounded-none'>
                View All Case Studies
      </GradientLinkButton>
            </div>
          </div>

          <CaseStudyList isVisible={false}  />
        </section>
        
        <PricingSection />
        <ClouSecPlatform />
        {/* Latest Blog Posts Section */}
          <VideoContentSlider />

        <section className="">
       

            <div className="flex justify-between items-center  px-5 pt-6  ">
      <div className='flex flex-col gap-6 pt-10'>
             <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3 ">
   Read our blog
</h2>
<p className="text-1xl text-gray-800  pl-3 ">
We give actionable tips, strategies, and techniques to grow your business.
</p>
      </div>

           <div className="text-center mt-6">
              {/* <Link 
                to="" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                
              </Link> */}

               <GradientLinkButton  icon='true'  path="/blogs " className='rounded-none'>
                View All 
      </GradientLinkButton>
            </div>
          </div>

          <BlogList isVisible={false} />
        </section>


      <Newsletter />
       
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
