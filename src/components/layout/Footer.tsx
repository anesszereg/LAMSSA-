import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const socialIcons = [
  {
    label: "Instagram",
    href: "#",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.45 20.45h-3.557v-5.569c0-1.328-.024-3.037-1.85-3.037-1.852 0-2.138 1.445-2.138 2.939v5.667H9.25V9h3.414v1.561h.048c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.336 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.115 20.45H3.556V9h3.559v11.45zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const footerLinks = {
  explore: [
    { label: "Collections", href: "/collections" },
    { label: "360° Showroom", href: "/experience/serenity-suite" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  service: [
    { label: "Book a Showroom Visit", href: "/booking" },
    { label: "Interior Consultation", href: "/booking" },
    { label: "Trade Program", href: "#" },
    { label: "Delivery & Returns", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[#E8E0D5]/60 bg-[#FAFAF8] px-6 py-20 dark:border-white/10 dark:bg-[#1A1816] lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="font-serif text-3xl font-medium tracking-tight">
              Adlane
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-foreground/60">
              Curated luxury interiors, complete room concepts, and an immersive
              digital showroom. Designed for those who live beautifully.
            </p>
            <div className="mt-8 flex gap-4">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E0D5] transition-colors hover:border-[#8B6F4E] hover:bg-[#8B6F4E] hover:text-white dark:border-white/10"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                Explore
              </h4>
              <ul className="space-y-4">
                {footerLinks.explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[15px] text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                Company
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[15px] text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                Service
              </h4>
              <ul className="space-y-4">
                {footerLinks.service.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[15px] text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-[#E8E0D5]/60 pt-8 text-sm text-foreground/50 dark:border-white/10 sm:flex-row">
          <p>© {new Date().getFullYear()} Adlane Interiors. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
