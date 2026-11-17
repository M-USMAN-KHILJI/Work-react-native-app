/**
 * Date utility helpers for local timezone consistency across WorkPulse.
 */

/**
 * Returns a `YYYY-MM-DD` string in the user's local timezone (not UTC).
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
