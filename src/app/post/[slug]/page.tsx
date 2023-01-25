import { notFound } from "next/navigation";
import CommentSection from "~src/lib/components/CommentSection";
import Markdown from "~src/lib/components/Markdown";
import * as PostService from "~src/lib/services/posts";
import { t } from "~src/lib/services/translations";
import formatDate from "~src/lib/utils/formatDate";

type Params = { slug: string };
type Props = { params: Params };

export async function generateStaticParams() {
  const posts = await PostService.getAllPosts();

  return posts.map<Params>((post) => ({ slug: post.slug }));
}

export default async function Page({ params: { slug } }: Props) {
  const post = await PostService.getPostBySlug(slug);

  if (post === null) return notFound();

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <p>
          <time>{formatDate(post.date)}</time>
        </p>
      </header>
      <div>
        <Markdown>{post.content}</Markdown>
      </div>
      <section>
        <h3>{t("COMMENTS_TITLE")}</h3>
        <CommentSection slug={post.slug} initialComments={post.comments} />
      </section>
    </article>
  );
}
