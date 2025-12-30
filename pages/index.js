import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function createPaste() {
    setError("");
    setResult("");

    if (!content.trim()) {
      setError("Content cannot be empty");
      return;
    }

    const body = {
      content,
    };

    if (ttl) body.ttl_seconds = Number(ttl);
    if (views) body.max_views = Number(views);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setResult(data.url);
    setContent("");
    setTtl("");
    setViews("");
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows="8"
        style={{ width: "100%" }}
        placeholder="Enter your text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="TTL in seconds (optional)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Max views (optional)"
        value={views}
        onChange={(e) => setViews(e.target.value)}
      />

      <br /><br />

      <button onClick={createPaste}>Create Paste</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <p>
          Paste URL:{" "}
          <a href={result} target="_blank" rel="noreferrer">
            {result}
          </a>
        </p>
      )}
    </div>
  );
}
