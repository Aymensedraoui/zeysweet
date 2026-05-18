// Tiny markdown renderer for blog posts (no deps).
// Supports: ## headings, paragraphs, "- " bullets, **bold**, *italic*.

import { type ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function renderMarkdown(md: string): ReactNode[] {
  const blocks = md.split(/\n\s*\n/);
  const out: ReactNode[] = [];
  blocks.forEach((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return;
    if (trimmed.startsWith("## ")) {
      out.push(
        <h2 key={i} className="font-display text-2xl md:text-3xl font-bold text-cocoa mt-10 mb-4">
          {inline(trimmed.slice(3))}
        </h2>,
      );
    } else if (trimmed.split("\n").every((l) => l.trim().startsWith("- "))) {
      out.push(
        <ul key={i} className="list-disc pl-6 my-4 space-y-2 text-cocoa/80">
          {trimmed.split("\n").map((l, j) => (
            <li key={j}>{inline(l.trim().slice(2))}</li>
          ))}
        </ul>,
      );
    } else {
      out.push(
        <p key={i} className="text-cocoa/80 leading-relaxed my-4">
          {inline(trimmed)}
        </p>,
      );
    }
  });
  return out;
}
