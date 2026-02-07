import { memo } from "react";

type ColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export const ColorPicker = memo(({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="color-picker-wrapper">
      <input
        type="color"
        className="color-input"
        value={value.startsWith("#") ? value : "#000000"}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="text"
        className="color-code-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
});
