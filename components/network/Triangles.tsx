"use client";

import { useMemo } from "react";
import * as THREE from "three";
import nodes from "./NetworkData";

export default function Triangles() {
  const geometry = useMemo(() => {
    const vertices: number[] = [];

    const hiddenNodes = nodes.filter(
      (n) => !n.isPortfolio
    );

    for (
      let i = 0;
      i < hiddenNodes.length;
      i += 3
    ) {
      const a =
        hiddenNodes[i];

      const b =
        hiddenNodes[i + 1];

      const c =
        hiddenNodes[i + 2];

      if (
        !a ||
        !b ||
        !c
      )
        continue;

      const ab =
        a.position.distanceTo(
          b.position
        );

      const bc =
        b.position.distanceTo(
          c.position
        );

      const ca =
        c.position.distanceTo(
          a.position
        );

      if (
        ab < 1.8 &&
        bc < 1.8 &&
        ca < 1.8
      ) {
        vertices.push(
          a.position.x,
          a.position.y,
          a.position.z,

          b.position.x,
          b.position.y,
          b.position.z,

          c.position.x,
          c.position.y,
          c.position.z
        );
      }
    }

    const geo =
      new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        vertices,
        3
      )
    );

    geo.computeVertexNormals();

    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.015}
        side={
          THREE.DoubleSide
        }
        depthWrite={false}
      />
    </mesh>
  );
}