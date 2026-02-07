import { memo, useState, useRef, useEffect, KeyboardEvent } from "react";

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

const CustomSelect = memo(({ value, onChange, options }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const index = options.findIndex((opt) => opt.value === value);
      setHighlightedIndex(index >= 0 ? index : 0);
    }
  }, [isOpen, value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen) {
          onChange(options[highlightedIndex].value);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        const currentDown = options.findIndex((opt) => opt.value === value);
        const nextIndex = (currentDown + 1) % options.length;
        onChange(options[nextIndex].value);
        setHighlightedIndex(nextIndex);
        if (!isOpen) setIsOpen(true);
        break;
      case "ArrowUp":
        e.preventDefault();
        const currentUp = options.findIndex((opt) => opt.value === value);
        const prevIndex = (currentUp - 1 + options.length) % options.length;
        onChange(options[prevIndex].value);
        setHighlightedIndex(prevIndex);
        if (!isOpen) setIsOpen(true);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      className="custom-select"
      ref={selectRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="select-options"
      aria-label="Seleccionar modo">
      <div
        className={`custom-select-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedOption?.label || "Seleccionar..."}</span>
        <svg
          className="custom-select-arrow"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L1 4h10z" fill="currentColor" />
        </svg>
      </div>

      {isOpen && (
        <div
          className="custom-select-options"
          role="listbox"
          id="select-options"
          ref={listRef}>
          {options.map((option, index) => (
            <div
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              id={`option-${option.value}`}
              className={`custom-select-option ${
                option.value === value ? "selected" : ""
              } ${index === highlightedIndex ? "highlighted" : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}>
              {option.label}
              {option.value === value && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.5 4.5L6 12L2.5 8.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default CustomSelect;
