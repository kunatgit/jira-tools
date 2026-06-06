'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/components/auth/AuthProvider';
import { StatSkeleton, CardSkeleton } from '@/components/loading/Skeleton';

const stats = [
  { label: 'Worklogs วันนี้', value: '24', sub: '3 คนยังไม่กรอก', icon: '📝', color: '#a78bfa' },
  { label: 'Task เสร็จสัปดาห์นี้', value: '87', sub: '+12 จากสัปดาห์ก่อน', icon: '✅', color: '#6ee7b7' },
  { label: 'ผู้ใช้งานทั้งหมด', value: '16', sub: '2 Admin, 14 User', icon: '👥', color: '#93c5fd' },
  { label: 'Project ที่ Active', value: '5', sub: 'อัปเดตล่าสุดวันนี้', icon: '🚀', color: '#fde68a' },
];

const recentLogs = [
  { user: 'สมชาย จงดี', task: 'PROJ-123 Fix login bug', time: '2h 30m', date: 'วันนี้ 09:00' },
  { user: 'มานี รักดี', task: 'PROJ-124 Review PR', time: '1h 00m', date: 'วันนี้ 10:30' },
  { user: 'วิชัย สุขใจ', task: 'PROJ-125 Deploy to staging', time: '3h 00m', date: 'วันนี้ 11:00' },
  { user: 'สมหญิง นักพัฒนา', task: 'PROJ-120 Write unit tests', time: '2h 00m', date: 'เมื่อวาน' },
  { user: 'ประสงค์ มีดี', task: 'PROJ-119 Update docs', time: '1h 30m', date: 'เมื่อวาน' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <ProtectedRoute requiredRole="Admin">
      <AppLayout>
        <div style={{ width: '100%', height: '100%' }}>
          {/* Welcome */}
          <div className="fade-in" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              สวัสดี, {user?.name} 👋
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
              : stats.map((stat, i) => (
                  <div
                    key={i}
                    className={`card fade-in fade-in-delay-${i + 1}`}
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                          {stat.label}
                        </p>
                        <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                          {stat.value}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                          {stat.sub}
                        </p>
                      </div>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: `${stat.color}22`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                        }}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, ${stat.color}, ${stat.color}66)`,
                      }}
                    />
                  </div>
                ))}
          </div>

          {/* Recent logs */}
          <div className="card fade-in fade-in-delay-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                📋 Worklogs ล่าสุด
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '99px',
                  background: 'rgba(167,139,250,0.12)',
                  color: 'var(--accent-purple)',
                  fontWeight: 600,
                }}
              >
                ดูทั้งหมด →
              </span>
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div className="skeleton" style={{ height: '13px', width: '40%' }} />
                      <div className="skeleton" style={{ height: '11px', width: '60%' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {recentLogs.map((log, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      borderBottom: i < recentLogs.length - 1 ? '1px solid var(--border-color)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      {log.user.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {log.user}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {log.task}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--accent-green)',
                          background: 'rgba(110,231,183,0.12)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        ⏱ {log.time}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {log.date}
                      </div>
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
