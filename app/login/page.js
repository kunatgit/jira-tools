"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/home");

    const savedUsername = localStorage.getItem("rememberedUsername");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRemember(true); // ถ้ามี checkbox remember
    }
  }, [user, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(username, password);

      if (result.success) {
        // Success alert
        await Swal.fire({
          title: "สำเร็จ!",
          text: "เข้าสู่ระบบสำเร็จ ❤️",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "ปิด",
          timer: 1500,
          timerProgressBar: true,
        });

        router.replace("/home"); // redirect หลัง popup ปิด
      } else {
        // Failed login alert
        await Swal.fire({
          title: "เกิดข้อผิดพลาด 🤬",
          text: result.message,
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "ปิด",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      // Catch error alert
      await Swal.fire({
        title: "เกิดข้อผิดพลาด 🥵",
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "ปิด",
        timer: 1500,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(167,139,250,0.18), transparent 32%), radial-gradient(circle at bottom left, rgba(249,168,212,0.16), transparent 35%), var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "-110px",
          right: "-90px",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.26), rgba(167,139,250,0.05) 55%, transparent 72%)",
          pointerEvents: "none",
          filter: "blur(2px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          left: "-90px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,168,212,0.22), rgba(249,168,212,0.06) 58%, transparent 74%)",
          pointerEvents: "none",
          filter: "blur(2px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "12%",
          width: "90px",
          height: "90px",
          borderRadius: "28px",
          background:
            "linear-gradient(135deg, rgba(147,197,253,0.22), rgba(147,197,253,0.06))",
          border: "1px solid rgba(147,197,253,0.28)",
          boxShadow: "0 20px 60px rgba(147,197,253,0.22)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          filter: "blur(0.3px)",
          transform: "rotate(16deg)",
          pointerEvents: "none",
          filter: "blur(4px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "14%",
          width: "72px",
          height: "72px",
          borderRadius: "22px",
          background:
            "linear-gradient(135deg, rgba(110,231,183,0.22), rgba(110,231,183,0.06))",
          border: "1px solid rgba(110,231,183,0.28)",
          boxShadow: "0 20px 55px rgba(110,231,183,0.22)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          filter: "blur(0.3px)",
          transform: "rotate(-14deg)",
          pointerEvents: "none",
          filter: "blur(4px)",
        }}
      />

      {/* Card */}
      <div
        className="fade-in"
        style={{
          width: "100%",
          maxWidth: "500px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), var(--bg-card)",
          borderRadius: "28px",
          padding: "34px 30px 30px",
          border: "1px solid var(--border-color)",
          boxShadow:
            "0 24px 70px rgba(0,0,0,0.16), 0 8px 24px rgba(167,139,250,0.12)",
          position: "relative",
          backdropFilter: "blur(14px)",
          overflow: "hidden",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "68%",
            height: "4px",
            borderRadius: "0 0 999px 999px",
            background:
              "linear-gradient(90deg, var(--accent-purple), var(--accent-pink), var(--accent-blue))",
          }}
        />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "22px",
              background:
                "linear-gradient(135deg, var(--accent-purple), var(--accent-pink))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              margin: "0 auto 14px",
              boxShadow:
                "0 14px 30px rgba(167,139,250,0.36), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            🛠️
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "6px",
              letterSpacing: "-0.4px",
            }}
          >
            Jira Tools
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            เข้าสู่ระบบเพื่อจัดการ Task งานของคุณและทีม
          </p>
        </div>

        {/* Demo accounts hint */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(147,197,253,0.13), rgba(167,139,250,0.08))",
            border: "1px solid rgba(147,197,253,0.28)",
            borderRadius: "16px",
            padding: "13px 14px",
            marginBottom: "20px",
            fontSize: "12px",
            color: "var(--text-secondary)",
            boxShadow: "0 8px 20px rgba(147,197,253,0.08)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: "7px",
              color: "var(--accent-blue)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>💡</span>
            <span>คำแนะนำ</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span>
                กรุณาติดต่อผู้ดูแลระบบเพื่อขอชื่อผู้ใช้งานและรหัสผ่าน 😘
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--text-secondary)",
                marginBottom: "7px",
              }}
            >
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="กรอก Username"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "14px",
                border: "1.5px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontFamily: "Kanit, sans-serif",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.18s ease",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-purple)";
                e.target.style.boxShadow = "0 0 0 4px rgba(167,139,250,0.13)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border-color)";
                e.target.style.boxShadow =
                  "inset 0 1px 0 rgba(255,255,255,0.04)";
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--text-secondary)",
                marginBottom: "7px",
              }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอก Password"
                required
                style={{
                  width: "100%",
                  padding: "12px 44px 12px 14px",
                  borderRadius: "14px",
                  border: "1.5px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontFamily: "Kanit, sans-serif",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.18s ease",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent-purple)";
                  e.target.style.boxShadow = "0 0 0 4px rgba(167,139,250,0.13)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-color)";
                  e.target.style.boxShadow =
                    "inset 0 1px 0 rgba(255,255,255,0.04)";
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "30px",
                  height: "30px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-card)",
                  cursor: "pointer",
                  fontSize: "15px",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div
            className="checkbox-wrapper-30"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--text-secondary)",
            }}
          >
            <span className="checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => {
                  setRemember(e.target.checked);
                  if (e.target.checked) {
                    localStorage.setItem("rememberedUsername", username);
                    localStorage.setItem("rememberedPassword", password);
                  } else {
                    localStorage.removeItem("rememberedUsername");
                    localStorage.removeItem("rememberedPassword");
                  }
                }}
              />
              <svg>
                <use xlinkHref="#checkbox-30" className="checkbox"></use>
              </svg>
            </span>

            {/* SVG symbol สำหรับ tick mark */}
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
              <symbol id="checkbox-30" viewBox="0 0 22 22">
                <path
                  fill="none"
                  stroke="currentColor"
                  d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13
        c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
                ></path>
              </symbol>
            </svg>

            <span
              style={{ userSelect: "none", cursor: "pointer", fontWeight: 500 }}
            >
              จดจำรหัสผ่าน
            </span>
          </div>

          {error && (
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(248,113,113,0.12), rgba(248,113,113,0.06))",
                border: "1px solid rgba(248,113,113,0.3)",
                borderRadius: "12px",
                padding: "11px 13px",
                fontSize: "13px",
                color: "#f87171",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                lineHeight: 1.5,
              }}
            >
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "2px",
              padding: "13px",
              borderRadius: "14px",
              border: "none",
              background: loading
                ? "var(--border-color)"
                : "linear-gradient(135deg, var(--accent-purple), #8b5cf6)",
              color: loading ? "var(--text-muted)" : "#fff",
              fontFamily: "Kanit, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: loading ? "none" : "0 10px 24px rgba(139,92,246,0.34)",
              letterSpacing: "0.1px",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 30px rgba(139,92,246,0.42)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = loading
                ? "none"
                : "0 10px 24px rgba(139,92,246,0.34)";
            }}
          >
            {loading ? "⏳ กำลังเข้าสู่ระบบ..." : "🔑 เข้าสู่ระบบ"}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-color)",
            textAlign: "center",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          Secure mock login for internal testing
        </div>
      </div>
    </div>
  );
}
