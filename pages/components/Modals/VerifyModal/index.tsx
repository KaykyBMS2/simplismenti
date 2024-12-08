import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Redireciona após 5 segundos
      const timer = setTimeout(() => {
        router.push('/'); // Redireciona para a página principal
      }, 5000);

      return () => clearTimeout(timer); // Limpa o timeout quando o modal é fechado
    }
  }, [isOpen, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg text-center w-[400px] shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Verificação Confirmada!</h2>
        </div>
        <div className="mb-6">
          {/* Substitua este <img> por um GIF ou SVG da sua escolha */}
          <img src="/path-to-your-gif-or-svg.gif" alt="Verificação Confirmada" className="mx-auto" />
        </div>
        <p className="text-gray-600">Aguarde enquanto você é redirecionado...</p>
      </div>
    </div>
  );
};

export default VerificationModal;