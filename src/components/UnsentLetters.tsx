import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { letters } from "../data/letters";

interface EnvelopeProps {
  letter: (typeof letters)[0];
  index: number;
}

function Envelope({ letter, index }: EnvelopeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const positions = [
    { x: -5, y: 0, rotate: -2 },
    { x: 0, y: 10, rotate: 1 },
    { x: 5, y: -5, rotate: -1 },
    { x: -8, y: 5, rotate: 3 },
    { x: 3, y: 8, rotate: -3 },
    { x: -3, y: -8, rotate: 2 },
    { x: 7, y: 3, rotate: -4 },
    { x: -6, y: -3, rotate: 1 },
  ];

  const pos = positions[index % positions.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center"
    >
      {/* Envelope container */}
      <motion.div
        className="relative cursor-pointer group"
        style={{ x: pos.x, rotate: pos.rotate }}
        whileHover={{ scale: 1.05, rotate: 0, y: -5 }}
        onClick={() => setOpen(!open)}
      >
        {/* Envelope body */}
        <div
          className="relative w-44 h-28 rounded-lg overflow-hidden select-none"
          style={{
            background: "linear-gradient(135deg, #fdf6e3, #faefd4)",
            boxShadow: open
              ? "0 20px 60px rgba(0,0,0,0.4)"
              : "0 6px 20px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)",
            border: "1px solid rgba(210,180,120,0.3)",
          }}
        >
          {/* Envelope back crease lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(200,160,80,0.15) 50%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(225deg, rgba(200,160,80,0.15) 50%, transparent 50%)",
            }}
          />

          {/* Envelope fold bottom triangle */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden"
            style={{
              clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
              background: "rgba(200,160,80,0.15)",
            }}
          />

          {/* Seal */}
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xl z-10"
            animate={open ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            💌
          </motion.div>

          {/* Envelope flap (top) */}
          <motion.div
            className="absolute top-0 left-0 right-0 origin-top z-20"
            style={{ height: "55%" }}
            animate={open ? { rotateX: -160, opacity: 0.8 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(180deg, #faefd4, #f5e6b8)",
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                borderBottom: "1px solid rgba(200,160,80,0.2)",
              }}
            />
          </motion.div>
        </div>

        {/* Label */}
        <p
          className="text-center mt-3 text-white/50 text-xs tracking-wider font-light"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {letter.subject}
        </p>

        {/* Hint */}
        <p className="text-center text-white/30 text-xs tracking-widest">
          {open ? "click to close" : "click to open"}
        </p>
      </motion.div>

      {/* Letter popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, y: -20 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0, y: -20 }}
            style={{ transformOrigin: "top center" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-4 w-72 max-w-xs relative"
          >
            <div
              className="rounded-lg p-6"
              style={{
                background: "linear-gradient(180deg, #fffef7, #fdf8e8)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                border: "1px solid rgba(210,180,120,0.3)",
                // lined paper effect
                backgroundImage:
                  "linear-gradient(180deg, #fffef7, #fffef7 calc(100% - 1px), rgba(150,130,80,0.15) 100%)",
                backgroundSize: "100% 28px",
              }}
            >
              {/* Paper lines */}
              <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-b"
                    style={{
                      top: 28 + i * 28,
                      borderColor: "rgba(150,130,80,0.12)",
                    }}
                  />
                ))}
              </div>

              <p
                className="text-gray-600 text-xs leading-7 relative z-10 font-light"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {letter.content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function UnsentLetters() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      className="relative py-32 px-4 sm:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #0b0615 40%, #0f0820 70%, #000 100%)",
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(180,100,220,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <div ref={titleRef} className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          className="text-purple-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          Unsent
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
          Letters I Never Sent
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 text-sm mt-4 max-w-md mx-auto font-light"
        >
          Click each envelope to open a letter and read what was always felt but never sent.
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

      {/* Envelopes grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {letters.map((letter, index) => (
          <Envelope key={letter.id} letter={letter} index={index} />
        ))}
      </div>
    </section>
  );
}
