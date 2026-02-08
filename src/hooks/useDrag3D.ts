import { useState, useCallback, useRef, useEffect } from "react";

export const useDrag3D = (
  onRotate: (deltaX: number, deltaY: number) => void,
  onScale?: (delta: number) => void,
  onPan?: (deltaX: number, deltaY: number) => void,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastDistance = useRef<number | null>(null);
  const lastClickTime = useRef<number>(0);

  // --- Mouse Handlers ---
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      const timeSinceLastClick = now - lastClickTime.current;

      // Detectar doble click (menos de 300ms entre clicks)
      if (timeSinceLastClick < 300 && onPan) {
        setIsPanning(true);
        setIsDragging(false);
      } else {
        setIsDragging(true);
        setIsPanning(false);
      }

      lastClickTime.current = now;
      lastPosition.current = { x: e.clientX, y: e.clientY };
    },
    [onPan],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging && !isPanning) return;

      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;

      if (isPanning && onPan) {
        // Modo pan: mover la imagen
        onPan(deltaX, deltaY);
      } else {
        // Modo rotación normal
        onRotate(deltaY * 0.4, deltaX * 0.4);
      }

      lastPosition.current = { x: e.clientX, y: e.clientY };
    },
    [isDragging, isPanning, onRotate, onPan],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
  }, []);

  // --- Touch Handlers ---
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true);
        setIsPanning(false);
        const touch = e.touches[0];
        lastPosition.current = { x: touch.clientX, y: touch.clientY };
      } else if (e.touches.length === 2) {
        // Dos dedos: iniciar tracking para pan o zoom
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY,
        );
        lastDistance.current = distance;

        // Guardar posición central para pan
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        lastPosition.current = { x: centerX, y: centerY };

        setIsDragging(false);
        setIsPanning(false); // Se determinará en touchmove
      }
    },
    [onScale],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      // Solo prevenir scroll si estamos activamente arrastrando o haciendo zoom/pan
      const isActivelyInteracting =
        isDragging ||
        isPanning ||
        (e.touches.length === 2 && lastDistance.current !== null);

      if (isActivelyInteracting && e.cancelable) {
        e.preventDefault();
      }

      if (e.touches.length === 1 && isDragging) {
        // Un dedo: rotar
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastPosition.current.x;
        const deltaY = touch.clientY - lastPosition.current.y;

        onRotate(deltaY * 0.4, deltaX * 0.4);

        lastPosition.current = { x: touch.clientX, y: touch.clientY };
      } else if (e.touches.length === 2 && lastDistance.current !== null) {
        // Dos dedos: determinar si es zoom o pan
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY,
        );

        const distanceChange = Math.abs(distance - lastDistance.current);
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        const centerDeltaX = centerX - lastPosition.current.x;
        const centerDeltaY = centerY - lastPosition.current.y;

        // Si la distancia cambia significativamente (>5px), es zoom
        // Si no, pero el centro se mueve, es pan
        if (distanceChange > 5 && onScale) {
          const delta = distance - lastDistance.current;
          onScale(delta * 0.005);
          lastDistance.current = distance;
          setIsPanning(false);
        } else if (
          (Math.abs(centerDeltaX) > 2 || Math.abs(centerDeltaY) > 2) &&
          onPan
        ) {
          // Pan con dos dedos
          onPan(centerDeltaX, centerDeltaY);
          setIsPanning(true);
        }

        lastPosition.current = { x: centerX, y: centerY };
      }
    },
    [isDragging, isPanning, onRotate, onScale, onPan],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
    lastDistance.current = null;
  }, []);

  // --- Effects ---
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
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
    isPanning,
    handleMouseDown,
    handleTouchStart,
  };
};
