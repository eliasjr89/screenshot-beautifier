import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export type SidebarProps = {
  mode: EditorMode;
  values: {
    imageUrl: string | null;
    bgColor: string;
    padding: number;
    borderRadius: number;
    frameRadius: number;
    shadow: number;
    shadowColor: string;
    rotateX: number;
    rotateY: number;
    scale: number;
    textContent: string;
  };
  actions: {
    setImageUrl: (url: string | null) => void;
    setBgColor: (color: string) => void;
    setPadding: (padding: number) => void;
    setBorderRadius: (radius: number) => void;
    setFrameRadius: (radius: number) => void;
    setShadow: (shadow: number) => void;
    setShadowColor: (color: string) => void;
    setRotateX: (val: number) => void;
    setRotateY: (val: number) => void;
    setScale: (val: number) => void;
    setTextContent: (text: string) => void;
    handleImageUpload: (file: File) => void;
    handleExport: () => void;
    setMode: (mode: EditorMode) => void;
  };
};

export type ImageUploaderProps = {
  onImageUpload: (file: File) => void;
};

export type BackgroundFrameProps = {
  padding: number;
  bgColor: string;
  borderRadius: number;
  frameRadius?: number;
  shadow: number;
  shadowColor?: string;
  rotateX?: number;
  rotateY?: number;
  scale?: number;
  frameRef?: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

export type EditorMode = "upload" | "canvas";
