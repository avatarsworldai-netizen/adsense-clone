"use client";

import { useState, useRef, useEffect } from "react";

type EditingField = { key: string; label: string; value: string } | null;

export default function AdminPanel() {
  const [editing, setEditing] = useState<EditingField>(null);
  const [editValue, setEditValue] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen for EDIT_FIELD messages from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "EDIT_FIELD" && e.data.field) {
        const f = e.data.field;
        setEditing(f);
        setEditValue(f.value);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    // Send update to iframe
    iframeRef.current?.contentWindow?.postMessage(
      { type: "UPDATE_FIELD", key: editing.key, value: editValue },
      "*"
    );
    // Save to Supabase
    await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: editing.key, value: editValue }),
    });
    setEditing(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Roboto', Arial, sans-serif" }}>
      {/* Left sidebar */}
      <div style={{ width: 48, backgroundColor: "#1a73e8", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16, flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>A</span>
        </div>
      </div>

      {/* Center: iframe preview */}
      <div style={{ flex: 1, position: "relative" }}>
        <iframe
          ref={iframeRef}
          src="/"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="AdSense Preview"
        />
      </div>

      {/* Right: Editor panel (only visible when editing) */}
      {editing && (
        <div style={{ width: 340, borderLeft: "1px solid #e0e0e0", backgroundColor: "#fff", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #e0e0e0" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#202124", margin: 0 }}>Editar campo</h3>
            <button
              onClick={() => setEditing(null)}
              style={{ background: "none", border: "none", fontSize: 18, color: "#5f6368", cursor: "pointer", padding: 4 }}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#5f6368", textTransform: "uppercase", letterSpacing: 0.5 }}>
              {editing.label}
            </label>
            <input
              autoFocus
              type="text"
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
                // Live update
                iframeRef.current?.contentWindow?.postMessage(
                  { type: "UPDATE_FIELD", key: editing.key, value: e.target.value },
                  "*"
                );
              }}
              onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
              style={{
                width: "100%",
                border: "1px solid #dadce0",
                borderRadius: 4,
                padding: "10px 12px",
                fontSize: 14,
                color: "#202124",
                marginTop: 8,
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            {/* Info */}
            <div style={{ marginTop: 16, padding: 12, backgroundColor: "#f8f9fa", borderRadius: 8, fontSize: 12, color: "#5f6368" }}>
              <div>Campo: <span style={{ color: "#202124" }}>{editing.key}</span></div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              style={{
                width: "100%",
                marginTop: 16,
                padding: "10px 0",
                backgroundColor: "#1a73e8",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
