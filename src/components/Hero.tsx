import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../data/config";

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, #0f0720 0%, #07040f 60%, #000 100%)",
        }}
      />
      {/* Aurora layer 1 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(120,40,200,0.5) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Aurora layer 2 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 60%, rgba(220,80,180,0.4) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Aurora layer 3 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(60,100,240,0.4) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      {/* Teal aurora */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 60% 80%, rgba(20,180,160,0.25) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.1, 0.4, 0.1], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* Stars */}
      {Array.from({ length: 80 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 1.31 * 7 + 11) % 100}%`,
            top: `${(i * 2.17 * 3 + 7) % 100}%`,
            width: (i % 3) + 0.5,
            height: (i % 3) + 0.5,
          }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: (i * 0.23) % 5,
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles() {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 5.1 + 3) % 100}%`,
            top: `${(i * 7.3 + 11) % 100}%`,
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            background: `hsl(${260 + (i % 80)}, 80%, 70%)`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: (i * 0.37) % 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function TypingHeading({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setDone(true);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block ml-1 w-0.5 h-[0.85em] bg-purple-300 align-middle"
        />
      )}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <AuroraBackground />
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-purple-300/80 tracking-[0.4em] uppercase text-sm font-light mb-8"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          A Story About Someone Special
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-thin text-white leading-tight mb-8"
          style={{
            textShadow:
              "0 0 60px rgba(192,132,252,0.5), 0 0 100px rgba(192,132,252,0.2)",
            fontFamily: "'Playfair Display', 'Georgia', serif",
          }}
        >
          <TypingHeading text={SITE_CONFIG.title} />
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.5, duration: 1, ease: "easeInOut" }}
          className="w-24 h-px mx-auto mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c084fc, #f0abfc, #c084fc, transparent)",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif", fontStyle: "italic" }}
        >
          {SITE_CONFIG.subtitle}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase font-light">
          Scroll to begin
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-purple-400"
          />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 text-white/10 text-xs tracking-widest">✦</div>
      <div className="absolute top-6 right-6 text-white/10 text-xs tracking-widest">✦</div>
      <div className="absolute bottom-6 left-6 text-white/10 text-xs tracking-widest">✦</div>
      <div className="absolute bottom-6 right-6 text-white/10 text-xs tracking-widest">✦</div>
    </section>
  );
}
