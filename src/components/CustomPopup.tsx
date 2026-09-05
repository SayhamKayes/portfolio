import { useState, useEffect } from "react";
import { Check, X, AlertCircle, HelpCircle } from "lucide-react";

type PopupType = "success" | "error" | "info" | "confirm";

type PopupEvent = {
  message: string;
  type: PopupType;
  onConfirm?: (result: boolean) => void;
};

const popupListeners = new Set<(event: PopupEvent) => void>();

export const showPopup = (message: string, type: PopupType = "success") => {
  popupListeners.forEach((listener) => listener({ message, type }));
};

export const confirmAction = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    popupListeners.forEach((listener) => listener({ message, type: "confirm", onConfirm: resolve }));
  });
};

export function CustomPopupProvider() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<PopupType>("success");
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [resolveConfirm, setResolveConfirm] = useState<((res: boolean) => void) | null>(null);

  useEffect(() => {
    const listener = (event: PopupEvent) => {
      setMessage(event.message);
      setType(event.type);
      setResolveConfirm(() => event.onConfirm || null);
      setIsOpen(true);
      setIsFadingOut(false);
      
      // Auto close after 3 seconds for success
      if (event.type === "success") {
        setTimeout(() => {
          handleClose(true); // Default resolve for success is true if it matters
        }, 3000);
      }
    };
    popupListeners.add(listener);
    return () => {
      popupListeners.delete(listener);
    };
  }, []);

  const handleClose = (result: boolean) => {
    setIsFadingOut(true);
    if (resolveConfirm) {
      resolveConfirm(result);
    }
    setTimeout(() => {
      setIsOpen(false);
      setIsFadingOut(false);
      setResolveConfirm(null);
    }, 300); // match duration
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      onClick={() => type !== "confirm" && handleClose(true)}
    >
      <div
        className={`bg-background border border-border shadow-2xl rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-4 transition-transform duration-300 ${
          isFadingOut ? "scale-95" : "scale-100 animate-in zoom-in-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`h-16 w-16 rounded-full flex items-center justify-center ${
            type === "success"
              ? "bg-[#30C697]/20 text-[#30C697]"
              : type === "error"
              ? "bg-red-500/20 text-red-500"
              : type === "confirm"
              ? "bg-yellow-500/20 text-yellow-500"
              : "bg-blue-500/20 text-blue-500"
          }`}
        >
          {type === "success" && <Check className="w-8 h-8" strokeWidth={3} />}
          {type === "error" && <X className="w-8 h-8" strokeWidth={3} />}
          {type === "info" && <AlertCircle className="w-8 h-8" strokeWidth={3} />}
          {type === "confirm" && <HelpCircle className="w-8 h-8" strokeWidth={3} />}
        </div>
        <h3 className="text-xl font-bold text-foreground text-center">
          {message}
        </h3>
        
        {type === "confirm" ? (
          <div className="flex gap-4 mt-4 w-full">
            <button
              onClick={() => handleClose(false)}
              className="flex-1 px-4 py-2.5 rounded-full font-medium transition-colors bg-muted text-foreground hover:bg-muted/80"
            >
              Cancel
            </button>
            <button
              onClick={() => handleClose(true)}
              className="flex-1 px-4 py-2.5 rounded-full font-medium transition-colors text-white hover:opacity-90"
              style={{ backgroundColor: "#30C697" }}
            >
              Yes
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleClose(true)}
            className="mt-4 px-8 py-2.5 rounded-full font-medium transition-colors text-white hover:opacity-90"
            style={{ backgroundColor: type === "success" ? "#30C697" : type === "error" ? "#ef4444" : "#3b82f6" }}
          >
            Okay
          </button>
        )}
      </div>
    </div>
  );
}
