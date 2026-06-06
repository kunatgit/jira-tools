'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { TableSkeleton } from '@/components/loading/Skeleton';

const mockUsers = [
  { id: 1, name: 'สมชาย ผู้ดูแลระบบ', username: 'admin', email: 'admin@jiratools.com', role: 'Admin', dept: 'IT Operations', status: 'ใช้งาน' },
  { id: 2, name: 'สมหญิง นักพัฒนา', username: 'user', email: 'user@jiratools.com', role: 'User', dept: 'Development', status: 'ใช้งาน' },
  { id: 3, name: 'สมศักดิ์ ทีมงาน', username: 'somchai', email: 'somchai@jiratools.com', role: 'User', dept: 'QA', status: 'ใช้งาน' },
  { id: 4, name: 'วิชัย สุขใจ', username: 'vichai', email: 'vichai@jiratools.com', role: 'User', dept: 'Operations', status: 'ระงับ' },
];

export default function ManageUsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => { setUsers(mockUsers); setLoading(false); }, 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = users.filter(
    (u) =>
      search === '' ||
      u.name.includes(search) ||
      u.username.includes(search) ||
      u.email.includes(search)
  );

  return (
    <ProtectedRoute requiredRole="Admin">
      <AppLayout>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="fade-in" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                👤 จัดการผู้ใช้งาน
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                จัดการข้อมูลและสถานะผู้ใช้งานทั้งหมดในระบบ
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 ค้นหาผู้ใช้งาน..."
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '13px',
                  outline: 'none',
                  minWidth: '200px',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-purple)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
              <button
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, var(--accent-purple), #8b5cf6)',
                  color: '#fff',
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                + เพิ่มผู้ใช้
              </button>
            </div>
          </div>

          <div className="card fade-in">
            {loading ? (
              <TableSkeleton rows={4} />
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr>
                      {['ชื่อ-นามสกุล', 'Username', 'แผนก', 'Role', 'สถานะ', 'จัดการ'].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: 'left',
                            padding: '8px 12px',
                            color: 'var(--text-muted)',
                            fontWeight: 600,
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            borderBottom: '2px solid var(--border-color)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => (
                      <tr
                        key={u.id}
                        style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.1s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 700,
                                color: '#fff',
                                flexShrink: 0,
                              }}
                            >
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.name}</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{u.username}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{u.dept}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: u.role === 'Admin' ? 'rgba(167,139,250,0.12)' : 'rgba(147,197,253,0.12)',
                              color: u.role === 'Admin' ? 'var(--accent-purple)' : 'var(--accent-blue)',
                              fontSize: '11px',
                              fontWeight: 600,
                            }}
                          >
                            {u.role === 'Admin' ? '🛡️' : '👤'} {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: u.status === 'ใช้งาน' ? 'rgba(110,231,183,0.12)' : 'rgba(248,113,113,0.12)',
                              color: u.status === 'ใช้งาน' ? '#6ee7b7' : '#f87171',
                              fontSize: '11px',
                              fontWeight: 600,
                            }}
                          >
                            {u.status === 'ใช้งาน' ? '🟢' : '🔴'} {u.status}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                fontFamily: 'Kanit, sans-serif',
                                fontSize: '12px',
                                cursor: 'pointer',
                              }}
                            >
                              ✏️ แก้ไข
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
