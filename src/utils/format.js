// جدا کردن سه رقم سه رقم با ویرگول انگلیسی
export const fmt = (n) => Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });

// نمایش مقدار خام داخل اینپوت با جداکننده
export function group(raw) {
  const [i, d] = String(raw ?? "").split(".");
  const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d !== undefined ? `${g}.${d}` : g;
}

// تبدیل متن تایپ شده به عدد خام
export const clean = (v) => v.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
