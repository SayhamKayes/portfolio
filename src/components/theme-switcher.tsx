import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";

const THEMES = [
  { value: '', label: 'Dark (Default)', gradient: 'linear-gradient(135deg, oklch(0.82 0.13 170), oklch(0.74 0.15 162), oklch(0.62 0.13 175))' },
  { value: 'light', label: 'Light Mode', gradient: 'linear-gradient(135deg, #e5e7eb, #ffffff)' },
  { value: 'red-glass', label: 'Reddish Glass', gradient: 'linear-gradient(135deg, oklch(0.7 0.2 20), oklch(0.6 0.2 25))' },
  { value: 'blue-glass', label: 'Bluish Glass', gradient: 'linear-gradient(135deg, oklch(0.7 0.15 250), oklch(0.6 0.18 260))' },
  { value: 'green-glass', label: 'Greenish Glass', gradient: 'linear-gradient(135deg, oklch(0.7 0.15 140), oklch(0.6 0.18 150))' },
];

export function ThemeSwitcher({
  currentTheme,
  onThemeChange,
  hasConsent
}: {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  hasConsent: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (themeVal: string) => {
    onThemeChange(themeVal);
    if (hasConsent) {
      localStorage.setItem("userTheme", themeVal);
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9990]" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 mb-2 w-56 overflow-hidden rounded-2xl glass-strong border border-white/10 shadow-2xl"
          >
            <div className="p-3">
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Theme</h4>
              <div className="flex flex-col gap-1">
                {THEMES.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleSelect(theme.value)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${currentTheme === theme.value
                      ? "bg-cyan/10 text-cyan font-medium"
                      : "text-foreground hover:bg-white/5"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full border border-white/20"
                        style={{ background: theme.gradient }}
                      />
                      {theme.label}
                    </div>
                    {currentTheme === theme.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-background shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Toggle theme"
      >
        <Palette size={24} />
      </button>
    </div>
  );
}
