/* global React, Icon, RC_DATA, GetDomainModal */
/* Phase1-V2-only overrides — loaded only by Reconnect Phase1-V2.html
   Redefines Dashboard (Canva module + Complete Your Profile module) and
   adds the Add-Profile-Photo modal + the Terms/Password/Confirmation
   onboarding flow. */

// Lucide "user" glyph (rounded shoulders) — used for all profile-photo placeholders
const ProfileIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
  </svg>
);

// ── Add Your Profile Photo modal ──────────────────────────────────────────────
const AddProfilePhotoModal = ({ onClose, onUploaded }) => {
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  return (
    <div className="ob-modal-back" onClick={onClose}>
      <div className="ob-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 580 }}>
        <div className="ob-head">
          <h2>Add Your Profile Photo</h2>
          <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
        </div>

        <div className="ob-body">
          <p className="ob-body-intro">
            <strong style={{ color: "var(--ink)", fontWeight: 700 }}>Highly recommended</strong> — your photo appears on your Single Listing Website and all marketing materials.
          </p>

          <div className="ob-info-box">
            <span className="ob-info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </span>
            <span>
              <strong>Make a great first impression.</strong>
              Listings and marketing materials with an agent photo generate significantly more engagement from buyers and sellers.
            </span>
          </div>

          <label className="ob-upload-area">
            <input type="file" accept="image/png, image/jpeg" onChange={e => handleFile(e.target.files[0])} />
            <div className="ob-upload-ring">
              {preview ? <img src={preview} alt="Preview" /> : <ProfileIcon size={28} />}
            </div>
            <p className="ob-upload-title">{preview ? "Choose a different photo" : "Click here to upload your photo"}</p>
            <p className="ob-upload-sub">JPG, PNG — recommended 400×400px or larger</p>
          </label>
        </div>

        <div className="ob-foot" style={{ justifyContent: "flex-end" }}>
          <button className="ob-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="ob-btn-primary" disabled={!file} onClick={() => onUploaded(preview)}>Upload a Photo</button>
        </div>
      </div>
    </div>
  );
};

// ── Onboarding flow: Terms of Service → Update Password → Confirmation ───────
const WelcomeFlow = ({ onClose }) => {
  const [step, setStep] = React.useState(1);
  const [agreed, setAgreed] = React.useState(false);
  const [newPw, setNewPw] = React.useState("");
  const [confirmPw, setConfirmPw] = React.useState("");
  const [pwError, setPwError] = React.useState("");

  const Dots = ({ current }) => (
    <div className="ob-foot-dots">
      <div className={`ob-dot ${current === 1 ? "active" : ""}`} />
      <div className={`ob-dot ${current === 2 ? "active" : ""}`} />
    </div>
  );

  const handleUpdatePassword = () => {
    if (!newPw || !confirmPw) { setPwError("Please fill in both fields."); return; }
    if (newPw.length < 8) { setPwError("Password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    setPwError("");
    setStep(3);
  };

  return (
    <div className="ob-modal-back">
      <div className="ob-modal" onClick={e => e.stopPropagation()}>

        {(step === 1 || step === 2) && (
          <div className="ob-logo-row">
            <img src="uploads/ReConnect_logo_final.svg" alt="REConnect" className="ob-logo" />
            <Dots current={step} />
          </div>
        )}

        {step === 1 && <>
          <div className="ob-head">
            <h2>Terms and Service</h2>
          </div>
          <div className="ob-body">
            <p className="ob-body-intro">Please review and accept our terms to continue. This is a one-time step.</p>
            <div className="ob-terms-box">
              <h4>1. Acceptance of Terms</h4>
              <p>By accessing and using REConnect, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use REConnect.</p>
              <h4>2. Use of Service</h4>
              <p>REConnect is a platform for real estate professionals to manage listings, marketing materials, and collaborate with clients and colleagues. You agree to use the service only for lawful purposes and in accordance with these Terms.</p>
              <h4>3. Account Responsibility</h4>
              <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify REConnect immediately of any unauthorized use.</p>
              <h4>4. MLS Compliance</h4>
              <p>You agree to use REConnect in compliance with all applicable MLS rules, regulations, and guidelines. Any data obtained through REConnect must be used in accordance with MLS data sharing agreements.</p>
              <h4>5. Privacy Policy</h4>
              <p>Your use of REConnect is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.</p>
              <h4>6. Intellectual Property</h4>
              <p>All content, features, and functionality on REConnect are owned by Neutrino Inc. and are protected by copyright, trademark, and other intellectual property laws.</p>
            </div>
            <div className="ob-agree-box">
              <input type="checkbox" id="ob-agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              <label htmlFor="ob-agree">I have read and agree to REConnect's <a href="#" onClick={e => e.preventDefault()}>Terms of Service</a> and <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>.</label>
            </div>
          </div>
          <div className="ob-foot" style={{ justifyContent: "flex-end" }}>
            <button className="ob-btn-cancel" onClick={() => { window.location.href = "https://reconnect-hgar.vercel.app/"; }}>Cancel</button>
            <button className="ob-btn-primary" disabled={!agreed} onClick={() => setStep(2)} style={{ width: 248 }}>
              {agreed ? "Continue" : "Please accept to continue"}
            </button>
          </div>
        </>}

        {step === 2 && <>
          <div className="ob-head">
            <h2>Update Your Password</h2>
          </div>
          <div className="ob-body">
            <p className="ob-body-intro">In order to access Canva and the REConnect App Dashboard, it is required to update or set your own password for the account. Please update your password.</p>
            <div className={`ob-field ${pwError ? "ob-field-error" : ""}`}>
              <label>New Password</label>
              <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Enter a new password" />
            </div>
            <div className={`ob-field ${pwError ? "ob-field-error" : ""}`}>
              <label>Confirm New Password</label>
              <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Re-enter your new password" />
            </div>
            {pwError && <div className="ob-field-error-msg">{pwError}</div>}
          </div>
          <div className="ob-foot" style={{ justifyContent: "flex-end" }}>
            <button className="ob-btn-cancel" onClick={() => setStep(1)}>Back</button>
            <button className="ob-btn-primary" onClick={handleUpdatePassword} style={{ width: 213 }}>Update Your Password</button>
          </div>
        </>}

        {step === 3 && <>
          <div className="ob-head">
            <h2>Your Password Updated Successfully!</h2>
            <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
          </div>
          <div className="ob-body">
            <p className="ob-body-intro" style={{ margin: 0 }}>
              Now you are ready to explore REConnect App.<br /><br />
              Enjoy creating marketing materials for using REConnect Canva App or explore your listing websites and digital marketing!
            </p>
          </div>
          <div className="ob-foot" style={{ justifyContent: "center" }}>
            <button className="ob-btn-primary" onClick={onClose}>Explore REConnect</button>
          </div>
        </>}

      </div>
    </div>
  );
};

// ── Phase1-V2 Dashboard override ──────────────────────────────────────────────
const Dashboard = ({ go }) => {
  const myListings = RC_DATA.listings.filter(l => l.owner === "me");
  const firstListing = myListings[0];
  const sitesReady = myListings.length;
  const [domainModalListing, setDomainModalListing] = React.useState(null);
  const [showPhotoModal, setShowPhotoModal] = React.useState(false);
  const [profilePhoto, setProfilePhoto] = React.useState(null);

  return (
    <>
      <div className="page-h dash-page-h">
        <div>
          <h1>Good Afternoon, Mike</h1>
          <div className="sub">Here's what's happening today</div>
        </div>
      </div>

      {/* Two independently-stacking columns — keeps left/right module spacing
          consistent regardless of the other column's content height.
          On mobile (≤1024px) the wrappers become display:contents so the
          modules fall back to flat CSS-order-based reordering. */}
      <div className="dash-grid">
      <div className="dash-col-left">
        {/* 1 — Your Property Websites */}
        <div className="dash-promo-card dash-promo-websites dash-promo-websites-v2 dash-order-1">
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
      </div>

      <div className="dash-col-right">
        {/* 2 — Use in Canva */}
        <div className="dash-promo-card dash-promo-canva dash-promo-canva-v2 dash-order-3">
          <div className="canva-v2-shot-wrap">
            <img src="uploads/canva-plugin-screenshot.png" alt="REConnect Canva plugin interface" className="canva-v2-shot" />
          </div>
          <h2 className="dash-promo-title">Use in Canva</h2>
          <p className="dash-promo-desc">Your listing data is now connected to Canva.</p>
          <button className="canva-v2-open-btn" onClick={() => window.open("https://www.canva.com/your-apps/AAGE_hOiH5U/reconnect", "_blank")}>
            <span className="canva-v2-open-btn-spin" aria-hidden="true"></span>
            <span className="canva-v2-open-btn-fill" aria-hidden="true"></span>
            <span className="canva-v2-open-btn-label">
              <Icon name="external-link" size={20} />
              Open App in Canva
            </span>
          </button>
          <button className="canva-v2-templates-link" onClick={() => go("canva")}>View Available Templates</button>
        </div>

        {/* 4 — Complete Your Profile */}
        <div className="card dash-complete-profile dash-order-cp">
          <h2 className="dcp-title">Complete Your Profile</h2>
          <div className="dcp-row">
            <div className="dcp-photo-ring">
              {profilePhoto ? <img src={profilePhoto} alt="Your profile" /> : <ProfileIcon size={22} />}
            </div>
            <p className="dcp-copy">
              <strong>Highly recommended</strong> — your photo will appears on the website and all marketing materials.
            </p>
          </div>
          <button
            className={`dcp-btn ${profilePhoto ? "dcp-btn-done" : ""}`}
            onClick={() => !profilePhoto && setShowPhotoModal(true)}
          >
            {profilePhoto ? <><Icon name="check" size={16} stroke={3} /> Photo Added</> : "Add My Profile Photo"}
          </button>
        </div>

        {/* 5 — Your Stats */}
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
      </div>

      {domainModalListing && (
        <GetDomainModal listing={domainModalListing} onClose={() => setDomainModalListing(null)} />
      )}

      {showPhotoModal && (
        <AddProfilePhotoModal
          onClose={() => setShowPhotoModal(false)}
          onUploaded={(dataUrl) => { setProfilePhoto(dataUrl); setShowPhotoModal(false); }}
        />
      )}
    </>
  );
};

// Push V2 overrides into window so App picks them up
Object.assign(window, { Dashboard, AddProfilePhotoModal, WelcomeFlow });
