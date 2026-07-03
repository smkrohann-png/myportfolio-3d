"use client";

import { Html } from "@react-three/drei";
import {
  useEffect,
  useState,
} from "react";
import nodes from "./NetworkData";

const routes: Record<string, string> = {
  ABOUT: "/network-pages/about.html",

  SKILLS: "/network-pages/skills.html",

  "MY CV": "/network-pages/rohan.cv.pdf",

  GITHUB: "https://github.com/smkrohann-png",

  LINKEDIN:
    "https://www.linkedin.com/in/smkrohan/",

  CONTACT:
    "/network-pages/contact.html",

  PROJECTS:
    "/network-pages/projects.html",

  "CLIENT WORKS":
    "/network-pages/clientWorks.html",
};

export default function Labels() {

  const [hovered, setHovered] =
    useState<string | null>(null);

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {

    const update = () => {

      setIsMobile(
        window.innerWidth <= 768
      );

    };

    update();

    window.addEventListener(
      "resize",
      update
    );

    return () =>
      window.removeEventListener(
        "resize",
        update
      );

  }, []);

  const portfolioNodes =
    nodes.filter(
      (node) => node.isPortfolio
    );

  const handleNavigation = (
    label: string
  ) => {

    const url = routes[label];

    if (!url) return;

    if (url.startsWith("http")) {

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

      return;

    }

    window.location.href = url;

  };

  return (
    <>

      {portfolioNodes.map(
        (node) => (

          <group
            key={node.id}
            position={[
              node.position.x,
              node.position.y,
              node.position.z,
            ]}
          >

            {/* NODE */}

            <mesh
              onPointerOver={() =>
                setHovered(node.id)
              }
              onPointerOut={() =>
                setHovered(null)
              }
              onClick={() =>
                handleNavigation(
                  node.label!
                )
              }
            >

              <sphereGeometry
                args={[
                  hovered === node.id
                    ? isMobile
                      ? 0.038
                      : 0.05
                    : isMobile
                      ? 0.026
                      : 0.035,
                  16,
                  16,
                ]}
              />

              <meshBasicMaterial
                color="#ffffff"
              />

            </mesh>

            {/* GLOW */}

            <mesh
              scale={
                isMobile
                  ? 2.5
                  : 3
              }
            >

              <sphereGeometry
                args={[
                  isMobile
                    ? 0.016
                    : 0.02,
                  8,
                  8,
                ]}
              />

              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={
                  hovered === node.id
                    ? 0.22
                    : 0.08
                }
              />

            </mesh>

            {/* LABEL */}

            <Html
              center
              transform={false}
            >

              <div
                onClick={() =>
                  handleNavigation(
                    node.label!
                  )
                }

                style={{

                  cursor:"pointer",

                  color:
                    hovered === node.id
                      ? "#ffffff"
                      : "rgba(255,255,255,.72)",

                  fontSize:

                    node.label ===
                    "MAJOR PROJECTS"

                      ? isMobile
                        ? "13px"
                        : "18px"

                      : isMobile
                        ? "10px"
                        : "14px",

                  fontWeight:400,

                  letterSpacing:
                    isMobile
                      ? "0.10em"
                      : "0.14em",

                  textTransform:
                    "uppercase",

                  whiteSpace:
                    "nowrap",

                  userSelect:
                    "none",

                  transform:
                    isMobile
                      ? "translateY(-16px)"
                      : "translateY(-22px)",

                  textShadow:
                    hovered === node.id
                      ? "0 0 15px rgba(255,255,255,.8)"
                      : "none",

                  transition:
                    "all .25s ease",

                }}

              >

                {node.label}

              </div>

            </Html>

          </group>

        )
      )}

    </>
  );

}