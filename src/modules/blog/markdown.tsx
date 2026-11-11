import type { ReactNode } from "react";
function inline(text: string): ReactNode[] {
  return text.split(/(!?\[[^\]]*\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    const link = part.match(/^(!?)\[([^\]]*)\]\(([^)]+)\)$/);
    if (link) {
      const [, image, label, url] = link;
      if (!/^(\/[^/]|https?:\/\/)/.test(url)) return label;
      return image ? (
        <img
          key={i}
          src={url}
          alt={label}
          loading="lazy"
          className="rounded-xl max-w-full"
        />
      ) : (
        <a
          key={i}
          href={url}
          className="text-primary underline"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    return part;
  });
}
export function Markdown({ value }: { value: string }) {
  return (
    <div className="space-y-4 break-words leading-relaxed">
      {value.split(/\n\s*\n/).map((block, i) => {
        if (block.startsWith("### "))
          return (
            <h3 key={i} className="text-headline-sm font-bold">
              {inline(block.slice(4))}
            </h3>
          );
        if (block.startsWith("## "))
          return (
            <h2 key={i} className="text-headline-md font-bold">
              {inline(block.slice(3))}
            </h2>
          );
        if (block.startsWith("# "))
          return (
            <h2 key={i} className="text-headline-lg font-bold">
              {inline(block.slice(2))}
            </h2>
          );
        if (block.split("\n").every((line) => line.startsWith("- ")))
          return (
            <ul className="list-disc pl-6" key={i}>
              {block.split("\n").map((line, n) => (
                <li key={n}>{inline(line.slice(2))}</li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="whitespace-pre-line">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
