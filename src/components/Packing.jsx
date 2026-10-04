import { useState } from "react";
import PageHeader from "./PageHeader";

const filters = [
  ["all", "همه"], ["required", "واجب"], ["needed", "مورد نیاز"],
  ["open", "باقی‌مانده"], ["packed", "بسته‌شده"],
  ["bought", "تهیه‌شده"], ["tobuy", "نیاز به خریداری"],
];

export default function Packing({ packing, add, update, remove }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("needed");
  const [qty, setQty] = useState(1);
  const [bought, setBought] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);

  function match(x) {
    if (filter === "all") return true;
    if (filter === "required" || filter === "needed") return x.priority === filter;
    if (filter === "open") return !x.packed;
    if (filter === "packed") return !!x.packed;
    if (filter === "bought") return !!x.bought;
    if (filter === "tobuy") return !x.bought;
    return true;
  }
  const visible = packing.filter(match);

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const item = { name: name.trim(), priority, qty: Number(qty) || 1, bought };
    editing ? update("packing", editing, item) : add("packing", { ...item, packed: false, description: "" });
    setName(""); setQty(1); setBought(false); setEditing(null);
  }

  return (
    <>
      <PageHeader title="وسایل" text="چیزهایی که باید همراهت باشند." />
      <form className="form-card inline-form">
        <div className="form-row">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً داروهای شخصی" />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="required">واجب</option>
            <option value="needed">مورد نیاز</option>
          </select>
        </div>
        <div className="form-row row-center">
          <input className="qty" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
          <label className="check-inline">
            <input type="checkbox" checked={bought} onChange={(e) => setBought(e.target.checked)} />
            خریده شده
          </label>
          <button className="primary" onClick={submit}>{editing ? "ذخیره" : "افزودن"}</button>
        </div>
      </form>
      <div className="filters">
        {filters.map(([id, l]) => <button className={filter === id ? "selected" : ""} key={id} onClick={() => setFilter(id)}>{l}</button>)}
      </div>
      <div className="list">
        {visible.length ? visible.map((x) => (
          <article className={`item ${x.packed ? "done" : ""}`} key={x.id}>
            <input type="checkbox" checked={!!x.packed} onChange={(e) => update("packing", x.id, { packed: e.target.checked })} />
            <div className="item-main">
              <strong>{x.name}</strong>
              <div className="tags">
                <span>{x.priority === "required" ? "واجب" : "مورد نیاز"}</span>
                <span>تعداد: {x.qty}</span>
                <span>{x.bought ? "تهیه شده" : "نیاز به خریداری"}</span>
              </div>
            </div>
            <div className="actions">
              <button onClick={() => { setEditing(x.id); setName(x.name); setPriority(x.priority); setQty(x.qty); setBought(!!x.bought); }}>ویرایش</button>
              <button onClick={() => remove("packing", x.id)}>حذف</button>
            </div>
          </article>
        )) : <div className="empty">وسیله‌ای ثبت نشده.</div>}
      </div>
    </>
  );
}
