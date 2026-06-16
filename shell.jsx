/* global React, ReactDOM, RC_DATA */
// useState/useEffect referenced via React.useState/React.useEffect to avoid scope collisions.

// === Icon set (inline SVG) ===
const Icon = ({ name, size = 18, stroke = 1.7 }) => {
  const paths = {
    menu: "M3 6h18M3 12h18M3 18h18",
    home: "M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2V11z",
    listing: "M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6M9 11h.01M15 11h.01",
    spotlight: "M3 5h18v4H3zM3 11h8v10H3zM13 11h8v10h-8z",
    company: "M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 7h.01M15 7h.01",
    network: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
    canva: "M21 12a9 9 0 1 1-9-9c2.5 0 4.8.9 6.5 2.5",
    search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.3-4.3",
    bell: "M18 16v-5a6 6 0 0 0-12 0v5l-2 2h16l-2-2zM10 22a2 2 0 0 0 4 0",
    plus: "M12 5v14M5 12h14",
    chevD: "M6 9l6 6 6-6",
    chevR: "M9 6l6 6-6 6",
    chevL: "M15 6l-9 6 9 6",
    filter: "M3 6h18M6 12h12M10 18h4",
    sort: "M3 7h18M6 12h12M10 17h4",
    sortUD: "M4 6l4-4 4 4M8 2v13M20 18l-4 4-4-4M16 22V9",
    check: "M5 12l5 5L20 7",
    x: "M6 6l12 12M18 6L6 18",
    share: "M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13",
    gift: "M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z",
    eye: "M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    download: "M12 3v12M7 10l5 5 5-5M5 21h14",
    link: "M10 14a5 5 0 0 0 7 0l4-4a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-4 4a5 5 0 0 0 7 7l1-1",
    qr: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 14h3v3h-3zM14 18h3v3h-3zM18 18h3v3h-3z",
    flyer: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h4",
    site: "M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18",
    image: "M3 5h18v14H3zM3 16l5-5 5 5 3-3 5 5M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    fb: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    ig: "M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM17.5 6.5h.01",
    tw: "M22 5.8a8 8 0 0 1-2.4.7 4.1 4.1 0 0 0 1.8-2.3 8 8 0 0 1-2.6 1A4 4 0 0 0 12 9.2 11.4 11.4 0 0 1 3 4.5a4 4 0 0 0 1.2 5.4A4 4 0 0 1 2.4 9v.05a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.07 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 17.6 11.4 11.4 0 0 0 8.2 19.4c7.5 0 11.5-6.2 11.5-11.5v-.5A8 8 0 0 0 22 5.8z",
    mail: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l9 7 9-7",
    video: "M2 6h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM16 10l6-3v10l-6-3z",
    code: "M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16",
    star: "M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.8l6.5-1z",
    user: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    cog: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z",
    card: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 11h18",
    help: "M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4M12 17h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z",
    logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
    map: "M9 5l-6 2v14l6-2 6 2 6-2V5l-6 2zM9 5v14M15 7v14",
    bed: "M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18M7 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3",
    bath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M19 19l1 2M5 19l-1 2",
    arrowR: "M5 12h14M13 5l7 7-7 7",
    arrowUp: "M12 19V5M5 12l7-7 7 7",
    play: "M5 3l14 9-14 9V3z",
    location: "M12 22s8-7.4 8-13a8 8 0 1 0-16 0c0 5.6 8 13 8 13zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8",
    copy: "M8 4h10a2 2 0 0 1 2 2v10M16 8H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z",
    edit: "M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6M18.4 2.6a2 2 0 1 1 2.8 2.8L12 14.6l-4 1 1-4z",
    chevU: "M18 15l-6-6-6 6",
    desktop: "M2 4h20v14H2zM8 22h8M12 18v4",
    mobile: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
    upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    zap: "M13 2L3 14h9l-1 8 10-12h-9z",
    stats: "M3 20h18M8 20V10M12 20V4M16 20v-8",
    portfolio: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
    "external-link": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
  };
  const d = paths[name];
  if (!d) return null;
  const fillIcons = [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fillIcons.includes(name) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
      <path d={d} />
    </svg>
  );
};

// Format helpers
const fmtPrice = (n) => "$" + n.toLocaleString();

// === Sidebar ===
const Sidebar = ({ route, setRoute, collapsed, setCollapsed, counts, onMobileClose }) => {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: "home" },
    { key: "listings", label: "Listings", icon: "listing", badge: counts.listings },
    { key: "amp", label: "AMP", icon: "zap", badge: counts.listings },
    { key: "spotlights", label: "Spotlights", icon: "spotlight", badge: counts.spotlights },
    { key: "company", label: "Company Marketing", icon: "company" },
    { key: "portfolio", label: "Portfolio Sites", icon: "site" },
    { key: "network", label: "Network", icon: "network", badge: counts.network },
    { key: "canva", label: "Canva", icon: "canva" },
    { key: "users", label: "Users", icon: "users" },
  ];

  const handleCollapseOrClose = () => {
    if (window.innerWidth <= 768) {
      onMobileClose?.();
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleNavClick = (key) => {
    setRoute(key);
    if (window.innerWidth <= 768) onMobileClose?.();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <button className="collapse-btn" onClick={handleCollapseOrClose} aria-label="Toggle nav">
          <Icon name="menu" size={18} />
        </button>
        {!collapsed && (
          <div className="brand" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
            <img src="uploads/ReConnect_logo_final-white.svg" alt="REConnect" style={{ width: 124, height: "auto" }} />
            <div className="brand-sub">Pro</div>
          </div>
        )}
      </div>
      <nav className="nav">
        {items.map(it => (
          <button key={it.key}
            className={`nav-item ${route.startsWith(it.key) ? "active" : ""}`}
            onClick={() => handleNavClick(it.key)}
            title={collapsed ? it.label : ""}>
            <Icon name={it.icon} size={18} />
            <span className="label">{it.label}</span>
            {it.badge != null && <span className="badge">{it.badge}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="plan-card">
          <div className="label">Active plan</div>
          <div className="name">
            REConnect Pro
            <span className="pill pill-green" style={{ background: "rgba(37,99,235,0.22)", color: "#bfdbfe" }}>Active</span>
          </div>
          <div className="meter-text" style={{ marginTop: 8 }}>All features unlocked · Renews May 1, 2027</div>
        </div>
      </div>
    </aside>
  );
};

// === Top bar ===
const TopBar = ({ crumbs, route, go, onProfileClick, profileOpen, onMenuChoose, onMobileMenuClick }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  return (
    <div className="topbar">
      <button className="topbar-menu-btn" onClick={onMobileMenuClick} aria-label="Open menu">
        <Icon name="menu" size={20} />
      </button>
      <div className="crumbs">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          const label = c.label !== undefined ? c.label : c;
          const dest = c.route !== undefined ? c.route : null;
          return (
            <React.Fragment key={i}>
              {!isLast && dest
                ? <span style={{ cursor: "pointer", opacity: 0.7 }} onClick={() => go(dest)}>{label}</span>
                : <span className={isLast ? "here" : ""}>{label}</span>}
              {!isLast && <Icon name="chevR" size={14} />}
            </React.Fragment>
          );
        })}
      </div>

      <img className="topbar-mobile-logo" src="uploads/ReConnect_logo_final.svg" alt="REConnect" />

      <div className="topbar-right">
        <div className="search">
          <span className="ic"><Icon name="search" size={16} /></span>
          <input placeholder="Search listings, spotlights, network…" />
          <span className="kbd">⌘K</span>
        </div>
        <button className="topbar-search-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
          <Icon name="search" size={18} />
        </button>
        <button className="icon-btn" title="Notifications">
          <Icon name="bell" size={18} />
          <span className="dot"></span>
        </button>
        <div className="avatar"
             style={{ backgroundImage: `url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format)` }}
             onClick={onProfileClick}></div>
      </div>

      <div className={`topbar-search-expanded ${searchOpen ? "open" : ""}`}>
        <span className="search-ic"><Icon name="search" size={16} /></span>
        <input
          placeholder="Search listings, spotlights, network…"
          autoFocus={searchOpen}
          onBlur={() => setSearchOpen(false)}
        />
        <button className="icon-btn" style={{ flexShrink: 0 }} onMouseDown={(e) => { e.preventDefault(); setSearchOpen(false); }}>
          <Icon name="x" size={16} />
        </button>
      </div>

      {profileOpen && <ProfileMenu onChoose={onMenuChoose} />}
    </div>
  );
};

const ProfileMenu = ({ onChoose }) => (
  <div className="profile-menu">
    <div className="pm-head">
      <div className="ava" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format)` }}></div>
      <div>
        <div className="name">Mike Anderson</div>
        <span className="plan"><Icon name="sparkle" size={11} /> REConnect Pro</span>
      </div>
    </div>
    <div className="pm-list">
      <button className="pm-item" onClick={() => onChoose("profile")}><Icon name="user" size={16} className="ic" /> Profile</button>
      <button className="pm-item" onClick={() => onChoose("account-settings")}><Icon name="cog" size={16} className="ic" /> Account Settings</button>
      <button className="pm-item" onClick={() => onChoose("mls-info")}><Icon name="map" size={16} className="ic" /> Manage MLS Info</button>
      <div className="pm-divider"></div>
      <button className="pm-item" onClick={() => onChoose("plans")}><Icon name="sparkle" size={16} className="ic" /> Change Subscription Plan</button>
      <button className="pm-item"><Icon name="card" size={16} className="ic" /> Billing Info</button>
      <div className="pm-divider"></div>
      <button className="pm-item" onClick={() => onChoose("support")}><Icon name="help" size={16} className="ic" /> Help / Support</button>
      <button className="pm-item danger"><Icon name="logout" size={16} className="ic" /> Log out</button>
    </div>
  </div>
);

// Reusable pagination bar — returns null when totalPages <= 1
const Pagination = ({ page, setPage, total, perPage }) => {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button className="pg-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
        <Icon name="chevL" size={13} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button key={p} className={`pg-btn ${p === page ? "active" : ""}`} onClick={() => setPage(p)}>{p}</button>
      ))}
      <button className="pg-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
        <Icon name="chevR" size={13} />
      </button>
      <span className="pg-info">{Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)} of {total}</span>
    </div>
  );
};

// Export to window so other JSX files can use these
Object.assign(window, { Icon, fmtPrice, Pagination, Sidebar, TopBar, ProfileMenu });
