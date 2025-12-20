"use client";

import { motion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";

interface ValidityCountdownProps {
  targetDate: Date;
  variant?: "hero" | "pricing" | "badge";
  className?: string;
}

export default function ValidityCountdown({
  targetDate,
  variant = "badge",
  className = "",
}: ValidityCountdownProps) {
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });

  const formatDate = (date: Date) => dateFormatter.format(date);

  // Badge variant - compact for use in headers/sections
  if (variant === "badge") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 ${className}`}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Clock className="w-4 h-4 text-amber-600" />
        </motion.div>
        <span className="text-sm font-medium text-amber-800">
          Válido até {formatDate(targetDate)}
        </span>
      </motion.div>
    );
  }

  // Hero variant - prominent display for hero section
  if (variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 ${className}`}
      >
        <div className="flex items-center gap-2 text-white/80">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <AlertCircle className="w-4 h-4 text-prime-accent" />
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
              Proposta válida até
            </span>
            <span className="text-sm font-semibold text-white">
              {formatDate(targetDate)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Pricing variant - for the investment section
  if (variant === "pricing") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5 ${className}`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-prime-accent/15">
              <Clock className="h-5 w-5 text-prime" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Preço garantido até
              </p>
              <p className="text-base font-bold text-slate-900">
                {formatDate(targetDate)}
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Valores válidos para contratação assinada até a data acima.
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}

// Pre-configured component for the CM Remédios proposal
export function ProposalCountdown({
  variant = "badge",
  className = "",
}: {
  variant?: "hero" | "pricing" | "badge";
  className?: string;
}) {
  // Validity date: January 10, 2026
  const validityDate = new Date("2026-01-10T23:59:59-03:00");

  return (
    <ValidityCountdown
      targetDate={validityDate}
      variant={variant}
      className={className}
    />
  );
}
