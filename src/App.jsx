import { useState } from "react";

const poolData = [
  { name: "Jim", players: [{ name: "Scheffler", score: -2 }, { name: "Cantlay", score: 5 }, { name: "Fleetwood", score: -1 }, { name: "Gotterup", score: 0 }, { name: "Morikawa", score: 2 }] },
  { name: "Gaston", players: [{ name: "Scheffler", score: -2 }, { name: "Schauffele", score: -2 }, { name: "Rahm", score: 6 }, { name: "Reed", score: -3 }, { name: "DeChambeau", score: 4 }] },
  { name: "Kathleen", players: [{ name: "Rahm", score: 6 }, { name: "McIlroy", score: -5 }, { name: "Rose", score: -2 }, { name: "DeChambeau", score: 4 }, { name: "Aberg", score: 2 }] },
  { name: "Charlie", players: [{ name: "Min Woo Lee", score: 6 }, { name: "Rahm", score: 6 }, { name: "DeChambeau", score: 4 }, { name: "Rose", score: -2 }, { name: "Aberg", score: 2 }] },
  { name: "Stella", players: [{ name: "Scheffler", score: -2 }, { name: "DeChambeau", score: 4 }, { name: "Aberg", score: 2 }, { name: "Gotterup", score: 0 }, { name: "Fleetwood", score: -1 }] },
  { name: "Mom Dewbray", players: [{ name: "Scheffler", score: -2 }, { name: "McIlroy", score: -5 }, { name: "DeChambeau", score: 4 }, { name: "Cam Young", score: 1 }, { name: "Koepka", score: 0 }] },
  { name: "Dad Dewbray", players: [{ name: "Aberg", score: 2 }, { name: "Cam Young", score: 1 }, { name: "Fleetwood", score: -1 }, { name: "Fitzpatrick", score: 2 }, { name: "DeChambeau", score: 4 }] },
  { name: "Tom", players: [{ name: "Fleetwood", score: -1 }, { name: "MacIntyre", score: 8 }, { name: "Fitzpatrick", score: 2 }, { name: "Aberg", score: 2 }, { name: "Cam Young", score: 1 }] },
  { name: "Joe", players: [{ name: "DeChambeau", score: 4 }, { name: "Schauffele", score: -2 }, { name: "McIlroy", score: -5 }, { name: "Rose", score: -2 }, { name: "Scheffler", score: -2 }] },
  { name: "Noah", players: [{ name: "Reed", score: -3 }, { name: "Min Woo Lee", score: 6 }, { name: "McIlroy", score: -5 }, { name: "DeChambeau", score: 4 }, { name: "Scheffler", score: -2 }] },
  { name: "Patrick", players: [{ name: "Burns", score: -5 }, { name: "DeChambeau", score: 4 }, { name: "D. Johnson", score: 1 }, { name: "McIlroy", score: -5 }, { name: "Scheffler", score: -2 }] },
  { name: "Becky", players: [{ name: "DeChambeau", score: 4 }, { name: "Scheffler", score: -2 }, { name: "McIlroy", score: -5 }, { name: "Rahm", score: 6 }, { name: "Fleetwood", score: -1 }] },
  { name: "Billy", players: [{ name: "Scheffler", score: -2 }, { name: "McIlroy", score: -5 }, { name: "Rahm", score: 6 }, { name: "DeChambeau", score: 4 }, { name: "Schauffele", score: -2 }] },
  { name: "Beth", players: [{ name: "Rahm", score: 6 }, { name: "McIlroy", score: -5 }, { name: "Scheffler", score: -2 }, { name: "DeChambeau", score: 4 }, { name: "Rose", score: -2 }] },
  { name: "Emily", players: [{ name: "DeChambeau", score: 4 }, { name: "Scheffler", score: -2 }, { name: "Rose", score: -2 }, { name: "McIlroy", score: -5 }, { name: "Fleetwood", score: -1 }] },
  { name: "Penelope", players: [{ name: "Lowry", score: -2 }, { name: "Scheffler", score: -2 }, { name: "DeChambeau", score: 4 }, { name: "Reed", score: -3 }, { name: "Fleetwood", score: -1 }] },
  { name: "Nora", players: [{ name: "DeChambeau", score: 4 }, { name: "Scheffler", score: -2 }, { name: "Lowry", score: -2 }, { name: "Rahm", score: 6 }, { name: "Fleetwood", score: -1 }] },
];

const ROUND = "After Round 1";
const fmt = (s) => s === 0 ? "E" : s > 0 ? `+${s}` : `${s}`;
const teamTotal = (players) => players.reduce((s, p) => s + p.score, 0);
const ranked = [...poolData].map((e) => ({ ...e, total: teamTotal(e.players) })).sort((a, b) => a.total - b.total);
const rankMap = {};
ranked.forEach((e, i) => { rankMap[e.name] = i + 1; });
const allGolfers = [...new Set(poolData.flatMap((e) => e.players.map((p) => p.name)))].sort();
const golferScoreMap = {};
poolData.forEach((e) => e.players.forEach((p) => { golferScoreMap[p.name] = p.score; }));
const memberGolferMap = {};
poolData.forEach((e) => { memberGolferMap[e.name] = {}; e.players.forEach((p) => { memberGolferMap[e.name][p.name] = p.score; }); });

const scoreStyle = (s) => {
  if (s <= -3) return { bg: "rgba(200,169,81,0.22)", color: "#f5d87a" };
  if (s < 0)   return { bg: "rgba(90,170,90,0.18)", color: "#7ecf7e" };
  if (s === 0) return { bg: "rgba(180,180,180,0.08)", color: "#999" };
  return              { bg: "rgba(220,80,60,0.18)", color: "#e87a6a" };
};

const BG = "#0b1710", GOLD = "#c8a951", CREAM = "#f0ead6", BORDER = "rgba(200,169,81,0.18)", DIM = "rgba(240,234,214,0.38)";

function Header({ view, setView }) {
  return (
    <div style={{ textAlign: "center", padding: "44px 20px 24px", borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ fontSize: "10px", letterSpacing: "6px", color: GOLD, textTransform: "uppercase", marginBottom: "10px" }}>Augusta National · 2026</div>
      <div style={{ fontSize: "30px", color: CREAM, letterSpacing: "1px", lineHeight: 1.15 }}>Par for the Dewbrays</div>
      <div style={{ fontSize: "12px", color: GOLD, letterSpacing: "3px", fontStyle: "italic", marginTop: "4px", marginBottom: "6px" }}>Masters Pool 2026 · 17 Entries</div>
      <div style={{ fontSize: "10px", color: "rgba(200,169,81,0.5)", letterSpacing: "2px", marginBottom: "18px" }}>{ROUND}</div>
      <div style={{ display: "inline-flex", border: `1px solid ${BORDER}`, borderRadius: "4px", overflow: "hidden" }}>
        {["Leaderboard", "Grid"].map((v) => (
          <button key={v} onClick={() => setView(v)} style={{ padding: "8px 22px", background: view === v ? "rgba(200,169,81,0.18)" : "transparent", color: view === v ? GOLD : DIM, border: "none", borderRight: v === "Leaderboard" ? `1px solid ${BORDER}` : "none", cursor: "pointer", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "Georgia, serif" }}>{v}</button>
        ))}
      </div>
    </div>
  );
}

function Leaderboard() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "20px 16px" }}>
      {ranked.map((entry, i) => {
        const open = expanded === entry.name, first = i === 0;
        return (
          <div key={entry.name} onClick={() => setExpanded(open ? null : entry.name)} style={{ margin: "7px 0", background: first ? "rgba(200,169,81,0.1)" : "rgba(255,255,255,0.025)", border: `1px solid ${first ? "rgba(200,169,81,0.38)" : "rgba(255,255,255,0.06)"}`, borderRadius: "4px", cursor: "pointer", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "13px 16px", gap: "14px" }}>
              <div style={{ width: "26px", textAlign: "center", fontSize: first ? "17px" : "13px", color: first ? GOLD : "rgba(240,234,214,0.3)", flexShrink: 0 }}>{first ? "🏆" : i + 1}</div>
              <div style={{ flex: 1, fontSize: "15px", color: CREAM }}>{entry.name}</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: scoreStyle(entry.total).color, minWidth: "48px", textAlign: "right" }}>{fmt(entry.total)}</div>
              <div style={{ color: "rgba(200,169,81,0.35)", fontSize: "11px", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</div>
            </div>
            {open && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 16px 14px" }}>
                {entry.players.map((p) => (
                  <div key={p.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ fontSize: "13px", color: "rgba(240,234,214,0.58)", fontStyle: "italic" }}>{p.name}</div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: scoreStyle(p.score).color }}>{fmt(p.score)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Grid() {
  const [sortBy, setSortBy] = useState("score");
  const [hovRow, setHovRow] = useState(null);
  const [hovCol, setHovCol] = useState(null);
  const members = poolData.map((e) => e.name);
  const golfers = sortBy === "score" ? [...allGolfers].sort((a, b) => golferScoreMap[a] - golferScoreMap[b]) : allGolfers;
  return (
    <div style={{ padding: "20px 12px 0" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "18px" }}>
        {["score", "name"].map((opt) => (
          <button key={opt} onClick={() => setSortBy(opt)} style={{ background: sortBy === opt ? "rgba(200,169,81,0.18)" : "transparent", border: `1px solid ${sortBy === opt ? "rgba(200,169,81,0.5)" : "rgba(255,255,255,0.08)"}`, color: sortBy === opt ? GOLD : DIM, padding: "5px 14px", borderRadius: "3px", cursor: "pointer", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Georgia, serif" }}>Sort: {opt}</button>
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", minWidth: "900px", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "9px 14px", fontSize: "9px", letterSpacing: "3px", color: "rgba(200,169,81,0.55)", textTransform: "uppercase", borderBottom: `1px solid ${BORDER}`, position: "sticky", left: 0, background: BG, zIndex: 2, minWidth: "110px" }}>Golfer</th>
              {members.map((m, ci) => (
                <th key={m} onMouseEnter={() => setHovCol(ci)} onMouseLeave={() => setHovCol(null)} style={{ padding: "9px 4px", fontSize: "10px", color: hovCol === ci ? GOLD : "rgba(240,234,214,0.7)", borderBottom: `1px solid ${BORDER}`, textAlign: "center", minWidth: "62px", background: hovCol === ci ? "rgba(200,169,81,0.05)" : "transparent", transition: "color 0.15s" }}>
                  <div>{m.replace(" Dewbray", "")}</div>
                  <div style={{ fontSize: "8px", color: "rgba(200,169,81,0.4)", marginTop: "2px" }}>#{rankMap[m]}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {golfers.map((golfer, ri) => (
              <tr key={golfer} onMouseEnter={() => setHovRow(ri)} onMouseLeave={() => setHovRow(null)} style={{ background: hovRow === ri ? "rgba(200,169,81,0.04)" : ri % 2 === 0 ? "rgba(255,255,255,0.012)" : "transparent" }}>
                <td style={{ padding: "8px 14px", fontSize: "11px", color: "rgba(240,234,214,0.75)", fontStyle: "italic", borderBottom: "1px solid rgba(255,255,255,0.035)", position: "sticky", left: 0, background: hovRow === ri ? "#152015" : ri % 2 === 0 ? "#0d1a10" : BG, zIndex: 1, whiteSpace: "nowrap" }}>{golfer}</td>
                {members.map((m, ci) => {
                  const score = memberGolferMap[m][golfer], has = score !== undefined, s = has ? scoreStyle(score) : null, lit = hovRow === ri || hovCol === ci;
                  return (
                    <td key={m} onMouseEnter={() => setHovCol(ci)} onMouseLeave={() => setHovCol(null)} style={{ padding: "7px 4px", textAlign: "center", fontSize: "12px", fontWeight: has ? "bold" : "normal", color: has ? s.color : "rgba(255,255,255,0.06)", background: has ? (lit ? "rgba(200,169,81,0.12)" : s.bg) : lit ? "rgba(255,255,255,0.025)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.035)", borderLeft: hovCol === ci ? "1px solid rgba(200,169,81,0.08)" : "1px solid transparent", transition: "background 0.1s" }}>
                      {has ? fmt(score) : "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr style={{ borderTop: `2px solid rgba(200,169,81,0.28)` }}>
              <td style={{ padding: "11px 14px", fontSize: "10px", letterSpacing: "3px", color: GOLD, textTransform: "uppercase", position: "sticky", left: 0, background: BG, zIndex: 1 }}>Total</td>
              {members.map((m, ci) => {
                const t = poolData.find((e) => e.name === m).players.reduce((s, p) => s + p.score, 0), rank = rankMap[m];
                return (
                  <td key={m} onMouseEnter={() => setHovCol(ci)} onMouseLeave={() => setHovCol(null)} style={{ padding: "11px 4px", textAlign: "center", fontSize: "13px", fontWeight: "bold", color: rank === 1 ? "#f5d87a" : scoreStyle(t).color, background: rank === 1 ? "rgba(200,169,81,0.12)" : "transparent" }}>
                    {fmt(t)}{rank === 1 && <div style={{ fontSize: "10px", marginTop: "2px" }}>🏆</div>}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("Leaderboard");
  return (
    <div style={{ minHeight: "100vh", background: BG, backgroundImage: `radial-gradient(ellipse at 15% 0%, rgba(28,72,28,0.28) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(200,169,81,0.07) 0%, transparent 50%)`, fontFamily: "Georgia, serif", paddingBottom: "60px" }}>
      <Header view={view} setView={setView} />
      {view === "Leaderboard" ? <Leaderboard /> : <Grid />}
      <div style={{ textAlign: "center", marginTop: "44px", fontSize: "10px", color: "rgba(200,169,81,0.22)", letterSpacing: "3px", textTransform: "uppercase" }}>A tradition unlike any other</div>
    </div>
  );
}
