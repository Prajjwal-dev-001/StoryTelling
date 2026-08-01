import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { admirationCards } from "../data/cards";

interface CardProps {
  card: (typeof admirationCards)[0];
  index: number;
}

function FlipCard({ card, index }: CardProps) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFlip();
      }
    },
    [handleFlip]
  );

  // Color accent per card group
  const hue = 260 + (index % 40) * 2;
  const frontBg = `linear-gradient(135deg, hsla(${hue},70%,60%,0.12), hsla(${hue + 20},70%,70%,0.06))`;
  const backBg = `linear-gradient(135deg, hsla(${hue},70%,40%,0.35), hsla(${hue + 30},80%,50%,0.2))`;
  const borderColor = `hsla(${hue},70%,70%,0.3)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: (index % 10) * 0.04,
        ease: "easeOut",
      }}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-2xl"
      style={{ perspective: "1000px" }}
      onClick={handleFlip}
      onKeyDown={handleKey}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`Card ${card.id}: ${card.title}. ${flipped ? "Showing message. Press Enter or Space to flip back." : "Press Enter or Space to reveal hidden message."}`}
    >
      {/* Outer hover wrapper */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer"
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* Inner flip wrapper */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: "100%",
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Front Face */}
          <div
            className="w-full rounded-2xl p-4 border flex flex-col items-center justify-center text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              minHeight: "150px",
              background: frontBg,
              borderColor,
              boxShadow: flipped
                ? "none"
                : `0 4px 20px hsla(${hue},70%,60%,0.08)`,
            }}
          >
            {/* Card number badge */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mb-3 text-xs font-light flex-shrink-0"
              style={{
                background: `hsla(${hue},70%,60%,0.15)`,
                border: `1px solid hsla(${hue},70%,70%,0.35)`,
                color: `hsl(${hue},80%,80%)`,
              }}
            >
              {card.id}
            </div>

            <h4
              className="text-white/90 text-sm font-light leading-snug mb-3"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              {card.title}
            </h4>

            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs tracking-wider"
              style={{ color: `hsl(${hue},70%,75%)` }}
            >
              ✦ reveal ✦
            </motion.div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 w-full rounded-2xl p-4 border flex flex-col items-center justify-center text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              minHeight: "150px",
              background: backBg,
              borderColor: `hsla(${hue},80%,75%,0.4)`,
              boxShadow: flipped
                ? `0 8px 30px hsla(${hue},70%,60%,0.15)`
                : "none",
            }}
          >
            <p
              className="text-white/90 text-xs leading-relaxed font-light"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              {card.message}
            </p>
            <p
              className="text-xs mt-3 tracking-wider opacity-40"
              style={{ color: `hsl(${hue},70%,80%)` }}
            >
              ✦ flip back ✦
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function AdmirationCards() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      className="relative py-32 px-4 sm:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #070212 30%, #0e0425 70%, #000 100%)",
      }}
    >
      {/* Background shimmer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(120,40,200,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Section title */}
      <div ref={titleRef} className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-purple-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          100 Things
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl text-white font-thin"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            textShadow: "0 0 40px rgba(192,132,252,0.3)",
          }}
        >
          Things I Always Admired About You
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 text-sm mt-4 max-w-md mx-auto font-light"
        >
          Click or tap any card to reveal what I always noticed but never said aloud.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-20 h-px mx-auto mt-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c084fc, transparent)",
          }}
        />
      </div>

      {/* Cards grid — all 100 */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {admirationCards.map((card, index) => (
          <FlipCard key={card.id} card={card} index={index} />
        ))}
      </div>

      {/* Count note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={titleInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="text-center mt-16"
      >
        <p className="text-white/20 text-xs tracking-widest font-light">
          {admirationCards.length} things admired — each one genuine, each one yours.
        </p>
      </motion.div>
    </section>
  );
}
