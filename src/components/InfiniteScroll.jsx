import {
  FaReact,
  FaPython,
  FaDocker,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaNode,
} from "react-icons/fa";

function InfiniteScroll() {
  return (
    <>
      <div className="carousel">
        <div className="logo_group">
          <div className="card"><FaReact /></div>
          <div className="card"><FaNode /></div>
          <div className="card"><FaHtml5 /></div>
          <div className="card"><FaCss3Alt /></div>
          <div className="card"><FaJs /></div>
          <div className="card"><FaDocker /></div>
          <div className="card"><FaPython /></div>
        </div>

        <div aria-hidden className="logo_group">
          <div className="card"><FaReact /></div>
          <div className="card"><FaNode /></div>
          <div className="card"><FaHtml5 /></div>
          <div className="card"><FaCss3Alt /></div>
          <div className="card"><FaJs /></div>
          <div className="card"><FaDocker /></div>
          <div className="card"><FaPython /></div>
        </div>
      </div>

      {/* ✅ Internal CSS */}
      <style>{`
        .carousel {
          margin: 30px auto;
          width: 100%;
          display: flex;
          overflow-x: hidden;
        }

        .carousel::-webkit-scrollbar {
          display: none;
        }

        .logo_group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1em;
          animation: spin 5s linear infinite;
          padding-right: 1em;
        }

        .card {
          color: #05bf05;
          flex: 0 0 4em;
          height: 1em;
          padding: 1em;
          font-size: 3.5em;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes spin {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }

        @media (max-width: 480px) {
          .card {
            font-size: 2.5em;
          }
        }
      `}</style>
    </>
  );
}

export default InfiniteScroll;
