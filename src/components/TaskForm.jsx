import { useState } from "react";

// فرم گرفتن عنوان کار جدید
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const result = onAdd(title);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setTitle("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        placeholder="عنوان کار جدید"
      />
      <button type="submit">افزودن</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}