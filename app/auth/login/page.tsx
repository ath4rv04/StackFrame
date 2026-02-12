"use client"

import { loginSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    const form = useForm({
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: "",
                password: "",
            },
        });

    function onSubmit(data: z.infer<typeof loginSchema>) {   

        startTransition(async () => {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                            onSuccess: () => {
                                toast.success("Logged in successfully");
                                router.push("/welcome");
                            },
                            onError: (error) => {
                                toast.error(error.error.message);
                            },
                        }
            });
        })
        }
    
    return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-border/60">
        
        <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
            </CardTitle>
            <CardDescription>
            Sign in to continue writing.
            </CardDescription>
        </CardHeader>

        <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                    type="email"
                    placeholder="john@doe.com"
                    aria-invalid={fieldState.invalid}
                    {...field}
                    />
                    {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
                )}
            />

            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                    type="password"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    {...field}
                    />
                    {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
                )}
            />

            <Button className="w-full" disabled={isPending}>
                {isPending ? (
                <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Signing in...
                </>
                ) : (
                "Sign in"
                )}
            </Button>

            </form>

            <div className="mt-8 border-t border-border pt-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                    New to Stackframe?
                </p>
                <Link
                    href="/auth/sign-up"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                    Create an account →
                </Link>
            </div>

        </CardContent>
        </Card>
    </div>
    );

}