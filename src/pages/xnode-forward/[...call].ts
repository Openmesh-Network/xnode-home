import type { APIRoute } from "astro";

export const ALL = (async ({ request }) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Accept self-signed certificates

  const headers = new Headers(request.headers);
  headers.set("Host", "manager.xnode.local");

  const targetUrl = `https://${request.url.split("/xnode-forward/").at(1)}`;

  return fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.body ? await request.bytes() : undefined,
  }).then((response) => {
    // https://github.com/nodejs/undici/issues/2514
    const headers = new Headers(response.headers);
    headers.delete("content-encoding");
    headers.delete("content-length");
    return new Response(response.body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    });
  });
}) satisfies APIRoute;
