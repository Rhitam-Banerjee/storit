import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Model } from "./ModelHead";
import { cn } from "@/lib/utils";
import { memo, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// Wrapper component to handle mouse movement
function InteractiveModel(props: React.ComponentProps<typeof Model>) {
  const modelRef = useRef<THREE.Group>(null);
  const [isInView, setIsInView] = useState(false);
  const { viewport } = useThree();

  useEffect(() => {
    // Get the canvas element
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
      }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) return; // Only add listener when in view

    const handleMouseMove = (event: MouseEvent) => {
      if (!modelRef.current) return;

      // Normalize mouse coordinates (-1 to +1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Convert to rotation angles (adjust multipliers for sensitivity)
      const targetRotationY = x * 0.5; // Horizontal rotation
      const targetRotationX = -y * 0.5; // Vertical rotation

      // Animate with GSAP
      gsap.to(modelRef.current.rotation, {
        y: targetRotationY,
        x: targetRotationX,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport, isInView]);

  return <Model ref={modelRef} {...props} />;
}

function ModelComponent() {
  return (
    <Canvas
      className={cn(`!w-full !h-full mt-[100px]`)}
      camera={{ position: [0, 0, 20], fov: 10 }}
    >
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight
        position={[15, 15, 15]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <InteractiveModel position={[0, 0, 0]} />
    </Canvas>
  );
}
export default memo(ModelComponent);
