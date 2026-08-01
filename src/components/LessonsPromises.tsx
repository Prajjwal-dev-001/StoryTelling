import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { lessons } from "../data/lessons";

// Milliseconds per character for typing speed
const MS_PER_CHAR = 35;

interface WrittenLineProps {
  text: string;
  onComplete: () => void;
  isActive: boolean;
  isDone: boolean;
  lineNumber: number;
}

function WrittenLine({ text, onComplete, isActive, isDone, lineNumber }: WrittenLineProps) {
  const [displayed, setDisplayed] = useState(isDone ? text : "");
  const [showCursor, setShowCursor] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(isDone);
  const charRef = useRef(isDone ? text.length : 0);

  useEffect(() => {
    // Already done (e.g., re-render) or not active yet
    if (completedRef.current || !isActive) return;

    charRef.current = 0;
    setDisplayed("");
    setShowCursor(true);

    timerRef.current = setInterval(() => {
      charRef.current += 1;
      setDisplayed(text.slice(0, charRef.current));

      if (charRef.current >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        completedRef.current = true;
        setShowCursor(false);
        setTimeout(onComplete, 500);
      }
    }, MS_PER_CHAR);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <motion.div
      className="flex items-start gap-4"
      style={{
        borderBottom: "1px solid rgba(150,130,80,0.1)",
        paddingTop: "12px",
        paddingBottom: "12px",
        minHeight: "56px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive || isDone ? 1 : 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {/* Line number */}
      <span
        className="text-amber-700/40 text-xs w-6 text-right flex-shrink-0 mt-1"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        {String(lineNumber).padStart(2, "0")}
      </span>

      {/* Red margin line */}
      <div
        className="w-px self-stretch flex-shrink-0"
        style={{ background: "rgba(200,80,80,0.25)", minHeight: "32px" }}
      />

      {/* Written text */}
      <p
        className="flex-1 text-gray-700 text-sm sm:text-base"
        style={{
          fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
          lineHeight: "1.85",
        }}
      >
        {displayed}
        {showCursor && isActive && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.55, repeat: Infinity }}
            className="inline-block w-0.5 h-4 bg-gray-500 align-middle ml-0.5"
          />
        )}
      </p>
    </motion.div>
  );
}

export default function LessonsPromises() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [doneSet, setDoneSet] = useState<Set<number>>(new Set());
  const [allDone, setAllDone] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-120px" });

  // Kick off animation when section enters viewport
  useEffect(() => {
    if (sectionInView && currentIndex === -1) {
      // Small delay for effect
      const t = setTimeout(() => setCurrentIndex(0), 400);
      return () => clearTimeout(t);
    }
  }, [sectionInView, currentIndex]);

  const handleLineComplete = (index: number) => {
    setDoneSet((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    if (index < lessons.length - 1) {
      setTimeout(() => setCurrentIndex(index + 1), 200);
    } else {
      setAllDone(true);
    }
  };

  return (
    <section
      className="relative py-32 px-4 sm:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #0a0812 30%, #0d0b18 70%, #000 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(180,160,80,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <div ref={titleRef} className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-amber-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          Reflections
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl text-white font-thin"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            textShadow: "0 0 40px rgba(220,180,80,0.3)",
          }}
        >
          Lessons &amp; Promises
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 text-sm mt-4 font-light"
        >
          What I learned. What I carry forward. What I promise to keep.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-20 h-px mx-auto mt-6"
          style={{
            background: "linear-gradient(90deg, transparent, #fbbf24, transparent)",
          }}
        />
      </div>

      {/* Notebook paper */}
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        {/* Stack shadow layers */}
        <div
          className="absolute left-1/2 bottom-0 -z-10 rounded-2xl"
          style={{
            width: "calc(100% - 80px)",
            height: "100%",
            transform: "translateX(-50%) translateY(8px)",
            background: "rgba(220,200,150,0.12)",
            maxWidth: "calc(672px - 16px)",
          }}
        />
        <div
          className="absolute left-1/2 bottom-0 -z-20 rounded-2xl"
          style={{
            width: "calc(100% - 100px)",
            height: "100%",
            transform: "translateX(-50%) translateY(16px)",
            background: "rgba(200,180,130,0.08)",
            maxWidth: "calc(672px - 32px)",
          }}
        />

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "#fffef5",
            boxShadow:
              "0 20px 80px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(200,180,100,0.15)",
          }}
        >
          {/* Horizontal ruled lines */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="absolute w-full"
                style={{
                  top: 140 + i * 30,
                  height: 1,
                  background: "rgba(150,130,80,0.1)",
                }}
              />
            ))}
          </div>

          {/* Spiral binding area */}
          <div
            className="absolute left-0 top-0 bottom-0 w-14 flex flex-col justify-around items-center py-4"
            style={{
              background: "rgba(220,200,150,0.2)",
              borderRight: "2px solid rgba(150,130,80,0.15)",
            }}
          >
            {Array.from({ length: 14 }, (_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2"
                style={{
                  borderColor: "rgba(120,100,60,0.3)",
                  background: "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>

          {/* Holes in spiral */}
          <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-around py-4">
            {Array.from({ length: 14 }, (_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: "#0d0b18",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
                }}
              />
            ))}
          </div>

          {/* Left margin red line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "4.5rem",
              width: 1,
              background: "rgba(200,80,80,0.2)",
            }}
          />

          {/* Paper content */}
          <div className="pl-20 pr-6 pt-6 pb-8">
            {/* Notebook header */}
            <div
              className="mb-6 pb-3"
              style={{ borderBottom: "2px solid rgba(180,60,60,0.25)" }}
            >
              <p
                className="text-amber-800/40 text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Personal Journal — Things I Carry Forward
              </p>
            </div>

            {/* ALL LESSONS — rendered and animated */}
            <div>
              {lessons.map((lesson, index) => (
                <WrittenLine
                  key={lesson.id}
                  text={lesson.text}
                  lineNumber={index + 1}
                  isActive={currentIndex === index}
                  isDone={doneSet.has(index)}
                  onComplete={() => handleLineComplete(index)}
                />
              ))}
            </div>

            {/* Completion footer */}
            {allDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-8 pt-4 text-right"
                style={{ borderTop: "1px solid rgba(150,130,80,0.15)" }}
              >
                <p
                  className="text-amber-700/40 text-xs italic"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  — Written with gratitude, sincerity and love
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lesson count note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={titleInView ? { opacity: 0.4 } : {}}
        transition={{ delay: 1 }}
        className="text-center text-white/30 text-xs mt-12 tracking-widest font-light"
      >
        {lessons.length} lessons — all lived, all real
      </motion.p>
    </section>
  );
}
