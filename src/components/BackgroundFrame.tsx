import { memo } from "react";
import { BackgroundFrameProps } from "../types/global";

const BackgroundFrame = memo(
  ({
    padding,
    bgColor,
    borderRadius,
    frameRadius = 24,
    shadow,
    shadowColor = "rgba(0,0,0,0.5)",
    rotateX = 0,
    rotateY = 0,
    scale = 1,
    frameRef,
    children,
  }: BackgroundFrameProps) => {
    return (
      <div
        ref={frameRef}
        className="background-frame"
        style={
          {
            "--frame-padding": `${padding}px`,
            "--frame-bg": bgColor,
            "--img-radius": `${borderRadius}px`,
            "--frame-radius": `${frameRadius}px`,
            "--shadow": shadow,
            "--shadow-color": shadowColor,
            "--rotate-x": `${rotateX}deg`,
            "--rotate-y": `${rotateY}deg`,
            "--scale": scale,
          } as React.CSSProperties
        }>
        {children}
      </div>
    );
  },
);

export default BackgroundFrame;
