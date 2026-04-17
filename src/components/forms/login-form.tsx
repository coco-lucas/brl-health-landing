"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { loginUser } from "@/services/auth.service";
import type { AuthResponse } from "@/types";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginValues = z.infer<typeof loginSchema>;

function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className="mt-1.5 text-xs font-medium text-destructive"
    >
      {children}
    </p>
  );
}

export function LoginForm() {
  const [authError, setAuthError] = useState<string | null>(null);

  const mutation = useMutation<AuthResponse, Error, LoginValues>({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (data) => {
      setAuthError(null);
      console.log("[BRL] login ok — token:", data.token);
      // TODO: redirecionar para /dashboard após integração BetterAuth
    },
    onError: (error) => {
      setAuthError(error.message);
    },
  });

  const form = useForm({
    defaultValues: { email: "", password: "" } as LoginValues,
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => {
      setAuthError(null);
      await mutation.mutateAsync(value);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      noValidate
      className="flex flex-col gap-5"
    >
      {authError ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircleIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>{authError}</span>
        </div>
      ) : null}

      <form.Field name="email">
        {(field) => {
          const error = field.state.meta.errors?.[0];
          const errorMessage =
            typeof error === "string" ? error : error?.message;
          return (
            <div>
              <Label htmlFor={field.name}>E-mail</Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                autoComplete="email"
                placeholder="voce@brl.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={Boolean(errorMessage)}
                className={cn("mt-2 h-11")}
              />
              <FieldError>{errorMessage}</FieldError>
            </div>
          );
        }}
      </form.Field>

      <form.Field name="password">
        {(field) => {
          const error = field.state.meta.errors?.[0];
          const errorMessage =
            typeof error === "string" ? error : error?.message;
          return (
            <div>
              <Label htmlFor={field.name}>Senha</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                autoComplete="current-password"
                placeholder="••••••"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={Boolean(errorMessage)}
                className={cn("mt-2 h-11")}
              />
              <FieldError>{errorMessage}</FieldError>
            </div>
          );
        }}
      </form.Field>

      <Button
        type="submit"
        size="lg"
        className="mt-2 h-11 bg-brl-purple text-white hover:bg-brl-purple/90"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <>
            <Loader2Icon className="animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
}
