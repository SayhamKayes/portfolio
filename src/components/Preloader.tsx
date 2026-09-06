import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUrl from "../assets/logo.png?url";

export function NavigationLoader() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      const autoUpdate = typeof window !== 'undefined' && (window as any).__IS_AUTO_UPDATE__;
      setIsHidden(autoUpdate);

      setProgress(10);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
      }, 300);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => {
        setProgress(0);
        setIsHidden(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  if (!pathname.startsWith('/admin')) return null;
  if (isHidden) return null;
  if (progress === 0 && !isLoading) return null;

  return (
    <div className="fixed left-0 top-0 z-[100] h-[3px] w-full overflow-hidden">
      <div
        className="h-full bg-[#30C697] transition-all duration-300 ease-out shadow-[0_0_10px_#30C697]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function InitialPreloader() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Artificial delay to ensure the user sees the preloader on initial load if it's too fast,
    // or just let it hide when the app is hydrated.
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setShow(false), 300); // Wait for fade out animation
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"
        }`}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-muted border-t-[#30C697]" />
        {/* Inner pulsing logo */}
        <img src={logoUrl} alt="Logo" className="h-10 w-10 object-contain animate-pulse" />
      </div>
      <p className="mt-4 text-sm font-medium tracking-widest text-[#30C697] animate-pulse">
        LOADING...
      </p>
    </div>
  );
}
