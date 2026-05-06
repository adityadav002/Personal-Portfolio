import React, { useRef } from "react";
import { gsap } from "gsap";

const GuitarString = () => {
  const pathRef = useRef(null);

  // Fixed endpoints
  const start = { x: -20, y: 100 };
  const end = { x: 500, y: 100 };

  // Initial control point (straight line)
  const control = { x: 250, y: 100 };

  const updatePath = (cx, cy) => {
    const d = `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
    pathRef.current.setAttribute("d", d);
  };

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    // Pull strength (limit distortion)
    const strength = 1;

    const cx = 250 + (mouseX - 250) * strength;
    const cy = 100 + (mouseY - 100) * strength;

    updatePath(cx, cy);
  };

  const handleMouseLeave = () => {
    // Animate back using elastic effect
    gsap.to(control, {
      x: 250,
      y: 100,
      duration: 1.5,
      ease: "elastic.out(3, 0.5)",
      onUpdate: () => {
        updatePath(control.x, control.y);
      },
    });
  };

  const handleMouseEnter = () => {
    // Sync control object with current path
    control.x = 250;
    control.y = 100;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <svg
        width="500"
        height="200"
        className="cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <path
          ref={pathRef}
          d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
          stroke="white"
          strokeWidth="2"
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default GuitarString;