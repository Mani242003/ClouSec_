import a from "/bg1.jpg";
import {
  ShieldCheck,
  Briefcase,
  GraduationCap,
  BarChart3,
  PiggyBank,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {  FaLinkedin } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Footer from "@/components/Layout/Footer";

// Team data
const teamMembers = [
  
  {
    src: "/team_1.jpg",
    alt: "Team Member 1",
    name: "Mr. Logeshwaran",
    position: "Full Stack Developer",
    subPostion :" AWS Solution Architect",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    src: "/team_2.jpg",
    alt: "Team Member 2",
    name: "Mr. Faisal",

    position: "Full Stack Developer",
        subPostion :" AWS Solution Architect",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    src: "/team_3.jpg",
    alt: "Team Member 3",
    name: "Mr. Ruffes Raja",
    position: "Backend Developer",
    // subPostion :" Cloud Architect",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    src: "/team_4.jpg",
    alt: "Team Member 4",
    name: "Mr. Praveen Raj",
    position: "Junior Cloud Engineer ",
        subPostion :"AWS Practitioner",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  // Add more if needed
];

const AboutUs = () => {

  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive logic
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerView(1); // phone
      else if (width < 1024) setCardsPerView(2); // tablet
      else setCardsPerView(3); // desktop
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Auto slide
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) =>
        (prev + cardsPerView) % teamMembers.length
      );
    }, 3000);
    return () => clearInterval(intervalId);
  }, [cardsPerView]);

  const visibleMembers = teamMembers
    .slice(currentIndex, currentIndex + cardsPerView)
    .concat(
      teamMembers.slice(0, Math.max(0, currentIndex + cardsPerView - teamMembers.length))
    );


     useEffect(() => {
          window.scrollTo(0, 0);
          // document.title = "ClouSec - About Us";
        }, []);



  return (

    <>
     <Helmet>
            <title>About Us | ClouSec</title>
          </Helmet>
    <section className="bg-gray-50">
      {/* Banner Section */}
      <div
        className="pt-[60px] flex items-center justify-center text-white px-8"
        style={{
          backgroundImage: `url(${a})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex w-full max-w-7xl py-20 items-center justify-center text-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Meet the Visionary Behind ClouSec
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              Driven by over 10 years of experience in Information Technology, our
              founder recognized the growing need for a more intelligent and automated
              approach to cloud security...
            </p>
          </div>
        </div>
      </div>

       <div className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          ClouSec: The AI-Powered RegTech Platform for Effortless Cloud Compliance
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          As cloud adoption accelerates, organizations – from startups to large enterprises – face growing challenges in cloud security, misconfigurations, operational automation, and compliance management. Managing permissions, securing environments, and ensuring regulatory compliance across multiple cloud platforms has become increasingly complex and error-prone.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Streamline cloud security and compliance with <span className="font-semibold text-blue-600">ClouSec</span>, the intelligent RegTech platform designed for modern businesses. Unlike traditional CSPM tools, ClouSec delivers a unified solution with <span className="font-medium">Cloud-Native Application Protection Platform (CNAPP)</span>, <span className="font-medium">Cloud Infrastructure Entitlement Management (CIEM)</span>, and <span className="font-medium">Cloud Center of Excellence (CCoE)</span> capabilities—providing a comprehensive shield for cloud infrastructures of any scale.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-6">
          ClouSec empowers organizations to meet country-specific regulatory standards, automate cloud security operations using AI, and reduce monthly cloud billing.
        </p>
      </div>
    </div>

          {/* Founder Section */}
     <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-10">
  {/* Image Section */}
  <div className="flex-1">
    <img
      src="/founder.jpg"
      alt="Jerome Melkisidak"
      className="w-full rounded-[20px] object-cover shadow-lg"
    />
  </div>

  {/* Text Section */}
  <div className="flex-1 flex flex-col justify-center space-y-8">
    <h3 className="text-4xl font-bold text-gray-900">Jerome Melkisidak</h3>

    <div className="flex items-start gap-5">
      <Briefcase className="text-blue-600 w-7 h-7 pt-1 shrink-0" />
      <p className="text-lg text-gray-700 leading-relaxed">
        Jerome brings a unique blend of technical acumen and business insight to ClouSec, holding a <span className="font-medium">B.E. in Computer Science & Engineering</span> and an <span className="font-medium">MBA in HR & Finance</span>. Since 2014, he has built a proven track record across construction, technology, and banking sectors.
      </p>
    </div>

    <div className="flex items-start gap-5">
      <GraduationCap className="text-green-600 w-7 h-7 pt-1 shrink-0" />
      <p className="text-lg text-gray-700 leading-relaxed">
        He contributes to academia as a Board of Study Member at <span className="font-medium">SRM Valliammai College of Engineering</span> & <span className="font-medium">Mother Theresa Institute of Engineering and Technology</span>.
      </p>
    </div>

    <div className="flex items-start gap-5">
      <ShieldCheck className="text-purple-600 w-7 h-7 pt-1 shrink-0" />
      <p className="text-lg text-gray-700 leading-relaxed">
        With a team of certified cloud architects and cybersecurity experts, Jerome is dedicated to reshaping cloud security, simplifying compliance, and enhancing organizational confidence in the cloud.
      </p>
    </div>
  </div>
</div>

      {/* Co-Founder Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row-reverse gap-10">
  {/* Image Section */}
  <div className="flex-1">
    <img
      src="/co-founder.jpg"
      alt="Mrs. Diana"
      className="w-full h-full object-cover shadow-lg rounded-[20px]"
    />
  </div>

  {/* Text Section */}
  <div className="flex-1 flex flex-col justify-center space-y-8">
    <h3 className="text-4xl font-bold text-gray-900">Mrs. Diana Vedhanayagam</h3>

    <div className="flex items-start gap-5">
      <BarChart3 className="text-pink-600 w-7 h-7 pt-1 shrink-0" />
      <p className="text-lg text-gray-700 leading-relaxed">
        As Co-Founder, Mrs. Diana leverages over <span className="font-medium">5 years of experience in social media analysis</span> to drive strategic marketing and optimize financial planning at ClouSec.
      </p>
    </div>

    <div className="flex items-start gap-5">
      <PiggyBank className="text-yellow-600 w-7 h-7 pt-1 shrink-0" />
      <p className="text-lg text-gray-700 leading-relaxed">
        She refined her skills at top companies like <span className="font-medium">Dell</span>, delivering <span className="font-medium">data-driven insights</span> into market trends, strategic partnerships, and financial operations.
      </p>
    </div>

    <div className="flex items-start gap-5">
      <Target className="text-indigo-600 w-7 h-7 pt-1 shrink-0" />
      <p className="text-lg text-gray-700 leading-relaxed">
        Diana ensures marketing initiatives are <span className="font-medium">aligned with business goals</span> while maintaining <span className="font-medium">brand consistency</span> and financial efficiency.
      </p>
    </div>
  </div>
</div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Meet Our Team
        </h3>

        <div className="relative w-full flex items-center justify-center">
          <motion.div
            className="flex gap-8 w-full justify-center flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {visibleMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-full sm:w-[45%] lg:w-[30%] transition-all"
              >
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl w-full h-[420px] flex flex-col items-center justify-center">
                  <img
                    src={member.src}  
                    alt={member.alt}
                    className="w-32 h-32 object-cover rounded-full mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    {member.name}
                  </h4>
                <p className="text-gray-600 text-center">{member.position}</p>
  {member.subPostion && (
    <p className="text-sm text-gray-500 mb-4 text-center italic">
      {member.subPostion}
    </p>
  )}

                  <div className="flex gap-4 justify-center">
                    {/* <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaTwitter className="w-6 h-6" />
                    </a> */}
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800"
                    >
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                    {/* <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-gray-900"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a> */}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
          <Footer />
    
    </>
  );
};

export default AboutUs;
