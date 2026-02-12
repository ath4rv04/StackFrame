"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./searchInput";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth(); //whenever we want to get the user session we need to use useConvexAuth()
  const router = useRouter(); //programatically change routes client side
  

  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 relative z-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left */}
        <div className="flex items-center gap-8">
          
          <Link href="/welcome" className="text-lg font-medium tracking-tight">
            Stack<span className="text-primary">Frame</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/welcome" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/create" className="hover:text-foreground transition-colors">
              Create
            </Link>
          </div>
        </div>

        {/* Right */}
            <div className="flex items-center gap-6">
            
            <div className="hidden md:block">
                <SearchInput />
            </div>

            {!isLoading && (
                isAuthenticated ? (
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm"
                    onClick={() =>
                    authClient.signOut({
                        fetchOptions: {
                        onSuccess: () => {
                            toast.success("Logged out");
                            router.push("/");
                        },
                        onError: (error) => {
                            toast.error(error.error.message);
                        },
                        },
                    })
                    }
                >
                    Logout
                </Button>
                ) : (
                <div className="flex items-center gap-4">
                    <Link
                    href="/auth/login"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                    Login
                    </Link>
                    <Link href="/auth/sign-up">
                    <Button size="sm" className="px-4">
                        Sign up
                    </Button>
                    </Link>
                </div>
                )
            )}

            <ThemeToggle />
            </div>


      </div>
    </nav>
  );
}
