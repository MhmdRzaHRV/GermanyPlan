import { useState, useEffect } from "react";
import { load, save } from "../utils/storage";

const KEY = "tasks";

export function useTasks() {
  const [items, setItems] = useState(() => load(KEY, []));

  useEffect(() => save(KEY, items), [items]);

  function add(title, priority = "needed", description = "", address = "", dueDate = "") {
    const text = title.trim();
    if (!text) return false;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), title: text, priority, description: description.trim(), address: address.trim(), dueDate, done: false, createdAt: new Date().toISOString() },
    ]);
    return true;
  }

  function update(id, changes) {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...changes } : x)));
  }

  function toggle(id) { update(id, { done: !items.find((x) => x.id === id)?.done }); }
  function remove(id) { if (window.confirm("این مورد حذف شود؟")) setItems((prev) => prev.filter((x) => x.id !== id)); }

  return { items, add, update, toggle, remove };
}
