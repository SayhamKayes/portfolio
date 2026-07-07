import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { e as emailjs } from "../_libs/emailjs__browser.mjs";
import { C as ComposableMap, G as Geographies, a as Geography$1, M as Marker } from "../_libs/react-simple-maps.mjs";
import { Z } from "../_libs/react-tooltip.mjs";
import { u as useScroll, a as useSpring, m as motion, A as AnimatePresence, b as useMotionValue, c as useInView, d as useTransform } from "../_libs/framer-motion.mjs";
import { M as Menu, X, G as Github, L as Linkedin, a as Mail, C as CodeXml, D as Database, B as Brain, b as Cpu, A as ArrowDown, S as Server, c as GraduationCap, W as Wrench, U as Users, d as ArrowUpRight, e as Briefcase, f as Code, Q as Quote, P as Phone, g as MapPin, h as LoaderCircle, i as Check, j as Send, F as Facebook, I as Instagram } from "../_libs/lucide-react.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/topojson-client.mjs";
import "../_libs/d3-geo.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const logoAsset = "/assets/logo-CrWxi6gH.png";
const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.header,
    {
      initial: { y: -30, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.6 },
      className: cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        // 1. Swapped left-0/right-0 for inset-x-0
        scrolled ? "py-2 sm:py-3" : "py-4 sm:py-5"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex w-full items-center justify-between rounded-full px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-500",
              // 3. Lowered mobile padding here too
              scrolled ? "glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.4)]" : ""
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#home", className: "flex items-center gap-2 text-base font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoAsset, alt: "SK logo", className: "h-9 w-9 object-contain sm:h-10 sm:w-10" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 lg:flex", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: l.href,
                  className: "rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
                  children: l.label
                },
                l.href
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "#contact",
                  className: "hidden rounded-full bg-gradient-to-r from-cyan to-electric px-5 py-2 text-sm font-medium text-background transition-shadow hover:shadow-[0_0_30px_oklch(0.82_0.13_170/0.55)] lg:inline-block",
                  children: "Hire Me"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setOpen(true),
                  className: "rounded-full p-2 lg:hidden text-foreground active:bg-white/10",
                  "aria-label": "Open menu",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 glass-strong lg:hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setOpen(false),
                  "aria-label": "Close menu",
                  className: "rounded-full p-2",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-12 flex flex-col gap-4", children: links.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.a,
                {
                  href: l.href,
                  onClick: () => setOpen(false),
                  initial: { opacity: 0, x: 30 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: i * 0.05 },
                  className: "text-3xl font-semibold tracking-tight hover:text-gradient",
                  children: l.label
                },
                l.href
              )) })
            ] })
          }
        ) })
      ]
    }
  );
}
const highlightedAsset = "/assets/highlighted-CY8ewTQQ.png";
function FadeUp({
  children,
  delay = 0,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
      className,
      children
    }
  );
}
function Stagger({
  children,
  className,
  delay = 0.08
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true, margin: "-80px" },
      variants: { hidden: {}, show: { transition: { staggerChildren: delay } } },
      className,
      children
    }
  );
}
function StaggerItem({ children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      variants: {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      },
      className,
      children
    }
  );
}
function Counter({ to, suffix = "" }) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    val,
    suffix
  ] });
}
function MagneticButton({
  children,
  className,
  onClick,
  variant = "primary",
  as = "button",
  href
}) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  const base = "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300";
  const styles = variant === "primary" ? "bg-white text-background hover:shadow-[0_0_40px_oklch(0.85_0.16_200/0.5)]" : "glass text-foreground hover:bg-white/10 border border-white/15";
  const inner = /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      style: { x: sx, y: sy },
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      className: "inline-block",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(base, styles, className), children })
    }
  );
  if (as === "a") return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, children: inner });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, type: "button", children: inner });
}
function TiltCard({ children, className }) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [-50, 50], [8, -8]);
  const ry = useTransform(x, [-50, 50], [-8, 8]);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      style: { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" },
      className,
      children
    }
  );
}
function CursorGlow() {
  const [pos, setPos] = reactExports.useState({ x: -200, y: -200 });
  reactExports.useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": true,
      className: "pointer-events-none fixed inset-0 z-[60] hidden md:block",
      style: {
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, oklch(0.7 0.22 250 / 0.08), transparent 40%)`,
        transition: "background 0.1s ease-out"
      }
    }
  );
}
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      style: { scaleX },
      className: "fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left animated-gradient"
    }
  );
}
function Particles({ count = 30 }) {
  const [particles] = reactExports.useState(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }))
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 overflow-hidden", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      className: "absolute rounded-full bg-cyan",
      style: {
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        boxShadow: "0 0 8px currentColor"
      },
      animate: { y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] },
      transition: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }
    },
    p.id
  )) });
}
const floatingIcons = [
  { Icon: CodeXml, top: "10%", left: "4%", delay: 0 },
  { Icon: Database, top: "20%", right: "-4%", delay: 0.4 },
  { Icon: Brain, bottom: "18%", left: "-4%", delay: 0.8 },
  { Icon: Cpu, bottom: "8%", right: "4%", delay: 1.2 }
];
const roles = ["Full Stack Developer", "Front End Developer", "AI & ML Enthusiast"];
function useTypewriter(words, typeSpeed = 75, deleteSpeed = 40, pause = 1600) {
  const [text, setText] = reactExports.useState("");
  const [wordIdx, setWordIdx] = reactExports.useState(0);
  const [deleting, setDeleting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting ? word.substring(0, text.length - 1) : word.substring(0, text.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause]);
  return text;
}
function Hero() {
  const typed = useTypewriter(roles);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "home",
      className: "relative flex min-h-screen items-center overflow-hidden pt-28 pb-20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-electric/20 blur-[120px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-glow/20 blur-[120px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Particles, { count: 40 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 lg:order-1 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6 },
                className: "mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-cyan animate-pulse" }),
                  "Available for hire"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.1 },
                className: "text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl",
                children: [
                  "Hi, I'm ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Sayham" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.3 },
                className: "mt-6 flex h-9 items-center text-2xl font-medium text-foreground/90 sm:text-3xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: typed }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-block h-7 w-[3px] translate-y-[2px] bg-cyan animate-blink sm:h-8" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.7, delay: 0.45 },
                className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground",
                children: "Full Stack Developer with 3+ years of freelance and remote experience and a strong foundation in Python (Django) and React.js. I've delivered 80+ web projects to 20+ international clients, earning the Level 2 Seller badge with a 4.9/5 satisfaction rating on Fiverr."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.55 },
                className: "mt-6 flex flex-wrap gap-2",
                children: ["Python", "Django", "React.js", "JavaScript", "TensorFlow"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full glass px-3 py-1 text-xs text-foreground/80", children: t }, t))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.7 },
                className: "mt-10 flex flex-row items-center gap-3 w-full max-w-[360px] sm:max-w-none text-sm sm:text-base",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { as: "a", href: "#contact", children: "Get in Touch →" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { as: "a", href: "#projects", variant: "ghost", children: "View Projects" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 1 },
                className: "mt-10 flex items-center gap-5 text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://github.com/SayhamKayes",
                      target: "_blank",
                      rel: "noreferrer",
                      className: "transition-colors hover:text-cyan",
                      "aria-label": "GitHub",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://www.linkedin.com/in/sayhamkayes/",
                      target: "_blank",
                      rel: "noreferrer",
                      className: "transition-colors hover:text-cyan",
                      "aria-label": "LinkedIn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "mailto:sayhamkayes@gmail.com",
                      className: "transition-colors hover:text-cyan",
                      "aria-label": "Email",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5" })
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 1, delay: 0.2 },
              className: "order-1 lg:order-2 relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[320px] lg:max-w-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-spin-slow rounded-full border border-cyan/30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-4 animate-spin-slow rounded-full border border-electric/40",
                    style: { animationDirection: "reverse", animationDuration: "30s" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-8 animate-pulse-glow rounded-full bg-gradient-to-br from-cyan/20 via-electric/20 to-purple-glow/20 blur-2xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full p-[3px] animated-gradient shadow-[0_0_22px_rgba(34,211,238,0.45)]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full overflow-hidden rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: highlightedAsset,
                        alt: "Sayham Kayes — Full Stack Developer",
                        width: 1024,
                        height: 1024,
                        className: "h-full w-full object-cover border-2 border-transparent rounded-full"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" })
                  ] })
                ] }),
                floatingIcons.map(({ Icon, delay, ...pos }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    style: pos,
                    animate: { y: [0, -12, 0] },
                    transition: { duration: 4, delay, repeat: Infinity, ease: "easeInOut" },
                    className: "absolute grid h-10 w-10 place-items-center rounded-2xl glass-strong text-cyan shadow-[0_0_20px_oklch(0.74_0.15_162/0.25)] sm:h-14 sm:w-14",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 sm:h-6 sm:w-6" })
                  },
                  i
                ))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.a,
          {
            href: "#about",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.5 },
            className: "absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hidden sm:block",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: { y: [0, 8, 0] }, transition: { duration: 2, repeat: Infinity }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-5 w-5" }) })
          }
        )
      ]
    }
  );
}
const aboutPhoto = "/assets/profile-photo-CV5k-z35.png";
const journey = [
  {
    Icon: CodeXml,
    title: "Full Stack Development",
    desc: "End-to-end web products with React.js and Django — premium UI meets resilient APIs."
  },
  {
    Icon: Server,
    title: "Python Engineering",
    desc: "Clean, efficient Python — from automation scripts to scalable backend services."
  },
  {
    Icon: Brain,
    title: "AI / ML Exploration",
    desc: "Training models with TensorFlow, PyTorch and Scikit-Learn for real-world problems."
  },
  {
    Icon: GraduationCap,
    title: "Computer Science Student",
    desc: "Pursuing BSc in CSE at Daffodil International University — currently fourth year."
  }
];
const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Countries Served" },
  { value: 80, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Happy Clients" }
];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "about", className: "relative py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.3em] text-cyan", children: "About Me" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
          "Turning ideas into ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Digital Reality" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 grid gap-16 lg:grid-cols-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden rounded-3xl glow-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-electric/30 via-transparent to-purple-glow/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 p-[1px] animated-gradient shadow-[0_0_22px_rgba(34,211,238,0.45)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: aboutPhoto,
              alt: "Sayham Kayes — Full Stack Developer",
              width: 1024,
              height: 1024,
              className: "h-full w-full object-cover border-2 border-transparent rounded-3xl"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong w-full rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-cyan", children: "Based in" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-semibold", children: "Dhaka, Bangladesh 🇧🇩" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Open to remote opportunities worldwide." })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg leading-relaxed text-muted-foreground", children: [
              "I'm a Full Stack Developer based in Dhaka, Bangladesh, with",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "3+ years" }),
              " of freelance and remote experience and a strong foundation in Python (Django) and React.js. I've delivered 80+ web projects to 20+ international clients on Fiverr."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-lg leading-relaxed text-muted-foreground", children: [
              "As a ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Level 2 Seller on Fiverr" }),
              " (top 20%), I've maintained a 4.9/5.0 satisfaction rating across 75+ completed projects, serving clients from the USA, Canada, and across the EU."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-lg leading-relaxed text-muted-foreground", children: [
              "Currently pursuing my BSc in Computer Science & Engineering at",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Daffodil International University" }),
              " while working as a Web Developer at Dynamite IT Solution."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stagger, { className: "mt-10 grid grid-cols-1 gap-5 md:grid-cols-2", children: journey.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex gap-5 rounded-2xl glass p-5 transition-all hover:bg-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl animated-gradient text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(j.Icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold", children: j.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: j.desc })
            ] })
          ] }) }, j.title)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stagger, { className: "mt-24 grid grid-cols-2 gap-4 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-6 text-center lg:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold tracking-tight text-gradient sm:text-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: s.value, suffix: s.suffix }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs uppercase tracking-widest text-muted-foreground", children: s.label })
      ] }) }, s.label)) })
    ] })
  ] });
}
const categories = [
  {
    title: "Frontend",
    Icon: CodeXml,
    accent: "from-cyan to-electric",
    skills: [
      "React.js",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "Bootstrap",
      "HTML5",
      "CSS3"
    ]
  },
  {
    title: "Backend",
    Icon: Server,
    accent: "from-electric to-purple-glow",
    skills: ["Python", "Django", "SQL", "REST APIs", "FastAPI", "Node.js"]
  },
  {
    title: "Database",
    Icon: Database,
    accent: "from-purple-glow to-cyan",
    skills: ["SQLite", "MySQL", "PostgreSQL"]
  },
  {
    title: "Data & AI",
    Icon: Brain,
    accent: "from-cyan to-purple-glow",
    skills: ["TensorFlow", "NumPy", "Pandas", "PyTorch", "CNN", "Scikit-Learn", "Seaborn"]
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
      "Streamlit"
    ]
  },
  {
    title: "Soft Skills",
    Icon: Users,
    accent: "from-purple-glow to-electric",
    skills: ["Remote Collaboration", "Agile / Scrum", "Problem Solving", "Client Communication"]
  }
];
function Skills() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "skills", className: "relative py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.3em] text-cyan", children: "Skills" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
          "Tech ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: " Stack" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-xl text-muted-foreground", children: "Languages, frameworks and tools I use to design, build and ship production-ready products." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stagger, { className: "mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TiltCard, { className: "group h-full rounded-3xl glass p-7 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_oklch(0.74_0.15_162/0.4)] hover:bg-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${cat.accent} text-background`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(cat.Icon, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: cat.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: cat.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/85 transition-all hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan",
            children: s
          },
          s
        )) })
      ] }) }, cat.title)) })
    ] })
  ] });
}
const p1 = "/assets/projects_preview_1-B6pGrpno.png";
const p2 = "/assets/projects_preview_2-C-VYbyTS.png";
const p3 = "/assets/projects_preview_3-CYUiuPCO.png";
const p4 = "/assets/projects_preview_4-DLcXZaGX.png";
const p5 = "/assets/projects_preview_5-BjtC1x_V.png";
const projects = [
  {
    title: "Expensee — Offline Expense Tracker App",
    desc: "A privacy-first, mobile expense tracker featuring a modern glassmorphism UI, intelligent voice input, and interactive charts.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Capacitor (Android SDK)", "Bun"],
    cat: ["Mobile", "Full Stack"],
    img: p1
  },
  {
    title: "SignCrafter — Email Signature Generator",
    desc: "An automated SaaS platform for generating sleek, responsive email signatures that work seamlessly across all major email clients.",
    tags: ["React (Vite)", "Vanilla CSS", "Zustand", "Capacitor (Android SDK)", "Cloudinary"],
    cat: ["SaaS", "Full Stack"],
    img: p2
  },
  {
    title: "AI-Powered Fish Detection App",
    desc: "Automated fish identification for local farmers using CNN with TensorFlow — high accuracy detection in varied aquatic conditions.",
    tags: ["Python", "Streamlit", "TensorFlow", "CNN"],
    cat: ["AI / ML"],
    img: p3
  },
  {
    title: "CodeWriters — Blog Website",
    desc: "Dynamic blog with secure user authentication, post CRUD and commenting. RESTful API backend with Django and responsive React frontend.",
    tags: ["Django", "React.js", "SQLite", "REST API"],
    cat: ["Full Stack"],
    img: p4
  },
  {
    title: "TaskCrafter — Utility Application",
    desc: "A modern, comprehensive web utility application designed to streamline productivity and manage daily tasks efficiently.",
    tags: ["TypeScript", "React.js", "Tailwind CSS", "Vite", "shadcn/ui"],
    cat: ["Full Stack", "SaaS"],
    img: p5
  }
];
const filters = ["All", "Full Stack", "AI / ML", "Mobile", "SaaS"];
function Projects() {
  const [active, setActive] = reactExports.useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat.includes(active));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "projects", className: "relative py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-glow/10 blur-[120px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.3em] text-cyan", children: "Projects" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
            "Featured ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Work" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 rounded-full glass p-1.5", children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActive(f),
            className: `relative rounded-full px-4 py-2 text-sm transition-colors ${active === f ? "text-background" : "text-muted-foreground hover:text-foreground"}`,
            children: [
              active === f && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  layoutId: "filter-pill",
                  className: "absolute inset-0 rounded-full bg-gradient-to-r from-cyan to-electric",
                  transition: { type: "spring", stiffness: 300, damping: 30 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: f })
            ]
          },
          f
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-8 lg:grid-cols-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.article,
        {
          layout: true,
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.5, delay: i * 0.05 },
          className: "group relative overflow-hidden rounded-3xl glass-strong",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: p.img,
                  alt: p.title,
                  loading: "lazy",
                  width: 1280,
                  height: 800,
                  className: "h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "#",
                    className: "grid h-10 w-10 place-items-center rounded-full glass-strong text-foreground hover:bg-cyan hover:text-background",
                    "aria-label": "Live demo",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://github.com/SayhamKayes",
                    target: "_blank",
                    rel: "noreferrer",
                    className: "grid h-10 w-10 place-items-center rounded-full glass-strong text-foreground hover:bg-cyan hover:text-background",
                    "aria-label": "GitHub",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold tracking-tight", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: p.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: p.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground",
                  children: t
                },
                t
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                style: { boxShadow: "inset 0 0 60px oklch(0.74 0.15 162 / 0.25)" }
              }
            )
          ]
        },
        p.title
      )) }) })
    ] })
  ] });
}
const workItems = [
  {
    Icon: Briefcase,
    period: "Jan 2026 — Present",
    title: "Web Developer",
    org: "Dynamite IT Solution",
    location: "Remote · Dhaka, Bangladesh",
    bullets: [
      "Administered web server environments using WHM / cPanel with routine backups.",
      "Resolved critical front-end bugs and optimized WordPress load times by 15%."
    ]
  },
  {
    Icon: Code,
    period: "Feb 2021 — Present",
    title: "Front End Developer",
    org: "Fiverr (Self-Employed)",
    location: "Remote",
    bullets: [
      "Achieved Level 2 Seller status (top 20%) with 4.9/5.0 rating across 80+ projects.",
      "Delivered 50+ developed custom email signatures and 15+ WordPress landing pages.",
      "Managed international clients across 15+ countries (USA, Canada, EU)."
    ]
  }
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
      "Key Coursework: OOP, Data Structures & Algorithms, DBMS, System Analysis & Design, Software Engineering."
    ]
  }
];
function Timeline({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto mt-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute left-8 top-0 bottom-0 w-px md:left-1/2",
        style: {
          background: "linear-gradient(to bottom, transparent, oklch(0.74 0.15 162 / 0.5), oklch(0.62 0.13 175 / 0.5), transparent)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: items.map((it, i) => {
      const left = i % 2 === 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `relative flex items-start gap-6 md:gap-0 ${left ? "md:flex-row" : "md:flex-row-reverse"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-8 top-6 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-background md:left-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full animated-gradient shadow-[0_0_20px_oklch(0.74_0.15_162/0.8)]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `md:w-1/2 ${left ? "md:pr-12 md:text-right" : "md:pl-12"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `ml-16 flex-1 md:ml-0 md:w-1/2 ${left ? "md:pl-12" : "md:pr-12"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl glass p-6 transition-all hover:bg-white/5 hover:shadow-[0_10px_40px_-10px_oklch(0.74_0.15_162/0.4)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl animated-gradient text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.Icon, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-cyan", children: it.period })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: it.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: it.org }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: it.location }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground", children: it.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-cyan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
              ] }, b)) })
            ] }) })
          ]
        }
      ) }, it.title);
    }) })
  ] });
}
function Experience() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "experience", className: "relative py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.3em] text-cyan", children: "Experience" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
        "Work ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "History" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { className: "mx-auto max-w-3xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-semibold lg:text-3xl", children: [
        "Work ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Experience" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { items: workItems })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { className: "mx-auto max-w-3xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-semibold lg:text-3xl", children: [
        "Educational ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Qualifications" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { items: educationItems })
    ] })
  ] }) });
}
const Review1 = "/assets/Review_1-5NFR0ITc.png";
const Review2 = "/assets/Review_2-C0O1HYOe.png";
const Review3 = "/assets/Review_3-C0SUQTL7.png";
const Review4 = "/assets/Review_4-BVcBGiK8.png";
const Review5 = "/assets/Review_5-DNffdL0Y.png";
const Review6 = "/assets/Review_6-Dnkp04Rx.png";
const Review7 = "/assets/Review_7-BnUGOpT3.png";
const Review8 = "/assets/Review_8-DodQtVGD.png";
const Review9 = "/assets/Review_9-DKovIbpI.png";
const Review10 = "/assets/Review_10-Bwht3olA.png";
const Review11 = "/assets/Review_11-B3PSBUx4.png";
const Review12 = "/assets/Review_12-DoawPX-3.png";
const Review13 = "/assets/Review_13-CvKKgu2E.png";
const Review14 = "/assets/Review_14-C1ca4sHo.png";
const Review15 = "/assets/Review_15-DMcOaBsC.png";
const Review16 = "/assets/Review_16-vCZ9nMO5.png";
const Review17 = "/assets/Review_17-fa_rYfTU.png";
const ReviewMobile1 = "/assets/Review_1_mobile-CciliT-E.png";
const ReviewMobile2 = "/assets/Review_2_mobile-BjExISLm.png";
const ReviewMobile3 = "/assets/Review_3_mobile-DdfTcP-y.png";
const ReviewMobile4 = "/assets/Review_4_mobile-iPXijocL.png";
const ReviewMobile5 = "/assets/Review_5_mobile-Dv4bnuYF.png";
const ReviewMobile6 = "/assets/Review_6_mobile-BJXJJrfu.png";
const ReviewMobile7 = "/assets/Review_7_mobile-CD5PVoao.png";
const ReviewMobile8 = "/assets/Review_8_mobile-BHE5i8U4.png";
const ReviewMobile9 = "/assets/Review_9_mobile-b1uuKsTd.png";
const ReviewMobile10 = "/assets/Review_10_mobile-BGrjM9lB.png";
const ReviewMobile11 = "/assets/Review_11_mobile-KH-knB9a.png";
const ReviewMobile12 = "/assets/Review_12_mobile-C01MJJal.png";
const ReviewMobile13 = "/assets/Review_13_mobile-BFzX77OV.png";
const ReviewMobile14 = "/assets/Review_14_mobile-DjHW5I9F.png";
const ReviewMobile15 = "/assets/Review_15_mobile-b5TxF-Pz.png";
const ReviewMobile16 = "/assets/Review_16_mobile-yLjb65Zx.png";
const ReviewMobile17 = "/assets/Review_17_mobile-C4CZnKb9.png";
const testimonials = [
  { desktopImage: Review1, mobileImage: ReviewMobile1 },
  { desktopImage: Review2, mobileImage: ReviewMobile2 },
  { desktopImage: Review3, mobileImage: ReviewMobile3 },
  { desktopImage: Review4, mobileImage: ReviewMobile4 },
  { desktopImage: Review5, mobileImage: ReviewMobile5 },
  { desktopImage: Review6, mobileImage: ReviewMobile6 },
  { desktopImage: Review7, mobileImage: ReviewMobile7 },
  { desktopImage: Review8, mobileImage: ReviewMobile8 },
  { desktopImage: Review9, mobileImage: ReviewMobile9 },
  { desktopImage: Review10, mobileImage: ReviewMobile10 },
  { desktopImage: Review11, mobileImage: ReviewMobile11 },
  { desktopImage: Review12, mobileImage: ReviewMobile12 },
  { desktopImage: Review13, mobileImage: ReviewMobile13 },
  { desktopImage: Review14, mobileImage: ReviewMobile14 },
  { desktopImage: Review15, mobileImage: ReviewMobile15 },
  { desktopImage: Review16, mobileImage: ReviewMobile16 },
  { desktopImage: Review17, mobileImage: ReviewMobile17 }
];
function Testimonials() {
  const [i, setI] = reactExports.useState(0);
  const [isMobile, setIsMobile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  reactExports.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6e3);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[i];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "testimonials", className: "relative py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.3em] text-cyan", children: "Testimonials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
          "Trusted by ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "teams worldwide" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { delay: 0.15, className: "mt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute right-8 top-8 h-20 w-20 text-white/[0.04]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
              transition: { duration: 0.5 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: isMobile ? t.mobileImage : t.desktopImage,
                  alt: `Review ${i + 1}`,
                  className: "h-auto w-full rounded-xl object-contain max-w-4xl mx-auto"
                }
              ) })
            },
            i
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 hidden sm:flex justify-center gap-2", children: testimonials.map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setI(k),
            "aria-label": `Show testimonial ${k + 1}`,
            className: `h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-white" : "w-5 bg-white/20 hover:bg-white/40"}`
          },
          k
        )) })
      ] })
    ] })
  ] });
}
const info = [
  {
    Icon: Mail,
    label: "Email",
    value: "sayhamkayes@gmail.com",
    href: "mailto:sayhamkayes@gmail.com",
    target: "_blank"
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "(+880) 193 957 4147",
    href: "tel:+8801939574147",
    target: "_blank"
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "/in/sayhamkayes",
    href: "https://www.linkedin.com/in/sayhamkayes/",
    target: "_blank"
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "@SayhamKayes",
    href: "https://github.com/SayhamKayes",
    target: "_blank"
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "https://maps.app.goo.gl/baGXiKXHwPZuFd6g6",
    target: "_blank"
  }
];
function Contact() {
  const formRef = reactExports.useRef(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        "service_lpys2tc",
        "template_ce2n5ld",
        e.currentTarget,
        "swhFLsNHvJy-Dgmmj"
      );
      setSent(true);
      e.currentTarget.reset();
      setTimeout(() => setSent(false), 4e3);
    } catch (error) {
      console.error("Failed to route contact message:", error);
      alert(
        "Something went wrong while delivering your message. Please reach out directly via email!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "relative py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-glow/15 blur-[140px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.3em] text-cyan", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
          "Let's ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Work Together" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-xl text-muted-foreground", children: "I'm currently accepting select projects and collaborations. Drop a message — I'll get back within 24 hours." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 grid gap-10 lg:grid-cols-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl glass-strong p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: "Reach out directly" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Prefer email or DMs? Use the channels below." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1", children: info.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: c.href,
              target: c.target,
              rel: "noreferrer",
              className: "group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-all hover:border-white/10 hover:bg-white/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl glass text-cyan transition-all group-hover:shadow-[0_0_20px_oklch(0.82_0.13_170/0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.Icon, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: c.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: c.value })
                ] })
              ]
            }
          ) }, c.label)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FadeUp, { delay: 0.15, className: "lg:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            ref: formRef,
            onSubmit,
            className: "rounded-3xl glass-strong p-8 sm:p-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", name: "name", placeholder: "Your name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email", placeholder: "you@domain.com" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  label: "Subject",
                  name: "subject",
                  placeholder: "Project, collaboration, hello..."
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: "Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    required: true,
                    name: "message",
                    rows: 5,
                    placeholder: "Tell me about what you're building...",
                    className: "w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-cyan/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_oklch(0.82_0.13_170/0.2)]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center sm:text-left", children: "I'll reply within 24 hours." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MagneticButton,
                  {
                    className: `w-full sm:w-auto ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`,
                    onClick: () => {
                      if (!isSubmitting) {
                        formRef.current?.requestSubmit();
                      }
                    },
                    children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center justify-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      " Sending..."
                    ] }) : sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center justify-center gap-2 text-emerald-400", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
                      " Sent Successfully"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center justify-center gap-2", children: [
                      "Send message ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
                    ] })
                  }
                )
              ] })
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
function Field({
  label,
  name,
  type = "text",
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: name,
        className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id: name,
        name,
        type,
        placeholder,
        required: true,
        className: "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-cyan/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_oklch(0.82_0.13_170/0.2)]"
      }
    )
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full animated-gradient" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block md:col-span-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#home", className: "flex items-center gap-2 text-lg font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoAsset, alt: "SK logo", className: "h-20 w-20 object-contain" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm text-muted-foreground", children: "Full Stack Developer crafting premium digital experiences with Python, React and modern web tooling." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block md:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Navigate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm", children: ["About", "Skills", "Projects", "Experience", "Contact"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `#${l.toLowerCase()}`,
              className: "text-foreground/80 transition-colors hover:text-cyan",
              children: l
            }
          ) }, l)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:text-left md:col-span-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Connect with Me" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-3 justify-center md:justify-start", children: [
            { Icon: Mail, href: "mailto:sayhamkayes@gmail.com", label: "Email" },
            {
              Icon: Facebook,
              href: "https://www.facebook.com/sayhamkayes/",
              label: "Facebook"
            },
            {
              Icon: Instagram,
              href: "https://www.instagram.com/sayhamkayes/",
              label: "Instagram"
            },
            {
              Icon: Linkedin,
              href: "https://www.linkedin.com/in/sayhamkayes/",
              label: "LinkedIn"
            }
          ].map(({ Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href,
              target: href.startsWith("http") ? "_blank" : void 0,
              rel: "noreferrer",
              className: "grid h-10 w-10 place-items-center rounded-full glass text-muted-foreground transition-all hover:text-cyan hover:shadow-[0_0_20px_oklch(0.82_0.13_170/0.4)]",
              "aria-label": label,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
            },
            label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-muted-foreground", children: "Crafted with care · Built with Passion." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " | All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Designed & developed by Sayham Kayes" })
      ] })
    ] })
  ] });
}
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const dominatedCountries = [
  "United States of America",
  "Canada",
  "United Kingdom",
  "Portugal",
  "France",
  "Spain",
  "Belgium",
  "Netherlands",
  "Germany",
  "Switzerland",
  "Czech Republic",
  "Poland",
  "Serbia",
  "South Africa",
  "Israel",
  "South Korea",
  "Australia",
  "Bangladesh"
];
const homeBaseCoordinates = [90.4125, 23.8103];
const WorldMap = () => {
  const dominationPercentage = Math.round(dominatedCountries.length / 195 * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 },
      className: "flex flex-col items-center mt-24 w-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeUp, { className: "mx-auto max-w-3xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm uppercase tracking-[0.3em] text-cyan", children: "Global Reach" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
            "Freelancing across",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gradient", children: [
              " ",
              dominationPercentage,
              "% of the globe."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-5xl mx-auto p-4 sm:p-8 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex justify-center overflow-hidden py-4 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            ComposableMap,
            {
              projection: "geoMercator",
              projectionConfig: { scale: 120, center: [0, 20] },
              className: "w-full h-auto max-w-full drop-shadow-sm select-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Geographies, { geography: geoUrl, children: ({ geographies }) => geographies.map((geo) => {
                  const isDominated = dominatedCountries.includes(geo.properties.name);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Geography$1,
                    {
                      geography: geo,
                      "data-tooltip-id": "country-tooltip",
                      "data-tooltip-content": geo.properties.name,
                      className: isDominated ? "fill-primary opacity-90 hover:opacity-100 outline-none cursor-pointer transition-all duration-300" : "fill-muted hover:fill-muted-foreground/20 outline-none transition-all duration-300"
                    },
                    geo.rsmKey
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Marker, { coordinates: homeBaseCoordinates, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "g",
                  {
                    className: "cursor-pointer",
                    transform: "translate(-16, -31)",
                    "data-tooltip-id": "country-tooltip",
                    "data-tooltip-content": "Dhaka, Bangladesh (Home Base)",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          className: "fill-destructive drop-shadow-md animate-pulse",
                          d: "M16,1C9.38,1,4,6.38,4,13c0,6.42,10.83,17.25,11.3,17.71C15.49,30.9,15.75,31,16,31s0.51-0.1,0.7-0.29 C17.17,30.25,28,19.42,28,13C28,6.38,22.62,1,16,1z"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "16", cy: "13", fill: "var(--background)", r: "4" })
                    ]
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Z,
            {
              id: "country-tooltip",
              className: "!backdrop-blur-md !bg-card/80 !text-card-foreground font-medium text-xs rounded-xl !shadow-2xl !border !border-border/50 !px-3 !py-1.5 z-50",
              classNameArrow: "hidden"
            }
          )
        ] }) })
      ]
    }
  );
};
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen w-full overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CursorGlow, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "w-full overflow-x-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skills, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Experience, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WorldMap, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
