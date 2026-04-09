"use client";

import { useState, useEffect } from "react";

type Field = { key: string; label: string; value: string; x: number; y: number; w: number; h: number; size: number; color: string; weight?: number; bg?: string; align?: string };

const FIELDS: Field[] = [
  { key: "pagos_title", label: "Título Pagos", value: "Pagos", x: 18.4, y: 19.6, w: 3.8, h: 2.9, size: 1.22, color: "#202124" },
  { key: "cuenta_label", label: "Etiqueta cuenta", value: "CUENTA DE PAGOS", x: 19.6, y: 11.1, w: 7.8, h: 1.8, size: 0.8, color: "#3c4043", weight: 700 },
  { key: "cuenta_value", label: "Valor cuenta", value: "YouTube (España)", x: 19.6, y: 13.4, w: 8.5, h: 2.4, size: 0.95, color: "#3c4043" },
  { key: "ingresos_title", label: "Título ingresos", value: "Tus ingresos", x: 20.0, y: 28.1, w: 7.5, h: 2.9, size: 1.22, color: "#202124", bg: "#ffffff" },
  { key: "ingresos_desc", label: "Descripción ingresos", value: "Los pagos se hacen mensualmente si se alcanza el umbral de pago de 70,00 €", x: 20.1, y: 32.5, w: 36.0, h: 2.7, size: 0.95, color: "#5f6368", bg: "#ffffff" },
  { key: "ingresos_amount", label: "Importe ingresos", value: "57,75 €", x: 40.0, y: 27.8, w: 45.0, h: 4.8, size: 2.1, color: "#202124", bg: "#ffffff", align: "right" },
  { key: "progress_text", label: "Texto progreso", value: "Ha alcanzado el 82 % del importe mínimo para realizar el pago", x: 20.1, y: 41.3, w: 23.5, h: 2.3, size: 0.78, color: "#5f6368", bg: "#ffffff" },
  { key: "progress_min", label: "Importe mínimo", value: "Importe mínimo de pago: 70,00 €", x: 53.5, y: 41.4, w: 13.0, h: 2.3, size: 0.8, color: "#5f6368", bg: "#ffffff" },
  { key: "last_payment", label: "Último pago", value: "Tu último pago, de 77,99 €, se emitió el 21 ene.", x: 21.9, y: 46.1, w: 19.0, h: 2.4, size: 0.87, color: "#3c4043", bg: "#ffffff" },
  { key: "trans_title", label: "Título transacciones", value: "Transacciones", x: 20.0, y: 56.0, w: 10.0, h: 3.0, size: 1.45, color: "#202124", bg: "#fefefe" },
  { key: "trans_1_date", label: "Trans. 1 Fecha", value: "1–8 abr 2026", x: 20.1, y: 62.3, w: 5.5, h: 1.9, size: 0.87, color: "#1a73e8", bg: "#fefefe" },
  { key: "trans_1_amount", label: "Trans. 1 Importe", value: "57,75 €", x: 46.2, y: 62.3, w: 3.8, h: 2.3, size: 0.87, color: "#3c4043", bg: "#fefefe" },
  { key: "trans_2_date", label: "Trans. 2 Fecha", value: "1–31 mar 2026", x: 20.1, y: 66.3, w: 6.0, h: 1.9, size: 0.87, color: "#1a73e8", bg: "#fefefe" },
  { key: "trans_2_amount", label: "Trans. 2 Importe", value: "57,75 €", x: 46.2, y: 66.3, w: 3.8, h: 1.9, size: 0.87, color: "#3c4043", bg: "#fefefe" },
  { key: "trans_3_date", label: "Trans. 3 Fecha", value: "1–28 feb 2026", x: 20.0, y: 70.1, w: 6.0, h: 1.9, size: 0.87, color: "#1a73e8", bg: "#fefefe" },
  { key: "trans_3_amount", label: "Trans. 3 Importe", value: "57,75 €", x: 46.2, y: 70.1, w: 3.8, h: 1.9, size: 0.87, color: "#3c4043", bg: "#fefefe" },
  { key: "trans_link", label: "Link transacciones", value: "Ver transacciones", x: 29.8, y: 76.3, w: 9.5, h: 2.4, size: 0.95, color: "#1a73e8", weight: 500, bg: "#fefefe" },
  { key: "payment_title", label: "Título método pago", value: "Cómo recibes los pagos", x: 55.1, y: 56.0, w: 16.5, h: 3.3, size: 1.45, color: "#202124", bg: "#fefefe" },
  { key: "payment_iban", label: "IBAN", value: "ES•• •••• •••• •••• •••• 0294", x: 65.3, y: 61.6, w: 10.0, h: 1.8, size: 0.87, color: "#202124", bg: "#d3e3fd" },
  { key: "payment_name", label: "Nombre titular", value: "Joel pedroche graciano", x: 65.3, y: 64.0, w: 9.0, h: 2.2, size: 0.78, color: "#5f6368", bg: "#d3e3fd" },
  { key: "payment_link", label: "Link gestionar pagos", value: "Gestionar métodos de pago", x: 62.2, y: 76.3, w: 14.0, h: 2.6, size: 0.95, color: "#1a73e8", weight: 500, bg: "#fefefe" },
  { key: "config_title", label: "Título configuración", value: "Configuración", x: 20.1, y: 86.2, w: 10.0, h: 3.4, size: 1.45, color: "#202124", bg: "#fefefe" },
  { key: "config_pub", label: "Publisher ID", value: "AdSense for YouTube pub-7877430726720346", x: 20.0, y: 92.6, w: 19.0, h: 2.3, size: 0.87, color: "#5f6368", bg: "#fefefe" },
  { key: "config_name", label: "Nombre configuración", value: "Joel Pedroche graciano", x: 20.0, y: 96.3, w: 10.0, h: 2.3, size: 0.87, color: "#5f6368", bg: "#fefefe" },
];

const SUPABASE_URL = "https://dyzwlxhghmkrnuvesxqf.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5endseGhnaG1rcm51dmVzeHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Njk3MjQsImV4cCI6MjA5MDE0NTcyNH0.b3TWo5ZUd-qB1PHIc6ct2IlL14nT2nTVNh7l6qAU8ew";

export default function AdsensePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      if (window.self !== window.top) setIsAdmin(true);
    } catch {}
  }, []);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/field_overrides?table_name=eq.adsense&select=column_name,value`, {
      headers: { "apikey": SUPABASE_ANON, "Authorization": `Bearer ${SUPABASE_ANON}` },
    })
      .then(r => r.json())
      .then(rows => {
        const loaded: Record<string, string> = {};
        for (const row of rows) {
          loaded[row.column_name] = row.value;
        }
        if (Object.keys(loaded).length > 0) setOverrides(loaded);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "UPDATE_FIELD" && e.data.key) {
        setOverrides(prev => ({ ...prev, [e.data.key]: e.data.value }));
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleClick = (f: Field) => {
    if (!isAdmin) return;
    window.parent.postMessage({
      type: "EDIT_FIELD",
      field: { key: f.key, label: f.label, value: overrides[f.key] || f.value },
    }, "*");
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      <img
        src="/images/full_page.png"
        alt="Google AdSense"
        style={{ width: "100vw", height: "100vh", objectFit: "fill", display: "block" }}
      />

      {/* Text overlays — always rendered with correct colors */}
      {FIELDS.map(f => {
        const val = overrides[f.key] || f.value;
        return (
          <div
            key={`text-${f.key}`}
            style={{
              position: "absolute",
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: `${f.w}%`,
              height: `${f.h}%`,
              backgroundColor: f.bg || "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: f.align === "right" ? "flex-end" : "flex-start",
            }}
          >
            <span style={{
              fontSize: `${f.size}vw`,
              fontWeight: f.weight || 400,
              color: f.color,
              fontFamily: "'Roboto', Arial, sans-serif",
              whiteSpace: "nowrap",
              lineHeight: 1.3,
            }}>
              {val}
            </span>
          </div>
        );
      })}

      {/* Clickable zones — only in admin mode */}
      {isAdmin && FIELDS.map(f => (
        <div
          key={f.key}
          onClick={() => handleClick(f)}
          style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.w}%`,
            height: `${f.h}%`,
            cursor: "pointer",
            borderRadius: 3,
            zIndex: 10,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.outline = "2px solid #1a73e8";
            e.currentTarget.style.background = "rgba(26,115,232,0.08)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.outline = "none";
            e.currentTarget.style.background = "transparent";
          }}
        />
      ))}
    </div>
  );
}
