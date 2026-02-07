"use server"

import z from "zod";
import { blogSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

//useMutation works only on client side env.
//use fetchMutation, fetchQuery and fetchAction
//whenever you are in a server component use redirect

//create only mutation logic from here. It creates an internal post request
//it is a public endpoint. Treat it like an API route. Auth the user. Data is validated
export async function createBlog(values: z.infer<typeof blogSchema>) {
    const parsed = blogSchema.safeParse(values);


    if(!parsed.success) {
        throw new Error("something went wrong");
    }

    const token = await getToken();

    await fetchMutation(
        api.posts.createPost,
        {
            body: parsed.data.title,
            title: parsed.data.content,
        }
    , { token });

    return redirect("/");
}

//we have to provide the token itself here
//this is for internal matter only