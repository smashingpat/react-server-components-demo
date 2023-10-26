import randomNumber from "~src/lib/utils/randomNumber";
import sleep from "~src/lib/utils/sleep";

// fetch function
export async function fetchArticle(slug: string) {
  await sleep(randomNumber(500, 1000));

  return {
    slug: "my-first-article",
    title: "My first article",
    content: "some content",
    date: new Date(2023, 10, 26),
    authorId: 1,
  };
}

export async function fetchAuthor(id: number) {
  await sleep(randomNumber(200, 600));

  return {
    id: 1,
    name: "Patrick",
    emoji: "🐻",
    hobbies: [0, 1, 2, 3],
  };
}

export async function fetchHobby(id: number) {
  await sleep(randomNumber(200, 1000));

  const hobbies = [
    "wrestling with bears",
    "make bear puns",
    "cook with my bear hands",
    "telling people koalas are in fact not bears",
  ];
  return hobbies.at(id) ?? null;
}
