// نمایش یک کار: چک‌باکس، عنوان، ویرایش، حذف
import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  function handleDelete() {
    const confirmed = window.confirm("مطمئنی میخوای این تسک حذف بشه؟");
    if (confirmed) onDelete(task.id);
  }

  function handleSaveEdit() {
    onEdit(task.id, editText);
    setEditing(false);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      {editing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>ذخیره</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
            {task.title}
          </span>
          <small style={{ marginRight: 8 }}>({task.createdAt})</small>
          <button onClick={() => setEditing(true)}>ویرایش</button>
        </>
      )}

      <button onClick={handleDelete}>حذف</button>
    </li>
  );
}