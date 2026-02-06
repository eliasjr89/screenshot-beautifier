import { useReducer, useRef, useCallback } from "react";
import { EditorMode } from "../types/global";
import { exportImage } from "../services/imageExporter";
import { toast } from "sonner";

type EditorState = {
  imageUrl: string | null;
  bgColor: string;
  padding: number;
  borderRadius: number;
  frameRadius: number;
  shadow: number;
  shadowColor: string;
  tilt: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  mode: EditorMode;
  textContent: string;
};

type EditorAction =
  | { type: "SET_IMAGE"; payload: string | null }
  | { type: "SET_BG_COLOR"; payload: string }
  | { type: "SET_PADDING"; payload: number }
  | { type: "SET_BORDER_RADIUS"; payload: number }
  | { type: "SET_FRAME_RADIUS"; payload: number }
  | { type: "SET_SHADOW"; payload: number }
  | { type: "SET_SHADOW_COLOR"; payload: string }
  | { type: "SET_TILT"; payload: number }
  | { type: "SET_ROTATE_X"; payload: number }
  | { type: "SET_ROTATE_Y"; payload: number }
  | { type: "SET_SCALE"; payload: number }
  | { type: "SET_MODE"; payload: EditorMode }
  | { type: "SET_TEXT_CONTENT"; payload: string };

const initialState: EditorState = {
  imageUrl: null,
  bgColor: "#000000ff",
  padding: 40,
  borderRadius: 12,
  frameRadius: 24,
  shadow: 0,
  shadowColor: "rgba(0,0,0,0.5)",
  tilt: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  mode: "upload",
  textContent: "Escribe algo épico",
};

const editorReducer = (
  state: EditorState,
  action: EditorAction,
): EditorState => {
  switch (action.type) {
    case "SET_IMAGE":
      return { ...state, imageUrl: action.payload };
    case "SET_BG_COLOR":
      return { ...state, bgColor: action.payload };
    case "SET_PADDING":
      return { ...state, padding: action.payload };
    case "SET_BORDER_RADIUS":
      return { ...state, borderRadius: action.payload };
    case "SET_FRAME_RADIUS":
      return { ...state, frameRadius: action.payload };
    case "SET_SHADOW":
      return { ...state, shadow: action.payload };
    case "SET_SHADOW_COLOR":
      return { ...state, shadowColor: action.payload };
    case "SET_TILT":
      return { ...state, tilt: action.payload, rotateY: action.payload };
    case "SET_ROTATE_X":
      return { ...state, rotateX: action.payload };
    case "SET_ROTATE_Y":
      return { ...state, rotateY: action.payload, tilt: action.payload };
    case "SET_SCALE":
      return { ...state, scale: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_TEXT_CONTENT":
      return { ...state, textContent: action.payload };
    default:
      return state;
  }
};

export const useEditor = () => {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const frameRef = useRef<HTMLDivElement>(null);

  const setImageUrl = useCallback(
    (payload: string | null) => dispatch({ type: "SET_IMAGE", payload }),
    [],
  );
  const setBgColor = useCallback(
    (payload: string) => dispatch({ type: "SET_BG_COLOR", payload }),
    [],
  );
  const setPadding = useCallback(
    (payload: number) => dispatch({ type: "SET_PADDING", payload }),
    [],
  );
  const setBorderRadius = useCallback(
    (payload: number) => dispatch({ type: "SET_BORDER_RADIUS", payload }),
    [],
  );
  const setFrameRadius = useCallback(
    (payload: number) => dispatch({ type: "SET_FRAME_RADIUS", payload }),
    [],
  );
  const setShadow = useCallback(
    (payload: number) => dispatch({ type: "SET_SHADOW", payload }),
    [],
  );
  const setShadowColor = useCallback(
    (payload: string) => dispatch({ type: "SET_SHADOW_COLOR", payload }),
    [],
  );
  const setTilt = useCallback(
    (payload: number) => dispatch({ type: "SET_TILT", payload }),
    [],
  );
  const setRotateX = useCallback(
    (payload: number) => dispatch({ type: "SET_ROTATE_X", payload }),
    [],
  );
  const setRotateY = useCallback(
    (payload: number) => dispatch({ type: "SET_ROTATE_Y", payload }),
    [],
  );
  const setScale = useCallback(
    (payload: number) => dispatch({ type: "SET_SCALE", payload }),
    [],
  );
  const setMode = useCallback(
    (payload: EditorMode) => dispatch({ type: "SET_MODE", payload }),
    [],
  );
  const setTextContent = useCallback(
    (payload: string) => dispatch({ type: "SET_TEXT_CONTENT", payload }),
    [],
  );

  const handleImageUpload = useCallback(
    (image: File) => {
      if (image) {
        setImageUrl(URL.createObjectURL(image));
        toast.success("Imagen subida correctamente");
      }
    },
    [setImageUrl],
  );

  const handleExport = useCallback(() => {
    exportImage(frameRef.current);
  }, []);

  return {
    state,
    frameRef,
    actions: {
      setImageUrl,
      setBgColor,
      setPadding,
      setBorderRadius,
      setFrameRadius,
      setShadow,
      setShadowColor,
      setTilt,
      setRotateX,
      setRotateY,
      setScale,
      setMode,
      setTextContent,
      handleImageUpload,
      handleExport,
    },
  };
};
