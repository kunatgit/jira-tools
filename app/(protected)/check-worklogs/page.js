'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { TableSkeleton } from '@/components/loading/Skeleton';
import { useAuth } from '@/components/auth/AuthProvider';

const mockData = [
  { id: 1, date: '2025-06-04', project: 'PROJ - HR', task: 'PROJ-101 Login Feature', hours: '3h 00m', desc: 'พัฒนาหน้า Login และ JWT' },
  { id: 2, date: '2025-06-04', project: 'DEV - Backend', task: 'DEV-202 Auth Service', hours: '2h 30m', desc: 'เขียน Unit Test สำหรับ Auth' },
  { id: 3, date: '2025-06-03', project: 'PROJ - HR', task: 'PROJ-102 User Management', hours: '4h 00m', desc: 'ออกแบบ UI หน้าจัดการ User' },
  { id: 4, date: '2025-06-03', project: 'QA - Testing', task: 'QA-301 Smoke Test', hours: '1h 30m', desc: 'รัน Smoke Test หลัง Deploy' },
  { id: 5, date: '2025-06-02', project: 'OPS - Infra', task: 'OPS-402 CI/CD', hours: '2h 00m', desc: 'ตั้งค่า GitHub Actions' },
];

export default function CheckWorklogsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const t = setTimeout(() => { setData(mockData); setLoading(false); }, 1000);
    return () => clearTimeout(t);
  }, []);

  const filtered = data.filter(
    (d) =>
      filter === '' ||
      d.project.toLowerCase().includes(filter.toLowerCase()) ||
      d.task.toLowerCase().includes(filter.toLowerCase())
  );

  const totalHours = filtered.reduce((sum, d) => {
    const [h, m] = d.hours.replace('m', '').split('h ').map(Number);
    return sum + h + (m || 0) / 60;
  }, 0);

  return (
    <ProtectedRoute>
      <AppLayout>
        <div style={{ width: '100%', height: '100%' }}>
          {/* Header */}
          <div className="fade-in" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                🔎 ตรวจสอบ Worklogs ของคุณ
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                แสดง Worklogs ของ {user?.name}
              </p>
            </div>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="🔍 ค้นหา Project / Task..."
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: '1.5px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontFamily: 'Kanit, sans-serif',
                fontSize: '13px',
                outline: 'none',
                minWidth: '220px',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-purple)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
            />
          </div>

          {/* Summary */}
          {!loading && (
            <div className="fade-in" style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'รายการทั้งหมด', value: filtered.length, color: 'var(--accent-purple)' },
                { label: 'ชั่วโมงรวม', value: `${totalHours.toFixed(1)} ชม.`, color: 'var(--accent-green)' },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.label}:</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Table */}
          <div className="card fade-in">
            {loading ? (
              <TableSkeleton rows={5} />
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr>
                      {['วันที่', 'Project', 'Task', 'เวลา', 'รายละเอียด'].map((h) => (
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
                    {filtered.map((row) => (
                      <tr
                        key={row.id}
                        style={{ borderBottom: '1px solid var(--border-color)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{row.date}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: 'rgba(167,139,250,0.1)',
                              color: 'var(--accent-purple)',
                              fontSize: '11px',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {row.project.split(' - ')[0]}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-primary)' }}>{row.task}</td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: 'rgba(110,231,183,0.12)',
                              color: 'var(--accent-green)',
                              fontSize: '12px',
                              fontWeight: 600,
                            }}
                          >
                            ⏱ {row.hours}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>{row.desc}</td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                          ไม่พบข้อมูล
                        </td>
                      </tr>
                    )}
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
