import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatsProvider } from "./context/stats-context";
import Home from "./pages/home";
import Forum from "./pages/forum";
import Thread from "./pages/thread";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/forum/:id" component={Forum} />
      <Route path="/thread/:id" component={Thread} />
      <Route>
        <div style={{ padding: "20px", textAlign: "center", fontFamily: "Verdana, sans-serif" }}>
          <h2>404 Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/">Return to Home</a>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatsProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </StatsProvider>
    </QueryClientProvider>
  );
}

export default App;
