"use client";

import { Text } from "@react-three/drei";
import { useState } from "react";

const nodesData = [
  {
    label: "MAJOR PROJECTS",
    pos: [0.2, 1.5, 4.8],
    hero: true,
  },

  {
    label: "GITHUB",
    pos: [-3.5, 2.4, 2.8],
  },

  {
    label: "SKILLS",
    pos: [4.1, 1.2, 1.8],
  },

  {
    label: "CONTACT",
    pos: [4.7, 0.1, 0.3],
  },

  {
    label: "MINOR PROJECTS",
    pos: [0.7, -4.5, 1.8],
  },

  {
    label: "LINKEDIN",
    pos: [3.5, 2.6, -2.5],
  },

  {
    label: "ABOUT",
    pos: [-4.2, 0.5, -1.5],
  },

  {
    label: "MY CV",
    pos: [-4.5, -1.8, 1.3],
  },

  {
    label: "YOUTUBE",
    pos: [-4.8, 2.0, -0.8],
  },
];

export default function PortfolioNodes() {
  const [active, setActive] =
    useState<string | null>(null);

  return (
    <>
      {nodesData.map((node) => (
        <group
          key={node.label}
          position={node.pos as any}
        >
          <mesh
            onPointerOver={() =>
              setActive(node.label)
            }
            onPointerOut={() =>
              setActive(null)
            }
          >
            <sphereGeometry
              args={[
                node.hero
                  ? 0.10
                  : 0.07,
                24,
                24,
              ]}
            />

            <meshBasicMaterial
              color="#ffffff"
            />
          </mesh>

          <mesh scale={3}>
            <sphereGeometry
              args={[0.04, 12, 12]}
            />

            <meshBasicMaterial
              color="#56d6ff"
              transparent
              opacity={0.12}
            />
          </mesh>

          <Text
            position={[0, 0.22, 0]}
            fontSize={
              node.hero
                ? 0.26
                : 0.16
            }
            color="#dff8ff"
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>
        </group>
      ))}
    </>
  );
}