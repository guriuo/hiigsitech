'use client';

import React from 'react';

// Standalone Privacy Policy Page Component
// To use, import this component and place it in your routing structure.
// Example: <PrivacyPolicy />

export default function PrivacyPolicy() {
  return (
    <div className="bg-white dark:bg-gray-900 font-sans">
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>
        
        {/* Using a custom class for prose styling to enhance readability */}
        <div className="prose-custom">
          <section>
            <h2>1. Introduction and Scope</h2>
            <p>
              Welcome to Hiigsi Tech ("we," "our," or "us"). We are steadfast in our commitment to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy is designed to provide a comprehensive overview of how we collect, use, disclose, process, and safeguard your information when you visit our website, engage with our services, or interact with us through any digital medium. This policy applies to all information collected through our website, as well as any related services, sales, marketing, or events.
            </p>
            <p>
              Please read this policy meticulously to understand our views and practices regarding your personal data and how we will treat it. By accessing our site or utilizing our services, you acknowledge that you have read, understood, and agree to the practices described in this policy. If you do not agree with the terms herein, your choice is not to use our website or services. We may update this policy from time to time, and your continued use after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us, information that is automatically collected, and information from third-party sources. The type of information we collect depends on the context of your interactions with us.
            </p>
            <h3>2.1. Personal Data You Disclose to Us</h3>
            <p>
              This is information that personally identifies you. We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. This includes, but is not limited to: your full name, email address, postal address, telephone number, job title, and company name. If you make a purchase, we collect payment information through our secure payment processing partners.
            </p>
            <h3>2.2. Information Automatically Collected</h3>
            <p>
              When you navigate through and interact with our website, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns. This includes:
            </p>
            <ul>
                <li><strong>Log and Usage Data:</strong> Our servers automatically collect information when you access our site, such as your IP address, browser type and settings, operating system, access times, pages viewed, and the referring URL.</li>
                <li><strong>Device Data:</strong> We collect information about the computer, phone, tablet, or other device you use to access our services. This may include the device model, hardware, operating system, device identifiers, and location data.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, pixel tags, and other similar tracking technologies to collect information about your browsing activities over time and across different websites. This helps us to improve our website and to deliver a better and more personalized service. You can control the use of cookies at the individual browser level.</li>
            </ul>
             <h3>2.3. Information from Third Parties</h3>
            <p>
                We may obtain information about you from other sources, such as public databases, joint marketing partners, social media platforms (like LinkedIn, Twitter, etc.), and other third parties. This information allows us to enhance our ability to provide relevant marketing, offers, and services to you.
            </p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect or receive for legitimate business purposes, including to provide and improve our services, for marketing and advertising, and for security and legal reasons. Specifically, we use your information to:
            </p>
            <ul>
              <li><strong>Provide, Operate, and Maintain our Services:</strong> To create and manage your account, fulfill and manage orders, process payments, and provide you with customer support.</li>
              <li><strong>Improve and Personalize our Services:</strong> To understand and analyze how you use our services, to develop new products, services, features, and functionality, and to personalize your experience.</li>
              <li><strong>Communicate with You:</strong> To send you administrative information, such as updates to our terms and policies, and to respond to your inquiries. We may also send you marketing communications, such as newsletters and promotional offers, which you can opt-out of at any time.</li>
              <li><strong>Marketing and Advertising:</strong> To develop and display personalized content and advertising tailored to your interests and location and to measure its effectiveness.</li>
              <li><strong>Security and Fraud Prevention:</strong> To monitor and prevent fraudulent transactions, protect against criminal activity, and enforce our terms of service.</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations, respond to legal requests from public authorities, and to protect our rights, property, and safety, and that of our users and the public.</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share your information with third parties only in the ways that are described in this Privacy Policy.
            </p>
            <ul>
                <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, consultants, and other service providers who perform services on our behalf, such as hosting, data analysis, payment processing, email delivery, and marketing services.</li>
                <li><strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.</li>
                <li><strong>To Comply with Laws:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                <li><strong>To Protect Rights:</strong> We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
            </ul>
          </section>

          <section>
            <h2>5. Your Data Protection Rights</h2>
            <p>
              Depending on your geographical location and citizenship, you may have certain rights regarding your personal data under laws like the GDPR or CCPA. These rights may include:
            </p>
            <ul>
                <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p>If you would like to exercise any of these rights, please contact us using the details provided below.</p>
          </section>
          
          <section>
            <h2>6. Data Security and Retention</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions, comments, or concerns about this Privacy Policy or our data practices, please do not hesitate to contact us.
              <br /><br />
              <strong>Hiigsi Tech</strong>
              <br />
              Hargeisa, Somalia
              <br />
              Email: <a href="mailto:privacy@aleencreatives.com">privacy@aleencreatives.com</a>
            </p>
          </section>
        </div>
      </div>
      <style jsx global>{`
        .prose-custom {
          color: #374151; /* text-gray-700 */
        }
        .dark .prose-custom {
          color: #d1d5db; /* text-gray-300 */
        }
        .prose-custom h2 {
          font-family: 'Inter', sans-serif;
          font-size: 1.875rem; /* text-3xl */
          font-weight: 800;
          letter-spacing: -0.025em;
          margin-top: 2.5em;
          margin-bottom: 1em;
          padding-bottom: 0.5em;
          border-bottom: 1px solid #e5e7eb; /* border-gray-200 */
        }
        .dark .prose-custom h2 {
          border-bottom-color: #374151; /* border-gray-700 */
          color: #f9fafb; /* text-gray-50 */
        }
        .prose-custom h3 {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem; /* text-2xl */
          font-weight: 700;
          margin-top: 2em;
          margin-bottom: 1em;
        }
        .dark .prose-custom h3 {
          color: #f3f4f6; /* text-gray-100 */
        }
        .prose-custom p, .prose-custom li {
          font-family: 'Lora', serif;
          font-size: 1.125rem; /* text-lg */
          line-height: 1.75;
          margin-bottom: 1.25em;
        }
        .prose-custom ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin-bottom: 1.25em;
        }
        .prose-custom a {
          color: #2563eb; /* text-blue-600 */
          text-decoration: none;
          transition: color 0.2s ease-in-out;
        }
        .prose-custom a:hover {
          color: #1d4ed8; /* text-blue-800 */
          text-decoration: underline;
        }
        .dark .prose-custom a {
          color: #60a5fa; /* text-blue-400 */
        }
        .dark .prose-custom a:hover {
          color: #93c5fd; /* text-blue-300 */
        }
      `}</style>
    </div>
  );
}
