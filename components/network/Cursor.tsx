"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [trail, setTrail] = useState(
    Array.from({ length: 8 }, () => ({
      x: 0,
      y: 0,
    }))
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      move
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );
  }, []);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setTrail((prev) => {
        const next = [...prev];

        next[0] = {
          x:
            prev[0].x +
            (mouse.x - prev[0].x) *
              0.25,

          y:
            prev[0].y +
            (mouse.y - prev[0].y) *
              0.25,
        };

        for (
          let i = 1;
          i < next.length;
          i++
        ) {
          next[i] = {
            x:
              prev[i].x +
              (next[i - 1].x -
                prev[i].x) *
                0.22,

            y:
              prev[i].y +
              (next[i - 1].y -
                prev[i].y) *
                0.22,
          };
        }

        return next;
      });

      frame =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    return () =>
      cancelAnimationFrame(frame);
  }, [mouse]);

  return (
    <>
      {trail.map((p, i) => (
        <div
          key={i}
          style={{
            position: "fixed",

            left: p.x,
            top: p.y,

            width:
              12 - i * 1.1,

            height:
              12 - i * 1.1,

            background:
              "#ffffff",

            opacity:
              1 - i * 0.12,

            transform:
              "translate(-50%, -50%)",

            pointerEvents:
              "none",

            zIndex: 99999,
          }}
        />
      ))}

      <div
        style={{
          position: "fixed",

          left: mouse.x,
          top: mouse.y,

          width: 4,
          height: 4,

          borderRadius: "50%",

          background:
            "#ffffff",

          transform:
            "translate(-50%, -50%)",

          pointerEvents:
            "none",

          zIndex: 100000,

        }}
      />
    </>
  );
}
