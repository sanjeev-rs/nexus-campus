import { Search, X } from "lucide-react";

export default function IntelligenceFilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Search intelligence records...",
  pills = [],
  activePill,
  onPillSelect,
  actions,
  className = "",
  totalCount,
  filteredCount,
}) {
  return (
    <div className={`intel-filter-bar ${className}`}>
      {onSearchChange !== undefined && (
        <div className="intel-search-box">
          <Search size={16} color="#64748b" aria-hidden="true" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={searchPlaceholder}
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              style={{
                background: "none",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {pills.length > 0 && (
        <div className="intel-pill-filters" role="tablist">
          {pills.map((pill) => {
            const key = typeof pill === "string" ? pill : pill.id;
            const label = typeof pill === "string" ? pill : pill.label;
            const count = typeof pill === "object" ? pill.count : undefined;
            const isActive = activePill === key;

            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`intel-pill ${isActive ? "active" : ""}`}
                onClick={() => onPillSelect && onPillSelect(key)}
              >
                <span>{label}</span>
                {count !== undefined && (
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "0.72rem",
                      padding: "1px 6px",
                      borderRadius: "99px",
                      background: isActive ? "rgba(255,255,255,0.25)" : "#e2e8f0",
                      color: isActive ? "#ffffff" : "#475569",
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {actions && <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "auto" }}>{actions}</div>}

      {totalCount !== undefined && filteredCount !== undefined && filteredCount !== totalCount && (
        <div style={{ fontSize: "0.8rem", color: "#64748b", marginLeft: "auto" }}>
          Showing {filteredCount} of {totalCount} records
        </div>
      )}
    </div>
  );
}
