import { AccountProvider } from "./AccountProvider.jsx";
import ConnectOnboarding from "./ConnectOnboarding.jsx";

export default function App() {
  return (
    <AccountProvider>
      <main className="app">
        <h1>Stripe Connect (test)</h1>
        <p className="lede">
          Run the Sinatra server on port <code>4242</code>, then <code>npm run dev</code> here. API calls proxy to
          the backend.
        </p>
        <ConnectOnboarding />
      </main>
    </AccountProvider>
  );
}
