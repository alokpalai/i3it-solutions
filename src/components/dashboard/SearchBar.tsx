"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, FolderKanban, CheckSquare, FileText, X } from "lucide-react";
import { mockProjects, mockTasks, mockDocuments } from "@/config/dashboardMockData";

type SearchResult = { label: string; category: string; href: string; icon: typeof Search };

// "Architecture only" per the brief — there's no search index or API
// route behind this. What it does do is filter the mock datasets already
// loaded client-side, which demonstrates the intended UX (categorized
// results, keyboard-reachable) without pretending a real backend exists.
// Swapping in a real search means replacing `results` below with an API
// call; the rendering stays the same.
function getResults(query: string): SearchResult[] {
  if (query.trim().length < 2) return [];
  const q = query.toLowerCase();

  const projectResults: SearchResult[] = mockProjects
    .filter((p) => p.name.toLowerCase().includes(q))
    .map((p) => ({ label: p.name, category: "Projects", href: "/dashboard/projects", icon: FolderKanban }));

  const taskResults: SearchResult[] = mockTasks
    .filter((t) => t.title.toLowerCase().includes(q))
    .map((t) => ({ label: t.title, category: "Tasks", href: "/dashboard/tasks", icon: CheckSquare }));

  const documentResults: SearchResult[] = mockDocuments
    .filter((d) => d.name.toLowerCase().includes(q))
    .map((d) => ({ label: d.name, category: "Documents", href: "/dashboard/documents", icon: FileText }));

  return [...projectResults, ...taskResults, ...documentResults].slice(0, 8);
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => getResults(query), [query]);

  return (
    <div ref={containerRef} className="relative hidden w-full max-w-sm sm:block">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="dashboard-search-results"
          placeholder="Search projects, tasks, documents…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-9 text-body-sm text-foreground placeholder:text-muted-foreground focus:bg-background"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <ul
          id="dashboard-search-results"
          className="absolute z-50 mt-2 w-full rounded-md border border-border bg-background py-2 shadow-lg"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-body-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</li>
          ) : (
            results.map((result) => (
              <li key={`${result.category}-${result.label}`}>
                <Link
                  href={result.href}
                  className="flex items-center gap-3 px-4 py-2 text-body-sm text-foreground hover:bg-surface"
                >
                  <result.icon aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{result.label}</span>
                  <span className="ml-auto shrink-0 text-caption text-muted-foreground">{result.category}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
