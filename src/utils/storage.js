export function load(key, fallback) {
  try {
    const value = localStorage.getItem(`germany-planner-${key}`);
    return value ? JSON.parse(value) : fallback;
  } catch { return fallback; }
}

export function save(key, value) {
  localStorage.setItem(`germany-planner-${key}`, JSON.stringify(value));
}
