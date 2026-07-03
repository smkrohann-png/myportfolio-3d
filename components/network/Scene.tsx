"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
} from "@react-three/drei";

import {
  useEffect,
  useState,
} from "react";

import Nodes from "./Nodes";

export default function Scene() {

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(
        window.innerWidth <= 768
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  return (

    <Canvas
      dpr={[1, 2]}
      camera={{
        position: isMobile
          ? [0, 0, 16.5]
          : [0, 0, 10],

        fov: isMobile
          ? 36
          : 45,
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >

      {/* PURE BLACK */}

      <color
        attach="background"
        args={["#000000"]}
      />

      {/* FOG */}

      <fog
        attach="fog"
        args={[
          "#000000",
          8,
          24,
        ]}
      />

      {/* STARS */}

      <Stars
        radius={100}
        depth={50}
        count={800}
        factor={2}
        saturation={0}
        fade
        speed={0.15}
      />

      {/* LIGHT */}

      <ambientLight
        intensity={0.6}
      />

      <pointLight
        position={[5, 5, 8]}
        intensity={1}
        color="#ffffff"
      />

      <pointLight
        position={[-5, -5, 8]}
        intensity={0.5}
        color="#ffffff"
      />

      {/* NETWORK */}

      <Nodes />

      {/* CONTROLS */}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
        minDistance={
          isMobile ? 10 : 6
        }
        maxDistance={
          isMobile ? 22 : 16
        }
        dampingFactor={0.08}
      />

    </Canvas>

  );

}