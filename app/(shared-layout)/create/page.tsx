"use client"

import { createBlog } from "@/app/actions";
import { blogSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function createRoute() {
    const [isPending, startTransition] = useTransition();;
    
    const form = useForm({
            resolver: zodResolver(blogSchema),
            defaultValues: {
                title:"",
                content:"",
                image: undefined,
            },
        });

    function onSubmit(values: z.infer<typeof blogSchema>) {
        startTransition( async () => {
        
        console.log("This runs on client side");

        await createBlog(values); //server action - this will run on the server side
        });
    }

    return (
  <div className="py-24">
    
    <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          New article
        </h1>
        <p className="text-muted-foreground">
          Write something structured.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Input
                {...field}
                placeholder="Title"
                className="
                    text-3xl 
                    font-semibold 
                    bg-transparent 
                    border-none 
                    px-0 
                    focus-visible:ring-0 
                    placeholder:text-muted-foreground/50
                    
                "
                />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </div>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Textarea
                {...field}
                placeholder="Start writing..."
                className="
                    min-h-60
                    resize-none
                    bg-transparent
                    border-none
                    px-0
                    text-base
                    leading-relaxed
                    focus-visible:ring-0
                    placeholder:text-muted-foreground/50
                "
                />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </div>
          )}
        />

        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Input
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file ?? null);
                }}
                type="file"
                accept="image/*"
                className="
                    text-sm
                    border border-border
                    bg-muted/30
                    hover:bg-muted/50
                    transition-colors
                "
                />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </div>
          )}
        />

        <div className="pt-10 border-t border-border">
            <Button size="sm" disabled={isPending}>
                {isPending ? (
                <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Publishing...
                </>
                ) : (
                "Publish article"
                )}
            </Button>
        </div>

      </form>

    </div>
  </div>
);
}

//file upload => client send upload req to sever which create api call to convex.
//convex moves to bucket which generates a presigned url which will be returned back to the client
//image will be uploaded to the client side. the files can be as large as wanted or needed.
//vercel size limit 4.5mb, next js 1mb limit => server limit

//whenever you upload files dont upload them on the server side. Validate them too