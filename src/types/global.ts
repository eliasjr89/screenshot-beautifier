import { ReactNode } from "react";

export type SidebarProps = {
  mode: "upload" | "canvas";
  values: {
    imageUrl: string | null;
    bgColor: string;
    padding: number;
    borderRadius: number;
    frameRadius: number;
    frameShadow: number;
    imageShadow: number;
    frameShadowColor: string;
    imageShadowColor: string;
    rotateX: number;
    rotateY: number;
    imageOpacity: number;
    textContent: string;
    isLoading: boolean;
  };
  actions: {
    setBgColor: (color: string) => void;
    setPadding: (padding: number) => void;
    setBorderRadius: (radius: number) => void;
    setFrameRadius: (radius: number) => void;
    setFrameShadow: (shadow: number) => void;
    setImageShadow: (shadow: number) => void;
    setFrameShadowColor: (color: string) => void;
    setImageShadowColor: (color: string) => void;
    setRotateX: (rotate: number) => void;
    setRotateY: (rotate: number) => void;
    setImageOpacity: (opacity: number) => void;
    setMode: (mode: "upload" | "canvas") => void;
    setTextContent: (text: string) => void;
    handleImageUpload: (file: File) => void;
    handleUrlImport: (url: string) => Promise<void>;
    handleExport: () => void;
  };
  onImageUpload: (file: File) => void;
};

export type BackgroundFrameProps = {
  padding: number;
  bgColor: string;
  borderRadius: number;
  frameRadius?: number;
  frameShadow: number;
  imageShadow: number;
  frameShadowColor?: string;
  imageShadowColor?: string;
  rotateX?: number;
  rotateY?: number;
  imageOpacity?: number;
  frameRef?: React.RefObject<HTMLDivElement | null>;
  onRotateChange?: (rotateX: number, rotateY: number) => void;
  children: ReactNode;
};

export type EditorMode = "upload" | "canvas";

export type EditorState = {
  imageUrl: string | null;
  bgColor: string;
  padding: number;
  borderRadius: number;
  frameRadius: number;
  frameShadow: number;
  imageShadow: number;
  frameShadowColor: string;
  imageShadowColor: string;
  rotateX: number;
  rotateY: number;
  imageOpacity: number;
  mode: EditorMode;
  textContent: string;
  isLoading: boolean;
  frameRef?: React.RefObject<HTMLDivElement | null>;
};

export type EditorAction =
  | { type: "SET_IMAGE"; payload: string | null }
  | { type: "SET_BG_COLOR"; payload: string }
  | { type: "SET_PADDING"; payload: number }
  | { type: "SET_BORDER_RADIUS"; payload: number }
  | { type: "SET_FRAME_RADIUS"; payload: number }
  | { type: "SET_FRAME_SHADOW"; payload: number }
  | { type: "SET_IMAGE_SHADOW"; payload: number }
  | { type: "SET_FRAME_SHADOW_COLOR"; payload: string }
  | { type: "SET_IMAGE_SHADOW_COLOR"; payload: string }
  | { type: "SET_ROTATE_X"; payload: number }
  | { type: "SET_ROTATE_Y"; payload: number }
  | { type: "SET_IMAGE_OPACITY"; payload: number }
  | { type: "SET_MODE"; payload: EditorMode }
  | { type: "SET_TEXT_CONTENT"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

export type CanvasAreaProps = {
  mode: EditorMode;
  state: EditorState;
  actions: EditorActions;
};

export type EditorActions = {
  setImageUrl: (payload: string | null) => void;
  setBgColor: (payload: string) => void;
  setPadding: (payload: number) => void;
  setBorderRadius: (payload: number) => void;
  setFrameRadius: (payload: number) => void;
  setFrameShadow: (payload: number) => void;
  setImageShadow: (payload: number) => void;
  setFrameShadowColor: (payload: string) => void;
  setImageShadowColor: (payload: string) => void;
  setRotateX: (payload: number) => void;
  setRotateY: (payload: number) => void;
  setMode: (payload: EditorMode) => void;
  setTextContent: (payload: string) => void;
  handleImageUpload: (file: File) => void;
  handleUrlImport: (url: string) => Promise<void>;
  handleExport: () => void;
};
