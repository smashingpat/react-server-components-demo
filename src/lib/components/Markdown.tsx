import { marked } from "marked";

export default function Markdown({ children }: { children: string }) {
  const parsed = marked.parse(children);

  return <div dangerouslySetInnerHTML={{ __html: parsed }} />;
}
