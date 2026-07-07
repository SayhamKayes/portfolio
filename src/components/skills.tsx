import { FadeUp, Stagger, StaggerItem, TiltCard } from "./motion-primitives";
import { Code2, Server, Database, Brain, Wrench, Users } from "lucide-react";

const categories = [
  {
    title: "Frontend",
    Icon: Code2,
    accent: "from-cyan to-electric",
    skills: [
      "React.js",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "Bootstrap",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    Icon: Server,
    accent: "from-electric to-purple-glow",
    skills: ["Python", "Django", "SQL", "REST APIs", "FastAPI", "Node.js"],
  },
  {
    title: "Database",
    Icon: Database,
    accent: "from-purple-glow to-cyan",
    skills: ["SQLite", "MySQL", "PostgreSQL"],
  },
  {
    title: "Data & AI",
    Icon: Brain,
    accent: "from-cyan to-purple-glow",
    skills: ["TensorFlow", "NumPy", "Pandas", "PyTorch", "CNN", "Scikit-Learn", "Seaborn"],
  },
  {
    title: "Tools & DevOps",
    Icon: Wrench,
    accent: "from-electric to-cyan",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Vercel",
      "Render",
      "PythonAnywhere",
      "WordPress",
      "Streamlit",
    ],
  },
  {
    title: "Soft Skills",
    Icon: Users,
    accent: "from-purple-glow to-electric",
    skills: ["Remote Collaboration", "Agile / Scrum", "Problem Solving", "Client Communication"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan">Skills</p>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Tech <span className="text-gradient"> Stack</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Languages, frameworks and tools I use to design, build and ship production-ready
            products.
          </p>
        </FadeUp>

        <Stagger className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <StaggerItem key={cat.title}>
              <TiltCard className="group h-full rounded-3xl glass p-7 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_oklch(0.74_0.15_162/0.4)] hover:bg-white/5">
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${cat.accent} text-background`}
                  >
                    <cat.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{cat.title}</h3>
                </div>
                {/* <div className={`mb-5 h-px w-full bg-gradient-to-r ${cat.accent} opacity-30`} /> */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/85 transition-all hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
