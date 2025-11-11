import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere_0: THREE.Mesh;
    Sphere_1: THREE.Mesh;
    Sphere_2: THREE.Mesh;
  };
  materials: {
    "Material.001": THREE.Material;
    "Material.002": THREE.Material;
    "Material.003": THREE.Material;
  };
};

type ModelProps = React.ComponentProps<"group">;

export const Model = React.forwardRef<THREE.Group, ModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF("/scene.gltf") as unknown as GLTFResult;
  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.717}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_0.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={materials["Material.003"]}
        />
      </group>
    </group>
  );
});

Model.displayName = "Model";

useGLTF.preload("/scene.gltf");
