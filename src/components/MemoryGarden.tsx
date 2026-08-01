import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  type: "flower" | "butterfly" | "firefly" | "sparkle" | "heart";
}

const flowerEmojis = ["🌸", "🌺", "🌻", "🌼", "🌷", "💐", "🏵️"];
const sparkleEmojis = ["✨", "⭐", "💫", "🌟", "⚡", "🔮"];

let nextId = 1;

function GardenParticle({ particle }: { particle: Particle }) {
  const emoji =
    particle.type === "flower"
      ? flowerEmojis[particle.id % flowerEmojis.length]
      : particle.type === "butterfly"
      ? "🦋"
      : particle.type === "firefly"
      ? "🔆"
      : particle.type === "heart"
      ? "💜"
      : sparkleEmojis[particle.id % sparkleEmojis.length];

  const config = {
    flower: { size: "2rem", duration: 2.5, yOff: -60 },
    butterfly: { size: "1.8rem", duration: 4.5, yOff: -130 },
    firefly: { size: "0.9rem", duration: 4, yOff: -90 },
    sparkle: { size: "1.4rem", duration: 1.8, yOff: -70 },
    heart: { size: "1.5rem", duration: 3, yOff: -80 },
  }[particle.type];

  const xDrift = (particle.id % 3 === 0 ? 1 : -1) * (20 + (particle.id % 40));

  return (
    <motion.div
      className="absolute pointer-events-none select-none z-20"
      style={{
        left: particle.x,
        top: particle.y,
        fontSize: config.size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0],
        y: [0, config.yOff],
        x: [0, xDrift],
        rotate: [0, particle.type === "flower" ? 20 : particle.type === "butterfly" ? 30 : 10],
      }}
      transition={{ duration: config.duration, ease: "easeOut" }}
    >
      {emoji}
    </motion.div>
  );
}

export default function MemoryGarden() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });
  const [clickCount, setClickCount] = useState(0);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClickCount((c) => c + 1);

    const types: Particle["type"][] = [
      "flower", "flower", "flower",
      "butterfly",
      "firefly", "firefly",
      "sparkle", "sparkle",
      "heart",
    ];

    const count = 7 + Math.floor(Math.random() * 5);
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const id = nextId++;
      newParticles.push({
        id,
        x: x + (Math.random() - 0.5) * 80,
        y: y + (Math.random() - 0.5) * 60,
        type,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up
    const ids = new Set(newParticles.map((p) => p.id));
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
    }, 6000);
  }, []);

  // Ambient floating fireflies
  const ambientFireflies = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      top: 10 + Math.random() * 70,
      size: 4 + Math.random() * 6,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
    }))
  );

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #030d08 30%, #050f10 70%, #000 100%)",
      }}
    >
      {/* Aurora background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(20,120,60,0.08) 0%, rgba(20,60,120,0.06) 50%, transparent 80%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient fireflies */}
      {ambientFireflies.current.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            background: "rgba(250,240,100,0.7)",
            filter: `blur(${f.size / 3}px)`,
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -20, 30, -15, 0],
            opacity: [0, 0.8, 0.4, 0.9, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Title */}
      <div ref={titleRef} className="text-center mb-16 relative z-10 px-4">
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          className="text-emerald-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          Interactive
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl text-white font-thin"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            textShadow: "0 0 40px rgba(100,200,120,0.3)",
          }}
        >
          The Memory Garden
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 text-sm mt-4 font-light"
        >
          Click anywhere in the garden to make it bloom ✨
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-20 h-px mx-auto mt-6"
          style={{ background: "linear-gradient(90deg, transparent, #6ee7b7, transparent)" }}
        />
      </div>

      {/* Garden interactive area */}
      <div
        ref={gardenRef}
        className="relative mx-4 sm:mx-8 lg:mx-16 rounded-3xl overflow-hidden cursor-crosshair"
        style={{
          height: "55vh",
          minHeight: 380,
          background:
            "linear-gradient(180deg, rgba(8,25,18,0.97) 0%, rgba(5,18,12,0.99) 100%)",
          border: "1px solid rgba(100,200,120,0.12)",
          boxShadow:
            "0 0 80px rgba(20,120,60,0.08), inset 0 0 60px rgba(10,60,30,0.25)",
        }}
        onClick={handleClick}
      >
        {/* Ground glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(20,80,30,0.25))",
          }}
        />

        {/* Stars */}
        {Array.from({ length: 35 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              left: `${(i * 2.87 + 5) % 100}%`,
              top: `${(i * 3.14 + 8) % 65}%`,
              width: (i % 3) + 0.5,
              height: (i % 3) + 0.5,
            }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.31) % 4,
            }}
          />
        ))}

        {/* Moon */}
        <motion.div
          className="absolute top-5 right-10 text-5xl pointer-events-none select-none"
          animate={{
            y: [0, -6, 0],
            filter: [
              "drop-shadow(0 0 15px rgba(255,240,180,0.6))",
              "drop-shadow(0 0 30px rgba(255,240,180,0.9))",
              "drop-shadow(0 0 15px rgba(255,240,180,0.6))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🌙
        </motion.div>

        {/* Trees */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-4 pb-2 pointer-events-none select-none">
          {["🌳", "🌿", "🌲", "🌿", "🌳", "🌿", "🌲", "🌿", "🌳"].map((t, i) => (
            <motion.span
              key={i}
              style={{ fontSize: i % 3 === 0 ? "2.5rem" : "1.5rem" }}
              animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <GardenParticle key={p.id} particle={p} />
          ))}
        </AnimatePresence>

        {/* Click hint (shown when no particles) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: particles.length === 0 ? [0.4, 0.7, 0.4] : 0 }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="text-center">
            <motion.p
              className="text-emerald-400/50 text-xl tracking-widest"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Touch the garden ✨
            </motion.p>
            <p className="text-white/20 text-xs mt-2 tracking-wider font-light">
              Watch it come alive
            </p>
          </div>
        </motion.div>

        {/* Click counter */}
        {clickCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="absolute top-4 left-4 text-emerald-400 text-xs tracking-widest pointer-events-none"
          >
            {clickCount} blooms
          </motion.div>
        )}
      </div>
    </section>
  );
}
