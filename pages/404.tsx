import Head from "next/head";
import Image from "next/image";

export default function PaginaNaoEncontrada() {
  return (
    <>
      <Head>
        <title>404 (Página não encontrada)</title>
        <meta
          name="description"
          content="A página que você está tentando acessar não foi encontrada. :("
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex justify-center items-center min-h-screen bg-[#13131d]">
        <main className="text-center px-6 py-24 sm:py-32 lg:px-8">
          <p className="text-4xl font-bold text-indigo-600">404</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-100">
            Ops! Página não encontrada
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400">
            Não conseguimos encontrar a página que você está procurando.
          </p>
          <p className="text-md sm:text-lg text-gray-400">
            Ela pode ter sido movida ou não existe mais.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="w-full sm:w-auto rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:ring-2 focus:ring-indigo-500"
            >
              Voltar para a página inicial
            </a>
            <a
              href="/suporte"
              className="text-sm font-semibold text-gray-300 dark:hover:text-gray-400"
            >
              Entre em contato com o suporte &rarr;
            </a>
          </div>
        </main>
      </div>
    </>
  );
}