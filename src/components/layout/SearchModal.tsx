"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { collections } from "@/lib/data";
import { useUIStore } from "@/stores/ui";

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const collectionResults = useMemo(() => {
    if (!query.trim()) return [];
    return collections.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.roomType.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/40 p-4 pt-24 backdrop-blur-md"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[#FAFAF8] shadow-2xl dark:bg-[#1A1816]"
          >
            <div className="flex items-center gap-4 border-b border-[#E8E0D5] px-6 py-4 dark:border-white/10">
              <Search className="h-5 w-5 text-foreground/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections, products..."
                autoFocus
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-foreground/40"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-foreground/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-6">
              {!query.trim() && (
                <p className="text-center text-sm text-foreground/50">
                  Start typing to search the showroom.
                </p>
              )}

              {collectionResults.length > 0 && (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                    Collections
                  </p>
                  <div className="space-y-2">
                    {collectionResults.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/collections/${c.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between rounded-2xl bg-white p-4 transition-colors hover:bg-[#E8E0D5]/20 dark:bg-[#2C2A26] dark:hover:bg-white/5"
                      >
                        <div>
                          <p className="font-serif text-lg font-medium">{c.name}</p>
                          <p className="text-sm text-foreground/60">{c.roomType}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-foreground/40" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && collectionResults.length === 0 && (
                <p className="text-center text-sm text-foreground/50">
                  No results for “{query}”.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
