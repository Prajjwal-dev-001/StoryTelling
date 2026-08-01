import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { finalLetterLines } from "../data/finalLetter";

const LINE_DELAY_MS = 120; // ms per char

function LetterLine({ text, active, done }: { text: string; active: boolean; done: boolean }) {
  const [displayed, setDisplayed] = useState(done ? text : "");
  const [showCursor, setShowCursor] = useState(false);
  const charRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(done);

  useEffect(() => {
    if (!active || completedRef.current) return;
    if (text === "") {
      completedRef.current = true;
      return;
    }
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
      }
    }, LINE_DELAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, text]);

  if (text === "") return <div className="h-5" />;

  return (
    <p
      className="leading-relaxed text-gray-700 min-h-[28px]"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: "0.95rem",
        lineHeight: "1.9",
      }}
    >
      {displayed}
      {showCursor && active && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-gray-500 align-middle ml-0.5"
        />
      )}
    </p>
  );
}

export default function FinalLetter() {
  const [unfolded, setUnfolded] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [doneLines, setDoneLines] = useState<Set<number>>(new Set());
  const [allDone, setAllDone] = useState(false);

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const buttonRef = useRef(null);
  const buttonInView = useInView(buttonRef, { once: true });

  const handleUnfold = () => {
    setUnfolded(true);
    setTimeout(() => setCurrentLine(0), 1200);
  };

  // Advance lines automatically
  useEffect(() => {
    if (currentLine < 0) return;
    const text = finalLetterLines[currentLine] ?? "";
    const duration = text === "" ? 200 : text.length * LINE_DELAY_MS + 500;

    const timer = setTimeout(() => {
      setDoneLines((prev) => new Set([...prev, currentLine]));
      if (currentLine < finalLetterLines.length - 1) {
        setCurrentLine((prev) => prev + 1);
      } else {
        setAllDone(true);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentLine]);

  return (
    <section
      className="relative py-32 px-4 sm:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000 0%, #0c0816 40%, #100c20 70%, #000 100%)",
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(150,100,200,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <div ref={titleRef} className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          className="text-purple-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          The Final Word
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
          A Letter I Finally Wrote
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-20 h-px mx-auto mt-6"
          style={{ background: "linear-gradient(90deg, transparent, #c084fc, transparent)" }}
        />
      </div>

      {/* Letter wrapper */}
      <div className="max-w-2xl mx-auto">
        {!unfolded && (
          <motion.div
            ref={buttonRef}
            initial={{ opacity: 0, y: 30 }}
            animate={buttonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Folded paper visual */}
            <motion.div
              className="inline-block cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={handleUnfold}
            >
              <div
                className="w-48 h-36 mx-auto rounded-lg relative overflow-hidden mb-6"
                style={{
                  background: "linear-gradient(180deg, #fdf8f0, #faf0e0)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(210,180,120,0.3)",
                }}
              >
                {/* Fold lines */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, transparent calc(50% - 1px), rgba(180,150,80,0.2) 50%, transparent calc(50% + 1px))",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent calc(50% - 1px), rgba(180,150,80,0.15) 50%, transparent calc(50% + 1px))",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  📜
                </div>
                {/* Wax seal */}
                <motion.div
                  className="absolute bottom-2 right-2 text-2xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  💜
                </motion.div>
              </div>
              <motion.button
                className="px-8 py-3 rounded-full text-white text-sm tracking-widest"
                style={{
                  background: "linear-gradient(135deg, rgba(192,132,252,0.3), rgba(240,171,252,0.2))",
                  border: "1px solid rgba(192,132,252,0.4)",
                  boxShadow: "0 0 30px rgba(192,132,252,0.2)",
                }}
                whileHover={{
                  boxShadow: "0 0 50px rgba(192,132,252,0.4)",
                  scale: 1.03,
                }}
              >
                Unfold the Letter
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Unfolded letter */}
        <AnimatePresence>
          {unfolded && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.1, y: -40 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              style={{ transformOrigin: "top center" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "#fffef8",
                  boxShadow:
                    "0 30px 100px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)",
                  border: "1px solid rgba(210,180,120,0.2)",
                }}
              >
                {/* Paper lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-full border-b"
                      style={{
                        top: 80 + i * 30,
                        borderColor: "rgba(150,130,80,0.08)",
                      }}
                    />
                  ))}
                </div>

                {/* Left margin */}
                <div
                  className="absolute left-16 top-0 bottom-0 w-px"
                  style={{ background: "rgba(200,100,100,0.2)" }}
                />

                {/* Content */}
                <div className="px-20 py-12">
                  {/* Date header */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-right mb-8"
                  >
                    <p
                      className="text-gray-400 text-xs"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </motion.div>

                  {/* Letter lines */}
                  <div className="space-y-1">
                    {finalLetterLines.map((line, index) => (
                      <LetterLine
                        key={index}
                        text={line}
                        active={currentLine === index}
                        done={doneLines.has(index)}
                      />
                    ))}
                  </div>

                  {/* Signature area */}
                  {allDone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="mt-10 pt-6 border-t border-amber-200/30"
                    >
                      <motion.div
                        className="text-center"
                        animate={{
                          filter: [
                            "drop-shadow(0 0 8px rgba(192,132,252,0.3))",
                            "drop-shadow(0 0 20px rgba(192,132,252,0.6))",
                            "drop-shadow(0 0 8px rgba(192,132,252,0.3))",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <p
                          className="text-gray-500 text-sm italic"
                          style={{ fontFamily: "'Georgia', serif" }}
                        >
                          With all the love that words can carry,
                        </p>
                        <p
                          className="text-gray-600 text-xl mt-2"
                          style={{
                            fontFamily: "'Dancing Script', 'Georgia', cursive",
                            textShadow: "0 0 10px rgba(192,132,252,0.3)",
                          }}
                        >
                          ~ Someone who always cared ♡
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
