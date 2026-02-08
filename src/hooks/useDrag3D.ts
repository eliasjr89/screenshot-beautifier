import { useState, useCallback, useRef, useEffect } from "react";

export const useDrag3D = (
  onRotate: (deltaX: number, deltaY: number) => void,
  onScale?: (delta: number) => void,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastDistance = useRef<number | null>(null);

  // --- Mouse Handlers ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    lastPosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;

      // Sensibilidad ajustada para mayor suavidad
      onRotate(deltaY * 0.4, deltaX * 0.4);

      lastPosition.current = { x: e.clientX, y: e.clientY };
    },
    [isDragging, onRotate],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // --- Touch Handlers ---
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      // Evitar scroll inicial si es necesario, pero touch-action css es mejor
      if (e.touches.length === 1) {
        setIsDragging(true);
        const touch = e.touches[0];
        lastPosition.current = { x: touch.clientX, y: touch.clientY };
      } else if (e.touches.length === 2 && onScale) {
        // Pinch to zoom start
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY,
        );
        lastDistance.current = distance;
      }
    },
    [onScale],
  ); // Añadido onScale a dependencias

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      // Solo prevenir scroll si estamos activamente arrastrando o haciendo zoom
      // Esto permite que la sidebar y otros elementos tengan scroll normal
      const isActivelyInteracting =
        isDragging || (e.touches.length === 2 && lastDistance.current !== null);

      if (isActivelyInteracting && e.cancelable) {
        e.preventDefault();
      }

      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastPosition.current.x;
        const deltaY = touch.clientY - lastPosition.current.y;

        onRotate(deltaY * 0.4, deltaX * 0.4);

        lastPosition.current = { x: touch.clientX, y: touch.clientY };
      } else if (
        e.touches.length === 2 &&
        onScale &&
        lastDistance.current !== null
      ) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY,
        );

        const delta = distance - lastDistance.current;
        onScale(delta * 0.005); // Factor de sensibilidad de zoom

        lastDistance.current = distance;
      }
    },
    [isDragging, onRotate, onScale],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastDistance.current = null;
  }, []);

  // --- Effects ---
  useEffect(() => {
    // Escuchamos touchmove globalmente para evitar bugs de scroll
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    // Passive: false permite usar preventDefault en touchmove
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return {
    isDragging,
    handleMouseDown,
    handleTouchStart, // Exponemos el handler táctil
  };
};
