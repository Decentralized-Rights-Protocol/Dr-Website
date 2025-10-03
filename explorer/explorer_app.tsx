"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";

const API_BASE = process.env.NEXT_PUBLIC_EXPLORER_API_BASE || "http://localhost:8000";

type Block = {
  block_number: number;
  hash: string;
  timestamp: number;
  tx_count?: number;
  consensus_type?: string;
  elder_signatures?: any;
};

type Transaction = {
  tx_id: string;
  block_hash?: string;
  from: string;
  to: string;
  value: number;
  activity_proof?: any;
  status: string;
};

type ElderState = {
  active_keys: string[];
  quorum_threshold: number;
  last_updated: number;
};

const formatTime = (unixSeconds: number) => {
  try {
    return new Date(unixSeconds * 1000).toLocaleString();
  } catch {
    return String(unixSeconds);
  }
};

const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);
  return { isDark, setIsDark };
};

export default function ExplorerApp() {
  const { isDark, setIsDark } = useDarkMode();

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blocksPage, setBlocksPage] = useState<number>(1);
  const [blocksTotal, setBlocksTotal] = useState<number>(0);

  const [txs, setTxs] = useState<Transaction[]>([]);
  const [txsPage, setTxsPage] = useState<number>(1);
  const [txsTotal, setTxsTotal] = useState<number>(0);

  const [elders, setElders] = useState<ElderState | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 10;

  const fetchBlocks = useCallback(async (page: number) => {
    setError(null);
    const url = `${API_BASE}/blocks/latest?page=${page}&page_size=${pageSize}`;
    const res = await fetch(url);
    if (!res.ok) {
      setError("Failed to load latest blocks");
      return;
    }
    const data = await res.json();
    setBlocks(data.items || []);
    setBlocksTotal(data.total || 0);
  }, []);

  const fetchRecentTxs = useCallback(async (page: number) => {
    setError(null);
    const url = `${API_BASE}/address/__recent__?page=${page}&page_size=${pageSize}`;
    const res = await fetch(url);
    if (!res.ok) {
      setError("Failed to load recent transactions");
      return;
    }
    const data = await res.json();
    setTxs(data.items || []);
    setTxsTotal(data.total || 0);
  }, []);

  const fetchElders = useCallback(async () => {
    setError(null);
    const url = `${API_BASE}/elders`;
    const res = await fetch(url);
    if (!res.ok) {
      setError("Failed to load elder quorum state");
      return;
    }
    const data = await res.json();
    setElders(data);
  }, []);

  useEffect(() => {
    fetchBlocks(blocksPage);
  }, [blocksPage, fetchBlocks]);

  useEffect(() => {
    fetchRecentTxs(txsPage);
  }, [txsPage, fetchRecentTxs]);

  useEffect(() => {
    fetchElders();
  }, [fetchElders]);

  const onSearch = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setError(null);
    setSearchLoading(true);
    setSearchResult(null);
    try {
      // naive detection by length/prefix; fall back to tx then address
      if (searchQuery.startsWith("0x") && searchQuery.length > 50) {
        const r = await fetch(`${API_BASE}/blocks/${searchQuery}`);
        if (r.ok) {
          setSearchResult(await r.json());
        } else {
          setError("Block not found");
        }
      } else if (searchQuery.startsWith("0x")) {
        const r = await fetch(`${API_BASE}/tx/${searchQuery}`);
        if (r.ok) setSearchResult(await r.json());
        else {
          const r2 = await fetch(`${API_BASE}/address/${searchQuery}?page=1&page_size=10`);
          if (r2.ok) setSearchResult(await r2.json());
          else setError("No results for query");
        }
      } else {
        const r3 = await fetch(`${API_BASE}/address/${searchQuery}?page=1&page_size=10`);
        if (r3.ok) setSearchResult(await r3.json());
        else setError("No results for query");
      }
    } catch (err: any) {
      setError(err?.message || "Search failed");
    } finally {
      setSearchLoading(false);
    }
  }, [searchQuery]);

  const onDownloadBlock = useCallback(async (hash: string) => {
    try {
      const r = await fetch(`${API_BASE}/blocks/${hash}`);
      if (!r.ok) return;
      const data = await r.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `block_${hash}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  }, []);

  const pagination = useCallback(
    (page: number, total: number, setPage: (n: number) => void) => {
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      return (
        <div className="flex items-center gap-2 text-sm">
          <button
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage(1)}
          >
            First
          </button>
          <button
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="px-2">Page {page} / {totalPages}</span>
          <button
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
          <button
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
          >
            Last
          </button>
        </div>
      );
    },
    []
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Head>
        <title>DRP Explorer</title>
        <meta name="description" content="DRP Blockchain Explorer for blocks, transactions, and elder quorum state" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">DRP Blockchain Explorer</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm"
          >
            <span>{isDark ? "Light" : "Dark"} Mode</span>
          </button>
        </div>

        <form onSubmit={onSearch} className="mt-6 flex w-full items-center gap-2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search by Block Hash, Tx ID, or Address"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-white"
            disabled={searchLoading}
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-md border border-red-300 bg-red-50 text-red-700 px-3 py-2">
            {error}
          </div>
        )}

        {searchResult && (
          <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
            <h2 className="font-semibold mb-2">Search Result</h2>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(searchResult, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Latest Blocks</h2>
              {pagination(blocksPage, blocksTotal, setBlocksPage)}
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800/60">
                  <tr>
                    <th className="px-4 py-2 text-left">Height</th>
                    <th className="px-4 py-2 text-left">Hash</th>
                    <th className="px-4 py-2 text-left">Timestamp</th>
                    <th className="px-4 py-2 text-left">Txs</th>
                    <th className="px-4 py-2 text-left">Consensus</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blocks.map((b) => (
                    <tr key={b.hash} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-2">{b.block_number}</td>
                      <td className="px-4 py-2 font-mono truncate max-w-[10ch]" title={b.hash}>{b.hash}</td>
                      <td className="px-4 py-2">{formatTime(b.timestamp)}</td>
                      <td className="px-4 py-2">{b.tx_count ?? "-"}</td>
                      <td className="px-4 py-2">{b.consensus_type || "-"}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => onDownloadBlock(b.hash)}
                          className="text-indigo-600 hover:underline"
                        >
                          Download JSON
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Elder Quorum</h2>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 text-sm">
              {elders ? (
                <div className="space-y-2">
                  <div>
                    <div className="text-gray-500">Active Keys</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {elders.active_keys?.map((k) => (
                        <span key={k} className="font-mono text-xs rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5">{k}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Quorum Threshold</div>
                    <div className="mt-1">{elders.quorum_threshold}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last Updated</div>
                    <div className="mt-1">{formatTime(elders.last_updated)}</div>
                  </div>
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                {pagination(txsPage, txsTotal, setTxsPage)}
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800/60">
                    <tr>
                      <th className="px-3 py-2 text-left">Tx</th>
                      <th className="px-3 py-2 text-left">From</th>
                      <th className="px-3 py-2 text-left">To</th>
                      <th className="px-3 py-2 text-left">Value</th>
                      <th className="px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txs.map((t) => (
                      <tr key={t.tx_id} className="border-t border-gray-100 dark:border-gray-800">
                        <td className="px-3 py-2 font-mono truncate max-w-[10ch]" title={t.tx_id}>{t.tx_id}</td>
                        <td className="px-3 py-2 font-mono truncate max-w-[10ch]" title={t.from}>{t.from}</td>
                        <td className="px-3 py-2 font-mono truncate max-w-[10ch]" title={t.to}>{t.to}</td>
                        <td className="px-3 py-2">{t.value}</td>
                        <td className="px-3 py-2">{t.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


