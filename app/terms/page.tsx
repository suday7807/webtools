import { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using WebTools services.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 1, 2026</p>

          <div className="space-y-8">
            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using WebTools, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by these terms,
                please do not use this service.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                WebTools provides online tools for file conversion, text generation, and various
                utility functions. These services are provided as-is and may be modified or
                discontinued at any time without notice.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to use the service to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Upload or process illegal, harmful, or offensive content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service</li>
                <li>Use the service for any illegal purpose</li>
                <li>Reproduce, copy, or redistribute our tools without permission</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                The content, design, and functionality of WebTools are protected by copyright and
                other intellectual property laws. You may not copy, modify, or distribute these
                materials without our explicit permission.
              </p>
              <p className="text-muted-foreground">
                The output generated from our tools (such as converted files, generated names,
                etc.) is yours to use freely for both personal and commercial purposes.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. WE MAKE NO
                WARRANTIES ABOUT THE COMPLETENESS, RELIABILITY, OR ACCURACY OF THIS SERVICE.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                IN NO EVENT SHALL WEBTOOLS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF
                PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">7. Privacy</h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our Privacy Policy to understand
                how we collect and use your information.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">8. Modifications to Service</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify or discontinue the service at any time without
                prior notice. We shall not be liable to you or any third party for any
                modification, suspension, or discontinuance of the service.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">10. External Links</h2>
              <p className="text-muted-foreground">
                The Service may contain links to third-party websites. We do not control and are
                not responsible for the content, policies, or practices of any third-party sites.
                Your use of third-party sites is at your own risk and subject to their own terms
                and policies.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your access to the Service at any time, without
                notice, for any reason, including if you breach these Terms. Upon termination,
                your right to use the Service ceases immediately. Sections that by their nature
                should survive termination shall survive, including but not limited to the
                Disclaimer, Limitation of Liability, and Governing Law.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">12. Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is held to be invalid or unenforceable, that
                provision shall be modified to the minimum extent necessary to make it valid
                and enforceable, and the remaining provisions shall continue in full force and
                effect.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms are governed by and construed in accordance with the laws applicable
                where the owner of WebTools is located. Any disputes arising from these Terms
                shall be resolved in accordance with such laws.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at
                suday7807@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}