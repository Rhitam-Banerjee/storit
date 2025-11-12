import React, { useState, useRef } from "react";
import clsx from "clsx";
import { IconMessage, IconMinus, IconPlus } from "@tabler/icons-react";
import { faq } from "../constants/faq";

interface FaqEntry {
  id: string | number;
  question: string;
  answer: React.ReactNode;
}

interface FaqItemProps {
  item: FaqEntry;
  index: number;
  activeId: string | number | null;
  onToggle: (id: string | number) => void;
}

const FaqItem = ({ item, index, activeId, onToggle }: FaqItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { id, question, answer } = item;
  const isActive = activeId === id;

  // Generates unique IDs for aria attributes
  const buttonId = `faq-button-${id}`;
  const panelId = `faq-panel-${id}`;

  // Keyboard handler for accessibility (Enter/Space toggle)
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(id);
    }
  };

  return (
    <div className="relative z-2 mb-16">
      {/* FAQ question as a button for accessibility */}
      <button
        id={buttonId}
        aria-expanded={isActive}
        aria-controls={panelId}
        className={clsx(
          "group relative flex w-full items-center justify-between gap-10 px-7 py-4 cursor-pointer bg-transparent border-none text-left focus:outline-none",
          isActive ? "font-semibold text-p1" : "text-p4",
          "transition-colors duration-500"
        )}
        onClick={() => onToggle(id)}
        onKeyDown={onKeyDown}
      >
        <div className="flex-1 flex items-center gap-4">
          <span className="small-compact max-lg:hidden">
            {index < 10 ? "0" : ""}
            {index}
          </span>
          <span className="h6">{question}</span>
        </div>

        <div
          className={clsx(
            "relative flex size-12 items-center justify-center rounded-full border-2 border-s2 shadow-400 transition-all duration-500 group-hover:border-s4",
            isActive && "before:bg-p1 after:rotate-0 after:bg-p1"
          )}
          aria-hidden="true"
        >
          {isActive ? <IconMinus /> : <IconPlus />}
        </div>
      </button>

      {/* FAQ answer panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={clsx(
          "overflow-hidden transition-max-height duration-500 ease-in-out",
          isActive ? "max-h-screen" : "max-h-0"
        )}
        style={{ transitionProperty: "max-height" }}
        aria-hidden={!isActive}
      >
        <div ref={contentRef} className="body-3 px-7 py-3.5">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const halfLength = Math.floor(faq.length / 2);

  const toggleActiveId = (id: string | number) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-background" aria-label="Frequently Asked Questions">
      <div className="relative max-w-[1440px] w-full mx-auto px-16 py-3 max-sm:px-8 max-sm:py-4">
        <div className="container relative z-2 py-28">
          <div>
            <h2 className="text-heading3">
              Ask us anything, we know all about us
            </h2>
            <p className="text-chart-3">
              You have questions and we would answer
            </p>
          </div>
          <div className="faq-line_after w-0.5 h-full absolute left-1/2 top-0 -z-1 bg-s2" />
        </div>
        <div className="faq-glow_before relative z-2 border-[1px] rounded-lg">
          <div className="container flex gap-10 max-lg:block relative">
            <div className="rounded-half absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center bg-background border-2 rounded-lg">
              <IconMessage className="scale-150" />
            </div>
            <div className="relative flex-1 pt-24">
              {faq.slice(0, halfLength).map((item, index) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  index={index + 1}
                  activeId={activeId}
                  onToggle={toggleActiveId}
                />
              ))}
            </div>

            <div className="relative flex-1 lg:pt-24">
              {faq.slice(halfLength).map((item, index) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  index={halfLength + index + 1}
                  activeId={activeId}
                  onToggle={toggleActiveId}
                />
              ))}
            </div>
          </div>
          <div className="faq-lin_after absolute left-[calc(50%-1px)] top-0 -z-1 h-full w-0.5 bg-s2 max-lg:hidden" />
        </div>
      </div>
    </section>
  );
}
