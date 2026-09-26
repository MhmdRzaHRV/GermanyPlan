import PageHeader from "./PageHeader";

export default function Dashboard({ tasks, data, go }) {
  const doneTasks = tasks.items.filter((x) => x.done).length;
  const doneDocs = data.documents.filter((x) => x.original).length;
  const donePacking = data.packing.filter((x) => x.packed).length;
  const total = tasks.items.length + data.documents.length + data.packing.length;
  const done = doneTasks + doneDocs + donePacking;
  const progress = total ? Math.round((done / total) * 100) : 0;
  const important = tasks.items.filter((x) => !x.done && x.priority === "required").slice(0, 4);

  return <>
    <PageHeader title="سلام 👋" text="فقط روی قدم بعدی تمرکز کن." />
    <section className="hero-card"><div><span>وضعیت آماده‌سازی</span><strong>{progress}%</strong></div><div className="progress"><i style={{ width: `${progress}%` }} /></div></section>
    <section className="stat-grid">
      <button onClick={() => go("tasks")}><b>{tasks.items.filter((x) => !x.done && x.priority === "required").length}</b><span>واجب باقی‌مانده</span></button>
      <button onClick={() => go("documents")}><b>{doneDocs} / {data.documents.length}</b><span>مدارک</span></button>
      <button onClick={() => go("packing")}><b>{donePacking} / {data.packing.length}</b><span>وسایل</span></button>
      <button onClick={() => go("tasks")}><b>{doneTasks} / {tasks.items.length}</b><span>کارها</span></button>
    </section>
    <section className="card"><h2>⚠️ کارهای مهم</h2>{important.length ? important.map((x) => <div className="mini-row" key={x.id}><span>{x.title}</span>{x.dueDate && <small>{x.dueDate}</small>}</div>) : <p className="muted">فعلاً کار واجبی باقی نمانده.</p>}</section>
    {data.settings.ticketBought && <section className="card travel-card" onClick={() => go("travel")}><h2>✈️ سفر</h2><p>{data.travel.flightDate || "اطلاعات پرواز را تکمیل کن"}</p><small>{data.travel.from || "مبدا"} → {data.travel.to || "مقصد"}</small></section>}
  </>;
}
