import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import HamletCandidateBrowser from "./components/HamletCandidateBrowser";
import "./index.css";
function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <HamletCandidateBrowser />
      </div>
    </ErrorBoundary>
  );
}
export default App;
