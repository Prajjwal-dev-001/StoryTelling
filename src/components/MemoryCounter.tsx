import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SINCE_DATE } from "../data/config";

function getTimeDiff(since: Date) {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - since.getTime());

  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return { days, hours, minutes, seconds };
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      prevRef.current = value;
      setDisplayed(value);
    }
  }, [value]);

  return (
    <motion.span
      key={displayed}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {String(displayed).padStart(2, "0")}
    </motion.span>
  );
}

interface CounterBlockProps {
  label: string;
  value: number;
  emoji: string;
  delay: number;
}

function CounterBlock({ label, value, emoji, delay }: CounterBlockProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="relative group"
    >
      {/* Glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(192,132,252,0.2), rgba(240,171,252,0.2))",
          filter: "blur(12px)",
        }}
      />
      <div
        className="relative rounded-2xl p-6 sm:p-8 text-center border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
          backdropFilter: "blur(10px)",
        }}
      >
        <span className="text-3xl mb-3 block">{emoji}</span>
        <div
          className="text-4xl sm:text-6xl font-thin text-white mb-2 overflow-hidden"
          style={{
            textShadow: "0 0 30px rgba(192,132,252,0.6)",
            fontFamily: "'Georgia', serif",
            minHeight: "1.2em",
          }}
        >
          <AnimatedNumber value={value} />
        </div>
        <p className="text-purple-300/60 text-xs tracking-[0.3em] uppercase font-light">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function MemoryCounter() {
  const [time, setTime] = useState(getTimeDiff(SINCE_DATE));
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeDiff(SINCE_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sinceDateStr = SINCE_DATE.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000 0%, #0a0118 50%, #000 100%)",
      }}
    >
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(120,40,200,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Title */}
      <div ref={titleRef} className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          className="text-purple-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          Time
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl text-white font-thin"
          style={{
            fontFamily: "'Georgia', serif",
            textShadow: "0 0 40px rgba(192,132,252,0.3)",
          }}
        >
          Counting the Moments
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/30 text-sm mt-4 font-light"
        >
          Since {sinceDateStr}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-20 h-px mx-auto mt-6"
          style={{
            background: "linear-gradient(90deg, transparent, #c084fc, transparent)",
          }}
        />
      </div>

      {/* Counter grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <CounterBlock label="Days" value={time.days} emoji="📅" delay={0} />
        <CounterBlock label="Hours" value={time.hours} emoji="🕐" delay={0.1} />
        <CounterBlock label="Minutes" value={time.minutes} emoji="⏱️" delay={0.2} />
        <CounterBlock label="Seconds" value={time.seconds} emoji="💫" delay={0.3} />
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={titleInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center text-white/20 text-xs mt-16 font-light italic tracking-wide max-w-sm mx-auto"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        "Every second that passes becomes a memory worth keeping."
      </motion.p>
    </section>
  );
}
