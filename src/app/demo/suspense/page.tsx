"use client";

import React from "react";
import { fetchArticle, fetchAuthor, fetchHobby } from "./fetchers";
// import { createCache, useCacheValue } from "~src/lib/utils/suspenseStore";

// const articleCache = createCache(fetchArticle);
// const authorCache = createCache(fetchAuthor);
// const hobbyCache = createCache(fetchHobby);

// loading component
function Loading() {
  return <span style={{ color: "red" }}>Loading</span>;
}

function useData<T>(fetcher: () => Promise<T>) {
  const [value, setValue] = React.useState<T | null>(null);
  const [pending, setPending] = React.useState(true);

  React.useEffect(() => {
    fetcher()
      .then(setValue)
      .finally(() => setPending(false));
  }, []);

  return { value, pending };
}

// components with data
function Article({ slug }: { slug: string }) {
  const { value, pending } = useData(() => fetchArticle(slug));

  if (pending) return <Loading />;
  if (!value) return <h1>not found</h1>;

  return (
    <article>
      <header>
        <h1>{value.title}</h1>
      </header>
      <main>
        <p>{value.content}</p>
      </main>
      <footer>
        <Author id={value.authorId} />
      </footer>
    </article>
  );
}

function Author({ id }: { id: number }) {
  const { value, pending } = useData(() => fetchAuthor(id));

  if (pending) return <Loading />;
  if (!value) return null;

  return (
    <div style={{ border: "1px solid" }}>
      <h3>
        {value.emoji} {value.name}
      </h3>
      <ul>
        {value.hobbies.map((id) => (
          <li key={id}>
            <Hobby id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Hobby({ id }: { id: number }) {
  const { value, pending } = useData(() => fetchHobby(id));

  if (pending) return <Loading />;
  if (!value) return null;

  return <span>{value}</span>;
}

// the page
export default function Page() {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  if (!render) return null;

  return (
    <>
      <Article slug="my-first-article" />
    </>
  );
}
