import type { APIRoute } from "astro";
import { Agent, request as undiciRequest } from "undici";

export const ALL = (async ({ request }) => {
  const headers = new Headers(request.headers);
  headers.set("Host", "manager.xnode.local");

  const targetUrl = `https://${request.url.split("/xnode-forward/").at(1)}`;

  const response = await undiciRequest(targetUrl, {
    method: request.method,
    headers,
    body: request.body ? await request.bytes() : undefined,
    dispatcher: new Agent({
      connect: {
        // Ensure matched to correct upstream for handshake as well
        servername: "manager.xnode.local",
        // Accept self-signed certificates
        rejectUnauthorized: false,
      },
    }),
  });

  const responseHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(response.headers)) {
    if (value === undefined) {
      continue;
    }

    responseHeaders[key] = Array.isArray(value) ? value.join(", ") : value;
  }

  return new Response(new Uint8Array(await response.body.bytes()), {
    headers: responseHeaders,
    status: response.statusCode,
    statusText: response.statusText,
  });
}) satisfies APIRoute;
