type JsonLdProps = { data: object };

// Renders schema.org structured data inline. `data` is always our own
// static, locally-defined config content — never user input — so
// dangerouslySetInnerHTML here carries no injection risk.
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
