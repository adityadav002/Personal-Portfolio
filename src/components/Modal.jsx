import { useEffect, useState, useRef, useCallback } from "react";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiGithub,
  FiMaximize2,
  FiPlay,
} from "react-icons/fi";
import { parseProjectDesc } from "../utils/parseProjectDesc.js";

/* ─── CSS ──────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Manrope:wght@400;500;600;700&display=swap');

  :root {
    --bg-0:        #050505;
    --bg-1:        #111111;
    --bg-2:        #161616;
    --accent:      #adff2f;
    --border:      rgba(255,255,255,0.08);
    --border-soft: rgba(255,255,255,0.06);
    --glass:       rgba(255,255,255,0.06);
    --muted:       #9CA3AF;
    --body:        rgba(255,255,255,0.75);
    --white:       #ffffff;
  }

  @keyframes overlayIn   { from{opacity:0} to{opacity:1} }
  @keyframes cardIn      { from{opacity:0; transform:scale(.96) translateY(18px)} to{opacity:1; transform:scale(1) translateY(0)} }
  @keyframes heroIn      { from{opacity:0; transform:scale(1.04)} to{opacity:1; transform:scale(1)} }
  @keyframes slideUp     { from{opacity:0; transform:translateY(24px)} to{opacity:1; transform:translateY(0)} }
  @keyframes underlineIn { from{transform:scaleX(0)} to{transform:scaleX(1)} }

  .m * { box-sizing:border-box; }
  .m   { font-family:'Manrope',sans-serif; }

  /* Overlay */
  .m-overlay {
    position:fixed; inset:0; z-index:1000;
    background:rgba(0,0,0,0.86);
    backdrop-filter:blur(18px) saturate(120%);
    display:flex; align-items:center; justify-content:center;
    padding:20px;
    animation:overlayIn .25s ease forwards;
  }

  /* Card */
  .m-card {
    position:relative;
    width:100%; max-width:1180px; max-height:94vh;
    background:var(--bg-1);
    border:1px solid var(--border-soft);
    border-radius:22px;
    overflow-y:auto; overflow-x:hidden;
    scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.15) transparent;
    box-shadow:0 40px 100px rgba(0,0,0,0.7);
    animation:cardIn .45s cubic-bezier(.16,1,.3,1) forwards;
  }
  .m-card::-webkit-scrollbar{width:6px;}
  .m-card::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12); border-radius:10px;}

  /* ── Hero ────────────────────────────────────────────────── */
  .m-hero {
    position:relative; width:100%; height:600px;
    background:linear-gradient(140deg,#111,var(--bg-0));
    overflow:hidden;
  }
  .m-hero video, .m-hero-img {
    position:absolute; inset:0;
    width:100%; height:100%; object-fit:cover; display:block;
    animation:heroIn .7s cubic-bezier(.16,1,.3,1) both;
  }
  .m-hero-fade-bottom {
    position:absolute; inset:0; pointer-events:none; z-index:1;
    background:linear-gradient(to bottom, rgba(0,0,0,.25) 0%, rgba(0,0,0,.35) 40%, rgba(5,5,5,.92) 78%, var(--bg-1) 100%);
  }
  .m-hero-fade-top {
    position:absolute; top:0; left:0; right:0; height:160px; pointer-events:none; z-index:1;
    background:linear-gradient(to bottom, rgba(0,0,0,.55), transparent);
  }
  .m-hero-fade-side {
    position:absolute; inset:0; pointer-events:none; z-index:1;
    background:linear-gradient(90deg, rgba(0,0,0,.5) 0%, transparent 18%, transparent 82%, rgba(0,0,0,.5) 100%);
  }

  /* Close button */
  .m-close {
    position:absolute; top:20px; right:20px; z-index:6;
    display:flex; align-items:center; justify-content:center;
    width:38px; height:38px; border-radius:50%;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.14);
    color:var(--white); cursor:pointer;
    transition:all .3s cubic-bezier(.16,1,.3,1);
  }
  .m-close:hover {
    background:rgba(173,255,47,0.12);
    border-color:var(--accent);
    color:var(--accent);
    transform:rotate(90deg);
  }

  /* Hero content (bottom, overlapping) */
  .m-hero-content {
    position:absolute; left:0; right:0; bottom:0; z-index:5;
    display:flex; align-items:flex-end; gap:28px;
    padding:0 14px 14px;
    animation:slideUp .6s cubic-bezier(.16,1,.3,1) .15s both;
  }

  .m-poster {
    flex-shrink:0; width:176px; aspect-ratio:2/3;
    border-radius:14px; overflow:hidden;
    border:1px solid rgba(255,255,255,0.18);
    box-shadow:0 22px 46px rgba(0,0,0,0.55);
    background:var(--bg-2);
  }
  .m-poster img { width:100%; height:100%; object-fit:cover; display:block; }

  .m-hero-text { flex:1; min-width:0; padding-bottom:4px; }

  .m-eyebrow {
    font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase;
    color:var(--muted); margin:0 0 12px;
  }

  .m-title {
    font-family:'Poppins',sans-serif;
    font-weight:800; letter-spacing:-0.01em;
    font-size:clamp(34px, 4.6vw, 62px); line-height:1.05;
    color:var(--white);
    text-shadow:0 6px 30px rgba(0,0,0,0.6);
    margin:0 0 16px;
  }

  .m-pills { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
  .m-pill {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 14px; border-radius:30px;
    font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;
    color:var(--white);
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.16);
    backdrop-filter:blur(14px);
    box-shadow:0 0 14px rgba(173,255,47,0.14);
  }
  .m-pill-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; background:var(--accent); }

  /* Hero actions */
  .m-hero-actions { display:flex; gap:14px; flex-wrap:wrap; margin-top:4px; }

  .m-btn {
    display:inline-flex; align-items:center; gap:9px;
    padding:12px 22px; border-radius:10px;
    font-size:14px; font-weight:700;
    text-decoration:none; cursor:pointer; border:1px solid transparent;
    transition:transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s cubic-bezier(.16,1,.3,1), filter .2s, background .2s, color .2s;
    color:var(--white);
  }
  .m-btn-live {
    background:var(--accent);
    color:#050505;
    box-shadow:0 0 26px rgba(173,255,47,0.28);
  }
  .m-btn-live:hover { transform:translateY(-2px); box-shadow:0 0 34px rgba(173,255,47,0.45); }
  .m-btn-source {
    background:rgba(255,255,255,0.04);
    border-color:rgba(255,255,255,0.22);
    color:var(--white);
  }
  .m-btn-source:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-2px); }

  /* ── Body ────────────────────────────────────────────────── */
  .m-content { padding:36px 40px 44px; display:flex; flex-direction:column; gap:38px; }

  .m-sec { animation:slideUp .5s cubic-bezier(.16,1,.3,1) both; }

  .m-section-title {
    font-family:'Poppins',sans-serif;
    font-size:22px; font-weight:800; color:var(--white);
    margin:0 0 14px;
    position:relative;
  }
  .m-section-title-bar {
    display:block; width:120px; height:3px; margin-top:12px; border-radius:3px;
    background:var(--accent);
    transform-origin:left;
    animation:underlineIn .6s cubic-bezier(.16,1,.3,1) .1s both;
  }

  /* Overview */
  .m-desc {
    max-width:100%; margin:0;
    font-size:15.5px; line-height:1.8; font-weight:400;
    color:var(--body);
    white-space:pre-line;
  }

  /* Key Features */
  .m-feat-grid {
    display:grid; grid-template-columns:repeat(2, 1fr); gap:12px 28px;
    list-style:none; margin:0; padding:0;
  }
  .m-feat-item {
    display:flex; align-items:flex-start; gap:10px;
    font-size:14.5px; line-height:1.6; color:var(--body);
  }
  .m-feat-dot {
    width:6px; height:6px; border-radius:2px; background:var(--accent);
    margin-top:7px; flex-shrink:0;
    box-shadow:0 0 8px rgba(173,255,47,0.5);
  }
  @media(max-width:640px){ .m-feat-grid{ grid-template-columns:1fr; } }

  /* Screenshots */
  .m-shots-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:0; }
  .m-nav { display:flex; gap:8px; }
  .m-nav-btn {
    display:flex; align-items:center; justify-content:center;
    width:38px; height:38px; border-radius:50%;
    border:1px solid var(--border);
    backdrop-filter:blur(10px);
    color:var(--white); cursor:pointer;
    transition:all .25s cubic-bezier(.16,1,.3,1);
  }
  .m-nav-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform:translateY(-2px);
  }

  .m-track {
    display:flex; gap:18px; margin-top:22px;
    overflow-x:auto; scroll-snap-type:x mandatory;
    scrollbar-width:none; padding:6px 6px 14px;
  }
  .m-track::-webkit-scrollbar{display:none;}

  .m-thumb {
    flex-shrink:0; position:relative;
    width:320px; aspect-ratio:16/9; overflow:hidden;
    border-radius:18px; scroll-snap-align:start; cursor:pointer;
    border:1px solid var(--border-soft);
    box-shadow:0 12px 30px rgba(0,0,0,0.4);
    transition:transform .38s cubic-bezier(.16,1,.3,1), box-shadow .38s cubic-bezier(.16,1,.3,1), border-color .3s;
  }
  .m-thumb img {
    width:100%; height:100%; object-fit:cover; display:block;
    filter:brightness(0.88) saturate(0.92);
    transition:transform .5s cubic-bezier(.16,1,.3,1), filter .35s;
  }
  .m-thumb-shade {
    position:absolute; inset:0; z-index:2;
    background:linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 42%);
  }
  .m-thumb-num {
    position:absolute; bottom:12px; left:14px; z-index:3;
    font-size:11px; font-weight:700; letter-spacing:0.08em;
    color:rgba(255,255,255,0.75);
  }
  .m-thumb:hover {
    transform:translateY(-8px) scale(1.04);
    border-color:rgba(173,255,47,0.4);
  }
  .m-thumb:hover img { transform:scale(1.08); filter:brightness(1) saturate(1); }

  .m-expand {
    position:absolute; top:10px; right:10px; z-index:4;
    display:flex; align-items:center; justify-content:center;
    width:32px; height:32px; border-radius:50%;
    background:rgba(0,0,0,0.55);
    border:1px solid rgba(255,255,255,0.18);
    color:var(--white);
    opacity:0; transition:opacity .25s;
  }
  .m-thumb:hover .m-expand { opacity:1; }

  .m-dots { display:flex; gap:6px; align-items:center; margin-top:6px; }
  .m-dot {
    height:4px; border-radius:2px; border:none; padding:0; cursor:pointer;
    background:rgba(255,255,255,0.18); width:20px;
    transition:all .3s cubic-bezier(.16,1,.3,1);
  }
  .m-dot.on { width:36px; background:var(--accent); }

  /* Tech stack */
  .m-chips { display:flex; flex-wrap:wrap; gap:10px; }
  .m-chip {
    padding:9px 20px; border-radius:30px;
    font-size:13px; font-weight:600;
    color:var(--body);
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.12);
    backdrop-filter:blur(14px);
    transition:all .25s cubic-bezier(.16,1,.3,1);
  }
  .m-chip:hover {
    border-color:var(--accent);
    color:var(--white);
    box-shadow:0 0 18px rgba(173,255,47,0.2);
    transform:translateY(-2px);
  }

  /* Lightbox */
  .m-lb {
    position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.96);
    display:flex; align-items:center; justify-content:center;
    cursor:zoom-out; padding:24px;
    animation:overlayIn .2s ease forwards;
  }
  .m-lb img { max-width:90vw; max-height:90vh; object-fit:contain; border-radius:10px; }
  .m-lb-close {
    position:absolute; top:24px; right:24px;
    display:flex; align-items:center; justify-content:center;
    width:40px; height:40px; border-radius:50%;
    border:1px solid var(--border);
    color:var(--white); cursor:pointer; transition:all .25s;
  }
  .m-lb-close:hover { background:var(--accent); border-color:var(--accent); color:#050505; transform:rotate(90deg); }

  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;}}

  @media(max-width:900px){
    .m-hero{ height:520px; }
    .m-content{ padding:28px 20px 36px; gap:30px; }
    .m-thumb{ width:260px; }
  }

  @media(max-width:640px){
    .m-card{ border-radius:16px; }
    .m-hero{ height:450px; }
    .m-hero-content{ flex-direction:column; align-items:flex-start; padding:0 22px 26px; gap:16px; }
    .m-poster{ width:104px; }
    .m-title{ font-size:32px; }
    .m-eyebrow{ font-size:11px; }
    .m-hero-actions{ flex-direction:column; width:100%; }
    .m-btn{ width:100%; justify-content:center; }
    .m-content{ padding:24px 18px 32px; gap:30px; }
    .m-section-title{ font-size:20px; }
    .m-thumb{ width:220px; }
    .m-close{ top:14px; right:14px; width:34px; height:34px; }
  }
`;

/* ─── Lightbox ──────────────────────────────────────────────── */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="m-lb" onClick={onClose}>
      <button className="m-lb-close" onClick={onClose} aria-label="Close"><FiX size={16} /></button>
      <img src={src} alt="Screenshot fullsize" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

/* ─── Modal ─────────────────────────────────────────────────── */
export default function Modal({
  show, onClose,
  linkurl, videourl, posterurl,
  desc, title = "Project",
  tags = [], screenshots = [],
  sourceCodeUrl,
}) {
  const [slide, setSlide] = useState(0);
  const [lb, setLb] = useState(null);
  const trackRef = useRef(null);
  const total = screenshots.length;

  useEffect(() => { document.body.style.overflow = show ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [show]);
  useEffect(() => { const h = (e) => e.key === "Escape" && !lb && onClose(); if (show) window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [show, onClose, lb]);
  useEffect(() => { if (show) setSlide(0); }, [show]);

  const goTo = useCallback((i) => {
    const el = trackRef.current?.children[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setSlide(i);
  }, []);

  const prev = () => goTo(slide > 0 ? slide - 1 : total - 1);
  const next = () => goTo(slide < total - 1 ? slide + 1 : 0);

  useEffect(() => {
    if (!show || total < 2) return;
    const h = (e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [show, slide, total]);

  if (!show) return null;

  const floatingImage = posterurl || screenshots[0] || null;
  const heroBgImage = !videourl ? (posterurl || screenshots[0] || null) : null;

  // Parse the existing `desc` field into overview / features / tech stack —
  // projectsData.js itself never needs to change.
  const parsed = parseProjectDesc(desc);
  const overviewText = parsed.overview || desc || "";
  const features = parsed.features;
  const techChips = tags.length ? tags : parsed.techStack;

  const metaParts = ["Case Study"];
  if (techChips.length) metaParts.push(`${techChips.length} ${techChips.length === 1 ? "Technology" : "Technologies"}`);
  if (total) metaParts.push(`${total} ${total === 1 ? "Screenshot" : "Screenshots"}`);

  const pills = [];
  if (videourl) pills.push({ key: "hd", label: "Full HD" });
  if (linkurl) pills.push({ key: "live", label: "Live" });
  if (sourceCodeUrl) pills.push({ key: "source", label: "Open Source" });

  return (
    <div className="m">
      <style>{STYLES}</style>

      <div className="m-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${title} details`}>
        <div className="m-card" onClick={(e) => e.stopPropagation()}>

          {/* Hero */}
          <div className="m-hero">
            {videourl ? (
              <video src={videourl} poster={posterurl} controls preload="metadata" />
            ) : heroBgImage ? (
              <img className="m-hero-img" src={heroBgImage} alt="" aria-hidden="true" />
            ) : null}

            <div className="m-hero-fade-side" />
            <div className="m-hero-fade-top" />
            <div className="m-hero-fade-bottom" />

            <button className="m-close" onClick={onClose} aria-label="Close">
              <FiX size={20} />
            </button>

            <div className="m-hero-content">
              <div className="m-hero-text">
                <p className="m-eyebrow">{metaParts.join("  ·  ")}</p>

                {pills.length > 0 && (
                  <div className="m-pills">
                    {pills.map((p) => (
                      <span key={p.key} className="m-pill">
                        <span className="m-pill-dot" />
                        {p.label}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="m-title">{title}</h1>
                <div className="m-hero-actions">
                  {linkurl && (
                    <a href={linkurl} target="_blank" rel="noopener noreferrer" className="m-btn m-btn-live">
                      <FiPlay size={15} />Live Preview
                    </a>
                  )}
                  {sourceCodeUrl && (
                    <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="m-btn m-btn-source">
                      <FiGithub size={15} />Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="m-content">

            {/* Overview */}
            {overviewText && (
              <div className="m-sec">
                <h2 className="m-section-title">Overview<span className="m-section-title-bar" /></h2>
                <p className="m-desc">{overviewText}</p>
              </div>
            )}

            {/* Key Features */}
            {features.length > 0 && (
              <div className="m-sec">
                <h2 className="m-section-title">Key Features<span className="m-section-title-bar" /></h2>
                <ul className="m-feat-grid">
                  {features.map((f, i) => (
                    <li key={i} className="m-feat-item">
                      <span className="m-feat-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Screenshots */}
            {total > 0 && (
              <div className="m-sec">
                <div className="m-shots-head">
                  <h2 className="m-section-title" style={{ marginBottom: 0 }}>
                    Screenshots<span className="m-section-title-bar" />
                  </h2>
                  {total > 1 && (
                    <div className="m-nav">
                      <button className="m-nav-btn" onClick={prev} aria-label="Prev"><FiChevronLeft size={16} /></button>
                      <button className="m-nav-btn" onClick={next} aria-label="Next"><FiChevronRight size={16} /></button>
                    </div>
                  )}
                </div>

                <div className="m-track" ref={trackRef}>
                  {screenshots.map((src, i) => (
                    <div key={i} className="m-thumb"
                      onClick={() => setLb(src)} role="button" tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setLb(src)}
                      aria-label={`Screenshot ${i + 1}`}>
                      <img src={src} alt={`Screenshot ${i + 1}`} />
                      <div className="m-thumb-shade" />
                      <span className="m-thumb-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="m-expand"><FiMaximize2 size={13} /></span>
                    </div>
                  ))}
                </div>

                {total > 1 && (
                  <div className="m-dots">
                    {screenshots.map((_, i) => (
                      <button key={i} className={`m-dot${i === slide ? " on" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tech stack */}
            {techChips.length > 0 && (
              <div className="m-sec">
                <h2 className="m-section-title">Tech Stack<span className="m-section-title-bar" /></h2>
                <div className="m-chips">{techChips.map((t, i) => <span key={i} className="m-chip">{t}</span>)}</div>
              </div>
            )}

          </div>
        </div>
      </div>

      {lb && <Lightbox src={lb} onClose={() => setLb(null)} />}
    </div>
  );
}