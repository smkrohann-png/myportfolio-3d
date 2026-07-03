"use client";

import { useFrame } from "@react-three/fiber";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

import Triangles from "./Triangles";
import Connections from "./Connections";
import Labels from "./Labels";

export default function Nodes() {

  const groupRef =
    useRef<THREE.Group>(null);

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

  useFrame((state) => {

    if (!groupRef.current) return;

    const t =
      state.clock.elapsedTime;

    groupRef.current.rotation.y =
      t * 0.015;

    groupRef.current.rotation.x =
      Math.sin(t * 0.08) * 0.03;

    groupRef.current.rotation.z =
      Math.cos(t * 0.05) * 0.015;

    groupRef.current.position.y =
      Math.sin(t * 0.25) * 0.08;

  });

  return (

    <group
      ref={groupRef}
      scale={
        isMobile
          ? 0.72
          : 1
      }
    >

      <Connections />

      <Triangles />

      <Labels />

    </group>

  );

}