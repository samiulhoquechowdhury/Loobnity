// app/contact/page.tsx

import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building. Loobnity responds to every inquiry within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-background pt-32 pb-28 md:pt-40 md:pb-36">
        <div className="container-premium grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-secondary">
              Contact
            </p>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Let's talk about what you're building.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-secondary">
              Share a few details about the project and we'll get back to you
              within one business day — usually sooner.
            </p>

            <dl className="mt-12 flex flex-col gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-secondary">
                  Email
                </dt>
                <dd className="mt-1 text-base text-foreground">
                  hello@loobnity.com
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-secondary">
                  Response time
                </dt>
                <dd className="mt-1 text-base text-foreground">
                  Within 1 business day
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
