import Link from "next/link";

export default async function Home() {
  return (
    <section className="flex min-h-dvh items-center justify-center">
      <div className="flex min-h-dvh w-full items-center justify-between py-16">
        <div className="w-9/10 max-w-2xl mx-auto overflow-hidden">
          <div className="fade-in flex flex-col gap-4">
            <h1 className="relative text-title-main text-glow font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-white via-primary to-secondary">Socialex</h1>
            <p className="text-center text-medium">
              Socialex es un proyecto hecho por Alesis que sirve de base para
              otros proyectos de similares caracteristicas, puedes aportar a
              través del repositorio en{" "}
              <Link href="https://github.com/Aleixs-Trejo/next-socialex" target="_blank" rel="noreferrer noopener" className="text-bright hover:underline">
                Github
              </Link>
            </p>
            <Link
              href="/socialex/feed"
              className="btn-primary w-max mx-auto"
            >
              Ir a Socialex
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}