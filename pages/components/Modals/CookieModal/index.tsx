import { useState, useEffect } from "react";
import Image from "next/image";

// Função para resetar cookies
export function resetCookies() {
  localStorage.removeItem("cookiesAccepted");
  window.location.reload(); // Recarrega a página para exibir o modal novamente
}

export default function CookieModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const userInfo = {
      consentDate: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
    };

    localStorage.setItem("cookiesAccepted", JSON.stringify(userInfo));
    setIsVisible(false);
  };

  const handleReject = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      {/* Container do modal */}
      <div className="relative bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg p-4 shadow-lg max-w-sm w-full">
        {/* Imagem do cookie posicionada */}
        <div className="absolute -top-[115px] left-1/2 transform -translate-x-1/2">
          <Image src="/cookie.svg" alt="Cookie" width={150} height={150} />
        </div>

        {/* Conteúdo do modal */}
        <h2 className="text-[25px] font-semibold mb-2 mt-4 text-center">Aceite os Cookies</h2>
        <p className="text-l mb-4 text-center">
          Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar, você concorda com nossa{" "}
          <a href="/Policies/Politicas" className="text-blue-500 underline">
            política de privacidade
          </a>.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleReject}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg"
          >
            Recusar
          </button>
          <button
            onClick={handleAccept}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}