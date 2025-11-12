import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { gridLayout } from "@/constants/aboutContent";

export default function GridAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const groupCount = 5;
    const masterTl = gsap.timeline({ repeat: -1 });

    for (let i = 1; i <= groupCount; i++) {
      const pathGroup = containerRef.current.querySelectorAll(`.group-${i}`);
      const startCards = containerRef.current.querySelectorAll(
        `.start-card-group-${i}`
      );
      const endCards = containerRef.current.querySelectorAll(
        `.end-card-group-${i}`
      );
      gsap.set([...startCards, ...endCards], { scale: 0.8 });
      // Initialize dasharray and dashoffset for paths only
      pathGroup.forEach((path) => {
        if (path instanceof SVGPathElement) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length.toString();
          path.style.strokeDashoffset = length.toString();
        }
      });

      // Animate all elements in the group together
      masterTl
        .to(startCards, {
          scale: 1,
          duration: 0.8,
          ease: "power1.inOut",
          onStart: () => {
            startCards.forEach((card) => card.classList.add("active"));
          },
          onReverseComplete: () => {
            startCards.forEach((card) => card.classList.remove("active"));
          },
        })
        .to(
          pathGroup,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power1.inOut",
          },
          "<" // start at same time as end of startCards animation
        )
        .to(endCards, {
          scale: 1,
          duration: 0.8,
          ease: "power1.inOut",
          onStart: () => {
            endCards.forEach((card) => card.classList.add("active"));
          },
          onReverseComplete: () => {
            endCards.forEach((card) => card.classList.remove("active"));
          },
        })
        .to({}, { duration: 1 })
        .to(
          pathGroup,
          {
            strokeDashoffset: (_, target) => -target.getTotalLength(),
            opacity: 1,
            duration: 0.8,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          startCards,
          {
            scale: 0.8,
            duration: 0.8,
            ease: "power1.inOut",
            onStart: () => {
              startCards.forEach((card) => card.classList.remove("active"));
            },
          },
          "<"
        )
        .to(endCards, {
          scale: 0.8,
          duration: 0.8,
          ease: "power1.inOut",
          onStart: () => {
            endCards.forEach((card) => card.classList.remove("active"));
          },
        });
    }
  }, []);
  return (
    <section
      aria-label="StorIt features visual grid animation"
      ref={containerRef}
      className="relative grid grid-cols-6 w-max min-w-[300px] max-w-[500px] mx-auto scale-80 lg:scale-100"
      style={{ justifyItems: "center", alignItems: "center" }}
      tabIndex={-1}
    >
      {gridLayout.map((item, index) => {
        if (!item) return <div key={index} aria-hidden="true" />;
        return (
          <div
            key={index}
            className={`scale-80 text-center w-[70px] h-[70px] rounded-lg bg-transparent border-[1px] border-primary/30 ${item.className}`}
            role="group"
            aria-label={item.text}
            tabIndex={0}
          >
            <div className="h-full w-full grayscale-100 flex flex-col justify-center items-center on-active">
              <Image src={item.icon} width={30} height={30} alt={item.text} />
              <span>{item.text}</span>
            </div>
          </div>
        );
      })}

      <svg
        aria-hidden="true"
        className="absolute rotate-270 top-[80px] left-[98px]"
        style={{ width: "135px", height: "53px" }}
      >
        <defs>
          <linearGradient
            id="firstGradient"
            gradientUnits="userSpaceOnUse"
            data-js-start-rotation="180"
            x1="88.203879498172"
            x2="11.796120501817356"
            y1="17.74378212981017"
            y2="82.25621787017721"
          >
            <stop offset="0" stopColor="#11EFE3" />
            <stop offset="1" stopColor="#0073E6" />
          </linearGradient>
        </defs>
        <path
          className="group-1"
          stroke="url(#firstGradient)"
          strokeWidth={2}
          fill="none"
          d="M134,1 L134,22 Q134,42 114,42 L35,42"
          style={{
            strokeDasharray: "176.465px",
            strokeDashoffset: "176.465px",
          }}
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute scale-x-73 top-[70px] -translate-y-1/4"
        style={{ width: "194px" }}
      >
        <defs>
          <linearGradient
            id="seventhGradient"
            gradientUnits="userSpaceOnUse"
            x1="37.164444620951166"
            x2="62.83555537906479"
            y1="98.32440913359801"
            y2="1.6755908664062318"
          >
            <stop offset="0" stopColor="#FFD848" />
            <stop offset="1" stopColor="#00D924" />
          </linearGradient>
        </defs>
        <path
          className="group-1"
          stroke="url(#seventhGradient)"
          strokeWidth={2}
          fill="none"
          data-js-target="HomepageFrontdoorConnection.path"
          d="M1,1 L193,1"
          style={{
            strokeDasharray: "192px",
            strokeDashoffset: "192px",
          }}
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute top-[105px] left-[56%]"
        style={{ height: "110px" }}
      >
        <defs>
          <linearGradient
            id="secondGradient"
            gradientUnits="userSpaceOnUse"
            x1="7.3793949905661265"
            x2="92.62060500942525"
            y1="23.856472528944757"
            y2="76.14352747106932"
          >
            <stop offset="0" stopColor="#0073e6" />
            <stop offset="1" stopColor="#ff80ff" />
          </linearGradient>
        </defs>
        <path
          className="group-2"
          stroke="url(#secondGradient)"
          strokeWidth={2}
          fill="none"
          d="M10,105 L10,21 Q10,1 31,1 L44,1"
          style={{
            strokeDasharray: "176.465px",
            strokeDashoffset: "176.465px",
          }}
        />
      </svg>

      <svg
        aria-hidden="true"
        className="absolute top-[69px] left-[35px]"
        style={{ width: "12px", height: "212px" }}
      >
        <defs>
          <linearGradient
            id="thirdGradient"
            gradientUnits="userSpaceOnUse"
            x1="68.97280797644844"
            x2="31.027192023536287"
            y1="3.7395140807101512"
            y2="96.26048591928358"
          >
            <stop offset="0" stopColor="#0073e6" />
            <stop offset="1" stopColor="#ff80ff" />
          </linearGradient>
        </defs>
        <path
          className="group-3"
          stroke="url(#thirdGradient)"
          strokeWidth={2}
          fill="none"
          d="M1,212 L1,0"
          style={{
            strokeDasharray: "212px",
            strokeDashoffset: "212px",
          }}
        />
      </svg>

      <svg
        aria-hidden="true"
        className="absolute top-[calc(50%_+_35px)] left-1/4"
        style={{ width: "105px", height: "53px" }}
      >
        <defs>
          <linearGradient
            id="fourthGradient"
            gradientUnits="userSpaceOnUse"
            x1="99.49501606191117"
            x2="0.5049839380864825"
            y1="42.911743159904894"
            y2="57.088256840078756"
          >
            <stop offset="0" stopColor="#11efe3" />
            <stop offset="1" stopColor="#9966ff" />
          </linearGradient>
        </defs>
        <path
          className="group-4"
          stroke="url(#fourthGradient)"
          strokeWidth={2}
          fill="none"
          d="M1,1 L1,18 Q3,32 21,32 L142,32"
          style={{
            strokeDasharray: "184.465px",
            strokeDashoffset: "184.465px",
          }}
        />
      </svg>

      <svg
        aria-hidden="true"
        className="absolute top-[calc(50%_+_35px)] right-[70px]"
        style={{ width: "35px", height: "53px" }}
      >
        <defs>
          <linearGradient
            id="fifthGradient"
            gradientUnits="userSpaceOnUse"
            x1="6.974008307209516"
            x2="93.0259916927989"
            y1="75.47084684206484"
            y2="24.529153157949366"
          >
            <stop offset="0" stopColor="#ff5996" />
            <stop offset="1" stopColor="#9966ff" />
          </linearGradient>
        </defs>
        <path
          className="group-5"
          stroke="url(#fifthGradient)"
          strokeWidth={2}
          fill="none"
          d="M1,1 L1,32 Q2,40 11,40 L48,40"
          style={{
            strokeDasharray: "94.4645px",
            strokeDashoffset: "94.4645px",
          }}
        />
      </svg>

      <svg
        aria-hidden="true"
        className="absolute top-[calc(50%_+_35px)] right-[110px] rotate-180"
        style={{ width: "4px", height: "70px" }}
      >
        <defs>
          <linearGradient
            id="sixthGradient"
            gradientUnits="userSpaceOnUse"
            x1="4.0174889797620565"
            x2="95.98251102024443"
            y1="69.63692135426773"
            y2="30.363078645747457"
          >
            <stop offset="0" stopColor="#ff5996" />
            <stop offset="1" stopColor="#9966ff" />
          </linearGradient>
        </defs>
        <path
          className="group-5"
          stroke="url(#sixthGradient)"
          strokeWidth={2}
          fill="none"
          d="M1,69 L1,0"
          style={{
            strokeDasharray: "69px",
            strokeDashoffset: "69px",
          }}
        />
      </svg>
    </section>
  );
}
