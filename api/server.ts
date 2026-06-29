// Vercel serverless entry point for TanStack Start
import handler from "../dist/server/server.js";

export default async function vercelHandler(req: any, res: any) {
  const request = new Request(req.url || "/", {
    method: req.method || "GET",
    headers: req.headers as HeadersInit,
  });

  const response = await (handler as { fetch: (r: Request) => Promise<Response> }).fetch(request);

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (response.body) {
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    res.end(Buffer.concat(chunks));
  } else {
    res.end();
  }
}