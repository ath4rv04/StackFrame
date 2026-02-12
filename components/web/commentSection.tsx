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
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <MessageSquare className="size-5"/>
                <h2 className="text-xl font-bold">{data.length} Comments</h2>
            </CardHeader>

            <CardContent className="space-y-8">
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name ="body"
                        control={form.control}
                        render = {({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Enter your comment here</FieldLabel>
                                <Textarea
                                    aria-invalid = {fieldState.invalid}
                                    placeholder="Share your thoughts"
                                    {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )} />

                        <Button disabled = {isPending}>{isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <span>Submit</span>
                        )}</Button>
                </form>

                {data?.length > 0 && <Separator />}
                <section className="space-y-6">
                        {data?.map((comment) => (
                            <div key={comment._id} className="flex gap-4">
                                <Avatar className="size-10 shrink-0">
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
                                        <p className="font-semibold text-sm">{comment.authorName}</p>
                                        <p className="text-muted-foreground text-xs">{new Date(comment._creationTime).toLocaleDateString("en-US")}</p>
                                    </div>

                                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{comment.body}</p>
                                </div>
                            </div>
                        ))}
                </section>
            </CardContent>
        </Card>
    )
}

//convex is reactive by default but if we use fetchQuery function its not reactive anymore
//we get our data we use useQuery(). It is the same as fetch query

//convex is powerful as we dont have to think about caching and all. All this complexity has been solved by convex, we just have to mutate the data and query the data

//the comment section has realtime functionality.

//we do fetch comments on the client side