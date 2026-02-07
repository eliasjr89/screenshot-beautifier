import { memo } from "react";
import { BackgroundFrameProps } from "../types/global";
import { useDrag3D } from "../hooks/useDrag3D";

const BackgroundFrame = memo(
  ({
    padding,
    bgColor,
    borderRadius,
    frameRadius = 24,
    frameShadow,
    imageShadow,
    frameShadowColor = "#000000",
    imageShadowColor = "#000000",
    rotateX = 0,
    rotateY = 0,
    imageOpacity = 100,
    frameRef,
    onRotateChange,
    children,
  }: BackgroundFrameProps) => {
    // Hook para arrastre 3D
    const { isDragging, handlers } = useDrag3D((deltaRotateX, deltaRotateY) => {
      if (onRotateChange) {
        // Limitar rotación entre -180 y 180 grados
        const clamp = (val: number) => {
          while (val > 180) val -= 360;
          while (val < -180) val += 360;
          return val;
        };
        onRotateChange(
          clamp(rotateX + deltaRotateX),
          clamp(rotateY + deltaRotateY),
        );
      }
    });

    return (
      <div
        ref={frameRef}
        className={`background-frame ${isDragging ? "dragging" : ""}`}
        {...handlers}
        style={
          {
            "--frame-padding": `${padding}px`,
            "--frame-bg": bgColor,
            "--img-radius": `${borderRadius}px`,
            "--frame-radius": `${frameRadius}px`,
            "--frame-shadow": frameShadow,
            "--image-shadow": imageShadow,
            "--frame-shadow-color": frameShadowColor,
            "--image-shadow-color": imageShadowColor,
            "--rotate-x": `${rotateX}deg`,
            "--rotate-y": `${rotateY}deg`,
            "--image-opacity": imageOpacity / 100, // Convertir 0-100 a 0-1
          } as React.CSSProperties
        }>
        {children}
      </div>
    );
  },
);

export default BackgroundFrame;
