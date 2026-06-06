// Thin wrapper around localStorage so the rest of the app never touches
// the raw API and we fail gracefully when storage is unavailable.

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}
