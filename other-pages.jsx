/* global React, RC_DATA, Icon, fmtPrice */

const COMPANY_PKGS = [
  { id: "C1", title: "Spring 2026 Brand Refresh",     desc: "Brokerage-wide brand refresh covering social media, print, and digital assets for the Spring 2026 season.",             count: 24, type: "Brand campaign", cover: RC_DATA.PROP_IMGS[0], thumbs: [RC_DATA.PROP_IMGS[0], RC_DATA.PROP_IMGS[2], RC_DATA.PROP_IMGS[5]], created: "Apr 1, 2026",  updated: "1 week ago",  views: 412, status: "published" },
  { id: "C2", title: "Open House Weekend Toolkit",    desc: "Event marketing toolkit with ready-to-use social posts, flyers, and email templates for open house weekends.",         count: 12, type: "Event",         cover: RC_DATA.PROP_IMGS[2], thumbs: [RC_DATA.PROP_IMGS[2], RC_DATA.PROP_IMGS[1], RC_DATA.PROP_IMGS[4]], created: "Apr 22, 2026", updated: "3 days ago",  views: 284, status: "published" },
  { id: "C3", title: "Recruiting — Agent Spotlight",  desc: "Spotlights top-performing agents and brokerage culture to attract new talent through social and digital channels.",      count: 8,  type: "Recruiting",   cover: RC_DATA.PROP_IMGS[5], thumbs: [RC_DATA.PROP_IMGS[5], RC_DATA.PROP_IMGS[3], RC_DATA.PROP_IMGS[7]], created: "Mar 15, 2026", updated: "2 weeks ago", views: 196, status: "draft"     },
  { id: "C4", title: "Client Testimonial Series",     desc: "Multi-channel social campaign featuring real client stories and success highlights across Instagram, Facebook, and email.", count: 16, type: "Social",       cover: RC_DATA.PROP_IMGS[6], thumbs: [RC_DATA.PROP_IMGS[6], RC_DATA.PROP_IMGS[0], RC_DATA.PROP_IMGS[2]], created: "May 1, 2026",  updated: "Yesterday",   views: 538, status: "published" },
];

const CompanyRow = ({ p, onClick }) => (
  <div className="show-row" onClick={onClick}>
    <div className="show-row-thumb" style={{ backgroundImage: `url(${p.cover})` }}>
      <div className="show-row-thumbs">
        {p.thumbs.slice(0, 3).map((t, i) => <i key={i} style={{ backgroundImage: `url(${t})` }}></i>)}
      </div>
    </div>
    <div className="show-row-meta">
      <div className="show-row-top">
        <span className="pill" style={{ fontSize: 11, background: "var(--canvas)", color: "var(--muted)", border: "1px solid var(--border)" }}>{p.type}</span>
        {p.status === "draft"
          ? <span className="pill" style={{ background: "var(--amber-50)", color: "#b45309", border: "1px solid #fcd34d", fontSize: 11 }}>Draft</span>
          : <span className="pill pill-green" style={{ fontSize: 11 }}>Published</span>
        }
      </div>
      <h3 className="show-row-title">{p.title}</h3>
      <p className="show-row-desc">{p.desc}</p>
      <div className="show-row-stats">
        <span><Icon name="eye" size={12} /> {p.views.toLocaleString()} views</span>
        <span><Icon name="image" size={12} /> {p.count} assets</span>
      </div>
    </div>
    <div className="show-row-dates">
      <div><span className="show-row-date-label">Created</span><span className="show-row-date-val">{p.created}</span></div>
      <div><span className="show-row-date-label">Last updated</span><span className="show-row-date-val">{p.updated}</span></div>
    </div>
    <button className="btn btn-secondary show-row-btn" onClick={e => { e.stopPropagation(); onClick(); }}>
      View Campaign <Icon name="arrowR" size={13} />
    </button>
  </div>
);

const COMPANY_PAGE_SIZE = 5;

const CompanyMarketing = ({ go }) => {
  const [tab, setTab] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const fullList = tab === "all" ? COMPANY_PKGS : COMPANY_PKGS.filter(p => p.status === tab);
  const list = fullList.slice((page - 1) * COMPANY_PAGE_SIZE, page * COMPANY_PAGE_SIZE);

  React.useEffect(() => { setPage(1); }, [tab]);

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Company Marketing</h1>
          <div className="sub">Brokerage-wide assets, campaigns, and templates available to every agent.</div>
        </div>
        <button className="btn btn-primary" onClick={() => go("new-company")}><Icon name="plus" size={14} /> Create Campaign</button>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
          All Campaigns <span className="count">{COMPANY_PKGS.length}</span>
        </button>
        <button className={`tab ${tab === "published" ? "active" : ""}`} onClick={() => setTab("published")}>
          Published <span className="count">{COMPANY_PKGS.filter(p => p.status === "published").length}</span>
        </button>
        <button className={`tab ${tab === "draft" ? "active" : ""}`} onClick={() => setTab("draft")}>
          Drafts <span className="count">{COMPANY_PKGS.filter(p => p.status === "draft").length}</span>
        </button>
      </div>

      <div className="toolbar">
        <span className="muted" style={{ fontSize: 12.5 }}><span className="bold" style={{ color: "var(--ink)" }}>{fullList.length} campaigns</span></span>
        <button className="chip" style={{ marginLeft: "auto" }}><Icon name="filter" size={13} /><span className="chip-label"> Filter <Icon name="chevD" size={11} /></span></button>
        <button className="chip"><Icon name="sortUD" size={13} /><span className="chip-label"> Sort: Recent <Icon name="chevD" size={11} /></span></button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {list.map(p => (
          <CompanyRow key={p.id} p={p} onClick={() => go("company/" + p.id)} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} total={fullList.length} perPage={COMPANY_PAGE_SIZE} />
    </>
  );
};

const PLATFORM_COLORS = {
  INSTAGRAM: { bg: "#fce7f3", color: "#be185d" },
  FACEBOOK:  { bg: "#dbeafe", color: "#1d4ed8" },
  WEBSITE:   { bg: "#e0f2fe", color: "#0369a1" },
  "PDF DOWNLOAD": { bg: "#fee2e2", color: "#dc2626" },
  EMAIL:     { bg: "#d1fae5", color: "#047857" },
  VIDEO:     { bg: "#ede9fe", color: "#7c3aed" },
  TWITTER:   { bg: "#f0f9ff", color: "#0284c7" },
};

const MatCard = ({ item, onEdit }) => {
  const pc = PLATFORM_COLORS[item.platform] || { bg: "var(--canvas)", color: "var(--muted)" };
  const isPdf = item.platform === "PDF DOWNLOAD";
  const isWebsite = item.platform === "WEBSITE";
  return (
    <div className="mat-card">
      <div className="mat-platform" style={{ color: pc.color }}>
        <Icon name={item.icon} size={11} />
        {item.platform}
      </div>
      {isPdf ? (
        <div className="mat-preview-pdf">
          <div className="pdf-badge">PDF</div>
          <div className="mat-preview-pdf-url">{item.url}</div>
        </div>
      ) : isWebsite ? (
        <div className="mat-preview" style={{ backgroundImage: `url(${item.img})` }}>
          <div className="mat-preview-url"><Icon name="link" size={10} /> {item.url}</div>
        </div>
      ) : (
        <div className="mat-preview" style={{ backgroundImage: `url(${item.img})` }}></div>
      )}
      <div className="mat-body">
        <div className="mat-title">{item.title}</div>
      </div>
      <div className="mat-actions">
        <button title="Edit"><Icon name="edit" size={13} /></button>
        <button title="Copy link"><Icon name="copy" size={13} /></button>
        <button title="Share"><Icon name="share" size={13} /></button>
        {isPdf && <button title="Download"><Icon name="download" size={13} /></button>}
      </div>
    </div>
  );
};

const CompanyDetail = ({ id, go }) => {
  const pkg = COMPANY_PKGS.find(p => p.id === id) || COMPANY_PKGS[0];
  const [tab, setTab] = React.useState("assets");
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [pageStatus, setPageStatus] = React.useState(pkg.status || "published");

  return (
    <>
      {showAddModal && <AddAssetModal s={pkg} onClose={() => setShowAddModal(false)} />}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("company")}>
          <Icon name="chevL" size={14} /> Back to company marketing
        </button>
      </div>

      {/* ── Compact header matching SpotlightDetail ── */}
      <div className="sdhdr">
        <div className="sdhdr-main">
          <div className="sdhdr-thumb" style={{ backgroundImage: `url(${pkg.cover})` }}></div>
          <div className="sdhdr-content">
            <div className="sdhdr-top-row">
              <span className="pill pill-green" style={{ fontSize: 11 }}>Company Marketing</span>
              <span className="pill" style={{ fontSize: 11, background: "var(--canvas)", color: "var(--muted)", border: "1px solid var(--border)" }}>{pkg.type}</span>
            </div>
            <h1 className="sdhdr-title">{pkg.title}</h1>
            <p className="sdhdr-desc">{pkg.desc}</p>
            <div className="sdhdr-stats">
              <span><Icon name="eye" size={12} /> {pkg.views.toLocaleString()} views</span>
              <span style={{ color: "var(--muted-2)" }}>·</span>
              <span>{pkg.count} assets</span>
            </div>
            <div className="sdhdr-actions">
              <button className="btn btn-secondary btn-sm"><Icon name="eye" size={13} /> Preview</button>
              {pageStatus === "published"
                ? <button className="btn btn-primary btn-sm"><Icon name="share" size={13} /> Share</button>
                : <button className="btn btn-secondary btn-sm" style={{ opacity: 0.55 }} disabled><Icon name="share" size={13} /> Share</button>
              }
            </div>
          </div>
        </div>

        {/* Status sidebar */}
        <div className="sdhdr-status">
          <div className="sds-live">
            <span className={`sds-dot ${pageStatus}`}></span>
            <span className="sds-live-label">{pageStatus === "published" ? "Live — shareable" : "Draft — private"}</span>
          </div>
          <div className="sds-divider" />
          <div className="sds-meta-row"><span>Created</span><strong>{pkg.created}</strong></div>
          <div className="sds-meta-row"><span>Last updated</span><strong>{pkg.updated}</strong></div>
          <div className="sds-meta-row"><span>Assets</span><strong>{pkg.count}</strong></div>
          <div className="sds-divider" />
          <div className="sds-toggle-label">Status</div>
          <div className="sds-toggle">
            <button
              className={pageStatus === "draft" ? "active" : ""}
              style={pageStatus === "draft" ? { background: "var(--amber-50)", color: "#b45309", borderColor: "#fcd34d" } : {}}
              onClick={() => setPageStatus("draft")}>Draft</button>
            <button
              className={pageStatus === "published" ? "active" : ""}
              style={pageStatus === "published" ? { background: "var(--green-50)", color: "var(--green-700)", borderColor: "#6ee7b7" } : {}}
              onClick={() => setPageStatus("published")}>Published</button>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="tabs">
        <button className={`tab ${tab === "assets" ? "active" : ""}`} onClick={() => setTab("assets")}>
          Assets <span className="count">{pkg.count}</span>
        </button>
        <button className={`tab ${tab === "settings" ? "active" : ""}`} onClick={() => setTab("settings")}>Settings</button>
      </div>

      {tab === "assets" && <AssetsTab s={pkg} isPro onAdd={() => setShowAddModal(true)} />}

      {tab === "settings" && (
        <div className="card aside-card">
          <div className="field"><label>Campaign title</label><input defaultValue={pkg.title} /></div>
          <div className="field">
            <label>Subtitle <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></label>
            <input placeholder="e.g. Spring 2026 · Brokerage-wide" />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea rows={3} defaultValue={pkg.desc} style={{ resize: "vertical" }} />
          </div>
          <div className="field">
            <label>Short description <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></label>
            <textarea rows={2} placeholder="A brief one-liner shown in cards and search results…" style={{ resize: "vertical" }} />
          </div>
          <div className="field">
            <label>Campaign type</label>
            <select defaultValue={pkg.type}>
              <option>Brand campaign</option><option>Event</option><option>Recruiting</option>
              <option>Social</option><option>Seasonal</option><option>Community / Sponsorship</option>
            </select>
          </div>
          <div className="field"><label>Custom URL</label><input defaultValue={`reconnect.app/c/${id && id.toLowerCase()}`} /></div>
          <div className="field">
            <label>Visibility</label>
            <select>
              <option>All agents in brokerage</option>
              <option>Selected teams</option>
              <option>Private — admins only</option>
            </select>
          </div>
          <div className="field">
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" defaultChecked /> Allow agents to share materials with their network
            </label>
          </div>
          <div className="field">
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" defaultChecked /> Auto-distribute new materials to agents
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
            <button className="btn btn-primary btn-sm">Save changes</button>
          </div>
          <div className="danger-zone">
            <div className="danger-zone-title">Danger zone</div>
            <div className="danger-zone-row">
              <div className="danger-zone-desc">
                Permanently delete this campaign and all its assets. This action cannot be undone.
              </div>
              <button className="btn-danger"><Icon name="trash" size={13} /> Delete Campaign</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NETWORK_PAGE_SIZE = 5;

const Network = ({ onInvite, go }) => {
  const [tab, setTab] = React.useState("members");
  const [page, setPage] = React.useState(1);

  const fullList = RC_DATA.network.filter(n => tab === "members" ? !n.pending : n.pending);
  const list = fullList.slice((page - 1) * NETWORK_PAGE_SIZE, page * NETWORK_PAGE_SIZE);

  React.useEffect(() => { setPage(1); }, [tab]);

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Network</h1>
          <div className="sub">Your connected agents, brokers, and partners on REConnect.</div>
        </div>
        <button className="btn btn-primary" onClick={onInvite}><Icon name="plus" size={14} /> Send Invitation</button>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "members" ? "active" : ""}`} onClick={() => setTab("members")}>Members <span className="count">{RC_DATA.network.filter(n => !n.pending).length}</span></button>
        <button className={`tab ${tab === "pending" ? "active" : ""}`} onClick={() => setTab("pending")}>Pending <span className="count">{RC_DATA.network.filter(n => n.pending).length}</span></button>
      </div>

      <div className="toolbar">
        <span className="muted" style={{ fontSize: 12.5 }}><span className="bold" style={{ color: "var(--ink)" }}>{fullList.length} {tab === "members" ? "members" : "pending"}</span></span>
        <button className="chip" style={{ marginLeft: "auto" }}><Icon name="filter" size={13} /><span className="chip-label"> Filter <Icon name="chevD" size={11} /></span></button>
        <button className="chip"><Icon name="sortUD" size={13} /><span className="chip-label"> Sort: Most active <Icon name="chevD" size={11} /></span></button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {list.map(n => (
          <div key={n.id} className="net-row" style={{ cursor: "pointer" }} onClick={() => !n.pending && go && go("network/" + n.id)}>
            <div className="ava" style={{ backgroundImage: `url(${n.ava})` }}></div>
            <div>
              <div className="name">{n.name}</div>
              <div className="role">{n.role}</div>
            </div>
            <div>
              <div className="bold" style={{ fontSize: 13 }}>{n.listings} listings</div>
              <div className="muted" style={{ fontSize: 12 }}>{n.sharing} shared with you</div>
            </div>
            <div>
              <div className="bold" style={{ fontSize: 13 }}>{n.spotlightsCreated} spotlights</div>
              <div className="muted" style={{ fontSize: 12 }}>{n.spotlightsShared} shared with you</div>
            </div>
            <div className="muted" style={{ fontSize: 12.5 }}>Connected {n.since}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {!n.pending && <button className="btn btn-secondary btn-sm"><Icon name="mail" size={13} /> Contact</button>}
              {n.pending ? <button className="btn btn-secondary btn-sm">Resend invite</button> : <button className="btn btn-secondary btn-sm"><Icon name="share" size={13} /> Share</button>}
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} total={fullList.length} perPage={NETWORK_PAGE_SIZE} />
    </>
  );
};

const InviteModal = ({ onClose }) => (
  <div className="modal-back" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <div className="modal-h"><h2>Send Network Invitation</h2><button className="icon-btn" onClick={onClose}><Icon name="x" /></button></div>
      <div className="modal-b">
        <p className="muted" style={{ marginTop: -4 }}>Invitees get a free read-only REConnect account. They can upgrade anytime to publish their own listings.</p>
        <div className="field"><label>Email addresses</label><textarea rows={3} placeholder="sarah@coldwell.com, marcus@windermere.com…"></textarea></div>
        <div className="field"><label>Personal message (optional)</label><textarea rows={3} defaultValue="Hi — I'd love to connect on REConnect so we can share listings and spotlights with each other. — Mike"></textarea></div>
        <div className="field">
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" defaultChecked /> Auto-share my new listings with this person
          </label>
        </div>
      </div>
      <div className="modal-f">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={onClose}><Icon name="mail" size={13} /> Send invitations</button>
      </div>
    </div>
  </div>
);

const CanvaFilterModal = ({ purpose, setPurpose, tplType, setTplType, size, setSize, createdBy, setCreatedBy, onClose }) => {
  const hasActive = purpose || tplType || size || createdBy;
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-h">
          <h2>Filter Templates</h2>
          <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
        </div>
        <div className="modal-b">
          <div className="field">
            <label>Purpose</label>
            <select value={purpose} onChange={e => setPurpose(e.target.value)}>
              <option value="">All purposes</option>
              <option>Open House</option><option>Just Listed</option><option>Price Reduced</option>
              <option>Recruiting</option><option>Brand</option><option>Social</option>
            </select>
          </div>
          <div className="field">
            <label>Type</label>
            <select value={tplType} onChange={e => setTplType(e.target.value)}>
              <option value="">All types</option>
              <option>Post</option><option>Story</option><option>Flyer</option><option>Email</option><option>Video</option>
            </select>
          </div>
          <div className="field">
            <label>Size</label>
            <select value={size} onChange={e => setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option>Square</option><option>16:9</option><option>9:16</option><option>Letter</option>
            </select>
          </div>
          <div className="field">
            <label>Created By</label>
            <select value={createdBy} onChange={e => setCreatedBy(e.target.value)}>
              <option value="">All creators</option>
              <option>Neutrino</option><option>My Templates</option>
            </select>
          </div>
        </div>
        <div className="modal-f">
          <button className="btn btn-secondary" onClick={() => { setPurpose(""); setTplType(""); setSize(""); setCreatedBy(""); }}>Reset</button>
          <button className="btn btn-primary" onClick={onClose}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

const Canva = ({ go }) => {
  const [purpose, setPurpose] = React.useState("");
  const [tplType, setTplType] = React.useState("");
  const [size, setSize] = React.useState("");
  const [createdBy, setCreatedBy] = React.useState("");
  const [filterOpen, setFilterOpen] = React.useState(false);

  const tpls = RC_DATA.templates.filter(t => {
    if (createdBy === "My Templates" && t.source !== "My Templates") return false;
    if (createdBy === "Neutrino" && t.source !== "Neutrino") return false;
    return true;
  });

  const activeFilterCount = [purpose, tplType, size, createdBy].filter(Boolean).length;

  return (
    <>
      {filterOpen && (
        <CanvaFilterModal
          purpose={purpose} setPurpose={setPurpose}
          tplType={tplType} setTplType={setTplType}
          size={size} setSize={setSize}
          createdBy={createdBy} setCreatedBy={setCreatedBy}
          onClose={() => setFilterOpen(false)}
        />
      )}

      <div className="page-h">
        <div>
          <h1>Canva</h1>
          <div className="sub">Use Canva templates to design custom marketing for your listings and spotlights.</div>
        </div>
        <button className="btn btn-primary" onClick={() => go("new-template")}><Icon name="plus" size={14} /> Add Template</button>
      </div>

      <div className="canva-status" style={{ marginBottom: 22 }}>
        <img src="uploads/Canva-Logo.svg" alt="Canva" style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <h3>Canva is connected</h3>
          <div className="meta">62 listings have an active Canva data feed · Last sync 4 minutes ago</div>
        </div>
        <span className="canva-status-actions">
          <span className="pill pill-green"><span style={{ width: 6, height: 6, borderRadius: 999, background: "#10B981", display: "inline-block" }}></span> Connected</span>
          <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5, borderColor: "var(--blue-600)", color: "var(--blue-600)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Open in Canva
          </a>
        </span>
      </div>

      {/* Desktop: inline filter dropdowns */}
      <div className="canva-filters">
        <div className="canva-filter-group">
          <div className="canva-filter-label">Purpose</div>
          <select className="canva-select" value={purpose} onChange={e => setPurpose(e.target.value)}>
            <option value="">All purposes</option>
            <option>Open House</option><option>Just Listed</option><option>Price Reduced</option>
            <option>Recruiting</option><option>Brand</option><option>Social</option>
          </select>
        </div>
        <div className="canva-filter-group">
          <div className="canva-filter-label">Type</div>
          <select className="canva-select" value={tplType} onChange={e => setTplType(e.target.value)}>
            <option value="">All types</option>
            <option>Post</option><option>Story</option><option>Flyer</option><option>Email</option><option>Video</option>
          </select>
        </div>
        <div className="canva-filter-group">
          <div className="canva-filter-label">Size</div>
          <select className="canva-select" value={size} onChange={e => setSize(e.target.value)}>
            <option value="">All sizes</option>
            <option>Square</option><option>16:9</option><option>9:16</option><option>Letter</option>
          </select>
        </div>
        <div className="canva-filter-group">
          <div className="canva-filter-label">Created By</div>
          <select className="canva-select" value={createdBy} onChange={e => setCreatedBy(e.target.value)}>
            <option value="">All creators</option>
            <option>Neutrino</option><option>My Templates</option>
          </select>
        </div>
      </div>

      {/* Mobile: toolbar with count + Filter chip (matches other pages) */}
      <div className="toolbar canva-mobile-toolbar">
        <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>{tpls.length}</span> templates
        </span>
        <button className={`chip ${activeFilterCount > 0 ? "active" : ""}`} style={{ marginLeft: "auto" }} onClick={() => setFilterOpen(true)}>
          <Icon name="filter" size={13} />
          {activeFilterCount > 0 && <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 700 }}>{activeFilterCount}</span>}
        </button>
      </div>

      <div className="section-h" style={{ marginBottom: 14 }}>
        <h2>Templates <span className="count">({tpls.length})</span></h2>
      </div>
      <div className="tpl-grid">
        {tpls.map(t => (
          <div key={t.id} className="tpl">
            <div className="cover" style={{ backgroundImage: `url(${t.cover})` }}></div>
            <div className="body">
              <h4>{t.name}</h4>
              <div className="meta">{t.source} · Used {t.uses}×</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const SHARE_MATERIALS = [
  { id: "photos",   label: "Photos / Videos",       icon: "image"   },
  { id: "desc",     label: "Property Description",   icon: "edit"    },
  { id: "detail",   label: "Detail",                 icon: "card"    },
  { id: "hashtags", label: "Hashtags",               icon: "sparkle" },
  { id: "embed",    label: "Embed Code",             icon: "code"    },
  { id: "website",  label: "Website (SLW)",           icon: "site"    },
  { id: "flyer",    label: "Flyer",                  icon: "flyer"   },
  { id: "qr",       label: "QR Code",                icon: "qr"      },
  { id: "doc",      label: "Doc",                    icon: "copy",   disabled: true },
  { id: "socials",  label: "Socials",                icon: "ig",     disabled: true },
  { id: "unbranded",label: "Unbranded",              icon: "eye",    disabled: true },
];

const ShareModal = ({ kind, onClose, count, selectedItems }) => {
  const [step, setStep] = React.useState(1);
  const networkMembers = RC_DATA.network.filter(n => !n.pending);
  const [selectedRecipients, setSelectedRecipients] = React.useState(new Set());
  const [recipientSearch, setRecipientSearch] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const activeMatIds = SHARE_MATERIALS.filter(m => !m.disabled).map(m => m.id);
  const [selectedMaterials, setSelectedMaterials] = React.useState(new Set(activeMatIds));
  const [note, setNote] = React.useState("");

  const isEmail = v => v.includes("@");
  const toggleRecipient = id => setSelectedRecipients(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const removeRecipient = id => setSelectedRecipients(prev => { const n = new Set(prev); n.delete(id); return n; });
  const addEmail = email => {
    const v = email.trim();
    if (!v || !isEmail(v)) return;
    setSelectedRecipients(prev => { const n = new Set(prev); n.add(v); return n; });
    setRecipientSearch("");
  };
  const toggleMaterial = id => setSelectedMaterials(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const allMatsSelected = selectedMaterials.size === activeMatIds.length;
  const toggleAllMaterials = () => setSelectedMaterials(allMatsSelected ? new Set() : new Set(activeMatIds));

  const recipientCount = selectedRecipients.size;
  const materialCount = selectedMaterials.size;

  const dropdownResults = networkMembers.filter(n =>
    !recipientSearch || n.name.toLowerCase().includes(recipientSearch.toLowerCase()) || (n.email || "").toLowerCase().includes(recipientSearch.toLowerCase())
  );

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal lg" onClick={e => e.stopPropagation()}>
        <div className="modal-h">
          <h2>Share {kind === "listings" ? `${count || 0} listings` : kind === "listing" ? "this listing" : kind === "assets" ? `${count || 0} asset${count !== 1 ? "s" : ""}` : "this spotlight"}</h2>
          <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
        </div>
        <div className="modal-b">
          {kind === "assets" ? (
            /* Assets flow: Recipients → Send (no materials step) */
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <span className={`pill ${step >= 1 ? "pill-green" : "pill-gray"}`}>1 · Recipients</span>
                <span className={`pill ${step >= 2 ? "pill-green" : "pill-gray"}`}>2 · Send</span>
              </div>
              {step === 1 && (
                <>
                  {selectedItems && selectedItems.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Sharing</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 160, overflowY: "auto" }}>
                        {selectedItems.map(item => (
                          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", background: "var(--canvas)", borderRadius: 8, border: "1px solid var(--border)" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: item.color || "#64748b", color: "#fff", flexShrink: 0 }}>
                              {item.label || (item.type ? "SOCIAL" : "FILE")}
                            </span>
                            <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{item.name}</span>
                            {item.sub && <span style={{ fontSize: 11.5, color: "var(--muted)", flexShrink: 0 }}>{item.sub}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="field"><label>Send to</label><input placeholder="Search your network or paste emails…" /></div>
                  <div className="share-recipients-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    {networkMembers.slice(0, 4).map(n => (
                      <label key={n.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 10, cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked />
                        <div className="ava" style={{ width: 32, height: 32, borderRadius: 999, backgroundImage: `url(${n.ava})`, backgroundSize: "cover" }}></div>
                        <div style={{ flex: 1 }}>
                          <div className="bold" style={{ fontSize: 13 }}>{n.name}</div>
                          <div className="muted" style={{ fontSize: 11.5 }}>{n.role}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="field" style={{ marginTop: 16 }}><label>Personal note <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></label><textarea rows={3} placeholder="Sharing these assets for our co-marketing…"></textarea></div>
                </>
              )}
              {step === 2 && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--green-50)", color: "var(--green-600)", display: "grid", placeItems: "center", margin: "0 auto 12px" }}>
                    <Icon name="check" size={28} stroke={2.5} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: 18 }}>Ready to send</h3>
                  <p className="muted">4 recipients · {count} asset{count !== 1 ? "s" : ""}</p>
                </div>
              )}
            </>
          ) : (
            /* Listing / Spotlight flow: Recipients → Materials → Send */
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <span className={`pill ${step >= 1 ? "pill-green" : "pill-gray"}`}>1 · Recipients</span>
                <span className={`pill ${step >= 2 ? "pill-green" : "pill-gray"}`}>2 · Materials</span>
                <span className={`pill ${step >= 3 ? "pill-green" : "pill-gray"}`}>3 · Send</span>
              </div>

              {/* ── Step 1: Recipients ── */}
              {step === 1 && (
                <>
                  <div className="field" style={{ position: "relative" }}>
                    <label>Recipients</label>
                    <input
                      value={recipientSearch}
                      onChange={e => setRecipientSearch(e.target.value)}
                      onFocus={() => setDropdownOpen(true)}
                      onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                      onKeyDown={e => { if (e.key === "Enter" && isEmail(recipientSearch)) addEmail(recipientSearch); }}
                      placeholder="Search network by name or email, or add any email…"
                      autoComplete="off"
                    />
                    {dropdownOpen && (
                      <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", maxHeight: 220, overflowY: "auto", marginTop: 4 }}>
                        {isEmail(recipientSearch) && !selectedRecipients.has(recipientSearch.trim()) && (
                          <div onMouseDown={() => addEmail(recipientSearch)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", background: "var(--blue-50)", borderBottom: "1px solid var(--border)" }}>
                            <div style={{ width: 30, height: 30, borderRadius: 999, background: "var(--blue-100)", display: "grid", placeItems: "center", color: "var(--blue-600)", flexShrink: 0 }}>
                              <Icon name="mail" size={14} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 500 }}>Add "{recipientSearch.trim()}"</div>
                              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>Send via email</div>
                            </div>
                            <Icon name="plus" size={14} />
                          </div>
                        )}
                        {dropdownResults.map(n => {
                          const checked = selectedRecipients.has(n.id);
                          return (
                            <div key={n.id} onMouseDown={() => toggleRecipient(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", background: checked ? "var(--blue-50)" : "transparent", borderBottom: "1px solid var(--border)" }}>
                              <div className="ava" style={{ width: 30, height: 30, borderRadius: 999, backgroundImage: `url(${n.ava})`, backgroundSize: "cover", flexShrink: 0 }}></div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.name}</div>
                                <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{n.role}</div>
                              </div>
                              {checked && <Icon name="check" size={14} />}
                            </div>
                          );
                        })}
                        {dropdownResults.length === 0 && !isEmail(recipientSearch) && (
                          <div style={{ padding: "12px 14px", fontSize: 13, color: "var(--muted)" }}>
                            No match — type an email address to add directly.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Selected recipient chips */}
                  {recipientCount > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                      {[...selectedRecipients].map(id => {
                        const n = networkMembers.find(m => m.id === id);
                        return (
                          <div key={id} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 10px 5px 7px", background: "var(--blue-50)", border: "1px solid var(--blue-200)", borderRadius: 999, fontSize: 13 }}>
                            {n ? (
                              <div className="ava" style={{ width: 22, height: 22, borderRadius: 999, backgroundImage: `url(${n.ava})`, backgroundSize: "cover", flexShrink: 0 }}></div>
                            ) : (
                              <div style={{ width: 22, height: 22, borderRadius: 999, background: "var(--blue-100)", display: "grid", placeItems: "center", color: "var(--blue-600)", flexShrink: 0 }}>
                                <Icon name="mail" size={12} />
                              </div>
                            )}
                            <span style={{ fontWeight: 500 }}>{n ? n.name : id}</span>
                            <button onClick={() => removeRecipient(id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "var(--muted)", marginLeft: 2 }}>
                              <Icon name="x" size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                      Click the field above to search and select recipients.
                    </div>
                  )}
                </>
              )}

              {/* ── Step 2: Materials ── */}
              {step === 2 && (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>Marketing materials to include</label>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", color: "var(--blue-600)", fontWeight: 500 }}>
                      <input
                        type="checkbox"
                        checked={allMatsSelected}
                        onChange={toggleAllMaterials}
                        style={{ accentColor: "var(--blue-600)", width: 15, height: 15 }}
                      />
                      Select all
                    </label>
                  </div>
                  <div className="share-materials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6, marginBottom: 20 }}>
                    {SHARE_MATERIALS.map(m => {
                      const on = selectedMaterials.has(m.id);
                      const disabled = !!m.disabled;
                      return (
                        <label key={m.id}
                          onClick={() => !disabled && toggleMaterial(m.id)}
                          style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: `1px solid ${!disabled && on ? "var(--blue-400)" : "var(--border)"}`, borderRadius: 10, cursor: disabled ? "default" : "pointer", background: !disabled && on ? "var(--blue-50)" : "var(--surface)", opacity: disabled ? 0.45 : 1 }}>
                          <input type="checkbox" checked={!disabled && on} disabled={disabled} onChange={() => {}} style={{ accentColor: "var(--blue-600)", width: 15, height: 15, flexShrink: 0 }} />
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: !disabled && on ? "var(--blue-100)" : "var(--canvas)", display: "grid", placeItems: "center", color: !disabled && on ? "var(--blue-600)" : "var(--muted)", flexShrink: 0 }}>
                            <Icon name={m.icon} size={15} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 500 }}>{m.label}</div>
                            {disabled && <div style={{ fontSize: 11, color: "var(--muted)" }}>Coming soon</div>}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  <div className="field">
                    <label>Personal note <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></label>
                    <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note for your recipients…"></textarea>
                  </div>
                </>
              )}

              {/* ── Step 3: Send ── */}
              {step === 3 && (
                <div style={{ padding: "8px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 999, background: "var(--green-50)", color: "var(--green-600)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <Icon name="check" size={22} stroke={2.5} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>Ready to send</div>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>{recipientCount} recipient{recipientCount !== 1 ? "s" : ""} · {materialCount} material{materialCount !== 1 ? "s" : ""}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Recipients</div>
                  {recipientCount === 0 ? (
                    <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>No recipients selected.</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                      {[...selectedRecipients].map(id => {
                        const n = networkMembers.find(m => m.id === id);
                        return (
                          <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "var(--canvas)", borderRadius: 8, border: "1px solid var(--border)" }}>
                            {n ? (
                              <div className="ava" style={{ width: 28, height: 28, borderRadius: 999, backgroundImage: `url(${n.ava})`, backgroundSize: "cover", flexShrink: 0 }}></div>
                            ) : (
                              <div style={{ width: 28, height: 28, borderRadius: 999, background: "var(--blue-100)", display: "grid", placeItems: "center", color: "var(--blue-600)", flexShrink: 0 }}>
                                <Icon name="mail" size={13} />
                              </div>
                            )}
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500 }}>{n ? n.name : id}</div>
                              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{n ? n.role : "Email invite"}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Materials</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: note ? 16 : 0 }}>
                    {SHARE_MATERIALS.filter(m => !m.disabled && selectedMaterials.has(m.id)).map(m => (
                      <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "var(--blue-50)", border: "1px solid var(--blue-200)", borderRadius: 999, fontSize: 12, fontWeight: 500, color: "var(--blue-700)" }}>
                        <Icon name={m.icon} size={12} />
                        {m.label}
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 16, marginBottom: 8 }}>Personal Note</div>
                  <div style={{ fontSize: 13, padding: "10px 12px", background: "var(--canvas)", borderRadius: 8, border: "1px solid var(--border)", color: note ? "var(--ink)" : "var(--muted)", fontStyle: note ? "normal" : "italic" }}>
                    {note || "No note added"}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="modal-f">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          {step > 1 && <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>}
          {(kind === "assets" ? step < 2 : step < 3)
            ? <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue</button>
            : <button className="btn btn-primary" onClick={onClose}><Icon name="share" size={13} /> Send</button>
          }
        </div>
      </div>
    </div>
  );
};

const NewCompanyMarketing = ({ go }) => {
  const [campaignType, setCampaignType] = React.useState("Brand campaign");
  const types = ["Brand campaign", "Event", "Recruiting", "Social", "Email", "Print"];
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("company")}><Icon name="chevL" size={14} /> Back to Company Marketing</button>
      </div>
      <div className="page-h" style={{ marginBottom: 20 }}>
        <div><h1>Create Company Marketing Package</h1><div className="sub">Build a brokerage-wide marketing campaign for your agents.</div></div>
      </div>
      <div className="new-page">
        <div className="form-section">
          <h3>Package Details</h3>
          <div className="field"><label>Title</label><input placeholder="e.g. Spring 2026 Brand Refresh" /></div>
          <div className="field"><label>Description</label><textarea rows={3} placeholder="Describe the campaign purpose and audience…"></textarea></div>
          <div className="field"><label>Campaign Type</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              {types.map(t => (
                <button key={t} className={`ld-chip ${campaignType === t ? "active" : ""}`} onClick={() => setCampaignType(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Availability</h3>
          <div className="field"><label>Who can see this package?</label>
            <select>
              <option>All agents in brokerage</option>
              <option>Selected agents only</option>
              <option>Admins only (draft)</option>
            </select>
          </div>
          <div className="field"><label>Active dates (optional)</label>
            <div style={{ display: "flex", gap: 10 }}>
              <input type="date" style={{ flex: 1 }} />
              <span style={{ lineHeight: "36px", color: "var(--muted)" }}>–</span>
              <input type="date" style={{ flex: 1 }} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Cover Image</h3>
          <div className="photo-drop">
            <div className="ic">🖼</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Upload a cover image</div>
            <div style={{ fontSize: 12 }}>Recommended: 1600×900px, JPG or PNG</div>
          </div>
        </div>

        <div className="new-page-actions">
          <button className="btn btn-secondary" onClick={() => go("company")}>Cancel</button>
          <button className="btn btn-primary" onClick={() => go("company")}><Icon name="check" size={14} /> Create Package</button>
        </div>
      </div>
    </>
  );
};

const NetworkShareModal = ({ member, onClose }) => {
  const firstName = member.name.split(" ")[0];
  const [kind, setKind] = React.useState(null); // null = choose, "listings", "spotlights"
  const [step, setStep] = React.useState(1);    // 1=pick items, 2=note, 3=confirm
  const [selectedIds, setSelectedIds] = React.useState(new Set());

  const myListings = RC_DATA.listings.filter(l => l.owner === "me");
  const mySpotlights = RC_DATA.spotlights.filter(s => s.owner === "me" && s.status !== "draft");

  const toggleId = id => setSelectedIds(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const reset = () => { setKind(null); setStep(1); setSelectedIds(new Set()); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Share with {firstName}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">

          {/* Step 0: choose kind */}
          {!kind && (
            <>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>What would you like to share with {member.name}?</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button onClick={() => setKind("listings")} style={{ padding: "20px 16px", border: "1.5px solid var(--border)", borderRadius: 12, background: "var(--surface)", cursor: "pointer", textAlign: "left", transition: "border-color .15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--blue-500)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--canvas)", border: "1px solid var(--border)", display: "grid", placeItems: "center", marginBottom: 10 }}>
                    <Icon name="location" size={18} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Share Listings</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>Choose one or more listings to share from your portfolio.</div>
                </button>
                <button onClick={() => setKind("spotlights")} style={{ padding: "20px 16px", border: "1.5px solid var(--border)", borderRadius: 12, background: "var(--surface)", cursor: "pointer", textAlign: "left", transition: "border-color .15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--blue-500)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--canvas)", border: "1px solid var(--border)", display: "grid", placeItems: "center", marginBottom: 10 }}>
                    <Icon name="spotlight" size={18} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Share Spotlights</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>Share curated listing collections and marketing spotlights.</div>
                </button>
              </div>
            </>
          )}

          {/* Step 1: pick items */}
          {kind && step === 1 && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <span className="pill pill-green" style={{ fontSize: 11 }}>1 · Select {kind === "listings" ? "Listings" : "Spotlights"}</span>
                <span className="pill" style={{ fontSize: 11 }}>2 · Note</span>
                <span className="pill" style={{ fontSize: 11 }}>3 · Send</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
                Select {kind === "listings" ? "listings" : "spotlights"} to share with {firstName}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 320, overflowY: "auto" }}>
                {(kind === "listings" ? myListings : mySpotlights).map(item => {
                  const sel = selectedIds.has(item.id);
                  return (
                    <label key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", border: `1.5px solid ${sel ? "var(--blue-500)" : "var(--border)"}`, borderRadius: 10, cursor: "pointer", background: sel ? "#EFF6FF" : "var(--surface)" }}>
                      <input type="checkbox" checked={sel} onChange={() => toggleId(item.id)} style={{ accentColor: "var(--blue-500)" }} />
                      <div style={{ width: 52, height: 36, borderRadius: 6, backgroundImage: `url(${item.img || item.cover})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }}></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.address || item.title}</div>
                        <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 1 }}>{kind === "listings" ? `${item.city} · ${item.status}` : `${item.count} listings · ${item.views?.toLocaleString()} views`}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </>
          )}

          {/* Step 2: personal note */}
          {kind && step === 2 && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <span className="pill pill-green" style={{ fontSize: 11 }}>1 · Selected</span>
                <span className="pill pill-green" style={{ fontSize: 11 }}>2 · Note</span>
                <span className="pill" style={{ fontSize: 11 }}>3 · Send</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                Sharing {selectedIds.size} {kind === "listings" ? "listing" : "spotlight"}{selectedIds.size !== 1 ? "s" : ""} with {firstName}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                {(kind === "listings" ? myListings : mySpotlights).filter(i => selectedIds.has(i.id)).map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", background: "var(--canvas)", borderRadius: 8, border: "1px solid var(--border)" }}>
                    <div style={{ width: 40, height: 28, borderRadius: 4, backgroundImage: `url(${item.img || item.cover})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }}></div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{item.address || item.title}</span>
                  </div>
                ))}
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Personal note <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></label>
                <textarea rows={3} placeholder={`Hey ${firstName}, sharing these with you for our co-marketing…`} style={{ resize: "vertical" }} />
              </div>
            </>
          )}

          {/* Step 3: confirm */}
          {kind && step === 3 && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--green-50)", color: "var(--green-600)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
                <Icon name="check" size={28} stroke={2.5} />
              </div>
              <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>Ready to send!</h3>
              <p className="muted">{selectedIds.size} {kind === "listings" ? "listing" : "spotlight"}{selectedIds.size !== 1 ? "s" : ""} · {firstName}</p>
            </div>
          )}

        </div>
        <div className="modal-footer">
          {!kind
            ? <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            : <>
                <button className="btn btn-secondary" onClick={() => { if (step === 1) reset(); else setStep(s => s - 1); }}>
                  {step === 1 ? "Back" : "Back"}
                </button>
                {step < 3
                  ? <button className="btn btn-blue" disabled={step === 1 && selectedIds.size === 0} onClick={() => setStep(s => s + 1)}>
                      Continue
                    </button>
                  : <button className="btn btn-blue" onClick={onClose}><Icon name="share" size={13} /> Send</button>
                }
              </>
          }
        </div>
      </div>
    </div>
  );
};

const NetworkMemberDetail = ({ id, go }) => {
  const member = RC_DATA.network.find(n => n.id === id) || RC_DATA.network[0];
  const firstName = member.name.split(" ")[0];

  const [tab, setTab] = React.useState("listings");
  const [listingDir, setListingDir] = React.useState("from-them");
  const [spotlightDir, setSpotlightDir] = React.useState("from-them");
  const [showShareModal, setShowShareModal] = React.useState(false);

  // Listings
  const theirListings = RC_DATA.listings.filter(l => l.owner === "network" && l.sharedBy === member.name);
  const myListings = RC_DATA.listings.filter(l => l.owner === "me");

  // Spotlights — drafts are private so excluded from shared views
  const theirSpotlights = RC_DATA.spotlights.filter(s => s.sharedBy === member.name && s.status !== "draft");
  const mySpotlights = RC_DATA.spotlights.filter(s => s.owner === "me" && s.status !== "draft");

  const activeListings = listingDir === "from-them" ? theirListings : myListings;
  const activeSpotlights = spotlightDir === "from-them" ? theirSpotlights : mySpotlights;

  const ListingRows = ({ items, emptyText }) => (
    <div className="card" style={{ padding: 0 }}>
      {items.length > 0 ? items.map(l => (
        <div key={l.id} className="listing-row" style={{ gridTemplateColumns: "140px 2fr 1fr auto" }}>
          <div className="thumb" style={{ backgroundImage: `url(${l.img})` }}></div>
          <div className="listing-meta">
            <div className="status"><span className="dot"></span>{l.status}</div>
            <h3>{l.address}</h3>
            <div className="sub"><span><Icon name="location" size={11} /> {l.city}</span></div>
          </div>
          <div><div className="price">{fmtPrice(l.price)}</div><div className="price-sub">{l.beds} bd · {l.baths} ba</div></div>
          <button className="btn btn-secondary btn-sm">View</button>
        </div>
      )) : (
        <div style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}>{emptyText}</div>
      )}
    </div>
  );

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("network")}><Icon name="chevL" size={14} /> Back to Network</button>
      </div>

      <div className="nm-above-hero">
        <div className="nm-actions">
          <button className="btn btn-secondary btn-sm"><Icon name="mail" size={13} /> Contact</button>
          <button className="btn btn-blue btn-sm" onClick={() => setShowShareModal(true)}><Icon name="share" size={13} /> Share with {firstName}</button>
        </div>
      </div>
      <div className="nm-hero">
        <div className="nm-body">
          <div className="nm-ava-wrap">
            <div className="nm-ava" style={{ backgroundImage: `url(${member.ava})` }}></div>
            <div className="nm-connected"><Icon name="check" size={10} stroke={2.5} /> Connected {member.since}</div>
          </div>
          <div className="nm-info">
            <div className="nm-name">{member.name}</div>
            <div className="nm-role">{member.role.split(" · ")[0]}</div>
            <div className="nm-brokerage"><Icon name="company" size={12} /> {member.role.split(" · ")[1]}</div>
          </div>
          <div className="nm-details">
            <div className="nm-detail-item"><Icon name="mail" size={13} /><a href={`mailto:${member.email}`}>{member.email}</a></div>
            <div className="nm-detail-item"><Icon name="location" size={13} /><span>{member.location}</span></div>
            <div className="nm-detail-item"><Icon name="site" size={13} /><a href="#">{member.website}</a></div>
            <div className="nm-detail-item"><Icon name="card" size={13} /><span>License {member.license}</span></div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "listings" ? "active" : ""}`} onClick={() => setTab("listings")}>
          Listings <span className="count">{theirListings.length + myListings.length}</span>
        </button>
        <button className={`tab ${tab === "spotlights" ? "active" : ""}`} onClick={() => setTab("spotlights")}>
          Spotlights <span className="count">{theirSpotlights.length + mySpotlights.length}</span>
        </button>
        <button className={`tab ${tab === "activity" ? "active" : ""}`} onClick={() => setTab("activity")}>Activity</button>
      </div>

      {tab === "listings" && (
        <>
          <div className="nm-chips">
            <button className={`ld-chip ${listingDir === "from-them" ? "active" : ""}`} onClick={() => setListingDir("from-them")}>
              From {firstName} <span className="chip-count">{theirListings.length}</span>
            </button>
            <button className={`ld-chip ${listingDir === "from-me" ? "active" : ""}`} onClick={() => setListingDir("from-me")}>
              Shared with {firstName} <span className="chip-count">{myListings.length}</span>
            </button>
          </div>
          <ListingRows
            items={activeListings}
            emptyText={listingDir === "from-them" ? `${firstName} hasn't shared any listings with you yet` : `You haven't shared any listings with ${firstName} yet`}
          />
        </>
      )}

      {tab === "spotlights" && (
        <>
          <div className="nm-chips">
            <button className={`ld-chip ${spotlightDir === "from-them" ? "active" : ""}`} onClick={() => setSpotlightDir("from-them")}>
              From {firstName} <span className="chip-count">{theirSpotlights.length}</span>
            </button>
            <button className={`ld-chip ${spotlightDir === "from-me" ? "active" : ""}`} onClick={() => setSpotlightDir("from-me")}>
              Shared with {firstName} <span className="chip-count">{mySpotlights.length}</span>
            </button>
          </div>
          <div className="card" style={{ padding: 0 }}>
            {activeSpotlights.map(s => (
              <div key={s.id} className="show-row">
                <div className="show-row-thumb" style={{ backgroundImage: `url(${s.cover})` }}>
                  <div className="show-row-thumbs">
                    {s.thumbs.slice(0, 3).map((t, i) => <i key={i} style={{ backgroundImage: `url(${t})` }}></i>)}
                  </div>
                </div>
                <div className="show-row-meta">
                  <div className="show-row-top">
                    <span className="show-row-count">{s.count} listings</span>
                    {s.status === "draft"
                      ? <span className="pill" style={{ background: "var(--amber-50)", color: "#b45309", border: "1px solid #fcd34d", fontSize: 11 }}>Draft</span>
                      : <span className="pill pill-green" style={{ fontSize: 11 }}>Published</span>
                    }
                    {s.sharedBy && <span className="pill pill-blue" style={{ fontSize: 11 }}>Shared by {s.sharedBy}</span>}
                  </div>
                  <h3 className="show-row-title">{s.title}</h3>
                  <p className="show-row-desc">{s.description}</p>
                  <div className="show-row-stats">
                    <span><Icon name="eye" size={12} /> {s.views.toLocaleString()} views</span>
                    <span><Icon name="star" size={12} /> {s.leads} leads</span>
                  </div>
                </div>
                <div className="show-row-dates">
                  <div><span className="show-row-date-label">Created</span><span className="show-row-date-val">{s.created}</span></div>
                  <div><span className="show-row-date-label">Last updated</span><span className="show-row-date-val">{s.updated}</span></div>
                </div>
                <button className="btn btn-secondary show-row-btn">
                  View Spotlight <Icon name="arrowR" size={13} />
                </button>
              </div>
            ))}
            {activeSpotlights.length === 0 && (
              <div style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}>
                {spotlightDir === "from-them" ? `${firstName} hasn't shared any spotlights with you yet` : `You haven't shared any spotlights with ${firstName} yet`}
              </div>
            )}
          </div>
        </>
      )}

      {showShareModal && <NetworkShareModal member={member} onClose={() => setShowShareModal(false)} />}

      {tab === "activity" && (
        <div className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "share", text: `${member.name} shared a listing with you`, meta: "2 days ago" },
            { icon: "eye", text: `${member.name} viewed your spotlight`, meta: "4 days ago" },
            { icon: "mail", text: `You messaged ${member.name}`, meta: "1 week ago" },
            { icon: "share", text: `You shared 3 listings with ${member.name}`, meta: "2 weeks ago" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--canvas)", border: "1px solid var(--border)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name={a.icon} size={14} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{a.text}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{a.meta}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const NewTemplate = ({ go }) => {
  const [source, setSource] = React.useState("canva");
  const [purpose, setPurpose] = React.useState("");
  const [tplType, setTplType] = React.useState("");
  const [size, setSize] = React.useState("");

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("canva")}><Icon name="chevL" size={14} /> Back to Canva</button>
      </div>
      <div className="page-h" style={{ marginBottom: 20 }}>
        <div><h1>Add Template</h1><div className="sub">Add a new Canva template to your library for use across listings and spotlights.</div></div>
      </div>

      <div className="new-page">
        <div className="form-section">
          <h3>Template Info</h3>
          <div className="field"><label>Template Name</label><input placeholder="e.g. Just Listed — Square Post" /></div>
          <div className="field-row">
            <div className="field">
              <label>Purpose</label>
              <select value={purpose} onChange={e => setPurpose(e.target.value)}>
                <option value="">Select purpose</option>
                <option>Open House</option><option>Just Listed</option><option>Price Reduced</option>
                <option>Recruiting</option><option>Brand</option><option>Social</option>
              </select>
            </div>
            <div className="field">
              <label>Type</label>
              <select value={tplType} onChange={e => setTplType(e.target.value)}>
                <option value="">Select type</option>
                <option>Post</option><option>Story</option><option>Flyer</option><option>Email</option><option>Video</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>Size / Format</label>
            <select value={size} onChange={e => setSize(e.target.value)}>
              <option value="">Select size</option>
              <option>Square (1:1) — 1080×1080</option>
              <option>Landscape (16:9) — 1920×1080</option>
              <option>Story (9:16) — 1080×1920</option>
              <option>Letter — 8.5×11"</option>
              <option>A4 — 210×297mm</option>
            </select>
          </div>
          <div className="field">
            <label>Available To</label>
            <select>
              <option>All agents in brokerage</option>
              <option>Just me (My Templates)</option>
              <option>Selected agents</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Template Source</h3>
          <div className="field">
            <label>Canva Template URL</label>
            <input placeholder="https://www.canva.com/design/…" />
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Paste the share link from your Canva design.</div>
          </div>
        </div>

        <div className="form-section">
          <h3>Preview Image</h3>
          <div className="photo-drop">
            <div className="ic"><Icon name="image" size={32} /></div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Upload a thumbnail preview</div>
            <div style={{ fontSize: 12 }}>Square image recommended — JPG or PNG, min 400×400</div>
          </div>
        </div>

        <div className="new-page-actions">
          <button className="btn btn-secondary" onClick={() => go("canva")}>Cancel</button>
          <button className="btn btn-primary" onClick={() => go("canva")}><Icon name="check" size={14} /> Save Template</button>
        </div>
      </div>
    </>
  );
};

const PORTFOLIO_SITES = [
  { id: "PS1", name: "Mike Anderson — RSIR", url: "mike.rsir.homes", status: "live", views: 2841, leads: 14, updated: "2 days ago", cover: RC_DATA.PROP_IMGS[0] },
  { id: "PS2", name: "Team Pacific Northwest", url: "teampnw.rsir.homes", status: "live", views: 1204, leads: 7, updated: "1 week ago", cover: RC_DATA.PROP_IMGS[3] },
  { id: "PS3", name: "Luxury Collection — Eastside", url: "luxury-eastside.rsir.homes", status: "draft", views: 0, leads: 0, updated: "3 days ago", cover: RC_DATA.PROP_IMGS[5] },
];

const PortfolioSites = ({ go }) => {
  return (
    <>
      <div className="page-h">
        <div>
          <h1>Portfolio Sites</h1>
          <div className="sub">Your agent portfolio websites — powered by AI to spotlight your listings, bio, and brand.</div>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={14} /> Create Portfolio Site</button>
      </div>

      <div className="toolbar">
        <span className="muted" style={{ fontSize: 12.5 }}>
          <span className="bold" style={{ color: "var(--ink)" }}>{PORTFOLIO_SITES.length} sites</span>
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button className="chip"><Icon name="filter" size={13} /><span className="chip-label"> Filter <Icon name="chevD" size={11} /></span></button>
          <button className="chip"><Icon name="sortUD" size={13} /><span className="chip-label"> Sort: Recent <Icon name="chevD" size={11} /></span></button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {PORTFOLIO_SITES.map(site => (
          <div key={site.id} className="show-row" style={{ cursor: "pointer" }}>
            <div className="show-row-thumb" style={{ backgroundImage: `url(${site.cover})` }}></div>
            <div className="show-row-meta">
              <div className="show-row-top">
                {site.status === "live"
                  ? <span className="pill pill-green" style={{ fontSize: 11 }}>Live</span>
                  : <span className="pill" style={{ fontSize: 11, background: "var(--amber-50)", color: "#b45309", border: "1px solid #fcd34d" }}>Draft</span>
                }
              </div>
              <h3 className="show-row-title">{site.name}</h3>
              <a href="#" style={{ fontSize: 12, color: "var(--blue-500)", fontWeight: 500 }}>{site.url}</a>
              <div className="show-row-stats" style={{ marginTop: 6 }}>
                <span><Icon name="eye" size={12} /> {site.views.toLocaleString()} views</span>
                <span><Icon name="star" size={12} /> {site.leads} leads</span>
              </div>
            </div>
            <div className="show-row-dates">
              <div><span className="show-row-date-label">Last updated</span><span className="show-row-date-val">{site.updated}</span></div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="btn btn-secondary btn-sm"><Icon name="eye" size={13} /> Preview</button>
              <button className="btn btn-secondary btn-sm"><Icon name="edit" size={13} /> Edit</button>
              <button className="btn btn-primary btn-sm"><Icon name="share" size={13} /> Share</button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 20, padding: 28, textAlign: "center", border: "2px dashed var(--border)" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--canvas)", border: "1px solid var(--border)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
          <Icon name="sparkle" size={22} />
        </div>
        <h3 style={{ margin: "0 0 6px", fontSize: 16 }}>AI-Powered Agent Site</h3>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)", maxWidth: 420, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
          Let our AI agent build a personalized portfolio site for you — pulling in your listings, bio, stats, and brand automatically.
        </p>
        <button className="btn btn-primary"><Icon name="sparkle" size={14} /> Generate My Agent Site</button>
      </div>
    </>
  );
};

Object.assign(window, { CompanyMarketing, CompanyDetail, Network, InviteModal, Canva, CanvaFilterModal, ShareModal, NewCompanyMarketing, NetworkMemberDetail, NewTemplate, PortfolioSites });
