import React, { useEffect, useState } from "react";
import { useAccount } from "./AccountProvider.jsx";

export default function AccountStatus({ onStartOnboarding, busy = false }) {
  const { accountId } = useAccount();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!accountId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/account-status/${encodeURIComponent(accountId)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || res.statusText);
        if (!cancelled) setStatus(data);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load status");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [accountId]);

  if (!accountId) return null;
  if (loading) return <p className="muted">Loading account status…</p>;
  if (error) return <p className="error">Status error: {error}</p>;

  return (
    <div className="account-status">
      <p>
        <strong>Connected account</strong>: <code>{accountId}</code>
      </p>
      {status && (
        <ul className="status-list">
          <li>Payouts enabled: {String(status.payoutsEnabled)}</li>
          <li>Stripe transfers active: {String(status.chargesEnabled)}</li>
          <li>Details submitted (heuristic): {String(status.detailsSubmitted)}</li>
        </ul>
      )}
      <button type="button" className="button" onClick={onStartOnboarding} disabled={busy}>
        {busy ? "Opening…" : "Open Stripe onboarding"}
      </button>
    </div>
  );
}
