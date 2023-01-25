import { addComment } from "~src/lib/services/posts";

export async function POST(request: Request) {
  const { slug, comment } = await request.json();
  if (typeof slug !== "string")
    return new Response("Missing slug.", { status: 400 });
  if (typeof comment !== "string")
    return new Response("Missing comment.", { status: 400 });
  const post = await addComment(slug, comment);
  if (!post) return new Response("Could not create comment", { status: 400 });
  return new Response(JSON.stringify(post), {
    headers: { "Content-Type": "application/json" },
  });
}
