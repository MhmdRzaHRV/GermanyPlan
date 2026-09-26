// شمارش کارهای انجام‌ شده و نشده
export default function TaskStats({ tasks }) {
  const doneCount = tasks.filter((t) => t.done).length;
  const notDoneCount = tasks.length - doneCount;

  return (
    <p>
      انجام‌شده: {doneCount} - انجام‌نشده: {notDoneCount}
    </p>
  );
}