import { Briefcase, Code, GraduationCap } from "lucide-react";
import { FadeUp } from "./motion-primitives";

const workItems = [
  {
    Icon: Code,
    period: "Feb 2021 — Present",
    title: "Front End Developer",
    org: "Fiverr (Self-Employed)",
    location: "Remote",
    bullets: [
      "Achieved Level 2 Seller status (top 20%) with 4.9/5.0 rating across 80+ projects.",
      "Delivered 50+ developed custom email signatures and 15+ WordPress landing pages.",
      "Managed international clients across 15+ countries (USA, Canada, EU).",
    ],
  },
  {
    Icon: Briefcase,
    period: "Jan 2026 — Present",
    title: "Web Developer",
    org: "Dynamite IT Solution",
    location: "Remote · Dhaka, Bangladesh",
    bullets: [
      "Administered web server environments using WHM / cPanel with routine backups.",
      "Resolved critical front-end bugs and optimized WordPress load times by 15%.",
    ],
  },
];

const educationItems = [
  {
    Icon: GraduationCap,
    period: "Jan 2023 — Dec 2026",
    title: "BSc in Computer Science & Engineering",
    org: "Daffodil International University",
    location: "Fourth Year · Dhaka, Bangladesh",
    bullets: [
      "Major: Artificial Intelligence",
      "Key Coursework: OOP, Data Structures & Algorithms, DBMS, System Analysis & Design, Software Engineering.",
    ],
  },
];

function Timeline({ items }: { items: typeof workItems }) {
  return (
    <div className="relative mx-auto mt-10 max-w-4xl">
      <div
        className="absolute left-8 top-0 bottom-0 w-px md:left-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.74 0.15 162 / 0.5), oklch(0.62 0.13 175 / 0.5), transparent)",
        }}
      />

      <div className="space-y-12">
        {items.map((it, i) => {
          const left = i % 2 === 0;
          return (
            <FadeUp key={it.title} delay={i * 0.1}>
              <div
                className={`relative flex items-start gap-6 md:gap-0 ${left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                <div className="absolute left-8 top-6 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-background md:left-1/2">
                  <div className="h-3 w-3 rounded-full animated-gradient shadow-[0_0_20px_var(--glow-color-strong)]" />
                </div>

                <div className={`md:w-1/2 ${left ? "md:pr-12 md:text-right" : "md:pl-12"}`} />
                <div className={`ml-16 flex-1 md:ml-0 md:w-1/2 ${left ? "md:pl-12" : "md:pr-12"}`}>
                  <div className="group rounded-2xl glass p-6 transition-all hover:bg-white/5 hover:shadow-[0_10px_40px_-10px_var(--glow-color)]">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl animated-gradient text-background">
                        <it.Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-cyan">
                        {it.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <p className="text-sm text-muted-foreground">{it.org}</p>
                    <p className="text-xs text-muted-foreground/70">{it.location}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {it.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-cyan" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </div>
  );
}

export function Experience({ items = [], educations = [] }: { items?: any[], educations?: any[] }) {
  const dynamicWorkItems = items.length > 0 ? items.map((it: any) => ({
    Icon: Briefcase,
    period: it.duration,
    title: it.title,
    org: it.company,
    location: "", // Add if DB has it later
    bullets: it.description ? it.description.split('\n').map((s: string) => s.trim()).filter(Boolean) : []
  })) : workItems;

  const dynamicEducationItems = educations.length > 0 ? educations.map((ed: any) => ({
    Icon: GraduationCap,
    period: ed.duration,
    title: ed.degree,
    org: ed.institution,
    location: "", // Add if DB has it later
    bullets: ed.description ? ed.description.split('\n').map((s: string) => s.trim()).filter(Boolean) : []
  })) : educationItems;

  return (
    <section id="experience" className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan">Experience</p>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Work <span className="text-gradient">History</span>
          </h2>
        </FadeUp>

        <div className="mt-14">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold lg:text-3xl">
              Work <span className="text-gradient">Experience</span>
            </h3>
          </FadeUp>
          <Timeline items={dynamicWorkItems} />
        </div>

        <div className="mt-20">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold lg:text-3xl">
              Educational <span className="text-gradient">Qualifications</span>
            </h3>
          </FadeUp>
          <Timeline items={dynamicEducationItems} />
        </div>
      </div>
    </section>
  );
}
