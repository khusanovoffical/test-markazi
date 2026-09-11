"use client";

import { useMotionValue, useTransform, useSpring } from "framer-motion";
import { useCallback } from "react";

export function use3DTilt(intensity = 15) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity]);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const relX = (event.clientX - centerX) / (rect.width / 2);
      const relY = (event.clientY - centerY) / (rect.height / 2);
      x.set(relX);
      y.set(relY);
      scale.set(1.02);
    },
    [x, y, scale]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [x, y, scale]);

  return {
    rotateX,
    rotateY,
    scale,
    handleMouseMove,
    handleMouseLeave,
    style: {
      rotateX,
      rotateY,
      scale,
      transformStyle: "preserve-3d" as const,
    },
  };
}
