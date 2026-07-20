"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SignInInput, signInSchema } from "../validation"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import Google from "@/components/google"
import Github from "@/components/github"
import Link from "next/link"

export default function SignIn() {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: SignInInput) {}
  return (
    <Card className="w-full max-w-md rounded-2xl border-0 shadow-xl">
      <div className="flex justify-center pt-8">
        <Logo color="#000" />
      </div>

      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">Sign In</CardTitle>

        <CardDescription>Sign in to continue.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signin-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>

                <Input {...field} type="email" placeholder="john@example.com" />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>

                <Input {...field} type="password" placeholder="********" />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="signin-form"
          className="h-11 w-full rounded-lg"
        >
          Sign In
        </Button>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="flex h-11 w-full items-center gap-3"
        >
          <Google />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="flex h-11 w-full items-center gap-3"
        >
          <Github />
          Continue with GitHub
        </Button>
        {/* Bottom Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
