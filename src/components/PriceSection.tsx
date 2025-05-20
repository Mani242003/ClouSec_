// src/components/PricingSection.tsx

import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const enterpriseFeatures = [
  "Security Misconfigurations (ClouSec Compliance Suite)",
  "Threat Detection & Vulnerability Management",
  "Configuration Management Insights",
  "Identity & User Access Matrix",
  "Audit Logs",
  "Ticketing System with Suppression & Findings Workflow",
  "Comprehensive Tree View of your entire cloud estate",
  "Cost Saver: Automated rightsizing & idle-resource cleanup",
  "Ops Center: Centralized dashboard & alerts",
  "Reports: Scheduled exportable compliance & cost-analysis reports",
  "AI-Driven Auto-Assign Workflows with organization-wide SLA-based alerts",
];

const starterFeatures = [
  "Security Misconfigurations (ClouSec Compliance Suite)",
  "Comprehensive Tree View of your entire cloud estate",
  "Cost Saver: Automated rightsizing & idle-resource cleanup",
];

const plans = [
  {
    name: "ClouSec Enterprise Shield",
    price: "$6000 / year",
    highlight: "Best Value for Growing Teams",
    features: enterpriseFeatures,
    whyContact: [
      "Free deployment support to get you up and running quickly",
      "Tailored onboarding that fits your unique environment",
      "Dedicated Partner Success Manager to guide you every step of the way",
    ],
    cta: "Request Pricing & Demo",
    footer: "Ready to see ClouSec in action? Fill out the short form and we’ll get back to you within one to two business day.",
  },
  {
    name: "ClouSec Starter Shield",
    price: "$45 / month",
    highlight: "Your Early-Stage Security Partner",
    features: starterFeatures,
    whyContact: [
      "Free deployment support to get you up and running quickly",
      "Tailored onboarding that fits your unique environment",
      "Dedicated Partner Success Manager to guide you every step of the way",
    ],
    cta: "Request Pricing & Demo",
    footer: "Ready to see ClouSec in action? Fill out the short form and we’ll get back to you within one to two business day.",
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 flex flex-col gap-4">
          <h2 className="text-4xl font-bold text-gray-900">Simple Pricing</h2>
          <span className=" text-lg text-gray-600 ">
          No User / Resource-Based Limits | No hidden costs. Focus on Value, Not User Count ~ <span className="font-bold">Secure and optimize your cloud today.</span>
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.highlight}</p>
                <p className="mt-4 text-3xl font-bold text-indigo-600">{plan.price}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <div className="w-5 h-5 mt-1 mr-2 flex-shrink-0">
                        <CheckCircle2 className="text-green-500 w-full h-full" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800">Why Contact Us?</h4>
                  <ul className="mt-3 space-y-2">
                    {plan.whyContact.map((reason, index) => (
                      <li key={index} className="text-gray-600 text-sm flex items-start">
                        <div className="w-4 h-4 mt-1 mr-2 flex-shrink-0">
                          <CheckCircle2 className="text-indigo-500 w-full h-full" />
                        </div>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 text-sm text-gray-500 italic">{plan.footer}</p>
              </div>

              
<div className="mt-8">
  <Link
    to="/book-demo"
    className="block text-center bg-indigo-600 text-white py-3 px-5 rounded-xl hover:bg-indigo-700 transition w-full"
  >
    {plan.cta}
  </Link>
</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
