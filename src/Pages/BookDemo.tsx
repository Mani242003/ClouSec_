import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet";
import DemoForm from "../components/DemoForm"; // Adjust path as needed

const features = [
  "Clousec provides a holistic security solution that covers all aspects of your cloud infrastructure.",
  "Stay ahead of emerging threats with our real-time threat analysis, ensuring your cloud remains secure at all times.",
  "Navigate the complex world of compliance effortlessly with Clousec’s compliance-specific features.",
  "Bid farewell to tedious manual reporting processes. Clousec automates the reporting workflow.",
  "Minimize false positives and streamline operations with Clousec’s standardized suppression mechanisms.",
  "Foster teamwork and communication among your security and IT teams to achieve cloud security excellence.",
];

const BookDemo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Book Demo | ClouSec</title>
      </Helmet>
      <div className="pt-[85px] grid grid-cols-1 md:grid-cols-2 gap-10 p-10 min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-green-50">
        {/* Feature Section */}
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Shaping the Future of Cloud Security</h2>
          <p className="mb-6 text-gray-700">
            At Clousec, we believe that security should be as dynamic as the cloud itself.
            Our innovative approach empowers organizations to safeguard their digital assets
            with ease and confidence. In this demo, you can expect:
          </p>
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-800">
                <CheckCircle2 className="text-green-500 mt-1" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-xl rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">Book A Demo</h3>
          <DemoForm />
        </div>
      </div>
    </>
  );
};

export default BookDemo;
