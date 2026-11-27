import { ContentText } from "@/components/content";
import { PublicIcon } from "@/components/site/public-ui";

const steps = [
  { icon: "travel_explore", title: "tours.text-057", text: "tours.text-058" },
  { icon: "edit_calendar", title: "tours.text-060", text: "tours.text-061" },
  { icon: "support_agent", title: "tours.text-063", text: "tours.text-064" },
  { icon: "directions_boat", title: "tours.text-066", text: "tours.text-067" },
] as const;

const questions = [
  ["tours.text-075", "tours.text-076"],
  ["tours.text-077", "tours.text-078"],
  ["tours.text-079", "tours.text-080"],
] as const;

export function ToursFaq({ stepsTitle }: { stepsTitle: string }) {
  return (
    <div className="mt-10 space-y-8 border-t border-border-subtle pt-8 sm:mt-14 sm:pt-10">
      <section aria-labelledby="tour-steps-title">
        <h2
          id="tour-steps-title"
          className="mb-4 text-2xl font-extrabold tracking-tight"
        >
          {stepsTitle}
        </h2>
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ icon, title, text }) => (
            <li
              key={title}
              className="flex min-w-0 items-start gap-3 rounded-2xl border border-border-subtle bg-surface p-4"
            >
              <PublicIcon
                name={icon}
                className="grid h-10 w-10 place-items-center rounded-xl bg-surface-brand text-xl text-primary"
              />
              <div className="min-w-0">
                <h3 className="font-bold">
                  <ContentText contentKey={title} />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                  <ContentText contentKey={text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="tour-faq-title">
        <h2
          id="tour-faq-title"
          className="mb-4 text-2xl font-extrabold tracking-tight"
        >
          <ContentText contentKey="tours.text-074" />
        </h2>
        <div className="grid gap-2">
          {questions.map(([question, answer]) => (
            <details
              key={question}
              className="group rounded-xl border border-border-subtle bg-surface"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
                <ContentText contentKey={question} />
                <PublicIcon
                  name="expand_more"
                  className="shrink-0 text-xl text-primary group-open:rotate-180"
                />
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-on-surface-variant">
                <ContentText contentKey={answer} />
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
