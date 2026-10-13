export const dynamic = "force-dynamic";

type ApiRecord = Record<string, unknown>;
type ApiResult<T> = { data: T | null; error: string | null };

const API_URL = (process.env.DRP_EXPLORER_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.decentralizedrights.com").replace(/\/+$/, "");
const API_BASE = API_URL.endsWith("/api/v1/explorer") ? API_URL : `${API_URL}/api/v1/explorer`;

async function load<T>(path: string): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: { accept: "application/json" },
    });
    if (!response.ok) return { data: null, error: `API returned HTTP ${response.status}` };
    return { data: await response.json() as T, error: null };
  } catch {
    return { data: null, error: "The DRP API is currently unreachable. No live values are being substituted." };
  }
}

function isRecord(value: unknown): value is ApiRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function valueText(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  try { return JSON.stringify(value) ?? String(value); } catch { return String(value); }
}

function first(item: ApiRecord, keys: string[]): unknown {
  for (const key of keys) if (item[key] !== undefined && item[key] !== null) return item[key];
  return undefined;
}

function ListSection({ title, items, error, kind }: { title: string; items: ApiRecord[] | null; error: string | null; kind: "block" | "transaction" | "activity" }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {error && <p className="empty error">{error}</p>}
      {!error && (!items || items.length === 0) && <p className="empty">No records were returned by the API.</p>}
      {items && items.length > 0 && <div className="list">{items.slice(0, 8).map((item, index) => {
        const titleValue = kind === "block"
          ? first(item, ["block_number", "number", "height"])
          : kind === "transaction"
            ? first(item, ["tx_hash", "hash", "id"])
            : first(item, ["title", "type", "id"]);
        const meta = kind === "block"
          ? [first(item, ["block_hash", "hash"]), first(item, ["transaction_count", "transactions"]), first(item, ["timestamp"])].filter(v => v !== undefined).map(valueText).join(" · ")
          : kind === "transaction"
            ? [first(item, ["status"]), first(item, ["type", "token_type"]), first(item, ["timestamp"])].filter(v => v !== undefined).map(valueText).join(" · ")
            : [first(item, ["description"]), first(item, ["actor"]), first(item, ["timestamp"])].filter(v => v !== undefined).map(valueText).join(" · ");
        return <div className="item" key={String(titleValue ?? index)}><div className="item-title">{valueText(titleValue)}</div><div className="item-meta">{meta || "Record returned; additional fields may be available in the API response."}</div></div>;
      })}</div>}
    </section>
  );
}

export default async function ExplorerPage() {
  const [statsResult, blocksResult, transactionsResult, activityResult] = await Promise.all([
    load<unknown>("/stats"),
    load<ApiRecord[]>("/blocks?limit=8"),
    load<ApiRecord[]>("/transactions?limit=8"),
    load<ApiRecord[]>("/activity?limit=8"),
  ]);
  const stats = isRecord(statsResult.data) ? statsResult.data : null;
  const metrics = stats ? Object.entries(stats).filter(([, value]) => ["string", "number", "boolean"].includes(typeof value)).slice(0, 4) : [];
  const blocks = Array.isArray(blocksResult.data) ? blocksResult.data : null;
  const transactions = Array.isArray(transactionsResult.data) ? transactionsResult.data : null;
  const activity = Array.isArray(activityResult.data) ? activityResult.data : null;
  const errors = [statsResult.error, blocksResult.error, transactionsResult.error, activityResult.error].filter(Boolean);
  return (
    <main>
      <div className="topline">
        <span className="eyebrow">Decentralized Rights Protocol</span>
        <span className="status">{errors.length === 0 ? "API responding" : "Live data connection needs attention"}</span>
      </div>
      <header>
        <h1>DRP Network Explorer</h1>
        <p className="lede">A transparent view of network activity and verification infrastructure. This explorer displays records returned by the configured DRP API; it does not invent missing blocks, transactions, or proof counts.</p>
      </header>
      <div className="grid">
        {metrics.length ? metrics.map(([key, value]) => <section className="panel" key={key}><div className="metric-label">{key.replace(/[_-]/g, " ")}</div><div className="metric-value">{valueText(value)}</div></section>) : <section className="panel" style={{gridColumn:"1 / -1"}}><div className="metric-label">Network summary</div><div className="metric-value">Waiting for live API data</div><p className="empty">{statsResult.error || "The API did not return summary metrics."}</p></section>}
      </div>
      <div className="section-grid">
        <ListSection title="Recent blocks" items={blocks} error={blocksResult.error} kind="block" />
        <ListSection title="Recent transactions" items={transactions} error={transactionsResult.error} kind="transaction" />
        <ListSection title="Activity feed" items={activity} error={activityResult.error} kind="activity" />
        <section className="panel"><h2>Verification principles</h2><div className="list"><div className="item"><div className="item-title">Proof of Activity (PoAT)</div><div className="item-meta">Evidence and source provenance matter; a submitted claim is not automatically verified.</div></div><div className="item"><div className="item-title">Proof of Status (PoST)</div><div className="item-meta">Status claims should identify their issuer, scope, validity period, and revocation state.</div></div><div className="item"><div className="item-title">Accountable verification</div><div className="item-meta">A cryptographic signature confirms who signed a payload, not that the real-world claim is true.</div></div></div></section>
      </div>
      <footer>API base: {API_BASE}. Configure <code>DRP_EXPLORER_API_URL</code> in Vercel to use a different API origin. Raw evidence and private personal data should not be published to a public ledger.</footer>
    </main>
  );
}
