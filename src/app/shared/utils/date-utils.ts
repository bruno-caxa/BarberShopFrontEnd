export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function toIsoLocalDate(date: Date): string {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`; // yyyy-MM-dd
}

// export function toDisplayDate(date: Date, separator = '-'): string {
//   const y = date.getFullYear();
//   const m = pad2(date.getMonth() + 1);
//   const d = pad2(date.getDate());
//   return `${d}${separator}${m}${separator}${y}`; // dd-MM-yyyy
