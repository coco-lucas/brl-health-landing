import Link from "next/link";

const links = [
  { href: "#produtos", label: "Produtos" },
  { href: "#planos", label: "Planos" },
  { href: "#", label: "Sobre" },
  { href: "#", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brl-dark py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <Link
            href="/"
            className="font-display text-xl font-extrabold tracking-tight"
            aria-label="BRL Health — página inicial"
          >
            <span className="text-brl-purple">BRL</span>
            <span className="text-foreground"> Health</span>
          </Link>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Treino e nutrição que se falam. Do objetivo à conquista.
          </p>
        </div>

        <nav
          aria-label="Links de rodapé"
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 w-full max-w-6xl px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          © 2025 BRL Ltda. — Build Run Lead.
        </p>
      </div>
    </footer>
  );
}
