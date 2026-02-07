import { memo } from "react";
import { BackgroundFrameProps } from "../types/global";

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
    children,
    isNeonMode,
    effectNoise,
    effectReflection,
    scale = 1,
  }: BackgroundFrameProps & { isDragging?: boolean; scale?: number }) => {
    const shadowColor = isNeonMode ? bgColor : frameShadowColor;
    const finalFrameShadow = isNeonMode
      ? `0 0 20px ${shadowColor}, 0 0 60px ${shadowColor}, 0 0 100px ${shadowColor}`
      : `0 calc(${frameShadow}px * 1) calc(${frameShadow}px * 2) ${frameShadowColor}, 0 calc(${frameShadow}px * 0.6) calc(${frameShadow}px * 1.8) rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)`;

    const reflectionShadow = "none"; // Eliminamos sombra para evitar efecto de caja dura en el reflejo

    return (
      <div
        ref={frameRef}
        className={`background-frame ${isNeonMode ? "neon-mode" : ""}`}
        style={
          {
            "--frame-padding": `${padding}px`,
            "--frame-bg": bgColor,
            "--img-radius": `${borderRadius}px`,
            "--frame-radius": `${frameRadius}px`,
            "--image-shadow": imageShadow,
            "--frame-shadow-color": frameShadowColor,
            "--image-shadow-color": imageShadowColor,
            "--rotate-x": `${rotateX}deg`,
            "--rotate-y": `${rotateY}deg`,
            "--scale": scale,
            "--image-opacity": imageOpacity / 100,
            boxShadow: finalFrameShadow,
          } as React.CSSProperties
        }>
        <div className="frame-content" style={{ padding: padding + "px" }}>
          {children}
        </div>

        {effectNoise !== undefined && effectNoise > 0 && (
          <div
            className="noise-overlay"
            style={{
              opacity: effectNoise / 100,
              borderRadius: "inherit", // Para que respete el radio del marco
            }}
          />
        )}

        {effectReflection !== undefined && effectReflection > 0 && (
          <div
            className="frame-reflection"
            style={
              {
                "--reflection-opacity": effectReflection / 100,
                boxShadow: reflectionShadow,
              } as React.CSSProperties
            }>
            <div className="reflection-content">{children}</div>
            <div className="reflection-gradient"></div>
          </div>
        )}
      </div>
    );
  },
);

export default BackgroundFrame;
