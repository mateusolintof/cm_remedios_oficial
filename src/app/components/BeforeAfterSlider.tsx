"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Clock, Users, Ban, TrendingUp } from "lucide-react";

interface ComparisonItem {
  icon: React.ReactNode;
  label: string;
  before: string;
  after: string;
  highlight?: boolean;
}

const comparisons: ComparisonItem[] = [
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Tempo de Resposta",
    before: "2h+",
    after: "<1min",
    highlight: true,
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Atendimento Fora do Horário",
    before: "0%",
    after: "100%",
  },
  {
    icon: <Ban className="w-5 h-5" />,
    label: "Taxa de No-Show",
    before: "~30%",
    after: "~10%",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Conversão de Leads",
    before: "~15%",
    after: "~40%",
    highlight: true,
  },
];

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, percentage)));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative h-auto md:h-[400px] rounded-2xl overflow-hidden select-none touch-none"
      >
        {/* Before Side (Left) - Red/Warning */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-50 to-red-100"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
            Antes
          </div>
          <div className="h-full flex flex-col justify-center p-8 md:p-12">
            <div className="space-y-6">
              {comparisons.map((item, index) => (
                <motion.div
                  key={`before-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 ${
                    item.highlight ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-600">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-rose-600 font-medium uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className={`text-2xl md:text-3xl font-bold text-rose-700 ${item.highlight ? "text-rose-800" : ""}`}>
                      {item.before}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* After Side (Right) - Green/Success */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
            Depois
          </div>
          <div className="h-full flex flex-col justify-center items-end p-8 md:p-12">
            <div className="space-y-6 text-right">
              {comparisons.map((item, index) => (
                <motion.div
                  key={`after-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 flex-row-reverse ${
                    item.highlight ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-600">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-emerald-600 font-medium uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className={`text-2xl md:text-3xl font-bold text-emerald-700 ${item.highlight ? "text-emerald-800" : ""}`}>
                      {item.after}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Slider Handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Handle Indicator */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-slate-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isDragging
                ? "0 0 0 4px rgba(65, 182, 230, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.2)"
                : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ArrowLeftRight className="w-5 h-5 text-slate-600" />
          </motion.div>

          {/* Animated Lines */}
          <motion.div
            className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-300 via-slate-300 to-emerald-300"
            animate={{
              opacity: isDragging ? 1 : 0.6,
            }}
          />
        </motion.div>

        {/* Instructions */}
        <AnimatePresence>
          {!isDragging && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-xs text-slate-600 font-medium"
            >
              Arraste para comparar
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Alternative: Compact version for smaller spaces
export function CompactBeforeAfter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {comparisons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-prime-accent/10 flex items-center justify-center text-prime">
              {item.icon}
            </div>
            <span className="text-sm font-semibold text-slate-700">{item.label}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-rose-600">{item.before}</span>
              <span className="text-slate-400 text-sm">→</span>
              <span className="text-lg font-bold text-emerald-600">{item.after}</span>
            </div>
            {item.highlight && (
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                Destaque
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
