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
import { registerUser } from "@/services/auth.service";
import type { AuthResponse } from "@/types";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;
type RegisterPayload = Pick<RegisterValues, "name" | "email" | "password">;

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

export function RegisterForm() {
  const [authError, setAuthError] = useState<string | null>(null);

  const mutation = useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: ({ name, email, password }) =>
      registerUser(name, email, password),
    onSuccess: (data) => {
      setAuthError(null);
      console.log("[BRL] register ok — token:", data.token);
      // TODO: redirecionar para /dashboard após integração BetterAuth
    },
    onError: (error) => {
      setAuthError(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as RegisterValues,
    validators: { onSubmit: registerSchema },
    onSubmit: async ({ value }) => {
      setAuthError(null);
      await mutation.mutateAsync({
        name: value.name,
        email: value.email,
        password: value.password,
      });
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

      <form.Field name="name">
        {(field) => {
          const error = field.state.meta.errors?.[0];
          const errorMessage =
            typeof error === "string" ? error : error?.message;
          return (
            <div>
              <Label htmlFor={field.name}>Nome</Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
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
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
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

      <form.Field name="confirmPassword">
        {(field) => {
          const error = field.state.meta.errors?.[0];
          const errorMessage =
            typeof error === "string" ? error : error?.message;
          return (
            <div>
              <Label htmlFor={field.name}>Confirmar senha</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                autoComplete="new-password"
                placeholder="Repita a senha"
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
            Criando conta...
          </>
        ) : (
          "Criar conta"
        )}
      </Button>
    </form>
  );
}
