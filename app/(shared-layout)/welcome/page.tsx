"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

export default function Home() {
  const posts = useQuery(api.posts.getPost);

  if (!posts) return (
      <div className="py-24 text-center text-muted-foreground">
        Loading entries...
      </div>
    );

    if (posts.length === 0) {
  return (
    <div className="py-24 space-y-16">
      
      <header className="space-y-6 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">
          Structured thinking for developers.
        </h1>
        <p className="text-muted-foreground text-lg">
          Stackframe explores code, systems, and ideas —
          built with Next.js and curiosity.
        </p>
      </header>

      <div className="max-w-xl mx-auto">
        <div className="rounded-2xl border border-border/40 p-10 text-center space-y-4">

        <p className="text-lg font-medium">
          No articles yet.
        </p>
        <p className="text-muted-foreground text-sm">
          Start writing your first structured thought.
        </p>

        <Link
          href="/create"
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Create your first post →
        </Link>
      </div>
    </div>
    </div>
  );
}

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 space-y-16">
      
      {/* Hero */}
      <header className="space-y-6 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">
          Structured thinking for developers.
        </h1>
        <p className="text-muted-foreground text-lg">
          Stackframe explores code, systems, and ideas —
          built with Next.js and curiosity.
        </p>
      </header>

      {/* <div className="flex gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
      {["All", "Cyber Security", "Java", "Projects"].map((tag) => (
        <button 
          key={tag}
          className="px-4 py-1.5 rounded-full border border-border bg-card/50 text-sm hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
        >
          {tag}
        </button>
      ))}
    </div> */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
        {posts.map((post, index) => {
          const isFeatured = index === 0;
          return (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${isFeatured ? "md:col-span-6 lg:col-span-4" : "md:col-span-3 lg:col-span-2"}`}
            >
              <Link href={`/blog/${post._id}`} className="group block h-full">
                <article className="flex flex-col h-full border border-border/60 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 bg-card/30 backdrop-blur-sm">
                  {/* Image Container */}
                  <div className={`relative w-full ${isFeatured ? "aspect-21/9" : "aspect-video"} overflow-hidden`}>
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center italic text-muted-foreground">
                        No Preview Available
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <CalendarDays className="w-3 h-3" />
                      {new Date(post._creationTime).toLocaleDateString()}
                    </div>
                    
                    <h2 className={`font-bold mb-3 group-hover:text-primary transition-colors ${isFeatured ? "text-3xl" : "text-xl"}`}>
                      {post.body}
                    </h2>
                    
                    <p className="text-muted-foreground line-clamp-2 text-sm mb-6">
                      {post.title}
                    </p>

                    <div className="mt-auto pt-4 flex items-center text-sm font-medium border-t border-border/50">
                      Read Full Report
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}