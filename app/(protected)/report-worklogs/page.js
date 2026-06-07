'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { CardSkeleton } from '@/components/loading/Skeleton';

const teamData = [
  { name: 'สมชาย จงดี', position: 'Development', logged: 38, target: 40, status: 'กรอกครบ' },
  { name: 'มานี รักดี', position: 'QA', logged: 32, target: 40, status: 'ขาดอีก 8 ชม.' },
  { name: 'วิชัย สุขใจ', position: 'Operations', logged: 40, target: 40, status: 'กรอกครบ' },
  { name: 'สมหญิง นักพัฒนา', position: 'Development', logged: 36, target: 40, status: 'ขาดอีก 4 ชม.' },
  { name: 'ประสงค์ มีดี', position: 'Development', logged: 40, target: 40, status: 'กรอกครบ' },
  { name: 'กานดา ใจดี', position: 'QA', logged: 28, target: 40, status: 'ขาดอีก 12 ชม.' },
];

export default function ReportWorklogsPage() {
  const [loading, setLoading] = useState(true);
  const [week, setWeek] = useState('สัปดาห์นี้ (2-6 มิ.ย. 2568)');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const complete = teamData.filter((d) => d.logged >= d.target).length;

  return (
    <ProtectedRoute>
      <AppLayout>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="fade-in" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                📊 รายงาน Worklogs ทั้งทีม
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                สรุปการกรอก Worklogs ของทีมประจำสัปดาห์
              </p>
            </div>
            <select
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: '1.5px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontFamily: 'Kanit, sans-serif',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option>สัปดาห์นี้ (2-6 มิ.ย. 2568)</option>
              <option>สัปดาห์ที่แล้ว (26-30 พ.ค. 2568)</option>
            </select>
          </div>

          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            ) : (
              <>
                {[
                  { label: 'สมาชิกทั้งหมด', value: teamData.length, icon: '👥', color: 'var(--accent-blue)' },
                  { label: 'กรอกครบแล้ว', value: complete, icon: '✅', color: 'var(--accent-green)' },
                  { label: 'ยังไม่ครบ', value: teamData.length - complete, icon: '⚠️', color: 'var(--accent-orange)' },
                ].map((s, i) => (
                  <div key={i} className={`card fade-in fade-in-delay-${i + 1}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>{s.label}</p>
                        <p style={{ fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</p>
                      </div>
                      <span style={{ fontSize: '24px' }}>{s.icon}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Team table */}
          <div className="card fade-in fade-in-delay-3">
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
              รายชื่อสมาชิกทีม
            </h3>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: '48px', borderRadius: '10px' }} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {teamData.map((member, i) => {
                  const pct = Math.min(100, (member.logged / member.target) * 100);
                  const done = member.logged >= member.target;
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        background: done ? 'rgba(110,231,183,0.06)' : 'rgba(253,186,116,0.06)',
                        border: `1px solid ${done ? 'rgba(110,231,183,0.2)' : 'rgba(253,186,116,0.2)'}`,
                        flexWrap: 'wrap',
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: done
                            ? 'linear-gradient(135deg, #6ee7b7, #34d399)'
                            : 'linear-gradient(135deg, #fdba74, #f97316)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#fff',
                          flexShrink: 0,
                        }}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1, minWidth: '120px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{member.position}</div>
                      </div>
                      <div style={{ flex: 2, minWidth: '120px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                          <span>{member.logged} / {member.target} ชม.</span>
                          <span>{pct.toFixed(0)}%</span>
                        </div>
                        <div style={{ height: '6px', borderRadius: '99px', background: 'var(--border-color)' }}>
                          <div
                            style={{
                              height: '100%',
                              borderRadius: '99px',
                              width: `${pct}%`,
                              background: done
                                ? 'linear-gradient(90deg, #6ee7b7, #34d399)'
                                : 'linear-gradient(90deg, #fdba74, #f97316)',
                              transition: 'width 0.6s ease',
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          padding: '3px 10px',
                          borderRadius: '99px',
                          fontWeight: 600,
                          background: done ? 'rgba(110,231,183,0.15)' : 'rgba(253,186,116,0.15)',
                          color: done ? '#6ee7b7' : '#fdba74',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {done ? '✅ ครบ' : `⏳ ${member.status}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
