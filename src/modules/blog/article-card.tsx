import Link from "next/link";
import { PublicIcon } from "@/components/site/public-ui";
import { isPublicImageUrl } from "@/lib/content-attributes";
import { getCurrentMessages, getPublicLocale } from "@/lib/i18n";
import { intlLocaleFor } from "@/lib/i18n/format";
import type { ArticleSummary } from "./service";

export async function ArticleDate({ date }: { date: Date }) {
  const locale = await getPublicLocale();
  const dateFormat = new Intl.DateTimeFormat(intlLocaleFor(locale), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant">
      <PublicIcon name="calendar_today" className="text-[18px] text-primary" />
      <time dateTime={date.toISOString()}>{dateFormat.format(date)}</time>
    </span>
  );
}

export async function ArticleCard({
  article,
  variant = "standard",
}: {
  article: ArticleSummary;
  variant?: "compact" | "standard" | "lead";
}) {
  const t = await getCurrentMessages();
  const lead = variant === "lead";
  const compact = variant === "compact";
  const hasImage = isPublicImageUrl(article.image);

  return (
    <article className="min-w-0 rounded-[22px] border border-border-subtle bg-surface shadow-card transition-shadow hover:shadow-card-hover">
      <Link
        href={`/blog/${article.slug}`}
        aria-label={`${t.home.readMorePrefix} ${article.title}`}
        className={`group flex h-full flex-col overflow-hidden rounded-[22px] ${lead ? "md:grid md:grid-cols-[minmax(0,1.18fr)_minmax(0,1fr)]" : ""}`}
      >
        <div
          className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-surface-brand ${lead ? "aspect-[2/1] md:aspect-auto md:min-h-64" : "aspect-[2.57]"}`}
        >
          {hasImage ? (
            <img
              src={article.image}
              alt=""
              loading={lead ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
            />
          ) : (
            <PublicIcon name="article" className="text-4xl text-primary" />
          )}
        </div>
        <div
          className={`flex min-w-0 flex-1 flex-col gap-3 ${lead ? "p-5 sm:p-7 lg:p-9" : "p-5"}`}
        >
          {!compact && article.category && (
            <span className="w-fit max-w-full rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-primary">
              {article.category}
            </span>
          )}
          <h3
            className={`break-words font-extrabold leading-snug text-on-surface transition-colors group-hover:text-primary ${lead ? "text-xl sm:text-2xl lg:text-[28px]" : "line-clamp-2 text-lg"}`}
          >
            {article.title}
          </h3>
          {!compact && article.excerpt && (
            <p className="line-clamp-3 break-words text-sm leading-relaxed text-on-surface-variant">
              {article.excerpt}
            </p>
          )}
          <div
            className={`mt-auto flex items-center justify-between gap-3 ${compact ? "" : "border-t border-border-subtle pt-3"}`}
          >
            <ArticleDate date={article.updated_at} />
            <PublicIcon
              name="arrow_forward"
              className="text-[22px] text-primary transition-transform motion-safe:group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
