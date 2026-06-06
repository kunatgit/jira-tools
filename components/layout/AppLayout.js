'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
        className="main-content"
      >
        <Header onMenuToggle={() => setMobileOpen(true)} />
        <main
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
          }}
          className="main-inner"
        >
          {children}
        </main>
      </div>

      <style>{`
        .main-content {
          margin-left: var(--sidebar-width);
        }
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0 !important;
          }
          .main-inner {
            padding: 16px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .main-inner {
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
