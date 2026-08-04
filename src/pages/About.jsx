import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const sections = [
  {
    number: "01",
    image: "/game.png",
    imageAlt: "Gaming setup with neon lighting and dual monitors",
    description:
      "I am a Data Scientist passionate about transforming data into meaningful insights and intelligent solutions. I enjoy working with machine learning, data analysis, and modern software development to solve real-world problems. With a strong foundation in programming, databases, and full-stack development, I build efficient applications while applying data-driven approaches wherever possible. I focus on writing clean, scalable code and creating solutions that combine technology, logic, and practical impact.",
    imageLeft: false,
  },
  {
    number: "02",
    image: "/coding.png",
    imageAlt: "Developer coding at night with multiple monitors showing code",
    description:
      "Outside of work, I enjoy exploring hobbies that keep me creative, focused, and constantly improving. Gaming allows me to experience new worlds and stories, while sketching helps me express creativity and improve my attention to detail. I also practice calisthenics to build discipline, strength, and consistency. Whether it is fitness, art, or technology, I enjoy challenging myself and learning something new through every experience.",
    imageLeft: true,
  },
  {
    number: "03",
    image: "/calithensis.png",
    imageAlt: "Athlete doing pull-ups at sunset with city skyline in background",
    description:
      "I am a curious, disciplined, and detail-oriented person who enjoys breaking complex problems into simple, logical solutions. I believe continuous improvement, consistency, and adaptability are important for long-term growth. I value clear communication, collaboration, and taking ownership of my work. Every project and experience is an opportunity for me to learn, improve, and create something meaningful.",
    imageLeft: false,
  },
];

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeFromLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeFromRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── Blinking Cursor ─────────────────────────────────────────────────────────
const Cursor = () => (
  <motion.span
    className="inline-block w-[6px] h-[14px] bg-lime-400 ml-1 align-middle rounded-[1px]"
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
    aria-hidden="true"
  />
);

// ─── Text Card ────────────────────────────────────────────────────────────────
const TextCard = ({ description, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className="relative h-full rounded-2xl border border-white/[0.07] bg-[#0D0D0D] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Top lime accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />

      {/* macOS traffic lights */}
      <div className="flex items-center gap-[7px] px-5 py-[13px] border-b border-white/[0.05]">
        <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f56]" aria-hidden="true" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" aria-hidden="true" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" aria-hidden="true" />
      </div>

      {/* Body */}
      <div className="px-7 pt-7 pb-9">
        <p className="text-gray-300 text-[15px] leading-[1.9] font-mono">
          {description}
          <Cursor />
        </p>
      </div>
    </motion.div>
  );
};

// ─── Image Card ───────────────────────────────────────────────────────────────
const ImageCard = ({ src, alt, delay = 0, imageLeft = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const variant = imageLeft ? fadeFromLeft : fadeFromRight;

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className="h-full rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.4)] group"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />
    </motion.div>
  );
};

// ─── Timeline Node ────────────────────────────────────────────────────────────
const TimelineNode = ({ number }) => (
  <div
    className="hidden xl:flex flex-col items-center w-14 shrink-0 pt-1"
    aria-hidden="true"
  >
    <span
      className="text-[56px] font-black leading-none select-none tabular-nums"
      style={{
        color: "transparent",
        WebkitTextStroke: "1px rgba(132,204,22,0.12)",
      }}
    >
      {number}
    </span>
    <div className="flex flex-col items-center mt-3 flex-1">
      <motion.div
        className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.5)]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="w-px flex-1 mt-2 bg-gradient-to-b from-lime-400/30 to-transparent min-h-[100px]" />
    </div>
  </div>
);

const TimelineSpacer = () => (
  <div className="hidden xl:block w-14 shrink-0" aria-hidden="true" />
);

// ─── Section Row ──────────────────────────────────────────────────────────────
const SectionRow = ({ section }) => {
  const { number, image, imageAlt, description, imageLeft } = section;

  return (
    <div className="flex items-stretch gap-4 xl:gap-6">
      {!imageLeft ? <TimelineNode number={number} /> : <TimelineSpacer />}

      {/* Two-column content */}
      <div
        className={`flex flex-col sm:flex-row flex-1 min-w-0 gap-4 ${
          imageLeft ? "sm:flex-row-reverse" : ""
        }`}
      >
        {/* Text card — slightly wider than image */}
        <div className="w-full sm:flex-[1.1] min-h-[260px] sm:min-h-[300px]">
          <TextCard description={description} delay={0.05} />
        </div>

        {/* Image card */}
        <div className="w-full sm:flex-1 min-h-[240px] sm:min-h-[300px]">
          <ImageCard
            src={image}
            alt={imageAlt}
            delay={0.15}
            imageLeft={imageLeft}
          />
        </div>
      </div>

      {imageLeft ? <TimelineNode number={number} /> : <TimelineSpacer />}
    </div>
  );
};

// ─── Download Icon ────────────────────────────────────────────────────────────
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
  </svg>
);

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-40px" });

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/ADITYA_YADAV.pdf";
    link.download = "ADITYA_YADAV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      className="relative bg-[#050505] py-20 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[220px] opacity-[0.05] blur-[90px]"
        style={{ background: "#84cc16" }}
        aria-hidden="true"
      />

      {/* Full-width container — no max-w cap that fragments layout */}
      <div className="max-w-7xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-lime-400/50" />
            <span className="text-lime-400 text-[11px] font-mono tracking-[0.28em] uppercase">
              About Me
            </span>
            <div className="h-px w-10 bg-lime-400/50" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tight mb-4">
            Data Scientist
          </h1>

          <p className="text-gray-500 text-sm sm:text-base font-light tracking-wide mt-4">
            Turning data into insights. Insights into impact.
          </p>
        </motion.div>

        {/* ── Rows ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 lg:gap-7">
          {sections.map((section) => (
            <SectionRow key={section.number} section={section} />
          ))}
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <motion.div
          ref={footerRef}
          className="flex justify-center mt-14 sm:mt-16"
          initial={{ opacity: 0, y: 16 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.button
            onClick={downloadCV}
            whileHover={{ y: -2, boxShadow: "0 0 28px rgba(132,204,22,0.22)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-lime-400/40 px-8 py-3 text-sm font-mono text-lime-400 hover:border-lime-400/80 hover:text-lime-300 transition-colors duration-300 cursor-pointer"
            aria-label="Download CV as PDF"
          >
            <DownloadIcon />
            Get CV
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default About;