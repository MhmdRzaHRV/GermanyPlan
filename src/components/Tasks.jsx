import { useState } from "react";
import PageHeader from "./PageHeader";

const empty = { title: "", priority: "needed", description: "", address: "", dueDate: "" };

export default function Tasks({ items, add, update, toggle, remove }) {
  const [form, setForm] = useState(empty); const [filter, setFilter] = useState("all"); const [editing, setEditing] = useState(null);
  const visible = items.filter((x) => filter === "all" || (filter === "done" ? x.done : filter === "open" ? !x.done : x.priority === filter));
  function submit(e) { e.preventDefault(); if (!form.title.trim()) return; editing ? update(editing, form) : add(form.title, form.priority, form.description, form.address, form.dueDate); setForm(empty); setEditing(null); }
  function edit(x) { setEditing(x.id); setForm({ title: x.title, priority: x.priority, description: x.description, address: x.address, dueDate: x.dueDate }); }
  return <>
    <PageHeader title="کارها" text="کارهای مربوط به انتظار و آماده‌شدن برای رفتن." />
    <form className="form-card" onSubmit={submit}><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="مثلاً پیگیری وضعیت ویزا" /><div className="form-row"><select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option value="required">واجب</option><option value="needed">مورد نیاز</option></select><input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /><button className="primary">{editing ? "ذخیره" : "افزودن"}</button></div><div className="form-row"><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="آدرس محل انجام (اختیاری)" /><input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="توضیح (اختیاری)" /></div>{editing && <button type="button" className="text-button" onClick={() => { setEditing(null); setForm(empty); }}>لغو ویرایش</button>}</form>
    <div className="filters">{[["all","همه"],["required","واجب"],["needed","مورد نیاز"],["open","باقی‌مانده"],["done","انجام‌شده"]].map(([id,l]) => <button key={id} className={filter===id?"selected":""} onClick={() => setFilter(id)}>{l}</button>)}</div>
    <div className="list">{visible.length ? visible.map((x) => <article className={`item ${x.done ? "done" : ""}`} key={x.id}><input type="checkbox" checked={x.done} onChange={() => toggle(x.id)} /><div className="item-main"><strong>{x.title}</strong><div className="tags"><span>{x.priority === "required" ? "واجب" : "مورد نیاز"}</span>{x.dueDate && <span>{x.dueDate}</span>}</div>{x.description && <p>{x.description}</p>}{x.address && <small>📍 {x.address}</small>}</div><div className="actions"><button onClick={() => edit(x)}>ویرایش</button><button onClick={() => remove(x.id)}>حذف</button></div></article>) : <div className="empty">چیزی در این فهرست نیست.</div>}</div>
  </>;
}
