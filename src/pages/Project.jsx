import { useState, useEffect, useRef } from "react";
import {
  FiExternalLink,
  FiArrowRight,
  FiFilm,
  FiTrello,
  FiBarChart2,
  FiTruck,
  FiCode,
} from "react-icons/fi";
import projects from "../data/projectsData.js";
import Modal from "../components/Modal.jsx";
import { parseProjectDesc } from "../utils/parseProjectDesc.js";
import "./Project.css";

const MAX_FEATURES_ON_CARD = 5;
const MAX_CHIPS_ON_CARD = 4;

function getProjectIcon(project) {
  if (project.icon) return project.icon;
  const haystack =
    `${project.name} ${(project.tags || []).join(" ")}`.toLowerCase();
  if (/movie|film|cinema/.test(haystack)) return FiFilm;
  if (/kanban|board|task/.test(haystack)) return FiTrello;
  if (/csv|pandas|numpy|data|analy|chart|matplotlib|seaborn/.test(haystack))
    return FiBarChart2;
  if (/porsche|car|vehicle/.test(haystack)) return FiTruck;
  return FiCode;
}

function ProjectCard({ project, index, side, onOpen }) {
  const Icon = getProjectIcon(project);
  const { overview, features, techStack } = parseProjectDesc(project.desc);
  const chips = project.tags?.length ? project.tags : techStack;
  const featureList = features.slice(0, MAX_FEATURES_ON_CARD);
  const chipList = chips.slice(0, MAX_CHIPS_ON_CARD);
  const extraChips = chips.length - chipList.length;

  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardStyle = project.hoverimg
    ? { "--pt-hover-img": `url(${project.hoverimg})` }
    : undefined;

  return (
    <div
      ref={cardRef}
      className={`pt-card pt-card--${side} ${visible ? "pt-card--visible" : ""}`}
      style={cardStyle}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      <div className="pt-card-top">
        <span className="pt-eyebrow">
          Project {String(index + 1).padStart(2, "0")}
        </span>
        {project.linkUrl && (
          <a
            href={project.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pt-ext-link"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${project.name} live demo`}
          >
            <FiExternalLink size={14} />
          </a>
        )}
      </div>

      <div className="pt-card-onerow">
        <div className="pt-icon-box">
          <Icon size={19} />
        </div>

        <h3 className="pt-card-title">{project.name}</h3>
      </div>

      {chipList.length > 0 && (
        <div className="pt-chips">
          {chipList.map((tag, i) => (
            <span key={i} className="pt-chip">
              <span className="pt-chip-dot" />
              {tag}
            </span>
          ))}
          {extraChips > 0 && (
            <span className="pt-chip pt-chip--muted">+{extraChips}</span>
          )}
        </div>
      )}

      {overview && <p className="pt-card-desc">{overview}</p>}

      {featureList.length > 0 && (
        <>
          <span className="pt-features-heading">Key Features</span>
          <ul className="pt-feature-list">
            {featureList.map((f, i) => (
              <li key={i}>
                <span className="pt-dot" />
                {f}
              </li>
            ))}
          </ul>
        </>
      )}

      <span className="pt-view-details">
        View Details <FiArrowRight size={14} className="pt-arrow" />
      </span>
    </div>
  );
}

function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = (project) => setSelectedProject(project);
  const handleClose = () => setSelectedProject(null);

  return (
    <div
      className="pt-root relative overflow-hidden py-14 px-4 sm:px-6"
      id="projects"
    >
      {/* Header */}
      <div className="pt-header">
        <span className="pt-header-eyebrow">My Work</span>
        <h1 className="pt-header-title">
          PRO<span className="pt-accent">JECTS</span>
        </h1>
        <p className="pt-header-sub">
          A timeline of selected projects that showcase my skills, creativity
          and problem-solving approach.
        </p>
      </div>

      {/* Timeline */}
      <div className="pt-timeline">
        <div className="pt-line" aria-hidden="true" />
        {projects.map((project, index) => (
          <div className="pt-row" key={`${project.name}-${index}`}>
            <div className="pt-node" aria-hidden="true" />
            <ProjectCard
              project={project}
              index={index}
              side={index % 2 === 0 ? "left" : "right"}
              onOpen={handleOpen}
            />
          </div>
        ))}
      </div>

      {/* Modal — unchanged logic */}
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

      {/* More projects */}
      <div className="pt-more">
        <a
          href="https://github.com/adityadav002"
          target="_blank"
          rel="noopener noreferrer"
          className="pt-more-btn"
        >
          View All Projects
        </a>
      </div>
    </div>
  );
}

export default Project;
