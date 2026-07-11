import {
  FaCode,
  FaLayerGroup,
  FaTools,
  FaBrain,
} from "react-icons/fa";
import InfiniteScroll from "../components/InfiniteScroll";

function Skills() {
  // Grouped skills — edit freely, everything below maps 1:1 to your old skill list
  const skillCategories = [
    {
      title: "Languages",
      icon: FaCode,
      items: ["C++", "SQL", "JavaScript", "HTML / CSS", "Python", "Java"],
    },
    {
      title: "Frameworks & Libraries",
      icon: FaLayerGroup,
      items: ["React.js", "Tailwind CSS", "Node.js", "Pandas", "NumPy", "Matplotlib & Seaborn", "Scikit-learn"],
    },
    {
      title: "Tools",
      icon: FaTools,
      items: ["Git", "GitHub", "VS Code", "MySQL", "Antigravity", "Docker", "Postman"],
    },
    {
      title: "CS Fundamentals",
      icon: FaBrain,
      items: ["Data Structures", "Algorithms", "OOP"],
    },
  ];

  return (
    <div className="py-5 px-4 sm:px-6 lg:px-8 xl:py-10 xl:px-10">
      <br />
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

      <br />

      {/* Description */}
      <p className="text-white/60 text-center max-w-5xl mx-auto mb-10 text-sm sm:text-base leading-relaxed px-4">
        As a passionate software engineer, I've built a strong foundation in web
        development, programming, and problem-solving. My skills include working
        with technologies like HTML, CSS, JavaScript, React, and Node.js, along
        with a growing knowledge of databases and version control using Git and
        GitHub. I'm constantly learning and exploring new tools to write clean,
        efficient, and scalable code.
      </p>

      <br />

      {/* Skills Categories */}
      <div className="max-w-6xl mx-auto mb-10 px-2 sm:px-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-2 sm:px-8 sm:py-2">
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={category.title}
                className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-5 sm:py-6 ${
                  index !== skillCategories.length - 1
                    ? "border-b border-dashed border-white/10"
                    : ""
                }`}
              >
                {/* Category label */}
                <div className="flex items-center gap-3 md:w-56 lg:w-64 shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/15 text-[#a3e635] text-sm shrink-0">
                    <CategoryIcon />
                  </span>
                  <span className="uppercase tracking-wider text-xs sm:text-sm font-semibold text-white/80 whitespace-nowrap">
                    {category.title}
                  </span>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {category.items.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-white/90 hover:border-[#a3e635]/40 hover:bg-white/[0.06] transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-[2px] bg-[#a3e635] shrink-0" />
                      <span className="whitespace-nowrap">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Skills;