import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminCredentials, clearAdminCredentials } from '../../services/api';
import backgroundImage from "/bg1.jpg";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu"
import AspectRatioBox from '../AspectRatioBox';
import GradientLinkButton from '../common/GradientLinkButtonProps';
import ListItem from '../common/ListItem';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white mt-[-10px] ">
      <div className="flex-grow">{children}</div>
    </div>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = !!getAdminCredentials();
  const [scrolled] = useState(false);
 const [visible, setVisible] = useState(true);

  useEffect(() => {
  const onScroll = () => {
    if (window.scrollY < 50) {
      setVisible(true);     // show if user scrolls to top
    } else {
      setVisible(false);    // hide when scrolling down
    }
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

 useEffect(() => {
  if (scrolled && visible) {
    setVisible(false);
  }
}, [scrolled, visible]);


  const handleLogout = () => {
    clearAdminCredentials();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

 

// const handleClose = () => {
//   setVisible(false); // hides until refresh
// };


const [manuallyClosed, setManuallyClosed] = useState(false);

useEffect(() => {
  const onScroll = () => {
    if (!manuallyClosed) {
      if (window.scrollY < 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, [manuallyClosed]);

const handleClose = () => {
  setManuallyClosed(true);
  setVisible(false);
};


  return (
    <header
      // className="bg-white s  w-full top-0 z-50



      className={cn(
        "  transition-colors w-full fixed bg-white  z-50",
        scrolled ? "top-0 shadow-md " : ""
      )}

    >

      {/* announcemt */}

      {

        (visible  ) && (
          <div
            className={cn(
              "relative w-full bg-primary2 text-[13px] flex flex-wrap items-center justify-center text-white_ font-sans px-4 py-2 gap-2 transition-all duration-500 ease-in-out",
              scrolled ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
            )}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white_ text-xl hover:text-red-400 transition"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>

            <img src="/aws.svg" width="30" alt="AWS logo" className="flex-shrink-0" />

            <div className="border-l border-white h-[25px] mx-2 hidden sm:block  " />

            <div className="flex flex-col leading-tight pr-4 sm:pr-5 text-center sm:text-left">
              <span>2025</span>
              <span>Marketplace</span>
            </div>

            <span className="text-center sm:text-left w-full sm:w-auto">
              Version 1.0.49 – We've fixed security vulnerabilities identified by AWS Marketplace.
            </span>

            <a
              href="https://aws.amazon.com/marketplace/pp/prodview-tr7svw2t4342o"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More →
            </a>
          </div>
        )
      }

      {/* navbar */}
      <div className={cn(
        "  transition-colors w-full fixed bg-white bg-white px-8 flex  border-b border-gray-200 z-50",
        scrolled ? "top-0 shadow-md " : " "
      )}>
        <div className="w-full flex gap-2  py-3">
          {/* Logo */}
        <div>
            <Link to="/" className="text-2xl font-bold text-blue-600">
            <img alt="logo" src="./logo.png" className="w-[170px]" />
          </Link>
        </div>

          {/* Desktop Navigation */}
         <div className='w-full '>
           <nav className="hidden md:flex  items-center  space-x-8 ">
          
              {isAdmin && (
           <>
           
            <div className=' w-full flex items-center gap-20 justify-center'>
              <Link to="/blogs" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Blog
            </Link>
            <Link to="/case-studies" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Case Studies
            </Link>
            <Link to="/documentation" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Documentation
            </Link>
            </div>
           </>
              )}

                {!isAdmin && (

            <div className="w-full hidden md:flex justify-between items-center pl-10 ">

              <NavigationMenu>
                <NavigationMenuList className="flex  items-center justify-between w-full">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-black" >Platform</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white text-black ">
                      <ul className="grid    h-[350px]  md:w-[600px] lg:w-[700px] lg:grid-cols-[.75fr_1fr] border-none">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <div
                              className="flex flex-col h-full w-full select-none rounded-md p-6 no-underline outline-none focus:shadow-md bg-bg_light"

                            >
                              <span className="text-black_ text-[22px] font-bold">See ClouSec in action</span>

                              <span className="text-gray_ text-[15px] py-2 pb-3"> One platform to secure your apps and data in the cloud.</span>

                              <AspectRatioBox ratio="">

                                <img
                                  src="/banner.jpg"
                                  alt="ClouSec cloud security platform visualization"
                                  style={{
                                    objectFit: 'cover',
                                  }}
                                />
                              </AspectRatioBox>


                              <GradientLinkButton className="mt-[9.5rem]" path="/book-demo">
                                Get a Demo
                              </GradientLinkButton>

                            </div>
                          </NavigationMenuLink>
                        </li>
                        <div className="flex flex-col gap-2 p-3">
                          <ListItem href="/" title="Architecture	Diagram">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!
                          </ListItem>
                          <ListItem href="/documentation" title="Documentation">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

                          </ListItem>
                          <ListItem href="/#pricing" title="Pricing">
                            Styles for headings, paragraphs, lists...etc
                          </ListItem>
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-black">Company</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white text-black">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[500px] ">
                        <ListItem href="/about-us" title="About	Us">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

                        </ListItem>
                        {/* <ListItem href="/docs" title="Team">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

                        </ListItem> */}
                        <ListItem href="/" title="Contact	Us">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-black font-bolder "> Resources</NavigationMenuTrigger>
                    
                    <NavigationMenuContent className="bg-white text-black ">
                      <ul className="grid    h-[300px]  grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-1 lg:w-[500px] border-none">
                     
                        <div className="flex flex-col gap-2 p-0">
                          <ListItem href="/case-studies" title="Case	Studies">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!
                        </ListItem>
                        <ListItem href="/" title="Videos">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

                          {/* /  Re-usable components built using Radix UI and Tailwind CSS. */}
                        </ListItem>
                        <ListItem href="/blogs" title="Blog">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quam, maiores facilis a placeat mollitia neque obcaecati, error illum sequi tenetur, ullam cumque sit odit ea vel adipisci quia nemo!

                          {/* Re-usable components built using Radix UI and Tailwind CSS. */}
                        </ListItem>
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                   <Link className="ml-3 mr-6 font-semi-bolder text-[15px]" to="/" >Partners</Link>

                  {/* <Link className="ml-3 mr-6 font-semi-bolder text-[15px]" to="/lab" /> */}
                  {/* <Link lable="Join Now" path="/mani" /> */}


                </NavigationMenuList>
              </NavigationMenu>
              <div className=" hidden lg:flex ">
                {/* <Link label="Sign In" path="/lab" /> */}
                {/* <NavigationMenuTrigger>Getting started</NavigationMenuTrigger> */}
                <GradientLinkButton  icon='false' path="/book-demo">
                  Get	Secure
                  with	ClouSec
                </GradientLinkButton>

              </div>
            </div>
                )}

            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 transition duration-300">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              // <Link to="/login" className="text-gray-700 hover:text-blue-600 transition duration-300">
              //   Admin Login
              // </Link>
              <></>
            )}
          </nav>
         </div>

          {/* Mobile Menu Button */}
      <div>
            <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
      </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/case-studies"
              className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              to="/documentation"
              className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>

            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-800 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
