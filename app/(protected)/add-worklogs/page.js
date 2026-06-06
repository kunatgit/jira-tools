'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';

const mockProjects = ['PROJ - ระบบจัดการ HR', 'DEV - Platform Backend', 'QA - Regression Testing', 'OPS - Infrastructure'];
const mockTasks = {
  'PROJ - ระบบจัดการ HR': ['PROJ-101 Login Feature', 'PROJ-102 User Management', 'PROJ-103 Report Module'],
  'DEV - Platform Backend': ['DEV-201 API Gateway', 'DEV-202 Auth Service', 'DEV-203 Notification Service'],
  'QA - Regression Testing': ['QA-301 Smoke Test', 'QA-302 Regression Suite', 'QA-303 Performance Test'],
  'OPS - Infrastructure': ['OPS-401 Server Setup', 'OPS-402 CI/CD Pipeline', 'OPS-403 Monitoring'],
};

export default function AddWorklogsPage() {
  const [project, setProject] = useState('');
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('0');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const tasks = project ? mockTasks[project] || [] : [];

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setProject(''); setTask(''); setHours(''); setMinutes('0'); setDescription('');
    }, 3000);
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid var(--border-color)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontFamily: 'Kanit, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '6px',
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="card fade-in">
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                📝 เพิ่ม Worklog ใหม่
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                บันทึกชั่วโมงการทำงานของคุณในวันนี้
              </p>
            </div>

            {submitted && (
              <div
                style={{
                  background: 'rgba(110,231,183,0.12)',
                  border: '1px solid rgba(110,231,183,0.4)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  fontSize: '13px',
                  color: '#6ee7b7',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                ✅ บันทึก Worklog สำเร็จ!
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Project</label>
                <select
                  value={project}
                  onChange={(e) => { setProject(e.target.value); setTask(''); }}
                  required
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-purple)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                >
                  <option value="">-- เลือก Project --</option>
                  {mockProjects.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Task / Issue</label>
                <select
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                  disabled={!project}
                  style={{ ...inputStyle, cursor: project ? 'pointer' : 'not-allowed', opacity: project ? 1 : 0.5 }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-purple)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                >
                  <option value="">-- เลือก Task --</option>
                  {tasks.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>วันที่</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-purple)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>ชั่วโมง</label>
                  <select
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-purple)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  >
                    <option value="">ชั่วโมง</option>
                    {Array.from({ length: 13 }, (_, i) => <option key={i} value={i}>{i} ชม.</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>นาที</label>
                  <select
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-purple)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                  >
                    {[0, 15, 30, 45].map((m) => <option key={m} value={m}>{m} นาที</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>รายละเอียดการทำงาน</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="อธิบายสิ่งที่ทำในช่วงเวลานี้..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-purple)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => { setProject(''); setTask(''); setHours(''); setDescription(''); }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    fontFamily: 'Kanit, sans-serif',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  ล้างข้อมูล
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--accent-purple), #8b5cf6)',
                    color: '#fff',
                    fontFamily: 'Kanit, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
                  }}
                >
                  {submitting ? '⏳ กำลังบันทึก...' : '💾 บันทึก Worklog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
