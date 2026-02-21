const API_KEY = process.env.RAPIDAPI_SPOTIFY_API_KEY_1 as string;
const BASE_URL = process.env.RAPIDAPI_SPOTIFY_URL as string;
const API_HOST = process.env.RAPIDAPI_HOST as string;

const defaultHeaders = {
  "x-rapidapi-key": API_KEY,
  "x-rapidapi-host": API_HOST,
};

type Success<T> = { ok: true; dataRes: T };
type Failure = { ok: false; error: string; status: number };
export type SpotifyResult<T> = Success<T> | Failure;

export async function spotifyFetch<T>(endpoint: string, params?: Record<string, string>): Promise<SpotifyResult<T>> {
  try {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    if (params) Object.entries(params).forEach(([key, val]) => url.searchParams.append(key, val));

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: defaultHeaders,
      next: { revalidate: 604800 }, // 7 díasssssss
    });

    if (!res.ok) return { ok: false, error: res.statusText, status: res.status };

    const dataRes: T = await res.json();
    return { ok: true, dataRes };
  } catch (e) {
    return { ok: false, error: "Se produjo un error interno, reportelo con el creador de la app XD", status: 0 };
  }
}