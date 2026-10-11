import { useEffect } from "react";
import { X } from "lucide-react";

export default function EntityDrawer({
  isOpen,
  onClose,
  eyebrow = "INTELLIGENCE DOSSIER",
  title,
  subtitle,
  avatar,
  avatarGradient = "linear-gradient(135deg, #1d4ed8, #2563eb)",
  children,
  footer,
  width = "540px",
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="intel-drawer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="intel-drawer"
        style={{ width: `min(${width}, 100vw)` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="intel-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
            {avatar && (
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: avatarGradient,
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
                }}
              >
                {avatar}
              </div>
            )}
            <div style={{ minWidth: 0 }}>
              {eyebrow && <div className="intel-eyebrow">{eyebrow}</div>}
              <h2
                style={{
                  margin: "2px 0 0",
                  fontSize: "1.25rem",
                  color: "#102544",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "2px" }}>
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="intel-drawer-close"
            aria-label="Close dossier"
          >
            <X size={18} />
          </button>
        </div>

        <div className="intel-drawer-body">{children}</div>

        {footer && <div className="intel-drawer-footer">{footer}</div>}
      </div>
    </div>
  );
}

