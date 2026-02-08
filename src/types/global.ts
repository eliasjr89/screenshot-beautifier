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
    fontFamily: fontFamily;
    filterBrightness: number;
    filterContrast: number;
    filterSaturation: number;
    filterBlur: number;
    effectNoise: number;
    effectReflection: number;
    isNeonMode: boolean;
    textColor: string;
    fontSize: number;
    textAlign: "left" | "center" | "right";
    textStyle: "normal" | "glitch" | "neon";
    scale: number;
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
    setFontFamily: (fontFamily: fontFamily) => void;
    setFilterBrightness: (val: number) => void;
    setFilterContrast: (val: number) => void;
    setFilterSaturation: (val: number) => void;
    setFilterBlur: (val: number) => void;
    setEffectNoise: (val: number) => void;
    setEffectReflection: (val: number) => void;
    setIsNeonMode: (val: boolean) => void;
    setTextColor: (val: string) => void;
    setFontSize: (val: number) => void;
    setTextAlign: (val: "left" | "center" | "right") => void;
    setTextStyle: (val: "normal" | "glitch" | "neon") => void;
    setScale: (val: number) => void;
    resetFilters: () => void;
  };
  onImageUpload: (file: File) => void;
};

export type ImageUploaderProps = {
  onImageUpload: (file: File) => void;
};

export type CanvasAreaProps = {
  mode: EditorMode;
  state: EditorState;
  actions: EditorActions;
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
  // Efectos
  effectNoise?: number;
  effectReflection?: number;
  isNeonMode?: boolean;
};

export type EditorMode = "upload" | "canvas";
export type fontFamily =
  | "inter"
  | "serif"
  | "mono"
  | "cursive"
  | "comic"
  | "retro"
  | "display"
  | "scifi";

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
  fontFamily: fontFamily;
  // Filtros
  filterBrightness: number;
  filterContrast: number;
  filterSaturation: number;
  filterBlur: number;
  // Efectos Futuristas
  effectNoise: number;
  effectReflection: number;
  isNeonMode: boolean;
  // Texto Avanzado
  textColor: string;
  fontSize: number;
  textAlign: "left" | "center" | "right";
  textStyle: "normal" | "glitch" | "neon";
  // Transform
  scale: number;
  translateX: number;
  translateY: number;
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
  | { type: "SET_SCALE"; payload: number }
  | { type: "RESET_IMAGE_STATE" }
  | { type: "SET_IMAGE_OPACITY"; payload: number }
  | { type: "SET_MODE"; payload: EditorMode }
  | { type: "SET_TEXT_CONTENT"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_FONT_FAMILY"; payload: fontFamily }
  | { type: "SET_FILTER_BRIGHTNESS"; payload: number }
  | { type: "SET_FILTER_CONTRAST"; payload: number }
  | { type: "SET_FILTER_SATURATION"; payload: number }
  | { type: "SET_FILTER_BLUR"; payload: number }
  | { type: "SET_EFFECT_NOISE"; payload: number }
  | { type: "SET_EFFECT_REFLECTION"; payload: number }
  | { type: "SET_IS_NEON_MODE"; payload: boolean }
  | { type: "SET_TEXT_COLOR"; payload: string }
  | { type: "SET_FONT_SIZE"; payload: number }
  | { type: "SET_TEXT_ALIGN"; payload: "left" | "center" | "right" }
  | { type: "SET_TEXT_STYLE"; payload: "normal" | "glitch" | "neon" }
  | { type: "SET_TRANSLATE_X"; payload: number }
  | { type: "SET_TRANSLATE_Y"; payload: number };

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
  setFontFamily: (payload: fontFamily) => void;
  setFilterBrightness: (payload: number) => void;
  setFilterContrast: (payload: number) => void;
  setFilterSaturation: (payload: number) => void;
  setFilterBlur: (payload: number) => void;
  setEffectNoise: (payload: number) => void;
  setEffectReflection: (payload: number) => void;
  setIsNeonMode: (payload: boolean) => void;
  setTextColor: (payload: string) => void;
  setFontSize: (payload: number) => void;
  setTextAlign: (payload: "left" | "center" | "right") => void;
  setTextStyle: (payload: "normal" | "glitch" | "neon") => void;
  setScale: (payload: number) => void;
  setTranslateX: (payload: number) => void;
  setTranslateY: (payload: number) => void;
  resetFilters: () => void;
};
