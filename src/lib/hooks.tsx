"use client"

import React from "react";

export const useMousePosition = ({ includeTouch }: { includeTouch: boolean }) => {
    const [
      mousePosition,
      setMousePosition
    ] = React.useState<{ x: number | undefined, y: number | undefined }>();
    React.useEffect(() => {
      const updateMousePosition = (ev: MouseEvent | TouchEvent) => {
        let x, y;
        if (ev instanceof TouchEvent && ev.touches) {
          const touch = ev.touches[0];
          [x, y] = [touch.clientX, touch.clientY];
        } else if (ev instanceof MouseEvent) {
          [x, y] = [ev.clientX, ev.clientY];
        }
        setMousePosition({ x, y });
      };
      window.addEventListener('mousemove', updateMousePosition);
      if (includeTouch) {
        window.addEventListener('touchmove', updateMousePosition);
      }
      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
        if (includeTouch) {
          window.removeEventListener('touchmove', updateMousePosition);
        }
      };
    }, [includeTouch]);
    return mousePosition;
};

const QUERY = '(prefers-reduced-motion: no-preference)';
const isRenderingOnServer = typeof window === 'undefined';
const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(
    getInitialState
  );
  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setPrefersReducedMotion(!event.matches);
    };
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }    };
  }, []);
  return prefersReducedMotion;
}