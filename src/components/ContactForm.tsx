// src/components/ContactForm.tsx
import React, { useState } from "react";
import { sendContactEmail } from "../api/emailService";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  country: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    country: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Send email using the email service
      const result = await sendContactEmail(form);
      
      if (result.success) {
        // Success message
        setSubmitStatus({
          type: "success",
          message: result.message,
        });
        
        // Reset form
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          jobTitle: "",
          phone: "",
          country: "",
          message: "",
        });
      } else {
        // Error message
        setSubmitStatus({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "There was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {submitStatus.type && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            onChange={handleChange}
            value={form.firstName}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={form.lastName}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Business Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={form.email}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company *
        </label>
        <input
          id="company"
          name="company"
          required
          onChange={handleChange}
          value={form.company}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          onChange={handleChange}
          value={form.jobTitle}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          onChange={handleChange}
          value={form.phone}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <input
          id="country"
          name="country"
          onChange={handleChange}
          value={form.country}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          onChange={handleChange}
          value={form.message}
          className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        ></textarea>
      </div>

      <div className="text-sm text-gray-500">
        <p>Date: {formatDate()}</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
