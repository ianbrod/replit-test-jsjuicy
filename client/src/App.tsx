import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingStep1 from "./pages/OnboardingStep1";
import OnboardingStep2 from "./pages/OnboardingStep2";
import SynthesisPage from "./pages/SynthesisPage";
import MasterCVConfirmation from "./pages/MasterCVConfirmation";
import DashboardPage from "./pages/DashboardPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import LaunchpadPage from "./pages/LaunchpadPage";
import UpgradePage from "./pages/UpgradePage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/onboarding/upload">
        <ProtectedRoute>
          <OnboardingStep1 />
        </ProtectedRoute>
      </Route>
      <Route path="/onboarding/voice">
        <ProtectedRoute>
          <OnboardingStep2 />
        </ProtectedRoute>
      </Route>
      <Route path="/synthesis">
        <ProtectedRoute>
          <SynthesisPage />
        </ProtectedRoute>
      </Route>
      <Route path="/master-cv">
        <ProtectedRoute>
          <MasterCVConfirmation />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </Route>
      <Route path="/opportunities">
        <ProtectedRoute>
          <OpportunitiesPage />
        </ProtectedRoute>
      </Route>
      <Route path="/launchpad">
        <ProtectedRoute>
          <LaunchpadPage />
        </ProtectedRoute>
      </Route>
      <Route path="/upgrade">
        <ProtectedRoute>
          <UpgradePage />
        </ProtectedRoute>
      </Route>
      <Route path="/">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
