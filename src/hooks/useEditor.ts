import { useReducer, useRef, useCallback } from "react";
import { EditorMode, EditorState, EditorAction } from "../types/global";
import { exportImage } from "../services/imageExporter";
import { toast } from "sonner";

const initialState: EditorState = {
  imageUrl: null,
  bgColor: "#000000",
  padding: 40,
  borderRadius: 12,
  frameRadius: 24,
  frameShadow: 0,
  imageShadow: 0,
  frameShadowColor: "#000000",
  imageShadowColor: "#000000",
  rotateX: 0,
  rotateY: 0,
  imageOpacity: 100,
  mode: "upload",
  textContent: "Escribe algo épico",
  isLoading: false,
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
    case "SET_FRAME_SHADOW":
      return { ...state, frameShadow: action.payload };
    case "SET_IMAGE_SHADOW":
      return { ...state, imageShadow: action.payload };
    case "SET_FRAME_SHADOW_COLOR":
      return { ...state, frameShadowColor: action.payload };
    case "SET_IMAGE_SHADOW_COLOR":
      return { ...state, imageShadowColor: action.payload };
    case "SET_ROTATE_X":
      return { ...state, rotateX: action.payload };
    case "SET_ROTATE_Y":
      return { ...state, rotateY: action.payload };
    case "SET_IMAGE_OPACITY":
      return { ...state, imageOpacity: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_TEXT_CONTENT":
      return { ...state, textContent: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
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
  const setFrameShadow = useCallback(
    (payload: number) => dispatch({ type: "SET_FRAME_SHADOW", payload }),
    [],
  );
  const setImageShadow = useCallback(
    (payload: number) => dispatch({ type: "SET_IMAGE_SHADOW", payload }),
    [],
  );
  const setFrameShadowColor = useCallback(
    (payload: string) => dispatch({ type: "SET_FRAME_SHADOW_COLOR", payload }),
    [],
  );
  const setImageShadowColor = useCallback(
    (payload: string) => dispatch({ type: "SET_IMAGE_SHADOW_COLOR", payload }),
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
  const setImageOpacity = useCallback(
    (payload: number) => dispatch({ type: "SET_IMAGE_OPACITY", payload }),
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

  const handleUrlImport = useCallback(
    async (url: string) => {
      if (!url) return;

      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const encodedUrl = encodeURIComponent(url);
        const response = await fetch(
          `https://api.microlink.io/?url=${encodedUrl}&screenshot=true&meta=false&colorScheme=dark&viewport.width=1280&viewport.height=800`,
        );
        const data = await response.json();

        if (data.status === "success" && data.data.screenshot?.url) {
          setImageUrl(data.data.screenshot.url);
          toast.success("Captura importada correctamente");
          // dispatch({ type: "SET_MODE", payload: "canvas" }); // Eliminado para mantener la vista de imagen
        } else {
          toast.error("No se pudo capturar la imagen");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al conectar con el servicio de captura");
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
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
      setFrameShadow,
      setImageShadow,
      setFrameShadowColor,
      setImageShadowColor,
      setRotateX,
      setRotateY,
      setImageOpacity,
      setMode,
      setTextContent,
      handleImageUpload,
      handleUrlImport,
      handleExport,
    },
  };
};
