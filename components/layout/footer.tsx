// components/layout/footer.tsx
import Image from "next/image";
import loobnityLogo from "@/app/icon.png";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/nav-links";

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case studies", href: "/work" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedin },
  { label: "Twitter", href: "https://twitter.com", Icon: FaTwitter },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="container-premium py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Image src={loobnityLogo} alt="Loobnity" className="h-18 w-auto" />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">
              A software and AI engineering studio building products for teams
              that refuse to ship anything ordinary.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-xs uppercase tracking-[0.15em] text-secondary">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-5 text-xs uppercase tracking-[0.15em] text-secondary">
              Newsletter
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-secondary">
              Occasional notes on what we're building. No noise.
            </p>
            <form className="flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="you@company.com"
                aria-label="Email address"
                className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-secondary focus:border-accent"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Join
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-secondary transition-colors hover:text-foreground"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-secondary">
            © {year} Loobnity. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden text-center leading-none"
      >
        <span
          className="text-mask-glow inline-block whitespace-nowrap font-black"
          style={{
            fontSize: "clamp(90px, 18vw, 260px)",
            letterSpacing: "-0.04em",
          }}
        >
          LOOBNITY
        </span>
      </div>
    </footer>
  );
}
