import Link from "~src/lib/components/Link";
import * as PostService from "~src/lib/services/posts";
import { t } from "~src/lib/services/translations";
import formatDate from "~src/lib/utils/formatDate";

export default async function Page() {
  const posts = await PostService.getAllPosts();

  return (
    <>
      <h1>{t("POSTS_TITLE")}:</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/post/${post.slug}`}>
              {post.title} <time>({formatDate(post.date)})</time>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
