const items = [
  ["dashboard", "🏠", "داشبورد"], ["tasks", "✅", "کارها"], ["documents", "📄", "مدارک"],
  ["packing", "🎒", "وسایل"], ["finance", "💰", "مالی"], ["reminders", "🔔", "یادآورها"],
];

export default function Sidebar({ page, setPage, showTravel }) {
  return (
    <aside className="sidebar">
      <div className="brand"><span>🇩🇪</span><div><strong>My Germany</strong><small>برنامه‌ریزی آرام و ساده</small></div></div>
      <nav>
        {items.map(([id, icon, label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}><span>{icon}</span>{label}</button>)}
        {showTravel && <button className={page === "travel" ? "active" : ""} onClick={() => setPage("travel")}><span>✈️</span>سفر</button>}
      </nav>
      <button className={`settings-link ${page === "settings" ? "active" : ""}`} onClick={() => setPage("settings")}><span>⚙️</span>تنظیمات</button>
    </aside>
  );
}
