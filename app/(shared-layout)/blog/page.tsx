"use client"

import { useQuery } from "convex/react"; //client side component
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function blog() {
    const data = useQuery(api.posts.getPost)
    return(
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Insights, thoughts, and trends from our team.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((posts) => (
                    <Card key = {posts._id} className="pt-0">
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                            src="https://images.unsplash.com/photo-1770106678115-ec9aa241cdf6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" 
                            fill 
                            
                            className="rounded-t-lg"/>
                        </div>

                        <CardContent>
                            <Link href={'/blog/${post._id}'}>
                                <h1 className="text-2xl font-bold hover:text-primary">{posts.body}</h1>
                            </Link>
                            <p className="text-muted-foreground line-clamp-3">{posts.title}</p>
                        </CardContent>

                        <CardFooter>
                            <Link className={buttonVariants({
                                className: 'w-full',
                            })} href={'/blog/${post._id}'}>
                                Read More
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    ) // data is being fetched on the client side thats why we dont see it in the first time
}


//image optimises on the server side. This takes resources
//initial html is rendered on the server side.
//when you make a req the client component is pre render on the server side.
//After the html is fully loaded it downloads the js and executes it.
 