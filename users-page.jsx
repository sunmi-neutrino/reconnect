/* global React, Icon, Pagination */

const USERS_DATA = [
  { id: "U01", name: "Joy Chen",                email: "haydn@neutrinoinc.com",        phone: "(708) 044-0000", role: "Agent",  mlsId: "708044",      online: true,  ava: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format" },
  { id: "U02", name: "Jeffrie Pena",            email: "pena@test.com",                phone: "",               role: "Agent",  mlsId: "31362",       online: true,  ava: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format" },
  { id: "U03", name: "Jake Garay",              email: "garay@test.com",               phone: "",               role: "Agent",  mlsId: "33024",       online: true,  ava: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format" },
  { id: "U04", name: "Catherine Duff-Poritzky", email: "duff@test.com",                phone: "",               role: "Agent",  mlsId: "1734",        online: true,  ava: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format" },
  { id: "U05", name: "Haley Jamison",           email: "realtorhaleyj@gmail.com",      phone: "",               role: "Agent",  mlsId: "haleynicj",   online: true,  ava: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format" },
  { id: "U06", name: "Marietta Vargas",         email: "homes@mariettavargas.com",     phone: "",               role: "Agent",  mlsId: "155065670",   online: true,  ava: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format" },
  { id: "U07", name: "Kimberley Jade",          email: "kjaderealtor@gmail.com",       phone: "",               role: "Agent",  mlsId: "261566436",   online: true,  ava: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=80&auto=format" },
  { id: "U08", name: "Angela Guzman",           email: "angelaguzmanhomes@gmail.com",  phone: "",               role: "Agent",  mlsId: "02188726",    online: true,  ava: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&auto=format" },
  { id: "U09", name: "Heather Gregory",         email: "hgregory@seaglass.com",        phone: "",               role: "Agent",  mlsId: "142457",      online: true,  ava: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&auto=format" },
  { id: "U10", name: "Aimee Jarrels",           email: "aimee@seatoshiningseausa.com", phone: "",               role: "Agent",  mlsId: "187536852",   online: true,  ava: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format" },
  { id: "U11", name: "Marcus Lee",              email: "marcus.lee@windermere.com",    phone: "(425) 555-0278", role: "Broker", mlsId: "WA-19873302", online: false, ava: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format" },
  { id: "U12", name: "Priya Natarajan",         email: "priya.natarajan@compass.com",  phone: "(206) 555-0391", role: "Agent",  mlsId: "WA-23119047", online: true,  ava: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format" },
];

const USERS_PER_PAGE = 10;

const MLS_SOURCES = ["-- Select Listing Source --", "Stellar MLS", "Beaches MLS", "MIAMI REALTORS MLS", "NWMLS", "CRMLS", "BrightMLS"];

// ─── Add / Edit User Modal ────────────────────────────────────────────────────
const UserModal = ({ user, onClose, onSave }) => {
  const isEdit = !!user;
  const [form, setForm] = React.useState(
    user
      ? { name: user.name, email: user.email, phone: user.phone, role: user.role, listingSource: user.listingSource || "", mlsId: user.mlsId, password: "", confirmPassword: "" }
      : { name: "", email: "", phone: "", role: "Agent", listingSource: "", mlsId: "", password: "", confirmPassword: "" }
  );
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <div className="modal-h">
          <h2>{isEdit ? "Edit User" : "Add User"}</h2>
          <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
        </div>
        <div className="modal-b">

          {/* Role */}
          <div className="field">
            <label>Role</label>
            <select value={form.role} onChange={e => set("role", e.target.value)}>
              <option>Agent</option>
              <option>Broker</option>
              <option>Admin</option>
              <option>Support</option>
            </select>
          </div>

          {/* Name + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Name <span style={{ color: "#ef4444" }}>*</span></label>
              <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Enter full name" />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Email <span style={{ color: "#ef4444" }}>*</span></label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="Enter email address" />
            </div>
          </div>

          {/* Phone */}
          <div className="field" style={{ marginTop: 14 }}>
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="Enter phone number" />
          </div>

          {/* MLS Information */}
          <div style={{ marginTop: 6, marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>MLS Information</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Listing Source</label>
                <select value={form.listingSource} onChange={e => set("listingSource", e.target.value)}>
                  {MLS_SOURCES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>MLS ID</label>
                <input value={form.mlsId} onChange={e => set("mlsId", e.target.value)} placeholder="Enter MLS ID" />
              </div>
            </div>
          </div>

          {/* Set Password */}
          <div style={{ marginTop: 6 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>Set Password</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Password <span style={{ color: "#ef4444" }}>*</span></label>
                <input type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="••••••••" />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Confirm Password <span style={{ color: "#ef4444" }}>*</span></label>
                <input type="password" value={form.confirmPassword} onChange={e => set("confirmPassword", e.target.value)} placeholder="Confirm password" />
              </div>
            </div>
          </div>

        </div>
        <div className="modal-f">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { onSave(form); onClose(); }}>
            {isEdit ? "Save" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteUserModal = ({ user, onClose, onConfirm }) => (
  <div className="modal-back" onClick={onClose}>
    <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
      <div className="modal-h">
        <h2>Delete User</h2>
        <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
      </div>
      <div className="modal-b">
        <p style={{ margin: 0, fontSize: 14, color: "var(--ink)", lineHeight: 1.6 }}>
          Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.
        </p>
      </div>
      <div className="modal-f">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-danger" onClick={() => { onConfirm(user.id); onClose(); }}>
          Delete User
        </button>
      </div>
    </div>
  </div>
);

// ─── Users Page ───────────────────────────────────────────────────────────────
const Users = ({ go }) => {
  const [users, setUsers] = React.useState(USERS_DATA);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [addOpen, setAddOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState(null);
  const [deleteUser, setDeleteUser] = React.useState(null);
  const [checked, setChecked] = React.useState(new Set());

  const filtered = users.filter(u =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.mlsId.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => { setPage(1); }, [search]);

  const paged = filtered.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);
  const allChecked = paged.length > 0 && paged.every(u => checked.has(u.id));

  const toggleAll = () => {
    const next = new Set(checked);
    if (allChecked) { paged.forEach(u => next.delete(u.id)); }
    else { paged.forEach(u => next.add(u.id)); }
    setChecked(next);
  };

  const toggleOne = (id) => {
    const next = new Set(checked);
    next.has(id) ? next.delete(id) : next.add(id);
    setChecked(next);
  };

  const handleSave = (form) => {
    if (editUser) {
      setUsers(us => us.map(u => u.id === editUser.id ? { ...u, ...form } : u));
    } else {
      const newId = "U" + String(users.length + 1).padStart(2, "0");
      setUsers(us => [...us, { ...form, id: newId, online: false, ava: "" }]);
    }
  };

  const handleDelete = (id) => {
    setUsers(us => us.filter(u => u.id !== id));
    const next = new Set(checked);
    next.delete(id);
    setChecked(next);
  };

  return (
    <>
      <div className="page-h">
        <div>
          <h1>Users</h1>
          <div className="sub">Manage users in your account.</div>
        </div>
        <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
          <Icon name="plus" size={14} /> Add User
        </button>
      </div>

      <div className="card" style={{ padding: 0 }}>

        {/* Header: count + search + filter */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap", marginRight: 4 }}>
            {filtered.length.toLocaleString()} Users
          </div>
          <div className="users-search" style={{ flex: 1 }}>
            <span className="users-search-ic"><Icon name="search" size={15} /></span>
            <input
              type="text"
              placeholder="Search Users"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="chip"><Icon name="filter" size={13} /><span className="chip-label"> Filter</span></button>
        </div>

        {/* Desktop table */}
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th style={{ width: 44, paddingLeft: 20 }}>
                  <span className="users-cb" style={{ background: allChecked ? "var(--green-500)" : "#fff", borderColor: allChecked ? "var(--green-500)" : "var(--border)", color: allChecked ? "#fff" : "transparent" }} onClick={toggleAll}>
                    <Icon name="check" size={10} stroke={3} />
                  </span>
                </th>
                <th style={{ width: 52 }}></th>
                <th>Name</th>
                <th>Email</th>
                <th className="users-col-phone">Phone</th>
                <th>Role</th>
                <th>MLS ID</th>
                <th>Online</th>
                <th style={{ paddingRight: 20 }}></th>
              </tr>
            </thead>
            <tbody>
              {paged.map(u => (
                <tr key={u.id} className={checked.has(u.id) ? "selected" : ""}>
                  <td style={{ paddingLeft: 20 }}>
                    <span className="users-cb" style={{ background: checked.has(u.id) ? "var(--green-500)" : "#fff", borderColor: checked.has(u.id) ? "var(--green-500)" : "var(--border)", color: checked.has(u.id) ? "#fff" : "transparent" }} onClick={() => toggleOne(u.id)}>
                      <Icon name="check" size={10} stroke={3} />
                    </span>
                  </td>
                  <td>
                    {u.ava
                      ? <div className="users-ava" style={{ backgroundImage: `url(${u.ava})` }} />
                      : <div className="users-ava users-ava-initials">
                          {u.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                        </div>
                    }
                  </td>
                  <td>
                    <span className="users-name" onClick={() => setEditUser(u)}>{u.name}</span>
                  </td>
                  <td className="users-cell-muted">{u.email}</td>
                  <td className="users-cell-muted users-col-phone">{u.phone || "—"}</td>
                  <td className="users-cell">{u.role}</td>
                  <td className="users-cell">{u.mlsId}</td>
                  <td>
                    <span style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", background: u.online ? "#10B981" : "#d1d5db", flexShrink: 0 }} />
                  </td>
                  <td className="users-actions" style={{ paddingRight: 20 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditUser(u)}>
                      <Icon name="edit" size={12} /> Edit
                    </button>
                    <button className="btn btn-sm" style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FCA5A5" }}
                      onClick={() => setDeleteUser(u)}>
                      <Icon name="x" size={12} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13.5 }}>
                    No users found matching &ldquo;{search}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards (shown on small screens) */}
        <div className="users-mobile-list">
          {paged.map(u => (
            <div key={u.id} className="users-mobile-row">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                <span className="users-cb" style={{ background: checked.has(u.id) ? "var(--green-500)" : "#fff", borderColor: checked.has(u.id) ? "var(--green-500)" : "var(--border)", color: checked.has(u.id) ? "#fff" : "transparent" }} onClick={() => toggleOne(u.id)}>
                  <Icon name="check" size={10} stroke={3} />
                </span>
                {u.ava
                  ? <div className="users-ava" style={{ backgroundImage: `url(${u.ava})`, flexShrink: 0 }} />
                  : <div className="users-ava users-ava-initials" style={{ flexShrink: 0 }}>
                      {u.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                    </div>
                }
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span className="users-name" style={{ fontSize: 13.5 }} onClick={() => setEditUser(u)}>{u.name}</span>
                    <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: u.online ? "#10B981" : "#d1d5db", flexShrink: 0 }} />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{u.phone ? `${u.phone} · ` : ""}{u.role} · MLS {u.mlsId}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditUser(u)}>
                  <Icon name="edit" size={12} /> Edit
                </button>
                <button className="btn btn-sm" style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FCA5A5" }}
                  onClick={() => setDeleteUser(u)}>
                  <Icon name="x" size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
          {paged.length === 0 && (
            <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13.5 }}>
              No users found matching &ldquo;{search}&rdquo;
            </div>
          )}
        </div>

        {/* Pagination */}
        {filtered.length > USERS_PER_PAGE && (
          <div style={{ padding: "12px 20px 16px", borderTop: "1px solid var(--border)" }}>
            <Pagination page={page} setPage={setPage} total={filtered.length} perPage={USERS_PER_PAGE} />
          </div>
        )}
      </div>

      {addOpen && <UserModal onClose={() => setAddOpen(false)} onSave={handleSave} />}
      {editUser && <UserModal user={editUser} onClose={() => setEditUser(null)} onSave={handleSave} />}
      {deleteUser && <DeleteUserModal user={deleteUser} onClose={() => setDeleteUser(null)} onConfirm={handleDelete} />}
    </>
  );
};

Object.assign(window, { Users });
