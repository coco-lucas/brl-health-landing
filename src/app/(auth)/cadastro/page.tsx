import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "lucide-react";

import { RegisterForm } from "@/components/forms/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Criar conta — BRL Health",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-brl-dark px-4 py-12">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          nativeButton={false}
          className="mb-4 pl-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
          render={
            <Link href="/" aria-label="Voltar para a landing page">
              <ArrowLeftIcon />
              Voltar para a tela inicial
            </Link>
          }
        />

        <Link
          href="/"
          className="mb-8 block text-center font-display text-2xl font-extrabold tracking-tight"
          aria-label="BRL Health — voltar para a página inicial"
        >
          <span className="text-brl-purple">BRL</span>
          <span className="text-foreground"> Health</span>
        </Link>

        <Card className="border border-white/10 bg-brl-card p-2">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="font-display text-2xl font-bold">
              Vamos começar.
            </CardTitle>
            <CardDescription>
              Conta criada em 30 segundos. Sem cartão.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <RegisterForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link
                href="/login"
                className="font-medium text-brl-purple hover:underline"
              >
                Entrar
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
