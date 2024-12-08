import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import Link from "next/link";
import CookieModal from "../../components/CookieModal";

const Policies: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Políticas do Site</title>
        <meta name="description" content="Conheça as políticas de privacidade, uso e segurança do nosso site." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Políticas do Site</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
          Bem-vindo ao nosso site! Nossas políticas são criadas para garantir uma experiência segura e transparente
          para você e nossa comunidade. Ao utilizar a plataforma, você concorda com os termos descritos abaixo.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Política de Privacidade</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">1.1. Coleta de Informações</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Coletamos informações pessoais fornecidas diretamente por você, como nome, e-mail e dados de pagamento.
              Informações sobre o uso da plataforma, como endereço IP e comportamento, também podem ser coletadas
              automaticamente.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">1.2. Uso das Informações</h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>Gerenciar sua conta.</li>
              <li>Melhorar sua experiência no site.</li>
              <li>Fornecer suporte técnico e enviar atualizações.</li>
              <li>Personalizar conteúdos e anúncios.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">1.3. Compartilhamento de Dados</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Seus dados serão compartilhados apenas para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>Processar pagamentos.</li>
              <li>Cumprir obrigações legais.</li>
              <li>Melhorar serviços com parceiros confiáveis.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">1.4. Retenção de Dados</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Manteremos seus dados pelo tempo necessário, salvo solicitação de exclusão ou obrigação legal.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">1.5. Direitos dos Usuários</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Conforme a LGPD, você pode acessar, corrigir ou excluir seus dados, solicitar portabilidade ou revogar
              consentimento. Entre em contato pelo e-mail:{" "}
              <Link href="mailto:suporte@simplismenti.online" className="text-blue-500 underline">
                suporte@simplismenti.online
              </Link>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Política de Uso</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">2.1. Finalidade da Plataforma</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Oferecemos entretenimento por meio de jogos e mini-games, sem distribuição de prêmios em dinheiro.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">2.2. Proibição de Uso Indevido</h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>Não tente hackear ou manipular sistemas.</li>
              <li>Evite linguagem ofensiva ou discriminatória.</li>
              <li>Não compartilhe informações falsas.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Política de Pagamentos e Reembolsos</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Aceitamos pagamentos por métodos confiáveis e analisamos reembolsos apenas em casos previstos no Código de
            Defesa do Consumidor.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Política de Segurança</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Empregamos medidas avançadas para proteger seus dados, mas é sua responsabilidade manter sua senha segura.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Contato</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Para dúvidas, entre em contato pelo e-mail:{" "}
            <Link href="mailto:suporte@simplismenti.online" className="text-blue-500 underline">
              suporte@simplismenti.online
            </Link>
            .
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default Policies;