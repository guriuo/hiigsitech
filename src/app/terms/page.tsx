'use client';

import React from 'react';

// Standalone Terms of Service Page Component
// To use, import this component and place it in your routing structure.
// Example: <TermsOfService />

export default function TermsOfService() {
  return (
    <div className="bg-white dark:bg-gray-900 font-sans">
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div className="prose-custom">
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing our website, engaging our services, or interacting with any platform owned by Hiigsi Tech ("we," "us," "our," or the "Company"), you agree to be bound by these Terms of Service ("Terms"). These Terms constitute a legally binding agreement governing your use of our website, products, and services (collectively, the "Services"). If you are using the Services on behalf of an organization, you are agreeing to these Terms for that organization and promising that you have the authority to bind that organization to these terms. In that case, "you" and "your" will refer to that organization. If you do not agree to these Terms, you must not access or use our Services.
            </p>
            <p>
              We reserve the right, in our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Services after any such changes become effective constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2>2. Our Services</h2>
            <p>
              Hiigsi Tech provides a suite of digital agency services, which may include, but are not limited to, web and application development, UI/UX design, branding strategy, and digital consulting. The precise scope, deliverables, timelines, and fees for any project will be detailed in a separate, written Statement of Work (SOW) or Project Proposal, which, once executed, becomes an integral part of these Terms. We reserve the right to withdraw or amend our Services, and any service or material we provide, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Services are unavailable at any time or for any period.
            </p>
          </section>

          <section>
            <h2>3. Intellectual Property Rights</h2>
            <h3>3.1. Client-Owned Deliverables</h3>
            <p>
              Upon your full and final payment for all fees associated with a project, we grant you a worldwide, royalty-free, non-exclusive license to use, reproduce, display, and distribute the final project deliverables created specifically for you. You will own these final deliverables.
            </p>
            <h3>3.2. Company's Retained IP</h3>
            <p>
              Notwithstanding the foregoing, we shall retain full ownership of all pre-existing materials, know-how, code, software, design frameworks, tools, and proprietary information used to create the deliverables ("Company IP"). You are granted a limited license to use the Company IP only to the extent it is embedded in the final deliverables. You may not, under any circumstances, decompile, reverse engineer, resell, or redistribute the Company IP without our express written consent. We also retain the right to showcase the work in our portfolio, marketing materials, and for promotional purposes, unless a specific non-disclosure agreement is in place.
            </p>
          </section>

          <section>
            <h2>4. User and Client Responsibilities</h2>
            <p>
              To ensure a successful partnership, you agree to provide all necessary information, materials, and feedback in a timely manner as required for the project. You represent and warrant that you have all necessary rights and permissions to provide any content, images, logos, or other materials ("Client Content") for use in the project and that such content does not infringe upon the intellectual property rights of any third party. You are responsible for all activities that occur under your account and for maintaining the confidentiality of your account information. You agree not to use the Services for any unlawful purpose or in any way that could damage, disable, or impair the Service.
            </p>
          </section>

          <section>
            <h2>5. Fees, Payment, and Refunds</h2>
            <p>
              The financial terms of our engagement will be specified in the SOW. Typically, projects require an initial deposit (e.g., 50%) before work begins, with the remaining balance due upon completion or at specified milestones. For ongoing services, fees will be billed on a recurring basis as agreed. All invoices are due upon receipt unless otherwise stated. Late payments may accrue interest at a rate of 1.5% per month or the maximum rate permitted by law. All payments made to us are non-refundable. If a project is terminated by you, you will be responsible for payment for all work completed up to the date of termination.
            </p>
          </section>

          <section>
            <h2>6. Confidentiality</h2>
            <p>
              Both parties acknowledge that they may receive confidential information from the other. "Confidential Information" includes the SOW, proprietary business information, technical data, and any other information marked as confidential. Each party agrees to hold the other's Confidential Information in strict confidence and not to disclose it to any third parties, except as required to perform its obligations under the agreement or as required by law. This obligation of confidentiality shall survive the termination of our engagement.
            </p>
          </section>
          
          <section>
            <h2>7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, WE DO NOT WARRANT THAT THE SERVICES WILL BE ERROR-FREE, UNINTERRUPTED, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT ANY DEFECTS WILL BE CORRECTED. WE HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
            </p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL Hiigsi Tech, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE. OUR TOTAL AGGREGATE LIABILITY FOR ANY AND ALL CLAIMS ARISING OUT OF THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE TOTAL AMOUNT OF FEES PAID BY YOU TO US IN THE SIX (6) MONTHS PRIOR TO THE EVENT GIVING RISE TO THE CLAIM.
            </p>
          </section>

          <section>
            <h2>9. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Hiigsi Tech, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services, including, but not limited to, any use of the Service's content, services, and products other than as expressly authorized in these Terms or your use of any information obtained from the Services.
            </p>
          </section>

          <section>
            <h2>10. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Somalia, without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Services shall be instituted exclusively in the courts of Hargeisa, Somalia. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
            </p>
          </section>

          <section>
            <h2>11. Contact Information</h2>
            <p>
              For any questions about these Terms, please contact us.
              <br /><br />
              <strong>Hiigsi Tech</strong>
              <br />
              Hargeisa, Somalia
              <br />
              Email: <a href="mailto:legal@aleencreatives.com">legal@aleencreatives.com</a>
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
