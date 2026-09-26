import { useState } from "react";
import PageHeader from "./PageHeader";
import { saveFile, getFile } from "../utils/fileStorage";

export default function Documents({ documents, add, update, remove }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("needed");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const visible = documents.filter((x) =>
    filter === "all" ||
    x.priority === filter ||
    (filter === "copy" && !x.copy) ||
    (filter === "original" && !x.original)
  );

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    if (editing) {
      update("documents", editing, { name: name.trim(), priority });
      if (selectedFile) {
        await saveFile(editing, selectedFile);
        update("documents", editing, { fileName: selectedFile.name, fileType: selectedFile.type || "application/octet-stream" });
      }
    } else {
      const id = Date.now();
      add("documents", {
        id,
        name: name.trim(),
        priority,
        original: false,
        copy: false,
        description: "",
        fileName: selectedFile ? selectedFile.name : "",
        fileType: selectedFile ? selectedFile.type : "",
      });
      if (selectedFile) await saveFile(id, selectedFile);
    }

    setName("");
    setPriority("needed");
    setSelectedFile(null);
    setEditing(null);
  }

  async function openFile(item) {
    if (!item.fileName) return;
    const file = await getFile(item.id);
    if (!file) return;
    const url = URL.createObjectURL(file);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  function edit(item) {
    setEditing(item.id);
    setName(item.name);
    setPriority(item.priority);
    setSelectedFile(null);
  }

  return <>
    <PageHeader title="مدارک" text="چک‌لیست مدارک خودت را بساز و در صورت نیاز فایل محلی آن را نگه دار." />

    <form className="form-card" onSubmit={submit}>
      <div className="form-row">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="نام مدرک" />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="required">واجب</option>
          <option value="needed">مورد نیاز</option>
        </select>
        <button className="primary">{editing ? "ذخیره" : "افزودن"}</button>
      </div>
      <label className="file-picker">
        <span>{selectedFile ? `فایل انتخاب‌شده: ${selectedFile.name}` : "افزودن فایل محلی (اختیاری)"}</span>
        <input type="file" accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
      </label>
      {editing && <button type="button" className="text-button" onClick={() => { setEditing(null); setName(""); setPriority("needed"); setSelectedFile(null); }}>لغو ویرایش</button>}
    </form>

    <div className="filters">
      {[["all", "همه"], ["required", "واجب"], ["needed", "مورد نیاز"], ["original", "اصل باقی‌مانده"], ["copy", "کپی باقی‌مانده"]].map(([id, label]) => (
        <button className={filter === id ? "selected" : ""} key={id} onClick={() => setFilter(id)}>{label}</button>
      ))}
    </div>

    <div className="list">
      {visible.length ? visible.map((x) => (
        <article className="item" key={x.id}>
          <div className="item-main">
            <strong>{x.name}</strong>
            <div className="tags"><span>{x.priority === "required" ? "واجب" : "مورد نیاز"}</span></div>
            <div className="checks">
              <label><input type="checkbox" checked={x.original} onChange={(e) => update("documents", x.id, { original: e.target.checked })} /> اصل</label>
              <label><input type="checkbox" checked={x.copy} onChange={(e) => update("documents", x.id, { copy: e.target.checked })} /> کپی</label>
            </div>
            {x.fileName && <button type="button" className="file-link" onClick={() => openFile(x)}>📎 {x.fileName}</button>}
          </div>
          <div className="actions">
            <button onClick={() => edit(x)}>ویرایش</button>
            <button onClick={() => remove("documents", x.id)}>حذف</button>
          </div>
        </article>
      )) : <div className="empty">مدرکی ثبت نشده.</div>}
    </div>
  </>;
}
