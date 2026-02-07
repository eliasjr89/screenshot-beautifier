import { memo } from "react";
import BackgroundFrame from "./BackgroundFrame";
import { CanvasAreaProps } from "@/types/global";

const CanvasArea = memo(({ mode, state, actions }: CanvasAreaProps) => {
  // Callback para actualizar rotación desde el arrastre 3D
  const handleRotateChange = (newRotateX: number, newRotateY: number) => {
    actions.setRotateX(newRotateX);
    actions.setRotateY(newRotateY);
  };

  return (
    <main className="canvas">
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
          onRotateChange={handleRotateChange}>
          {mode === "upload" && state.imageUrl && (
            <img
              src={state.imageUrl}
              alt="Uploaded"
              className="preview-image"
              crossOrigin="anonymous"
            />
          )}

          {mode === "canvas" && (
            <div className="text-card">
              <h2 className="text-card-content">{state.textContent}</h2>
            </div>
          )}
        </BackgroundFrame>
      )}
    </main>
  );
});

export default CanvasArea;
