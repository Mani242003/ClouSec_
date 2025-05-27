import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import Footer from '@/components/Layout/Footer';
import a from "/bg1.jpg";
import DemoForm from '@/components/DemoForm'; // Or your custom ContactForm

const ContactPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-white">
     <div
        className="pt-[50px] flex items-center justify-center text-white px-8"
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
            <h2 className="text-5xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              We’d love to hear from you
            </p>
          </div>
        </div>
      </div>

      <main className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 py-16 gap-10">
        {/* Left Side: Contact Info */}
        <div className="w-full lg:w-1/2 space-y-10">
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 border-b pb-2 border-gray-200">India Office</h2>
            <div className="flex gap-4 text-gray-700">
              <MapPin className="text-blue-600 shrink-0" />
              <div>
                No. 52/1, 2nd Floor, Meenambal Salai,<br />
                Vivekananda Nagar,<br />
                Kodungaiyur, Chennai – 600118, India<br />
                (Near S.K Mahal & Indian Bank)
              </div>
            </div>
            <div className="flex gap-4 text-gray-700">
              <Phone className="text-green-600 shrink-0" />
              <p>+91 97908 45787 / +91 93453 36553</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 border-b pb-2 border-gray-200">USA Office</h2>
            <div className="flex gap-4 text-gray-700">
              <MapPin className="text-blue-600 shrink-0" />
              <p>11700 Lebanon Road, Apt 1527,<br />Frisco, TX 75035-75025, USA</p>
            </div>
            <div className="flex gap-4 text-gray-700">
              <Mail className="text-red-600 shrink-0" />
              <div>
                <a href="mailto:sales@clousec.net" className="hover:underline text-blue-700">sales@clousec.net</a><br />
                <a href="mailto:jerome@clousec.net" className="hover:underline text-blue-700">jerome@clousec.net</a><br />
                <a href="mailto:support@clousec.net" className="hover:underline text-blue-700">support@clousec.net</a>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-2xl shadow-inner flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Globe className="text-purple-600" />
              <div>
                <a href="https://www.clousec.in" className="hover:underline text-blue-700">www.clousec.in</a><br />
                <a href="https://www.clousec.net" className="hover:underline text-blue-700">www.clousec.net</a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Linkedin className="text-blue-800" />
              <a 
                href="https://www.linkedin.com/company/clousec-technologies-pvt-ltd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-700 hover:underline"
              >
                Connect on LinkedIn
              </a>
            </div>
          </section>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send us a Message</h2>
          <DemoForm /> {/* Replace with your form component */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
