import { useEffect, useState, useRef, useCallback } from "react";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiGithub,
  FiMaximize2,
  FiPlay,
} from "react-icons/fi";

/* ─── CSS ──────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Manrope:wght@300;400;500;600&display=swap');

  :root {
    --lime:        #ccff00;
    --lime-dim:    rgba(204,255,0,0.10);
    --lime-border: rgba(204,255,0,0.32);
    --black:       #000000;
    --surface:     #0a0a0a;
    --surface2:    #111111;
    --border:      rgba(255,255,255,0.07);
    --border2:     rgba(255,255,255,0.12);
    --muted:       rgba(255,255,255,0.32);
    --body:        rgba(255,255,255,0.62);
    --white:       #ffffff;
  }

  @keyframes overlayIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scanLine  { from{top:-100%} to{top:200%} }
  @keyframes revealBar { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @keyframes blinkDot  { 0%,100%{opacity:1} 50%{opacity:0.25} }

  .m * { box-sizing:border-box; margin:0; padding:0; }
  .m   { font-family:'Manrope',sans-serif; }

  /* Overlay */
  .m-overlay {
    position:fixed; inset:0; z-index:1000;
    background:rgba(0,0,0,0.9);
    backdrop-filter:blur(22px) saturate(130%);
    display:flex; align-items:center; justify-content:center;
    padding:16px;
    animation:overlayIn .2s ease forwards;
  }

  /* Card */
  .m-card {
    position:relative;
    width:100%; max-width:820px; max-height:93vh;
    background:var(--black);
    border:1px solid var(--border2);
    overflow-y:auto; overflow-x:hidden;
    scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.07) transparent;
    animation:slideUp .4s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .m-card::-webkit-scrollbar{width:3px;}
  .m-card::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);}

  /* Lime corner brackets */
  .m-card::before,.m-card::after,
  .m-corners::before,.m-corners::after {
    content:''; position:absolute; pointer-events:none; z-index:10;
    width:22px; height:22px; border-color:var(--lime); border-style:solid;
  }
  .m-card::before  { top:0;    left:0;  border-width:2px 0 0 2px; }
  .m-card::after   { top:0;    right:0; border-width:2px 2px 0 0; }
  .m-corners::before { bottom:0; left:0;  border-width:0 0 2px 2px; }
  .m-corners::after  { bottom:0; right:0; border-width:0 2px 2px 0; }

  /* Video hero */
  .m-hero {
    position:relative; width:100%; aspect-ratio:16/9;
    background:#000; overflow:hidden;
  }
  .m-hero video { width:100%; height:100%; object-fit:cover; display:block; }
  .m-hero-fade {
    position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 78%, rgba(0,0,0,1) 100%);
    z-index:1;
  }
  /* Scan shimmer */
  .m-hero-scan {
    position:absolute; left:0; right:0; height:80px; z-index:2; pointer-events:none;
    background:linear-gradient(to bottom, transparent, rgba(204,255,0,0.035), transparent);
    animation:scanLine 4s linear infinite;
  }

  /* Top bar inside hero */
  .m-topbar {
    position:absolute; top:0; left:0; right:0; z-index:5;
    display:flex; align-items:center; justify-content:space-between;
    padding:14px 18px;
  }
  .m-badge {
    display:inline-flex; align-items:center; gap:7px;
    padding:5px 12px;
    background:rgba(0,0,0,0.72);
    border:1px solid var(--lime-border);
    font-family:'DM Mono',monospace;
    font-size:9.5px; font-weight:500;
    letter-spacing:0.14em; text-transform:uppercase;
    color:var(--lime);
  }
  .m-badge-dot {
    width:5px; height:5px; border-radius:50%;
    background:var(--lime);
    animation:blinkDot 2.2s ease infinite;
    flex-shrink:0;
  }

  /* Close button */
  .m-close {
    display:flex; align-items:center; justify-content:center;
    width:34px; height:34px;
    background:rgba(0,0,0,0.72);
    border:1px solid var(--border2);
    color:var(--muted); cursor:pointer;
    transition:all .18s ease;
  }
  .m-close:hover { color:var(--lime); background:rgba(0,0,0,0.72); border-color:var(--lime); transform:scale(1.06); }

  /* No-video top bar */
  .m-topbar-flat {
    display:flex; align-items:center; justify-content:space-between;
    padding:15px 20px;
    border-bottom:1px solid var(--border);
  }

  /* Body */
  .m-body { padding:10px; display:flex; flex-direction:column; gap:5px; }

  /* Animated sections */
  .m-sec { animation:slideUp .45s cubic-bezier(0.16,1,0.3,1) both; }
  .m-sec:nth-child(1){animation-delay:.07s}
  .m-sec:nth-child(2){animation-delay:.13s}
  .m-sec:nth-child(3){animation-delay:.19s}
  .m-sec:nth-child(4){animation-delay:.25s}

  /* Section label */
  .m-label {
    display:inline-flex; align-items:center; gap:9px;
    font-family:'DM Mono',monospace;
    font-size:9px; font-weight:500;
    letter-spacing:0.2em; text-transform:uppercase;
    color:var(--muted); margin-bottom:10px;
  }
  .m-label::before {
    content:''; display:block;
    width:20px; height:1.5px; background:var(--lime); flex-shrink:0;
  }

  /* Horizontal rule with lime gradient */
  .m-hr {
    height:1px;
    background:linear-gradient(90deg, var(--lime) 0px, rgba(204,255,0,0.18) 140px, transparent 360px);
    transform-origin:left;
    animation:revealBar .65s cubic-bezier(0.16,1,0.3,1) .05s both;
  }

  /* Description */
  .m-desc-wrap {
    border-left:2px solid var(--lime);
    padding:10px 10px;
  }
  .m-desc {
    font-size:13.5px; line-height:1.88;
    color:var(--body); font-weight:400;
  }

  /* Screenshots */
  .m-shots-head {
    display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;
  }
  .m-nav { display:flex; gap:6px; }
  .m-nav-btn {
    display:flex; align-items:center; justify-content:center;
    width:30px; height:30px;
    background:transparent;
    border:1px solid var(--border2);
    color:var(--muted); cursor:pointer;
    transition:all .18s;
  }
  .m-nav-btn:hover {
    border-color:var(--lime-border);
    color:var(--lime);
    background:var(--lime-dim);
  }

  .m-track {
    display:flex; gap:10px;
    overflow-x:auto; scroll-snap-type:x mandatory;
    scrollbar-width:none; padding-bottom:12px;
  }
  .m-track::-webkit-scrollbar{display:none;}

  /* Screenshot thumb */
  .m-thumb {
    flex-shrink:0; position:relative;
    width:200px; height:126px; overflow:hidden;
    scroll-snap-align:start; cursor:pointer;
    border:1px solid var(--border);
    transition:border-color .22s, transform .28s cubic-bezier(0.16,1,0.3,1), box-shadow .28s;
  }
  /* Number tag */
  .m-thumb::before {
    content:attr(data-n);
    position:absolute; bottom:8px; left:10px; z-index:3;
    font-family:'DM Mono',monospace;
    font-size:10px; letter-spacing:0.06em;
    color:rgba(255,255,255,0.38);
    transition:color .2s;
  }
  .m-thumb img {
    width:100%; height:100%; object-fit:cover; display:block;
    filter:brightness(0.85) saturate(0.7);
    transition:transform .38s cubic-bezier(0.16,1,0.3,1), filter .3s;
  }
  .m-thumb-shade {
    position:absolute; inset:0;
    background:linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%);
    z-index:2;
  }
  /* Hover scan */
  .m-thumb-scan {
    position:absolute; left:0; right:0; height:100%; top:-100%;
    z-index:4; pointer-events:none;
    background:linear-gradient(to bottom, transparent 35%, rgba(204,255,0,0.07) 50%, transparent 65%);
    transition:none;
  }
  .m-thumb:hover .m-thumb-scan { animation:scanLine .55s linear forwards; }
  .m-thumb:hover {
    border-color:var(--lime-border);
    transform:translateY(-4px) scale(1.01);
    box-shadow:0 14px 38px rgba(0,0,0,0.65), 0 0 0 1px var(--lime-border);
  }
  .m-thumb:hover img  { transform:scale(1.08); filter:brightness(1) saturate(1); }
  .m-thumb:hover::before { color:var(--lime); }

  .m-expand {
    position:absolute; top:8px; right:8px; z-index:5;
    background:rgba(0,0,0,0.7); padding:5px;
    border:1px solid rgba(255,255,255,0.12);
    color:rgba(255,255,255,0.55);
    opacity:0; transition:opacity .18s;
  }
  .m-thumb:hover .m-expand { opacity:1; }

  /* Dots */
  .m-dots { display:flex; gap:4px; align-items:center; }
  .m-dot {
    height:2px; border-radius:1px; border:none; padding:0; cursor:pointer;
    background:rgba(255,255,255,0.15); width:18px;
    transition:all .28s cubic-bezier(0.16,1,0.3,1);
  }
  .m-dot.on { width:34px; background:var(--lime); }

  /* Tags */
  .m-tags { display:flex; flex-wrap:wrap; gap:7px; }
  .m-tag {
    padding:4px 12px;
    border:1px solid var(--border2);
    font-family:'DM Mono',monospace;
    font-size:9.5px; letter-spacing:0.1em; text-transform:uppercase;
    color:var(--muted);
    transition:all .18s;
  }
  .m-tag:hover { border-color:var(--lime-border); color:var(--lime); background:var(--lime-dim); }

  /* Action buttons */
  .m-actions { display:flex; gap:10px; flex-wrap:wrap; }
  .m-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 28px;
    font-family:'DM Mono',monospace;
    font-size:10.5px; font-weight:500;
    letter-spacing:0.12em; text-transform:uppercase;
    text-decoration:none; cursor:pointer; border:none;
    transition:all .22s cubic-bezier(0.16,1,0.3,1);
    position:relative; overflow:hidden;
  }
  .m-btn-primary {
    background:var(--lime); color:#000;
    border:2px solid var(--lime);
  }
  .m-btn-primary:hover {
    background:#000; color:var(--lime);
    transform:translateY(-2px);
    box-shadow:0 8px 28px rgba(204,255,0,0.22);
  }
  .m-btn-ghost {
    background:transparent; color:var(--muted);
    border:1px solid var(--border2);
  }
  .m-btn-ghost:hover {
    border-color:rgba(255,255,255,0.35);
    color:var(--white);
    transform:translateY(-2px);
    box-shadow:0 8px 28px rgba(255,255,255,0.05);
  }

  /* Lightbox */
  .m-lb {
    position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.97);
    display:flex; align-items:center; justify-content:center;
    cursor:zoom-out;
    animation:overlayIn .15s ease forwards;
  }
  .m-lb img { max-width:90vw; max-height:90vh; object-fit:contain; }
  .m-lb-close {
    position:absolute; top:20px; right:20px;
    display:flex; align-items:center; justify-content:center;
    width:36px; height:36px;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.14);
    color:rgba(255,255,255,0.45); cursor:pointer; transition:all .18s;
  }
  .m-lb-close:hover { background:rgba(255,255,255,0.05); color:var(--lime); border-color:var(--lime); }

  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;}}
  @media(max-width:580px){
    .m-body{padding:20px 16px;}
    .m-thumb{width:155px;height:98px;}
    .m-actions{flex-direction:column;}
    .m-btn{width:100%;justify-content:center;}
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
      <button className="m-lb-close" onClick={onClose}><FiX size={14} /></button>
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

  return (
    <div className="m">
      <style>{STYLES}</style>

      <div className="m-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${title} details`}>
        <div className="m-card m-corners" onClick={(e) => e.stopPropagation()}>

          {/* Hero Video */}
          {videourl ? (
            <div className="m-hero">
              <div className="m-topbar">
                <span className="m-badge"><span className="m-badge-dot" />{title}</span>
                <button className="m-close" onClick={onClose}><FiX size={14} /></button>
              </div>
              <video src={videourl} poster={posterurl} controls preload="metadata" />
              <div className="m-hero-fade" />
              <div className="m-hero-scan" />
            </div>
          ) : (
            <div className="m-topbar-flat">
              <span className="m-badge"><span className="m-badge-dot" />{title}</span>
              <button className="m-close" onClick={onClose} aria-label="Close"><FiX size={14} /></button>
            </div>
          )}

          {/* Body */}
          <div className="m-body">

            {/* 1 — Description */}
            {desc && (
              <div className="m-sec">
                <p className="m-label">Overview</p>
                <div className="m-desc-wrap"><p className="text-white">{desc}</p></div>
              </div>
            )}

            {/* 2 — Screenshots */}
            {total > 0 && (
              <div className="m-sec">
                <div style={{ marginBottom: 20 }} />
                <div className="m-shots-head">
                  <p className="m-label" style={{ marginBottom: 0 }}>Screenshots</p>
                  {total > 1 && (
                    <div className="m-nav">
                      <button className="m-nav-btn" onClick={prev} aria-label="Prev"><FiChevronLeft size={13} /></button>
                      <button className="m-nav-btn" onClick={next} aria-label="Next"><FiChevronRight size={13} /></button>
                    </div>
                  )}
                </div>

                <div className="m-track" ref={trackRef}>
                  {screenshots.map((src, i) => (
                    <div key={i} className="m-thumb" data-n={String(i + 1).padStart(2, "0")}
                      onClick={() => setLb(src)} role="button" tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setLb(src)}
                      aria-label={`Screenshot ${i + 1}`}>
                      <img src={src} alt={`Screenshot ${i + 1}`} />
                      <div className="m-thumb-shade" />
                      <div className="m-thumb-scan" />
                      <span className="m-expand"><FiMaximize2 size={11} /></span>
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

            {/* 3 — Tags */}
            {tags.length > 0 && (
              <div className="m-sec">
                <div className="m-hr" style={{ marginBottom: 18 }} />
                <p className="m-label">Stack</p>
                <div className="m-tags">{tags.map((t, i) => <span key={i} className="m-tag">{t}</span>)}</div>
              </div>
            )}

            {/* 4 — Actions */}
            {(linkurl || sourceCodeUrl) && (
              <div className="m-sec">
                <div style={{ marginBottom: 20 }} />
                <div className="m-actions">
                  {linkurl && (
                    <a href={linkurl} target="_blank" rel="noopener noreferrer" className="m-btn m-btn-primary">
                      <FiPlay size={11} />Live Preview
                    </a>
                  )}
                  {sourceCodeUrl && (
                    <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="m-btn m-btn-ghost">
                      <FiGithub size={13} />Source Code
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {lb && <Lightbox src={lb} onClose={() => setLb(null)} />}
    </div>
  );
}