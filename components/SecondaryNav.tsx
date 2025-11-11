"use client";
import { videoLinks } from "@/constants/navLinks";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(Flip);
export default function SecondaryNav() {
  const linkRef = useRef<Array<HTMLDivElement | null>>([]);
  const hoverRef = useRef<HTMLSpanElement>(null);
  const handleClick = (index: number) => {
    const el = linkRef.current[index];
    const hoverEl = hoverRef.current;

    if (el && hoverEl) {
      const bounds = el.getBoundingClientRect();
      const parentBounds = el.parentElement?.getBoundingClientRect();

      // Get relative position
      const left = bounds.left - (parentBounds?.left || 0);
      const width = bounds.width;

      gsap.to(hoverEl, {
        width,
        x: left,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };
  return (
    <section className="w-full z-10">
      <div className="w-full relative flex flex-row justify-between items-center z-20">
        {videoLinks.map((link, index) => {
          return (
            <div
              ref={(el) => {
                linkRef.current[index] = el;
              }}
              className="font-bold max-xs:small-text max-xs:px-[10px] px-[20px] py-[5px] cursor-pointer"
              key={index}
              onClick={() => {
                handleClick(index);
              }}
            >
              {link.name}
            </div>
          );
        })}
        <span
          ref={hoverRef}
          className={`absolute top-0 left-0 h-full bg-chart-3 rounded-3xl pointer-events-none -z-10`}
        />
      </div>
    </section>
  );
}
