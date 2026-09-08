import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Eye, Monitor, Tablet, Smartphone, X } from "lucide-react";
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

  const [previewProject, setPreviewProject] = useState<any>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    if (previewProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [previewProject]);

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
                      <button
                        onClick={() => {
                          setPreviewProject(p);
                          setPreviewDevice('desktop');
                        }}
                        className="grid h-10 w-10 place-items-center rounded-full glass-strong text-foreground hover:bg-cyan hover:text-background"
                        aria-label="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
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

      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-2xl glass-strong border border-white/10 shadow-2xl"
            >
              {/* Header with tabs and close button */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-background/50 p-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold hidden sm:block">{previewProject.title}</h3>
                  <a href={previewProject.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-cyan hover:underline">
                    Open in new tab <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
                
                {/* Device Tabs */}
                <div className="flex items-center gap-2 rounded-full glass p-1">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`rounded-full p-2 transition-colors ${previewDevice === 'desktop' ? 'bg-cyan text-background' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Monitor size={16} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`rounded-full p-2 transition-colors ${previewDevice === 'tablet' ? 'bg-cyan text-background' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Tablet size={16} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`rounded-full p-2 transition-colors ${previewDevice === 'mobile' ? 'bg-cyan text-background' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Smartphone size={16} />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setPreviewProject(null)}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 overflow-hidden bg-black/40 flex items-center justify-center p-2 sm:p-4">
                <div 
                  className={`relative h-full overflow-hidden rounded-xl border border-white/20 bg-white transition-all duration-500 ease-in-out shadow-2xl ${
                    previewDevice === 'desktop' ? 'w-full' : previewDevice === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                  }`}
                >
                  <iframe 
                    src={previewProject.link} 
                    className="h-full w-full border-none"
                    title={`${previewProject.title} Preview`}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
