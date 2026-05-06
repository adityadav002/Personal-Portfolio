import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function PortfolioHero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["About", "Skills", "Projects", "Contact"];

  return (
    <div
      className="relative bg-black overflow-hidden"
    >
      {/* Animated background gradient blobs */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ height: "500px" }}
      >
        <div
          className="
            absolute 
            -top-1/2 
            -right-1/4 
            w-[60vw] h-[60vw] 
            max-w-[800px] max-h-[800px]
            rounded-full 
            opacity-20 
            blur-3xl 
            animate-blob
          "
          style={{
            background: "radial-gradient(circle, #88FF00 0%, transparent 70%)",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="hidden lg:block absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl animate-blob animation-delay-2000"
          style={{
            background: "radial-gradient(circle, #88FF00 0%, transparent 70%)",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="hidden lg:block absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl animate-blob animation-delay-4000"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-0">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-5 py-5">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="group cursor-pointer">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white relative">
                <span className="relative z-10">PORTFOLIO</span>
                <div className="absolute -inset-2 bg-lime-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              </h2>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link, index) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="relative text-white/60 hover:text-white font-medium text-sm tracking-wide transition-colors duration-300 group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a
                href="https://www.linkedin.com/in/aditya-yadav003/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-6 py-2.5 bg-lime-400 text-black font-semibold text-sm tracking-wide hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95">
                  HIRE ME
                </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 z-[60]"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Right Side Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[75%] max-w-sm bg-black/95 backdrop-blur-lg z-50 md:hidden
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col gap-6 p-6 pt-24">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/80 hover:text-lime-400 font-medium text-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}

            <button className="mt-4 px-6 py-3 bg-lime-400 text-black font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300 w-full">
              HIRE ME
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 px-5 lg:px-5 xl:px-5 pt-5 lg:pt-1 xl:pt-1 pb-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <p
                  className="text-lime-400 text-sm lg:text-base font-semibold tracking-[0.2em] uppercase animate-fade-in-up opacity-0"
                  style={{
                    animationDelay: "200ms",
                    animationFillMode: "forwards",
                  }}
                >
                  Hi, I'm a{" "}
                  <span className="text-white">
                    <Typewriter
                      words={[
                        "Developer",
                        "Calisthenics Enthusiast",
                        "Sketch Artist",
                        "Gamer",
                      ]}
                      loop={0}
                      cursor
                      cursorStyle="|"
                      typeSpeed={80}
                      deleteSpeed={50}
                      delaySpeed={1500}
                    />
                  </span>
                </p>

                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] animate-fade-in-up opacity-0"
                  style={{
                    animationDelay: "400ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <span className="text-white xl:block">Aditya</span>{" "}
                  <span className="text-lime-400 xl:block">Yadav</span>
                </h1>

                <p
                  className="text-white/60 text-base lg:text-lg max-w-xl leading-relaxed animate-fade-in-up opacity-0"
                  style={{
                    animationDelay: "600ms",
                    animationFillMode: "forwards",
                  }}
                >
                  Crafting elegant solutions and building exceptional digital
                  experiences that merge creativity with cutting-edge
                  technology.
                </p>
              </div>

              <div
                className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: "800ms",
                  animationFillMode: "forwards",
                }}
              >
                <a
                  href="https://github.com/adityadav002"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    type="submit"
                    className="group border-2 border-lime-400/70 text-lime-400/70 px-10 py-3 
                     transition-all duration-300 
                   hover:bg-lime-400/70 hover:text-black"
                  >
                    Explore Projects
                  </button>
                </a>
              </div>

              {/* Email */}
              <div
                className="animate-fade-in-up opacity-0"
                style={{
                  animationDelay: "1000ms",
                  animationFillMode: "forwards",
                }}
              >
                <a
                  href="mailto:aditya.yadav9926@gmail.com"
                  className="text-white/50 hover:text-lime-400 text-sm font-medium transition-colors duration-300 border-b border-white/0 hover:border-lime-400 pb-1"
                >
                  aditya.yadav992636@gmail.com
                </a>
              </div>
            </div>

            {/* Right visual element */}
            <div
              className="hidden lg:block relative lg:h-[600px] h-[400px] animate-fade-in opacity-0"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              {/* Geometric shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main circle with gradient */}
                <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
                  {/* Outer rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-lime-400/20 animate-pulse-slow" />
                  <div className="absolute inset-8 rounded-full border-2 border-lime-400/30 animate-pulse-slow animation-delay-1000" />
                  <div className="absolute inset-16 rounded-full border-2 border-white/10 animate-pulse-slow animation-delay-2000" />

                  {/* Central gradient blob */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime-400/30 via-lime-400/10 to-transparent blur-2xl animate-blob-slow" />

                  {/* Accent dots */}
                  <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-lime-400 rounded-full animate-float" />
                  <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-white rounded-full animate-float animation-delay-1000" />
                  <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-lime-400/50 rounded-full animate-float animation-delay-2000" />

                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                        linear-gradient(#88FF00 1px, transparent 1px),
                        linear-gradient(90deg, #88FF00 1px, transparent 1px)
                      `,
                        backgroundSize: "40px 40px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:block animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-lime-400 rounded-full animate-scroll-down" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes blob-slow {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-blob-slow {
          animation: blob-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-scroll-down {
          animation: scroll-down 2s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
