import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { Code2, Server, Database, Brain, Wrench, Users } from "lucide-react";
import { TiltCard } from "./motion-primitives";

interface SkillCategory {
  title: string;
  Icon: any;
  accent: string;
  skills: string[];
}

const DEFAULT_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    Icon: Code2,
    accent: "from-cyan to-electric",
    skills: ["Bootstrap", "CSS3", "HTML5", "JavaScript(ES6+)", "React.js", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Backend",
    Icon: Server,
    accent: "from-electric to-purple-glow",
    skills: ["Django", "Fast APIs", "Node.js", "Prisma", "Python", "REST APIs", "SQL"],
  },
  {
    title: "Database",
    Icon: Database,
    accent: "from-purple-glow to-cyan",
    skills: ["MySQL", "PostgreSQL", "SQLite"],
  },
  {
    title: "Data & AI",
    Icon: Brain,
    accent: "from-cyan to-purple-glow",
    skills: ["CNN", "NumPy", "Pandas", "PyTorch", "Scikit-Learn", "TensorFlow"],
  },
  {
    title: "Tools & DevOps",
    Icon: Wrench,
    accent: "from-electric to-cyan",
    skills: ["Git", "GitHub", "PythonAnywhere", "Render", "Streamlit", "Vercel", "VS Code", "WordPress"],
  },
  {
    title: "Soft Skills",
    Icon: Users,
    accent: "from-purple-glow to-electric",
    skills: ["Agile/Scrum", "Client Communication", "Problem Solving", "Remote Collaboration"],
  },
];

// Configuration for cards when clustered at progress = 0
// Permuted initial positions:
// - Backend -> Database position (Bottom-Right)
// - Database -> Frontend position (Bottom-Left)
// - Frontend -> Soft Skills position (Top-Right)
// - Soft Skills -> Tools & DevOps position (Bottom-Center)
// - Tools & DevOps -> Data & AI position (Top-Left)
// - Data & AI -> Backend position (Top-Center)
const CARD_CONFIGS = [
  // 0: Frontend (Resting: Row 0, Col 0) -> Initial: Top-Right (where Soft Skills was)
  {
    desktop: { initX: 663, initY: -96, rotate: 12, scale: 0.93, zIndex: 25 },
    tablet: { initX: 451, initY: -65, rotate: 12, scale: 0.93, zIndex: 25 },
    mobile: { initX: 252, initY: -36, rotate: 12, scale: 0.93, zIndex: 25 },
  },
  // 1: Backend (Resting: Row 0, Col 1) -> Initial: Bottom-Right (where Database was)
  {
    desktop: { initX: 300, initY: 135, rotate: 6, scale: 0.92, zIndex: 36 },
    tablet: { initX: 204, initY: 92, rotate: 6, scale: 0.92, zIndex: 36 },
    mobile: { initX: 114, initY: 51, rotate: 6, scale: 0.92, zIndex: 36 },
  },
  // 2: Database (Resting: Row 0, Col 2) -> Initial: Bottom-Left (where Frontend was)
  {
    desktop: { initX: -683, initY: 115, rotate: -7, scale: 0.93, zIndex: 30 },
    tablet: { initX: -464, initY: 78, rotate: -7, scale: 0.93, zIndex: 30 },
    mobile: { initX: -260, initY: 44, rotate: -7, scale: 0.93, zIndex: 30 },
  },
  // 3: Data & AI (Resting: Row 1, Col 0) -> Initial: Top-Center (where Backend was)
  {
    desktop: { initX: 384, initY: -394, rotate: 4, scale: 0.95, zIndex: 32 },
    tablet: { initX: 261, initY: -268, rotate: 4, scale: 0.95, zIndex: 32 },
    mobile: { initX: 146, initY: -150, rotate: 4, scale: 0.95, zIndex: 32 },
  },
  // 4: Tools & DevOps (Resting: Row 1, Col 1) -> Initial: Top-Left (where Data & AI was)
  {
    desktop: { initX: -294, initY: -330, rotate: -10, scale: 0.94, zIndex: 28 },
    tablet: { initX: -200, initY: -224, rotate: -10, scale: 0.94, zIndex: 28 },
    mobile: { initX: -112, initY: -125, rotate: -10, scale: 0.94, zIndex: 28 },
  },
  // 5: Soft Skills (Resting: Row 1, Col 2) -> Initial: Bottom-Center (where Tools & DevOps was)
  {
    desktop: { initX: -384, initY: -20, rotate: 2, scale: 0.95, zIndex: 34 },
    tablet: { initX: -261, initY: -14, rotate: 2, scale: 0.95, zIndex: 34 },
    mobile: { initX: -146, initY: -8, rotate: 2, scale: 0.95, zIndex: 34 },
  },
];

function AnimatedSkillCard({
  cat,
  index,
  smoothProgress,
  screenMode,
}: {
  cat: SkillCategory;
  index: number;
  smoothProgress: MotionValue<number>;
  screenMode: "desktop" | "tablet" | "mobile";
}) {
  const config = CARD_CONFIGS[index]?.[screenMode] || CARD_CONFIGS[0][screenMode];

  const x = useTransform(smoothProgress, [0, 0.7], [config.initX, 0]);
  const y = useTransform(smoothProgress, [0, 0.7], [config.initY, 0]);
  const rotate = useTransform(smoothProgress, [0, 0.7], [config.rotate, 0]);
  const scale = useTransform(smoothProgress, [0, 0.7], [config.scale, 1]);
  const zIndex = useTransform(smoothProgress, (p) => (p > 0.65 ? 1 : config.zIndex));

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        zIndex,
      }}
      className="relative will-change-transform"
    >
      <TiltCard className="group flex h-full flex-col justify-between rounded-xl sm:rounded-2xl lg:rounded-3xl glass p-2.5 sm:p-5 lg:p-7 border border-white/10 bg-[#0c0e12]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.25)] hover:bg-white/[0.05]">
        <div>
          <div className="mb-2 sm:mb-4 lg:mb-5 flex items-center gap-1.5 sm:gap-2.5 lg:gap-3">
            <div
              className={`grid h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 place-items-center rounded-lg sm:rounded-xl bg-gradient-to-br ${cat.accent} text-background shadow-md shrink-0`}
            >
              <cat.Icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            </div>
            <h3 className="text-xs sm:text-base lg:text-xl font-bold tracking-tight text-foreground truncate">
              {cat.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2">
            {cat.skills.map((s: string) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.03] px-1.5 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 text-[8.5px] sm:text-[11px] lg:text-xs text-foreground/85 font-medium transition-all duration-200 hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan hover:scale-[1.03] select-none"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function Skills({ items = [] }: { items?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [screenMode, setScreenMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setScreenMode("desktop");
      } else if (w >= 640) {
        setScreenMode("tablet");
      } else {
        setScreenMode("mobile");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001,
  });

  const headerY = useTransform(
    smoothProgress,
    [0, 0.7],
    screenMode === "desktop" ? [290, 0] : screenMode === "tablet" ? [195, 0] : [110, 0]
  );
  const headerScale = useTransform(smoothProgress, [0, 0.7], [1.06, 1]);

  const groupedSkills =
    items && items.length > 0
      ? items.reduce((acc: any, skill: any) => {
        const cat = skill.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill.name);
        return acc;
      }, {})
      : null;

  const renderCategories = DEFAULT_CATEGORIES.map((cat) => {
    const dbSkills = groupedSkills?.[cat.title];
    return {
      ...cat,
      skills: dbSkills && dbSkills.length > 0 ? dbSkills : cat.skills,
    };
  });

  return (
    <section id="skills" ref={containerRef} className="relative h-[250vh] sm:h-[260vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-2 sm:px-6 lg:px-8">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="relative mx-auto w-full max-w-7xl flex flex-col justify-center items-center">
          <motion.div
            style={{
              y: headerY,
              scale: headerScale,
            }}
            className="relative z-10 mx-auto max-w-3xl text-center mb-4 sm:mb-8 lg:mb-12 pointer-events-none select-none sm:pointer-events-auto px-2"
          >
            <p className="mb-1 sm:mb-2 lg:mb-3 text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.3em] text-cyan font-semibold">
              Skills
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight text-foreground">
              Tech <span className="text-gradient">Stack</span>
            </h2>
            <p className="mx-auto mt-1 sm:mt-3 lg:mt-5 max-w-xs sm:max-w-md lg:max-w-xl text-[10px] sm:text-xs lg:text-base text-muted-foreground">
              Languages, frameworks and tools I use to design, build and ship production-ready
              products.
            </p>
          </motion.div>

          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              {renderCategories.map((cat, index) => (
                <AnimatedSkillCard
                  key={cat.title}
                  cat={cat}
                  index={index}
                  smoothProgress={smoothProgress}
                  screenMode={screenMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
