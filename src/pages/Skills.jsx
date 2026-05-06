import { useEffect, useRef } from "react";
import {
  FaReact,
  FaPython,
  FaDocker,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaNode,
  FaDatabase,
} from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import InfiniteScroll from "../components/InfiniteScroll";

function Skills() {
  const skills = [
    { name: "C++", level: 90, icon: SiCplusplus },
    { name: "Python", level: 80, icon: FaPython },
    { name: "JavaScript", level: 90, icon: FaJs },
    { name: "React", level: 90, icon: FaJs },
    { name: "Node.js", level: 90, icon: FaJs },
    { name: "MySQL", level: 75, icon: FaDatabase },
    { name: "Pandas", level: 75, icon: FaDatabase },
    { name: "Numpy", level: 75, icon: FaDatabase },
    { name: "Matplotlib & Seaborn", level: 75, icon: FaDatabase },
    { name: "Scikit Learn", level: 70, icon: FaDatabase }
  ];

  const techIcons = [
    FaReact,
    FaNode,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaDocker,
    FaPython,
  ];

  const skillsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fill");
          }
        });
      },
      { threshold: 0.3 },
    );

    skillsRef.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-5 px-4 sm:px-6 lg:px-8 xl:py-10 xl:px-10">
      {/* Header */}
      <div className="flex justify-center mb-5 mt-5 xl:mb-10 xl:mt-10">
        <div className="relative text-center">
          {/* Background Text */}
          <h1 className="absolute inset-0 flex items-center justify-center text-3xl sm:text-3xl md:text-3xl lg:text-8xl font-bold text-white/10 tracking-[0.3rem] pointer-events-none">
            Skills
          </h1>

          {/* Foreground Text */}
          <h2 className="relative bg-transparent text-4xl sm:text-4xl md:text-3xl font-bold text-white tracking-[0.3rem] transition-all duration-300 ease-in xl:hover:text-[90px] xl:hover:-mt-7 hover:-mb-5">
            Skills
          </h2>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/60 text-center max-w-5xl mx-auto mb-10 text-sm sm:text-base leading-relaxed px-4">
        As a passionate software engineer, I've built a strong foundation in web
        development, programming, and problem-solving. My skills include working
        with technologies like HTML, CSS, JavaScript, React, and Node.js, along
        with a growing knowledge of databases and version control using Git and
        GitHub. I'm constantly learning and exploring new tools to write clean,
        efficient, and scalable code.
      </p>

      {/* Skills Grid */}
      <div className="max-w-6xl mx-auto mb-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-16 xl:gap-10">
          {skills.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="w-full">
                <div className="flex justify-between items-center text-white xl:mb-2">
                  <div className="flex items-center gap-3">
                    <Icon className="text-green-500 text-xl" />
                    <h3 className="text-base sm:text-lg font-medium">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-green-400">
                    {item.level}%
                  </span>
                </div>
                {/* <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden shadow-lg">
                  <div
                    ref={(el) => (skillsRef.current[index] = el)}
                    className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full w-0 transition-all duration-1000 ease-out"
                    style={{ "--skill-width": `${item.level}%` }}
                  />
                </div> */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Scroll Tech Icons */}
      <InfiniteScroll />
    </div>
  );
}

export default Skills;
