'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useTheme } from '@/components/ui/ThemeProvider';
import { getMenuForRole } from '@/config/menu';
import Swal from 'sweetalert2';

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    if (user) {
      setMenus(getMenuForRole(user.role));
    }
  }, [user]);

  function handleNav(path) {
    router.push(path);
    if (onClose) onClose();
  }

  async function handleLogout() {
    logout();
    await Swal.fire({
      title: "สำเร็จ",
      text: "ขอบคุณที่ใช้บริการของเรา ❤️",
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "ปิด",
      timer: 1500,
      timerProgressBar: true,
    });
    router.replace('/login');
  }

  const sidebarStyle = {
    width: 'var(--sidebar-width)',
    background: 'var(--bg-sidebar)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    boxShadow: 'var(--shadow-md)',
    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 99,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <aside
        style={{
          ...sidebarStyle,
          transform: mobileOpen ? 'translateX(0)' : undefined,
        }}
        className="sidebar"
      >
        {/* Logo */}
        <div
          style={{
            padding: '20px 20px 16px',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(167,139,250,0.35)',
              }}
            >
              🛠️
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}
              >
                Jira Tools
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ระบบจัดการ Worklogs</div>
            </div>
          </div>
        </div>

        {/* User info */}
        {user && (
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {user.avatar}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.name}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  padding: '1px 7px',
                  borderRadius: '99px',
                  background:
                    user.role === 'Admin'
                      ? 'rgba(167,139,250,0.15)'
                      : 'rgba(147,197,253,0.15)',
                  color:
                    user.role === 'Admin' ? 'var(--accent-purple)' : 'var(--accent-blue)',
                  fontWeight: 600,
                  marginTop: '2px',
                }}
              >
                {user.role === 'Admin' ? '🛡️' : '👤'} {user.role}
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
          {menus.map((group) => (
            <div key={group.group} style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0 8px',
                  marginBottom: '6px',
                }}
              >
                {group.group}
              </div>
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNav(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      marginBottom: '3px',
                      background: isActive
                        ? `linear-gradient(135deg, ${item.color}22, ${item.color}11)`
                        : 'transparent',
                      color: isActive ? item.color : 'var(--text-secondary)',
                      transition: 'all 0.15s ease',
                      fontFamily: 'Kanit, sans-serif',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      borderLeft: isActive ? `3px solid ${item.color}` : '3px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'var(--border-color)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom actions */}
        <div
          style={{
            padding: '12px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontFamily: 'Kanit, sans-serif',
              fontSize: '13px',
              width: '100%',
              textAlign: 'left',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border-color)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '16px' }}>{theme === 'light' ? '🌙' : '☀️'}</span>
            <span>{theme === 'light' ? 'โหมดกลางคืน' : 'โหมดกลางวัน'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#f87171',
              fontFamily: 'Kanit, sans-serif',
              fontSize: '13px',
              width: '100%',
              textAlign: 'left',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(248,113,113,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '16px' }}>🚪</span>
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            transform: ${mobileOpen ? 'translateX(0)' : 'translateX(-100%)'} !important;
          }
        }
      `}</style>
    </>
  );
}
