/* global React, RC_DATA, Icon, fmtPrice */

/* ── Add Asset Modal ─────────────────────────────────────────────────────────── */

/* Simple inline SVG line icons for modal type buttons */
const TypeIcon = ({ type }) => {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "photos") return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
  if (type === "social") return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  );
  if (type === "doc") return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
  if (type === "link") return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
  return null;
};

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

const ASSET_TYPES = [
  { k: "photos", label: "Photos & Videos" },
  { k: "social", label: "Social Banner"   },
  { k: "doc",    label: "Document"        },
  { k: "link",   label: "Link"            },
];

const SOCIAL_PLATFORMS = [
  { k: "instagram", label: "Instagram",  color: "#E1306C", bg: "#FDF2F8" },
  { k: "facebook",  label: "Facebook",   color: "#1877F2", bg: "#EFF6FF" },
  { k: "x",         label: "X (Twitter)",color: "#0F172A", bg: "#F8FAFC" },
  { k: "linkedin",  label: "LinkedIn",   color: "#0A66C2", bg: "#EFF6FF" },
  { k: "tiktok",    label: "TikTok",     color: "#010101", bg: "#F8FAFC" },
  { k: "youtube",   label: "YouTube",    color: "#FF0000", bg: "#FEF2F2" },
];

const AddAssetModal = ({ s, onClose }) => {
  const [type, setType]             = React.useState("photos");
  const [platform, setPlatform]     = React.useState(null);
  const [socialMethod, setSocMeth]  = React.useState("upload");
  const [linkUrl, setLinkUrl]       = React.useState("");
  const [linkTitle, setLinkTitle]   = React.useState("");
  const [socialUrl, setSocialUrl]   = React.useState("");

  const addLabel = ASSET_TYPES.find(t => t.k === type)?.label;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Asset</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Type selector */}
          <div className="modal-section-label">Asset type</div>
          <div className="asset-type-grid">
            {ASSET_TYPES.map(t => (
              <button key={t.k} className={`asset-type-btn ${type === t.k ? "active" : ""}`} onClick={() => setType(t.k)}>
                <TypeIcon type={t.k} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* ── Photos & Videos ── */}
          {type === "photos" && (
            <div className="upload-drop-zone">
              <div className="udz-icon"><UploadIcon /></div>
              <div className="udz-title">Drop photos or videos here</div>
              <div className="udz-sub">JPG, PNG, HEIC, MP4, MOV — up to 500 MB per file</div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>Browse files</button>
            </div>
          )}

          {/* ── Social Banner ── */}
          {type === "social" && (
            <>
              <div className="modal-section-label">Social media platform</div>
              <select className="modal-select" value={platform || ""} onChange={e => setPlatform(e.target.value || null)}>
                <option value="">Select platform…</option>
                {SOCIAL_PLATFORMS.map(p => (
                  <option key={p.k} value={p.k}>{p.label}</option>
                ))}
              </select>

              <div className="modal-section-label" style={{ marginTop: 18 }}>Add content</div>
              <div className="seg" style={{ marginBottom: 16, width: "fit-content" }}>
                <button className={socialMethod === "upload" ? "active" : ""} onClick={() => setSocMeth("upload")}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 5 }}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                  Upload image
                </button>
                <button className={socialMethod === "link" ? "active" : ""} onClick={() => setSocMeth("link")}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 5 }}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Add link
                </button>
              </div>

              {socialMethod === "upload" ? (
                <div className="upload-drop-zone">
                  <div className="udz-icon"><UploadIcon /></div>
                  <div className="udz-title">Drop your image here</div>
                  <div className="udz-sub">PNG, JPG, GIF — recommended size varies by platform</div>
                  <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>Browse files</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Post or profile URL</label>
                    <input placeholder={platform === "instagram" ? "https://www.instagram.com/p/…" : platform === "facebook" ? "https://www.facebook.com/…" : "https://…"}
                      value={socialUrl} onChange={e => setSocialUrl(e.target.value)} />
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Label <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></label>
                    <input placeholder="e.g. Just Listed post, Open House story" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Document ── */}
          {type === "doc" && (
            <div className="upload-drop-zone">
              <div className="udz-icon"><UploadIcon /></div>
              <div className="udz-title">Drop a document here</div>
              <div className="udz-sub">PDF, DOC, DOCX — up to 50 MB</div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>Browse files</button>
            </div>
          )}

          {/* ── Link ── */}
          {type === "link" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="field" style={{ margin: 0 }}>
                <label>URL</label>
                <input placeholder="https://my.matterport.com/show/?m=…"
                  value={linkUrl} onChange={e => setLinkUrl(e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title</label>
                <input placeholder="e.g. Matterport 3D Tour"
                  value={linkTitle} onChange={e => setLinkTitle(e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Type <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></label>
                <select>
                  <option>Virtual Tour</option>
                  <option>Floor Plan</option>
                  <option>Property Website</option>
                  <option>Video</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-blue"><Icon name="plus" size={13} /> Add {addLabel}</button>
        </div>
      </div>
    </div>
  );
};

/* ── Spotlight social banner preview ─────────────────────────────────────────── */
const SpotlightBanner = ({ type, thumbs, title }) => {
  const img = thumbs[0];
  const img2 = thumbs[1] || thumbs[0];
  const img3 = thumbs[2] || thumbs[0];
  const shortTitle = title.length > 28 ? title.slice(0, 26) + "…" : title;

  if (type === "Square Post") return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: "8px", border: "1px solid rgba(255,255,255,0.5)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, color: "#fff" }}>
        <div style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.75, marginBottom: 3 }}>Featured Collection</div>
        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{shortTitle}</div>
        <div style={{ fontSize: 8, opacity: 0.7, marginTop: 2 }}>Realogics Sotheby's International Realty</div>
      </div>
      <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.92)", borderRadius: 3, padding: "2px 7px", fontSize: 8, fontWeight: 700, color: "#0F172A", letterSpacing: "0.05em" }}>RSIR</div>
    </div>
  );

  if (type === "Instagram Story") return (
    <div style={{ width: "100%", height: "100%", background: "#0F1F3A", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "10px 12px 6px", flexShrink: 0 }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Curated Collection</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginTop: 2 }}>{shortTitle}</div>
      </div>
      <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", flex: 1, gap: 2, padding: "0 0 8px" }}>
        <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <img src={img2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src={img3} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      <div style={{ padding: "6px 12px 10px", textAlign: "center", flexShrink: 0 }}>
        <div style={{ fontSize: 8.5, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Realogics Sotheby's</div>
      </div>
    </div>
  );

  if (type === "Facebook Cover") return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
        <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <img src={img2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <img src={img3} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(9,20,40,0.55)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#fff", textAlign: "center" }}>
        <div style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.75 }}>Exclusive Properties</div>
        <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2, marginTop: 3 }}>{shortTitle}</div>
      </div>
    </div>
  );

  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <img src={img} alt="" style={{ width: "100%", flex: 1, objectFit: "cover" }} />
      <div style={{ padding: "7px 10px 8px", borderTop: "2px solid #0F1F3A", flexShrink: 0 }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: "#0F1F3A", textTransform: "uppercase", letterSpacing: "0.07em" }}>Featured</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>{shortTitle}</div>
        <div style={{ fontSize: 7.5, color: "#64748b", marginTop: 1 }}>Realogics Sotheby's</div>
      </div>
    </div>
  );
};

/* ── Asset Card (new style) ──────────────────────────────────────────────────── */
const AssetCard2 = ({ id, badge, badgeColor, preview, name, sub, isPro, selected, onToggle, onEdit }) => (
  <div className={`asset-card2 ${selected ? "selected" : ""}`}>
    <div className="ac2-badge" style={badgeColor ? { background: badgeColor } : {}}>{badge}</div>
    <div className="ac2-check" onClick={e => { e.stopPropagation(); onToggle(id); }}>
      {selected ? <Icon name="check" size={10} /> : null}
    </div>
    <div className="ac2-preview" onClick={() => onToggle(id)}>
      {preview}
    </div>
    <div className="ac2-footer">
      <div className="ac2-name">{name}</div>
      {sub && <div className="ac2-sub">{sub}</div>}
    </div>
    <div className="ac2-actions">
      {onEdit && <button className="ac2-btn" title="Edit" onClick={e => e.stopPropagation()}><Icon name="edit" size={12} /></button>}
      {isPro && <button className="ac2-btn" title="Share" onClick={e => e.stopPropagation()}><Icon name="share" size={12} /></button>}
      <button className="ac2-btn" title="Download" onClick={e => e.stopPropagation()}><Icon name="download" size={12} /></button>
    </div>
  </div>
);

/* ── Spotlight List Row ────────────────────────────────────────────────────────── */
const SpotlightRow = ({ s, onClick }) => (
  <div className="show-row" onClick={onClick}>
    <div className="show-row-thumb" style={{ backgroundImage: `url(${s.cover})` }}>
      <div className="show-row-thumbs">
        {s.thumbs.slice(0, 3).map((t, i) => <i key={i} style={{ backgroundImage: `url(${t})` }}></i>)}
      </div>
    </div>
    <div className="show-row-meta">
      <div className="show-row-top">
        {s.status === "draft"
          ? <span className="pill" style={{ background: "var(--amber-50)", color: "#b45309", border: "1px solid #fcd34d", fontSize: 11 }}>Draft</span>
          : <span className="pill pill-green" style={{ fontSize: 11 }}>Published</span>
        }
        {s.sharedBy && <span className="pill pill-blue" style={{ fontSize: 11 }}>Shared by {s.sharedBy}</span>}
      </div>
      <h3 className="show-row-title">{s.sharedBy ? s.title.replace(/ — .+$/, '').trim() : s.title}</h3>
      <p className="show-row-desc">{s.description}</p>
      <div className="show-row-stats">
        <span><Icon name="image" size={12} /> {s.count} listings</span>
        <span><Icon name="eye" size={12} /> {s.views.toLocaleString()} views</span>
        <span><Icon name="star" size={12} /> {s.leads} leads</span>
      </div>
    </div>
    <div className="show-row-dates">
      <div><span className="show-row-date-label">Created</span><span className="show-row-date-val">{s.created}</span></div>
      <div><span className="show-row-date-label">Last updated</span><span className="show-row-date-val">{s.updated}</span></div>
    </div>
    <button className="btn btn-secondary show-row-btn" onClick={e => { e.stopPropagation(); onClick(); }}>
      View Spotlight <Icon name="arrowR" size={13} />
    </button>
  </div>
);

/* ── Spotlights list page ──────────────────────────────────────────────────────── */
const SHOWCASES_PAGE_SIZE = 5;

const Spotlights = ({ go, onShare }) => {
  const [tab, setTab] = React.useState("mine");
  const [page, setPage] = React.useState(1);

  const fullList = RC_DATA.spotlights.filter(s => tab === "mine" ? s.owner === "me" : s.owner === "network");
  const list = fullList.slice((page - 1) * SHOWCASES_PAGE_SIZE, page * SHOWCASES_PAGE_SIZE);

  React.useEffect(() => { setPage(1); }, [tab]);

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Spotlights</h1>
          <div className="sub">Bundle multiple listings into a single shareable site, slideshow, or embed.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" onClick={() => go("new-spotlight")}><Icon name="plus" size={14} /> Add Spotlight</button>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>
          Your Spotlights <span className="count">{RC_DATA.spotlights.filter(s => s.owner === "me").length}</span>
        </button>
        <button className={`tab ${tab === "network" ? "active" : ""}`} onClick={() => setTab("network")}>
          My Network's Spotlights <span className="count">{RC_DATA.spotlights.filter(s => s.owner === "network").length}</span>
        </button>
      </div>

      <div className="toolbar">
        <span className="muted" style={{ fontSize: 12.5 }}><span className="bold" style={{ color: "var(--ink)" }}>{fullList.length} spotlights</span></span>
        <button className="chip" style={{ marginLeft: "auto" }}><Icon name="filter" size={13} /><span className="chip-label"> Filter <Icon name="chevD" size={11} /></span></button>
        <button className="chip"><Icon name="sortUD" size={13} /><span className="chip-label"> Sort: Most viewed <Icon name="chevD" size={11} /></span></button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {list.map(s => (
          <SpotlightRow key={s.id} s={s} onClick={() => go("spotlight/" + s.id)} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} total={fullList.length} perPage={SHOWCASES_PAGE_SIZE} />
    </>
  );
};

/* ── Embed Code Panel ────────────────────────────────────────────────────────── */
const EmbedCodePanel = ({ s }) => {
  const [layout, setLayout] = React.useState("gallery");
  return (
    <div className="two-col">
      <div className="card aside-card">
        <h3>Embed on your site</h3>
        <p className="muted" style={{ marginTop: -6 }}>Paste this snippet anywhere in your HTML to render the spotlight.</p>
        <div className="seg" style={{ marginBottom: 12 }}>
          {["gallery", "slideshow", "card"].map(k => (
            <button key={k} className={layout === k ? "active" : ""} onClick={() => setLayout(k)}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
        <div className="embed">
          {`<`}<span className="k">script</span>{` `}<span className="a">src</span>={`"`}<span className="s">https://embed.reconnect.app/v1.js</span>{`"`}{` `}<span className="a">async</span>{`></`}<span className="k">script</span>{`>`}<br/>
          {`<`}<span className="k">div</span>{` `}<span className="a">data-rc-spotlight</span>={`"`}<span className="s">{s.id.toLowerCase()}</span>{`"`}{` `}<span className="a">data-rc-layout</span>={`"`}<span className="s">{layout}</span>{`"`}{`></`}<span className="k">div</span>{`>`}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn btn-secondary btn-sm"><Icon name="copy" size={12} /> Copy snippet</button>
          <button className="btn btn-secondary btn-sm"><Icon name="link" size={12} /> Get share link</button>
        </div>
      </div>
      <div className="card aside-card">
        <h3>Live preview</h3>
        {layout === "card" ? (
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", background: "#fff" }}>
            <div style={{ backgroundImage: `url(${s.cover})`, backgroundSize: "cover", backgroundPosition: "center", aspectRatio: "16/9" }}></div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{s.count} listings · {s.views.toLocaleString()} views</div>
            </div>
          </div>
        ) : layout === "slideshow" ? (
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", aspectRatio: "16/9", position: "relative" }}>
            <div style={{ backgroundImage: `url(${s.cover})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%" }}></div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}></div>
            <div style={{ position: "absolute", bottom: 10, left: 12, color: "#fff", fontSize: 12, fontWeight: 600 }}>{s.title}</div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", pointerEvents: "none" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.8)", display: "grid", placeItems: "center", fontSize: 10 }}>‹</div>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.8)", display: "grid", placeItems: "center", fontSize: 10 }}>›</div>
            </div>
          </div>
        ) : (
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", aspectRatio: "1 / 1", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4, background: "#fff", padding: 4 }}>
            {s.thumbs.concat(s.thumbs).slice(0, 4).map((t, i) => <div key={i} style={{ backgroundImage: `url(${t})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>)}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Spotlight Detail ─────────────────────────────────────────────────────────── */
const SpotlightDetail = ({ id, go, onShare }) => {
  const s = RC_DATA.spotlights.find(x => x.id === id) || RC_DATA.spotlights[0];
  const isOwner = s.owner === "me";
  const [tab, setTab] = React.useState("assets");
  const [pageStatus, setPageStatus] = React.useState(s.status || "published");
  const [showAddModal, setShowAddModal] = React.useState(false);
  const includedListings = RC_DATA.listings.slice(0, s.count);

  return (
    <>
      {showAddModal && <AddAssetModal s={s} onClose={() => setShowAddModal(false)} />}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("spotlights")}><Icon name="chevL" size={14} /> Back to spotlights</button>
      </div>

      {/* ── Compact header — no hero banner ── */}
      <div className="sdhdr">
        <div className="sdhdr-main">
          <div className="sdhdr-thumb" style={{ backgroundImage: `url(${s.cover})` }}></div>
          <div className="sdhdr-content">
            <div className="sdhdr-top-row">
              <span className="pill pill-green" style={{ fontSize: 11 }}>Spotlight</span>
              {!isOwner && s.sharedBy && (
                <span className="pill pill-blue" style={{ fontSize: 11 }}>Shared by {s.sharedBy}</span>
              )}
            </div>
            <h1 className="sdhdr-title">{s.title}</h1>
            <p className="sdhdr-desc">{s.description}</p>
            <div className="sdhdr-stats">
              <span><Icon name="eye" size={12} /> {s.views.toLocaleString()} views</span>
              <span><Icon name="star" size={12} /> {s.leads} leads</span>
              <span style={{ color: "var(--muted-2)" }}>·</span>
              <span>{s.count} listings</span>
            </div>
            <div className="sdhdr-actions">
              <button className="btn btn-secondary btn-sm"><Icon name="eye" size={13} /> Preview</button>
              {isOwner && (pageStatus === "published"
                ? <button className="btn btn-primary btn-sm" onClick={() => onShare("spotlight")}><Icon name="share" size={13} /> Share</button>
                : <button className="btn btn-secondary btn-sm" style={{ opacity: 0.55 }} disabled><Icon name="share" size={13} /> Share</button>
              )}
              {!isOwner && (
                <button className="btn btn-secondary btn-sm" style={{ color: "var(--red-500)", borderColor: "var(--red-200)" }}>
                  <Icon name="trash" size={13} /> Remove Share
                </button>
              )}
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
          <div className="sds-meta-row"><span>Created</span><strong>{s.created}</strong></div>
          <div className="sds-meta-row"><span>Last updated</span><strong>{s.updated}</strong></div>
          <div className="sds-meta-row"><span>Listings</span><strong>{s.count}</strong></div>
          {isOwner && (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="tabs">
        <button className={`tab ${tab === "assets" ? "active" : ""}`} onClick={() => setTab("assets")}>Assets</button>
        <button className={`tab ${tab === "embed" ? "active" : ""}`} onClick={() => setTab("embed")}>Embed Code</button>
        <button className={`tab ${tab === "listings" ? "active" : ""}`} onClick={() => setTab("listings")}>Listings <span className="count">{s.count}</span></button>
        {isOwner && <button className={`tab ${tab === "shared" ? "active" : ""}`} onClick={() => setTab("shared")}>Shared With</button>}
        {isOwner && <button className={`tab ${tab === "settings" ? "active" : ""}`} onClick={() => setTab("settings")}>Settings</button>}
      </div>

      {tab === "assets" && <AssetsTab s={s} isPro onAdd={isOwner ? () => setShowAddModal(true) : null} />}

      {tab === "embed" && <EmbedCodePanel s={s} />}

      {tab === "listings" && (
        <div className="card" style={{ padding: 0 }}>
          {includedListings.map(l => (
            <div key={l.id} className="listing-row" style={{ gridTemplateColumns: "108px 2fr 1fr 1fr auto", cursor: "pointer" }}
              onClick={() => go("listing/" + l.id)}>
              <div className="thumb" style={{ backgroundImage: `url(${l.img})` }}></div>
              <div className="listing-meta">
                <div className="status"><span className="dot"></span>{l.status}</div>
                <h3>{l.address}</h3>
                <div className="sub"><span><Icon name="location" size={11} /> {l.city}</span></div>
              </div>
              <div><div className="price">{fmtPrice(l.price)}</div><div className="price-sub">{l.beds} bd · {l.baths} ba</div></div>
              <div><div style={{ fontSize: 12.5 }}>{l.photos} HD photos</div><div className="price-sub">Order #{includedListings.indexOf(l) + 1}</div></div>
              <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); go("listing/" + l.id); }}>View</button>
            </div>
          ))}
          {isOwner && (
            <div style={{ padding: 16, borderTop: "1px solid var(--border-2)" }}>
              <button className="btn btn-secondary"><Icon name="plus" size={13} /> Add listings to spotlight</button>
            </div>
          )}
        </div>
      )}

      {tab === "shared" && (
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="bold" style={{ fontSize: 13 }}>{RC_DATA.network.filter(n => !n.pending).length} people have access</span>
            {isOwner && <button className="btn btn-primary btn-sm"><Icon name="share" size={12} /> Share with more</button>}
          </div>
          {RC_DATA.network.filter(n => !n.pending).map(n => (
            <div key={n.id} className="shared-row">
              <div className="ava" style={{ backgroundImage: `url(${n.ava})` }}></div>
              <div className="info"><div className="name">{n.name}</div><div className="role">{n.role}</div></div>
              <div className="date">Shared Apr {10 + parseInt(n.id.replace("N",""))} · Can view</div>
              {isOwner && <button className="btn btn-secondary btn-sm">Remove</button>}
            </div>
          ))}
        </div>
      )}

      {tab === "settings" && (
        <div className="card aside-card">
          <div className="field"><label>Spotlight title</label><input defaultValue={s.title} /></div>
          <div className="field"><label>Subtitle</label><input placeholder="e.g. Presented by Sarah Chen · RSIR" /></div>
          <div className="field">
            <label>Description</label>
            <textarea rows={3} defaultValue={s.description} style={{ resize: "vertical" }} />
          </div>
          <div className="field">
            <label>Short description <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></label>
            <textarea rows={2} placeholder="A brief one-liner shown in cards and search results…" style={{ resize: "vertical" }} />
          </div>
          <div className="field"><label>Custom URL</label><input defaultValue={`reconnect.app/s/${s.id.toLowerCase()}`} /></div>
          <div className="field">
            <label>Status</label>
            <select value={pageStatus} onChange={e => setPageStatus(e.target.value)}>
              <option value="published">Published — shareable with others</option>
              <option value="draft">Draft — only visible to you</option>
            </select>
          </div>
          <div className="field"><label>Visibility</label><select><option>Anyone with link</option><option>Network only</option><option>Private</option></select></div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
            <button className="btn btn-primary btn-sm">Save changes</button>
          </div>
          <div className="danger-zone">
            <div className="danger-zone-title">Danger zone</div>
            <div className="danger-zone-row">
              <div className="danger-zone-desc">
                Permanently delete this spotlight and all its assets. This action cannot be undone.
              </div>
              <button className="btn-danger"><Icon name="trash" size={13} /> Delete Spotlight</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ── Assets Tab ──────────────────────────────────────────────────────────────── */
const AssetsTab = ({ s, isPro, onAdd, addLabel }) => {
  const [filter, setFilter] = React.useState("all");
  const [selected, setSelected] = React.useState(new Set());
  const [showShareModal, setShowShareModal] = React.useState(false);

  const toggle = (id) => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const clearSelection = () => setSelected(new Set());

  const BADGE_PHOTO = { label: "PHOTO", color: "#2563EB" };
  const BADGE_VIDEO = { label: "VIDEO", color: "#7C3AED" };
  const BADGE_PDF   = { label: "PDF", color: "#DC2626" };

  const photos = [
    { id: "photo-0", name: "Hero — Front Elevation", sub: "4.2 MB · 4032×3024", img: s.thumbs[0], ...BADGE_PHOTO },
    { id: "photo-1", name: "Living Room Wide", sub: "3.8 MB · 4032×3024", img: s.thumbs[1] || s.thumbs[0], ...BADGE_PHOTO },
    { id: "photo-2", name: "Kitchen Detail", sub: "3.1 MB · 4032×3024", img: s.thumbs[2] || s.thumbs[0], ...BADGE_PHOTO },
    { id: "photo-3", name: "Master Suite", sub: "3.6 MB · 4032×3024", img: s.thumbs[0], ...BADGE_PHOTO },
    { id: "photo-4", name: "Backyard Drone", sub: "5.1 MB · 5472×3648", img: s.thumbs[1] || s.thumbs[0], ...BADGE_PHOTO },
    { id: "photo-5", name: "Twilight Exterior", sub: "4.8 MB · 4032×3024", img: s.thumbs[2] || s.thumbs[0], ...BADGE_PHOTO },
  ];
  const videos = [
    { id: "video-0", name: "Property Walkthrough", sub: "1:42 · 184 MB · 1080p", img: s.thumbs[0], ...BADGE_VIDEO, isVideo: true },
    { id: "video-1", name: "Drone Aerial Tour", sub: "0:48 · 92 MB · 4K", img: s.thumbs[1] || s.thumbs[0], ...BADGE_VIDEO, isVideo: true },
  ];
  const SOCIAL_ITEMS = [
    { id: "social-0", name: "Square Post", sub: "Instagram + Facebook", type: "Square Post", label: "INSTAGRAM", color: "#E1306C" },
    { id: "social-1", name: "Instagram Story", sub: "Instagram Story", type: "Instagram Story", label: "STORY", color: "#E1306C" },
    { id: "social-2", name: "Facebook Cover", sub: "Facebook", type: "Facebook Cover", label: "FACEBOOK", color: "#1877F2" },
    { id: "social-3", name: "X Post", sub: "X / Twitter", type: "X Post", label: "X", color: "#000" },
  ];
  const docs = [
    { id: "doc-0", name: "Spotlight Brochure.pdf", sub: "12 pages · 8.4 MB", ...BADGE_PDF },
    { id: "doc-1", name: "Listing Comparison.pdf", sub: "4 pages · 1.2 MB", ...BADGE_PDF },
    { id: "doc-2", name: "Disclosures Packet.pdf", sub: "28 pages · 4.6 MB", ...BADGE_PDF },
  ];

  const allAssets = [...photos, ...videos, ...SOCIAL_ITEMS, ...docs];
  const visibleAssets = filter === "all" ? allAssets
    : filter === "photos" ? photos
    : filter === "videos" ? videos
    : filter === "social" ? SOCIAL_ITEMS
    : filter === "docs" ? docs
    : [];

  const allVisibleSelected = visibleAssets.length > 0 && visibleAssets.every(a => selected.has(a.id));
  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelected(prev => { const n = new Set(prev); visibleAssets.forEach(a => n.delete(a.id)); return n; });
    } else {
      setSelected(prev => { const n = new Set(prev); visibleAssets.forEach(a => n.add(a.id)); return n; });
    }
  };

  const counts = { all: allAssets.length, photos: photos.length, videos: videos.length, social: SOCIAL_ITEMS.length, docs: docs.length, links: 0 };
  const filterTabs = [
    { k: "all", l: "All Assets", c: counts.all },
    { k: "photos", l: "Photos", c: counts.photos },
    { k: "videos", l: "Videos", c: counts.videos },
    { k: "social", l: "Social Banners", c: counts.social },
    { k: "docs", l: "Documents", c: counts.docs },
    { k: "links", l: "Links", c: counts.links },
  ];

  const renderPreview = (asset) => {
    if (asset.isVideo) return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <img src={asset.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "grid", placeItems: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "grid", placeItems: "center" }}>
            <Icon name="play" size={16} />
          </div>
        </div>
      </div>
    );
    if (asset.type) return <SpotlightBanner type={asset.type} thumbs={s.thumbs} title={s.title} />;
    if (asset.img) return <img src={asset.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
    return (
      <div style={{ width: "100%", height: "100%", background: "#FEF2F2", display: "grid", placeItems: "center" }}>
        <Icon name="flyer" size={32} style={{ color: "#dc2626" }} />
      </div>
    );
  };

  return (
    <>
      {showShareModal && <ShareModal kind="assets" count={selected.size} selectedItems={allAssets.filter(a => selected.has(a.id))} onClose={() => setShowShareModal(false)} />}

      {/* Filter chips + toolbar */}
      <div className="assets-toolbar">
        <div className="assets-filters">
          {filterTabs.map(t => (
            <button key={t.k} className={`ld-chip ${filter === t.k ? "active" : ""}`} onClick={() => setFilter(t.k)}>
              {t.l} <span style={{ marginLeft: 3, fontWeight: 600, opacity: filter === t.k ? 1 : 0.65 }}>{t.c}</span>
            </button>
          ))}
        </div>
        <select className="assets-filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
          {filterTabs.map(t => (
            <option key={t.k} value={t.k}>{t.l} ({t.c})</option>
          ))}
        </select>
        <div className="assets-toolbar-right">
          <button className="btn btn-ghost btn-sm" onClick={toggleAll} style={{ fontSize: 12.5, color: "var(--muted)" }}>
            {allVisibleSelected ? "Deselect all" : "Select all"}
          </button>
          <button className={`btn btn-sm ${onAdd ? "btn-secondary" : "btn-blue"}`}><Icon name="download" size={12} /> Download All</button>
          {isPro && <button className="btn btn-secondary btn-sm"><Icon name="share" size={12} /> Share All</button>}
          {isPro && onAdd && <button className="btn btn-blue btn-sm" onClick={onAdd}><Icon name="plus" size={12} /> {addLabel || "Add Asset"}</button>}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="asset-bulk-bar">
          <span className="abc-count">{selected.size} asset{selected.size !== 1 ? "s" : ""} selected</span>
          {isPro && (
            <button className="abc-btn share" onClick={() => setShowShareModal(true)}><Icon name="share" size={13} /> Share {selected.size}</button>
          )}
          <button className="abc-btn primary"><Icon name="download" size={13} /> Download {selected.size}</button>
          <button className="abc-clear" onClick={clearSelection}>✕ Clear</button>
        </div>
      )}

      {/* Count */}
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 14 }}>
        {visibleAssets.length} Material{visibleAssets.length !== 1 ? "s" : ""} Found
      </div>

      {/* Asset grid */}
      {filter === "links" ? (
        <div className="empty">
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--canvas)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
            <Icon name="link" size={22} />
          </div>
          <h3>No links yet</h3>
          <p>Add external links — virtual tour URLs, Matterport, agent sites — to keep everything in one place.</p>
          <button className="btn btn-blue" style={{ marginTop: 12 }}><Icon name="plus" size={13} /> Add Link</button>
        </div>
      ) : (
        <div className="asset-grid2">
          {/* Add New card */}
          {isPro && onAdd && (
            <div className="add-asset-card" onClick={onAdd}>
              <div className="add-asset-icon">+</div>
              <span>Add New</span>
            </div>
          )}
          {visibleAssets.map(asset => (
            <AssetCard2
              key={asset.id}
              id={asset.id}
              badge={asset.label || asset.color && asset.label ? asset.label : (asset.name.endsWith(".pdf") ? "PDF" : asset.label)}
              badgeColor={asset.color}
              preview={renderPreview(asset)}
              name={asset.name}
              sub={asset.sub}
              isPro={isPro}
              selected={selected.has(asset.id)}
              onToggle={toggle}
              onEdit={asset.type ? (() => {}) : null}
            />
          ))}
        </div>
      )}
    </>
  );
};

/* ── New Spotlight ────────────────────────────────────────────────────────────── */
const NewSpotlight = ({ go }) => {
  const [selected, setSelected] = React.useState([]);
  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const myListings = RC_DATA.listings.filter(l => l.owner === "me");
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => go("spotlights")}><Icon name="chevL" size={14} /> Back to spotlights</button>
      </div>
      <div className="page-h" style={{ marginBottom: 20 }}>
        <div><h1>Create Spotlight</h1><div className="sub">Bundle multiple listings into a shareable, embeddable spotlight.</div></div>
      </div>
      <div className="new-page">
        <div className="form-section">
          <h3>Spotlight Details</h3>
          <div className="field"><label>Title</label><input placeholder="e.g. Mercer Island Luxury Collection" /></div>
          <div className="field"><label>Description</label><textarea rows={3} placeholder="Briefly describe this collection for clients…"></textarea></div>
          <div className="field"><label>Status</label>
            <select>
              <option value="draft">Draft — only visible to you</option>
              <option value="published">Published — shareable with others</option>
            </select>
          </div>
        </div>
        <div className="form-section">
          <h3>Select Listings <span style={{ fontWeight: 400, color: "var(--muted)", fontSize: 13 }}>({selected.length} selected)</span></h3>
          <div className="listing-picker">
            {myListings.map(l => (
              <div key={l.id} className="listing-pick-row" onClick={() => toggle(l.id)}>
                <input type="checkbox" checked={selected.includes(l.id)} onChange={() => toggle(l.id)} onClick={e => e.stopPropagation()} />
                <div className="thumb" style={{ backgroundImage: `url(${l.img})` }}></div>
                <div className="meta">
                  <div className="addr">{l.address}</div>
                  <div className="sub">{l.city} · {fmtPrice(l.price)} · {l.beds} bd · {l.baths} ba</div>
                </div>
                <span className="pill pill-green" style={{ fontSize: 11 }}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="form-section">
          <h3>Cover Photo</h3>
          <div className="photo-drop">
            <div className="ic">🖼</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Upload a cover image</div>
            <div style={{ fontSize: 12 }}>Recommended: 1600×900px, JPG or PNG</div>
          </div>
        </div>
        <div className="new-page-actions">
          <button className="btn btn-secondary" onClick={() => go("spotlights")}>Cancel</button>
          <button className="btn btn-primary" onClick={() => go("spotlights")}><Icon name="check" size={14} /> Create Spotlight</button>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { Spotlights, SpotlightDetail, AssetsTab, NewSpotlight, SpotlightBanner, SpotlightRow, AssetCard2, EmbedCodePanel, AddAssetModal });
