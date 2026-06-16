/* global React, Icon */

// ─── My Profile ──────────────────────────────────────────────────────────────

const MyProfile = ({ go }) => {
  const SocialField = ({ label, placeholder }) => (
    <div className="field">
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  );

  return (
    <>
      <div className="page-h">
        <div>
          <h1>My Profile</h1>
          <div className="sub">Manage your account information.</div>
        </div>
      </div>

      <div className="settings-profile-grid">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Profile Information */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>Profile Information</h3>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--muted)" }}>Update your account's profile information and email address.</p>

            <div className="field">
              <label>Photo</label>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>JPG, PNG, or WebP. Max 12 MB. Any dimensions.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "999px",
                  background: "var(--navy-700)", color: "#fff",
                  display: "grid", placeItems: "center",
                  fontSize: 18, fontWeight: 600, flexShrink: 0,
                }}>HM</div>
                <div className="settings-photo-row" style={{ gap: 10 }}>
                  <button className="btn btn-secondary">SELECT A NEW PHOTO</button>
                  <button className="btn btn-primary">Save</button>
                </div>
              </div>
            </div>

            <div className="field"><label>Name</label><input defaultValue="Haydn Mitchel" /></div>
            <div className="field"><label>Email</label><input defaultValue="haydn@sitech.io" type="email" /></div>
            <div className="field">
              <label>MLS Selected</label>
              <select defaultValue="Stellar MLS">
                <option>Stellar MLS</option>
                <option>Beaches MLS</option>
                <option>MIAMI REALTORS MLS</option>
              </select>
            </div>
            <div className="field"><label>Agent MLS ID</label><input defaultValue="089400421" /></div>
            <div className="field"><label>Office MLS ID</label><input placeholder="" /></div>
            <div className="field"><label>Phone</label><input defaultValue="7222958330" type="tel" /></div>

            <div style={{ margin: "4px 0 12px" }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Links &amp; Social</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Optional URLs for your website and social profiles.</div>
            </div>
            <SocialField label="Website" placeholder="https://example.com" />
            <SocialField label="Facebook" placeholder="https://facebook.com/..." />
            <SocialField label="Instagram" placeholder="https://instagram.com/..." />
            <SocialField label="X (Twitter)" placeholder="https://x.com/..." />
            <SocialField label="LinkedIn" placeholder="https://linkedin.com/in/..." />
            <SocialField label="YouTube" placeholder="https://youtube.com/..." />
            <SocialField label="TikTok" placeholder="https://tiktok.com" />

            <button className="btn btn-primary">Save</button>
          </div>

          {/* Update Password */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>Update Password</h3>
            <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--muted)" }}>Ensure your account is using a long, random password to stay secure.</p>
            <div className="field"><label>Current Password</label><input type="password" /></div>
            <div className="field"><label>New Password</label><input type="password" /></div>
            <div className="field"><label>Confirm Password</label><input type="password" /></div>
            <button className="btn btn-primary">Save</button>
          </div>

          {/* Connected Accounts */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>Connected Accounts</h3>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--muted)" }}>Connect your social media accounts to enable Sign In with OAuth.</p>
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#991b1b", marginBottom: 16 }}>
              If you feel any of your connected accounts have been compromised, you should disconnect them immediately and change your password.
            </div>
            {[
              { name: "Google", abbr: "G", color: "#EA4335", bg: "#fef2f2" },
              { name: "LinkedIn", abbr: "in", color: "#0A66C2", bg: "#eff6ff" },
            ].map((a, i) => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i === 0 ? "1px solid var(--border)" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: a.bg, display: "grid", placeItems: "center", color: a.color, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {a.abbr}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Not connected</div>
                </div>
                <button className="btn btn-secondary">CONNECT</button>
              </div>
            ))}
          </div>

          {/* Browser Sessions */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>Browser Sessions</h3>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              Manage and log out your active sessions on other browsers and devices. If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.
            </p>
            {[
              { device: "OS X — Chrome", ip: "130.91.177.222", label: "This device", current: true },
              { device: "OS X — Chrome", ip: "130.91.177.222", label: "Last active 3 hours ago" },
              { device: "OS X — Chrome", ip: "47.195.171.54", label: "Last active 3 hours ago" },
              { device: "OS X — Chrome", ip: "209.188.228.3", label: "Last active 4 hours ago" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border-2)" }}>
                <Icon name="desktop" size={20} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{s.device}</div>
                  <div style={{ fontSize: 12, color: s.current ? "var(--green-600)" : "var(--muted)" }}>{s.ip}, {s.label}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary">Log Out Other Browser Sessions</button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>Delete Account</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              Permanently delete your account. Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
            </p>
            <button className="btn" style={{ background: "#ef4444", color: "#fff", borderRadius: 999 }}>
              Delete Account
            </button>
          </div>
        </div>

        {/* Right — Billing Info */}
        <div className="card" style={{ padding: 20, position: "sticky", top: 80, alignSelf: "start" }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600 }}>Billing Info</h3>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--muted)" }}>Update and manage your billing information.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 13, marginBottom: 18 }}>
            <div><span style={{ color: "var(--muted)" }}>Next Billing Date:</span> <strong>Dec 3, 2026</strong></div>
            <div><span style={{ color: "var(--muted)" }}>Your plan:</span> <strong>Annual Agent Plan</strong></div>
            <div><span style={{ color: "var(--muted)" }}>Price:</span> <strong>$21/mo · $252 billed annually</strong></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="#" style={{ fontSize: 13 }} onClick={e => { e.preventDefault(); go("billing-history"); }}>• View Billing History</a>
            <a href="#" style={{ fontSize: 13 }} onClick={e => { e.preventDefault(); go("payment-method"); }}>• View/Update Payment Method</a>
            <a href="#" style={{ fontSize: 13 }} onClick={e => { e.preventDefault(); go("plans"); }}>• Upgrade/Change Plan</a>
            <a href="#" style={{ fontSize: 13, color: "#ef4444" }}>• Cancel Plan</a>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <h2>Questions?</h2>
        <p>Collaborative team and brokerage accounts are available. If you are interested,<br />please contact us at <a href="mailto:reconnect@neutrinoinc.com">reconnect@neutrinoinc.com</a></p>
        <p className="footer-brand">Powered by Neutrino®</p>
      </div>
    </>
  );
};

// ─── Account Settings ─────────────────────────────────────────────────────────

const AccountSettings = () => {
  return (
    <>
      <div className="page-h">
        <div>
          <h1>Account Settings</h1>
          <div className="sub">Manage your SLW logo for Single Listing Websites.</div>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>SLW Logo</h3>
        <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--muted)" }}>
          Upload your logo for Single Listing Websites (SLW). This logo will appear on your listing pages. Max 2MB.
        </p>
        <div className="field">
          <label>Logo</label>
          <div style={{
            width: 160, height: 80,
            border: "1px solid var(--border)", borderRadius: 8,
            display: "grid", placeItems: "center",
            background: "var(--surface)", marginBottom: 14,
            fontSize: 13, color: "var(--muted)",
          }}>
            No logo uploaded
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary">SELECT LOGO</button>
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <h2>Questions?</h2>
        <p>Collaborative team and brokerage accounts are available. If you are interested,<br />please contact us at <a href="mailto:reconnect@neutrinoinc.com">reconnect@neutrinoinc.com</a></p>
        <p className="footer-brand">Powered by Neutrino®</p>
      </div>
    </>
  );
};

// ─── MLS Info ────────────────────────────────────────────────────────────────

const MLS_AVAILABLE = [
  "Stellar MLS", "Beaches MLS", "MIAMI REALTORS MLS", "Palm Beach Board of REALTORS",
  "Martin County REALTORS of the Treasure Coast", "Greenwich Association of REALTORS",
  "Berkshire County Board of REALTORS", "Columbia Greene Northern Dutchess MLS",
  "OneKey MLS", "StateWide MLS", "Long Island MLS", "Garden State MLS",
  "Connecticut MLS", "Maine Listings", "New Hampshire MLS", "Vermont MLS",
  "Cape Cod & Islands MLS", "New England Real Estate Network", "TREND MLS",
  "Bright MLS", "MRIS", "CAAR MLS", "REIN MLS", "Hampton Roads MLS",
  "Triangle MLS", "Canopy MLS", "Consolidated MLS", "Triad MLS",
  "Charleston MLS", "Coastal Carolinas MLS", "Hilton Head Island MLS",
  "Savannah MLS", "Northeast Georgia MLS", "Atlanta REALTORS MLS",
  "Tallahassee MLS", "Naples MLS", "Sarasota MLS",
];

const MLS_PAGE_SIZE = 10;

const ActivateMLSModal = ({ mlsName, onClose }) => {
  const [mlsId, setMlsId] = React.useState("");
  const [selected, setSelected] = React.useState(mlsName || "Stellar MLS (StellarMLS)");
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" style={{ width: "min(480px, calc(100vw - 32px))" }} onClick={e => e.stopPropagation()}>
        <div className="modal-h">
          <h2>Activate MLS</h2>
          <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
        </div>
        <div className="modal-b" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>Add-on pricing</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>$23.00</span>
              <span style={{ fontSize: 15, color: "var(--muted)" }}>/mo</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>This will be added to your subscription and prorated.</div>
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label>MLS <span style={{ color: "var(--red, #e04343)" }}>*</span></label>
            <div style={{ position: "relative" }}>
              <select
                className="modal-select"
                value={selected}
                onChange={e => setSelected(e.target.value)}
                style={{ width: "100%", appearance: "none", paddingRight: 36 }}
              >
                {MLS_AVAILABLE.map(name => (
                  <option key={name}>{name}</option>
                ))}
              </select>
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)" }}>
                <Icon name="chevD" size={14} />
              </span>
            </div>
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label>Agent MLS ID <span style={{ color: "var(--red, #e04343)" }}>*</span></label>
            <input
              value={mlsId}
              onChange={e => setMlsId(e.target.value)}
              placeholder="Your member MLS ID"
            />
          </div>
        </div>
        <div className="modal-f" style={{ justifyContent: "flex-start", gap: 16 }}>
          <button className="btn btn-primary" onClick={onClose}>Verify &amp; continue</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const ManageMLSInfo = () => {
  const [search, setSearch] = React.useState("");
  const [activateMLS, setActivateMLS] = React.useState(null);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => { setPage(1); }, [search]);

  const filtered = MLS_AVAILABLE.filter(name =>
    !search || name.toLowerCase().includes(search.toLowerCase())
  );
  const total = filtered.length;
  const totalPages = Math.ceil(total / MLS_PAGE_SIZE);
  const list = filtered.slice((page - 1) * MLS_PAGE_SIZE, page * MLS_PAGE_SIZE);

  const pageNums = () => {
    if (totalPages <= 10) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums = Array.from({ length: 10 }, (_, i) => i + 1);
    nums.push("...", totalPages - 1, totalPages);
    return nums;
  };

  return (
    <>
      <div className="page-h">
        <div>
          <h1>MLS Info</h1>
          <div className="sub">Manage your connections to your MLSs.</div>
        </div>
      </div>

      {/* My MLS */}
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>My MLS</h2>
      <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 32 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {[
                { label: "Name" }, { label: "Member ID" }, { label: "Agent Name" },
                { label: "Office ID", cls: "mls-table-office" }, { label: "Status" }, { label: "Actions" }
              ].map(h => (
                <th key={h.label} className={h.cls || ""} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: 13, color: "var(--ink)", background: "var(--surface)" }}>{h.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "13px 16px", fontWeight: 500 }}>Stellar MLS</td>
              <td style={{ padding: "13px 16px" }}>089400421</td>
              <td style={{ padding: "13px 16px" }}>Haydn Mitchel</td>
              <td className="mls-table-office" style={{ padding: "13px 16px", color: "var(--muted)" }}>—</td>
              <td style={{ padding: "13px 16px" }}><span className="pill pill-green" style={{ fontSize: 12 }}>Active</span></td>
              <td style={{ padding: "13px 16px", color: "var(--muted)" }}>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Available MLS Systems */}
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>Available MLS Systems</h2>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 10 }}>
          <div className="users-search" style={{ flex: 1 }}>
            <span className="users-search-ic"><Icon name="search" size={15} /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Start typing name to search..." />
          </div>
          <button className="btn btn-secondary btn-sm"><Icon name="filter" size={13} /> Filter</button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--ink)", background: "var(--surface)" }}>Name</th>
              <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "var(--ink)", background: "var(--surface)" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(name => (
              <tr key={name} style={{ borderBottom: "1px solid var(--border-2)" }}>
                <td style={{ padding: "13px 16px", fontWeight: 500 }}>{name}</td>
                <td style={{ padding: "13px 16px", textAlign: "right" }}>
                  <button className="btn btn-primary btn-sm" onClick={() => setActivateMLS(name)}>Activate MLS</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "var(--muted)", marginRight: 8 }}>
            Showing {(page - 1) * MLS_PAGE_SIZE + 1} to {Math.min(page * MLS_PAGE_SIZE, total)} of {total} results
          </span>
          <button className="pg-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}><Icon name="chevL" size={13} /></button>
          {pageNums().map((p, i) =>
            p === "..." ? (
              <span key={i} style={{ padding: "0 4px", fontSize: 13, color: "var(--muted)" }}>…</span>
            ) : (
              <button key={p} className={`pg-btn ${p === page ? "active" : ""}`} onClick={() => setPage(p)}>{p}</button>
            )
          )}
          <button className="pg-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><Icon name="chevR" size={13} /></button>
        </div>
      </div>

      <div className="page-footer">
        <h2>Questions?</h2>
        <p>Collaborative team and brokerage accounts are available. If you are interested,<br />please contact us at <a href="mailto:reconnect@neutrinoinc.com">reconnect@neutrinoinc.com</a></p>
        <p className="footer-brand">Powered by Neutrino®</p>
      </div>

      {activateMLS && <ActivateMLSModal mlsName={activateMLS} onClose={() => setActivateMLS(null)} />}
    </>
  );
};

// ─── Subscription Plans ───────────────────────────────────────────────────────

const SubscriptionPlans = () => {
  const [billing, setBilling] = React.useState("annual");

  const plans = [
    {
      name: "Agent",
      price: { monthly: 50, annual: 21 },
      subscribed: true,
      features: [
        { text: "Includes all agent's listings in your MLS" },
        { text: "Each additional MLS $25/mo (available after 14-day trial)" },
        { text: "One Free Property Website", bold: true },
      ],
    },
    {
      name: "Small Office",
      price: { monthly: 149, annual: 89 },
      features: [
        { text: "Up to 10 agents" },
        { text: "Includes all agent's listings in your MLS" },
        { text: "Each additional MLS $25/mo (available after 14-day trial)" },
        { text: "One Free Property Website", bold: true },
      ],
    },
    {
      name: "Large Office",
      price: { monthly: 249, annual: 149 },
      features: [
        { text: "Up to 25 agents" },
        { text: "Includes all agent's listings in your MLS" },
        { text: "Each additional MLS $25/mo (available after 14-day trial)" },
        { text: "One Free Property Website", bold: true },
      ],
    },
    {
      name: "Enterprise",
      enterprise: true,
      features: [
        { text: "Get Special Pricing for Large Organizations and Multiple MLS Data Feeds" },
      ],
    },
  ];

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Your Plan</h1>
          <div className="sub">A paid subscription is required to use REConnect. Choose the plan that best fits your needs.</div>
        </div>
      </div>

      {/* Billing toggle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <div style={{ position: "relative", display: "inline-flex", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 999, padding: 4, gap: 0, boxShadow: "var(--shadow-sm)" }}>
          <button
            onClick={() => setBilling("monthly")}
            style={{
              height: 36, padding: "0 24px", borderRadius: 999, fontSize: 14, fontWeight: 500,
              background: billing === "monthly" ? "#1C3A63" : "transparent",
              color: billing === "monthly" ? "#fff" : "var(--ink)",
              border: "none", cursor: "pointer",
            }}>
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            style={{
              height: 36, padding: "0 24px", borderRadius: 999, fontSize: 14, fontWeight: 500,
              background: billing === "annual" ? "#1C3A63" : "transparent",
              color: billing === "annual" ? "#fff" : "var(--ink)",
              border: "none", cursor: "pointer", position: "relative",
            }}>
            Annual
            <span style={{
              position: "absolute", top: -10, right: -8,
              background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 700,
              padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap",
            }}>40% off</span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="settings-plans-grid">
        {plans.map(plan => (
          <div key={plan.name} className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 0 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy-800)", margin: "0 0 14px", textAlign: "center" }}>{plan.name}</h3>

            {plan.enterprise ? (
              <div style={{ display: "flex", justifyContent: "center", margin: "6px 0 20px" }}>
                <img src="uploads/enterprise-icon.svg" alt="Enterprise" style={{ width: 52, height: 52 }} />
              </div>
            ) : (
              <div style={{ textAlign: "center", margin: "0 0 18px" }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: "#1C3A63", letterSpacing: "-0.02em" }}>
                  ${billing === "monthly" ? plan.price.monthly : plan.price.annual}
                </span>
                <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>/mo</span>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              {plan.subscribed ? (
                <button className="btn" style={{ width: "100%", justifyContent: "center", cursor: "default", letterSpacing: "0.04em", fontSize: 13, background: "#dcfce7", color: "#166534", border: "1.5px solid #4ade80", fontWeight: 600 }} disabled>
                  SUBSCRIBED
                </button>
              ) : (
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  {plan.enterprise ? "INQUIRE" : "Subscribe Now"}
                </button>
              )}
            </div>

            <ul style={{ padding: "0 0 0 18px", margin: 0, fontSize: 13, lineHeight: 1.75, color: "var(--ink)", listStyle: "disc" }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ fontWeight: f.bold ? 700 : 400 }}>{f.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="page-footer">
        <h2>Questions?</h2>
        <p>Collaborative team and brokerage accounts are available. If you are interested,<br />please contact us at <a href="mailto:reconnect@neutrinoinc.com">reconnect@neutrinoinc.com</a></p>
        <p className="footer-brand">Powered by Neutrino®</p>
      </div>
    </>
  );
};

// ─── Help / Support ───────────────────────────────────────────────────────────

const SUPPORT_TICKETS = [
  { subject: "Not all listings are showing up", id: "6319007", status: "Open", created: "Jun 04, 2026 11:21 PM" },
  { subject: "password", id: "6319006", status: "Open", created: "May 19, 2026 01:46 PM" },
];

const HelpSupport = () => {
  const [search, setSearch] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");

  const filtered = SUPPORT_TICKETS.filter(t =>
    !search || t.subject.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search)
  );

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Support</h1>
          <div className="sub">For assistance with REConnect, please submit a support ticket.</div>
        </div>
      </div>

      <div className="settings-support-grid">
        {/* Ticket list */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>My Support Tickets</h3>

          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div className="users-search" style={{ flex: 1 }}>
              <span className="users-search-ic"><Icon name="search" size={15} /></span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Tickets" />
            </div>
            <button className="btn btn-secondary btn-sm"><Icon name="filter" size={13} /> Filter</button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {[{ label: "Subject" }, { label: "Ticket #" }, { label: "Status" }, { label: "Created", cls: "support-table-created" }].map(h => (
                  <th key={h.label} className={h.cls || ""} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "var(--ink)", fontSize: 13 }}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ borderBottom: "1px solid var(--border-2)" }}>
                  <td style={{ padding: "14px 12px", fontWeight: 500 }}>{t.subject}</td>
                  <td style={{ padding: "14px 12px", color: "var(--muted)" }}>{t.id}</td>
                  <td style={{ padding: "14px 12px" }}>
                    <span className="pill pill-green" style={{ fontSize: 12 }}>{t.status}</span>
                  </td>
                  <td className="support-table-created" style={{ padding: "14px 12px", color: "var(--muted)", whiteSpace: "nowrap" }}>{t.created}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} style={{ padding: 24, textAlign: "center", color: "var(--muted)" }}>No tickets found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Submit ticket */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Icon name="help" size={20} />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Submit a Ticket</h3>
          </div>
          <div className="field">
            <label>Subject</label>
            <select value={subject} onChange={e => setSubject(e.target.value)}>
              <option value="">Select a subject...</option>
              <option>Listing not showing up</option>
              <option>Billing question</option>
              <option>MLS connection issue</option>
              <option>Account access problem</option>
              <option>Feature request</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label>Description</label>
            <textarea
              rows={5}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your issue or request..."
              style={{ resize: "vertical" }}
            />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Submit a Ticket
          </button>
        </div>
      </div>

      <div className="page-footer">
        <h2>Questions?</h2>
        <p>Collaborative team and brokerage accounts are available. If you are interested,<br />please contact us at <a href="mailto:reconnect@neutrinoinc.com">reconnect@neutrinoinc.com</a></p>
        <p className="footer-brand">Powered by Neutrino®</p>
      </div>
    </>
  );
};

// ─── Billing History ─────────────────────────────────────────────────────────

const INVOICES = [
  { date: "Jun 10, 2026", invoice: "SOGWPBNP-0001", description: "SLW Single", amount: "$19.00", status: "Paid" },
  { date: "May 10, 2026", invoice: "SOGWPBNP-0002", description: "Annual Agent Plan", amount: "$252.00", status: "Paid" },
  { date: "Apr 10, 2026", invoice: "SOGWPBNP-0003", description: "Annual Agent Plan", amount: "$252.00", status: "Paid" },
];

const BillingHistory = ({ go }) => (
  <>
    <div className="page-h">
      <div>
        <h1>Billing History</h1>
        <div className="sub">View your past invoices and payment history.</div>
      </div>
    </div>

    {/* Desktop table */}
    <div className="billing-table-wrap card" style={{ padding: 0, overflow: "hidden", maxWidth: 860 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {["DATE", "INVOICE #", "DESCRIPTION", "AMOUNT", "STATUS", "ACTIONS"].map(h => (
              <th key={h} style={{ padding: "13px 18px", textAlign: "left", fontWeight: 600, fontSize: 11.5, color: "var(--muted)", letterSpacing: "0.06em", background: "var(--surface)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INVOICES.map((inv, i) => (
            <tr key={i} style={{ borderBottom: i < INVOICES.length - 1 ? "1px solid var(--border-2)" : "none" }}>
              <td style={{ padding: "14px 18px", fontWeight: 400 }}>{inv.date}</td>
              <td style={{ padding: "14px 18px", fontFamily: "var(--font-mono, monospace)", fontSize: 12.5 }}>{inv.invoice}</td>
              <td style={{ padding: "14px 18px" }}>{inv.description}</td>
              <td style={{ padding: "14px 18px", fontWeight: 600 }}>{inv.amount}</td>
              <td style={{ padding: "14px 18px" }}>
                <span className="pill pill-green" style={{ fontSize: 12 }}>{inv.status}</span>
              </td>
              <td style={{ padding: "14px 18px" }}>
                <a href="#" style={{ fontSize: 13, fontWeight: 500, color: "var(--blue-600, #2563eb)" }} onClick={e => e.preventDefault()}>
                  Download PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile cards */}
    <div className="billing-cards">
      {INVOICES.map((inv, i) => (
        <div key={i} className="card" style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{inv.date}</span>
            <span className="pill pill-green" style={{ fontSize: 12 }}>{inv.status}</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{inv.description}</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--font-mono, monospace)", marginBottom: 10 }}>{inv.invoice}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{inv.amount}</span>
            <a href="#" style={{ fontSize: 13, fontWeight: 500, color: "var(--blue-600, #2563eb)" }} onClick={e => e.preventDefault()}>
              Download PDF
            </a>
          </div>
        </div>
      ))}
    </div>

    <div className="page-footer">
      <h2>Questions?</h2>
      <p>Collaborative team and brokerage accounts are available. If you are interested,<br />please contact us at <a href="mailto:reconnect@neutrinoinc.com">reconnect@neutrinoinc.com</a></p>
      <p className="footer-brand">Powered by Neutrino®</p>
    </div>
  </>
);

// ─── Payment Method ───────────────────────────────────────────────────────────

const PaymentMethod = ({ go }) => {
  const [cardNumber, setCardNumber] = React.useState("");

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Payment Method</h1>
        </div>
      </div>

      <div className="card" style={{ padding: 24, maxWidth: 680 }}>
        {/* Add Payment Method */}
        <div className="card" style={{ padding: 20, marginBottom: 16 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Add Payment Method</h3>
          <div className="field">
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", display: "flex", alignItems: "center" }}>
                <Icon name="card" size={16} />
              </span>
              <input
                placeholder="Card number"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                style={{ paddingLeft: 38, width: "100%", boxSizing: "border-box" }}
              />
            </div>
          </div>
          <button className="btn btn-primary" style={{ borderRadius: 999, padding: "0 28px", height: 42 }}>
            Add Card
          </button>
        </div>

        {/* Saved Payment Methods */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Saved Payment Methods</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 10 }}>
            <Icon name="card" size={20} />
            <div style={{ flex: 1, fontSize: 13 }}>
              <span style={{ fontWeight: 500 }}>VISA •••• 4242</span>
              <span style={{ color: "var(--muted)", marginLeft: 8 }}>exp 4/2029</span>
            </div>
            <span className="pill pill-green" style={{ fontSize: 12 }}>Default</span>
            <button className="btn" style={{ color: "#ef4444", background: "none", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "0 4px" }}>
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <h2>Questions?</h2>
        <p>Collaborative team and brokerage accounts are available. If you are interested,<br />please contact us at <a href="mailto:reconnect@neutrinoinc.com">reconnect@neutrinoinc.com</a></p>
        <p className="footer-brand">Powered by Neutrino®</p>
      </div>
    </>
  );
};

Object.assign(window, { MyProfile, AccountSettings, ManageMLSInfo, SubscriptionPlans, HelpSupport, BillingHistory, PaymentMethod });
