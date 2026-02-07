import { memo, useRef } from "react";
import { ImageUploaderProps } from "../types/global";

const ImageUploader = memo(({ onImageUpload }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden-input"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <button className="upload-btn" onClick={handleButtonClick}>
        Sube una imagen
      </button>
    </div>
  );
});

export default ImageUploader;
