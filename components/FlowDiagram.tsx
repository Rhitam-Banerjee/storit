/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";

const ConnectionFlowAnimation = () => {
  const [step, setStep] = useState(0);
  const [animatingPath, setAnimatingPath] = useState<string | null>(null);
  const [completedPaths, setCompletedPaths] = useState(new Set());

  useEffect(() => {
    // Determine which path should animate based on step
    const pathsPerStep = [
      ["free-connect"],
      ["upload-access", "upload-edit"],
      [],
    ];

    const currentPaths = pathsPerStep[step] || [];

    if (currentPaths.length > 0) {
      // Find the first path in current step that hasn't been animated
      const nextPath = currentPaths.find((p) => !completedPaths.has(p));

      if (nextPath) {
        setAnimatingPath(nextPath);

        // After animation completes (1.5s), mark as complete
        const timer = setTimeout(() => {
          setCompletedPaths((prev) => new Set([...prev, nextPath]));
          setAnimatingPath(null);
        }, 1500);

        return () => clearTimeout(timer);
      } else {
        // All paths in this step are complete, move to next step
        const timer = setTimeout(() => {
          setStep((prev) => (prev + 1) % 3);
          if (step === 2) {
            // Reset when looping back
            setCompletedPaths(new Set());
          }
        }, 1000);

        return () => clearTimeout(timer);
      }
    } else {
      // No paths in this step, move to next
      const timer = setTimeout(() => {
        setStep((prev) => (prev + 1) % 3);
        if (step === 2) {
          setCompletedPaths(new Set());
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [step, completedPaths]);

  // Grid-based card positions (row, col)
  const cards = {
    free: {
      row: 1,
      col: 1,
      label: "Free",
      gradient: "from-emerald-400 to-green-500",
    },
    connect: {
      row: 3,
      col: 3,
      label: "Connect",
      gradient: "from-cyan-400 to-blue-500",
    },
    upload: {
      row: 1,
      col: 5,
      label: "Upload",
      gradient: "from-purple-400 to-pink-500",
    },
    access: {
      row: 4,
      col: 5,
      label: "Access",
      gradient: "from-orange-400 to-red-500",
    },
    edit: {
      row: 5,
      col: 6,
      label: "Edit",
      gradient: "from-indigo-400 to-purple-600",
    },
  };

  // Connection definitions with grid paths
  const connections = [
    {
      id: "free-connect",
      from: "free",
      to: "connect",
      step: 0,
      gradient: ["#10b981", "#06b6d4"],
      // Path: free(1,1) -> down(2,1) -> right(2,2) -> right(2,3) -> down(3,3) to connect
      gridPath: [
        { row: 1, col: 1 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 3, col: 3 },
      ],
    },
    {
      id: "upload-access",
      from: "upload",
      to: "access",
      step: 1,
      gradient: ["#c084fc", "#fb923c"],
      // Path: upload(1,5) -> down to access(4,5)
      gridPath: [
        { row: 1, col: 5 },
        { row: 2, col: 5 },
        { row: 3, col: 5 },
        { row: 4, col: 5 },
      ],
    },
    {
      id: "upload-edit",
      from: "upload",
      to: "edit",
      step: 1,
      gradient: ["#ec4899", "#8b5cf6"],
      // Path: upload(1,5) -> down(2,5) -> down(3,5) -> down(4,5) -> down(5,5) -> right(5,6) to edit
      gridPath: [
        { row: 1, col: 5 },
        { row: 2, col: 5 },
        { row: 3, col: 5 },
        { row: 4, col: 5 },
        { row: 5, col: 5 },
        { row: 5, col: 6 },
      ],
    },
  ];

  // Convert grid position to percentage
  const gridToPercent = (row: number, col: number) => {
    const cols = 7;
    const rows = 6;
    return {
      x: (col / cols) * 100,
      y: (row / rows) * 100,
    };
  };

  // Generate SVG path following grid
  const generateGridPath = (gridPath: any[]) => {
    if (gridPath.length < 2) return "";

    const points = gridPath.map((point: { row: any; col: any }) =>
      gridToPercent(point.row, point.col)
    );

    let path = `M${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      path += ` L${points[i].x},${points[i].y}`;
    }

    return path;
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.1),transparent_50%)]"></div>

      {/* Grid overlay (optional, for debugging) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Vertical lines */}
        {[...Array(8)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(i / 7) * 100}
            y1="0"
            x2={(i / 7) * 100}
            y2="100"
            stroke="white"
            strokeWidth="0.1"
          />
        ))}
        {/* Horizontal lines */}
        {[...Array(7)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={(i / 6) * 100}
            x2="100"
            y2={(i / 6) * 100}
            stroke="white"
            strokeWidth="0.1"
          />
        ))}
      </svg>

      {/* SVG Layer for connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ zIndex: 5 }}
      >
        <defs>
          {connections.map((conn, idx) => (
            <linearGradient
              key={`gradient-${idx}`}
              id={`gradient-${conn.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={conn.gradient[0]} />
              <stop offset="100%" stopColor={conn.gradient[1]} />
            </linearGradient>
          ))}

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map((conn) => {
          const isAnimating = animatingPath === conn.id;
          const isCompleted = completedPaths.has(conn.id);
          const shouldShow = isAnimating || isCompleted;

          if (!shouldShow) return null;

          const pathData = generateGridPath(conn.gridPath);

          return (
            <g key={conn.id}>
              {/* Glow effect */}
              <path
                d={pathData}
                stroke={`url(#gradient-${conn.id})`}
                strokeWidth="0.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={isCompleted ? "0.6" : "0.4"}
                filter="url(#glow)"
                className="transition-all duration-1500"
                style={{
                  strokeDasharray: "200",
                  strokeDashoffset: isAnimating ? "200" : "0",
                  transition:
                    "stroke-dashoffset 1.5s ease-in-out, opacity 0.5s ease-in-out",
                }}
              />
              {/* Main path */}
              <path
                d={pathData}
                stroke={`url(#gradient-${conn.id})`}
                strokeWidth="0.3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={isCompleted ? "0.8" : "1"}
                className="transition-all duration-1500"
                style={{
                  strokeDasharray: "200",
                  strokeDashoffset: isAnimating ? "200" : "0",
                  transition:
                    "stroke-dashoffset 1.5s ease-in-out, opacity 0.5s ease-in-out",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Card elements positioned on grid */}
      {Object.entries(cards).map(([id, card]) => {
        const pos = gridToPercent(card.row, card.col);
        return (
          <div
            key={id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: 10,
            }}
          >
            <div
              className={`
                w-32 h-32 
                bg-gradient-to-br ${card.gradient}
                rounded-3xl 
                shadow-2xl 
                border border-white/20
                flex flex-col items-center justify-center
                transform transition-all duration-300
                hover:scale-110 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]
                cursor-pointer
                group
              `}
            >
              <div className="text-white text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {id === "free" && "🎁"}
                  {id === "connect" && "🔗"}
                  {id === "upload" && "⬆️"}
                  {id === "access" && "🔓"}
                  {id === "edit" && "✏️"}
                </div>
                <div className="text-base font-bold tracking-wide">
                  {card.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Progress indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              step === i
                ? "bg-cyan-400 w-12 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                : "bg-white/30 w-2"
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          {step === 0 && "Free to Connect"}
          {step === 1 && "Upload & Manage"}
          {step === 2 && "Complete Flow"}
        </h1>
        <p className="text-white/70 text-sm">
          {animatingPath && `Animating: ${animatingPath}`}
          {!animatingPath &&
            completedPaths.size > 0 &&
            `Completed: ${completedPaths.size} paths`}
          {!animatingPath &&
            completedPaths.size === 0 &&
            "Watch the connections animate"}
        </p>
      </div>
    </div>
  );
};

export default ConnectionFlowAnimation;
