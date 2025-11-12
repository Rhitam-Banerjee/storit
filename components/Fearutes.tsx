import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { videoLinks } from "@/constants/navLinks";

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const linkRef = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    gsap.to(videoEl, {
      translateY: 50,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveIndex(index);
        setIsPlaying(false);

        gsap.to(videoEl, {
          translateY: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        });
      },
    });

    const el = linkRef.current[index];
    const hoverEl = hoverRef.current;
    if (el && hoverEl) {
      const bounds = el.getBoundingClientRect();
      const parentBounds = el.parentElement?.getBoundingClientRect();

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

  useEffect(() => {
    handleClick(0);
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().then(() => setIsPlaying(true));
        } else {
          videoEl.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    const containerEl = containerRef.current;
    if (containerEl) {
      observer.observe(containerEl);
    }

    return () => {
      if (containerEl) {
        observer.unobserve(containerEl);
      }
    };
  }, []);

  const togglePlayPause = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play();
      setIsPlaying(true);
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative mt-[100px]">
      <div
        ref={containerRef}
        className="mx-auto relative bg-primary/5 backdrop-blur-2x border-2 border-b-0 border-secondary rounded-2xl rounded-b-none p-3 pb-0 w-5/8 max-sm:w-7/8 min-w-[300px] max-w-[1200px] aspect-video"
      >
        <video
          ref={videoRef}
          src={videoLinks[activeIndex].src}
          muted
          loop
          className="rounded-lg rounded-b-none w-full h-full object-contain"
          playsInline
          aria-label={`Video showing: ${videoLinks[activeIndex].name}`}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom play/pause button */}
        <button
          onClick={togglePlayPause}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-4 right-6 p-2 rounded-full bg-secondary/10 border-[1px] text-white shadow-lg hover:bg-chart-3/80 focus:outline focus:outline-offset-1 focus:outline-chart-3/20 transition"
        >
          {isPlaying ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-chart-3/20 dark:from-chart-3-dark to-secondary/1"></div>
      <nav
        aria-label="Video selection"
        className="mt-5 mx-auto max-xs:px-2 max-xs:py-2 px-4 py-3 w-full max-w-[400px] h-max bg-secondary rounded-4xl shadow-lg shadow-chart-3/20"
      >
        <div className="w-full z-10">
          <div className="w-full relative flex flex-row justify-between items-center z-20">
            {videoLinks.map((link, index) => (
              <button
                key={index}
                ref={(el) => {
                  linkRef.current[index] = el;
                }}
                className={`max-sm:small-text max-sm:px-[10px] px-[20px] py-[5px] cursor-pointer ${
                  activeIndex === index
                    ? "text-white"
                    : "text-chart-3-dark dark:text-white"
                }`}
                onClick={() => handleClick(index)}
                aria-current={activeIndex === index ? "true" : undefined}
                aria-label={`Select video: ${link.name}`}
                type="button"
              >
                {link.name}
              </button>
            ))}
            <span
              ref={hoverRef}
              className="absolute top-0 left-0 h-full bg-chart-3 rounded-3xl pointer-events-none -z-10"
              aria-hidden="true"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
