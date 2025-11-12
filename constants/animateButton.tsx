import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Button({
  text,
  ariaLabel,
}: {
  text: string;
  ariaLabel?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const fillAnim = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const fill = fillRef.current;
    if (!button || !fill) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Disable animation for reduced motion users
      fill.style.opacity = "0";
      fill.style.scale = "0";
      return;
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      fillAnim.current?.kill();
      gsap.set(fill, {
        left: x,
        top: y,
        xPercent: -50,
        yPercent: -50,
      });

      fillAnim.current = gsap.to(fill, {
        scale: 3,
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = () => {
      fillAnim.current?.kill();
      fillAnim.current = gsap.to(fill, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      fillAnim.current?.kill();
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <button
        ref={buttonRef}
        type="button"
        aria-label={ariaLabel || text}
        className="relative overflow-hidden mt-[30px] px-8 py-2 max-sm:px-4 max-sm:py-3 font-bold text-chart-3 dark:text-white hover:text-white border-2 border-chart-3 bg-transparent rounded-3xl transition-colors focus:outline-1 focus:outline-offset-2 focus:outline-chart-3"
      >
        <span
          ref={fillRef}
          className="absolute w-[100px] h-[100px] bg-chart-3 rounded-full pointer-events-none opacity-0 scale-0"
          style={{ transformOrigin: "center center" }}
        />
        <span className="relative z-10">{text}</span>
      </button>
    </div>
  );
}
