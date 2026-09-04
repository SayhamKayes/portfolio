import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { FadeUp } from "./motion-primitives";
import p1 from "@/assets/projects_preview/projects_preview_1.jpg";
import p2 from "@/assets/projects_preview/projects_preview_2.jpg";
import p3 from "@/assets/projects_preview/projects_preview_3.jpg";
import p4 from "@/assets/projects_preview/projects_preview_4.jpg";
import p5 from "@/assets/projects_preview/projects_preview_5.jpg";

type Cat = string;



export function Projects({ items = [] }: { items?: any[] }) {
  const dbItems = items.map((p, i) => ({
    title: p.title,
    desc: p.description,
    tags: p.technologies ? p.technologies.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
    cat: p.category ? p.category.split(',').map((c: string) => c.trim() as Cat) : ["SaaS" as Cat],
    img: p.imageUrl || [p1, p2, p3, p4, p5][i % 5],
    link: p.link,
    githubLink: p.githubLink
  }));

  const dynamicFilters = ["All" as Cat, ...Array.from(new Set(dbItems.flatMap(p => p.cat)))];

  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? dbItems : dbItems.filter((p) => p.cat.includes(active));

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-glow/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <FadeUp>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan">Projects</p>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Featured <span className="text-gradient">Work</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap gap-2 rounded-full glass p-1.5">
              {dynamicFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active === f ? "text-background" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {active === f && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan to-electric"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl glass-strong"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-full glass-strong text-foreground hover:bg-cyan hover:text-background"
                        aria-label="Live demo"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-full glass-strong text-foreground hover:bg-cyan hover:text-background"
                        aria-label="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t: string) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 60px oklch(0.74 0.15 162 / 0.25)" }}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
