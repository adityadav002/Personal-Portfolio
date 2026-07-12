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

/**
 * One row of the timeline. The rail (line-segment / node / line-segment)
 * is a single flex column that always fills the row's full height, so
 * the node sits exactly at the row's vertical midpoint and the segment
 * above/below it are always equal — no matter how tall the card is.
 * Consecutive rows have zero margin between them, so row N's bottom
 * segment and row N+1's top segment touch exactly: the line can never
 * visually break.
 */
function TimelineRow({ project, index, onOpen }) {
  const side = index % 2 === 0 ? "left" : "right";
  // DOM order is always [card, rail, spacer] — CSS `order` (keyed off
  // pt-row--left / pt-row--right) is what actually decides left/right
  // placement on desktop, and forces [rail, card] on mobile. Keeping a
  // single fixed DOM order avoids conditional branching here entirely.
  return (
    <div className={`pt-row pt-row--${side}`}>
      <div className="pt-card-slot">
        <ProjectCard project={project} index={index} side={side} onOpen={onOpen} />
      </div>
      <div className="pt-rail" aria-hidden="true">
        <span className="pt-rail-seg" />
        <span className="pt-node" />
        <span className="pt-rail-seg" />
      </div>
      <div className="pt-spacer" aria-hidden="true" />
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
        {projects.map((project, index) => (
          <TimelineRow
            key={`${project.name}-${index}`}
            project={project}
            index={index}
            onOpen={handleOpen}
          />
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
          projectIndex={projects.indexOf(selectedProject)}
          projectNumber={selectedProject.number}
          problem={selectedProject.problem}
          impact={selectedProject.impact}
          learned={selectedProject.learned}
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