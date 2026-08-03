/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  endValue: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({
  endValue,
  suffix = "",
  prefix = "",
  duration = 1200,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutQuad)
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + easedProgress * (endValue - startValue));
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
