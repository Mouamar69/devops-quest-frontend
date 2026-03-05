/**
 * AuthModal — Modale de connexion / inscription (thème terminal)
 */

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.username, form.email, form.password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#020a14",
    border: "1px solid #1e3a5f",
    borderRadius: 2,
    padding: "10px 14px",
    color: "#e2e8f0",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: 10,
    color: "#334155",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: 6,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2, 6, 23, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0a1628",
          border: "1px solid #1e3a5f",
          borderTop: "2px solid #22c55e",
          borderRadius: 2,
          padding: 32,
          width: 420,
          animation: "fadeInUp 0.25s ease-out",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}>
            <span style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#4ade80",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "3px",
            }}>
              {mode === "login" ? "// LOGIN" : "// REGISTER"}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "#334155",
                cursor: "pointer",
                fontSize: 18,
                fontFamily: "'JetBrains Mono', monospace",
                lineHeight: 1,
              }}
            >×</button>
          </div>
          <p style={{
            fontSize: 11,
            color: "#334155",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {mode === "login"
              ? "Connecte-toi pour sauvegarder ta progression"
              : "Crée ton compte et rejoins le leaderboard"}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {["login", "register"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(null); }}
              style={{
                flex: 1,
                padding: "8px 0",
                background: mode === m ? "#022c0a" : "#020617",
                border: `1px solid ${mode === m ? "#22c55e" : "#1e3a5f"}`,
                color: mode === m ? "#22c55e" : "#334155",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "1px",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 2,
              }}
            >
              {m === "login" ? "Se connecter" : "S'inscrire"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          {mode === "register" && (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                value={form.username}
                onChange={set("username")}
                placeholder="ton_pseudo"
                required
                style={inputStyle}
              />
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="toi@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{
              background: "#0d0202",
              border: "1px solid #7f1d1d",
              borderLeft: "3px solid #ef4444",
              borderRadius: 2,
              padding: "10px 14px",
              fontSize: 12,
              color: "#f87171",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 16,
            }}>
              ! {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 0",
              background: loading ? "#0a1628" : "#022c0a",
              border: "1px solid #22c55e",
              color: "#22c55e",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              borderRadius: 2,
              opacity: loading ? 0.7 : 1,
              transition: "all 0.15s",
            }}
          >
            {loading
              ? "[ CHARGEMENT... ]"
              : mode === "login"
                ? "[ > CONNEXION ]"
                : "[ > CRÉER LE COMPTE ]"}
          </button>
        </form>
      </div>
    </div>
  );
}
