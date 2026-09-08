import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function CookieBanner({ onConsentChange }: { onConsentChange: (consent: boolean) => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (consent === null) {
      // Small delay so it doesn't pop up instantly, making it feel less aggressive
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    } else {
      onConsentChange(consent === "true");
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    onConsentChange(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    onConsentChange(false);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-[9990] mx-auto max-w-4xl overflow-hidden rounded-2xl glass-strong border border-white/10 p-4 shadow-2xl sm:flex sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex-1 pr-4">
            <h3 className="mb-2 text-lg font-semibold text-foreground">Your privacy is my concern</h3>
            <p className="text-sm text-muted-foreground">
              Use local storage (cookies) to remember your selected theme and preferences. This ensures a consistent and fast experience on your next visit.
            </p>
          </div>
          <div className="mt-4 flex shrink-0 flex-row gap-3 sm:mt-0 sm:flex-col lg:flex-row">
            <button
              onClick={handleDecline}
              className="flex-1 rounded-full border border-white/10 bg-transparent px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground sm:flex-none"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 rounded-full bg-cyan px-6 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95 sm:flex-none"
            >
              Accept
            </button>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground sm:hidden"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
