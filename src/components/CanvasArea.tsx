import { memo } from "react";
import BackgroundFrame from "./BackgroundFrame";
import { CanvasAreaProps } from "@/types/global";
import { useDrag3D } from "@/hooks/useDrag3D";

const CanvasArea = memo(({ mode, state, actions }: CanvasAreaProps) => {
  const handleRotateChange = (deltaX: number, deltaY: number) => {
    const clamp = (val: number) => {
      while (val > 180) val -= 360;
      while (val < -180) val += 360;
      return val;
    };

    actions.setRotateX(clamp(state.rotateX + deltaX));
    actions.setRotateY(clamp(state.rotateY + deltaY));
  };

  const handleScaleChange = (delta: number) => {
    const newScale = Math.min(Math.max(state.scale + delta, 0.1), 3); // Límite 0.1x a 3x
    actions.setScale(newScale);
  };

  const handlePanChange = (deltaX: number, deltaY: number) => {
    actions.setTranslateX(state.translateX + deltaX);
    actions.setTranslateY(state.translateY + deltaY);
  };

  const { isDragging, isPanning, handleMouseDown, handleTouchStart } =
    useDrag3D(handleRotateChange, handleScaleChange, handlePanChange);

  return (
    <main
      className={`canvas ${isDragging ? "dragging" : ""} ${isPanning ? "panning" : ""}`}
      onMouseDown={
        mode === "canvas" || (mode === "upload" && state.imageUrl)
          ? handleMouseDown
          : undefined
      }
      onTouchStart={
        mode === "canvas" || (mode === "upload" && state.imageUrl)
          ? handleTouchStart
          : undefined
      }
      style={{
        cursor: isPanning
          ? "move"
          : isDragging
            ? "grabbing"
            : mode === "canvas" || (mode === "upload" && state.imageUrl)
              ? "grab"
              : "default",
      }}>
      {mode === "upload" && !state.imageUrl ? (
        <h1 className="placeholder-text">Sube una imagen para empezar</h1>
      ) : (
        <BackgroundFrame
          padding={state.padding}
          bgColor={state.bgColor}
          borderRadius={state.borderRadius}
          frameRadius={state.frameRadius}
          frameShadow={state.frameShadow}
          imageShadow={state.imageShadow}
          frameShadowColor={state.frameShadowColor}
          imageShadowColor={state.imageShadowColor}
          rotateX={state.rotateX}
          rotateY={state.rotateY}
          imageOpacity={state.imageOpacity}
          frameRef={state.frameRef}
          isNeonMode={state.isNeonMode}
          effectNoise={state.effectNoise}
          effectReflection={state.effectReflection}
          scale={state.scale}
          translateX={state.translateX}
          translateY={state.translateY}>
          {mode === "upload" && state.imageUrl && (
            <img
              src={state.imageUrl}
              alt="Uploaded"
              className="preview-image"
              crossOrigin="anonymous"
              style={{
                filter: `brightness(${100 + state.filterBrightness}%) contrast(${100 + state.filterContrast}%) saturate(${100 + state.filterSaturation}%) blur(${state.filterBlur}px)`,
              }}
            />
          )}

          {mode === "canvas" && (
            <div className="text-card" style={{ textAlign: state.textAlign }}>
              <h2
                className={`text-card-content font-${state.fontFamily} ${state.textStyle === "glitch" ? "glitch-effect" : ""}`}
                style={{
                  color: state.textColor,
                  fontSize: `${state.fontSize}px`,
                  textShadow:
                    state.textStyle === "neon" || state.isNeonMode
                      ? `0 0 10px ${state.textColor}, 0 0 20px ${state.textColor}, 0 0 40px ${state.textColor}`
                      : "2px 2px 0px rgba(0,0,0,0.2)",
                }}
                data-text={state.textContent}>
                {state.textContent}
              </h2>
            </div>
          )}
        </BackgroundFrame>
      )}
    </main>
  );
});

export default CanvasArea;
