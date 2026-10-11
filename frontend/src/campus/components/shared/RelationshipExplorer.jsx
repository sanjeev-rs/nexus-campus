import { useMemo, useState } from "react";
import { ChevronRight, ExternalLink, Filter, Network, Search, Sparkles } from "lucide-react";

export default function RelationshipExplorer({
  nodes = [],
  edges = [],
  initialSelectedId,
  onNodeSelect,
  title = "Interactive Knowledge Topology",
  onNavigateEntity,
}) {
  const [selectedId, setSelectedId] = useState(
    initialSelectedId || (nodes[0] ? nodes[0].id : "")
  );
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const types = useMemo(() => {
    const set = new Set(nodes.map((n) => n.group || n.type || "Entity"));
    return ["All", ...Array.from(set)];
  }, [nodes]);

  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => {
      const nodeType = n.group || n.type || "";
      const matchesType = filterType === "All" || nodeType.toLowerCase() === filterType.toLowerCase();
      const label = (n.label || n.name || "").toLowerCase();
      const matchesSearch = !searchTerm || label.includes(searchTerm.toLowerCase().trim());
      return matchesType && matchesSearch;
    });
  }, [nodes, filterType, searchTerm]);

  const selectedNode = useMemo(() => {
    return nodes.find((n) => n.id === selectedId) || nodes[0] || null;
  }, [nodes, selectedId]);

  const activeEdges = useMemo(() => {
    if (!selectedNode) return [];
    return edges.filter(
      (e) => e.source === selectedNode.id || e.target === selectedNode.id
    );
  }, [edges, selectedNode]);

  const handleSelect = (node) => {
    setSelectedId(node.id);
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  };

  const getNodeColors = (type = "") => {
    const t = type.toLowerCase();
    if (t.includes("dept") || t.includes("department")) {
      return { bg: "#eff6ff", text: "#1d4ed8", border: "#93c5fd", dot: "#3b82f6" };
    }
    if (t.includes("fac") || t.includes("faculty")) {
      return { bg: "#f5f3ff", text: "#6d28d9", border: "#c4b5fd", dot: "#8b5cf6" };
    }
    if (t.includes("stu") || t.includes("student")) {
      return { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0", dot: "#10b981" };
    }
    if (t.includes("proj") || t.includes("project")) {
      return { bg: "#fffbeb", text: "#b45309", border: "#fde68a", dot: "#f59e0b" };
    }
    if (t.includes("skill")) {
      return { bg: "#fdf4ff", text: "#a21caf", border: "#f5d0fe", dot: "#d946ef" };
    }
    if (t.includes("fail") || t.includes("failure")) {
      return { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca", dot: "#ef4444" };
    }
    if (t.includes("tech") || t.includes("research")) {
      return { bg: "#f0fdfa", text: "#0f766e", border: "#99f6e4", dot: "#14b8a6" };
    }
    return { bg: "#f8fafc", text: "#1e293b", border: "#cbd5e1", dot: "#64748b" };
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px", alignItems: "flex-start" }}>
      {/* CANVAS / TOPOLOGY */}
      <div
        className="intel-card"
        style={{
          margin: 0,
          minHeight: "560px",
          background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f4f8fd 100%)",
          border: "1.5px solid #d4e2f0",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Network size={18} color="#2563eb" />
              <strong style={{ fontSize: "1rem", color: "#102544" }}>{title}</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="text"
                  placeholder="Filter nodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "6px 10px 6px 30px",
                    fontSize: "0.8rem",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* FILTER PILLS */}
          <div className="intel-pill-filters" style={{ marginBottom: "20px" }}>
            {types.map((t) => (
              <button
                key={t}
                type="button"
                className={`intel-pill ${filterType === t ? "active" : ""}`}
                onClick={() => setFilterType(t)}
                style={{ fontSize: "0.76rem", padding: "4px 10px" }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* INTERACTIVE NODES CLUSTER */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 16px",
              minHeight: "320px",
            }}
          >
            {filteredNodes.map((node) => {
              const isSelected = selectedNode && selectedNode.id === node.id;
              const type = node.group || node.type || "";
              const colors = getNodeColors(type);

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleSelect(node)}
                  style={{
                    background: isSelected ? "#102544" : colors.bg,
                    color: isSelected ? "#ffffff" : colors.text,
                    border: `1.5px solid ${isSelected ? "#102544" : colors.border}`,
                    borderRadius: "99px",
                    padding: "8px 16px",
                    fontFamily: "inherit",
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? "0 4px 16px rgba(16, 37, 68, 0.35)"
                      : "0 2px 5px rgba(0,0,0,0.03)",
                    transform: isSelected ? "scale(1.08)" : "scale(1)",
                    transition: "all 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: isSelected ? "#38bdf8" : colors.dot,
                    }}
                  />
                  <span>{node.label || node.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "14px",
            fontSize: "0.78rem",
            color: "#64748b",
          }}
        >
          <span>Showing {filteredNodes.length} of {nodes.length} nodes</span>
          <span style={{ color: "#2563eb", fontWeight: 600 }}>Active Edges: {activeEdges.length}</span>
        </div>
      </div>

      {/* INSPECTOR PANEL */}
      <div className="intel-card" style={{ margin: 0, padding: "24px" }}>
        {selectedNode ? (
          <div>
            <div className="intel-eyebrow">NODE INSPECTION</div>
            <h2 style={{ fontSize: "1.25rem", color: "#102544", margin: "4px 0 6px" }}>
              {selectedNode.label || selectedNode.name}
            </h2>
            <div style={{ marginBottom: "16px" }}>
              <span className="intel-badge info">
                {selectedNode.group || selectedNode.type || "Entity"}
              </span>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <strong
                style={{
                  display: "block",
                  fontSize: "0.76rem",
                  color: "#64748b",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Connected Relationships ({activeEdges.length})
              </strong>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {activeEdges.length > 0 ? (
                  activeEdges.map((e, idx) => {
                    const isOutgoing = e.source === selectedNode.id;
                    const otherId = isOutgoing ? e.target : e.source;
                    const otherNode = nodes.find((n) => n.id === otherId);

                    return (
                      <div
                        key={idx}
                        onClick={() => otherNode && handleSelect(otherNode)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: "8px",
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          fontSize: "0.82rem",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "2px" }}>
                          {isOutgoing ? `[${selectedNode.label || selectedNode.name}] --(${e.label})-->` : `[${e.label}] <--`}
                        </div>
                        <strong style={{ color: "#2563eb", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span>{otherNode?.label || otherNode?.name || otherId}</span>
                          <ChevronRight size={13} />
                        </strong>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontStyle: "italic", padding: "12px 0" }}>
                    No direct edges recorded for this node.
                  </div>
                )}
              </div>
            </div>

            {onNavigateEntity && (
              <button
                type="button"
                className="intel-btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => onNavigateEntity(selectedNode)}
              >
                <span>Explore Full Dossier</span>
                <ExternalLink size={14} />
              </button>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#64748b", padding: "40px 0" }}>
            Select a node to inspect its ontology links.
          </div>
        )}
      </div>
    </div>
  );
}

