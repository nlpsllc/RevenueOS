import serverModule from "../dist/server/server.js";

export default async function handler(req: any, res: any) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "myaisaasapp.org";
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    const request = new Request(url.toString(), {
      method: req.method || "GET",
      headers: Object.entries(req.headers || {}).reduce((acc: any, [key, val]: [string, any]) => {
        acc[key] = Array.isArray(val) ? val.join(", ") : val;
        return acc;
      }, {} as Record<string, string>),
    });

    const response = await (serverModule as any).fetch(request);

    res.statusCode = response.status;
    response.headers.forEach((value: string, key: string) => {
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
  } catch (error: any) {
    console.error("Vercel handler error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Handler Error: ${error?.message || error}`);
  }
}