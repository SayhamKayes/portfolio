import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Code2, Database, Brain, Cpu } from "lucide-react";
import highlightedAsset from "@/assets/highlighted.jpg";
import { MagneticButton } from "./motion-primitives";
import { Particles } from "./effects";

const floatingIcons = [
  { Icon: Code2, top: "10%", left: "4%", delay: 0 },
  { Icon: Database, top: "20%", right: "-4%", delay: 0.4 },
  { Icon: Brain, bottom: "18%", left: "-4%", delay: 0.8 },
  { Icon: Cpu, bottom: "8%", right: "4%", delay: 1.2 },
];

const roles = ["Full Stack Developer", "Front End Developer", "AI & ML Enthusiast"];

function useTypewriter(words: string[], typeSpeed = 75, deleteSpeed = 40, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting ? word.substring(0, text.length - 1) : word.substring(0, text.length + 1),
          );
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export function Hero({ settings }: { settings?: any[] }) {
  const getVal = (key: string) => settings?.find((s) => s.key === key && s.value)?.value;

  const heroName = getVal('heroName') || "Sayham";
  
  const designationStr = getVal('heroDesignation') || "Full Stack Developer, Front End Developer, AI & ML Enthusiast";
  const dynamicRoles = designationStr.split(',').map((r: string) => r.trim()).filter(Boolean);
  const typed = useTypewriter(dynamicRoles.length > 0 ? dynamicRoles : roles);

  const heroDesc = getVal('heroDescription') || "Full Stack Developer with 3+ years of freelance and remote experience and a strong foundation in Python (Django) and React.js. I've delivered 80+ web projects to 20+ international clients, earning the Level 2 Seller badge with a 4.9/5 satisfaction rating on Fiverr.";
  
  const heroImgUrl = getVal('heroImage') || highlightedAsset;

  const contactGithub = getVal('contactGithub') || "https://github.com/SayhamKayes";
  const contactLinkedin = getVal('contactLinkedin') || "https://www.linkedin.com/in/sayhamkayes/";
  const contactEmail = getVal('contactEmail') || "sayhamkayes@gmail.com";
  const emailHref = contactEmail.includes('@') && !contactEmail.startsWith('mailto:') ? `mailto:${contactEmail}` : contactEmail;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-electric/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-glow/20 blur-[120px]" />
      <Particles count={40} />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left Content Side */}
        <div className="order-2 lg:order-1 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
            Available for hire
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Hi, I'm <br />
            <span className="text-gradient">{heroName}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 flex h-9 items-center text-2xl font-medium text-foreground/90 sm:text-3xl"
          >
            <span className="text-gradient">{typed}</span>
            <span className="ml-1 inline-block h-7 w-[3px] translate-y-[2px] bg-cyan animate-blink sm:h-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["Python", "Django", "React.js", "JavaScript", "TensorFlow"].map((t) => (
              <span key={t} className="rounded-full glass px-3 py-1 text-xs text-foreground/80">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-row items-center gap-3 w-full max-w-[360px] sm:max-w-none text-sm sm:text-base"
          >
            <MagneticButton as="a" href="#contact">
              Get in Touch →
            </MagneticButton>
            <MagneticButton as="a" href="#projects" variant="ghost">
              View Projects
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center gap-5 text-muted-foreground"
          >
            <a
              href={contactGithub}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cyan"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={contactLinkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cyan"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={emailHref}
              className="transition-colors hover:text-cyan"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-1 lg:order-2 relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[320px] lg:max-w-md"
        >
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-cyan/30" />
          <div
            className="absolute inset-4 animate-spin-slow rounded-full border border-electric/40"
            style={{ animationDirection: "reverse", animationDuration: "30s" }}
          />
          <div className="absolute inset-8 animate-pulse-glow rounded-full bg-gradient-to-br from-cyan/20 via-electric/20 to-purple-glow/20 blur-2xl" />

          {/* Profile image container */}
          <div className="relative h-full w-full">
            <div className="absolute inset-0 rounded-full p-[3px] animated-gradient shadow-[0_0_22px_var(--glow-color-strong)]" />

            <div className="relative h-full w-full overflow-hidden rounded-full">
              <img
                src={heroImgUrl}
                alt={`${heroName} — ${dynamicRoles[0] || 'Developer'}`}
                width={1024}
                height={1024}
                className="h-full w-full object-cover border-2 border-transparent rounded-full"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </div>
          </div>

          {/* Floating Skill Badges */}
          {floatingIcons.map(({ Icon, delay, ...pos }, i) => (
            <motion.div
              key={i}
              style={pos}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 grid h-10 w-10 place-items-center rounded-2xl glass-strong text-cyan shadow-[0_0_20px_var(--glow-color)] sm:h-14 sm:w-14"
            >
              <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hidden sm:block"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
