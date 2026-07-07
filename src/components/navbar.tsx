import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500", // 1. Swapped left-0/right-0 for inset-x-0
        scrolled ? "py-2 sm:py-3" : "py-4 sm:py-5",
      )}
    >
      {/* 2. Added w-full and fixed responsive padding (px-4 on mobile, px-6 on desktop) */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-full px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-500", // 3. Lowered mobile padding here too
            scrolled ? "glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.4)]" : "",
          )}
        >
          <a href="#home" className="flex items-center gap-2 text-base font-semibold">
            <img src={logoAsset} alt="SK logo" className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-cyan to-electric px-5 py-2 text-sm font-medium text-background transition-shadow hover:shadow-[0_0_30px_oklch(0.82_0.13_170/0.55)] lg:inline-block"
          >
            Hire Me
          </a>

          {/* 4. Added a touch of padding to make the touch target comfortable without blowing up width */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-full p-2 lg:hidden text-foreground active:bg-white/10"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 glass-strong lg:hidden"
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="mt-12 flex flex-col gap-4">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-3xl font-semibold tracking-tight hover:text-gradient"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
