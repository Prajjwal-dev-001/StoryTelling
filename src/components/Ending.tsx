import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const stars: Star[] = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  duration: 2 + Math.random() * 4,
  delay: Math.random() * 5,
}));

interface Lantern {
  id: number;
  x: number;
  duration: number;
  delay: number;
  size: number;
}

const lanterns: Lantern[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  duration: 8 + Math.random() * 6,
  delay: i * 0.8,
  size: 1.5 + Math.random() * 1.5,
}));

const finalLines = [
  { text: "Thank You.", delay: 0 },
  { text: "For Every Memory.", delay: 0.3 },
  { text: "For Every Smile.", delay: 0.6 },
  { text: "For Every Lesson.", delay: 0.9 },
  { text: "", delay: 1.2 },
  {
    text: "I truly hope life gives you every happiness you deserve.",
    delay: 1.5,
    small: true,
  },
  { text: "", delay: 1.8 },
  {
    text: "Some people become a part of our story",
    delay: 2.1,
    small: true,
  },
  { text: "without ever knowing it.", delay: 2.4, small: true },
];

export default function Ending() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 px-6"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #0a0520 0%, #050212 40%, #000 100%)",
      }}
    >
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting star */}
      <motion.div
        className="absolute h-px"
        style={{
          top: "20%",
          left: "10%",
          width: 100,
          background:
            "linear-gradient(90deg, transparent, white, transparent)",
          transform: "rotate(-30deg)",
        }}
        animate={{
          x: [0, 300],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 7,
          delay: 3,
        }}
      />

      {/* Lanterns */}
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          className="absolute pointer-events-none"
          style={{
            left: `${lantern.x}%`,
            bottom: -80,
            fontSize: `${lantern.size}rem`,
          }}
          animate={{
            y: [0, -1200],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 0.9, 0.7, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: lantern.duration,
            delay: lantern.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          🏮
        </motion.div>
      ))}

      {/* Moon */}
      <motion.div
        className="absolute text-7xl top-16 right-16 pointer-events-none"
        animate={{
          y: [0, -10, 0],
          filter: [
            "drop-shadow(0 0 20px rgba(255,240,180,0.5))",
            "drop-shadow(0 0 40px rgba(255,240,180,0.8))",
            "drop-shadow(0 0 20px rgba(255,240,180,0.5))",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🌕
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl mb-12"
        >
          ✨
        </motion.div>

        {/* Final text lines */}
        <div className="space-y-3">
          {finalLines.map((line, index) =>
            line.text === "" ? (
              <div key={index} className="h-4" />
            ) : (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: line.delay }}
                className={
                  line.small
                    ? "text-white/50 text-base sm:text-lg font-light"
                    : "text-white text-3xl sm:text-5xl font-thin"
                }
                style={{
                  fontFamily: "'Georgia', serif",
                  textShadow: line.small
                    ? "none"
                    : "0 0 40px rgba(192,132,252,0.4)",
                }}
              >
                {line.text}
              </motion.p>
            )
          )}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 2.8 }}
          className="w-32 h-px mx-auto my-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(192,132,252,0.6), transparent)",
          }}
        />

        {/* Hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="flex justify-center gap-4 mb-10"
        >
          {["💜", "✨", "🌟", "✨", "💜"].map((e, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* Final quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 3.5 }}
          className="text-white/25 text-xs tracking-widest font-light italic"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          "Not all stars are in the sky. Some walk beside us for a little while."
        </motion.p>

        {/* Back to top */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 4 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-16 text-white/20 text-xs tracking-widest hover:text-white/50 transition-colors"
        >
          ↑ Return to the beginning
        </motion.button>
      </div>
    </section>
  );
}
