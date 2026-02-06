import { memo } from "react";
import { SidebarProps, EditorMode } from "../types/global";
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
  return (
    <aside className="sidebar">
      <h1>Controles</h1>

      <div className="control-group">
        <label>Modo</label>
        <select
          value={mode}
          onChange={(e) => actions.setMode(e.target.value as EditorMode)}
          className="input-field">
          <option value="upload">Subir Imagen</option>
          <option value="canvas">Modo Creativo</option>
        </select>
      </div>

      {mode === "upload" ? (
        <ImageUploader onImageUpload={actions.handleImageUpload} />
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

      <RangeControl
        label={`Padding: ${values.padding}px`}
        value={values.padding}
        onChange={actions.setPadding}
      />

      <RangeControl
        label={`Radio (Imagen): ${values.borderRadius}px`}
        value={values.borderRadius}
        onChange={actions.setBorderRadius}
      />

      <RangeControl
        label={`Radio (Marco): ${values.frameRadius}px`}
        value={values.frameRadius}
        onChange={actions.setFrameRadius}
      />

      <RangeControl
        label={`Escala: ${values.scale.toFixed(1)}x`}
        value={values.scale}
        min={0.5}
        max={2}
        step={0.1}
        onChange={actions.setScale}
      />

      <RangeControl
        label={`Sombra: ${values.shadow}px`}
        value={values.shadow}
        onChange={actions.setShadow}
      />

      <div className="control-group">
        <label>Color de Sombra</label>
        <div className="color-picker-wrapper">
          <input
            type="color"
            className="color-input"
            value={values.shadowColor} // Assuming hex for input color, might need conversion if rgba
            onChange={(e) => actions.setShadowColor(e.target.value)}
          />
          <span className="color-value">{values.shadowColor}</span>
        </div>
      </div>

      <RangeControl
        label={`Rotación X: ${values.rotateX}°`}
        value={values.rotateX}
        min={-45}
        max={45}
        onChange={actions.setRotateX}
      />

      <RangeControl
        label={`Rotación Y: ${values.rotateY}°`}
        value={values.rotateY}
        min={-45}
        max={45}
        onChange={actions.setRotateY}
      />

      <button className="upload-btn" onClick={actions.handleExport}>
        Exportar PNG
      </button>
    </aside>
  );
});

export default Sidebar;
