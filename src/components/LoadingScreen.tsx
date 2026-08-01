import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

function FloatingParticle({ delay }: { delay: number }) {
  const randomX = Math.random() * 100;
  const randomSize = 2 + Math.random() * 4;
  const duration = 4 + Math.random() * 6;

  return (
    <motion.div
      className="absolute rounded-full bg-white/30"
      style={{
        left: `${randomX}%`,
        bottom: "-10px",
        width: randomSize,
        height: randomSize,
      }}
      animate={{
        y: [0, -1100],
        opacity: [0, 0.8, 0],
        x: [0, (Math.random() - 0.5) * 100],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        const increment = prev < 70 ? 1.2 : prev < 90 ? 0.6 : 0.3;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at center, #1a0533 0%, #0d001a 60%, #000 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Particles */}
          {particles.map((i) => (
            <FloatingParticle key={i} delay={i * 0.2} />
          ))}

          {/* Glow rings */}
          <motion.div
            className="absolute rounded-full border border-purple-500/20"
            style={{ width: 300, height: 300 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full border border-pink-500/20"
            style={{ width: 220, height: 220 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Heart SVG */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="relative mb-10"
          >
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 20px #e879f9) drop-shadow(0 0 40px #a855f7)",
                  "drop-shadow(0 0 40px #e879f9) drop-shadow(0 0 80px #a855f7)",
                  "drop-shadow(0 0 20px #e879f9) drop-shadow(0 0 40px #a855f7)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.svg
                width="90"
                height="80"
                viewBox="0 0 90 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <defs>
                  <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f0abfc" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                <path
                  d="M45 75 C45 75 5 50 5 25 C5 12 15 4 25 4 C33 4 40 9 45 16 C50 9 57 4 65 4 C75 4 85 12 85 25 C85 50 45 75 45 75Z"
                  fill="url(#heartGrad)"
                />
              </motion.svg>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.p
            className="text-white/80 text-lg tracking-[0.3em] uppercase font-light mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Loading beautiful memories
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ...
            </motion.span>
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="w-64 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #818cf8, #c084fc, #f0abfc)",
                width: `${progress}%`,
                boxShadow: "0 0 12px #c084fc",
              }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          <motion.p
            className="text-white/40 text-xs mt-3 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {Math.floor(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
