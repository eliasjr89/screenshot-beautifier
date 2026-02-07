import { domToPng } from "modern-screenshot";
import { toast } from "sonner";

export const exportImage = async (element: HTMLElement | null) => {
  if (!element) {
    toast.error("Error: No se encontró el marco");
    return;
  }

  const toastId = toast.loading("Exportando...");

  try {
    const dataUrl = await domToPng(element, {
      scale: 1,
      backgroundColor: null,
      features: {
        removeControlCharacter: false,
      },
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `screenshot-${Date.now()}.png`;
    link.click();
    toast.success("Exportado correctamente", { id: toastId });
  } catch (error) {
    console.error(error);
    toast.error("Error al exportar", { id: toastId });
  }
};
