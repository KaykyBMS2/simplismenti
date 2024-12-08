import type { NextPage } from "next";
import Layout from "../components/Layout";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton, useUser } from "@clerk/nextjs";

const Banco: NextPage = () => {
  const { user } = useUser(); // Pega os dados do usuário logado

  return (
    <Layout>
      <SignedIn>
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800">
          {/* Avatar do usuário */}
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-[120px] h-[120px] rounded-full border-4 border-blue-500 shadow-md",
              },
            }}
          />
          
          {/* Nome do usuário */}
          <h1 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">
            Olá,<span className="font-light"> {user?.firstName || "Usuário"}</span><span className="font-light">.</span>
          </h1>

          {/* Saldo e informações principais */}
          <div className="w-full max-w-lg mt-6 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Saldo disponível</h2>
            <p className="text-4xl font-bold text-blue-500 mt-2">R$ 10.000,00</p>
          </div>

          {/* Ações principais */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-6">
            <button className="bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold shadow hover:bg-blue-600">
              Transferir
            </button>
            <button className="bg-green-500 text-white py-3 px-4 rounded-lg font-semibold shadow hover:bg-green-600">
              Depositar
            </button>
          </div>

          {/* Histórico de transações */}
          <div className="w-full max-w-lg mt-8 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Últimas Transações</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Pagamento de conta</span>
                <span>- R$ 200,00</span>
              </li>
              <li className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Transferência recebida</span>
                <span>+ R$ 1.000,00</span>
              </li>
              <li className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Depósito</span>
                <span>+ R$ 500,00</span>
              </li>
            </ul>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Layout>
  );
};

export default Banco;