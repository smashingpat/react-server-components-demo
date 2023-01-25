"use client";

import React from "react";
import { PostComment } from "../services/posts";
import formatDate from "../utils/formatDate";

type Props = { slug: string; initialComments: PostComment[] };

export default function CommentSection({ slug, initialComments }: Props) {
  const [comments, setComment] = React.useState(initialComments);
  const commentRef = React.useRef<HTMLTextAreaElement>(null);
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const element = commentRef.current;
    if (!element) return;
    const value = element.value.trim() || null;
    if (value === null) return;
    const response = await fetch("/api/posts/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, comment: value }),
    });
    if (response.ok) {
      const data = await response.json();
      setComment((prev) => [
        {
          ...data,
          date: new Date(data.date),
        },
        ...prev,
      ]);
    }
    element.value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name="comment" ref={commentRef} />
        <br />
        <button>Send</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>
              <small>{formatDate(comment.date)}</small>
            </p>
            <p>{comment.content}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
