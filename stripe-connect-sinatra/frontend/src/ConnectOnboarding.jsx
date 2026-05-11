import React, { useState } from "react";
import { useAccount } from "./AccountProvider.jsx";
import AccountStatus from "./AccountStatus.jsx";

async function errorMessage(res) {
  try {
    const data = await res.json();
    return data.error || res.statusText;
  } catch {
    return res.statusText;
  }
}

const ConnectOnboarding = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { accountId, setAccountId } = useAccount();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/create-connect-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(await errorMessage(response));
      }

      const data = await response.json();
      setAccountId(data.accountId);
    } catch (err) {
      console.error("Error creating account:", err);
      setError(err.message || "Failed to create account");
    } finally {
      setBusy(false);
    }
  };

  const handleStartOnboarding = async () => {
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/create-account-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        throw new Error(await errorMessage(response));
      }

      const data = await response.json();
      window.location.href = data.url;
    } catch (err) {
      console.error("Error creating account link:", err);
      setError(err.message || "Failed to create account link");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container">
      {error ? <p className="error">{error}</p> : null}
      {!accountId ? (
        <form onSubmit={handleCreateAccount}>
          <div className="form-group">
            <label htmlFor="email">Email for Connected account:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={busy}
            />
          </div>
          <button className="button" type="submit" disabled={busy}>
            {busy ? "Creating…" : "Create Connect Account"}
          </button>
        </form>
      ) : (
        <AccountStatus onStartOnboarding={handleStartOnboarding} busy={busy} />
      )}
    </div>
  );
};

export default ConnectOnboarding;
