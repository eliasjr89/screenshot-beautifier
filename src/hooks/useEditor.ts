import { useCallback, useReducer, useRef } from "react";
import { toast } from "sonner";
import { exportImage } from "@/services/imageExporter";
import { downscaleImage } from "@/utils/imageUtils";
import {
  EditorMode,
  EditorState,
  EditorAction,
  fontFamily,
} from "@/types/global";

const initialState: EditorState = {
  imageUrl: null,
  bgColor: "#000000",
  padding: 0,
  borderRadius: 0,
  frameRadius: 0,
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
  fontFamily: "inter",
  // Valores iniciales Filtros (Bipolares: 0 es el centro/original)
  filterBrightness: 0,
  filterContrast: 0,
  filterSaturation: 0,
  filterBlur: 0,
  // Valores iniciales Efectos
  effectNoise: 0,
  effectReflection: 0,
  isNeonMode: false,
  // Valores iniciales Texto
  textColor: "#ffffff",
  fontSize: 24,
  textAlign: "center",
  textStyle: "normal",
  scale: 1,
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
    case "SET_FONT_FAMILY":
      return { ...state, fontFamily: action.payload };
    case "SET_FILTER_BRIGHTNESS":
      return { ...state, filterBrightness: action.payload };
    case "SET_FILTER_CONTRAST":
      return { ...state, filterContrast: action.payload };
    case "SET_FILTER_SATURATION":
      return { ...state, filterSaturation: action.payload };
    case "SET_FILTER_BLUR":
      return { ...state, filterBlur: action.payload };
    case "SET_EFFECT_NOISE":
      return { ...state, effectNoise: action.payload };
    case "SET_EFFECT_REFLECTION":
      return { ...state, effectReflection: action.payload };
    case "SET_IS_NEON_MODE":
      return { ...state, isNeonMode: action.payload };
    case "SET_TEXT_COLOR":
      return { ...state, textColor: action.payload };
    case "SET_FONT_SIZE":
      return { ...state, fontSize: action.payload };
    case "SET_TEXT_ALIGN":
      return { ...state, textAlign: action.payload };
    case "SET_TEXT_STYLE":
      return { ...state, textStyle: action.payload };
    case "SET_SCALE":
      return { ...state, scale: action.payload };
    case "RESET_IMAGE_STATE":
      return {
        ...initialState,
        imageUrl: state.imageUrl,
        mode: state.mode, // Preservamos el modo actual (upload/canvas)
      };
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

  const handleExport = useCallback(() => {
    exportImage(frameRef.current);
  }, []);

  const setFontFamily = useCallback(
    (payload: fontFamily) => dispatch({ type: "SET_FONT_FAMILY", payload }),
    [],
  );

  const setFilterBrightness = useCallback(
    (payload: number) => dispatch({ type: "SET_FILTER_BRIGHTNESS", payload }),
    [],
  );
  const setFilterContrast = useCallback(
    (payload: number) => dispatch({ type: "SET_FILTER_CONTRAST", payload }),
    [],
  );
  const setFilterSaturation = useCallback(
    (payload: number) => dispatch({ type: "SET_FILTER_SATURATION", payload }),
    [],
  );
  const setFilterBlur = useCallback(
    (payload: number) => dispatch({ type: "SET_FILTER_BLUR", payload }),
    [],
  );
  const setEffectNoise = useCallback(
    (payload: number) => dispatch({ type: "SET_EFFECT_NOISE", payload }),
    [],
  );
  const setEffectReflection = useCallback(
    (payload: number) => dispatch({ type: "SET_EFFECT_REFLECTION", payload }),
    [],
  );
  const setIsNeonMode = useCallback(
    (payload: boolean) => dispatch({ type: "SET_IS_NEON_MODE", payload }),
    [],
  );
  const setTextColor = useCallback(
    (payload: string) => dispatch({ type: "SET_TEXT_COLOR", payload }),
    [],
  );
  const setFontSize = useCallback(
    (payload: number) => dispatch({ type: "SET_FONT_SIZE", payload }),
    [],
  );
  const setTextAlign = useCallback(
    (payload: "left" | "center" | "right") =>
      dispatch({ type: "SET_TEXT_ALIGN", payload }),
    [],
  );
  const setTextStyle = useCallback(
    (payload: "normal" | "glitch" | "neon") =>
      dispatch({ type: "SET_TEXT_STYLE", payload }),
    [],
  );
  const setScale = useCallback(
    (payload: number) => dispatch({ type: "SET_SCALE", payload }),
    [],
  );
  const resetFilters = useCallback(
    () => dispatch({ type: "RESET_IMAGE_STATE" }),
    [],
  );

  const handleImageUpload = useCallback(
    async (image: File) => {
      if (image) {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
          // Optimizar imagen si es muy grande (max 2048px)
          const optimizedUrl = await downscaleImage(image);
          // Reiniciar filtros y transformación al cargar nueva imagen
          dispatch({ type: "RESET_IMAGE_STATE" });
          setImageUrl(optimizedUrl);
          toast.success("Imagen subida correctamente");
        } catch (error) {
          console.error("Error procesando imagen:", error);
          toast.error("Error al procesar la imagen");
          // Fallback a la original si falla algo
          setImageUrl(URL.createObjectURL(image));
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
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
          // Reiniciar filtros y transformación
          dispatch({ type: "RESET_IMAGE_STATE" });
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
      setFontFamily,
      setFilterBrightness,
      setFilterContrast,
      setFilterSaturation,
      setFilterBlur,
      setEffectNoise,
      setEffectReflection,
      setIsNeonMode,
      setTextColor,
      setFontSize,
      setTextAlign,
      setTextStyle,
      setScale,
      resetFilters,
    },
  };
};
