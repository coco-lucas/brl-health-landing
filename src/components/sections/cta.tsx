import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(135deg, #0d0d1a 0%, rgba(150,86,161,0.25) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 size-80 rounded-full bg-brl-purple/20 blur-3xl"
      />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 text-center md:px-6">
        <h2
          id="cta-title"
          className="font-display text-3xl font-extrabold tracking-tight md:text-5xl"
        >
          Do objetivo à conquista.
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Comece grátis. Sem cartão. Sem desculpa.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          className="h-12 bg-brl-purple px-6 text-base text-white hover:bg-brl-purple/90"
          render={<Link href="/cadastro">Criar minha conta</Link>}
        />
      </div>
    </section>
  );
}
