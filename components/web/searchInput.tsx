import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);

    const results = useQuery(
        api.posts.searchPosts, term.length >= 2 ? {limit: 5, term: term} : "skip"
    );

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTerm(e.target.value);
        setOpen(true);
    }

    return (
        <div className="relative w-full max-w-sm z-100 search-container">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search..."
      value={term}
      onChange={handleInputChange}
      className="w-full pl-9 bg-muted/40 border-border focus-visible:ring-primary/40"
    />
  </div>

  {open && term.length >= 2 && (
    <div
      className="
        absolute top-full mt-2 w-full
        rounded-2xl
        border border-border
        bg-background
        shadow-xl
        overflow-hidden
      "
    >
      {results === undefined ? (
        <div className="flex items-center justify-center text-sm text-muted-foreground p-4">
          <Loader2 className="mr-2 animate-spin size-4" />
          Searching...
        </div>
      ) : results.length === 0 ? (
        <p className="p-4 text-sm text-muted-foreground text-center">
          No results found
        </p>
      ) : (
        <div className="divide-y divide-border/40">
          {results.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post._id}`}
              onClick={() => {
                setOpen(false);
                setTerm("");
              }}
              className="block px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <p className="font-medium truncate">
                {post.body}
              </p>
              <p className="text-xs text-muted-foreground pt-1 line-clamp-2">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )}
</div>


    )
}