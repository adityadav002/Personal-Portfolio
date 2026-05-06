import projects from "../data/projectsData.js";
import Modal from "../components/Modal.jsx";
import { useState } from "react";

function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoverImg, setHoverImg] = useState(null);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });

  const handleOpen = (project) => setSelectedProject(project);
  const handleClose = () => setSelectedProject(null);

  const handleMouseMove = (e) => {
    setImgPos({ x: e.clientX + 20, y: e.clientY + 20 });
  };

  return (
    <div
      className="relative overflow-hidden md:py-5 py-5 px-4"
      onMouseMove={handleMouseMove}
    >
      {/* Projects List */}
      <div className="relative z-10">
        <h1
          className="text-[35px] sm:text-[35px] md:text-[40px] 
               font-bold tracking-wide 
               sm:mb-8 md:mb-10 sm:mt-8 md:mt-6
               mb-5 bg-lime-600 text-black w-fit mx-auto"
        >
          PROJECTS
        </h1>
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative w-full xl:h-[80px] group mb-3 sm:mt-6 sm:mb-3 md:mt-8 md:mb-4 cursor-pointer sm:py-2 overflow-hidden py-2 h-[60px] xl:py-0 xl:text-[10px]"
            onMouseEnter={() => setHoverImg(project.hoverimg)}
            onMouseLeave={() => setHoverImg(null)}
          >
            <h1 className="absolute w-full">
              <button
                className="
        absolute left-5 sm:left-10 md:left-[70px]
        text-white text-[22px] sm:text-[26px] md:text-[32px]
        font-medium tracking-wide
        transition-all duration-500 ease-in-out
        group-hover:left-1/2
        group-hover:-translate-x-1/2
        sm:py-2
      "
                onClick={() => handleOpen(project)}
              >
                {project.name}
              </button>
            </h1>

            <hr className="border-white/20 absolute bottom-0 w-full" />
          </div>
        ))}
      </div>

      {/* Floating Cursor Image */}
      {hoverImg && (
        <img
          src={hoverImg}
          alt="Project preview"
          className="fixed w-[120px] md:w-[180px] md:h-[180px] object-cover rounded-full xl:text-xl pointer-events-none z-[999] opacity-0 animate-fadeIn mix-blend-difference hidden sm:block -translate-x-1/2 -translate-y-1/2"
          style={{
            top: imgPos.y,
            left: imgPos.x,
          }}
        />
      )}

      {/* Modal */}
      {selectedProject && (
        <Modal
          show={true}
          onClose={handleClose}
          linkurl={selectedProject.linkUrl}
          videourl={selectedProject.videoSrc}
          posterurl={selectedProject.posterSrc}
          desc={selectedProject.desc}
          title={selectedProject.name}
          screenshots={selectedProject.screenshots}
          sourceCodeUrl={selectedProject.sourceCodeUrl}
          tags={selectedProject.tags || []}
        />
      )}

      {/* More Projects Link */}
      <div className="flex justify-center w-full underline xl:mb-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/adityadav002"
          className="mt-4 text-[#adff2f] text-[22px] sm:text-[26px] md:text-[30px] font-light tracking-wider transition-colors duration-300 hover:text-[#c8ff5e]"
        >
          more
        </a>
      </div>

      {/* Keyframe Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Project;
