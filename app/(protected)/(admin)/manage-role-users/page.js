'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { CardSkeleton } from '@/components/loading/Skeleton';

const roles = [
  {
    name: 'Admin',
    icon: '🛡️',
    color: '#a78bfa',
    count: 1,
    permissions: [
      'เข้าถึงหน้า Dashboard',
      'จัดการผู้ใช้งาน',
      'จัดการสิทธิ์ Role',
      'เพิ่ม/แก้ไข/ลบ Worklogs',
      'ดูรายงานทั้งทีม',
      'ตั้งค่าระบบ',
    ],
  },
  {
    name: 'User',
    icon: '👤',
    color: '#93c5fd',
    count: 3,
    permissions: [
      'เพิ่ม Worklogs ของตัวเอง',
      'ตรวจสอบ Worklogs ของตัวเอง',
      'ดูรายงาน Worklogs ของทีม',
    ],
  },
];

const userRoleData = [
  { name: 'สมชาย ผู้ดูแลระบบ', username: 'admin', role: 'Admin', canChange: false },
  { name: 'สมหญิง นักพัฒนา', username: 'user', role: 'User', canChange: true },
  { name: 'สมศักดิ์ ทีมงาน', username: 'somchai', role: 'User', canChange: true },
  { name: 'วิชัย สุขใจ', username: 'vichai', role: 'User', canChange: true },
];

export default function ManageRoleUsersPage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => { setUserData(userRoleData); setLoading(false); }, 900);
    return () => clearTimeout(t);
  }, []);

  function changeRole(username, newRole) {
    setUserData((prev) => prev.map((u) => (u.username === username ? { ...u, role: newRole } : u)));
  }

  return (
    <ProtectedRoute requiredRole="Admin">
      <AppLayout>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="fade-in" style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              🛡️ จัดการสิทธิ์ผู้ใช้งาน
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              กำหนด Role และสิทธิ์การเข้าถึงของผู้ใช้งานแต่ละคน
            </p>
          </div>

          {/* Role cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {loading
              ? Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)
              : roles.map((role, i) => (
                  <div key={i} className={`card fade-in fade-in-delay-${i + 1}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: `${role.color}22`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                        }}
                      >
                        {role.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: role.color, fontSize: '14px' }}>{role.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{role.count} ผู้ใช้งาน</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {role.permissions.map((perm, j) => (
                        <div
                          key={j}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '12px',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <span style={{ color: role.color }}>✓</span>
                          {perm}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
          </div>

          {/* User role assignment */}
          <div className="card fade-in fade-in-delay-3">
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
              กำหนด Role ให้ผู้ใช้งาน
            </h3>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: '52px', borderRadius: '10px' }} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {userData.map((u) => (
                  <div
                    key={u.username}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      {u.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>@{u.username}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['Admin', 'User'].map((r) => (
                        <button
                          key={r}
                          onClick={() => u.canChange && changeRole(u.username, r)}
                          disabled={!u.canChange}
                          style={{
                            padding: '5px 14px',
                            borderRadius: '8px',
                            border: '1.5px solid',
                            borderColor: u.role === r ? (r === 'Admin' ? 'var(--accent-purple)' : 'var(--accent-blue)') : 'var(--border-color)',
                            background: u.role === r ? (r === 'Admin' ? 'rgba(167,139,250,0.12)' : 'rgba(147,197,253,0.12)') : 'transparent',
                            color: u.role === r ? (r === 'Admin' ? 'var(--accent-purple)' : 'var(--accent-blue)') : 'var(--text-muted)',
                            fontFamily: 'Kanit, sans-serif',
                            fontSize: '12px',
                            fontWeight: u.role === r ? 600 : 400,
                            cursor: u.canChange ? 'pointer' : 'not-allowed',
                            opacity: !u.canChange && u.role !== r ? 0.4 : 1,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {r === 'Admin' ? '🛡️' : '👤'} {r}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
