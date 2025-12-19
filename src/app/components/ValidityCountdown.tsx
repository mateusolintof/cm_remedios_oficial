"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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
        className={`flex flex-col items-center gap-3 ${className}`}
      >
        <div className="flex items-center gap-2 text-prime-accent/80">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <AlertCircle className="w-4 h-4" />
          </motion.div>
          <span className="text-sm font-medium uppercase tracking-wider">
            Proposta válida até {formatDate(targetDate)}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <TimeUnit value={timeLeft.days} label="dias" />
          <span className="text-2xl text-white/40 font-light">:</span>
          <TimeUnit value={timeLeft.hours} label="horas" />
          <span className="text-2xl text-white/40 font-light">:</span>
          <TimeUnit value={timeLeft.minutes} label="min" />
          <span className="text-2xl text-white/40 font-light hidden sm:block">:</span>
          <div className="hidden sm:block">
            <TimeUnit value={timeLeft.seconds} label="seg" />
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
        className={`relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 md:p-6 ${className}`}
      >
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-orange-100/50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Clock className="w-6 h-6 text-amber-600" />
            </motion.div>
            <div>
              <p className="text-sm text-amber-700 font-medium">
                Preço garantido até
              </p>
              <p className="text-lg md:text-xl font-bold text-amber-900">
                {formatDate(targetDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 bg-white/80 rounded-lg px-4 py-3">
            <TimeUnitCompact value={timeLeft.days} label="dias" />
            <Separator />
            <TimeUnitCompact value={timeLeft.hours} label="hrs" />
            <Separator />
            <TimeUnitCompact value={timeLeft.minutes} label="min" />
            <div className="hidden sm:flex items-center gap-3">
              <Separator />
              <TimeUnitCompact value={timeLeft.seconds} label="seg" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}

// Helper components
function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-14 md:w-16 h-14 md:h-16 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center"
      >
        <span className="text-2xl md:text-3xl font-bold text-white">
          {value.toString().padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-xs text-white/60 mt-1">{label}</span>
    </div>
  );
}

function TimeUnitCompact({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[40px]">
      <motion.span
        key={value}
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xl md:text-2xl font-bold text-amber-900"
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span className="text-xs text-amber-600">{label}</span>
    </div>
  );
}

function Separator() {
  return <span className="text-amber-300 text-lg font-light">:</span>;
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
  const validityDate = new Date("2026-01-10T23:59:59");

  return (
    <ValidityCountdown
      targetDate={validityDate}
      variant={variant}
      className={className}
    />
  );
}
