import { memo, useState } from "react";
import { SidebarProps } from "../types/global";
import { EditorMode } from "../types/global";
import CustomSelect from "./CustomSelect";
import { ColorPicker } from "./ColorPicker";
import ImageUploader from "./ImageUploader";
import SidebarSection from "./SidebarSection";

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
      <h1>Ajustes</h1>

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

          <div className="control-group" style={{ marginTop: "1rem" }}>
            <label>O importa desde URL</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="url"
                placeholder="https://microlink.io"
                className="input-field"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && urlInput) {
                    actions.handleUrlImport(urlInput);
                  }
                }}
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
        <>
          <SidebarSection title="📝 Texto" defaultOpen={true}>
            <div className="control-group">
              <label>Contenido</label>
              <input
                type="text"
                className="input-field"
                value={values.textContent}
                onChange={(e) => actions.setTextContent(e.target.value)}
              />
            </div>
            <div className="controls-row">
              <div className="control-group">
                <label>Color</label>
                <ColorPicker
                  value={values.textColor}
                  onChange={actions.setTextColor}
                />
              </div>
              <div className="control-group">
                <label>Estilo</label>
                <CustomSelect
                  value={values.textStyle}
                  onChange={(value) => actions.setTextStyle(value as any)}
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "glitch", label: "⚡ Glitch" },
                    { value: "neon", label: "🔮 Neón" },
                  ]}
                />
              </div>
            </div>
            <div className="controls-row">
              <div className="control-group">
                <label>Alineación</label>
                <CustomSelect
                  value={values.textAlign}
                  onChange={(value) => actions.setTextAlign(value as any)}
                  options={[
                    { value: "left", label: "Izq" },
                    { value: "center", label: "Cen" },
                    { value: "right", label: "Der" },
                  ]}
                />
              </div>
              <RangeControl
                label={`Tam: ${values.fontSize}px`}
                value={values.fontSize}
                min={12}
                max={120}
                onChange={actions.setFontSize}
              />
            </div>
            <div className="control-group">
              <label>Tipografía</label>
              <CustomSelect
                value={values.fontFamily}
                onChange={(value) => actions.setFontFamily(value as any)}
                options={[
                  { value: "inter", label: "Inter" },
                  { value: "serif", label: "Merriweather" },
                  { value: "mono", label: "JetBrains Mono" },
                  { value: "cursive", label: "Pacifico" },
                  { value: "comic", label: "Bangers" },
                  { value: "retro", label: "Press Start 2P" },
                  { value: "display", label: "Abril Fatface" },
                  { value: "scifi", label: "Space Mono" },
                ]}
              />
            </div>
          </SidebarSection>
        </>
      )}

      {/* Secciones Colapsables */}

      <SidebarSection title="🎨 Lienzo" defaultOpen={true}>
        <div className="control-row-group">
          <div className="control-group">
            <label>Color de fondo</label>
            <ColorPicker value={values.bgColor} onChange={actions.setBgColor} />
          </div>
          <RangeControl
            label={`Padding: ${values.padding}`}
            value={values.padding}
            onChange={actions.setPadding}
          />
        </div>

        <div className="sub-section-title">Marco</div>
        <RangeControl
          label={`Radio Marco: ${values.frameRadius}`}
          value={values.frameRadius}
          onChange={actions.setFrameRadius}
        />
        <div className="controls-row">
          <RangeControl
            label={`Sombra: ${values.frameShadow}px`}
            value={values.frameShadow}
            onChange={actions.setFrameShadow}
          />
          <div className="control-group">
            <label>Color</label>
            <ColorPicker
              value={values.frameShadowColor}
              onChange={actions.setFrameShadowColor}
            />
          </div>
        </div>

        <div className="sub-section-title">Imagen</div>
        <RangeControl
          label={`Radio Imagen: ${values.borderRadius}`}
          value={values.borderRadius}
          onChange={actions.setBorderRadius}
        />
        <div className="controls-row">
          <RangeControl
            label={`Sombra: ${values.imageShadow}px`}
            value={values.imageShadow}
            onChange={actions.setImageShadow}
          />
          <div className="control-group">
            <label>Color</label>
            <ColorPicker
              value={values.imageShadowColor}
              onChange={actions.setImageShadowColor}
            />
          </div>
        </div>
      </SidebarSection>

      <SidebarSection title="✨ Filtros">
        <div className="controls-row">
          <RangeControl
            label={`Brillo: ${values.filterBrightness}%`}
            value={values.filterBrightness}
            min={-100}
            max={100}
            onChange={actions.setFilterBrightness}
          />
          <RangeControl
            label={`Contraste: ${values.filterContrast}%`}
            value={values.filterContrast}
            min={-100}
            max={100}
            onChange={actions.setFilterContrast}
          />
          <RangeControl
            label={`Saturación: ${values.filterSaturation}%`}
            value={values.filterSaturation}
            min={-100}
            max={100}
            onChange={actions.setFilterSaturation}
          />
          <RangeControl
            label={`Blur: ${values.filterBlur}px`}
            value={values.filterBlur}
            min={0}
            max={20}
            onChange={actions.setFilterBlur}
          />
          <RangeControl
            label={`Opacidad: ${values.imageOpacity}%`}
            value={values.imageOpacity}
            min={0}
            max={100}
            onChange={actions.setImageOpacity}
          />
        </div>
        <button
          className="action-button-subtle"
          onClick={actions.resetFilters}
          style={{ width: "100%", marginTop: "12px", fontSize: "0.75rem" }}>
          重 Restablecer Ajustes
        </button>
      </SidebarSection>

      <SidebarSection title="⚡ Efectos FX">
        <div className="control-group">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}>
            <input
              type="checkbox"
              checked={values.isNeonMode}
              onChange={(e) => actions.setIsNeonMode(e.target.checked)}
              style={{
                width: "20px",
                height: "20px",
                accentColor: "var(--primary)",
              }}
            />
            MODO NEÓN (Glow Intenso)
          </label>
        </div>
        <div className="controls-row">
          <RangeControl
            label={`Ruido: ${values.effectNoise}%`}
            value={values.effectNoise}
            min={0}
            max={100}
            onChange={actions.setEffectNoise}
          />
          <RangeControl
            label={`Reflejo: ${values.effectReflection}%`}
            value={values.effectReflection}
            min={0}
            max={100}
            onChange={actions.setEffectReflection}
          />
        </div>
      </SidebarSection>

      <SidebarSection title="🧊 Transformación 3D">
        <div className="controls-row">
          <RangeControl
            label={`Rot X: ${Math.round(values.rotateX)}°`}
            value={values.rotateX}
            min={-180}
            max={180}
            onChange={actions.setRotateX}
          />

          <RangeControl
            label={`Rot Y: ${Math.round(values.rotateY)}°`}
            value={values.rotateY}
            min={-180}
            max={180}
            onChange={actions.setRotateY}
          />
        </div>
        <RangeControl
          label={`Zoom: ${Math.round(values.scale * 100)}%`}
          value={values.scale}
          min={0.5}
          max={3}
          step={0.1}
          onChange={actions.setScale}
        />
      </SidebarSection>

      <button
        className="upload-btn"
        onClick={actions.handleExport}
        style={{ marginTop: "auto" }}>
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
