'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { menuGroups } from '@/config/menu';

function getPageTitle(pathname) {
  for (const group of menuGroups) {
    for (const item of group.items) {
      if (item.path === pathname) return { label: item.label, icon: item.icon };
    }
  }
  return { label: 'Jira Tools', icon: '🛠️' };
}

export default function Header({ onMenuToggle }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const page = getPageTitle(pathname);

  return (
    <header
      style={{
        height: 'var(--header-height)',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '12px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuToggle}
        className="mobile-menu-btn"
        style={{
          display: 'none',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: 'none',
          background: 'var(--border-color)',
          cursor: 'pointer',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          flexShrink: 0,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '18px',
              height: '2px',
              background: 'var(--text-secondary)',
              borderRadius: '2px',
              display: 'block',
            }}
          />
        ))}
      </button>

      {/* Page title */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '18px' }}>{page.icon}</span>
        <span
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {page.label}
        </span>
      </div>

      {/* User chip */}
      {user && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: '99px',
            background: 'var(--border-color)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {user.avatar}
          </div>
          <span className="hide-on-mobile">{user.name}</span>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .hide-on-mobile { display: none; }
        }
      `}</style>
    </header>
  );
}
