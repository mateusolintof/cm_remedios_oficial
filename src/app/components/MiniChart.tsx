"use client";

import { motion } from "framer-motion";

interface BarChartData {
  label: string;
  value: number;
  color?: string;
  highlight?: boolean;
}

interface MiniBarChartProps {
  data: BarChartData[];
  maxValue?: number;
  height?: number;
  showValues?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
}

export function MiniBarChart({
  data,
  maxValue,
  height = 120,
  showValues = true,
  valuePrefix = "",
  valueSuffix = "",
  className = "",
}: MiniBarChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className={`w-full ${className}`}>
      <div
        className="flex items-end justify-between gap-2 md:gap-4"
        style={{ height }}
      >
        {data.map((item, index) => {
          const heightPercent = (item.value / max) * 100;
          const baseColor = item.color || "bg-prime-accent";

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              {showValues && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`text-xs md:text-sm font-bold ${
                    item.highlight ? "text-prime" : "text-slate-600"
                  }`}
                >
                  {valuePrefix}
                  {item.value.toLocaleString("pt-BR")}
                  {valueSuffix}
                </motion.span>
              )}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${heightPercent}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className={`w-full rounded-t-lg ${
                  item.highlight
                    ? "bg-gradient-to-t from-prime to-prime-accent shadow-lg"
                    : baseColor
                }`}
                style={{ minHeight: 4 }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between gap-2 md:gap-4 mt-2 border-t border-slate-200 pt-2">
        {data.map((item, index) => (
          <span
            key={index}
            className={`flex-1 text-center text-[10px] md:text-xs ${
              item.highlight ? "font-bold text-prime" : "text-slate-500"
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ComparisonChartProps {
  before: { label: string; value: number };
  after: { label: string; value: number };
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
}

export function ComparisonChart({
  before,
  after,
  valuePrefix = "R$ ",
  valueSuffix = "",
  className = "",
}: ComparisonChartProps) {
  const max = Math.max(before.value, after.value);
  const improvement = ((after.value - before.value) / before.value) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-end gap-6 h-32">
        {/* Before */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-rose-600"
          >
            {valuePrefix}
            {before.value.toLocaleString("pt-BR")}
            {valueSuffix}
          </motion.span>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${(before.value / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-gradient-to-t from-rose-300 to-rose-200 rounded-t-lg"
          />
          <span className="text-xs text-slate-500">{before.label}</span>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-1 pb-6"
        >
          <span className="text-lg">→</span>
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
            +{improvement.toFixed(0)}%
          </span>
        </motion.div>

        {/* After */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-sm font-bold text-emerald-600"
          >
            {valuePrefix}
            {after.value.toLocaleString("pt-BR")}
            {valueSuffix}
          </motion.span>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${(after.value / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-t-lg shadow-lg"
          />
          <span className="text-xs text-slate-500">{after.label}</span>
        </div>
      </div>
    </div>
  );
}

interface TimelineChartProps {
  months: { month: string; value: number; milestone?: string }[];
  breakEvenMonth?: number;
  valuePrefix?: string;
  className?: string;
}

export function PaybackTimeline({
  months,
  breakEvenMonth = 1,
  valuePrefix = "R$ ",
  className = "",
}: TimelineChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200" />

        {/* Break-even indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute top-0"
          style={{ left: `${((breakEvenMonth - 0.5) / months.length) * 100}%` }}
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Break-even
            </span>
            <div className="w-0.5 h-4 bg-emerald-400" />
          </div>
        </motion.div>

        {/* Month nodes */}
        <div className="flex justify-between relative">
          {months.map((month, index) => {
            const isBeforeBreakEven = index < breakEvenMonth;
            const isBreakEven = index === breakEvenMonth - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                    isBreakEven
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-200"
                      : isBeforeBreakEven
                      ? "bg-rose-100 text-rose-600 border-2 border-rose-200"
                      : "bg-emerald-100 text-emerald-600 border-2 border-emerald-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">
                  {month.month}
                </span>
                <span
                  className={`text-xs font-bold mt-1 ${
                    month.value >= 0 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {month.value >= 0 ? "+" : ""}
                  {valuePrefix}
                  {Math.abs(month.value).toLocaleString("pt-BR")}
                </span>
                {month.milestone && (
                  <span className="text-[9px] text-prime-accent font-medium mt-0.5">
                    {month.milestone}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface DonutChartProps {
  percentage: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export function DonutChart({
  percentage,
  label,
  sublabel,
  size = 120,
  strokeWidth = 12,
  color = "#41b6e6",
  className = "",
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-slate-800"
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
      <span className="text-sm font-semibold text-slate-700 mt-2">{label}</span>
      {sublabel && (
        <span className="text-xs text-slate-500">{sublabel}</span>
      )}
    </div>
  );
}
