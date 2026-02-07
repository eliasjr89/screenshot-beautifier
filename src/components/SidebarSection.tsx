import { useState, ReactNode } from "react";

type SidebarSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

const SidebarSection = ({
  title,
  children,
  defaultOpen = false,
}: SidebarSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`sidebar-section ${isOpen ? "open" : ""}`}>
      <div
        className="sidebar-section-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}>
        <span className="section-title">{title}</span>
        <svg
          className={`section-arrow ${isOpen ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <div className="sidebar-section-content">{isOpen && children}</div>
    </div>
  );
};

export default SidebarSection;
