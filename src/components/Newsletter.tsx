import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import GradientLinkButton from "./common/GradientLinkButtonProps";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <div className="w-full bg-white py-10 px-4 sm:px-6 lg:px-20 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex flex-col sm:flex-row items-center sm:justify-between gap-6 px-4 py-4"
      >
        <div className="flex items-center gap-3 justify-center sm:justify-start w-full sm:w-auto">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-lg">
            <IoMdMail className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <span className="font-bold text-2xl sm:text-4xl text-black_">
            Newsletter
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address*"
            required
            className="w-full sm:w-auto flex-grow px-3 py-2 border border-primary2 rounded-md outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
       
            <GradientLinkButton path="/" className="w-full sm:w-[200px]">
              Subscribe Now
            </GradientLinkButton>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;
