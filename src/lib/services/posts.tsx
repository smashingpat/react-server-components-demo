import { faker } from "@faker-js/faker";
import uuid from "../utils/uuid";

export type PostComment = {
  id: string;
  content: string;
  date: Date;
};
export interface Post {
  slug: string;
  title: string;
  content: string;
  date: Date;
  comments: PostComment[];
}

function sortComments(comments: PostComment[]) {
  return [...comments].sort((a, b) => (a.date < b.date ? 1 : -1));
}

function createPost(
  title: string,
  content: string,
  date: Date,
  comments: string[] = [],
): Post {
  return {
    title,
    slug: title.replaceAll(" ", "-").toLowerCase(),
    content: content.trim(),
    date,
    comments: sortComments(
      comments.map((comment) => ({
        id: uuid(),
        content: comment,
        date: faker.date.past(),
      })),
    ),
  };
}

const DB: Post[] = [
  createPost(
    "My first post",
    faker.lorem.paragraphs({ min: 1, max: 3 }, "\n\n"),
    faker.date.recent(),
    [faker.lorem.paragraph(), faker.lorem.paragraph()],
  ),
  createPost(
    "My second post",
    faker.lorem.paragraphs({ min: 1, max: 3 }, "\n\n"),
    faker.date.recent(),
    [faker.lorem.paragraph()],
  ),
  createPost(
    "My third post",
    faker.lorem.paragraphs({ min: 1, max: 3 }, "\n\n"),
    faker.date.recent(),
  ),
];

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return DB.find((p) => p.slug === slug) ?? null;
}

export async function getAllPosts(): Promise<Post[]> {
  return DB;
}

export async function addComment(slug: string, comment: string) {
  const found = DB.find((c) => c.slug === slug);
  if (found) {
    const newComment = {
      id: uuid(),
      content: comment,
      date: new Date(),
    };
    found.comments.push(newComment);
    found.comments = sortComments(found.comments);
    return newComment;
  }

  return null;
}
