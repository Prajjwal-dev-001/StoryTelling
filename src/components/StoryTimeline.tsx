import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timelineItems } from "../data/timeline";

interface TimelineItemProps {
  item: (typeof timelineItems)[0];
  index: number;
  isLeft: boolean;
}

function TimelineEntry({ item, index, isLeft }: TimelineItemProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`flex items-center w-full mb-16 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
    >
      {/* Content card */}
      <div className={`w-5/12 ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect */}
          <div
            className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(192,132,252,0.3), rgba(240,171,252,0.3))",
              filter: "blur(8px)",
            }}
          />

          <div
            className="relative rounded-2xl p-6 border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="text-purple-400/60 text-xs tracking-widest uppercase font-light block mb-2">
              {item.year}
            </span>
            <h3
              className="text-white text-xl font-light mb-3"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              {item.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Center line + icon */}
      <div className="w-2/12 flex flex-col items-center">
        {/* Icon bubble */}
        <motion.div
          className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(192,132,252,0.3), rgba(240,171,252,0.2))",
            border: "1px solid rgba(192,132,252,0.4)",
            boxShadow: "0 0 30px rgba(192,132,252,0.3)",
          }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          animate={
            inView
              ? {
                  boxShadow: [
                    "0 0 20px rgba(192,132,252,0.2)",
                    "0 0 40px rgba(192,132,252,0.5)",
                    "0 0 20px rgba(192,132,252,0.2)",
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>{item.icon}</span>
        </motion.div>

        {/* Step number */}
        <span className="text-purple-400/40 text-xs mt-2 font-mono">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Spacer */}
      <div className="w-5/12" />
    </motion.div>
  );
}

export default function StoryTimeline() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      className="relative py-32 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #0a0215 30%, #0d0520 70%, #000 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(120,40,200,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <div ref={titleRef} className="text-center mb-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-purple-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          Our Story
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
          A Journey Through Time
        </motion.h2>
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

      {/* Vertical line */}
      <div className="relative max-w-5xl mx-auto">
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(192,132,252,0.3) 10%, rgba(192,132,252,0.3) 90%, transparent)",
          }}
        />

        {/* Timeline items */}
        {timelineItems.map((item, index) => (
          <TimelineEntry
            key={item.id}
            item={item}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}
