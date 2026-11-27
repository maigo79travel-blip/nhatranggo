import brand from "@/config/brand.json";
import Link from "next/link";
import { useT } from "@/components/content";
import { PublicIcon } from "@/components/site/public-ui";

export function SupportGuide({
  lookup = false,
  visa = false,
}: {
  lookup?: boolean;
  visa?: boolean;
}) {
  const t = useT();
  const guide = t.pages.supportGuide;
  const icons = lookup
    ? ["receipt_long", "phone_in_talk", "update"]
    : ["edit_note", "support_agent", visa ? "check_circle" : "task_alt"];
  const rawSteps = lookup
    ? guide.lookupSteps
    : visa
      ? guide.visaSteps
      : guide.contactSteps;
  const steps = rawSteps.map(([title, description], index) => [
    icons[index],
    title,
    description.replace("{brand}", brand.name),
  ]);
  return (
    <aside className="public-support-card">
      <div className="public-support-heading">
        <PublicIcon
          name={
            lookup
              ? "travel_explore"
              : visa
                ? "contact_support"
                : "support_agent"
          }
        />
      </div>
      {!visa && (
        <p className="text-primary text-xs font-bold uppercase tracking-widest">
          {brand.name} {guide.companionSuffix}
        </p>
      )}
      <h2 className="text-2xl font-bold">
        {lookup
          ? guide.lookupHeading
          : visa
            ? guide.visaHeading
            : guide.contactHeading}
      </h2>
      <ol className="space-y-6">
        {steps.map(([icon, title, description]) => (
          <li key={icon} className="flex gap-3">
            <PublicIcon name={icon} className="text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">{title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="border-t border-secondary/15 pt-5 text-sm text-on-surface-variant">
        {guide.needMoreHelp}{" "}
        <Link
          href="/lien-he"
          className="font-bold text-primary underline underline-offset-4"
        >
          {guide.contactUs}
        </Link>
      </div>
    </aside>
  );
}
