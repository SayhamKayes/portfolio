import { GraduationCap, Code2, Brain, Server } from "lucide-react";
import { FadeUp, Counter, Stagger, StaggerItem } from "./motion-primitives";
import aboutPhoto from "@/assets/profile-photo.jpg";

const journey = [
  {
    Icon: Code2,
    title: "Full Stack Development",
    desc: "End-to-end web products with React.js and Django - premium UI meets resilient APIs.",
  },
  {
    Icon: Server,
    title: "Python Engineering",
    desc: "Clean, efficient Python - from automation scripts to scalable backend services.",
  },
  {
    Icon: Brain,
    title: "AI / ML Exploration",
    desc: "Training models with TensorFlow, PyTorch and Scikit-Learn for real-world problems.",
  },
  {
    Icon: GraduationCap,
    title: "Computer Science Student",
    desc: "Pursuing BSc in CSE at Daffodil International University - currently fourth year.",
  },
];

export function About({ settings, globalClients }: { settings?: any[], globalClients?: any[] }) {
  const getVal = (key: string) => settings?.find((s) => s.key === key && s.value)?.value;

  const aboutImgUrl = getVal('aboutProfilePic') || aboutPhoto;
  const aboutDescription = getVal('aboutDescription') || "I'm a Full Stack Developer based in Dhaka, Bangladesh, with 3+ years of freelance and remote experience and a strong foundation in Python (Django) and React.js. I've delivered 80+ web projects to 20+ international clients on Fiverr.\n\nAs a Level 2 Seller on Fiverr (top 20%), I've maintained a 4.9/5.0 satisfaction rating across 75+ completed projects, serving clients from the USA, Canada, and across the EU.\n\nCurrently pursuing my BSc in Computer Science & Engineering at Daffodil International University while working as a Web Developer at Dynamite IT Solution.";

  const stats = [
    { value: Number(getVal('aboutExpYears')) || 3, suffix: "+", label: "Years Experience" },
    { value: Number(getVal('aboutCountries')) || 15, suffix: "+", label: "Countries Served" },
    { value: Number(getVal('aboutProjects')) || 80, suffix: "+", label: "Projects Delivered" },
    { value: Number(getVal('aboutClients')) || 20, suffix: "+", label: "Happy Clients" },
  ];

  const dynamicJourney = [
    {
      Icon: Code2,
      title: getVal('aboutCard1Title') || "Full Stack Development",
      desc: getVal('aboutCard1Desc') || "End-to-end web products with React.js and Django - premium UI meets resilient APIs.",
    },
    {
      Icon: Server,
      title: getVal('aboutCard2Title') || "Python Engineering",
      desc: getVal('aboutCard2Desc') || "Clean, efficient Python - from automation scripts to scalable backend services.",
    },
    {
      Icon: Brain,
      title: getVal('aboutCard3Title') || "AI / ML Exploration",
      desc: getVal('aboutCard3Desc') || "Training models with TensorFlow, PyTorch and Scikit-Learn for real-world problems.",
    },
    {
      Icon: GraduationCap,
      title: getVal('aboutCard4Title') || "Computer Science Student",
      desc: getVal('aboutCard4Desc') || "Pursuing BSc in CSE at Daffodil International University - currently fourth year.",
    },
  ];
  return (
    <section id="about" className="relative py-32">
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan">About Me</p>
          <h2 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Turning ideas into <br /> <span className="text-gradient">Digital Reality</span>.
          </h2>
        </FadeUp>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl glow-border">
              <div className="absolute inset-0 bg-gradient-to-br from-electric/30 via-transparent to-purple-glow/30" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 p-[1px] animated-gradient shadow-[0_0_22px_var(--glow-color-strong)]">
                <img
                  src={aboutImgUrl}
                  alt="Sayham Kayes — Full Stack Developer"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover border-2 border-transparent rounded-3xl"
                />
              </div>
              <div className="absolute inset-0 flex items-end p-8">
                <div className="glass-strong w-full rounded-2xl p-6">
                  <p className="text-xs uppercase tracking-widest text-cyan">Based in</p>
                  <p className="mt-1 text-2xl font-semibold">Dhaka, Bangladesh 🇧🇩</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Open to remote opportunities worldwide.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="lg:col-span-7">
            <FadeUp>
              {aboutDescription.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className={`text-lg leading-relaxed text-muted-foreground ${i > 0 ? 'mt-5' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </FadeUp>

            <Stagger className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {dynamicJourney.map((j) => (
                <StaggerItem key={j.title}>
                  <div className="group flex gap-5 rounded-2xl glass p-5 transition-all hover:bg-white/5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl animated-gradient text-background">
                      <j.Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{j.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{j.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <Stagger className="mt-24 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="rounded-2xl glass p-6 text-center lg:p-8">
                <p className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
