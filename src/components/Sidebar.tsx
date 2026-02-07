import { memo, useState } from "react";
import { SidebarProps } from "../types/global";
import { EditorMode } from "../types/global";
import CustomSelect from "./CustomSelect";
import ImageUploader from "./ImageUploader";

const RangeControl = memo(
  ({
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    onChange,
  }: {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (val: number) => void;
  }) => (
    <div className="control-group">
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  ),
);

const Sidebar = memo(({ mode, values, actions }: SidebarProps) => {
  const [urlInput, setUrlInput] = useState("");
  return (
    <aside className="sidebar">
      <h1>Controles</h1>

      <div className="control-group">
        <label>Modo</label>
        <CustomSelect
          value={mode}
          onChange={(value) => actions.setMode(value as EditorMode)}
          options={[
            { value: "upload", label: "Subir Imagen" },
            { value: "canvas", label: "Modo Creativo" },
          ]}
        />
      </div>

      {mode === "upload" ? (
        <>
          <ImageUploader onImageUpload={actions.handleImageUpload} />

          <div className="control-group" style={{ marginTop: "2rem" }}>
            <label>O importa desde URL</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="url"
                placeholder="https://microlink.io"
                className="input-field"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button
                className="action-button"
                disabled={values.isLoading || !urlInput}
                onClick={() => actions.handleUrlImport(urlInput)}
                style={{ width: "auto" }}>
                {values.isLoading ? "..." : "Go"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="control-group">
          <label>Texto</label>
          <input
            type="text"
            className="input-field"
            value={values.textContent}
            onChange={(e) => actions.setTextContent(e.target.value)}
          />
        </div>
      )}

      <div className="control-group">
        <label>Color de fondo</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            className="color-input"
            value={values.bgColor}
            onChange={(e) => actions.setBgColor(e.target.value)}
          />
          <span className="color-value">{values.bgColor}</span>
        </div>
      </div>

      <div className="controls-row">
        <RangeControl
          label={`Padding: ${values.padding}`}
          value={values.padding}
          onChange={actions.setPadding}
        />

        <RangeControl
          label={`Opacidad: ${values.imageOpacity}%`}
          value={values.imageOpacity}
          min={0}
          max={100}
          onChange={actions.setImageOpacity}
        />
      </div>

      <div className="controls-row">
        <RangeControl
          label={`R-Img: ${values.borderRadius}`}
          value={values.borderRadius}
          onChange={actions.setBorderRadius}
        />

        <RangeControl
          label={`R-Fme: ${values.frameRadius}`}
          value={values.frameRadius}
          onChange={actions.setFrameRadius}
        />
      </div>

      <div className="controls-row">
        <RangeControl
          label={`S-Marco: ${values.frameShadow}px`}
          value={values.frameShadow}
          onChange={actions.setFrameShadow}
        />

        <RangeControl
          label={`S-Img: ${values.imageShadow}px`}
          value={values.imageShadow}
          onChange={actions.setImageShadow}
        />
      </div>

      <div className="controls-row">
        <div className="control-group">
          <label>C-Marco</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              className="color-input"
              value={values.frameShadowColor}
              onChange={(e) => actions.setFrameShadowColor(e.target.value)}
            />
          </div>
        </div>

        <div className="control-group">
          <label>C-Img</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              className="color-input"
              value={values.imageShadowColor}
              onChange={(e) => actions.setImageShadowColor(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="controls-row">
        <RangeControl
          label={`Rot X: ${values.rotateX}°`}
          value={values.rotateX}
          min={-180}
          max={180}
          onChange={actions.setRotateX}
        />

        <RangeControl
          label={`Rot Y: ${values.rotateY}°`}
          value={values.rotateY}
          min={-180}
          max={180}
          onChange={actions.setRotateY}
        />
      </div>

      <button className="upload-btn" onClick={actions.handleExport}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "8px" }}>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        Exportar PNG
      </button>
    </aside>
  );
});

export default Sidebar;
