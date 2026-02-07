/**
 * Redimensiona una imagen si excede las dimensiones máximas especificadas.
 * Mantiene la relación de aspecto.
 * @param file Archivo de imagen original
 * @param maxWidth Ancho máximo permitido (default: 2048)
 * @param maxHeight Alto máximo permitido (default: 2048)
 * @param quality Calidad de la imagen resultante (0-1) (default: 0.9)
 * @returns Promesa que resuelve con la URL de la imagen (original o redimensionada)
 */
export const downscaleImage = (
  file: File,
  maxWidth = 2048,
  maxHeight = 2048,
  quality = 0.9,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let { width, height } = img;

        // Si la imagen es más pequeña que los límites, devolver la original
        if (width <= maxWidth && height <= maxHeight) {
          resolve(img.src);
          return;
        }

        // Calcular nuevas dimensiones manteniendo aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto del canvas"));
          return;
        }

        // Mejorar calidad de escalado
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a JPEG para mejor compresión (o mantener formato si es transparente)
        // Por simplicidad y soporte, usamos JPEG por defecto si no hay transparencia obvia,
        // pero PNG/WebP son opciones. Aquí usaremos el tipo del archivo original si es posible,
        // o JPEG como fallback seguro.
        // Nota: canvas.toDataURL usa image/png por defecto si no se especifica.
        const type = file.type === "image/png" ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(type, quality);

        resolve(dataUrl);
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
};
