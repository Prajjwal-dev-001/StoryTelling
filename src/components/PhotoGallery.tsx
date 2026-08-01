import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface PolaroidPhoto {
  id: number;
  label: string;
  color: string;
  rotate: number;
  emoji: string;
  bgColor: string;
}

const photos: PolaroidPhoto[] = [
  {
    id: 1,
    label: "A Quiet Morning",
    color: "#fde68a",
    rotate: -3,
    emoji: "☀️",
    bgColor: "from-amber-100 to-yellow-50",
  },
  {
    id: 2,
    label: "That Smile",
    color: "#fbcfe8",
    rotate: 2,
    emoji: "🌸",
    bgColor: "from-pink-100 to-rose-50",
  },
  {
    id: 3,
    label: "A Shared Laugh",
    color: "#c7d2fe",
    rotate: -5,
    emoji: "✨",
    bgColor: "from-indigo-100 to-purple-50",
  },
  {
    id: 4,
    label: "The Little Things",
    color: "#bbf7d0",
    rotate: 4,
    emoji: "🌿",
    bgColor: "from-green-100 to-emerald-50",
  },
  {
    id: 5,
    label: "Unexpected Kindness",
    color: "#fecaca",
    rotate: -2,
    emoji: "💫",
    bgColor: "from-red-100 to-pink-50",
  },
  {
    id: 6,
    label: "Moments of Grace",
    color: "#e9d5ff",
    rotate: 3,
    emoji: "🦋",
    bgColor: "from-purple-100 to-violet-50",
  },
  {
    id: 7,
    label: "Quiet Understanding",
    color: "#bae6fd",
    rotate: -4,
    emoji: "🌊",
    bgColor: "from-sky-100 to-blue-50",
  },
  {
    id: 8,
    label: "A Memory Frozen",
    color: "#fed7aa",
    rotate: 5,
    emoji: "🍂",
    bgColor: "from-orange-100 to-amber-50",
  },
];

function PolaroidCard({ photo, index }: { photo: PolaroidPhoto; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ y, transformOrigin: "center center" }}
      initial={{ opacity: 0, y: 60, rotate: photo.rotate * 2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: photo.rotate } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 10,
      }}
      className="relative cursor-pointer"
    >
      <div
        className="bg-white p-4 pb-12"
        style={{
          boxShadow: "0 10px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Photo area */}
        <div
          className={`w-full aspect-square bg-gradient-to-br ${photo.bgColor} flex items-center justify-center relative overflow-hidden`}
        >
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Light leak */}
          <div
            className="absolute top-0 right-0 w-1/2 h-1/2 opacity-30"
            style={{
              background: `radial-gradient(ellipse at top right, ${photo.color}, transparent)`,
            }}
          />
          <motion.span
            className="text-6xl relative z-10"
            animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
            transition={{
              duration: 3 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {photo.emoji}
          </motion.span>
        </div>

        {/* Tape strip */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 opacity-70"
          style={{
            background: "rgba(255,235,150,0.6)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        />

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 pb-3 text-center">
          <p
            className="text-gray-500 text-xs"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.05em" }}
          >
            {photo.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      className="relative py-32 px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #080312 40%, #0c0420 70%, #000 100%)",
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(192,132,252,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <div ref={titleRef} className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-purple-400/60 tracking-[0.4em] uppercase text-xs font-light block mb-4"
        >
          Memories
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
          Every Photo a Feeling
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 text-sm mt-4 max-w-md mx-auto font-light"
        >
          Not all photographs are captured by cameras.
          Some are held only in the heart.
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

      {/* Grid of polaroids */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {photos.map((photo, index) => (
          <PolaroidCard key={photo.id} photo={photo} index={index} />
        ))}
      </div>
    </section>
  );
}
