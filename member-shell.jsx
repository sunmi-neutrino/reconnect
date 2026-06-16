/* global React, RC_DATA */

// MemberSidebar — locked items show lock icon + upgrade badge
const MemberSidebar = ({ route, setRoute, collapsed, setCollapsed, onMobileClose }) => {
  const sharedListings  = RC_DATA.listings.filter(l => l.owner === "network").length;
  const sharedSpotlights = RC_DATA.spotlights.filter(s => s.owner === "network").length;

  const accessible = [
    { key: "member-dashboard",  label: "Dashboard",   icon: "home" },
    { key: "member-listings",   label: "Listings",    icon: "listing",  badge: sharedListings },
    { key: "member-spotlights",  label: "Spotlights",   icon: "spotlight", badge: sharedSpotlights },
  ];

  const locked = [
    { key: "locked-company", label: "Company Marketing", icon: "company" },
    { key: "locked-network", label: "Network",            icon: "network" },
    { key: "locked-canva",   label: "Canva",              icon: "canva"   },
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
            <div className="brand-sub">Member</div>
          </div>
        )}
      </div>

      <nav className="nav">
        {accessible.map(it => (
          <button key={it.key}
            className={`nav-item ${route.startsWith(it.key) ? "active" : ""}`}
            onClick={() => handleNavClick(it.key)}
            title={collapsed ? it.label : ""}>
            <Icon name={it.icon} size={18} />
            <span className="label">{it.label}</span>
            {it.badge != null && <span className="badge">{it.badge}</span>}
          </button>
        ))}

        {/* Divider */}
        {!collapsed && <div className="nav-section-label">Pro Features</div>}

        {locked.map(it => (
          <button key={it.key}
            className={`nav-item nav-locked ${route === it.key ? "active" : ""}`}
            onClick={() => handleNavClick(it.key)}
            title={collapsed ? it.label : ""}>
            <Icon name={it.icon} size={18} />
            <span className="label">{it.label}</span>
            <span className="lock-badge">
              <Icon name="lock" size={11} stroke={2.2} />
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        {!collapsed && (
          <div className="plan-card member-plan-card">
            <div className="label">Current access</div>
            <div className="name" style={{ color: "#93c5fd" }}>
              Free Member
              <span className="pill" style={{ background: "rgba(147,197,253,0.15)", color: "#93c5fd", fontSize: 10 }}>Invited</span>
            </div>
            <div className="meter-text" style={{ marginTop: 8, color: "var(--navy-300)" }}>
              Viewing shared content only
            </div>
            <button className="member-upgrade-btn" onClick={() => handleNavClick("upgrade")}>
              <Icon name="sparkle" size={13} /> Get REConnect Pro
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

// MemberTopBar
const MemberTopBar = ({ crumbs, go, onProfileClick, profileOpen, onMenuChoose, onMobileMenuClick }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  return (
    <div className="topbar" style={{ position: "relative" }}>
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
          <input placeholder="Search shared listings and spotlights…" />
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
             style={{ backgroundImage: `url(https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format)` }}
             onClick={onProfileClick}></div>
      </div>

      <div className={`topbar-search-expanded ${searchOpen ? "open" : ""}`}>
        <span className="search-ic"><Icon name="search" size={16} /></span>
        <input
          placeholder="Search shared listings and spotlights…"
          autoFocus={searchOpen}
          onBlur={() => setSearchOpen(false)}
        />
        <button className="icon-btn" style={{ flexShrink: 0 }} onMouseDown={(e) => { e.preventDefault(); setSearchOpen(false); }}>
          <Icon name="x" size={16} />
        </button>
      </div>

      {profileOpen && <MemberProfileMenu onChoose={onMenuChoose} />}
    </div>
  );
};

const MemberProfileMenu = ({ onChoose }) => (
  <div className="profile-menu">
    <div className="pm-head">
      <div className="ava" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format)` }}></div>
      <div>
        <div className="name">Jordan Park</div>
        <span className="plan" style={{ background: "rgba(147,197,253,0.15)", color: "#2563EB" }}>
          <Icon name="user" size={11} /> Free Member
        </span>
      </div>
    </div>
    <div className="pm-list">
      <button className="pm-item" onClick={() => onChoose && onChoose("profile")}><Icon name="user" size={16} /> Profile</button>
      <button className="pm-item"><Icon name="cog" size={16} /> Account Settings</button>
      <div className="pm-divider"></div>
      <button className="pm-item" style={{ color: "var(--blue-500)" }}><Icon name="sparkle" size={16} /> Upgrade to REConnect Pro</button>
      <div className="pm-divider"></div>
      <button className="pm-item"><Icon name="help" size={16} /> Help / Support</button>
      <button className="pm-item danger"><Icon name="logout" size={16} /> Log out</button>
    </div>
  </div>
);

// Add lock icon path to window.Icon by monkey-patching the paths map via a wrapper
const _OrigIcon = Icon;
const Icon = (props) => {
  // Inject extra paths for member UI
  const extraPaths = {
    lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    rocket: "M4.5 16.5l-1 4 4-1L19 8a2.83 2.83 0 0 0-4-4L4.5 16.5zM15 5l4 4M7 17c-1 1-2 1.5-3.5 2 .5-1.5 1-2.5 2-3.5",
    chart: "M3 3v18h18M8 17V9M12 17V5M16 17v-4",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  };
  if (props.name && extraPaths[props.name]) {
    const { name, size = 18, stroke = 1.7 } = props;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
        <path d={extraPaths[name]} />
      </svg>
    );
  }
  return React.createElement(_OrigIcon, props);
};

Object.assign(window, { MemberSidebar, MemberTopBar, MemberProfileMenu, Icon });
