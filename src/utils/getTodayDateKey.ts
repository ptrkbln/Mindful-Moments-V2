export function getTodayDateKey() {
  const now = new Date();
  const dd = now.getDate().toString().padStart(2, "0");
  const mm = (now.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}
