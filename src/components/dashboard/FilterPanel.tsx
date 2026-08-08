import { Select } from "@/components/ui/Select";

export type FilterConfig = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
};

// Generic filter row — a set of labelled <Select>s driven entirely by
// props, reused across the CRM and Procurement/Inventory pages that need
// simple filtering but don't already have bespoke inline filters the way
// LeadTable/RFQTable/ProjectTable do (those keep their own — retrofitting
// a generic component onto an already-cohesive table toolbar wasn't
// worth it).
export function FilterPanel({ filters }: { filters: FilterConfig[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Select
          key={filter.label}
          aria-label={filter.label}
          value={filter.value}
          onChange={(e) => filter.onChange(e.target.value)}
          className="w-full sm:w-44"
        >
          {filter.options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Select>
      ))}
    </div>
  );
}
