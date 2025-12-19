"use client";

import { useEffect, useRef, useMemo } from "react";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  scrollContent?: boolean;
  size?: "full" | "md" | "fullscreen";
  titleAlign?: "left" | "center";
  closeLabel?: string;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  scrollContent = true,
  size = "full",
  titleAlign = "left",
  closeLabel,
}: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        previousFocusedElementRef.current = activeElement;
      }
    } else if (previousFocusedElementRef.current && document.contains(previousFocusedElementRef.current)) {
      previousFocusedElementRef.current.focus();
      previousFocusedElementRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  const focusTrapOptions = useMemo(
    () => ({
      allowOutsideClick: true,
      clickOutsideDeactivates: true,
      escapeDeactivates: false,
      initialFocus: () => closeButtonRef.current ?? undefined,
      fallbackFocus: () => closeButtonRef.current ?? document.body,
    }),
    []
  );

  const overlayMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const dialogMotion = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { y: 24, scale: 0.98, opacity: 0 },
        animate: { y: 0, scale: 1, opacity: 1 },
        exit: { y: 24, scale: 0.98, opacity: 0 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-6"
          initial={overlayMotion.initial}
          animate={overlayMotion.animate}
          exit={overlayMotion.exit}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <FocusTrap active={open} focusTrapOptions={focusTrapOptions}>
            <motion.div
              className={`relative bg-white flex flex-col shadow-2xl ${
                size === "fullscreen"
                  ? "w-screen h-screen"
                  : size === "md"
                  ? "w-full h-full md:w-[900px] md:h-auto md:max-h-[85vh] md:rounded-2xl md:overflow-hidden"
                  : "w-full h-full md:max-w-6xl md:max-h-[90vh] md:rounded-2xl md:overflow-hidden"
              }`}
              initial={dialogMotion.initial}
              animate={dialogMotion.animate}
              exit={dialogMotion.exit}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div
                className={`relative flex items-center border-b border-slate-200 px-4 md:px-6 py-4 flex-shrink-0 ${
                  titleAlign === "center" ? "justify-center" : "justify-between"
                }`}
              >
                <h3
                  className={`text-lg md:text-xl font-bold text-prime ${
                    titleAlign === "center" ? "w-full text-center" : ""
                  }`}
                >
                  {title}
                </h3>
                <button
                  aria-label="Fechar"
                  onClick={onClose}
                  ref={closeButtonRef}
                  className={`rounded-lg p-2 hover:bg-slate-100 text-slate-700 transition-colors ${
                    titleAlign === "center" ? "absolute right-4 md:right-6" : ""
                  }`}
                >
                  {closeLabel ? (
                    <span className="text-sm font-semibold">{closeLabel}</span>
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                </button>
              </div>
              {/* Body */}
              <div className={`w-full flex-1 ${scrollContent ? "overflow-auto" : "overflow-hidden"}`}>
                {children}
              </div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
