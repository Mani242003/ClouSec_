// components/DemoForm.tsx
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Submit logic here
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" required onChange={handleChange} value={form.firstName} className="border p-2 rounded" placeholder="First Name *" />
        <input name="lastName" onChange={handleChange} value={form.lastName} className="border p-2 rounded" placeholder="Last Name" />
      </div>
      <input name="email" required type="email" onChange={handleChange} value={form.email} className="w-full border p-2 rounded" placeholder="Business Email *" />
      <input name="company" required onChange={handleChange} value={form.company} className="w-full border p-2 rounded" placeholder="Company *" />
      <input name="jobTitle" onChange={handleChange} value={form.jobTitle} className="w-full border p-2 rounded" placeholder="Job Title" />
      <input name="phone" onChange={handleChange} value={form.phone} className="w-full border p-2 rounded" placeholder="Phone" />
      <input name="country" onChange={handleChange} value={form.country} className="w-full border p-2 rounded" placeholder="Country" />
      <input
        type="datetime-local"
        name="demoDate"
        required
        onChange={handleChange}
        value={form.demoDate}
        className="w-full border p-2 rounded"
        min="2025-05-11T08:00"
        max="2025-05-12T00:00"
      />
      <p className="text-sm text-gray-500">
        Please choose a time between <strong>8:00 AM</strong> and <strong>12:00 AM</strong> (India Standard Time).
      </p>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
        Schedule Demo
      </button>
    </form>
  );
};

export default DemoForm;
