import Footer from "@/components/Layout/Footer";

const PartnerPage = () => {
  return (
    <>
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-20 pt-[130px] sm:pt-[80px]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Join the ClouSec Partner Ecosystem
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          We’re on a mission to build the world’s leading cloud security and compliance network—and we want you to be a part of it. Whether you’re a managed service provider, security consultant, technology integrator, or reseller, partnering with ClouSec gives you the tools, resources, and expertise to deliver cutting-edge RegTech solutions to your customers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Partner with ClouSec?</h2>
        <ul className="space-y-4 text-gray-700 mb-10">
          <li>
            <strong>Expand Your Service Portfolio:</strong> Add a fully managed, AI-driven cloud security platform to your offerings. ClouSec’s PaaS architecture means zero agents to install, minimal configuration, and rapid time-to-value for your clients.
          </li>
          <li>
            <strong>Win More Deals:</strong> Joint go-to-market support, co-branded marketing assets, and lead-sharing programs help you differentiate in a crowded marketplace and close deals faster.
          </li>
          <li>
            <strong>Increase Customer Stickiness:</strong> Offer continuous compliance, automated remediation, and cost optimization wrapped in an all-in-one dashboard. Retain customers longer by solving multiple pain points under a single platform.
          </li>
          <li>
            <strong>Access Training & Certification:</strong> Get exclusive access to ClouSec Academy training modules, technical certifications, and sales enablement materials to ensure your team is fully equipped to sell and support our solution.
          </li>
          <li>
            <strong>Attractive Revenue Model:</strong> Competitive margins, recurring revenue share, and performance incentives.
          </li>
        </ul>

        <div className="bg-white shadow rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Get Started?</h3>
          <p className="text-gray-700 mb-4">
            Fill out our simple application form, and one of our Partner Success Managers will reach out within 48 hours to discuss next steps.
          </p>
          <a
            href="https://forms.gle/BzjkL2os7TUNmYWG9"
              target="_blank"
  rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Apply to Become a ClouSec Partner
          </a>
        </div>

        <div className="text-sm text-gray-600">
          <p>Questions? Email us at <a href="mailto:sales@clousec.net" className="text-blue-600 hover:underline">sales@clousec.net</a> and <a href="mailto:support@clousec.net" className="text-blue-600 hover:underline">support@clousec.net</a> or call <span className="font-medium">+91 9790845787</span>.</p>
          <p className="mt-2">We look forward to building the future of cloud security—together.</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PartnerPage;