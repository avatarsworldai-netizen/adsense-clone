import AdsenseClient from "./AdsenseClient";

const SUPABASE_URL = "https://dyzwlxhghmkrnuvesxqf.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5endseGhnaG1rcm51dmVzeHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Njk3MjQsImV4cCI6MjA5MDE0NTcyNH0.b3TWo5ZUd-qB1PHIc6ct2IlL14nT2nTVNh7l6qAU8ew";

export const dynamic = "force-dynamic";

async function getOverrides(): Promise<Record<string, string>> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/field_overrides?table_name=eq.adsense&select=column_name,value`,
      {
        headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
        cache: "no-store",
      }
    );
    if (!res.ok) return {};
    const rows: { column_name: string; value: string }[] = await res.json();
    const loaded: Record<string, string> = {};
    for (const row of rows) loaded[row.column_name] = row.value;
    return loaded;
  } catch {
    return {};
  }
}

export default async function AdsensePage() {
  const initialOverrides = await getOverrides();
  return <AdsenseClient initialOverrides={initialOverrides} />;
}
