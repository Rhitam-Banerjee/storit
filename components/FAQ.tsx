import React from "react";
import { faq } from "../constants/faq";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { IconMessage, IconMinus, IconPlus } from "@tabler/icons-react";

interface FaqEntry {
  id: string | number;
  question: string;
  answer: React.ReactNode;
}

interface FaqItemProps {
  item: FaqEntry;
  index: number;
}

const FaqItem = ({ item, index }: FaqItemProps) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { id, question, answer } = item;

  const active = activeId === id;

  useEffect(() => {
    if (contentRef.current) {
      if (active) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [active]);

  return (
    <div className="relative z-2 mb-16">
      <div
        className="group relative flex cursor-pointer items-center justify-between gap-10 px-7"
        onClick={() => {
          setActiveId(activeId === id ? null : id);
        }}
      >
        <div className="flex-1">
          <div className="small-compact mb-1.5 text-p3 max-lg:hidden">
            {index < 10 ? "0" : ""}
            {index}
          </div>
          <div
            className={clsx(
              "h6 text-p4 transition-colors duration-500 max-md:flex max-md:min-h-20 max-md:items-center",
              active && "max-lg:text-p1"
            )}
          >
            {question}
          </div>
        </div>

        <div
          className={clsx(
            "relative flex size-12 items-center justify-center rounded-full border-2 border-s2 shadow-400 transition-all duration-500 group-hover:border-s4",
            active && "before:bg-p1 after:rotate-0 after:bg-p1"
          )}
        >
          {active ? <IconMinus /> : <IconPlus />}
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="body-3 px-7 py-3.5">
          {answer}
        </div>
      </div>

      <div
        className={clsx(
          "g5 -bottom-7 -top-7 left-0 right-0 -z-1 rounded-3xl opacity-0 transition-opacity duration-500 absolute",
          active && "opacity-100"
        )}
      >
        <div className="g4 absolute inset-0.5 -z-1 rounded-3xl" />
        <div className="absolute left-8 top-0 h-0.5 w-40 bg-p1" />
      </div>
    </div>
  );
};

export default function FAQ() {
  const halfLength = Math.floor(faq.length / 2);
  return (
    <section className="bg-background">
      <div className="relative max-w-[1440px] w-full mx-auto px-16 py-3 max-sm:px-8 max-sm:py-4">
        <div className="container relative z-2 py-28">
          <div>
            <h3 className="text-heading3">
              Ask us anything, we know all about us
            </h3>
            <p className="text-chart-3">
              You have questions and we would answer
            </p>
          </div>
          <div className="faq-line_after w-0.5 h-full absolute left-1/2 top-0 -z-1 bg-s2" />
        </div>
        <div className="faq-glow_before relative z-2 border-[1px] rounded-lg">
          <div className="container flex gap-10 max-lg:block">
            <div className="rounded-half absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center bg-background border-2 rounded-lg">
              <IconMessage className="scale-150" />
            </div>
            <div className="relative flex-1 pt-24">
              {faq.slice(0, halfLength).map((item, index) => (
                <FaqItem key={item.id} item={item} index={index + 1} />
              ))}
            </div>

            <div className="relative flex-1 lg:pt-24">
              {faq.slice(halfLength).map((item, index) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  index={halfLength + index + 1}
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
