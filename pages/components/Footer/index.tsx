import Image from "next/image";
import { FaInstagram, FaYoutube, FaTiktok, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { resetCookies } from "../../components/CookieModal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const themeLogo = "spm_white.svg"; // Ajuste conforme necessário.

  return (
    <footer className="bg-gray-300 dark:bg-[#13131d] py-8 rounded-t-[15px]">
      <div className="container mx-auto text-center">
        <Image
          src={`/${themeLogo}`}
          alt="Logo SPM Studios"
          width={100}
          height={100}
          className="mx-auto"
        />
        <div className="flex justify-center gap-3 mt-4 py-[20px]">
          <a
            href="https://www.instagram.com/simplismenti/profilecard/?igsh=MTlvbHF0bnFjaWs3bA=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 text-2xl transition-transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/Kaykyoprednt?t=MYRXY1j3r-4ojoSluq1uhw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 text-2xl transition-transform hover:scale-110"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.tiktok.com/@simplismenti?_t=8rpzrM3NewK&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 text-2xl transition-transform hover:scale-110"
          >
            <FaTiktok />
          </a>
          <a
            href="https://youtube.com/@simplismentioficial?si=oy333fQeCtrsU-Ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 text-2xl transition-transform hover:scale-110"
          >
            <FaYoutube />
          </a>
          <a
            href="https://discord.gg/CZZQVWq6Vn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 text-2xl transition-transform hover:scale-110"
          >
            <FaDiscord />
          </a>
        </div>
        <button
          onClick={() => resetCookies()}
          className="text-blue-500 underline"
        >
          Gerenciar preferências de cookies
        </button>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
          SPM Studios © {currentYear} - Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;