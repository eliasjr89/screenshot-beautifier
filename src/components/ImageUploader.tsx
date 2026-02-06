import { memo } from "react";
import { ImageUploaderProps } from "../types/global";

const ImageUploader = memo(({ onImageUpload }: ImageUploaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };
  return (
    <div className="upload-container">
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        className="hidden-input"
        onChange={handleChange}
      />
      <label htmlFor="image-upload" className="upload-btn">
        Sube una imagen
      </label>
    </div>
  );
});

export default ImageUploader;
