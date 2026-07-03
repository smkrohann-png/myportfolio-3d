"use client";

import { useMemo } from "react";
import * as THREE from "three";
import nodes from "./NetworkData";

export default function Connections() {
  const geometry = useMemo(() => {
    const positions: number[] = [];

    const hiddenNodes =
      nodes.filter(
        (node) => !node.isPortfolio
      );

    const nearestCount = 6;

    for (
      let i = 0;
      i < hiddenNodes.length;
      i++
    ) {
      const current =
        hiddenNodes[i];

      const sorted = [
        ...hiddenNodes,
      ]
        .filter(
          (_, idx) => idx !== i
        )
        .sort(
          (a, b) =>
            current.position.distanceTo(
              a.position
            ) -
            current.position.distanceTo(
              b.position
            )
        );

      for (
        let j = 0;
        j < nearestCount;
        j++
      ) {
        const target =
          sorted[j];

        positions.push(
          current.position.x,
          current.position.y,
          current.position.z,

          target.position.x,
          target.position.y,
          target.position.z
        );
      }
    }

    const geo =
      new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        positions,
        3
      )
    );

    return geo;
  }, []);

  return (
    <>
      <lineSegments
        geometry={geometry}
      >
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.10}
        />
      </lineSegments>

      <lineSegments
        geometry={geometry}
      >
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.03}
        />
      </lineSegments>
    </>
  );
}