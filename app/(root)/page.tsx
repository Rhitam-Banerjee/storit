// import FlowDiagram from "@/components/FlowDiagram";
"use client";
import Button from "@/constants/animateButton";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Fearutes from "@/components/Fearutes";
import GridAnimationContainer from "@/components/GridAnimationContainer";
import ModelCanvas from "@/components/ModelCanvas";
import ToolsUsed from "@/components/ToolsUsed";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.to(".slide-left", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.inOut",
      delay: 0.2,
    });

    gsap.to(".slide-right", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.inOut",
      delay: 0.4,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".pin-container",
          start: "top 200",
          end: "bottom 50",
          scrub: true,
          pin: true,
          pinSpacing: false, // Disable spacing so pin-container stays fixed with no gap
          markers: false,
        },
      })
      .to(".pin-container", {
        opacity: 0,
        scale: 0.9,
        ease: "power1.out",
      });
  });

  return (
    <main className="pt-[100px] relative" ref={container}>
      <div className="max-w-[1440px] mx-auto px-16 py-3 max-sm:px-8 max-sm:py-4 flex flex-row max-lg:flex-col justify-center items-center pin-container">
        <div className="flex flex-col justify-center lg:items-start items-center lg:text-start text-center translate-y-[100px] opacity-0 slide-left">
          <h3 className="text-heading4 text-chart-3 font-bold">
            Store &amp; Share
          </h3>
          <h1 className="text-heading1 font-black leading-[80px]">
            Amaizingly Simple
          </h1>
          <p className="mt-[10px] max-w-[500px] text-small-text">
            We have designed StorIt to be easy to use, quick to access &amp;
            better authentication.
          </p>
          <Link href="/sign-up">
            <Button text={"Try Demo"} />
          </Link>
        </div>
        <div className="max-lg:mt-[50px] translate-y-[100px] opacity-0 slide-right">
          <Image
            className="w-full max-w-[600px] max-lg:max-w-[300px]"
            src="/hero.png"
            alt="StorIt logo"
            width={1230}
            height={1230}
            priority
          />
        </div>
      </div>
      <Fearutes />
      <GridAnimationContainer />
      <ModelCanvas />
      <ToolsUsed />
      <FAQ />
      <Testimonials />
    </main>
  );
}
