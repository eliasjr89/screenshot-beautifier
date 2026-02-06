import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportImage = async (element: HTMLElement | null) => {
  if (!element) {
    toast.error("Error: No se encontró el marco");
    return;
  }

  const toastId = toast.loading("Exportando...");

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
    });

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "screenshot.png";
    link.click();
    toast.success("Exportado correctamente", { id: toastId });
  } catch (error) {
    console.error(error);
    toast.error("Error al exportar", { id: toastId });
  }
};
