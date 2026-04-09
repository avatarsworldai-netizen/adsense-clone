import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://dyzwlxhghmkrnuvesxqf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5endseGhnaG1rcm51dmVzeHFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDU2OTcyNCwiZXhwIjoyMDkwMTQ1NzI0fQ.ZIdSzBmvimxDWl-K8mT_98je7aq61YPaSqoUy-3gQ1M";

export async function POST(req: NextRequest) {
  const { key, value } = await req.json();
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

  const id = `adsense_${key}`;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/field_overrides`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      id,
      table_name: "adsense",
      column_name: key,
      row_id: "page",
      value: String(value),
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
