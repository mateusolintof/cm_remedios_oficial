"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  once?: boolean;
}

export default function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const hasAnimatedRef = useRef(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    if (decimals > 0) {
      return current.toFixed(decimals);
    }
    return Math.floor(current).toLocaleString("pt-BR");
  });

  useEffect(() => {
    if (!isInView) return;
    if (!once) {
      spring.set(end);
      return;
    }
    if (hasAnimatedRef.current) return;
    spring.set(end);
    hasAnimatedRef.current = true;
  }, [isInView, end, spring, once]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// Specialized variants for common use cases
export function CountUpPercent({
  value,
  positive = true,
  className = "",
}: {
  value: number;
  positive?: boolean;
  className?: string;
}) {
  return (
    <CountUp
      end={value}
      prefix={positive ? "+" : "-"}
      suffix="%"
      className={className}
    />
  );
}

export function CountUpCurrency({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <CountUp
      end={value}
      prefix="R$ "
      className={className}
    />
  );
}

export function CountUpHours({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <CountUp
      end={value}
      suffix="h"
      className={className}
    />
  );
}
