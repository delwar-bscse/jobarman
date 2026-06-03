/**
 * Client-side fetch utility for "use client" components.
 *
 * Instead of calling myFetch (a "use server" Server Action) directly —
 * which breaks under cross-origin dev setups — this routes requests
 * through /api/proxy/[...path], a same-origin Next.js API route that
 * calls myFetch on the server where it works reliably.
 *
 * Usage is identical to myFetch:
 *   const res = await clientFetch("/job-post/feed?page=1");
 */
export const clientFetch = async (
  url,
  { method = "GET", body, headers = {} } = {}
) => {
  // Strip leading slash and separate path from query string
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  const qIndex = cleanUrl.indexOf("?");
  const path = qIndex >= 0 ? cleanUrl.slice(0, qIndex) : cleanUrl;
  const queryString = qIndex >= 0 ? cleanUrl.slice(qIndex) : "";

  const proxyUrl = `/api/proxy/${path}${queryString}`;

  const isFormData = body instanceof FormData;
  const hasBody = body !== undefined && method !== "GET";

  const reqHeaders = {
    Accept: "application/json",
    ...headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  try {
    const response = await fetch(proxyUrl, {
      method,
      headers: reqHeaders,
      ...(hasBody && { body: isFormData ? body : JSON.stringify(body) }),
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Network error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
