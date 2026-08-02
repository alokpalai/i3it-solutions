import { FAQAccordion, type FAQItem } from "@/components/internal/FAQAccordion";

export type FAQGroup = { heading: string; items: FAQItem[] };

type GovernmentFAQProps =
  | { items: FAQItem[]; groups?: undefined }
  | { groups: FAQGroup[]; items?: undefined };

// Flat FAQItem[] for pages with one topical FAQ block (Government landing,
// GeM Procurement); grouped FAQGroup[] for the dedicated /government/faq
// page, which organizes a larger question set under named headings. Both
// forms render through the same FAQAccordion (Phase 3C) — no duplicated
// accordion markup.
export function GovernmentFAQ(props: GovernmentFAQProps) {
  if (props.groups) {
    return (
      <div className="flex flex-col gap-10">
        {props.groups.map((group) => (
          <div key={group.heading} className="flex flex-col gap-4">
            <h3 className="text-h4 text-foreground">{group.heading}</h3>
            <FAQAccordion items={group.items} />
          </div>
        ))}
      </div>
    );
  }

  return <FAQAccordion items={props.items} />;
}
