import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { IntelligenceMap } from './pages/IntelligenceMap';
import { AIAnalytics } from './pages/AIAnalytics';
import { CaseManagement } from './pages/CaseManagement';
import { AdminPanel } from './pages/AdminPanel';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/intelligence-map" element={<IntelligenceMap />} />
              <Route path="/ai-analytics" element={<AIAnalytics />} />
              <Route path="/case-management" element={<CaseManagement />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;