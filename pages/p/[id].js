import Head from "next/head";
import { redis } from "../../lib/redis";

export async function getServerSideProps({ params }) {
  const paste = await redis.get(`paste:${params.id}`);

  if (!paste) {
    return { notFound: true };
  }

  if (paste.expires_at && Date.now() > paste.expires_at) {
    return { notFound: true };
  }

  return {
    props: {
      content: paste.content,
    },
  };
}

export default function PastePage({ content }) {
  return (
    <>
      <Head>
        <title>Paste</title>
      </Head>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {content}
      </pre>
    </>
  );
}
