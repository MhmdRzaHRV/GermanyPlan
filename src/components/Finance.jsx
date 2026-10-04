import { useState } from "react";
import PageHeader from "./PageHeader";

const fmt = (n) => Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });

export default function Finance({ finance, add, update, remove }) {
  const empty = { title: "", amount: "", currency: "EUR", rate: "", date: new Date().toISOString().slice(0, 10), category: "", details: "" };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.amount) return;
    const item = { ...form, title: form.title.trim(), amount: Number(form.amount), rate: Number(form.rate) || 0 };
    editing ? update("finance", editing, item) : add("finance", item);
    setForm(empty);
    setEditing(null);
  }

  // تبدیل هر هزینه به یورو و ریال با نرخ خودش
  function toEur(x) { return x.currency === "EUR" ? x.amount : x.rate ? x.amount / x.rate : null; }
  function toIrr(x) { return x.currency === "IRR" ? x.amount : x.rate ? x.amount * x.rate : null; }

  const totalEur = finance.reduce((s, x) => s + (toEur(x) || 0), 0);
  const totalIrr = finance.reduce((s, x) => s + (toIrr(x) || 0), 0);
  const noRate = finance.filter((x) => !x.rate && x.currency !== "EUR").length;

  return (
    <>
      <PageHeader title="مالی" text="هزینه‌ها را ساده ثبت کن؛ جزئیات کاملاً اختیاری است." />
      <form className="form-card" onSubmit={submit}>
        <div className="form-row">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="عنوان هزینه" />
          <input type="number" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="مبلغ" />
          <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
            <option value="EUR">یورو (€)</option>
            <option value="IRR">ریال (﷼)</option>
          </select>
          <input type="number" min="0" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} placeholder="نرخ یورو (ریال)" />
        </div>
        <div className="form-row">
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="دسته‌بندی اختیاری" />
          <input value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="جزئیات اختیاری" />
          <button className="primary">{editing ? "ذخیره" : "ثبت"}</button>
        </div>
      </form>

      {finance.length > 0 && (
        <div className="card total-card">
          <h2>مجموع هزینه‌ها</h2>
          <div className="mini-row"><span>به یورو</span><strong>{fmt(totalEur)} €</strong></div>
          <div className="mini-row"><span>به ریال</span><strong>{fmt(totalIrr)} ﷼</strong></div>
          {noRate > 0 && <small className="muted">{noRate} هزینه ریالی بدون نرخ یورو در مجموع حساب نشده.</small>}
        </div>
      )}

      <div className="list">
        {finance.length ? finance.map((x) => (
          <article className="item" key={x.id}>
            <div className="item-main">
              <strong>{x.title}</strong>
              <div className="money">{fmt(x.amount)} {x.currency === "EUR" ? "€" : "﷼"}</div>
              {x.rate > 0 && <small>نرخ یورو: {fmt(x.rate)} ﷼ ← {x.currency === "EUR" ? `${fmt(toIrr(x))} ﷼` : `${fmt(toEur(x))} €`}</small>}
              <small>{x.rate > 0 ? " · " : ""}{x.date}{x.category ? ` · ${x.category}` : ""}</small>
              {x.details && <p>{x.details}</p>}
            </div>
            <div className="actions">
              <button onClick={() => { setEditing(x.id); setForm({ ...empty, ...x, rate: x.rate || "" }); }}>ویرایش</button>
              <button onClick={() => remove("finance", x.id)}>حذف</button>
            </div>
          </article>
        )) : <div className="empty">هنوز هزینه‌ای ثبت نشده.</div>}
      </div>
    </>
  );
}
