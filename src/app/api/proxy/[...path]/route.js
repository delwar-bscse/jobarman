import { myFetch } from "../../../../../utils/myFetch";

/**
 * Catch-all API proxy route.
 * Client components fetch from /api/proxy/job-post/feed?page=1
 * which forwards to the external API via myFetch (server-side).
 *
 * This avoids using "use server" functions (Server Actions) from
 * client components, which can hang under cross-origin dev setups.
 */

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join("/");
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const url = `/${path}${queryString ? `?${queryString}` : ""}`;

  const res = await myFetch(url);
  return Response.json(res);
}

export async function POST(request, { params }) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join("/");
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const url = `/${path}${queryString ? `?${queryString}` : ""}`;

  let body;
  try {
    body = await request.json();
  } catch {
    body = undefined;
  }

  const res = await myFetch(url, { method: "POST", body });
  return Response.json(res);
}
