import Link from "next/link";
import type { Metadata } from "next";

import { LoginForm } from "@/components/forms/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Entrar — BRL Health",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-brl-dark px-4 py-12">
      <div className="w-full max-w-md">
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
              Bem-vindo de volta.
            </CardTitle>
            <CardDescription>
              Entre para continuar do ponto onde parou.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <LoginForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Link
                href="/cadastro"
                className="font-medium text-brl-purple hover:underline"
              >
                Criar conta
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Dica: use <span className="font-mono">demo@brl.com</span> /{" "}
          <span className="font-mono">123456</span> pra testar.
        </p>
      </div>
    </main>
  );
}
