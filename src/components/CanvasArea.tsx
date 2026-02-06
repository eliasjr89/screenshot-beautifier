import { memo } from "react";
import BackgroundFrame from "./BackgroundFrame";
import { EditorMode } from "@/types/global";

type CanvasAreaProps = {
  mode: EditorMode;
  state: {
    imageUrl: string | null;
    bgColor: string;
    padding: number;
    borderRadius: number;
    frameRadius: number;
    shadow: number;
    shadowColor?: string;
    rotateX?: number;
    rotateY?: number;
    scale?: number;
    textContent: string;
    frameRef: React.RefObject<HTMLDivElement | null>;
  };
};

const CanvasArea = memo(({ mode, state }: CanvasAreaProps) => {
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
          shadow={state.shadow}
          shadowColor={state.shadowColor}
          rotateX={state.rotateX}
          rotateY={state.rotateY}
          scale={state.scale}
          frameRef={state.frameRef}>
          {mode === "upload" && state.imageUrl && (
            <img
              src={state.imageUrl}
              alt="Uploaded"
              className="preview-image"
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
