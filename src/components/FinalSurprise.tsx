import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { memorableMomentQuote } from "../data/finalLetter";

function triggerCelebration() {
  // Multi-burst confetti
  const colors = [
    "#c084fc",
    "#f0abfc",
    "#818cf8",
    "#e879f9",
    "#fbbf24",
    "#60a5fa",
    "#34d399",
  ];

  // Center burst
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { x: 0.5, y: 0.6 },
    colors,
    ticks: 300,
  });

  // Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors,
    });
  }, 200);

  // Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors,
    });
  }, 400);

  // Star burst
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 360,
      origin: { x: 0.5, y: 0.4 },
      colors,
      startVelocity: 25,
      gravity: 0.6,
    });
  }, 800);
}

interface FloatingFirefly {
  id: number;
  x: number;
  y: number;
}

interface FloatingStar {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function FinalSurprise() {
  const [triggered, setTriggered] = useState(false);
  const [fireflies, setFireflies] = useState<FloatingFirefly[]>([]);
  const [stars, setStars] = useState<FloatingStar[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [shake, setShake] = useState(false);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  let fId = useRef(0);

  const handleSurprise = useCallback(() => {
    if (triggered) {
      // Allow retriggering
      triggerCelebration();
      return;
    }

    setTriggered(true);
    setShake(true);
    setTimeout(() => setShake(false), 600);

    triggerCelebration();

    // Generate fireflies
    const newFireflies: FloatingFirefly[] = Array.from({ length: 20 }, () => ({
      id: ++fId.current,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setFireflies(newFireflies);

    // Generate stars
    const starEmojis = ["⭐", "🌟", "💫", "✨", "🌠", "💥", "🌙", "☀️"];
    const newStars: FloatingStar[] = Array.from({ length: 15 }, () => ({
      id: ++fId.current,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: starEmojis[Math.floor(Math.random() * starEmojis.length)],
    }));
    setStars(newStars);

    // Show popup
    setTimeout(() => setShowPopup(true), 800);
  }, [triggered]);

  return (
    <section
      className="relative py-32 px-4 sm:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #08041a 40%, #0d0728 70%, #000 100%)",
      }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,40,200,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Floating fireflies */}
      <AnimatePresence>
        {fireflies.map((f) => (
          <motion.div
            key={f.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              background: "rgba(250,240,100,0.9)",
              filter: "blur(2px)",
              boxShadow: "0 0 8px rgba(250,240,100,0.8)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1.5, 1, 1.5, 0],
              x: [(Math.random() - 0.5) * 200],
              y: [(Math.random() - 0.5) * 200],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 + Math.random() * 3, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Floating stars */}
      <AnimatePresence>
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute pointer-events-none text-2xl"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              y: -100,
              x: (Math.random() - 0.5) * 100,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 + Math.random() * 2, ease: "easeOut" }}
          >
            {s.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Title */}
      <div ref={titleRef} className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          className="text-purple-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          One More Thing
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
          A Final Surprise
        </motion.h2>
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

      {/* Main button */}
      <motion.div
        className="text-center"
        animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={handleSurprise}
          className="relative group inline-flex items-center gap-3 px-12 py-5 rounded-full text-white text-lg tracking-wider font-light"
          style={{
            background:
              "linear-gradient(135deg, rgba(192,132,252,0.25), rgba(240,171,252,0.15))",
            border: "1px solid rgba(192,132,252,0.4)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 30px rgba(192,132,252,0.2), 0 0 60px rgba(192,132,252,0.1)",
              "0 0 60px rgba(192,132,252,0.5), 0 0 100px rgba(192,132,252,0.2)",
              "0 0 30px rgba(192,132,252,0.2), 0 0 60px rgba(192,132,252,0.1)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background:
                "linear-gradient(135deg, rgba(192,132,252,0.1), rgba(240,171,252,0.1))",
              filter: "blur(8px)",
            }}
          />
          <span className="text-2xl">🎁</span>
          <span style={{ fontFamily: "'Georgia', serif" }}>
            {triggered ? "Once More ✨" : "One Last Memory"}
          </span>
        </motion.button>
      </motion.div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Popup card */}
            <motion.div
              className="relative max-w-lg w-full rounded-3xl p-10 text-center"
              initial={{ scale: 0.5, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,10,40,0.98), rgba(30,15,60,0.98))",
                border: "1px solid rgba(192,132,252,0.3)",
                boxShadow:
                  "0 0 100px rgba(192,132,252,0.3), 0 40px 100px rgba(0,0,0,0.8)",
              }}
            >
              {/* Glowing stars */}
              {["✨", "💫", "⭐", "🌟"].map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    top: `${[10, 15, 70, 75][i]}%`,
                    left: `${[10, 80, 5, 85][i]}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 20, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {s}
                </motion.span>
              ))}

              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💜
              </motion.div>

              <h3
                className="text-white text-2xl font-thin mb-6"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                A Final Memory
              </h3>

              <p
                className="text-white/70 text-base leading-relaxed font-light mb-8"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                "{memorableMomentQuote}"
              </p>

              <motion.button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 rounded-full text-white/60 text-sm border border-white/10 hover:border-white/30 transition-colors"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
