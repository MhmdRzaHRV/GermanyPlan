import PageHeader from "./PageHeader";
export default function Settings({ settings, setSettings, darkMode, setDarkMode }) {
  return <>
    <PageHeader title="تنظیمات" text="چند گزینه ساده برای شخصی‌سازی برنامه." />
    <section className="card settings-card">
      <label className="setting-row"><span><strong>بلیط خریداری شده</strong><small>بعد از فعال‌کردن، بخش سفر در برنامه نمایش داده می‌شود.</small></span><input type="checkbox" checked={settings.ticketBought} onChange={e=>setSettings({ticketBought:e.target.checked})}/></label>
      <label className="setting-row"><span><strong>حالت تاریک</strong><small>برای استفاده راحت‌تر در محیط کم‌نور.</small></span><input type="checkbox" checked={darkMode} onChange={e=>setDarkMode(e.target.checked)}/></label>
    </section>
    <section className="card">
      <h2>حریم خصوصی</h2>
      <p className="muted">اطلاعات برنامه در همین مرورگر ذخیره می‌شود. فایل‌های انتخابی مدارک نیز فقط به صورت محلی روی همین دستگاه نگهداری می‌شوند و به سرور ارسال نمی‌شوند.</p>
    </section>
  </>;
}
