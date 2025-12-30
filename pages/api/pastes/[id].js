import { redis } from "../../../lib/redis";

function getNow(req) {
  if (process.env.TEST_MODE === "1") {
    const testNow = req.headers["x-test-now-ms"];
    if (testNow) return Number(testNow);
  }
  return Date.now();
}

export default async function handler(req, res) {
  const { id } = req.query;

  const paste = await redis.get(`paste:${id}`);

  if (!paste) {
    return res.status(404).json({ error: "Not found" });
  }

  const now = getNow(req);

  if (paste.expires_at && now > paste.expires_at) {
    await redis.del(`paste:${id}`);
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.remaining_views !== null) {
    if (paste.remaining_views <= 0) {
      return res.status(404).json({ error: "View limit exceeded" });
    }
    paste.remaining_views -= 1;
    await redis.set(`paste:${id}`, paste);
  }

  res.status(200).json({
    content: paste.content,
    remaining_views: paste.remaining_views,
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null,
  });
}
