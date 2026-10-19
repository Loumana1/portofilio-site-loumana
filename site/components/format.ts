/** "2024-11-21" → { day: "21", month: "Nov", year: "2024", long: "21 November 2024" } */
export function splitDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  const month = d.toLocaleString('en-GB', { month: 'short' });
  const long = d.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return { day: String(d.getDate()).padStart(2, '0'), month, year: String(d.getFullYear()), long };
}

/** Escape text that goes into an HTML attribute or text node. */
export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);
}
