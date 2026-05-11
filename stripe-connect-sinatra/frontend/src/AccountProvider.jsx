import React, { createContext, useContext, useMemo, useState } from "react";

const AccountContext = createContext(null);

const STORAGE_KEY = "stripe_connect_account_id";

export function AccountProvider({ children }) {
  const [accountId, setAccountIdState] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  const setAccountId = (id) => {
    const next = id || "";
    setAccountIdState(next);
    try {
      if (next) sessionStorage.setItem(STORAGE_KEY, next);
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(() => ({ accountId, setAccountId }), [accountId]);

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
