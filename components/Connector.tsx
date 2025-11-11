"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ConnectorProps {
  path: string;
  gradientId: string;
  delay?: number;
}

const Connector: React.FC<ConnectorProps> = ({
  path,
  gradientId,
  delay = 0,
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: 500, strokeDashoffset: 500 },
      {
        strokeDashoffset: 0,
        duration: 1.2,
        delay,
        ease: "power2.out",
      }
    );
  }, [delay]);

  return (
    <svg className="absolute w-full h-full pointer-events-none">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Connector;
