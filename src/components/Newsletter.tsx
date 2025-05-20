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
    <div className="w-full bg-white py-10 px-6 flex  items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className=" w-full flex items-center justify-center gap-6  px-6 py-4 "
      >
        <div className="flex items-center justify-center gap-2">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white  p-2 rounded-lg text-white">
            <IoMdMail className="w-10 h-10" />
          </div>
          <span className="font-bold text-xl lg:text-[35px] text-black_">Newsletter</span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address*"
            required
            className="px-3 py-2 border border-primary2 rounded-md outline-none  "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition ml-6 "
          >
              <GradientLinkButton className="w-[200px]"  path="/">
                  Subscribe Now
                        </GradientLinkButton>
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default Newsletter;
