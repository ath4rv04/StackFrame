"use client"

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CommentSchema } from "@/app/schemas/comment";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Preloaded, usePreloadedQuery } from "convex/react";



export function CommentSection(props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) {
    const params = useParams<{postId: Id<"posts">}>() //a client component that lets you read a route's dyanmic params filled in by the current url

    const data = usePreloadedQuery(props.preloadedComments) //there is no on demand validation. this has been solved by convex
    const [isPending, startTransition] = useTransition()
    

    const createComment = useMutation(api.comments.createComment);

    const form = useForm({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            body: "",
            postId: params.postId,
        },
    });

    async function onSubmit (data: z.infer<typeof CommentSchema>) {
        startTransition(async() => {
            try {
                await createComment(data);
                form.reset();
                toast.success("Comment Posted");

            } catch {
                toast.error("Failed to post");

            }
        });
    }

    if(data == undefined) {
        return <p>Loading...</p>
    }
    return (
        <div className="border-border pt-8">

        <div className="flex items-center gap-2 mb-8">
            <MessageSquare className="size-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold tracking-tight">
            {data.length} comments
            </h2>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-10">
            
            <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
                <div className="space-y-2">
                <Textarea
                    {...field}
                    placeholder="Write a comment..."
                    aria-invalid={fieldState.invalid}
                    className="min-h-24 resize-none"
                />
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                )}
                </div>
            )}
            />

            <div className="flex justify-end">
            <Button size="sm" disabled={isPending}>
                {isPending ? (
                <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Posting...
                </>
                ) : (
                "Post comment"
                )}
            </Button>
            </div>

        </form>

        <section className="space-y-8">
            {data.map((comment) => (
            <div key={comment._id} className="flex gap-4 pb-6 border-b border-border/40 last:border-0">
                
                <Avatar className="size-9 shrink-0">
                <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.authorName}`}
                    alt={comment.authorName}
                />
                <AvatarFallback>
                    {comment.authorName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                    {comment.authorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                    {new Date(comment._creationTime).toLocaleDateString()}
                    </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {comment.body}
                </p>
                </div>

            </div>
            ))}
        </section>

        </div>

    )
}

//convex is reactive by default but if we use fetchQuery function its not reactive anymore
//we get our data we use useQuery(). It is the same as fetch query

//convex is powerful as we dont have to think about caching and all. All this complexity has been solved by convex, we just have to mutate the data and query the data

//the comment section has realtime functionality.

//we do fetch comments on the client side