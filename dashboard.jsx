/* global React, RC_DATA, Icon, fmtPrice */


// === Dashboard ===
const Dashboard = ({ go }) => {
  return (
    <>
      <div className="page-h dash-page-h">
        <div>
          <h1>Good Afternoon, Mike</h1>
          <div className="sub">Here's what's happening across your network today.</div>
        </div>
      </div>

      <div className="section-h dash-section-h">
        <h2>What do you want to do?</h2>
      </div>
      <div className="qa-grid qa-grid-bold">
        <QA icon="share" tone="green" title="Share Listings" desc="Pick listings and send them to your network." cta="Share now" onClick={() => go("listings")} />
        <QA icon="spotlight" tone="blue" title="Create a Spotlight" desc="Bundle multiple listings into one site." cta="Build spotlight" onClick={() => go("spotlights")} />
        <QA icon="user" tone="amber" title="Invite to Network" desc="Send an email invitation to collaborate." cta="Send invite" onClick={() => go("network")} />
        <QA icon="company" tone="purple" title="Company Marketing" desc="Brokerage-wide assets and campaigns." cta="Browse assets" onClick={() => go("company")} />
      </div>

      <div className="two-col">
        <div className="card">
          <div className="section-h" style={{ margin: "0", padding: "16px 18px", borderBottom: "1px solid var(--border-2)" }}>
            <h2 style={{ fontSize: 16 }}>Recent Shares</h2>
            <a href="#" className="link">View all</a>
          </div>
          {RC_DATA.recentShares.map((s, i) => {
            const dest = s.action.includes("spotlight") ? "spotlights" : "listings";
            return (
              <div key={i} className="share-row">
                <div className="thumb" style={{ backgroundImage: `url(${s.thumb})` }}></div>
                <div className="share-row-body">
                  <div><span className="bold">{s.who}</span> <span className="muted">{s.action}</span></div>
                  <div style={{ marginTop: 2, fontSize: 13 }}>{s.item}</div>
                </div>
                <div className="share-row-meta">
                  <div className="who" style={{ display: "flex" }}>
                    {s.avas.map((a, j) => <div key={j} className="ava" style={{ backgroundImage: `url(${a})` }}></div>)}
                  </div>
                  <div className="muted" style={{ fontSize: 12.5 }}>{s.time}</div>
                </div>
                <button className="btn btn-secondary btn-sm share-row-view" onClick={() => go(dest)}>View</button>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card aside-card">
            <h3>This Month</h3>
            <Activity icon="share" tone="green" title="You shared 14 listings" meta="Reaching 47 network members" />
            <Activity icon="eye" tone="blue" title="2,388 spotlight views" meta="Up 18% vs. last month" />
            <Activity icon="user" tone="amber" title="6 new network members" meta="3 invitations pending" />
            <Activity icon="star" tone="green" title="23 new leads" meta="From shared marketing" />
          </div>
          <div className="card aside-card" style={{ background: "linear-gradient(135deg, #ECFDF5, #fff)" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="sparkle" size={14} /> Pro tip</h3>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ink-2)" }}>
              Spotlights shared with at least 10 network members generate <span className="bold">3.4×</span> more leads on average. Try grouping your Mercer Island listings.
            </p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>Create spotlight</button>
          </div>
        </div>
      </div>
    </>
  );
};

const Stat = ({ label, value, delta, up }) => (
  <div className="stat">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
    <div className={`delta ${up ? "up" : "down"}`}>
      <Icon name={up ? "arrowUp" : "arrowR"} size={12} /> {delta}
    </div>
  </div>
);

const QA = ({ icon, tone, title, desc, cta, onClick }) => (
  <div className={`qa qa-bold qa-${tone}`} onClick={onClick} style={{ cursor: "pointer" }}>
    <div className={`ic ${tone}`}><Icon name={icon} size={20} /></div>
    <h4>{title}</h4>
    <p>{desc}</p>
    <button className="btn btn-primary btn-sm qa-cta" onClick={e => { e.stopPropagation(); onClick(); }}><span className="qa-cta-text">{cta}</span> <Icon name="arrowR" size={13} /></button>
  </div>
);

const Activity = ({ icon, tone, title, meta }) => (
  <div className="act">
    <div className={`ic ${tone}`}><Icon name={icon} size={14} /></div>
    <div className="body">
      <div className="who">{title}</div>
      <div className="meta">{meta}</div>
    </div>
  </div>
);

Object.assign(window, { Dashboard });
