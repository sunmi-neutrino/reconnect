/* global React, RC_DATA, Icon, fmtPrice */

// ─── Shared context ────────────────────────────────────────────────────────────

const INVITER = {
  name: "Mike Anderson",
  title: "Realtor · Compass",
  ava: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format",
};

const MEMBER_RECENT_SHARES = [
  { action: "shared 2 listings with you", item: "418 Queen Anne Ave N  ·  9904 Renton Avenue S", route: "member-listings", time: "2h ago",   thumb: RC_DATA.PROP_IMGS[6] },
  { action: "shared 1 spotlight with you", item: "Coastal Retreats", route: "member-spotlight/S04", time: "5h ago",   thumb: RC_DATA.PROP_IMGS[3] },
];

// ─── Plan Tier Modules ─────────────────────────────────────────────────────────

const PLAN_TIERS = [
  {
    name: "Get Connected",
    tone: "blue",
    icon: "listing",
    route: "locked-canva",
    desc: "Connect your listings and autogenerate listing website, printable flyer, QR code, and Canva templates in minutes.",
  },
  {
    name: "Get Exposed",
    tone: "purple",
    icon: "network",
    route: "locked-network",
    desc: "Share listings and spotlights directly with your network to get more eyes on every property.",
  },
  {
    name: "Manage Company Marketing",
    tone: "green",
    icon: "company",
    route: "locked-company",
    desc: "Run brokerage-wide campaigns and manage your entire team's marketing from one place.",
  },
];

const HERO_SLIDES = [
  {
    gradient: "linear-gradient(150deg, #F0F7FF 0%, #E0EDFF 60%, #D6E6FF 100%)",
    shadow: "0 2px 20px rgba(59,130,246,0.12)",
    accentColor: "#1D4ED8",
    accentBg: "#DBEAFE",
    badgeIcon: "listing",
    badge: "Listings Manager",
    headline: "Your listings, fully marketed in minutes",
    desc: "Auto-generate a property website, social posts, QR codes, and Canva flyers straight from your MLS data.",
    route: "locked-canva",
  },
  {
    gradient: "linear-gradient(150deg, #F5F2FF 0%, #EBE5FF 60%, #E0D8FF 100%)",
    shadow: "0 2px 20px rgba(109,40,217,0.12)",
    accentColor: "#5B21B6",
    accentBg: "#EDE9FE",
    badgeIcon: "network",
    badge: "Agent Network",
    headline: "Share with your whole network instantly",
    desc: "Send listings and spotlights to agents, brokers, and lenders with one click. Get notified when they view or engage.",
    route: "locked-network",
  },
  {
    gradient: "linear-gradient(150deg, #F0FBF5 0%, #E0F5EA 60%, #D4F0E0 100%)",
    shadow: "0 2px 20px rgba(22,163,74,0.12)",
    accentColor: "#15803D",
    accentBg: "#DCFCE7",
    badgeIcon: "spotlight",
    badge: "Spotlights Builder",
    headline: "Bundle listings into beautiful microsites",
    desc: "Group listings into curated spotlights, track views and leads in real time, and embed anywhere on the web.",
    route: "locked-network",
  },
];

const AGENT_AVAS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format",
];

const HeroGraphic = ({ slideIndex, imgs }) => {
  if (slideIndex === 0) {
    return (
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 14, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.30)", width: 280 }}>
          <div style={{ height: 118, backgroundImage: `url(${imgs[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
          <div style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }}></span>
              <span style={{ fontSize: 10, color: "#16A34A", fontWeight: 700, letterSpacing: "0.04em" }}>ACTIVE</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 3 }}>418 Queen Anne Ave N</div>
            <div style={{ fontSize: 12, color: "#64748B", marginBottom: 11 }}>$875,000 · Seattle, WA</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {["Website", "Flyer", "QR", "Social"].map(t => (
                <span key={t} style={{ fontSize: 10.5, background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", padding: "3px 9px", borderRadius: 999, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: -12, right: -16, background: "#fff", borderRadius: 9, padding: "7px 13px", boxShadow: "0 4px 18px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "#16A34A" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A" }}></span>
          Website live
        </div>
      </div>
    );
  }

  if (slideIndex === 1) {
    const pts = [{ x: 200, y: 22 }, { x: 262, y: 84 }, { x: 200, y: 144 }, { x: 106, y: 154 }, { x: 44, y: 84 }];
    return (
      <div style={{ position: "relative", width: 322, height: 200, flexShrink: 0 }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: 322, height: 200 }}>
          {pts.map((p, i) => (
            <line key={i} x1={152} y1={90} x2={p.x + 19} y2={p.y + 19} stroke="rgba(91,33,182,0.25)" strokeWidth="1.5" strokeDasharray="5 3" />
          ))}
        </svg>
        <div style={{ position: "absolute", left: 124, top: 62, width: 56, height: 56, borderRadius: "50%", background: "#5B21B6", border: "2.5px solid rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: "0 4px 14px rgba(91,33,182,0.35)" }}>
          <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>J</span>
        </div>
        {pts.map((p, i) => (
          <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: 38, height: 38, borderRadius: "50%", backgroundImage: `url(${AGENT_AVAS[i]})`, backgroundSize: "cover", backgroundPosition: "center", border: "2.5px solid #fff", boxShadow: "0 2px 10px rgba(91,33,182,0.2)", zIndex: 1 }}></div>
        ))}
        <div style={{ position: "absolute", top: 2, right: 0, background: "rgba(255,255,255,0.97)", borderRadius: 9, padding: "7px 12px", boxShadow: "0 4px 14px rgba(0,0,0,0.12)", fontSize: 11.5, fontWeight: 600, color: "#0F172A", display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="share" size={12} /> Shared with 47 agents
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.18)", width: 280, border: "1px solid rgba(0,0,0,0.07)" }}>
        {/* Browser chrome */}
        <div style={{ background: "#F1F5F9", padding: "7px 10px", display: "flex", alignItems: "center", gap: 7, borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            {["#FF5F57","#FEBC2E","#28C840"].map(c => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{ flex: 1, background: "#fff", borderRadius: 999, padding: "3px 10px", fontSize: 9.5, color: "#94A3B8", border: "1px solid #E2E8F0", textAlign: "center" }}>
            seaglass.rsir.homes
          </div>
        </div>
        {/* Seaglass website screenshot */}
        <img src="uploads/Seaglass.png" alt="Seaglass spotlight" style={{ width: "100%", display: "block", height: 210, objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
};

const PromoHeroSlide = ({ go }) => {
  const [idx, setIdx] = React.useState(0);
  const imgs = RC_DATA.PROP_IMGS;
  const slide = HERO_SLIDES[idx];

  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="promo-hero"
      style={{
        background: slide.gradient,
        boxShadow: slide.shadow,
        border: "1px solid rgba(0,0,0,0.06)",
        transition: "background 0.6s ease, box-shadow 0.6s ease",
      }}
    >
      {/* Shared diagonal line motif — same on every slide for visual continuity */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <pattern id="hero-lines" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45 0 0)">
            <line x1="0" y1="0" x2="0" y2="36" stroke="rgba(0,0,0,0.05)" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-lines)" />
      </svg>

      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: slide.accentBg, color: slide.accentColor, padding: "4px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 600, marginBottom: 14, letterSpacing: "0.03em" }}>
          <Icon name={slide.badgeIcon} size={12} /> {slide.badge}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, margin: "0 0 12px", color: "#0F172A", letterSpacing: "-0.025em" }}>
          {slide.headline}
        </h2>
        <p style={{ fontSize: 13.5, color: "#475569", margin: "0 0 22px", lineHeight: 1.6 }}>
          {slide.desc}
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="btn btn-lg" style={{ background: slide.accentColor, color: "#fff", fontWeight: 700, borderRadius: 999 }}>
            <Icon name="sparkle" size={16} /> Get REConnect Pro
          </button>
          <button className="btn btn-lg" onClick={() => go(slide.route)} style={{ background: "#fff", color: "#334155", border: "1px solid #CBD5E1", borderRadius: 999 }}>
            Learn more
          </button>
        </div>

        <div style={{ display: "flex", gap: 6, marginTop: 20, alignItems: "center" }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 20 : 6,
              height: 6,
              borderRadius: 999,
              background: i === idx ? slide.accentColor : "rgba(0,0,0,0.18)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }} />
          ))}
        </div>
      </div>

      <div className="promo-hero-graphic" style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
        <HeroGraphic slideIndex={idx} imgs={imgs} />
      </div>
    </div>
  );
};

// ─── Member Dashboard ──────────────────────────────────────────────────────────

const MemberDashboard = ({ go }) => {
  const sharedListings  = RC_DATA.listings.filter(l => l.owner === "network");
  const sharedSpotlights = RC_DATA.spotlights.filter(s => s.owner === "network");

  return (
    <>
      {/* Welcome heading — smaller */}
      <div className="page-h" style={{ marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600 }}>Welcome, Jordan</h1>
        </div>
      </div>

      {/* Promo Hero Slide */}
      <PromoHeroSlide go={go} />

      {/* 2-col: left 2/3 = listings + spotlights stacked, right 1/3 = simple recent shares */}
      <div className="member-dashboard-grid">

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Shared Listings */}
          <div>
            <div className="section-h" style={{ marginBottom: 10 }}>
              <h2>Shared Listings</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => go("member-listings")}>
                View all <Icon name="arrowR" size={13} />
              </button>
            </div>
            <div className="card" style={{ padding: 0 }}>
              {sharedListings.map(l => (
                <MemberListingRow key={l.id} l={l} onClick={() => go("member-listing/" + l.id)} />
              ))}
            </div>
          </div>

          {/* Shared Spotlights */}
          <div>
            <div className="section-h" style={{ marginBottom: 10 }}>
              <h2>Shared Spotlights</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => go("member-spotlights")}>
                View all <Icon name="arrowR" size={13} />
              </button>
            </div>
            <div className="card" style={{ padding: 0 }}>
              {sharedSpotlights.map(s => (
                <SpotlightRow key={s.id} s={{ ...s, sharedBy: INVITER.name }} onClick={() => go("member-spotlight/" + s.id)} />
              ))}
            </div>
          </div>

        </div>

        {/* Right column — simple recent shares */}
        <div>
          <div className="section-h" style={{ marginBottom: 10 }}>
            <h2>Recent Shares</h2>
          </div>
          <div className="card" style={{ padding: 0 }}>
            {MEMBER_RECENT_SHARES.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "center",
                padding: "12px 16px",
                cursor: "pointer",
                borderBottom: i < MEMBER_RECENT_SHARES.length - 1 ? "1px solid var(--border-2)" : "none",
              }} onClick={() => go(s.route)}>
                <div style={{ width: 44, height: 44, borderRadius: 8, backgroundImage: `url(${s.thumb})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }}></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>{INVITER.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.4, marginTop: 2 }}>{s.action}</div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 3 }}>{s.time}</div>
                </div>
                <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }} onClick={e => { e.stopPropagation(); go(s.route); }}>View</button>
              </div>
            ))}
            <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border-2)" }}>
              <span className="muted" style={{ fontSize: 12 }}>{sharedListings.length + sharedSpotlights.length} items shared with you</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

// ─── Shared Listings Page ──────────────────────────────────────────────────────

const MEMBER_LISTINGS_PAGE_SIZE = 5;

const MemberListings = ({ go }) => {
  const [page, setPage] = React.useState(1);

  const fullList = RC_DATA.listings.filter(l => l.owner === "network");
  const list = fullList.slice((page - 1) * MEMBER_LISTINGS_PAGE_SIZE, page * MEMBER_LISTINGS_PAGE_SIZE);

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Shared Listings</h1>
          <div className="sub">Listings shared with you by your REConnect network.</div>
        </div>
        <div className="member-pro-badge">
          <Icon name="lock" size={13} />
          <span>To create & manage your own listings, upgrade to REConnect Pro</span>
          <button className="btn btn-primary btn-sm"><Icon name="sparkle" size={12} /> Upgrade</button>
        </div>
      </div>

      <div className="toolbar">
        <span className="muted" style={{ fontSize: 12.5 }}>
          <span className="bold" style={{ color: "var(--ink)" }}>{fullList.length} listings</span> · Shared with you
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button className="chip"><Icon name="filter" size={13} /><span className="chip-label"> Filter <Icon name="chevD" size={11} /></span></button>
          <button className="chip"><Icon name="sortUD" size={13} /><span className="chip-label"> Sort: Newest <Icon name="chevD" size={11} /></span></button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {list.map(l => (
          <MemberListingRow key={l.id} l={l} onClick={() => go("member-listing/" + l.id)} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} total={fullList.length} perPage={MEMBER_LISTINGS_PAGE_SIZE} />
    </>
  );
};

// ─── Listing Row (view-only) ───────────────────────────────────────────────────

const MemberListingRow = ({ l, onClick }) => (
  <div className="listing-row listing-row-4col" style={{ cursor: "pointer" }} onClick={onClick}>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div className="thumb" style={{ backgroundImage: `url(${l.img})` }}></div>
    </div>
    <div className="listing-meta">
      <div className="status">
        <span className={`dot ${l.status === "Pending" ? "pending" : ""}`}></span>
        <span style={{ color: l.status === "Pending" ? "var(--amber-500)" : "var(--green-600)" }}>{l.status}</span>
        {l.sharedBy && <span className="pill pill-blue" style={{ textTransform: "none", letterSpacing: 0, whiteSpace: "nowrap" }}>Shared by {INVITER.name}</span>}
      </div>
      <h3>{l.address}</h3>
      <div className="sub">
        <span>{l.city}</span>
        <span>MLS# {l.mls}</span>
      </div>
    </div>
    <div>
      <div className="price">{fmtPrice(l.price)}</div>
      <div className="price-sub">{l.type}</div>
      <div className="price-sub">{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</div>
      <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{l.role}</div>
    </div>
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
      <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); }}>
        <Icon name="eye" size={13} /> View
      </button>
      <button className="btn btn-blue btn-sm" onClick={e => { e.stopPropagation(); }}>
        <Icon name="download" size={13} /> Assets
      </button>
    </div>
  </div>
);

// ─── Listing Detail (member — full Pro layout, minus banner + share + locked tabs) ──

const MemberListingDetail = ({ id, go }) => {
  const l = RC_DATA.listings.find(x => x.id === id) || RC_DATA.listings.find(x => x.owner === "network");
  if (!l) return <div><p>Listing not found.</p></div>;

  const [tab, setTab] = React.useState("photos");
  const [selectedPhotos, setSelectedPhotos] = React.useState([]);
  const togglePhoto = i => setSelectedPhotos(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const allPhotosSelected = selectedPhotos.length === 12;
  const toggleAllPhotos = () => setSelectedPhotos(allPhotosSelected ? [] : Array.from({length: 12}, (_, i) => i));
  const [slideIdx, setSlideIdx] = React.useState(0);

  const HASHTAGS = [
    "#JustListed", "#LuxuryRealEstate", "#DreamHome", "#HomesForSale",
    "#RealEstate", "#NewListing", "#PropertyForSale", "#HouseHunting",
    "#MercerIsland", "#SeattleRealEstate", "#PNWHomes", "#WaterfrontLiving",
    "#ModernHome", "#OpenHouse", "#RealtorLife", "#HomeGoals",
  ];

  const PHOTO_DESCS = [
    "Living Room — Open floor plan with vaulted ceilings and abundant natural light",
    "Kitchen — Chef's kitchen with quartz countertops and premium stainless appliances",
    "Primary Suite — Spacious master bedroom with spa-inspired en-suite and walk-in closet",
    "Dining Room — Formal dining with wainscoting, crown molding, and statement chandelier",
    "Backyard — Professionally landscaped with covered patio and outdoor kitchen",
    "Home Office — Private study with built-in shelving and French doors",
    "Guest Bedroom — Bright secondary bedroom with generous closet and mountain views",
    "Primary Bath — Heated floors, soaking tub, and dual-head rainfall shower",
    "Front Exterior — Striking curb appeal with stone facade and circular driveway",
    "Garage — Oversized 3-car garage with epoxy floors and built-in storage",
    "Deck — Wrap-around deck with panoramic waterfront views",
    "Media Room — Home theater with 4K projector and acoustic wall panels",
  ];

  const propDesc = `Welcome to ${l.address} — a stunning ${(l.type || "home").toLowerCase()} offering ${l.beds} bedrooms and ${l.baths} bathrooms across ${l.sqft.toLocaleString()} square feet of beautifully appointed living space. Located in the heart of ${l.city}, this property blends modern elegance with timeless design. The open-concept floor plan is bathed in natural light, with premium finishes throughout including chef-grade appliances, hardwood floors, and vaulted ceilings. The primary suite features a spa-inspired en-suite bath and generous walk-in closet. Step outside to professionally landscaped grounds with a covered patio perfect for entertaining. Minutes from top-rated schools, dining, and waterfront access. Listed at ${fmtPrice(l.price)} — a rare opportunity you won't want to miss.`;

  const PROP_DETAILS = [
    { label: "Address",       value: `${l.address}, ${l.city}` },
    { label: "List Price",    value: fmtPrice(l.price) },
    { label: "Status",        value: l.status },
    { label: "Bedrooms",      value: String(l.beds) },
    { label: "Bathrooms",     value: String(l.baths) },
    { label: "Sq Footage",    value: `${l.sqft.toLocaleString()} sqft` },
    { label: "Property Type", value: l.type },
    { label: "MLS #",         value: l.mls },
    { label: "Year Built",    value: "2019" },
    { label: "Lot Size",      value: "8,540 sqft" },
    { label: "Garage",        value: "3-car attached" },
    { label: "HOA Fees",      value: "None" },
  ];

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("member-listings")}>
          <Icon name="chevL" size={14} /> Back to listings
        </button>
      </div>

      {/* Hero header — matches spotlight detail sdhdr style */}
      <div className="sdhdr">
        <div className="sdhdr-main">
          <div className="sdhdr-thumb" style={{ backgroundImage: `url(${l.img})` }}></div>
          <div className="sdhdr-content">
            <div className="sdhdr-top-row">
              <span className="dot" style={{ width: 8, height: 8, background: "#16A34A", borderRadius: "50%", flexShrink: 0 }}></span>
              <span style={{ fontSize: 12, color: "#16A34A", fontWeight: 600 }}>{l.status}</span>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>·</span>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{l.role || "Representing Seller"}</span>
              {l.sharedBy && <span className="pill pill-blue" style={{ fontSize: 11 }}>Shared by {INVITER.name}</span>}
            </div>
            <h1 className="sdhdr-title">Your Digital Marketing Package is Ready!</h1>
            <p className="sdhdr-desc">Start download and share ads to promote your listing</p>
            <div className="sdhdr-stats">
              <span style={{ fontWeight: 700, color: "var(--ink)", fontSize: 15 }}>{fmtPrice(l.price)}</span>
              <span style={{ color: "var(--muted-2)" }}>·</span>
              <span>{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</span>
              <span style={{ color: "var(--muted-2)" }}>·</span>
              <span>MLS# {l.mls}</span>
            </div>
            <div className="sdhdr-actions">
              <button className="btn btn-secondary btn-sm"><Icon name="download" size={13} /> Download Assets</button>
            </div>
          </div>
        </div>
        {/* Pro promo sidebar */}
        <div className="member-pro-promo" style={{ width: 200, flexShrink: 0, background: "linear-gradient(160deg, #ECFDF5 0%, #fff 100%)", border: "1px solid #BBF7D0", borderRadius: "var(--r-lg)", padding: "18px 16px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)", lineHeight: 1.35 }}>Manage &amp; Share Your Listing</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              "Connect with your listing data.",
              "Share listings with your network instantly.",
              "Design with ready-made Canva templates.",
            ].map(f => (
              <span key={f} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 13, color: "var(--green-700)", fontWeight: 500 }}>
                <Icon name="check" size={13} stroke={3} style={{ flexShrink: 0, marginTop: 1 }} /> {f}
              </span>
            ))}
          </div>
          <button className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", marginTop: 2 }}>
            <Icon name="sparkle" size={12} /> Get REConnect Pro
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${tab === "photos" ? "active" : ""}`} onClick={() => setTab("photos")}>Photos & Videos <span className="count">{l.photos}</span></button>
        <button className={`tab ${tab === "propinfo" ? "active" : ""}`} onClick={() => setTab("propinfo")}>Property Info</button>
        <button className={`tab ${tab === "hashtags" ? "active" : ""}`} onClick={() => setTab("hashtags")}>Hashtags</button>
        <button className={`tab ${tab === "embed" ? "active" : ""}`} onClick={() => setTab("embed")}>Embed Code</button>
      </div>

      {/* ── Photos & Videos Tab ── */}
      {tab === "photos" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className={`check ${allPhotosSelected ? "on" : ""}`} onClick={toggleAllPhotos} style={{ flexShrink: 0 }}>
                {allPhotosSelected && <Icon name="check" size={12} />}
              </button>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{l.photos} Photos</span>
              {selectedPhotos.length > 0 && <span style={{ fontSize: 12, color: "var(--muted)" }}>{selectedPhotos.length} selected</span>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {selectedPhotos.length > 0 && (
                <button className="btn btn-blue btn-sm"><Icon name="download" size={12} /> Download ({selectedPhotos.length})</button>
              )}
              <button className="btn btn-secondary btn-sm"><Icon name="download" size={12} /> Download All</button>
            </div>
          </div>
          <div className="asset-grid" style={{ marginBottom: 28 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`asset ${selectedPhotos.includes(i) ? "photo-selected" : ""}`}
                   style={{ backgroundImage: `url(${RC_DATA.PROP_IMGS[i % RC_DATA.PROP_IMGS.length]})` }}
                   onClick={() => togglePhoto(i)}>
                <div className="asset-check"><Icon name="check" size={10} /></div>
                {i === 11 && <div className="more">+{l.photos - 11}</div>}
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Videos</div>
          <div className="ld-video-grid">
            {[
              { title: "30s Walkthrough Reel", dur: "0:32", views: "892 views", img: RC_DATA.PROP_IMGS[0] },
              { title: "Drone Exterior Tour", dur: "1:14", views: "445 views", img: RC_DATA.PROP_IMGS[2] },
            ].map((v, i) => (
              <div key={i} className="ld-video-card">
                <div className="ld-video-thumb">
                  <img src={v.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="ld-video-play"><Icon name="play" size={16} /></div>
                  <div className="ld-video-dur">{v.dur}</div>
                </div>
                <div className="ld-video-body">
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{v.views}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    <button className="btn btn-secondary btn-sm"><Icon name="eye" size={12} /> Play</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Property Info Tab ── */}
      {tab === "propinfo" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Description */}
          <div className="card card-pad">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Property Description</div>
              <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard?.writeText(propDesc)}>
                <Icon name="copy" size={12} /> Copy
              </button>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.75, background: "#F8FAFC", border: "1px solid var(--border-2)", borderRadius: "var(--r-sm)", padding: "12px 14px" }}>
              {propDesc}
            </div>
          </div>

          {/* Details */}
          <div className="card card-pad">
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Property Details</div>
            <div>
              {PROP_DETAILS.map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < PROP_DETAILS.length - 1 ? "1px solid var(--border-2)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", marginBottom: 2 }}>{row.label}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{row.value}</div>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }} onClick={() => navigator.clipboard?.writeText(row.value)}>
                    <Icon name="copy" size={12} /> Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── Hashtags Tab ── */}
      {tab === "hashtags" && (
        <div className="card card-pad">
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Suggested Hashtags</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 16 }}>Copy and paste these hashtags into your social media posts to maximize reach.</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {HASHTAGS.map(tag => (
              <span key={tag} style={{ display: "inline-flex", alignItems: "center", fontSize: 12.5, color: "#2563EB", background: "#EFF6FF", border: "1px solid #BFDBFE", padding: "5px 12px", borderRadius: 999, fontWeight: 500, cursor: "pointer" }}>{tag}</span>
            ))}
          </div>
          <div style={{ background: "#F8FAFC", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "12px 14px", fontFamily: "monospace", fontSize: 12.5, color: "var(--ink)", lineHeight: 1.8, wordBreak: "break-word" }}>
            {HASHTAGS.join(" ")}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
            <button className="btn btn-secondary btn-sm"><Icon name="copy" size={12} /> Copy All</button>
          </div>
        </div>
      )}

      {/* ── Embed Code / Listing Gallery Tab ── */}
      {tab === "embed" && (() => {
        const totalSlides = Math.min(l.photos, RC_DATA.PROP_IMGS.length);
        const si = slideIdx % totalSlides;
        const embedCode = `<iframe src="https://${l.mls}.rsir.homes/gallery" width="100%" height="520" frameborder="0" allowfullscreen></iframe>`;
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Gallery Preview — 1 col */}
            <div className="card" style={{ overflow: "hidden", padding: 0 }}>
              {/* Title header */}
              <div style={{ padding: "14px 18px 12px", borderBottom: "1px solid var(--border-2)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 3 }}>{l.address}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{fmtPrice(l.price)}<span style={{ fontWeight: 400, color: "var(--muted)", marginLeft: 8 }}>{l.city}</span></div>
              </div>
              {/* Slide */}
              <div style={{ position: "relative", background: "#000" }}>
                <div style={{ height: 300, backgroundImage: `url(${RC_DATA.PROP_IMGS[si]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <button
                  onClick={() => setSlideIdx(i => (i - 1 + totalSlides) % totalSlides)}
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="chevL" size={16} />
                </button>
                <button
                  onClick={() => setSlideIdx(i => (i + 1) % totalSlides)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="chevR" size={16} />
                </button>
                <div style={{ position: "absolute", bottom: 12, right: 14, background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 11.5, fontWeight: 600, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.02em" }}>
                  {si + 1} of {l.photos}
                </div>
              </div>
              {/* Photo description */}
              <div style={{ padding: "14px 18px 16px", borderTop: "1px solid var(--border-2)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", marginBottom: 4 }}>Photo {si + 1}</div>
                <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.55 }}>{PHOTO_DESCS[si % PHOTO_DESCS.length]}</div>
              </div>
            </div>

            {/* Embed code */}
            <div className="card card-pad">
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Embed This Gallery</div>
              <div style={{ background: "#F8FAFC", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", padding: "13px 15px", fontFamily: "monospace", fontSize: 12, color: "var(--ink)", lineHeight: 1.7, wordBreak: "break-all", marginBottom: 12 }}>
                {embedCode}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard?.writeText(embedCode)}>
                  <Icon name="copy" size={12} /> Copy Code
                </button>
              </div>
            </div>

          </div>
        );
      })()}
    </>
  );
};

// ─── Shared Spotlights Page ─────────────────────────────────────────────────────

const MemberSpotlights = ({ go }) => {
  const list = RC_DATA.spotlights.filter(s => s.owner === "network");

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Shared Spotlights</h1>
          <div className="sub">Curated property collections shared with you.</div>
        </div>
        <div className="member-pro-badge">
          <Icon name="lock" size={13} />
          <span>Create your own spotlights with REConnect Pro</span>
          <button className="btn btn-primary btn-sm"><Icon name="sparkle" size={12} /> Upgrade</button>
        </div>
      </div>

      <div className="toolbar">
        <span className="muted" style={{ fontSize: 12.5 }}>
          <span className="bold" style={{ color: "var(--ink)" }}>{list.length} spotlights</span> · Shared with you
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button className="chip"><Icon name="filter" size={13} /><span className="chip-label"> Filter <Icon name="chevD" size={11} /></span></button>
          <button className="chip"><Icon name="sortUD" size={13} /><span className="chip-label"> Sort: Most viewed <Icon name="chevD" size={11} /></span></button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {list.map(s => (
          <SpotlightRow key={s.id} s={{ ...s, sharedBy: s.sharedBy ? INVITER.name : undefined }} onClick={() => go("member-spotlight/" + s.id)} />
        ))}
      </div>
    </>
  );
};

// ─── Spotlight Detail (member — full Pro layout, minus share + locked tabs) ────

const MemberSpotlightDetail = ({ id, go }) => {
  const s = RC_DATA.spotlights.find(x => x.id === id) || RC_DATA.spotlights.find(x => x.owner === "network");
  if (!s) return <div><p>Spotlight not found.</p></div>;

  const [tab, setTab] = React.useState("assets");
  const includedListings = RC_DATA.listings.slice(0, s.count);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("member-spotlights")}>
          <Icon name="chevL" size={14} /> Back to spotlights
        </button>
      </div>

      {/* Compact header — no hero banner */}
      <div className="sdhdr">
        <div className="sdhdr-main">
          <div className="sdhdr-thumb" style={{ backgroundImage: `url(${s.cover})` }}></div>
          <div className="sdhdr-content">
            <div className="sdhdr-top-row">
              <span className="pill pill-green" style={{ fontSize: 11 }}>Spotlight</span>
              {s.sharedBy && <span className="pill pill-blue" style={{ fontSize: 11 }}>Shared by {INVITER.name}</span>}
              <span className="sdhdr-created">Created {s.created} · Updated {s.updated}</span>
            </div>
            <h1 className="sdhdr-title">{s.sharedBy ? s.title.replace(/ — .+$/, '').trim() : s.title}</h1>
            <p className="sdhdr-desc">{s.description}</p>
            <div className="sdhdr-stats">
              <span><Icon name="eye" size={12} /> {s.views.toLocaleString()} views</span>
              <span><Icon name="star" size={12} /> {s.leads} leads</span>
              <span style={{ color: "var(--muted-2)" }}>·</span>
              <span>{s.count} listings</span>
            </div>
            <div className="sdhdr-actions">
              <button className="btn btn-secondary btn-sm"><Icon name="eye" size={13} /> Preview</button>
            </div>
          </div>
        </div>
        <div className="sdhdr-status">
          <div className="sds-live">
            <span className="sds-dot published"></span>
            <span className="sds-live-label">Live — shared with you</span>
          </div>
          <div className="sds-divider" />
          <div className="sds-meta-row"><span>Created</span><strong>{s.created}</strong></div>
          <div className="sds-meta-row"><span>Last updated</span><strong>{s.updated}</strong></div>
          <div className="sds-meta-row"><span>Listings</span><strong>{s.count}</strong></div>
          <div className="sds-divider" />
          <div className="sds-meta-row"><span>Shared by</span><strong>{INVITER.name}</strong></div>
        </div>
      </div>

      {/* Tabs — Assets first, then Embed Code, Listings; Shared With and Settings removed for member */}
      <div className="tabs">
        <button className={`tab ${tab === "assets" ? "active" : ""}`} onClick={() => setTab("assets")}>Assets</button>
        <button className={`tab ${tab === "embed" ? "active" : ""}`} onClick={() => setTab("embed")}>Embed Code</button>
        <button className={`tab ${tab === "listings" ? "active" : ""}`} onClick={() => setTab("listings")}>Listings <span className="count">{s.count}</span></button>
      </div>

      {tab === "assets" && <AssetsTab s={s} isPro={false} addLabel={null} />}

      {tab === "embed" && <EmbedCodePanel s={s} />}

      {tab === "listings" && (
        <div className="card" style={{ padding: 0 }}>
          {includedListings.map(l => (
            <div key={l.id} className="listing-row listing-row-5col"
              style={{ cursor: "pointer" }}
              onClick={() => go("member-listing/" + l.id)}>
              <div className="thumb" style={{ backgroundImage: `url(${l.img})` }}></div>
              <div className="listing-meta">
                <div className="status"><span className="dot"></span>{l.status}</div>
                <h3>{l.address}</h3>
                <div className="sub"><span><Icon name="location" size={11} /> {l.city}</span></div>
              </div>
              <div><div className="price">{fmtPrice(l.price)}</div><div className="price-sub">{l.beds} bd · {l.baths} ba</div></div>
              <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{l.photos} HD photos</div>
              <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); go("member-listing/" + l.id); }}>
                <Icon name="eye" size={12} /> View
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ─── Locked Feature Page ───────────────────────────────────────────────────────

const LOCKED_META = {
  "locked-company": {
    icon: "company",
    title: "Company Marketing",
    headline: "Amplify every listing with branded marketing packages",
    description: "Create full-suite marketing campaigns — flyers, social posts, video scripts, QR codes, and branded microsites — all tied to your MLS data. Ship polished assets in minutes, not hours.",
    features: ["Branded listing flyers & postcards", "Social media posts (Instagram, Facebook)", "QR codes & short links", "Listing microsites in 1 click", "Video scripts & storyboards"],
    preview: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format",
  },
  "locked-network": {
    icon: "network",
    title: "Network",
    headline: "Build your referral network and share listings instantly",
    description: "Connect with agents, brokers, and lenders in your market. Share individual listings or full spotlights with your network with one click — and get notified when they view or engage.",
    features: ["Unlimited agent connections", "One-click listing sharing", "Real-time view notifications", "Referral tracking", "Network spotlight collaboration"],
    preview: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&auto=format",
  },
  "locked-canva": {
    icon: "canva",
    title: "Canva Integration",
    headline: "Design stunning visuals with real listing data auto-filled",
    description: "Connect your Canva account and access ready-made real estate templates. MLS photos, prices, and details populate automatically — just pick a template and publish.",
    features: ["100+ professional templates", "Auto-populate from MLS data", "Brand kit integration", "One-click publish to social", "Download in print-ready quality"],
    preview: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&auto=format",
  },
};

const LockedPage = ({ route }) => {
  const meta = LOCKED_META[route] || LOCKED_META["locked-company"];

  return (
    <div className="locked-page">
      {/* Blurred preview background */}
      <div className="locked-bg" style={{ backgroundImage: `url(${meta.preview})` }}></div>
      <div className="locked-overlay"></div>

      {/* Upgrade card */}
      <div className="locked-card">
        <div className="locked-icon-wrap">
          <Icon name={meta.icon} size={28} stroke={1.5} />
        </div>
        <div className="locked-pill">
          <Icon name="lock" size={11} stroke={2.5} /> Pro Feature
        </div>
        <h2 className="locked-headline">{meta.headline}</h2>
        <p className="locked-desc">{meta.description}</p>

        <ul className="locked-features">
          {meta.features.map((f, i) => (
            <li key={i}>
              <span className="lf-check"><Icon name="check" size={11} stroke={3} /></span>
              {f}
            </li>
          ))}
        </ul>

        <div className="locked-actions">
          <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: "center" }}>
            <Icon name="sparkle" size={16} /> Get REConnect Pro
          </button>
          <button className="btn btn-secondary btn-lg">Learn more</button>
        </div>

        <div className="locked-social-proof">
          <div className="lsp-avas">
            {["photo-1500648767791-00dcc994a43e","photo-1494790108377-be9c29b29330","photo-1472099645785-5658abf4ff4e"].map((id, i) => (
              <div key={i} className="lsp-ava" style={{ backgroundImage: `url(https://images.unsplash.com/${id}?w=200&auto=format)` }}></div>
            ))}
          </div>
          <span>Join 2,400+ agents already using REConnect Pro</span>
        </div>
      </div>
    </div>
  );
};

// ─── Upgrade Page ──────────────────────────────────────────────────────────────

const UpgradePage = () => (
  <div style={{ maxWidth: 760, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 36 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--green-50)", color: "var(--green-700)", padding: "6px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
        <Icon name="sparkle" size={14} /> REConnect Pro
      </div>
      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 12px" }}>
        Everything you need to grow<br />your real estate business
      </h1>
      <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
        Upgrade from your free member account to unlock listings management, marketing tools, network sharing, and Canva integration.
      </p>
    </div>

    <div className="upgrade-features-grid">
      {[
        { icon: "listing", title: "Listings Management", desc: "Add, manage, and market your active listings with full MLS integration." },
        { icon: "spotlight", title: "Spotlights", desc: "Bundle listings into shareable microsites and track views and leads." },
        { icon: "company", title: "Company Marketing", desc: "Branded flyers, social posts, QR codes, and microsites in minutes." },
        { icon: "network", title: "Agent Network", desc: "Connect with your market's agents and share listings instantly." },
        { icon: "canva", title: "Canva Integration", desc: "100+ templates with MLS data auto-filled. Publish in one click." },
        { icon: "chart", title: "Analytics", desc: "Track views, leads, and engagement across all your marketing." },
      ].map(f => (
        <div key={f.icon} className="card card-pad" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--green-50)", display: "grid", placeItems: "center", color: "var(--green-700)", flex: "none" }}>
            <Icon name={f.icon} size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="card card-pad" style={{
      background: "linear-gradient(160deg, #ECFDF5 0%, #fff 60%)",
      border: "1px solid #BBF7D0",
      textAlign: "center",
      padding: "36px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", left: "50%", top: -60, transform: "translateX(-50%)", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--green-700)", marginBottom: 10 }}>REConnect Pro · Billed annually</div>
      <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)" }}>$79<span style={{ fontSize: 20, fontWeight: 400, color: "var(--muted)" }}>/mo</span></div>
      <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 28 }}>All features unlocked · Cancel any time</div>
      <button className="btn btn-lg" style={{ margin: "0 auto", display: "inline-flex", background: "#2563EB", color: "#fff" }}>
        <Icon name="sparkle" size={16} /> Start Free 14-Day Trial &nbsp;→
      </button>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 12 }}>No credit card required</div>
    </div>
  </div>
);

// ─── Upgrade Banner (dashboard) ────────────────────────────────────────────────

const MemberUpgradeBanner = () => (
  <div style={{
    background: "linear-gradient(160deg, #ECFDF5 0%, #fff 60%)",
    border: "1px solid #BBF7D0",
    borderRadius: "var(--r-lg)",
    padding: "28px 32px",
    display: "flex", alignItems: "center", gap: 24,
    flexWrap: "wrap",
    position: "relative", overflow: "hidden",
    boxShadow: "var(--shadow-sm)",
  }}>
    <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)", pointerEvents: "none" }} />
    <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 220 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--green-50)", border: "1px solid #BBF7D0", display: "grid", placeItems: "center", color: "var(--green-600)", flex: "none" }}>
        <Icon name="sparkle" size={22} />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 3, color: "var(--ink)" }}>Unlock the full REConnect experience</div>
        <div style={{ fontSize: 12.5, color: "var(--muted)" }}>Create listings, build your network, and market with Canva — all in one place.</div>
      </div>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1, minWidth: 200 }}>
      {["Listings Manager", "Spotlights Builder", "Canva Integration", "Agent Network"].map(f => (
        <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--green-700)", background: "var(--green-50)", border: "1px solid #BBF7D0", padding: "4px 10px", borderRadius: 999, fontWeight: 500 }}>
          <Icon name="check" size={11} stroke={3} /> {f}
        </span>
      ))}
    </div>
    <button className="btn btn-lg" style={{ background: "#2563EB", color: "#fff", whiteSpace: "nowrap", flexShrink: 0 }}>
      <Icon name="sparkle" size={16} /> Get REConnect Pro <Icon name="arrowR" size={14} />
    </button>
  </div>
);

Object.assign(window, {
  MemberDashboard,
  MemberListings,
  MemberListingRow,
  MemberListingDetail,
  MemberSpotlights,
  MemberSpotlightDetail,
  LockedPage,
  UpgradePage,
  MemberUpgradeBanner,
});
