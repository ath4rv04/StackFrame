"use client"

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function SignUpPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof signUpSchema>) {   

        startTransition( async () => {
            await authClient.signUp.email({
            email: data.email,
            name: data.name,
            password: data.password,

            fetchOptions: {
                            onSuccess: () => {
                                toast.success("Account created successfully");
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
            Create your account
            </CardTitle>
            <CardDescription>
            Start writing on Stackframe.
            </CardDescription>
        </CardHeader>

        <CardContent>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            >
            
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel>Full name</FieldLabel>
                    <Input
                    placeholder="John Doe"
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
                    Creating account...
                </>
                ) : (
                "Create account"
                )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <a
                href="/auth/login"
                className="text-primary hover:underline"
                >
                Sign in
                </a>
            </p>

            </form>
        </CardContent>
        </Card>
    </div>
    );
}