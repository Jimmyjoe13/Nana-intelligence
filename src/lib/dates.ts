// Conversion des dates d'articles (« 26 Septembre 2026 ») au format ISO 8601
// (« 2026-09-26 ») attendu par schema.org / Google pour datePublished et dateModified.
const MONTHS: Record<string, string> = {
  janvier: "01",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  decembre: "12",
};

export function toIsoDate(frDate: string): string {
  if (/^\d{4}-\d{2}-\d{2}/.test(frDate)) return frDate.slice(0, 10);
  const m = frDate.trim().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  if (!m) return frDate;
  const month = MONTHS[m[2].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()];
  if (!month) return frDate;
  return `${m[3]}-${month}-${m[1].padStart(2, "0")}`;
}
