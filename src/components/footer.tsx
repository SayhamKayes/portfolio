import { Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";
import logoAsset from "@/assets/logo.png";

interface FooterProps {
  settings?: { key: string; value: string }[];
}

export function Footer({ settings }: FooterProps) {
  const getSetting = (key: string) => settings?.find((s: any) => s.key === key)?.value;
  
  const contactEmail = getSetting('contactEmail') || "sayhamkayes@gmail.com";
  const contactLinkedin = getSetting('contactLinkedin') || "https://www.linkedin.com/in/sayhamkayes/";
  const contactGithub = getSetting('contactGithub') || "https://github.com/SayhamKayes";
  
  return (
    <footer className="relative">
      <div className="h-px w-full animated-gradient" />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* 1. LOGO & DESCRIPTION: Hidden on mobile, block on desktop */}
          <div className="hidden md:block md:col-span-5">
            <a href="#home" className="flex items-center gap-2 text-lg font-semibold">
              <img src={logoAsset} alt="SK logo" className="h-20 w-20 object-contain" />
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Full Stack Developer crafting premium digital experiences with Python, React and
              modern web tooling.
            </p>
          </div>

          {/* 2. NAVIGATION LINKS: Hidden on mobile, block on desktop */}
          <div className="hidden md:block md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">
              {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-foreground/80 transition-colors hover:text-cyan"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONNECT SECTION: Centered on mobile, standard layout on desktop */}
          <div className="text-center md:text-left md:col-span-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Connect with Me
            </p>
            {/* Added 'justify-center md:justify-start' to center the icons container on mobile */}
            <div className="mt-4 flex gap-3 justify-center md:justify-start">
              {[
                { Icon: Mail, href: contactEmail.includes('@') && !contactEmail.startsWith('mailto:') ? `mailto:${contactEmail}` : contactEmail, label: "Email" },
                {
                  Icon: Github,
                  href: contactGithub,
                  label: "GitHub",
                },
                {
                  Icon: Linkedin,
                  href: contactLinkedin,
                  label: "LinkedIn",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full glass text-muted-foreground transition-all hover:text-cyan hover:shadow-[0_0_20px_var(--glow-color)]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Crafted with care · Built with Passion.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Stays cleanly formatted across all breakpoints */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} | All rights reserved.</p>
          <p>Designed & developed by Sayham Kayes</p>
        </div>
      </div>
    </footer>
  );
}
