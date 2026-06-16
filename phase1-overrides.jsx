/* global React, RC_DATA, Icon, fmtPrice, Pagination */
// Phase 1 overrides — Sidebar, AMPListings, ActivateSiteModal

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({ route, setRoute, collapsed, setCollapsed, counts, onMobileClose }) => {
  const items = [
    { key: "dashboard",  label: "Dashboard",   icon: "home" },
    { key: "amp",        label: "My Listings",  icon: "zap",   badge: counts.listings },
    { key: "canva",      label: "Canva",        icon: "canva" },
    { key: "users",      label: "Users",        icon: "users" },
  ];

  const handleCollapseOrClose = () => {
    if (window.innerWidth <= 768) onMobileClose?.();
    else setCollapsed(!collapsed);
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

// ── ActivateSiteModal — 3-step flow ───────────────────────────────────────────
const PAYMENT_CARDS = [
  { label: "VISA •••• 1111", exp: "Expires 11/30" },
  { label: "VISA •••• 4242", exp: "Expires 12/30" },
  { label: "VISA •••• 3890", exp: "Expires 08/28" },
];

const CardIcon = () => (
  <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
    <circle cx="11" cy="9" r="6" fill="rgba(255,255,255,0.30)"/>
    <circle cx="17" cy="9" r="6" fill="rgba(255,255,255,0.55)"/>
  </svg>
);

// For Phase 1 demo — set false to show the "Add Profile Photo" next step
const PHASE1_HAS_PROFILE_PHOTO = false;

const ActivateSiteModal = ({ listings, onClose, onActivated }) => {
  const [step, setStep] = React.useState(1);
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [photoSrc, setPhotoSrc] = React.useState(null);
  const [photoUploading, setPhotoUploading] = React.useState(false);

  const isMulti = listings.length > 1;
  const priceEach = 19;
  const subtotal = listings.length * priceEach;
  const discount = 0;
  const tax = 0;
  const total = subtotal - discount + tax;

  const handlePay = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      onActivated(listings.map(l => l.id));
    }, 1400);
  };

  const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePhotoSave = () => {
    if (photoSrc) {
      setPhotoUploading(true);
      setTimeout(() => { setPhotoUploading(false); onClose(); }, 1200);
    } else {
      onClose();
    }
  };

  // Shared close button
  const CloseBtn = () => (
    <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
  );

  // Shared back text link
  const BackLink = ({ onClick }) => (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12.5, color: "var(--muted)", display: "flex", alignItems: "center", gap: 3, padding: 0, marginBottom: 12 }}>
      <Icon name="chevL" size={13} /> Back
    </button>
  );

  return (
    <div className="modal-back" onClick={step === 3 ? onClose : undefined}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>

        {/* ══════════ STEP 1 — Activate Property Websites ══════════ */}
        {step === 1 && <>
          <div className="modal-h" style={{ justifyContent: "space-between", borderBottom: "none" }}>
            <h2 style={{ margin: 0 }}>Activate Property Websites</h2>
            <CloseBtn />
          </div>

          <div className="modal-b" style={{ padding: "0 20px 4px" }}>
            {/* Subtitle */}
            <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>
              Unlock a polished property site with your branding, photos, and details — ready to share with buyers.
              {isMulti && <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{listings.length} listing{listings.length !== 1 ? "s" : ""} selected</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>Listings that are already activated are not included.</div>
              </div>}
            </p>

            {/* Listing rows — same style as Step 2, scrollable when many */}
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ maxHeight: 260, overflowY: "auto" }}>
                {listings.map((l, i) => (
                  <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", borderBottom: i < listings.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 6, backgroundImage: `url(${l.img})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, maxWidth: 240, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.address}</div>
                        <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 1 }}>{l.city} · MLS #{l.mls}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#16A34A" }}>Only ${priceEach}.00</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>one-time</div>
                    </div>
                  </div>
                ))}
              </div>
              {isMulti && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#EFF6FF", borderTop: "1px solid #BFDBFE" }}>
                  <span style={{ fontSize: 13, color: "#1D4ED8" }}>${priceEach}.00 × {listings.length} listings</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1D4ED8" }}>${total}.00 total</span>
                </div>
              )}
            </div>

            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, marginBottom: 4 }}>
              You will be charged once; this is not added as a recurring subscription item.
            </div>
          </div>

          <div className="modal-f" style={{ gap: 8 }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ background: "#2563EB", minWidth: 120 }} onClick={() => setStep(2)}>
              Continue <Icon name="arrowR" size={14} />
            </button>
          </div>
        </>}

        {/* ══════════ STEP 2 — Order Summary & Payment ══════════ */}
        {step === 2 && <>
          <div className="modal-h" style={{ justifyContent: "space-between", borderBottom: "none" }}>
            <h2 style={{ margin: 0 }}>Order Summary</h2>
            <CloseBtn />
          </div>

          <div className="modal-b" style={{ padding: "0 20px 4px" }}>
            <BackLink onClick={() => setStep(1)} />

            {/* Order table */}
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>

              {/* Single line item */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>
                  {isMulti ? `REConnect Site × ${listings.length}` : "REConnect Site — Single"}
                </span>
                <span style={{ fontWeight: 600 }}>${subtotal}.00</span>
              </div>

              {/* Summary rows */}
              {[
                { label: "Billing cycle", value: "One-time" },
                { label: "Discount",      value: `-$${discount}.00` },
                { label: "Tax (0%)",      value: `$${tax}.00` },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--muted)" }}>
                  <span>{row.label}</span>
                  <span style={{ color: "var(--ink)" }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", fontSize: 14, fontWeight: 700 }}>
                <span>Total due today</span>
                <span style={{ color: "#0F172A" }}>${total}.00</span>
              </div>
            </div>

            {/* Payment method — selectable cards */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 8 }}>Payment Method</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {PAYMENT_CARDS.map((card, i) => (
                  <label key={i} onClick={() => setSelectedCard(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: `1.5px solid ${selectedCard === i ? "#2563EB" : "var(--border)"}`, borderRadius: 9, cursor: "pointer", background: selectedCard === i ? "#F0F6FF" : "var(--surface-2)", transition: "all 0.15s" }}>
                    {/* Radio dot */}
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selectedCard === i ? "#2563EB" : "#CBD5E1"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {selectedCard === i && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB" }} />}
                    </div>
                    {/* Card icon */}
                    <div style={{ width: 36, height: 23, borderRadius: 4, background: "linear-gradient(135deg,#1e3a5f,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CardIcon />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{card.label}</div>
                      <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{card.exp}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, marginBottom: 4 }}>
              By confirming, you agree to our <a href="#" style={{ color: "#2563EB" }}>Terms of Service</a>. A receipt will be sent to <strong>sunmi@neutrinoinc.com</strong>.
            </div>
          </div>

          <div className="modal-f" style={{ gap: 8 }}>
            <button className="btn btn-secondary" onClick={() => setStep(1)} disabled={isLoading}>Cancel</button>
            <button className="btn btn-primary" style={{ background: "#2563EB", minWidth: 160 }} onClick={handlePay} disabled={isLoading}>
              {isLoading
                ? <><span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "p1spin 0.7s linear infinite", marginRight: 6 }} />Processing…</>
                : <><Icon name="card" size={14} /> Confirm &amp; Pay ${total}.00</>
              }
            </button>
          </div>
        </>}

        {/* ══════════ STEP 3 — Payment Successful ══════════ */}
        {step === 3 && <>
          <div className="modal-h" style={{ justifyContent: "space-between", borderBottom: "none" }}>
            <BackLink onClick={() => setStep(2)} />
            <CloseBtn />
          </div>

          <div className="modal-b" style={{ padding: "4px 20px 4px", textAlign: "center" }}>
            {/* Check icon */}
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "#16A34A" }}>
              <Icon name="check" size={26} stroke={2.5} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Payment Successful!</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20, lineHeight: 1.6 }}>
              {isMulti
                ? `Your ${listings.length} REConnect Sites are now active.`
                : "Your REConnect Site add-on is now active."
              } A confirmation email has been sent.
            </div>

            {/* Receipt table */}
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", marginBottom: 16, textAlign: "left" }}>
              {/* Scrollable listing rows for multi */}
              {isMulti && (
                <div style={{ maxHeight: 140, overflowY: "auto" }}>
                  {listings.map((l) => (
                    <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                      <span style={{ color: "var(--ink)", maxWidth: 260, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.address}</span>
                      <span style={{ fontWeight: 500, flexShrink: 0 }}>${priceEach}.00</span>
                    </div>
                  ))}
                </div>
              )}
              {[
                { label: "Add-on",        value: isMulti ? `REConnect Sites (${listings.length})` : "REConnect Site — Single" },
                { label: "Billing",       value: `One-time — $${total}.00` },
                { label: "Date",          value: "June 10, 2026" },
                { label: "Next billing",  value: "—" },
              ].map((row, i, arr) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--muted)" }}>
                  <span>{row.label}</span>
                  <span style={{ color: "var(--ink)", textAlign: "right", maxWidth: 240 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 14px", fontSize: 14, fontWeight: 700 }}>
                <span>Amount paid</span>
                <span style={{ color: "#0F172A" }}>${total}.00</span>
              </div>
            </div>
          </div>

          <div className="modal-f" style={{ gap: 8 }}>
            <button className="btn btn-secondary" style={{ width: "fit-content" }} onClick={onClose}>Done</button>
            {!PHASE1_HAS_PROFILE_PHOTO && (
              <button className="btn btn-primary" style={{ background: "#2563EB" }} onClick={() => setStep(4)}>
                Next Step: Add Profile Photo <Icon name="arrowR" size={14} />
              </button>
            )}
          </div>
        </>}

        {/* ══════════ STEP 4 — Add Profile Photo ══════════ */}
        {step === 4 && <>
          <div className="modal-h" style={{ justifyContent: "space-between", borderBottom: "none" }}>
            <h2 style={{ margin: 0 }}>Add Profile Photo</h2>
            <CloseBtn />
          </div>

          <div className="modal-b" style={{ padding: "0 20px 4px" }}>
            <BackLink onClick={() => setStep(3)} />

            <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>
              Optional, but highly recommended — your photo appears on your listing website and all marketing materials.
            </p>

            {/* Why photo matters */}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "10px 12px", marginBottom: 16 }}>
              <svg style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>
                <strong style={{ color: "#78350F" }}>Make a great first impression.</strong> Listings and marketing materials with an agent photo generate significantly more engagement from buyers and sellers.
              </div>
            </div>

            {/* Upload area */}
            <div onClick={() => document.getElementById('p1-photo-input').click()} style={{ border: `2px dashed ${photoSrc ? "#10B981" : "var(--border)"}`, borderRadius: 10, padding: "24px 16px", textAlign: "center", cursor: "pointer", background: photoSrc ? "#F0FDF4" : "var(--surface-2)", transition: "all 0.15s", marginBottom: 4 }}>
              <input id="p1-photo-input" type="file" accept="image/*" onChange={handlePhotoFile} style={{ display: "none" }} />
              <div style={{ width: 72, height: 72, borderRadius: "50%", border: `3px solid ${photoSrc ? "#10B981" : "#CBD5E1"}`, margin: "0 auto 12px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#F1F5F9" }}>
                {photoSrc
                  ? <img src={photoSrc} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                }
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: photoSrc ? "#16A34A" : "var(--ink)", marginBottom: 3 }}>
                {photoSrc ? "Looking great! Click to change" : "Click to upload your photo"}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>JPG, PNG — recommended 400×400px or larger</div>
            </div>
          </div>

          <div className="modal-f" style={{ gap: 8 }}>
            <button className="btn btn-secondary" onClick={onClose}>Skip for now</button>
            <button className="btn btn-primary" style={{ background: photoSrc ? "#16A34A" : "#2563EB" }} onClick={handlePhotoSave} disabled={photoUploading}>
              {photoUploading
                ? <><span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "p1spin 0.7s linear infinite", marginRight: 6 }} />Uploading…</>
                : photoSrc ? "Save Photo & Done" : "Upload a Photo"
              }
            </button>
          </div>
        </>}

      </div>
      <style>{`@keyframes p1spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ── AMPListings (Phase 1) ─────────────────────────────────────────────────────
// activatedIds / onActivateSites lifted to App level
const LISTINGS_PAGE_SIZE_P1 = 5;

const AMPListings = ({ go, selected, setSelected, onShare, activatedIds, onActivateSites }) => {
  const [tab, setTab] = React.useState("mine");
  const [noSelectionAlert, setNoSelectionAlert] = React.useState(false);
  const [alreadyActivatedAlert, setAlreadyActivatedAlert] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchRef = React.useRef(null);

  const baseList = RC_DATA.listings.filter(l => tab === "mine" ? l.owner === "me" : l.owner === "network");
  const q = search.trim().toLowerCase();
  const fullList = q
    ? baseList.filter(l =>
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.mls.toLowerCase().includes(q)
      )
    : baseList;
  const list = fullList.slice((page - 1) * LISTINGS_PAGE_SIZE_P1, page * LISTINGS_PAGE_SIZE_P1);

  React.useEffect(() => { setPage(1); }, [tab, search]);
  React.useEffect(() => { setSelected([]); setSearch(""); setSearchOpen(false); }, [tab]);
  React.useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);

  const unactivatedList = list.filter(l => !activatedIds.has(l.id));
  const allChecked = unactivatedList.length > 0 && unactivatedList.every(l => selected.includes(l.id));
  const toggleAll = () => {
    if (allChecked) setSelected(selected.filter(id => !unactivatedList.find(l => l.id === id)));
    else setSelected([...new Set([...selected, ...unactivatedList.map(l => l.id)])]);
  };
  const toggle = (id) => {
    if (activatedIds.has(id)) { setAlreadyActivatedAlert(true); return; }
    setSelected(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  };

  const handleActivateSitesBar = () => {
    if (selected.length === 0) { setNoSelectionAlert(true); return; }
    const selectedListings = RC_DATA.listings.filter(l => selected.includes(l.id) && !activatedIds.has(l.id));
    if (selectedListings.length === 0) { setNoSelectionAlert(true); return; }
    onActivateSites(selectedListings);
    setSelected([]);
  };

  return (
    <>
      <div className="page-h">
        <div>
          <h1>My Listings</h1>
          <div className="sub">Manage your single-listing marketing — websites, flyers, and QR codes.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => go("mls-info")}><Icon name="link" size={14} /> Connect MLS</button>
        </div>
      </div>

      <div className={`toolbar${searchOpen ? " search-open" : ""}`}>
        <button className="chip" onClick={toggleAll}>
          <span className={`check check-select-all ${allChecked && unactivatedList.length > 0 ? "on" : ""}`} style={{ width: 16, height: 16 }}>
            <Icon name="check" size={11} stroke={3} />
          </span>
          Select all
        </button>
        <div className="divider-v" />
        <span style={{ fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap" }}>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>{fullList.length}</span> listings
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

      {/* Share bar — "Share with network" hidden; "Activate Sites" opens modal for selection */}
      <div className="share-bar show">
        {selected.length > 0 && <span><span className="bold">{selected.length}</span> selected</span>}
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-sm" style={{ background: "#2563EB", color: "#fff" }} onClick={handleActivateSitesBar}>
            <Icon name="zap" size={13} /> Activate Sites{selected.length > 0 ? ` (${selected.length})` : ""}
          </button>
        </div>
        {selected.length > 0 && <button className="x" style={{ marginLeft: "auto" }} onClick={() => setSelected([])}><Icon name="x" size={16} /></button>}
      </div>

      {alreadyActivatedAlert && (
        <div className="modal-back" onClick={() => setAlreadyActivatedAlert(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-h">
              <h2>Already Activated</h2>
              <button className="icon-btn" onClick={() => setAlreadyActivatedAlert(false)}><Icon name="x" /></button>
            </div>
            <div className="modal-b">
              <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                This listing already has an active property website. No further activation is needed.
              </p>
            </div>
            <div className="modal-f">
              <button className="btn btn-primary" onClick={() => setAlreadyActivatedAlert(false)}>Got it</button>
            </div>
          </div>
        </div>
      )}

      {noSelectionAlert && (
        <div className="modal-back" onClick={() => setNoSelectionAlert(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-h">
              <h2>Activate Sites</h2>
              <button className="icon-btn" onClick={() => setNoSelectionAlert(false)}><Icon name="x" /></button>
            </div>
            <div className="modal-b">
              <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                Please select one or more listings first to activate their websites.
              </p>
            </div>
            <div className="modal-f">
              <button className="btn btn-primary" onClick={() => setNoSelectionAlert(false)}>Got it</button>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: 0 }}>
        {list.map((l, idx) => {
          const isActivated = activatedIds.has(l.id);
          const isFirst = idx === 0;
          return (
            <div key={l.id} className={`listing-row ${selected.includes(l.id) ? "selected" : ""}${isFirst ? " listing-row-featured" : ""}`}
              style={isFirst && !selected.includes(l.id) ? { background: "#FFF6F3" } : undefined}>
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
                  {isFirst && <span style={{ color: "#EE6D68", fontSize: 11.5, fontWeight: 600 }}>Your FREE Website</span>}
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
                <div className="price-sub">{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</div>
                <div className="price-sub" style={{ color: "var(--muted)" }}>{l.mlsName || "MLS"}</div>
                {/* Tablet/mobile: action button inline after beds/baths/sqft */}
                <div className="listing-row-mobile-btns">
                  {isActivated
                    ? <button className="btn btn-secondary btn-sm" onClick={() => go("amp-listing/" + l.id)}>
                        <Icon name="eye" size={13} /> View Detail
                      </button>
                    : <button className="btn btn-sm" style={{ background: "#2563EB", color: "#fff" }}
                        onClick={() => onActivateSites([l])}>
                        <Icon name="zap" size={13} /> Activate
                      </button>
                  }
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12.5 }}>Listed {l.added}</div>
                <div className="price-sub">Updated {l.updated}</div>
                <div style={{ marginTop: 6 }}>
                  <span className={`toggle ${isActivated ? "" : "off"}`}>
                    <span className="sw"></span>
                    {isActivated ? "Website Online" : "Website Offline"}
                  </span>
                </div>
              </div>
              <div className="row-actions">
                {isActivated ? (
                  <button className="btn btn-secondary btn-sm amp-row-btn" onClick={() => go("amp-listing/" + l.id)}>
                    <Icon name="eye" size={13} /> View Detail
                  </button>
                ) : (
                  <button className="btn btn-sm amp-row-btn" style={{ background: "#2563EB", color: "#fff" }}
                    onClick={() => go("amp-listing/" + l.id)}>
                    <Icon name="zap" size={13} /> Activate Site
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Pagination page={page} setPage={setPage} total={fullList.length} perPage={LISTINGS_PAGE_SIZE_P1} />
    </>
  );
};

// ── GetDomainModal — 4-step flow: Select → Verify → Payment → Reserved ────────
const GetDomainModal = ({ listing, onClose }) => {
  const [step, setStep] = React.useState(1); // 1=select, 2=verify, 3=payment, 4=reserved
  const [domainInput, setDomainInput] = React.useState(() => {
    const raw = (listing.address + listing.city)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") + ".com";
    return raw;
  });
  const [checkResult, setCheckResult] = React.useState(null);
  const [checking, setChecking] = React.useState(false);
  const [registrationYears, setRegistrationYears] = React.useState("1 Year");
  const [isOrdering, setIsOrdering] = React.useState(false);
  const [ccNum, setCcNum] = React.useState("");
  const [ccExp, setCcExp] = React.useState("");
  const [ccCvc, setCcCvc] = React.useState("");
  const [ccZip, setCcZip] = React.useState("");

  const pricePerYear = 20.99;

  const handleCheck = () => {
    if (!domainInput.trim()) return;
    setChecking(true);
    setCheckResult(null);
    setTimeout(() => { setChecking(false); setCheckResult("available"); }, 900);
  };

  const handleConfirmOrder = () => {
    setIsOrdering(true);
    setTimeout(() => { setIsOrdering(false); setStep(4); }, 1200);
  };

  const STEPS = [
    { key: 1, label: "SELECT" },
    { key: 2, label: "VERIFY" },
    { key: 3, label: "PAYMENT" },
    { key: 4, label: "RESERVED" },
  ];

  const StepIndicator = ({ current }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 0, fontSize: 11, fontWeight: 600 }}>
      {STEPS.map((s, i) => {
        const done = current > s.key;
        const active = current === s.key;
        return (
          <React.Fragment key={s.key}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: active ? "#2BB882" : "#F1F5F9",
                border: active ? "none" : "2px solid #CBD5E1",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: active ? "#fff" : done ? "#64748B" : "#94A3B8",
                fontSize: 11,
              }}>
                {done ? "✓" : active ? "✦" : "·"}
              </div>
              <span style={{ color: active ? "#0F172A" : "#94A3B8", letterSpacing: "0.05em" }}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ width: 20, height: 2, background: "#E2E8F0", margin: "0 3px" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const CloseBtn = () => (
    <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
  );

  const AddrRow = ({ current }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
      <span style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>{listing.address}, {listing.city}</span>
      <StepIndicator current={current} />
    </div>
  );

  const BackBtn = ({ to }) => (
    <button onClick={() => setStep(to)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12.5, color: "var(--muted)", display: "flex", alignItems: "center", gap: 3, padding: 0, marginBottom: 12 }}>
      <Icon name="chevL" size={13} /> Back
    </button>
  );

  return (
    <div className="modal-back" onClick={step === 4 ? onClose : undefined}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, width: "100%" }}>

        {/* ══ STEP 1 — Search Domain ══ */}
        {step === 1 && <>
          <div className="modal-h" style={{ justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Search Domain Names</h2>
            <CloseBtn />
          </div>
          <div className="modal-b" style={{ padding: "16px 24px 8px" }}>
            <AddrRow current={1} />
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "18px 18px 14px" }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: "#0F172A" }}>Find your web domain name.</div>
              <input
                value={domainInput}
                onChange={e => { setDomainInput(e.target.value); setCheckResult(null); }}
                onKeyDown={e => e.key === "Enter" && handleCheck()}
                style={{ width: "100%", boxSizing: "border-box", border: "1px solid #CBD5E1", borderRadius: 8, padding: "9px 14px", fontSize: 13.5, color: "#0F172A", outline: "none", background: "#fff", marginBottom: 12 }}
                placeholder="yourdomain.com"
              />
              <button className="btn btn-primary" onClick={handleCheck} disabled={checking} style={{ background: "#2563EB", borderRadius: 999, gap: 6 }}>
                {checking ? <><span style={{ fontSize: 12 }}>●●●</span> Checking…</> : <><Icon name="search" size={13} /> Check</>}
              </button>
              {checkResult === "available" && (
                <div style={{ marginTop: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                    <Icon name="check" size={11} stroke={3} />
                  </div>
                  <span style={{ fontSize: 13, color: "#166534", fontWeight: 500 }}>{domainInput} is available.</span>
                </div>
              )}
              {checkResult === "taken" && (
                <div style={{ marginTop: 12, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#991B1B" }}>
                  {domainInput} is already taken. Try a different name.
                </div>
              )}
            </div>
            {checkResult === "available" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 4px", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#0F172A", fontWeight: 500 }}>{domainInput}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1E3A5F", marginTop: 2 }}>${pricePerYear} USD/yr</div>
                </div>
                <button className="btn btn-primary" onClick={() => setStep(2)} style={{ background: "#2563EB", borderRadius: 999, whiteSpace: "nowrap" }}>
                  Reserve Now
                </button>
              </div>
            )}
          </div>
          <div className="modal-f" style={{ justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </>}

        {/* ══ STEP 2 — Verify Domain ══ */}
        {step === 2 && <>
          <div className="modal-h" style={{ justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Verify Domain Name</h2>
            <CloseBtn />
          </div>
          <div className="modal-b" style={{ padding: "16px 24px 8px" }}>
            <BackBtn to={1} />
            <AddrRow current={2} />
            <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A", marginBottom: 2 }}>{listing.address}</div>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 10 }}>{listing.city}</div>
            <a href="#" style={{ fontSize: 13, color: "#1D4ED8", fontWeight: 500, wordBreak: "break-all", display: "block", marginBottom: 18, textDecoration: "none" }}>{domainInput}</a>

            <div style={{ fontSize: 12, color: "#475569", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Domain Registration</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <select value={registrationYears} onChange={e => setRegistrationYears(e.target.value)} style={{ border: "1px solid #CBD5E1", borderRadius: 8, padding: "6px 10px", fontSize: 13, background: "#fff", color: "#0F172A", flex: 1, marginRight: 10 }}>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
              </select>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap" }}>${pricePerYear} USD/yr</span>
            </div>

            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 10, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748B", marginBottom: 4 }}>
                <span>Subtotal</span><span>${pricePerYear}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
                <span>Total (USD)</span><span>${pricePerYear}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "10px 12px" }}>
              <svg style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span style={{ fontSize: 12, color: "#92400E", lineHeight: 1.55 }}>
                Please check the spelling — once a domain is purchased, it cannot be reversed!
              </span>
            </div>
          </div>
          <div className="modal-f" style={{ justifyContent: "flex-end", gap: 8 }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setStep(3)} style={{ background: "#2563EB", borderRadius: 999 }}>
              Continue <Icon name="arrowR" size={13} />
            </button>
          </div>
        </>}

        {/* ══ STEP 3 — Payment Info ══ */}
        {step === 3 && <>
          <div className="modal-h" style={{ justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Payment Info</h2>
            <CloseBtn />
          </div>
          <div className="modal-b" style={{ padding: "16px 24px 8px" }}>
            <BackBtn to={2} />
            <AddrRow current={3} />

            {/* Order summary */}
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 2 }}>{domainInput}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>
                    {registrationYears} × ${pricePerYear}/yr
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap", marginLeft: 12 }}>
                  ${(pricePerYear * parseInt(registrationYears)).toFixed(2)} USD
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Credit Card Number</span>
            </div>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <input value={ccNum} onChange={e => setCcNum(e.target.value)} placeholder="1234 1234 1234 1234" maxLength={19} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #CBD5E1", borderRadius: 8, padding: "9px 80px 9px 12px", fontSize: 13, background: "#fff" }} />
              <button style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "#000", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                Autofill <Icon name="arrowR" size={11} />
              </button>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "#475569", marginBottom: 5, fontWeight: 500 }}>Expiration</div>
                <input value={ccExp} onChange={e => setCcExp(e.target.value)} placeholder="MM / YY" style={{ width: "100%", boxSizing: "border-box", border: "1px solid #CBD5E1", borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "#475569", marginBottom: 5, fontWeight: 500 }}>CVC</div>
                <input value={ccCvc} onChange={e => setCcCvc(e.target.value)} placeholder="CVC" maxLength={4} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #CBD5E1", borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: "#475569", marginBottom: 5, fontWeight: 500 }}>Zip Code</div>
              <input value={ccZip} onChange={e => setCcZip(e.target.value)} placeholder="Zip" maxLength={10} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #CBD5E1", borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 4, opacity: 0.7 }}>
              {["Visa", "MC", "Amex", "Disc"].map(b => (
                <div key={b} style={{ width: 36, height: 24, borderRadius: 4, background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#64748B" }}>{b}</div>
              ))}
            </div>
          </div>
          <div className="modal-f" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#94A3B8" }}>Secured with SSL encryption.</span>
            <button className="btn btn-primary" onClick={handleConfirmOrder} disabled={isOrdering} style={{ background: "#2563EB", borderRadius: 999, justifyContent: "center" }}>
              {isOrdering ? "Processing…" : "Confirm Order"}
            </button>
          </div>
        </>}

        {/* ══ STEP 4 — Reserved / Success ══ */}
        {step === 4 && <>
          <div className="modal-h" style={{ justifyContent: "space-between", borderBottom: "none" }}>
            <div />
            <CloseBtn />
          </div>
          <div className="modal-b" style={{ padding: "0 32px 24px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <StepIndicator current={4} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#16A34A" }}>
                <Icon name="check" size={26} stroke={2.5} />
              </div>
              <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Domain Reserved!</h2>
              <p style={{ fontSize: 14, color: "#475569", margin: "0 0 20px", lineHeight: 1.6 }}>
                <strong style={{ color: "#1D4ED8" }}>{domainInput}</strong> has been reserved for<br />
                <strong>{listing.address}</strong>.
              </p>
              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 18px", textAlign: "left", marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "#64748B" }}>Your domain will be active within 24–48 hours. You can manage it under <strong>Listing Settings</strong>.</div>
              </div>
              <button className="btn btn-primary" onClick={onClose} style={{ background: "#2563EB", borderRadius: 999 }}>
                Done
              </button>
            </div>
          </div>
        </>}

      </div>
    </div>
  );
};

// ── Phase1 Dashboard override ─────────────────────────────────────────────────
const Dashboard = ({ go }) => {
  const myListings = RC_DATA.listings.filter(l => l.owner === "me");
  const firstListing = myListings[0];
  const sitesReady = myListings.length;
  const [domainModalListing, setDomainModalListing] = React.useState(null);

  return (
    <>
      <div className="page-h dash-page-h">
        <div>
          <h1>Good Afternoon, Mike</h1>
          <div className="sub">Here's what's happening today</div>
        </div>
      </div>

      {/* All 4 modules in one grid — enables mobile reorder via CSS order */}
      <div className="dash-grid">
        {/* 1 — Your Property Websites */}
        <div className="dash-promo-card dash-promo-websites dash-order-1">
          <div className="dash-device-wrap">
            <img src="uploads/swl-graphic.png" alt="Property website preview" className="dash-swl-graphic" />
          </div>
          <div className="dash-promo-content">
            <h2 className="dash-promo-title">Your Property Websites in one click</h2>
            <p className="dash-promo-desc">
              Launch your own branded property website and attract more buyers. Showcase your listings, build credibility, and grow your personal brand online.
            </p>
            <div className="dash-sites-ready">
              <span className="dash-dot"></span>
              {sitesReady} listing sites ready to activate
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn dash-promo-btn" onClick={() => go("amp")}>
                → Activate Your Sites
              </button>
              <button className="btn" onClick={() => window.open("https://demo.slw.homes/", "_blank")} style={{ background: "rgba(255,255,255,0.7)", color: "#1D4ED8", border: "1.5px solid #BFDBFE", borderRadius: 999, padding: "10px 22px", fontWeight: 600, fontSize: 14 }}>
                View Website Demo
              </button>
            </div>
          </div>
        </div>

        {/* 2 — Design with Canva */}
        <div className="dash-promo-card dash-promo-canva dash-order-3">
          <div className="dash-canva-logo">
            <img src="uploads/Canva-Logo.svg" alt="Canva" className="dash-canva-logo-img" />
          </div>
          <h2 className="dash-promo-title">Design with Canva</h2>
          <p className="dash-promo-desc">
            Your listing data is now connected to Canva. Create stunning marketing materials directly in Canva with your data. Also access templates available for you.
          </p>
          <div className="dash-canva-actions">
            <button className="btn dash-canva-btn-outline" onClick={() => window.open("https://www.canva.com/your-apps/AAGE_hOiH5U/reconnect", "_blank")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Open in Canva
            </button>
            <button className="btn dash-canva-btn-filled" onClick={() => go("canva")}>View Available Templates</button>
          </div>
        </div>

        {/* 3 — Your Property Websites (listing results) */}
        <div className="card dash-free-website dash-order-2">
          <div className="dash-free-header">
            <div className="dash-free-title-row">
              <h3 className="dash-free-title" style={{ color: "var(--ink)", fontSize: 20 }}>Your Property Websites</h3>
            </div>
          </div>

          {myListings.slice(0, 3).map((l, i) => (
            <div key={l.id} className="dash-free-listing" style={{ borderBottom: i < Math.min(myListings.length, 3) - 1 ? "1px solid var(--border-2)" : "none" }}>
              <div className="dash-free-listing-thumb" style={{ backgroundImage: `url(${l.img})`, cursor: "pointer" }} onClick={() => go("amp-listing/" + l.id)}></div>
              <div className="dash-free-listing-info">
                <div className="dash-free-address" style={{ cursor: "pointer" }} onClick={() => go("amp-listing/" + l.id)}>{l.address}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <a href="#" className="link" style={{ fontSize: 13 }}>{l.mls}.rsir.homes</a>
                  <span className="dash-site-live-badge" style={{ background: "none", border: "none", padding: 0, gap: 4 }}>
                    <span className="dash-live-dot"></span>
                    <span style={{ fontSize: 11.5, fontWeight: 500, color: "#16A34A" }}>Website Live</span>
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <a href="#" style={{ fontSize: 12, fontWeight: 600, color: "#3B82F6", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }} onMouseEnter={e => e.currentTarget.style.color="#0e1e3d"} onMouseLeave={e => e.currentTarget.style.color="#3B82F6"} onClick={e => { e.preventDefault(); setDomainModalListing(l); }}><Icon name="external-link" size={12} /> Purchase a custom URL</a>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }} onClick={() => go("amp-listing/" + l.id)}>View Details</button>
            </div>
          ))}

          <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border-2)" }}>
            <button className="btn dash-promo-btn" onClick={() => go("amp")}>View All Your Listings</button>
          </div>
        </div>

        {/* 4 — Your Stats */}
        <div className="card dash-stats-card dash-order-4">
          <div className="dash-stats-header">
            <h3 className="dash-stats-title">Your Stats</h3>
          </div>
          <div className="dash-stats-list">
            <div className="dash-stat-row">
              <div className="dash-stat-icon blue">
                <Icon name="listing" size={16} />
              </div>
              <div className="dash-stat-body">
                <div className="dash-stat-value">6</div>
                <div className="dash-stat-label">Total Listings</div>
                <div className="dash-stat-meta">2 new listings</div>
              </div>
            </div>
            <div className="dash-stat-row">
              <div className="dash-stat-icon blue-light">
                <Icon name="site" size={16} />
              </div>
              <div className="dash-stat-body">
                <div className="dash-stat-value">3</div>
                <div className="dash-stat-label">Active Websites</div>
                <div className="dash-stat-meta">1 new active website</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {domainModalListing && (
        <GetDomainModal listing={domainModalListing} onClose={() => setDomainModalListing(null)} />
      )}
    </>
  );
};

// Push overrides into window so App picks them up
Object.assign(window, { Sidebar, AMPListings, ActivateSiteModal, GetDomainModal, Dashboard });
