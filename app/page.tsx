"use client";

import { useEffect } from "react";

import Cursor from "@/components/network/Cursor";
import Scene from "@/components/network/Scene";

export default function Home() {

  useEffect(() => {

    const handlePageShow = (
      event: PageTransitionEvent
    ) => {

      // Reload page when restored from browser cache
      if (event.persisted) {

        window.location.reload();

      }

    };

    window.addEventListener(
      "pageshow",
      handlePageShow
    );

    return () => {

      window.removeEventListener(
        "pageshow",
        handlePageShow
      );

    };

  }, []);

  return (

    <main className="network-page">

      <Cursor />

      <Scene />

      <div className="network-overlay">

        <div className="network-mark">

          R

        </div>

      </div>

    </main>

  );

}