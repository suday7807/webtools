import { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Read how ${SITE_NAME} collects, uses, and protects your information, including our use of cookies and advertising.`,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
}

const sections = [
  {
    title: '1. Introduction',
    body: `At ${SITE_NAME}, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (the "Service"). By using the Service, you consent to the practices described in this policy.`,
  },
  {
    title: '2. Information We Collect',
    body: `We collect limited information to operate and improve the Service:
- Information you provide directly, such as your name and email address when you contact us.
- Information collected automatically, such as your IP address, browser type, device type, and pages visited, through cookies and similar technologies.
- Files you process through our tools. Most file-based tools run entirely in your browser, so the files themselves are never transmitted to or stored on our servers. For AI tools, only the short text keyword you enter is sent to our server to generate results.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `We use the information we collect to:
- Provide, operate, and maintain the Service.
- Respond to your comments, questions, and support requests.
- Analyze usage patterns to improve functionality and user experience.
- Deliver and manage advertising, as described below.
- Detect, prevent, and address technical or security issues.`,
  },
  {
    title: '4. Cookies and Tracking Technologies',
    body: `We use cookies and similar technologies to keep the Service reliable and to understand how it is used. A cookie is a small file stored on your device.

- Essential cookies: required for basic features such as theme preferences.
- Analytics cookies: help us understand aggregate usage. We may use third-party analytics services to analyze traffic.
- Advertising cookies: where we display advertising, third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website and other sites on the Internet.

You can control cookies through your browser settings, and you can opt out of personalized advertising from Google by visiting Google's Ads Settings (https://www.google.com/settings/ads). You can also visit https://www.aboutads.info to learn more about opting out of interest-based advertising.`,
  },
  {
    title: '5. Advertising (Google AdSense)',
    body: `We may display advertisements served by Google AdSense. Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on your visits to this and other websites.

Google's use of the advertising cookie enables it and its partners to serve ads based on your prior visits to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google's Ads Settings (https://www.google.com/settings/ads) or www.aboutads.info. Our partners' ad serving is governed by their own privacy policies.`,
  },
  {
    title: '6. Third-Party Services',
    body: `We may use third-party services for functionality, communication, and analytics, including:
- Contact form processing services to deliver messages you send us.
- Analytics and advertising services as described in this policy.

Each third-party service has its own privacy policy governing its collection and use of information. We encourage you to review them. We are not responsible for the privacy practices of third-party websites.`,
  },
  {
    title: '7. Data Retention',
    body: `We retain personal information only for as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce agreements. Files processed through our browser-based tools are not retained. Contact messages are retained only as long as needed to respond to and resolve your inquiry.`,
  },
  {
    title: '8. Data Security',
    body: `We implement appropriate technical and organizational measures to protect your personal information, including serving the site over HTTPS. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '9. Your Rights',
    body: `Depending on your location, you may have the right to:
- Access the personal information we hold about you.
- Request correction of inaccurate information.
- Request deletion of your personal information.
- Object to or restrict certain processing of your data.
- Data portability.

To exercise any of these rights, contact us using the details below. We will respond within a reasonable timeframe.`,
  },
  {
    title: '10. GDPR and CCPA Compliance',
    body: `If you are located in the European Economic Area (EEA) or the United Kingdom, you have the rights described under the General Data Protection Regulation (GDPR), including the right to lodge a complaint with your local supervisory authority.

If you are a California resident, the California Consumer Privacy Act (CCPA/CPRA) grants you the right to know what personal information we collect, request its deletion, and opt out of the sale of personal information. We do not sell personal information.`,
  },
  {
    title: "11. Children's Privacy",
    body: `The Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.`,
  },
  {
    title: '12. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will post any changes on this page and update the "Last updated" date below. Continued use of the Service after changes are posted constitutes acceptance of the revised policy.`,
  },
  {
    title: '13. Contact Us',
    body: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at suday7807@gmail.com or through our contact page.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 1, 2026</p>

          <div className="space-y-8">
            {sections.map((section) => {
              const lines = section.body.split('\n').map((l) => l.trim()).filter(Boolean)
              const blocks: (string | string[])[] = []
              let currentList: string[] = []
              for (const line of lines) {
                if (line.startsWith('- ')) {
                  currentList.push(line.slice(2))
                } else {
                  if (currentList.length) {
                    blocks.push(currentList)
                    currentList = []
                  }
                  blocks.push(line)
                }
              }
              if (currentList.length) blocks.push(currentList)

              return (
                <section key={section.title} className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <div className="text-muted-foreground space-y-3">
                    {blocks.map((block, i) =>
                      Array.isArray(block) ? (
                        <ul key={i} className="list-disc pl-6 space-y-1">
                          {block.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={i}>{block}</p>
                      )
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
