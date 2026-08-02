import { ChevronDown } from "lucide-react";

export type FAQItem = { question: string; answer: string };

type FAQAccordionProps = {
  items: FAQItem[];
};

// Native <details>/<summary> — keyboard operable and exposes expanded state
// to assistive tech without any client-side JS, so this stays a Server
// Component like the rest of the internal-page kit.
export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="flex flex-col divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-h5 text-foreground marker:content-none">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-secondary transition-transform duration-150 group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 max-w-3xl text-body text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
