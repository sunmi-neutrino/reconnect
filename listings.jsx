/* global React, RC_DATA, Icon, fmtPrice */

const LISTINGS_PAGE_SIZE = 5;

const Listings = ({ go, selected, setSelected, onShare }) => {
  const [tab, setTab] = React.useState("mine");
  const [view, setView] = React.useState("list");
  const [noSelectionAlert, setNoSelectionAlert] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchRef = React.useRef(null);
  const [page, setPage] = React.useState(1);

  const baseList = RC_DATA.listings.filter(l => tab === "mine" ? l.owner === "me" : l.owner === "network");
  const q = search.trim().toLowerCase();
  const filteredList = q
    ? baseList.filter(l =>
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.mls.toLowerCase().includes(q)
      )
    : baseList;
  const list = filteredList.slice((page - 1) * LISTINGS_PAGE_SIZE, page * LISTINGS_PAGE_SIZE);

  // Reset page when tab or search changes
  React.useEffect(() => { setPage(1); }, [tab, search]);
  // Clear selection + search when tab changes
  React.useEffect(() => { setSelected([]); setSearch(""); setSearchOpen(false); }, [tab]);
  // Auto-focus search input when opened
  React.useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);

  const allChecked = list.length > 0 && list.every(l => selected.includes(l.id));
  const toggleAll = () => {
    if (allChecked) setSelected(selected.filter(id => !list.find(l => l.id === id)));
    else setSelected([...new Set([...selected, ...list.map(l => l.id)])]);
  };
  const toggle = (id) => {
    setSelected(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  };

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Listings</h1>
          <div className="sub">Manage your single-listing marketing — websites, flyers, QR codes, social posts, and assets.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => go("mls-info")}><Icon name="link" size={14} /> Connect MLS</button>
          <button className="btn btn-primary" onClick={() => go("new-listing")}><Icon name="plus" size={14} /> Add Listing</button>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>
          My Listings <span className="count">{RC_DATA.listings.filter(l => l.owner === "me").length}</span>
        </button>
        <button className={`tab ${tab === "network" ? "active" : ""}`} onClick={() => setTab("network")}>
          My Network's Listings <span className="count">{RC_DATA.listings.filter(l => l.owner === "network").length}</span>
        </button>
      </div>

      <div className={`toolbar${searchOpen ? " search-open" : ""}`}>
        <button className="chip" onClick={toggleAll}>
          <span className={`check check-select-all ${allChecked ? "on" : ""}`} style={{ width: 16, height: 16 }}>
            <Icon name="check" size={11} stroke={3} />
          </span>
          Select all
        </button>
        <div className="divider-v" />
        <span style={{ fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap" }}>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>{filteredList.length}</span> listings
        </span>
        <div className={`toolbar-right${searchOpen ? " search-active" : ""}`} style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button className="chip toolbar-search-btn" onClick={() => setSearchOpen(true)}>
            <Icon name="search" size={13} />
          </button>
          <div className="toolbar-search">
            <span className="ts-ic"><Icon name="search" size={13} /></span>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search by address, city, MLS…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="chip toolbar-search-close" onClick={() => { setSearch(""); setSearchOpen(false); }}>
            <Icon name="x" size={13} />
          </button>
          <button className="chip toolbar-filter"><Icon name="filter" size={13} /><span className="chip-label"> Filter <Icon name="chevD" size={11} /></span></button>
          <button className="chip toolbar-sort"><Icon name="sortUD" size={13} /><span className="chip-label"> Sort: Newest <Icon name="chevD" size={11} /></span></button>
        </div>
      </div>

      <div className="share-bar show">
        {selected.length > 0 && <span><span className="bold">{selected.length}</span> selected</span>}
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-primary btn-sm" style={{ background: "#10B981" }}
            onClick={() => selected.length > 0 ? onShare("listings") : setNoSelectionAlert("share")}>
            <Icon name="share" size={13} /><span>Share<span className="share-net-sfx"> with network</span></span>
          </button>
          <button className="btn btn-sm" style={{ background: "#2563EB", color: "#fff" }}
            onClick={() => selected.length > 0 ? null : setNoSelectionAlert("spotlight")}>
            <Icon name="spotlight" size={13} /> Create spotlight
          </button>
        </div>
        {selected.length > 0 && <button className="x" style={{ marginLeft: "auto" }} onClick={() => setSelected([])}><Icon name="x" size={16} /></button>}
      </div>

      {noSelectionAlert && (
        <div className="modal-back" onClick={() => setNoSelectionAlert(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-h">
              <h2>{noSelectionAlert === "share" ? "Share with Network" : "Create Spotlight"}</h2>
              <button className="icon-btn" onClick={() => setNoSelectionAlert(null)}><Icon name="x" /></button>
            </div>
            <div className="modal-b">
              <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                Please select one or more listings first to {noSelectionAlert === "share" ? "share with your network" : "create a spotlight"}.
              </p>
            </div>
            <div className="modal-f">
              <button className="btn btn-primary" onClick={() => setNoSelectionAlert(null)}>Got it</button>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: 0 }}>
        {list.map(l => (
          <div key={l.id} className={`listing-row ${selected.includes(l.id) ? "selected" : ""}`}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className={`check ${selected.includes(l.id) ? "on" : ""}`} onClick={(e) => { e.stopPropagation(); toggle(l.id); }}>
                {selected.includes(l.id) && <Icon name="check" size={12} stroke={3} />}
              </button>
              <div className="thumb" style={{ backgroundImage: `url(${l.img})` }} onClick={() => go("listing/" + l.id)}></div>
            </div>
            <div className="listing-meta" onClick={() => go("listing/" + l.id)} style={{ cursor: "pointer" }}>
              <div className="status">
                <span className={`dot ${l.status === "Pending" ? "pending" : ""}`}></span>
                <span style={{ color: l.status === "Pending" ? "var(--amber-500)" : "var(--green-600)" }}>{l.status}</span>
                {l.owner === "network" && <span className="pill pill-blue" style={{ textTransform: "none", letterSpacing: 0, whiteSpace: "nowrap" }}>Shared by {l.sharedBy}</span>}
              </div>
              <h3>{l.address}</h3>
              <div className="sub">
                <span><Icon name="location" size={11} /> {l.city}</span>
                <span>MLS #{l.mls}</span>
              </div>
              <a className="url" href="#">{l.mls}.rsir.homes</a>
            </div>
            <div>
              <div className="price">{fmtPrice(l.price)}</div>
              <div className="price-sub">{l.type}</div>
              <div className="price-sub">{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{l.role}</div>
            </div>
            <div>
              <div style={{ fontSize: 12.5 }}>Listed {l.added}</div>
              <div className="price-sub">Updated {l.updated}</div>
              <div style={{ marginTop: 6 }}>
                <span className={`toggle ${l.online ? "" : "off"}`}>
                  <span className="sw"></span>
                  {l.online ? "Website Online" : "Website Offline"}
                </span>
              </div>
            </div>
            <div className="hd-photos">
              {(() => {
                const n = parseInt(l.mls || 0);
                const hasVideos = n % 3 !== 2;
                const hasSocial = n % 4 !== 3;
                const videoCount = (n % 3) + 1;
                const socialCount = ((n % 5) + 2) * 3;
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div><Icon name="image" size={14} /> {l.photos} Photos</div>
                    {hasVideos && <div><Icon name="video" size={14} /> {videoCount} Videos</div>}
                    {hasSocial && <div><Icon name="ig" size={14} /> {socialCount} Social Posts</div>}
                  </div>
                );
              })()}
            </div>
            <div className="row-actions">
              {l.owner === "me" ? (
                <>
                  <button className="btn btn-secondary btn-sm" onClick={() => go("edit-listing/" + l.id)}>
                    <Icon name="edit" size={13} /> Edit
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => go("amp-listing/" + l.id)}>
                    <Icon name="zap" size={13} /> AMP
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => onShare("listing")}>
                    <Icon name="share" size={13} /> Share
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    <Icon name="stats" size={13} /> Stats
                  </button>
                </>
              ) : (
                <button className="btn btn-secondary btn-sm" onClick={() => go("listing/" + l.id)}>
                  <Icon name="eye" size={13} /> View Listing
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} total={filteredList.length} perPage={LISTINGS_PAGE_SIZE} />

    </>
  );
};

// Social post design preview
const SocialDesign = ({ n, l }) => {
  const city = l.city.split(",")[0];
  const specs = `${l.beds} BED · ${l.baths} BATH · ${l.sqft.toLocaleString()} SQFT`;
  if (n === 1) return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <img src={l.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)" }} />
      <div style={{ position: "absolute", inset: "10px", border: "1.5px solid rgba(255,255,255,0.65)", borderRadius: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "#1e3a5f", padding: "5px 12px", textAlign: "center", fontSize: 8.5, fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>{city.toUpperCase()}</div>
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>Introducing</div>
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>{city}</div>
        <div style={{ fontSize: 7.5, marginTop: 3, color: "rgba(255,255,255,0.85)", letterSpacing: "0.04em" }}>{l.address.toUpperCase()}</div>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.7)" }}>{specs}</div>
      </div>
    </div>
  );
  if (n === 2) return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column" }}>
      <img src={l.img} alt="" style={{ width: "100%", flex: 1, objectFit: "cover" }} />
      <div style={{ padding: "7px 10px 8px" }}>
        <div style={{ fontSize: 8.5, color: "#8B9BAF", fontStyle: "italic" }}>Introducing</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}>{city}</div>
        <div style={{ fontSize: 7, color: "#64748b", marginTop: 2, letterSpacing: "0.03em" }}>{l.address.toUpperCase()}</div>
        <div style={{ fontSize: 7, color: "#94a3b8" }}>{specs}</div>
      </div>
    </div>
  );
  if (n === 3) return (
    <div style={{ width: "100%", height: "100%", background: "#0F2744", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 12px 8px", color: "#fff", flexShrink: 0 }}>
        <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>Introducing</div>
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>{city}</div>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.6)", marginTop: 2, letterSpacing: "0.03em" }}>{l.address.toUpperCase()}</div>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.5)" }}>{specs}</div>
      </div>
      <img src={l.img} alt="" style={{ width: "100%", flex: 1, objectFit: "cover" }} />
    </div>
  );
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "7px 10px 5px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#1e293b" }}>{fmtPrice(l.price)}</div>
        <div style={{ fontSize: 7, color: "#64748b", letterSpacing: "0.03em" }}>{l.address.toUpperCase()}</div>
        <div style={{ fontSize: 7, color: "#94a3b8" }}>{specs}</div>
      </div>
      <img src={l.img} alt="" style={{ width: "100%", flex: 1, objectFit: "cover" }} />
      <div style={{ padding: "5px 10px 7px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ fontSize: 8, fontStyle: "italic", color: "#8B9BAF" }}>Introducing</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}>{city}</div>
      </div>
    </div>
  );
};

// Edit Post Page
const EditPostPage = ({ section, n, l, onBack }) => {
  const [editTab, setEditTab] = React.useState("preview");
  const [mobileView, setMobileView] = React.useState(true);
  const [postOpen, setPostOpen] = React.useState(true);
  const [captionOpen, setCaptionOpen] = React.useState(true);
  const [selectedThumb, setSelectedThumb] = React.useState(1);
  const [title, setTitle] = React.useState("Introducing");
  const [badge, setBadge] = React.useState(l.city.split(",")[0]);
  const [line1, setLine1] = React.useState(l.address.split(",")[0]);
  const [line2, setLine2] = React.useState(`${l.beds} BED · ${l.baths} BATH · ${l.sqft.toLocaleString()} SQFT`);
  const [caption, setCaption] = React.useState("Step into a home defined by volume, light and a sense of arrival. From the moment you enter, soaring ceilings extend through...");
  const sectionLabel = section.ratio === "1 / 1" ? "1:1 Square" : section.ratio === "16 / 9" ? "16:9 Rectangle" : "9:16 Story";

  return (
    <>
      {/* Top bar */}
      <div className="ep-topbar">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="chevL" size={14} /> Back
        </button>
        <h2>Edit {sectionLabel} Post</h2>
        <div className="ep-topbar-right">
          <button className="btn btn-ghost btn-sm" style={{ padding: "6px 8px" }}><Icon name="search" size={16} /></button>
          <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", cursor: "pointer" }}>
            <img src="https://i.pravatar.cc/64?img=12" alt="" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>

      {/* Address bar */}
      <div className="ep-address-bar">
        <img src={l.img} alt="" />
        <span>{l.address}</span>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 0 }}>
        <button className={`tab ${editTab === "preview" ? "active" : ""}`} onClick={() => setEditTab("preview")}>Live Preview</button>
        <button className={`tab ${editTab === "edit" ? "active" : ""}`} onClick={() => setEditTab("edit")}>Edit Post</button>
      </div>

      {/* ── Live Preview ── */}
      {editTab === "preview" && (
        <>
          <div className="ep-preview-toolbar">
            <div className="ep-view-toggle">
              <button className={`ep-view-btn ${!mobileView ? "active" : ""}`} onClick={() => setMobileView(false)}>
                <Icon name="desktop" size={16} /> Desktop View
              </button>
              <button className={`ep-view-btn ${mobileView ? "active" : ""}`} onClick={() => setMobileView(true)}>
                <Icon name="mobile" size={16} /> Mobile View
              </button>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-secondary btn-sm"><Icon name="download" size={12} /> Download Image</button>
              <button className="btn btn-secondary btn-sm"><Icon name="download" size={12} /> Download Text</button>
            </div>
          </div>
          <div className="ep-preview-area">
            {/* ── Desktop view ── */}
            {!mobileView && (
              <div className="ep-desktop">
                {/* Browser chrome */}
                <div className="ep-desktop-chrome">
                  <div className="ep-desktop-dots">
                    <span style={{ background: "#FF5F57" }} />
                    <span style={{ background: "#FEBC2E" }} />
                    <span style={{ background: "#28C840" }} />
                  </div>
                  <div className="ep-desktop-bar">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/></svg>
                    <span>instagram.com</span>
                  </div>
                  <div style={{ width: 52 }} />
                </div>
                {/* Browser body — IG-style desktop feed */}
                <div className="ep-desktop-body">
                  {/* IG top nav */}
                  <div className="ep-desktop-nav">
                    <span className="ep-desktop-nav-logo" style={{ fontFamily: "serif", fontStyle: "italic", fontSize: 20 }}>Instagram</span>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      {[
                        <svg key="h" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2V11z"/></svg>,
                        <svg key="s" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>,
                        <svg key="c" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17" cy="7" r="1.2" fill="#111"/></svg>,
                        <svg key="m" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                      ].map((ic, i) => <div key={i}>{ic}</div>)}
                      <div style={{ width: 26, height: 26, borderRadius: "50%", overflow: "hidden", border: "2px solid #ddd" }}>
                        <img src="https://i.pravatar.cc/52?img=12" alt="" style={{ width: "100%", height: "100%" }} />
                      </div>
                    </div>
                  </div>
                  {/* Feed */}
                  <div className="ep-desktop-feed">
                    {/* Post card */}
                    <div className="ep-desktop-post">
                      <div className="ep-desktop-post-header">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
                            <img src="https://i.pravatar.cc/64?img=12" alt="" style={{ width: "100%", height: "100%" }} />
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>instagram</div>
                            <div style={{ fontSize: 11, color: "#888" }}>Seattle, Washington</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 20, color: "#555", lineHeight: 1 }}>···</span>
                      </div>
                      {/* Post image */}
                      <div className="ep-desktop-post-img" style={{ aspectRatio: section.ratio }}>
                        <SocialDesign n={n} l={l} />
                      </div>
                      {/* Actions */}
                      <div className="ep-desktop-post-actions">
                        <div style={{ display: "flex", gap: 14 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      </div>
                      <div style={{ padding: "2px 14px 10px", fontSize: 13, lineHeight: 1.5 }}>
                        <strong>instagram</strong> {caption.slice(0, 100)}{caption.length > 100 ? "…" : ""}
                      </div>
                    </div>
                    {/* Right sidebar */}
                    <div className="ep-desktop-sidebar">
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", border: "2px solid #ddd" }}>
                          <img src="https://i.pravatar.cc/104?img=12" alt="" style={{ width: "100%", height: "100%" }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>instagram</div>
                          <div style={{ fontSize: 12, color: "#888" }}>Realogics Sotheby's</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: "#00376B", fontWeight: 600, marginBottom: 12 }}>Switch</div>
                      <div style={{ fontSize: 12, color: "#8E8E8E", marginBottom: 6 }}>Suggested for you</div>
                      {[1,2,3,4,5].map(i => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${i*60},60%,75%)` }} />
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>user_{i}_{l.mls?.slice(-3)}</div>
                              <div style={{ fontSize: 11, color: "#8E8E8E" }}>Suggested</div>
                            </div>
                          </div>
                          <span style={{ fontSize: 12, color: "#00376B", fontWeight: 600 }}>Follow</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* ── Mobile view ── */}
            {mobileView && (
            <div className="ep-phone">
              <div className="ep-phone-inner">
                {/* Status bar */}
                <div className="ep-phone-status">
                  <span>9:41</span>
                  <div className="ep-phone-status-icons">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><rect x="0" y="3" width="3" height="8" rx="1" fill="#111"/><rect x="4" y="2" width="3" height="9" rx="1" fill="#111"/><rect x="8" y="0" width="3" height="11" rx="1" fill="#111"/><rect x="12" y="0" width="3" height="11" rx="1" fill="#ddd"/></svg>
                    <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.5C9.8 2.5 11.9 3.4 13.4 4.9L14.8 3.5C12.9 1.7 10.3 0.5 7.5 0.5S2.1 1.7 0.2 3.5L1.6 4.9C3.1 3.4 5.2 2.5 7.5 2.5Z" fill="#111"/><path d="M7.5 5.5C8.9 5.5 10.2 6.1 11.1 7L12.5 5.6C11.2 4.3 9.4 3.5 7.5 3.5S3.8 4.3 2.5 5.6L3.9 7C4.8 6.1 6.1 5.5 7.5 5.5Z" fill="#111"/><circle cx="7.5" cy="9.5" r="1.5" fill="#111"/></svg>
                    <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#111" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#111"/><path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6S23.8 4.8 23 4.5Z" fill="#111" fillOpacity="0.4"/></svg>
                  </div>
                </div>
                {/* IG header */}
                <div className="ep-phone-ig-bar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17" cy="7" r="1.2" fill="#111"/></svg>
                  <span className="ep-phone-ig-title">Instagram</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
                </div>
                {/* Post header */}
                <div className="ep-phone-post-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="ep-phone-avatar">
                      <img src="https://i.pravatar.cc/56?img=12" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 600 }}>instagram</div>
                      <div style={{ fontSize: 9, color: "#888" }}>Seattle, Washington</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 18, color: "#555", lineHeight: 1 }}>···</span>
                </div>
                {/* Post image */}
                <div className="ep-phone-dynamic" style={{ aspectRatio: section.ratio }}>
                  <SocialDesign n={n} l={l} />
                </div>
                {/* Actions */}
                <div className="ep-phone-actions">
                  <div className="ep-phone-actions-left">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </div>
                {/* Caption */}
                <div className="ep-phone-caption">
                  <strong>instagram</strong> {caption}
                </div>
                <div className="ep-phone-input">Add a comment...</div>
              </div>
            </div>
            )}
          </div>
        </>
      )}

      {/* ── Edit Post ── */}
      {editTab === "edit" && (
        <div className="ep-edit-layout">
          {/* Main */}
          <div className="ep-edit-main">
            <div className="ep-price">{fmtPrice(l.price)}</div>

            {/* Your Post Image */}
            <div className="ep-accordion">
              <div className="ep-accordion-header" onClick={() => setPostOpen(o => !o)}>
                Your Post Image
                <Icon name={postOpen ? "chevU" : "chevD"} size={14} />
              </div>
              {postOpen && (
                <div className="ep-accordion-body">
                  <div className="ep-photo-row">
                    <div className="ep-photo-drop">
                      <Icon name="upload" size={18} />
                      <span>Drop Photo Here</span>
                      <button className="btn btn-secondary btn-sm" style={{ marginTop: 4 }}><Icon name="upload" size={11} /> Upload</button>
                    </div>
                    {[1,2,3,4,5].map(i => (
                      <img key={i} src={l.img + `?v=${i}`} alt="" className={`ep-photo-thumb ${selectedThumb === i ? "selected" : ""}`} onClick={() => setSelectedThumb(i)} />
                    ))}
                  </div>
                  {[
                    { label: "Title", val: title, set: setTitle, max: 25 },
                    { label: 'Top "Badge" Text', val: badge, set: setBadge, max: 40 },
                    { label: "Line #1", val: line1, set: setLine1, max: 50 },
                    { label: "Line #2", val: line2, set: setLine2, max: 50 },
                  ].map(f => (
                    <div key={f.label} className="ep-field">
                      <label>{f.label}</label>
                      <input value={f.val} onChange={e => f.set(e.target.value)} maxLength={f.max} />
                      <div className="ep-field-count">{f.val.length}/{f.max} characters used</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Your Post Caption */}
            <div className="ep-accordion">
              <div className="ep-accordion-header" onClick={() => setCaptionOpen(o => !o)}>
                Your Post Caption
                <Icon name={captionOpen ? "chevU" : "chevD"} size={14} />
              </div>
              {captionOpen && (
                <div className="ep-accordion-body">
                  <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 0, marginBottom: 10 }}>Keep your captions under 240 characters to ensure that your entire caption shows up in the post.</p>
                  <div className="ep-field">
                    <textarea rows={4} value={caption} onChange={e => setCaption(e.target.value)} maxLength={240} />
                    <div className="ep-field-count">{caption.length}/240 characters used</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="ep-sidebar">
            <div className="ep-sidebar-label">Your Post Image Preview</div>
            <div className="ep-sidebar-preview" style={{ aspectRatio: section.ratio }}>
              <SocialDesign n={n} l={l} />
            </div>
            <div className="ep-sidebar-actions">
              <button className="btn btn-secondary btn-sm"><Icon name="download" size={12} /> Download Custom Image</button>
              <button className="btn btn-primary btn-sm"><Icon name="check" size={12} /> Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ── Listing Promo Slides (AMP · Portfolio Site · Spotlight Site) ─────────────────

const LISTING_PROMO_SLIDES = [
  {
    gradient: "linear-gradient(150deg, #F0F7FF 0%, #E0EDFF 60%, #D6E6FF 100%)",
    shadow: "0 2px 16px rgba(59,130,246,0.10)",
    accentColor: "#1D4ED8",
    accentBg: "#DBEAFE",
    badgeIcon: "zap",
    badge: "AMP Platform",
    headline: "Supercharge every listing with AMP",
    desc: "Auto-publish social posts, trigger email campaigns, and run targeted ads — all synced to your listing data with zero extra work.",
    cta: "Get AMP",
    ctaRoute: "amp",
  },
  {
    gradient: "linear-gradient(150deg, #F5F2FF 0%, #EBE5FF 60%, #E0D8FF 100%)",
    shadow: "0 2px 16px rgba(109,40,217,0.10)",
    accentColor: "#5B21B6",
    accentBg: "#EDE9FE",
    badgeIcon: "listing",
    badge: "Portfolio Sites",
    headline: "Turn your listings into a Portfolio Site",
    desc: "Your Portfolio Site auto-updates with every new listing — showcasing your expertise and past sales to every visitor.",
    cta: "Get Portfolio Site",
    ctaRoute: "portfolio",
  },
  {
    gradient: "linear-gradient(150deg, #F0FBF5 0%, #E0F5EA 60%, #D4F0E0 100%)",
    shadow: "0 2px 16px rgba(22,163,74,0.10)",
    accentColor: "#15803D",
    accentBg: "#DCFCE7",
    badgeIcon: "spotlight",
    badge: "Spotlight Sites",
    headline: "Bundle listings into a Spotlight Site",
    desc: "Group your listings into a branded microsite that tracks views, captures leads, and shares with one beautiful URL.",
    cta: "Get Spotlight Site",
    ctaRoute: "spotlights",
  },
];

const ListingPromoGraphic = ({ slideIndex }) => {
  const imgs = RC_DATA.PROP_IMGS;
  if (slideIndex === 0) {
    return (
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 28px rgba(0,0,0,0.22)", width: 150, border: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ background: "#EFF6FF", padding: "7px 10px", borderBottom: "1px solid #DBEAFE" }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: "#1D4ED8" }}>AMP Campaign Dashboard</div>
          </div>
          <div style={{ padding: "10px" }}>
            {[
              { label: "Social posts sent", val: "24", color: "#2563EB" },
              { label: "Email opens", val: "89%", color: "#16A34A" },
              { label: "Ad impressions", val: "4.2k", color: "#7C3AED" },
              { label: "Website visits", val: "1,284", color: "#D97706" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, paddingBottom: 6, borderBottom: i < 3 ? "1px solid #F1F5F9" : "none" }}>
                <div style={{ fontSize: 8, color: "#64748B" }}>{r.label}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: r.color }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", top: -10, right: -18, background: "#fff", borderRadius: 8, padding: "5px 10px", boxShadow: "0 4px 14px rgba(0,0,0,0.16)", fontSize: 10, fontWeight: 600, color: "#1D4ED8", display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="zap" size={10} /> Auto-synced
        </div>
      </div>
    );
  }
  if (slideIndex === 1) {
    return (
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 28px rgba(0,0,0,0.18)", width: 188, border: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)", padding: "12px 12px 8px", color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.5)", flexShrink: 0 }}>
                <img src="https://i.pravatar.cc/60?img=12" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 9.5, fontWeight: 700 }}>Jordan Lee</div>
                <div style={{ fontSize: 8, opacity: 0.8 }}>jordanlee.rsir.homes</div>
              </div>
            </div>
          </div>
          <div style={{ padding: "8px 8px 6px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ borderRadius: 5, overflow: "hidden", aspectRatio: "4/3" }}>
                <img src={imgs[i % imgs.length]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <div style={{ padding: "4px 8px 8px", fontSize: 8.5, color: "#64748B", textAlign: "center" }}>
            <strong style={{ color: "#5B21B6" }}>12</strong> active listings · Auto-updated
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 8px 28px rgba(0,0,0,0.18)", width: 200, border: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ background: "#F1F5F9", padding: "5px 8px", display: "flex", alignItems: "center", gap: 5, borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", gap: 3 }}>
            {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />)}
          </div>
          <div style={{ flex: 1, background: "#fff", borderRadius: 999, padding: "2px 6px", fontSize: 8, color: "#94A3B8", textAlign: "center", border: "1px solid #E2E8F0" }}>
            mercerisland.rsir.homes
          </div>
        </div>
        <div style={{ padding: "8px 8px 6px" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#0F172A", marginBottom: 5 }}>Mercer Island Collection</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, marginBottom: 5 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ borderRadius: 4, overflow: "hidden", aspectRatio: "1/1" }}>
                <img src={imgs[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "#64748B" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Icon name="eye" size={9} /> 892 views</span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Icon name="star" size={9} /> 14 leads</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PromoListingSlide = ({ go }) => {
  const [idx, setIdx] = React.useState(0);
  const slide = LISTING_PROMO_SLIDES[idx];
  const touchStartX = React.useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    const n = LISTING_PROMO_SLIDES.length;
    setIdx(i => delta < 0 ? (i + 1) % n : (i - 1 + n) % n);
  };

  return (
    <div
      className="promo-hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: slide.gradient,
        boxShadow: slide.shadow,
        border: "1px solid rgba(0,0,0,0.06)",
        transition: "background 0.6s ease, box-shadow 0.6s ease",
        height: "auto",
      }}
    >
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <pattern id="listing-promo-lines" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45 0 0)">
            <line x1="0" y1="0" x2="0" y2="36" stroke="rgba(0,0,0,0.04)" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#listing-promo-lines)" />
      </svg>

      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: slide.accentBg, color: slide.accentColor, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10, letterSpacing: "0.03em" }}>
          <Icon name={slide.badgeIcon} size={11} /> {slide.badge}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2, margin: "0 0 8px", color: "#0F172A", letterSpacing: "-0.02em" }}>
          {slide.headline}
        </h2>
        {slide.desc && (
          <p className="promo-hero-desc" style={{ fontSize: 12.5, color: "#475569", margin: "0 0 14px", lineHeight: 1.55 }}>
            {slide.desc}
          </p>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn btn-sm" style={{ background: slide.accentColor, color: "#fff", fontWeight: 600, borderRadius: 999, padding: "6px 14px" }} onClick={() => go(slide.ctaRoute)}>
            <Icon name="sparkle" size={13} /> {slide.cta}
          </button>
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 14, alignItems: "center" }}>
          {LISTING_PROMO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 16 : 5,
              height: 5,
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
        <ListingPromoGraphic slideIndex={idx} />
      </div>
    </div>
  );
};

// Listing detail
const ListingDetail = ({ id, go, onShare, defaultTab = "basics", backRoute = "listings", backLabel = "Back to listings", phase1Mode = false, activatedIds = new Set() }) => {
  const l = RC_DATA.listings.find(x => x.id === id) || RC_DATA.listings[0];
  const [tab, setTab] = React.useState(defaultTab);
  const [websiteOnline, setWebsiteOnline] = React.useState(l.online);
  const [brochureType, setBrochureType] = React.useState("Single Page");
  const [qrTarget, setQrTarget] = React.useState("Property Website");
  const [socialPkg, setSocialPkg] = React.useState("All packages");
  const [socialSize, setSocialSize] = React.useState(null);
  const [selectedPhotos, setSelectedPhotos] = React.useState([]);
  const togglePhoto = i => setSelectedPhotos(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const allPhotosSelected = selectedPhotos.length === 12;
  const toggleAllPhotos = () => setSelectedPhotos(allPhotosSelected ? [] : Array.from({length: 12}, (_, i) => i));
  const [selectedVideos, setSelectedVideos] = React.useState([]);
  const toggleVideo = i => setSelectedVideos(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const [showMediaShare, setShowMediaShare] = React.useState(false);
  const [mediaShareItems, setMediaShareItems] = React.useState([]);
  const openMediaShare = (items) => { setMediaShareItems(items); setShowMediaShare(true); };
  const [editDesign, setEditDesign] = React.useState(null);
  const [slideIdx, setSlideIdx] = React.useState(0);
  const [getDomainOpen, setGetDomainOpen] = React.useState(false);

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

  if (editDesign) {
    return <EditPostPage section={editDesign.section} n={editDesign.n} l={l} onBack={() => setEditDesign(null)} />;
  }

  return (
    <React.Fragment>
    <div className={phase1Mode ? "phase1-listing-detail" : ""} style={{ display: "contents" }}>
      {/* ── Activation Banner — only for non-activated listings ── */}
      <div className="activation-banner" style={{ display: phase1Mode && activatedIds.has(l.id) ? "none" : undefined }}>
        <span className="activation-banner-text">
          With just one-click, you can activate this digital listing package!
        </span>
        <button className="btn btn-sm activation-banner-btn">
          <Icon name="zap" size={13} /> Activate Now
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0 6px" }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go(backRoute)}>
          <Icon name="chevL" size={14} /> {backLabel}
        </button>
      </div>

      <div className="listing-detail-wrap">
        <div className="listing-detail-left">
        <div className="sdhdr-main">
          <div className="sdhdr-thumb" style={{ backgroundImage: `url(${l.img})` }}></div>
          <div className="sdhdr-content">
            <div className="sdhdr-top-row">
              <span className="dot" style={{ width: 8, height: 8, background: l.status === "Pending" ? "var(--amber-500)" : "#16A34A", borderRadius: "50%", flexShrink: 0 }}></span>
              <span style={{ fontSize: 12, color: l.status === "Pending" ? "var(--amber-500)" : "#16A34A", fontWeight: 600 }}>{l.status}</span>
              {!phase1Mode && l.role && <span className="pill" style={{ fontSize: 11 }}>{l.role}</span>}
              {l.owner === "network" && l.sharedBy && (
                <span className="pill pill-blue" style={{ fontSize: 11 }}>Shared by {l.sharedBy}</span>
              )}
            </div>
            <h1 className="sdhdr-title">Your Digital Marketing Package is Ready!</h1>
            <p className="sdhdr-desc" style={{ margin: "0 0 12px" }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>for {l.address}</span>
              <br />
              {!phase1Mode && <span style={{ fontSize: 13, color: "var(--muted)" }}>Start downloading and sharing!</span>}
            </p>
            <div className="sdhdr-stats">
              <span style={{ fontWeight: 700, color: "var(--ink)", fontSize: 15 }}>{fmtPrice(l.price)}</span>
              <span style={{ color: "var(--muted-2)" }}>·</span>
              <span>{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</span>
              <span style={{ color: "var(--muted-2)" }}>·</span>
              <span>MLS# {l.mls}</span>
            </div>
            <div className="sdhdr-actions">
              <button className="btn btn-primary btn-sm" style={{ background: "#2BB882" }}><Icon name="eye" size={13} /> View website</button>
              <button className="btn btn-secondary btn-sm"><Icon name="share" size={13} /> Share</button>
              {!phase1Mode && <button className="btn btn-secondary btn-sm"><Icon name="download" size={13} /> Download All</button>}
              {!phase1Mode && <button className="btn btn-ghost btn-sm"><Icon name="edit" size={13} /> Edit</button>}
            </div>
            <div className="sdhdr-meta">
              {phase1Mode ? (
                <span className={`toggle ${websiteOnline ? "" : "off"}`} onClick={() => setWebsiteOnline(v => !v)} style={{ cursor: "pointer" }}>
                  <span className="sw"></span>
                  {websiteOnline ? "Website Live" : "Website Offline"}
                </span>
              ) : (
                <span className="sdhdr-meta-status">Website Live</span>
              )}
              {!phase1Mode && <>
                <span className="sdhdr-meta-sep">·</span>
                <span><span className="sdhdr-meta-key">Views</span> 1,284</span>
              </>}
              <span className="sdhdr-meta-dates">
                <span className="sdhdr-meta-sep">·</span>
                <span><span className="sdhdr-meta-key">Listed</span> {l.added}</span>
                <span className="sdhdr-meta-sep">·</span>
                <span><span className="sdhdr-meta-key">Updated</span> {l.updated}</span>
              </span>
            </div>
          </div>
        </div>
        </div>
        <div className="listing-detail-right">
          {!phase1Mode ? <PromoListingSlide go={go} /> : <div
            className="promo-hero"
            style={{
              background: "linear-gradient(150deg, #EFF6FF 0%, #DBEAFE 60%, #BFDBFE 100%)",
              boxShadow: "0 2px 16px rgba(37,99,235,0.10)",
              border: "1px solid rgba(37,99,235,0.10)",
              height: "auto",
              flex: 1,
              margin: 0,
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              <defs>
                <pattern id="custom-url-promo-lines" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45 0 0)">
                  <line x1="0" y1="0" x2="0" y2="36" stroke="rgba(0,0,0,0.04)" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#custom-url-promo-lines)" />
            </svg>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#DBEAFE", color: "#1D4ED8", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10, letterSpacing: "0.03em" }}>
                <Icon name="listing" size={11} /> Custom URL
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25, margin: "0 0 8px", color: "#0F172A", letterSpacing: "-0.02em" }}>
                Get a custom URL for this listing
              </h2>
              <p style={{ fontSize: 12.5, color: "#475569", margin: "0 0 16px", lineHeight: 1.55 }}>
                Replace the default MLS-based link with a memorable branded domain — like <strong style={{ color: "#1D4ED8" }}>4320mercerisland.com</strong> — that you own and control.
              </p>
              <button className="btn btn-sm" onClick={() => setGetDomainOpen(true)} style={{ background: "#1D4ED8", color: "#fff", fontWeight: 600, borderRadius: 999, padding: "6px 16px" }}>
                <Icon name="sparkle" size={13} /> Get Custom URL
              </button>
            </div>
          </div>}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="tabs" style={phase1Mode ? { display: "none" } : {}}>
        <button className={`tab ${tab === "basics" ? "active" : ""}`} onClick={() => setTab("basics")}>Basics</button>
        <button className={`tab ${tab === "social" ? "active" : ""}`} onClick={() => setTab("social")}>Social</button>
        <button className={`tab ${tab === "photos" ? "active" : ""}`} onClick={() => setTab("photos")}>Photos & Videos</button>
        <button className={`tab ${tab === "propinfo" ? "active" : ""}`} onClick={() => setTab("propinfo")}>Property Info</button>
        <button className={`tab ${tab === "tags" ? "active" : ""}`} onClick={() => setTab("tags")}>Tags</button>
        <button className={`tab ${tab === "embed" ? "active" : ""}`} onClick={() => setTab("embed")}>Embed Codes</button>
        <button className={`tab ${tab === "unbranded" ? "active" : ""}`} onClick={() => setTab("unbranded")}>Unbranded</button>
        <button className={`tab ${tab === "shared" ? "active" : ""}`} onClick={() => setTab("shared")}>Shared With</button>
        <button className={`tab ${tab === "activity" ? "active" : ""}`} onClick={() => setTab("activity")}>Activity</button>
        <button className={`tab ${tab === "settings" ? "active" : ""}`} onClick={() => setTab("settings")}>Settings</button>
      </div>

      {/* ── Basics Tab: Website · Brochure/PDF · QR Code ── */}
      {tab === "basics" && (
        <div className="pkg-hero-card" style={{ marginBottom: 0 }}>
          {/* Property Website */}
          <div className="pkg-hero-col">
            <div className="pkg-hero-col-label">Property Website</div>
            <div className="pkg-website-thumb-wrap">
              <div className="ld-mb-wrap pkg-hero-laptop" style={{ paddingTop: 0 }}>
                <div className="ld-mb">
                  <div className="ld-mb-lid">
                    <div className="ld-mb-bezel">
                      <div className="ld-mb-cam"></div>
                      <div className="ld-mb-screen">
                        <img src={l.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </div>
                  </div>
                  <div className="ld-mb-foot"></div>
                </div>
              </div>
              {l.owner === "me" && (
                <div className="ld-design-edit-overlay" style={{ borderRadius: 8 }} onClick={() => setTab("settings")}>
                  <div className="ld-design-edit-btn"><Icon name="edit" size={16} /></div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <a href="#" style={{ fontSize: 12, color: "var(--blue-500)", fontWeight: 500 }}>{l.mls}.rsir.homes</a>
              <a href="#" className="ld-get-domain" style={{ padding: 0 }} onClick={e => { e.preventDefault(); setGetDomainOpen(true); }}>Get Domain →</a>
            </div>
            <div className="ld-web-actions">
              <button className="btn btn-primary btn-sm" style={{ background: "#2BB882" }}><Icon name="eye" size={12} /> View website</button>
              <button className="btn btn-secondary btn-sm"><Icon name="share" size={12} /> Share</button>
            </div>
          </div>

          {/* Brochure / PDF */}
          <div className="pkg-hero-col">
            <div className="pkg-hero-col-label">Brochure / PDF</div>
            <div className="pkg-brochure-doc">
              <div className="pkg-brochure-photo">
                <img src={l.img} alt="" />
              </div>
              <div className="pkg-brochure-body">
                <div className="pkg-brochure-addr">{l.address}</div>
                <div className="pkg-brochure-price">{fmtPrice(l.price)} · {l.beds} bd · {l.baths} ba</div>
                <div className="pkg-brochure-brand">Realogics Sotheby's</div>
              </div>
            </div>
            <select value={brochureType} onChange={e => setBrochureType(e.target.value)} className="pkg-select">
              <option>Single Page</option>
              <option>Letter – 2 Page</option>
              <option>Letter – 4 Page</option>
              <option>Tabloid – 2 Page</option>
            </select>
            <button className="btn btn-blue btn-sm"><Icon name="download" size={12} /> Download</button>
          </div>

          {/* QR Code */}
          <div className="pkg-hero-col">
            <div className="pkg-hero-col-label">QR Code</div>
            <div className="ld-qr-block" style={{ padding: 8 }}>
              <svg viewBox="0 0 120 120" width="90" height="90" style={{ display: "block" }}>
                <rect width="120" height="120" fill="white"/>
                <rect x="10" y="10" width="30" height="30" fill="#0F172A" rx="3"/>
                <rect x="15" y="15" width="20" height="20" fill="white" rx="2"/>
                <rect x="19" y="19" width="12" height="12" fill="#0F172A" rx="1"/>
                <rect x="80" y="10" width="30" height="30" fill="#0F172A" rx="3"/>
                <rect x="85" y="15" width="20" height="20" fill="white" rx="2"/>
                <rect x="89" y="19" width="12" height="12" fill="#0F172A" rx="1"/>
                <rect x="10" y="80" width="30" height="30" fill="#0F172A" rx="3"/>
                <rect x="15" y="85" width="20" height="20" fill="white" rx="2"/>
                <rect x="19" y="89" width="12" height="12" fill="#0F172A" rx="1"/>
                <rect x="50" y="10" width="6" height="6" fill="#0F172A"/>
                <rect x="60" y="10" width="6" height="6" fill="#0F172A"/>
                <rect x="50" y="20" width="6" height="6" fill="#0F172A"/>
                <rect x="70" y="20" width="6" height="6" fill="#0F172A"/>
                <rect x="10" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="20" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="30" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="10" y="60" width="6" height="6" fill="#0F172A"/>
                <rect x="30" y="60" width="6" height="6" fill="#0F172A"/>
                <rect x="10" y="70" width="6" height="6" fill="#0F172A"/>
                <rect x="20" y="70" width="6" height="6" fill="#0F172A"/>
                <rect x="50" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="60" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="70" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="50" y="60" width="6" height="6" fill="#0F172A"/>
                <rect x="70" y="60" width="6" height="6" fill="#0F172A"/>
                <rect x="50" y="70" width="6" height="6" fill="#0F172A"/>
                <rect x="60" y="70" width="6" height="6" fill="#0F172A"/>
                <rect x="80" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="90" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="100" y="50" width="6" height="6" fill="#0F172A"/>
                <rect x="80" y="60" width="6" height="6" fill="#0F172A"/>
                <rect x="100" y="60" width="6" height="6" fill="#0F172A"/>
                <rect x="80" y="70" width="6" height="6" fill="#0F172A"/>
                <rect x="90" y="70" width="6" height="6" fill="#0F172A"/>
                <rect x="80" y="90" width="6" height="6" fill="#0F172A"/>
                <rect x="100" y="90" width="6" height="6" fill="#0F172A"/>
                <rect x="80" y="100" width="6" height="6" fill="#0F172A"/>
                <rect x="50" y="90" width="6" height="6" fill="#0F172A"/>
                <rect x="70" y="90" width="6" height="6" fill="#0F172A"/>
                <rect x="50" y="100" width="6" height="6" fill="#0F172A"/>
                <rect x="60" y="100" width="6" height="6" fill="#0F172A"/>
                <rect x="100" y="100" width="6" height="6" fill="#0F172A"/>
              </svg>
            </div>
            <select value={qrTarget} onChange={e => setQrTarget(e.target.value)} className="pkg-select">
              <option>Property Website</option>
              <option>Unbranded Website</option>
              <option>Virtual Tour</option>
              <option>Contact Form</option>
            </select>
            <button className="btn btn-blue btn-sm"><Icon name="download" size={12} /> Download</button>
          </div>
        </div>
      )}

      {/* ── Social Tab ── */}
      {tab === "social" && (
        <>
          {/* Filters — Desktop (chips) */}
          <div className="ld-social-filters ld-filters-desktop">
            <div className="ld-filter-group">
              <span className="ld-filter-label">Select Package Type</span>
              <div className="ld-chips">
                {["All packages", "New listing", "Open house 5/9", "Open house 5/10", "My edits"].map(c => (
                  <button key={c} className={`ld-chip ${socialPkg === c ? "active" : ""}`} onClick={() => setSocialPkg(c)}>{c}</button>
                ))}
              </div>
            </div>
            <div className="ld-filter-group">
              <span className="ld-filter-label">Select Media Size</span>
              <div className="ld-chips">
                {["1:1 Square", "16:9 Rectangle", "9:16 Story"].map(c => (
                  <button key={c} className={`ld-chip ${socialSize === c ? "active" : ""}`} onClick={() => setSocialSize(s => s === c ? null : c)}>{c}</button>
                ))}
              </div>
            </div>
          </div>
          {/* Filters — Mobile (dropdowns) */}
          <div className="ld-filters-mobile">
            <select className="pkg-select" value={socialPkg} onChange={e => setSocialPkg(e.target.value)} style={{ width: "100%" }}>
              {["All packages", "New listing", "Open house 5/9", "Open house 5/10", "My edits"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select className="pkg-select" value={socialSize || ""} onChange={e => setSocialSize(e.target.value || null)} style={{ width: "100%" }}>
              <option value="">All sizes</option>
              {["1:1 Square", "16:9 Rectangle", "9:16 Story"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Design sections */}
          {[
            { label: "16:9 NEW LISTING", platforms: "Twitter, Facebook, Instagram, LinkedIn", ratio: "16 / 9", sizeKey: "16:9 Rectangle" },
            { label: "9:16 NEW LISTING", platforms: "Stories, Snapchat", ratio: "9 / 16", sizeKey: "9:16 Story" },
            { label: "1:1 NEW LISTING", platforms: "Instagram", ratio: "1 / 1", sizeKey: "1:1 Square" },
          ].filter(s => !socialSize || socialSize === s.sizeKey).map((section, si) => (
            <div key={si} className="ld-social-section">
              <div className="ld-social-section-header">
                <span className="ld-social-section-title">{section.label}</span>
                <span className="ld-social-section-platforms">({section.platforms})</span>
              </div>
              <div className="ld-social-designs">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="ld-design-col">
                    <div className="ld-design-label">Design {n}</div>
                    <div className="ld-design-card" style={{ aspectRatio: section.ratio }}>
                      <SocialDesign n={n} l={l} />
                      {l.owner === "me" && (
                        <div className="ld-design-edit-overlay" onClick={() => setEditDesign({ section, n })}>
                          <div className="ld-design-edit-btn"><Icon name="edit" size={16} /></div>
                        </div>
                      )}
                    </div>
                    <div className="ld-design-actions">
                      <button className="btn btn-primary btn-sm ld-design-btn"><Icon name="download" size={12} /> Download</button>
                      <button className="btn btn-secondary btn-sm ld-design-btn"><Icon name="share" size={12} /> Share</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* ── Photos & Videos Tab ── */}
      {tab === "photos" && (
        <>
          {showMediaShare && (
            <ShareModal
              kind="assets"
              count={mediaShareItems.length}
              selectedItems={mediaShareItems}
              onClose={() => setShowMediaShare(false)}
            />
          )}

          {/* Photos header */}
          <div className="photos-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className={`check ${allPhotosSelected ? "on" : ""}`} onClick={toggleAllPhotos} style={{ flexShrink: 0 }}>
                {allPhotosSelected && <Icon name="check" size={12} />}
              </button>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{l.photos} Photos</span>
            </div>
            <div className="photos-header-btns" style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-secondary btn-sm"><Icon name="download" size={12} /> Download All</button>
              <button className="btn btn-primary btn-sm"><Icon name="plus" size={13} /> Upload Photos</button>
            </div>
          </div>

          {/* Photo bulk action bar */}
          {selectedPhotos.length > 0 && (
            <div className="asset-bulk-bar" style={{ marginBottom: 12 }}>
              <span className="abc-count">{selectedPhotos.length} photo{selectedPhotos.length !== 1 ? "s" : ""} selected</span>
              <button className="abc-btn share" onClick={() => openMediaShare(
                selectedPhotos.map(i => ({ id: `photo-${i}`, name: `Photo ${i + 1}`, label: "PHOTO", color: "#2563EB", sub: RC_DATA.PROP_IMGS[i % RC_DATA.PROP_IMGS.length] }))
              )}><Icon name="share" size={13} /> Share {selectedPhotos.length}</button>
              <button className="abc-btn primary"><Icon name="download" size={13} /> Download {selectedPhotos.length}</button>
              <button className="abc-clear" onClick={() => setSelectedPhotos([])}>✕</button>
            </div>
          )}

          <div className="asset-grid" style={{ marginBottom: 12 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`asset ${selectedPhotos.includes(i) ? "photo-selected" : ""}`}
                   style={{ backgroundImage: `url(${RC_DATA.PROP_IMGS[i % RC_DATA.PROP_IMGS.length]})` }}
                   onClick={() => togglePhoto(i)}>
                <div className="asset-check"><Icon name="check" size={10} /></div>
                {i === 11 && <div className="more">+{l.photos - 11}</div>}
              </div>
            ))}
          </div>

          {/* Videos header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Videos</span>
              {selectedVideos.length > 0 && <span style={{ fontSize: 12, color: "var(--muted)" }}>{selectedVideos.length} selected</span>}
            </div>
            <button className="btn btn-secondary btn-sm"><Icon name="plus" size={13} /> Add Video</button>
          </div>

          <div className="ld-video-grid">
            {[
              { title: "30s Walkthrough Reel", dur: "0:32", views: "892 views", img: RC_DATA.PROP_IMGS[0] },
              { title: "Drone Exterior Tour", dur: "1:14", views: "445 views", img: RC_DATA.PROP_IMGS[2] },
            ].map((v, i) => (
              <div key={i} className={`ld-video-card ${selectedVideos.includes(i) ? "photo-selected" : ""}`}
                   style={{ cursor: "pointer", outline: selectedVideos.includes(i) ? "2px solid var(--blue-500)" : "none", borderRadius: 10 }}
                   onClick={() => toggleVideo(i)}>
                <div className="ld-video-thumb" style={{ position: "relative" }}>
                  <img src={v.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="ld-video-play"><Icon name="play" size={16} /></div>
                  <div className="ld-video-dur">{v.dur}</div>
                  {selectedVideos.includes(i) && (
                    <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: "var(--blue-500)", display: "grid", placeItems: "center" }}>
                      <Icon name="check" size={11} style={{ color: "#fff" }} />
                    </div>
                  )}
                </div>
                <div className="ld-video-body">
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{v.views}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    <button className="btn btn-secondary btn-sm" onClick={e => e.stopPropagation()}><Icon name="eye" size={12} /> Play</button>
                    <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); openMediaShare([{ id: `video-${i}`, name: v.title, label: "VIDEO", color: "#7C3AED", sub: v.dur }]); }}><Icon name="share" size={12} /> Share</button>
                    <button className="btn btn-secondary btn-sm" onClick={e => e.stopPropagation()}><Icon name="download" size={12} /> Download</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video bulk action bar */}
          {selectedVideos.length > 0 && (
            <div className="asset-bulk-bar" style={{ marginTop: 12 }}>
              <span className="abc-count">{selectedVideos.length} video{selectedVideos.length !== 1 ? "s" : ""} selected</span>
              <button className="abc-btn share" onClick={() => openMediaShare(
                selectedVideos.map(i => ({ id: `video-${i}`, name: [
                  "30s Walkthrough Reel", "Drone Exterior Tour"][i], label: "VIDEO", color: "#7C3AED" }))
              )}><Icon name="share" size={13} /> Share {selectedVideos.length}</button>
              <button className="abc-btn primary"><Icon name="download" size={13} /> Download {selectedVideos.length}</button>
              <button className="abc-clear" onClick={() => setSelectedVideos([])}>✕</button>
            </div>
          )}
        </>
      )}

      {/* ── Property Info Tab ── */}
      {tab === "propinfo" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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

      {/* ── Tags Tab ── */}
      {tab === "tags" && (
        <div className="card card-pad">
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Hashtags</div>
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
            <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard?.writeText(HASHTAGS.join(" "))}>
              <Icon name="copy" size={12} /> Copy All
            </button>
          </div>
        </div>
      )}

      {/* ── Embed Codes Tab ── */}
      {tab === "embed" && (() => {
        const totalSlides = Math.min(l.photos, RC_DATA.PROP_IMGS.length);
        const si = slideIdx % totalSlides;
        const embedCode = `<iframe src="https://${l.mls}.rsir.homes/gallery" width="100%" height="520" frameborder="0" allowfullscreen></iframe>`;
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ overflow: "hidden", padding: 0 }}>
              <div style={{ padding: "14px 18px 12px", borderBottom: "1px solid var(--border-2)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 3 }}>{l.address}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{fmtPrice(l.price)}<span style={{ fontWeight: 400, color: "var(--muted)", marginLeft: 8 }}>{l.city}</span></div>
              </div>
              <div style={{ position: "relative", background: "#000" }}>
                <div style={{ height: 300, backgroundImage: `url(${RC_DATA.PROP_IMGS[si]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <button onClick={() => setSlideIdx(i => (i - 1 + totalSlides) % totalSlides)} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="chevL" size={16} />
                </button>
                <button onClick={() => setSlideIdx(i => (i + 1) % totalSlides)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="chevR" size={16} />
                </button>
                <div style={{ position: "absolute", bottom: 12, right: 14, background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 11.5, fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}>
                  {si + 1} of {l.photos}
                </div>
              </div>
              <div style={{ padding: "14px 18px 16px", borderTop: "1px solid var(--border-2)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", marginBottom: 4 }}>Photo {si + 1}</div>
                <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.55 }}>{PHOTO_DESCS[si % PHOTO_DESCS.length]}</div>
              </div>
            </div>
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

      {/* ── Unbranded Tab ── */}
      {tab === "unbranded" && (
        <div className="card aside-card">
          <p style={{ margin: "0 0 18px", color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
            Unbranded materials are suitable for MLS submissions and syndication. Agent and brokerage branding is removed.
          </p>
          <div className="ld-unbranded-list">
            {[
              { label: "Unbranded Website", url: l.mls + "-unbranded.rsir.homes", status: "Live", icon: "site" },
              { label: "Unbranded Flyer", url: "Letter – 2 Page, no agent branding", status: "Ready", icon: "flyer" },
              { label: "Virtual Tour Link", url: "Matterport 3D tour · 892 views", status: "Live", icon: "eye" },
            ].map((u, i) => (
              <div key={i} className="ld-unbranded-row">
                <div className="ic green"><Icon name={u.icon} size={14} /></div>
                <div className="ld-unbranded-text">
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{u.label}</div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 1 }}>{u.url}</div>
                </div>
                <div className="ld-unbranded-actions">
                  <span className="pill pill-green" style={{ fontSize: 10.5 }}>{u.status}</span>
                  <button className="btn btn-secondary btn-sm"><Icon name="eye" size={12} /> View</button>
                  <button className="btn btn-primary btn-sm"><Icon name="share" size={12} /> Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Shared With Tab ── */}
      {tab === "shared" && (
        <div className="card aside-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Shared with 3 agents</div>
            <button className="btn btn-primary btn-sm"><Icon name="share" size={13} /> Share with more</button>
          </div>
          {RC_DATA.network.filter(n => !n.pending).slice(0, 3).map((n, i) => (
            <div key={i} className="act" style={{ marginBottom: 12 }}>
              <img src={n.ava} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
              <div className="body">
                <div className="who">{n.name}</div>
                <div className="meta">{n.role}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{["2h ago", "5h ago", "2d ago"][i]}</span>
                <button className="btn btn-secondary btn-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Activity Tab ── */}
      {tab === "activity" && (
        <div className="card aside-card">
          <Activity icon="eye" tone="blue" title="1,284 page views this week" meta="Up 22% vs last week" />
          <Activity icon="share" tone="green" title="Shared with 3 network members" meta="By Mike Anderson · 2h ago" />
          <Activity icon="star" tone="amber" title="3 leads captured" meta="From contact form on listing site" />
          <Activity icon="download" tone="green" title="Flyer downloaded 24×" meta="Print-ready PDF" />
          <Activity icon="qr" tone="blue" title="QR Code scanned 47×" meta="From open house flyer · Last scan 1h ago" />
          <Activity icon="spotlight" tone="amber" title="Added to spotlight" meta="Mercer Island Luxury Collection · 2d ago" />
        </div>
      )}

      {/* ── Settings Tab ── */}
      {tab === "settings" && (
        <div className="card aside-card">
          <p className="muted" style={{ marginTop: 0 }}>Manage how this listing appears across REConnect.</p>
          <div className="field">
            <label>Website Status</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
              <button
                className={`toggle ${websiteOnline ? "" : "off"}`}
                onClick={() => setWebsiteOnline(v => !v)}
                style={{ fontSize: 12.5 }}
              >
                <span className="sw"></span>
                {websiteOnline ? "Website Online" : "Website Offline"}
              </button>
              <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
                {websiteOnline ? "Your listing site is publicly visible." : "Your listing site is hidden from visitors."}
              </span>
            </div>
          </div>
          <div className="field"><label>Listing visibility</label><select><option>Allow sharing with network (default)</option><option>Don't allow sharing</option></select></div>
          <div className="field"><label>Subdomain</label><input defaultValue={l.mls + ".rsir.homes"} /></div>
          <div className="field"><label>Description</label><textarea rows={3} defaultValue="Stunning waterfront residence with panoramic Lake Washington views, gourmet kitchen, and resort-style backyard."></textarea></div>
        </div>
      )}

      {/* Mobile-only promo — shown below all content at ≤1024px */}
      <div className="listing-promo-mobile">
        {!phase1Mode ? <PromoListingSlide go={go} /> : <div
          className="promo-hero"
          style={{
            background: "linear-gradient(150deg, #EFF6FF 0%, #DBEAFE 60%, #BFDBFE 100%)",
            boxShadow: "0 2px 16px rgba(37,99,235,0.10)",
            border: "1px solid rgba(37,99,235,0.10)",
            height: "auto", margin: 0, padding: "22px 24px",
            display: "flex", flexDirection: "column", gap: 0,
            position: "relative", overflow: "hidden", borderRadius: "var(--r-lg)",
          }}
        >
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            <defs>
              <pattern id="custom-url-promo-lines-m" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45 0 0)">
                <line x1="0" y1="0" x2="0" y2="36" stroke="rgba(0,0,0,0.04)" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#custom-url-promo-lines-m)" />
          </svg>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#DBEAFE", color: "#1D4ED8", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10, letterSpacing: "0.03em" }}>
              <Icon name="listing" size={11} /> Custom URL
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25, margin: "0 0 8px", color: "#0F172A", letterSpacing: "-0.02em" }}>
              Get a custom URL for this listing
            </h2>
            <p style={{ fontSize: 12.5, color: "#475569", margin: "0 0 16px", lineHeight: 1.55 }}>
              Replace the default MLS-based link with a memorable branded domain — like <strong style={{ color: "#1D4ED8" }}>4320mercerisland.com</strong> — that you own and control.
            </p>
            <button className="btn btn-sm" style={{ background: "#1D4ED8", color: "#fff", fontWeight: 600, borderRadius: 999, padding: "6px 16px" }}>
              <Icon name="sparkle" size={13} /> Get Custom URL
            </button>
          </div>
        </div>}
      </div>
    </div>

    {getDomainOpen && window.GetDomainModal && React.createElement(window.GetDomainModal, { listing: l, onClose: () => setGetDomainOpen(false) })}
    </React.Fragment>
  );
};

const Activity = ({ icon, tone, title, meta }) => (
  <div className="act">
    <div className={`ic ${tone}`}><Icon name={icon} size={14} /></div>
    <div className="body"><div className="who">{title}</div><div className="meta">{meta}</div></div>
  </div>
);

const NewListing = ({ go }) => {
  const [addMode, setAddMode] = React.useState("url");
  const [listingUrl, setListingUrl] = React.useState("");
  const [importing, setImporting] = React.useState(false);
  const [imported, setImported] = React.useState(false);
  const [status, setStatus] = React.useState("Active");
  const [role, setRole] = React.useState("Representing Seller");
  const [type, setType] = React.useState("Residential");

  const handleImport = () => {
    if (!listingUrl.trim()) return;
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImported(true);
    }, 1400);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("listings")}><Icon name="chevL" size={14} /> Back to listings</button>
      </div>
      <div className="page-h" style={{ marginBottom: 20 }}>
        <div><h1>Add New Listing</h1><div className="sub">Import from a listing URL or fill in details manually.</div></div>
      </div>

      {/* Mode toggle */}
      <div className="nl-mode-toggle">
        <button className={`nl-mode-btn ${addMode === "url" ? "active" : ""}`} onClick={() => { setAddMode("url"); setImported(false); }}>
          <Icon name="link" size={15} />
          <span>Add by URL</span>
        </button>
        <button className={`nl-mode-btn ${addMode === "manual" ? "active" : ""}`} onClick={() => setAddMode("manual")}>
          <Icon name="edit" size={15} />
          <span>Fill Manually</span>
        </button>
      </div>

      <div className="new-page">
        {/* ── URL mode ── */}
        {addMode === "url" && (
          <>
            <div className="form-section">
              <h3>Import from Listing URL</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 16px" }}>
                Paste your listing URL from Zillow, Redfin, Realtor.com, MLS, or your brokerage site. We'll automatically fill in the property details.
              </p>
              <div className="nl-url-row">
                <input
                  className="nl-url-input"
                  placeholder="https://www.zillow.com/homedetails/... or MLS link"
                  value={listingUrl}
                  onChange={e => { setListingUrl(e.target.value); setImported(false); }}
                />
                <button className="btn btn-primary" onClick={handleImport} disabled={!listingUrl.trim() || importing}>
                  {importing ? <><Icon name="sparkle" size={14} /> Importing…</> : <><Icon name="arrowR" size={14} /> Import</>}
                </button>
              </div>
              <div className="nl-url-sources">
                {["Zillow", "Redfin", "Realtor.com", "MLS Direct", "NWMLS", "Brokerage Site"].map(s => (
                  <span key={s} className="nl-source-chip">{s}</span>
                ))}
              </div>
            </div>

            {imported && (
              <>
                <div className="nl-import-success">
                  <Icon name="check" size={16} stroke={2.5} />
                  <span>Listing data imported successfully. Review and confirm the details below.</span>
                </div>
                <div className="form-section">
                  <h3>Property Details <span style={{ fontSize: 11, fontWeight: 500, color: "var(--blue-500)", marginLeft: 6 }}>Auto-filled</span></h3>
                  <div className="field"><label>Street Address</label><input defaultValue="14778 NE 60th Court" /></div>
                  <div className="field-row">
                    <div className="field"><label>City</label><input defaultValue="Redmond" /></div>
                    <div className="field"><label>State</label><input defaultValue="WA" /></div>
                  </div>
                  <div className="field-row">
                    <div className="field"><label>ZIP Code</label><input defaultValue="98052" /></div>
                    <div className="field"><label>MLS #</label><input defaultValue="2519841" /></div>
                  </div>
                  <div className="field-row">
                    <div className="field"><label>Property Type</label>
                      <select defaultValue="Residential"><option>Residential</option><option>Condo</option><option>Townhouse</option></select>
                    </div>
                    <div className="field"><label>Status</label>
                      <select defaultValue="Active"><option>Active</option><option>Pending</option><option>Sold</option></select>
                    </div>
                  </div>
                </div>
                <div className="form-section">
                  <h3>Pricing & Specs <span style={{ fontSize: 11, fontWeight: 500, color: "var(--blue-500)", marginLeft: 6 }}>Auto-filled</span></h3>
                  <div className="field"><label>List Price</label><input defaultValue="$2,075,000" /></div>
                  <div className="field-row-3">
                    <div className="field"><label>Bedrooms</label><input type="number" defaultValue="5" /></div>
                    <div className="field"><label>Bathrooms</label><input type="number" defaultValue="3" /></div>
                    <div className="field"><label>Sq Ft</label><input type="number" defaultValue="3,080" /></div>
                  </div>
                  <div className="field"><label>Description</label><textarea rows={4} defaultValue="Step into a home defined by volume, light and a sense of arrival. From the moment you enter, soaring ceilings extend through the main living areas…"></textarea></div>
                </div>
                <div className="form-section">
                  <h3>Photos <span style={{ fontSize: 11, fontWeight: 500, color: "var(--blue-500)", marginLeft: 6 }}>22 imported</span></h3>
                  <div className="nl-imported-photos">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="nl-imported-photo">
                        <img src={`https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=60&v=${i}`} alt="" />
                      </div>
                    ))}
                    <div className="nl-imported-photo nl-imported-more">+16</div>
                  </div>
                </div>
                <div className="new-page-actions">
                  <button className="btn btn-secondary" onClick={() => go("listings")}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => go("listings")}><Icon name="check" size={14} /> Create Listing</button>
                </div>
              </>
            )}
          </>
        )}

        {/* ── Manual mode ── */}
        {addMode === "manual" && (
          <>
            <div className="form-section">
              <h3>Property Details</h3>
              <div className="field"><label>Street Address</label><input placeholder="123 Main Street" /></div>
              <div className="field-row">
                <div className="field"><label>City</label><input placeholder="Seattle" /></div>
                <div className="field"><label>State</label><input placeholder="WA" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>ZIP Code</label><input placeholder="98101" /></div>
                <div className="field"><label>MLS #</label><input placeholder="2519999" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Property Type</label>
                  <select value={type} onChange={e => setType(e.target.value)}>
                    <option>Residential</option><option>Condo</option><option>Townhouse</option><option>Multi-Family</option><option>Land</option><option>Commercial</option>
                  </select>
                </div>
                <div className="field"><label>Status</label>
                  <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option>Active</option><option>Pending</option><option>Sold</option><option>Coming Soon</option><option>Off Market</option>
                  </select>
                </div>
              </div>
              <div className="field"><label>Representing</label>
                <div className="seg" style={{ display: "flex" }}>
                  <button className={role === "Representing Seller" ? "active" : ""} style={{ flex: 1 }} onClick={() => setRole("Representing Seller")}>Seller</button>
                  <button className={role === "Representing Buyer" ? "active" : ""} style={{ flex: 1 }} onClick={() => setRole("Representing Buyer")}>Buyer</button>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Pricing & Specs</h3>
              <div className="field"><label>List Price</label><input placeholder="$1,250,000" /></div>
              <div className="field-row-3">
                <div className="field"><label>Bedrooms</label><input type="number" placeholder="4" /></div>
                <div className="field"><label>Bathrooms</label><input type="number" placeholder="3" /></div>
                <div className="field"><label>Sq Ft</label><input type="number" placeholder="2,400" /></div>
              </div>
              <div className="field"><label>Description</label><textarea rows={4} placeholder="Describe the property — highlights, features, neighborhood notes…"></textarea></div>
            </div>

            <div className="form-section">
              <h3>Photos</h3>
              <div className="photo-drop">
                <div className="ic">📷</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Drop photos here or click to upload</div>
                <div style={{ fontSize: 12 }}>JPG, PNG — up to 50 photos, max 20 MB each</div>
              </div>
            </div>

            <div className="new-page-actions">
              <button className="btn btn-secondary" onClick={() => go("listings")}>Cancel</button>
              <button className="btn btn-primary" onClick={() => go("listings")}><Icon name="check" size={14} /> Create Listing</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const EditListing = ({ id, go }) => {
  const l = RC_DATA.listings.find(x => x.id === id) || RC_DATA.listings[0];
  const [status, setStatus] = React.useState(l.status);
  const [role, setRole] = React.useState(l.role);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("listings")}><Icon name="chevL" size={14} /> Back to listings</button>
      </div>
      <div className="page-h" style={{ marginBottom: 20 }}>
        <div><h1>Edit Listing</h1><div className="sub">Update the details for this listing.</div></div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => go("listings")}>Cancel</button>
          <button className="btn btn-primary" onClick={() => go("listings")}><Icon name="check" size={14} /> Save Changes</button>
        </div>
      </div>

      <div className="new-page">
        <div className="form-section">
          <h3>Property Details</h3>
          <div className="field"><label>Street Address</label><input defaultValue={l.address.split(",")[0]} /></div>
          <div className="field-row">
            <div className="field"><label>City</label><input defaultValue={l.city.split(",")[0]} /></div>
            <div className="field"><label>State</label><input defaultValue="WA" /></div>
          </div>
          <div className="field-row">
            <div className="field"><label>ZIP Code</label><input defaultValue="98040" /></div>
            <div className="field"><label>MLS #</label><input defaultValue={l.mls} /></div>
          </div>
          <div className="field-row">
            <div className="field"><label>Property Type</label>
              <select defaultValue={l.type}><option>Residential</option><option>Condo</option><option>Townhouse</option><option>Multi-Family</option><option>Land</option><option>Commercial</option></select>
            </div>
            <div className="field"><label>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option>Active</option><option>Pending</option><option>Sold</option><option>Coming Soon</option><option>Off Market</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Representing</label>
            <div className="seg" style={{ display: "flex" }}>
              <button className={role === "Representing Seller" ? "active" : ""} style={{ flex: 1 }} onClick={() => setRole("Representing Seller")}>Seller</button>
              <button className={role === "Representing Buyer" ? "active" : ""} style={{ flex: 1 }} onClick={() => setRole("Representing Buyer")}>Buyer</button>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Pricing & Specs</h3>
          <div className="field"><label>List Price</label><input defaultValue={fmtPrice(l.price)} /></div>
          <div className="field-row-3">
            <div className="field"><label>Bedrooms</label><input type="number" defaultValue={l.beds} /></div>
            <div className="field"><label>Bathrooms</label><input type="number" defaultValue={l.baths} /></div>
            <div className="field"><label>Sq Ft</label><input type="number" defaultValue={l.sqft} /></div>
          </div>
          <div className="field"><label>Description</label>
            <textarea rows={4} defaultValue="Stunning waterfront residence with panoramic Lake Washington views, gourmet kitchen, and resort-style backyard." />
          </div>
        </div>

        <div className="form-section">
          <h3>Photos <span style={{ fontSize: 11, fontWeight: 500, color: "var(--muted)", marginLeft: 6 }}>{l.photos} uploaded</span></h3>
          <div className="nl-imported-photos">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="nl-imported-photo">
                <img src={l.img + `?v=${i}`} alt="" />
              </div>
            ))}
            <div className="nl-imported-photo nl-imported-more">+{l.photos - 6}</div>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: 10 }}><Icon name="upload" size={13} /> Upload More Photos</button>
        </div>

        <div className="new-page-actions">
          <button className="btn btn-secondary" onClick={() => go("listings")}>Cancel</button>
          <button className="btn btn-primary" onClick={() => go("listings")}><Icon name="check" size={14} /> Save Changes</button>
        </div>
      </div>
    </>
  );
};

const AMPListings = ({ go, selected, setSelected, onShare, activatedIds = new Set(), onActivateSites = () => {} }) => {
  const [tab, setTab] = React.useState("mine");
  const [noSelectionAlert, setNoSelectionAlert] = React.useState(null);
  const [page, setPage] = React.useState(1);

  const fullList = RC_DATA.listings.filter(l => tab === "mine" ? l.owner === "me" : l.owner === "network");
  const list = fullList.slice((page - 1) * LISTINGS_PAGE_SIZE, page * LISTINGS_PAGE_SIZE);

  React.useEffect(() => { setPage(1); }, [tab]);
  React.useEffect(() => { setSelected([]); }, [tab]);

  const allChecked = list.length > 0 && list.every(l => selected.includes(l.id));
  const toggleAll = () => {
    if (allChecked) setSelected(selected.filter(id => !list.find(l => l.id === id)));
    else setSelected([...new Set([...selected, ...list.map(l => l.id)])]);
  };
  const toggle = (id) => {
    setSelected(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  };

  return (
    <>
      <div className="page-h">
        <div>
          <h1>AMP</h1>
          <div className="sub">Manage your AMP (Automated Marketing Platform) — automated campaigns and fast-loading mobile experiences for every listing.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => go("mls-info")}><Icon name="link" size={14} /> Connect MLS</button>
          <button className="btn btn-primary" onClick={() => go("new-listing")}><Icon name="plus" size={14} /> Add Listing</button>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>
          My Listings <span className="count">{RC_DATA.listings.filter(l => l.owner === "me").length}</span>
        </button>
        <button className={`tab ${tab === "network" ? "active" : ""}`} onClick={() => setTab("network")}>
          Company's Listings <span className="count">{RC_DATA.listings.filter(l => l.owner === "network").length}</span>
        </button>
      </div>

      <div className="toolbar">
        <button className="chip" onClick={toggleAll}>
          <span className={`check check-select-all ${allChecked ? "on" : ""}`} style={{ width: 16, height: 16 }}>
            <Icon name="check" size={11} stroke={3} />
          </span>
          Select all
        </button>
        <div className="divider-v" />
        <span style={{ fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap" }}>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>{fullList.length}</span> listings
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button className="chip"><Icon name="filter" size={13} /><span className="chip-label"> Filter <Icon name="chevD" size={11} /></span></button>
          <button className="chip"><Icon name="sortUD" size={13} /><span className="chip-label"> Sort: Newest <Icon name="chevD" size={11} /></span></button>
        </div>
      </div>

      <div className="share-bar show">
        {selected.length > 0 && <span><span className="bold">{selected.length}</span> selected</span>}
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-primary btn-sm" style={{ background: "#10B981" }}
            onClick={() => selected.length > 0 ? onShare("listings") : setNoSelectionAlert("share")}>
            <Icon name="share" size={13} /><span>Share<span className="share-net-sfx"> with network</span></span>
          </button>
          <button className="btn btn-sm" style={{ background: "#2563EB", color: "#fff" }}
            onClick={() => selected.length > 0 ? null : setNoSelectionAlert("spotlight")}>
            <Icon name="spotlight" size={13} /> Create spotlight
          </button>
        </div>
        {selected.length > 0 && <button className="x" style={{ marginLeft: "auto" }} onClick={() => setSelected([])}><Icon name="x" size={16} /></button>}
      </div>

      {noSelectionAlert && (
        <div className="modal-back" onClick={() => setNoSelectionAlert(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-h">
              <h2>{noSelectionAlert === "share" ? "Share with Network" : "Create Spotlight"}</h2>
              <button className="icon-btn" onClick={() => setNoSelectionAlert(null)}><Icon name="x" /></button>
            </div>
            <div className="modal-b">
              <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                Please select one or more listings first to {noSelectionAlert === "share" ? "share with your network" : "create a spotlight"}.
              </p>
            </div>
            <div className="modal-f">
              <button className="btn btn-primary" onClick={() => setNoSelectionAlert(null)}>Got it</button>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: 0 }}>
        {list.map(l => (
          <div key={l.id} className={`listing-row ${selected.includes(l.id) ? "selected" : ""}`}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className={`check ${selected.includes(l.id) ? "on" : ""}`} onClick={(e) => { e.stopPropagation(); toggle(l.id); }}>
                {selected.includes(l.id) && <Icon name="check" size={12} stroke={3} />}
              </button>
              <div className="thumb" style={{ backgroundImage: `url(${l.img})` }} onClick={() => go("amp-listing/" + l.id)}></div>
            </div>
            <div className="listing-meta" onClick={() => go("amp-listing/" + l.id)} style={{ cursor: "pointer" }}>
              <div className="status">
                <span className={`dot ${l.status === "Pending" ? "pending" : ""}`}></span>
                <span style={{ color: l.status === "Pending" ? "var(--amber-500)" : "var(--green-600)" }}>{l.status}</span>
                {l.owner === "network" && <span className="pill pill-blue" style={{ textTransform: "none", letterSpacing: 0, whiteSpace: "nowrap" }}>Shared by {l.sharedBy}</span>}
              </div>
              <h3>{l.address}</h3>
              <div className="sub">
                <span><Icon name="location" size={11} /> {l.city}</span>
                <span>MLS #{l.mls}</span>
              </div>
              <a className="url" href="#">{l.mls}.rsir.homes/amp</a>
            </div>
            <div>
              <div className="price">{fmtPrice(l.price)}</div>
              <div className="price-sub">{l.type}</div>
              <div className="price-sub">{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{l.role}</div>
            </div>
            <div>
              <div style={{ fontSize: 12.5 }}>Listed {l.added}</div>
              <div className="price-sub">Updated {l.updated}</div>
              <div style={{ marginTop: 6 }}>
                <span className={`toggle ${l.online ? "" : "off"}`}>
                  <span className="sw"></span>
                  {l.online ? "AMP Online" : "AMP Offline"}
                </span>
              </div>
            </div>
            <div className="hd-photos">
              {(() => {
                const n = parseInt(l.mls || 0);
                const hasVideos = n % 3 !== 2;
                const hasSocial = n % 4 !== 3;
                const videoCount = (n % 3) + 1;
                const socialCount = ((n % 5) + 2) * 3;
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div><Icon name="image" size={14} /> {l.photos} Photos</div>
                    {hasVideos && <div><Icon name="video" size={14} /> {videoCount} Videos</div>}
                    {hasSocial && <div><Icon name="ig" size={14} /> {socialCount} Social Posts</div>}
                  </div>
                );
              })()}
            </div>
            <div className="row-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => go("amp-listing/" + l.id)}>
                <Icon name="gift" size={13} /> All Marketing
              </button>
              <button className="btn btn-secondary btn-sm">
                Recent Activity <Icon name="chevD" size={12} />
              </button>
            </div>
            {/* Tablet/mobile: labeled action buttons spanning full row width */}
            <div className="listing-row-mobile-btns">
              <button className="btn btn-secondary btn-sm" onClick={() => go("amp-listing/" + l.id)}>
                <Icon name="eye" size={13} /> View Detail
              </button>
              {l.owner === "me" && (
                activatedIds.has(l.id)
                  ? <span className="activated-badge"><Icon name="check" size={12} stroke={3} /> Activated</span>
                  : <button className="btn btn-primary btn-sm" onClick={() => onActivateSites([l])}>
                      <Icon name="zap" size={13} /> Activate
                    </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} total={fullList.length} perPage={LISTINGS_PAGE_SIZE} />
    </>
  );
};

Object.assign(window, { Listings, ListingDetail, NewListing, EditListing, AMPListings });
