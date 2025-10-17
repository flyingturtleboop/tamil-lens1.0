const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export async function apiFetch(path: string, init: RequestInit = {}) {
  return fetch(`${API_BASE}${path}`, {
    credentials: "include", // send cookies (refresh token)
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    ...init,
  });
}

export async function apiFetchWithAuth(
  path: string,
  init: RequestInit = {},
  getAccessToken: () => string | null,
  onRefresh: () => Promise<string | null>
) {
  const token = getAccessToken();
  const doFetch = async (atk?: string | null) =>
    fetch(`${API_BASE}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(atk ? { Authorization: `Bearer ${atk}` } : {}),
        ...(init.headers || {}),
      },
      ...init,
    });

  let res = await doFetch(token);
  if (res.status === 401) {
    const newToken = await onRefresh();
    if (newToken) res = await doFetch(newToken);
  }
  return res;
}
