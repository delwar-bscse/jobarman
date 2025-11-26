import { myFetch } from "../../../../utils/myFetch";

export default async function PrivacyPolicyPage() {
  const res = await myFetch("/disclaimer?type=privacy");
  return (
    <section className="min-h-[60vh] bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 sm:px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-2">
              Privacy Policy
            </h1>

            <p className="whitespace-pre-line">{res?.data?.content}</p>
            {/* <p className="text-sm text-gray-600 mb-6">
              Effective Date: [Insert Date]
            </p>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
              [Your Company/App Name] ("we", "our", or "us") respects your
              privacy and is committed to protecting it. This Privacy Policy
              explains how we collect, use, and protect your personal
              information when you use our app, website, or services
              (collectively, the "Services").
            </p>

            <div className="space-y-6 text-gray-800">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  1. Information We Collect
                </h2>
                <p className="text-sm sm:text-base mb-2">
                  We may collect the following types of information from you:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                  <li>
                    Personal Information: Name, email address, phone number,
                    billing information, or other data you provide when
                    registering or using our Services.
                  </li>
                  <li>
                    Usage Information: Data about how you use the Services, such
                    as pages visited, features used, and interaction logs.
                  </li>
                  <li>
                    Device Information: IP address, browser type, device model,
                    operating system, and mobile network information.
                  </li>
                  <li>
                    Cookies & Tracking: We may use cookies and similar
                    technologies to improve user experience and analytics.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  2. How We Use Your Information
                </h2>
                <p className="text-sm sm:text-base mb-2">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                  <li>Provide, maintain, and improve our Services.</li>
                  <li>
                    Communicate with you about updates, promotions, and support.
                  </li>
                  <li>Analyze usage patterns to improve user experience.</li>
                  <li>
                    Prevent fraud, unauthorized access, or illegal activities.
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
