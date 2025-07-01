// // components/DemoForm.tsx
// import React, { useState } from "react";

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   company: string;
//   jobTitle: string;
//   phone: string;
//   country: string;
//   demoDate: string;
// }

// const DemoForm = () => {
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     company: "",
//     jobTitle: "",
//     phone: "",
//     country: "",
//     demoDate: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", form);
//     // Submit logic here
//   };

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input name="firstName" required onChange={handleChange} value={form.firstName} className="border p-2 rounded" placeholder="First Name *" />
//         <input name="lastName" onChange={handleChange} value={form.lastName} className="border p-2 rounded" placeholder="Last Name" />
//       </div>
//       <input name="email" required type="email" onChange={handleChange} value={form.email} className="w-full border p-2 rounded" placeholder="Business Email *" />
//       <input name="company" required onChange={handleChange} value={form.company} className="w-full border p-2 rounded" placeholder="Company *" />
//       <input name="jobTitle" onChange={handleChange} value={form.jobTitle} className="w-full border p-2 rounded" placeholder="Job Title" />
//       <input name="phone" onChange={handleChange} value={form.phone} className="w-full border p-2 rounded" placeholder="Phone" />
//       <input name="country" onChange={handleChange} value={form.country} className="w-full border p-2 rounded" placeholder="Country" />
//       <input
//         type="datetime-local"
//         name="demoDate"
//         required
//         onChange={handleChange}
//         value={form.demoDate}
//         className="w-full border p-2 rounded"
//         min="2025-05-11T08:00"
//         max="2025-05-12T00:00"
//       />
//       <p className="text-sm text-gray-500">
//         Please choose a time between <strong>8:00 AM</strong> and <strong>12:00 AM</strong> (India Standard Time).
//       </p>
//       <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
//         Schedule Demo
//       </button>
//     </form>
//   );
// };

// export default DemoForm;


// src/components/DemoForm.tsx
import React, { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  country: string;
  demoDate: string;
}

const DemoForm = () => {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    country: "",
    demoDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData();
    formData.append("access_key", "cc9aada6-93e2-4928-8622-12437522d071"); // ✅ Replace with your Web3Forms key

    // Map form fields to Web3Forms
    formData.append("First Name", form.firstName);
    formData.append("Last Name", form.lastName);
    formData.append("Email", form.email);
    formData.append("Company", form.company);
    formData.append("Job Title", form.jobTitle);
    formData.append("Phone", form.phone);
    formData.append("Country", form.country);
    formData.append("Preferred Demo Date & Time", form.demoDate);

    // Optional fields
    formData.append("subject", "Demo Requested for ClouSec");
    formData.append("from_name", "Demo Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your demo has been scheduled.",
        });

        setForm({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          jobTitle: "",
          phone: "",
          country: "",
          demoDate: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Submission failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Web3Forms error:", error);
      setSubmitStatus({
        type: "error",
        message: "There was an error submitting the form.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayDate = new Date();
const yyyy = todayDate.getFullYear();
const mm = String(todayDate.getMonth() + 1).padStart(2, "0");
const dd = String(todayDate.getDate()).padStart(2, "0");

const minTime = `${yyyy}-${mm}-${dd}T08:00`;
// const maxTime = `${yyyy}-${mm}-${dd}T23:59`;


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
        <input
          name="firstName"
          required
          onChange={handleChange}
          value={form.firstName}
          className="border p-2 rounded"
          placeholder="First Name *"
        />
        <input
          name="lastName"
          onChange={handleChange}
          value={form.lastName}
          className="border p-2 rounded"
          placeholder="Last Name"
        />
      </div>

      <input
        name="email"
        required
        type="email"
        onChange={handleChange}
        value={form.email}
        className="w-full border p-2 rounded"
        placeholder="Business Email *"
      />

      <input
        name="company"
        required
        onChange={handleChange}
        value={form.company}
        className="w-full border p-2 rounded"
        placeholder="Company *"
      />

      <input
        name="jobTitle"
        onChange={handleChange}
        value={form.jobTitle}
        className="w-full border p-2 rounded"
        placeholder="Job Title"
      />

      <input
        name="phone"
        onChange={handleChange}
        value={form.phone}
        className="w-full border p-2 rounded"
        placeholder="Phone"
      />

      <input
        name="country"
        onChange={handleChange}
        value={form.country}
        className="w-full border p-2 rounded"
        placeholder="Country"
      />

<input
  type="datetime-local"
  name="demoDate"
  required
  onChange={handleChange}
  value={form.demoDate}
  className="w-full border p-2 rounded"
  min={minTime}
/>


      <p className="text-sm text-gray-500">
        Please choose a time between <strong>8:00 AM</strong> and <strong>12:00 AM</strong> (India Standard Time).
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Sending..." : "Schedule Demo"}
      </button>
    </form>
  );
};

export default DemoForm;
