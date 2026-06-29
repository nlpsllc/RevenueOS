import defaultHandler from "../dist/server/server.js";

export default async function handler(req: any, res: any) {
  try {
    const url = new URL(req.url || "/", `https://${req.headers.host || "localhost"}`);

    const response: Response = await (defaultHandler as any).fetch(url.toString());

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
    res.end(`Handler Error: ${error?.message || error}`);
  }
}