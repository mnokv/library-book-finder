import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import BookDetail from "./pages/BookDetail";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import AdminRequests from "./pages/AdminRequests";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/catalog"} component={Catalog} />
      <Route path={"/book/:id"} component={BookDetail} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/admin"} component={AdminPanel} />
      <Route path={"/admin/requests"} component={AdminRequests} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
