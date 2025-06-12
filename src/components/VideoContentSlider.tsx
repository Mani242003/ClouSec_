import React, { useState } from "react";
import { ChevronLeft, ChevronRight,  ShieldCheck } from "lucide-react";

// Basic Button component using Tailwind
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <button
    className={`px-4 py-2 border rounded-xl hover:bg-gray-100 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Basic Card and CardContent components using Tailwind
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => <div className={` rounded-2xl ${className}`}>{children}</div>;

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4">{children}</div>
);

const slides = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/5HqhYLZSogA",
    title: "Minimize Your Attack Surface",
    
    content: [
      "Identify and prioritize vulnerabilities in your cloud infrastructure.",
      "Assess application and container weaknesses systematically.",
      "Patch vulnerabilities quickly and efficiently.",
      "Reduce your risk of exploitation with a proactive security approach."
       
    ],
  },
  // Add more slides if needed
];

const VideoContentSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Center title and description */}
      <div className="text-center mb-8 pt-5">
        <h1 className="text-3xl font-bold mb-2">Security Insight</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Learn how to reduce your vulnerability exposure with targeted cloud security practices.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button onClick={prevSlide}>
          <ChevronLeft />
        </Button>
        <div className="flex space-x-2">
          {/* {slides.map((_, index) => (
            <Circle
              key={index}
              size={16}
              className={`${
                index === currentSlide ? "fill-black text-black" : "text-gray-400"
              }`}
              fill={index === currentSlide ? "currentColor" : "none"}
            />
          ))} */}
        </div>
        <Button onClick={nextSlide}>
          <ChevronRight />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="w-full h-64 md:h-96">
          <iframe
            className="w-full h-full rounded-2xl"
            src={slides[currentSlide].videoUrl}
            title="Video Content"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <Card>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">
              {slides[currentSlide].title}
            </h2>
            <ul className="space-y-3 text-gray-700">
              {slides[currentSlide].content.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <ShieldCheck className="w-5 h-5 text-green-600 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoContentSlider;