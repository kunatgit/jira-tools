"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/components/auth/AuthProvider";
import { CardSkeleton } from "@/components/loading/Skeleton";
import { neon } from "@neondatabase/serverless";

export default function HomePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // mockup ข่าวสาร
  const announcements = [
    {
      title: "ระบบ Worklog อัปเดตใหม่",
      desc: "สามารถบันทึกเวลาได้สะดวกขึ้น",
      icon: "📝",
    },
    {
      title: "Reminder",
      desc: "อย่าลืมกรอก Worklog ก่อน 18:00 น.",
      icon: "⏰",
    },
    {
      title: "โปรเจกต์ Active ล่าสุด",
      desc: "Internal Tools, Jira Sync",
      icon: "🚀",
    },
    {
      title: "Tip ประจำวัน",
      desc: "ตรวจสอบ Task ที่ใกล้ครบกำหนดทุกเช้า",
      icon: "💡",
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);

    (async () => {
      try {
        const res = await fetch("/api/test/database-connect");
        const data = await res.json();
        console.log("DB Result:", data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();

    return () => clearTimeout(t);
  }, []);

  const today = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ProtectedRoute>
      <AppLayout>
        <div style={{ width: "100%", minHeight: "100%" }}>
          {/* Greeting */}
          <div className="fade-in" style={{ marginBottom: "24px" }}>
            <div className="greeting-card">
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "var(--text-primary)",
                }}
              >
                สวัสดี, {user?.name || "ผู้ใช้งาน"} 👋
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                {today}
              </p>
            </div>
          </div>

          {/* Announcement mockup */}
          <div className="card fade-in fade-in-delay-3">
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 700,
                marginBottom: "12px",
                color: "var(--text-primary)",
              }}
            >
              📢 ข่าวสาร
            </h3>

            {loading ? (
              <CardSkeleton />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {announcements.map((item, i) => (
                  <div key={i} className="announcement-item">
                    <div style={{ fontSize: "20px", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="announcement-title">{item.title}</div>
                      <div className="announcement-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AppLayout>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ProtectedRoute>
  );
}
