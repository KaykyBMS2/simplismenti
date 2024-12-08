"use client";

import Image from "next/image";
import Link from "next/link";
import NavItem, { NavItemInterface } from "../NavItem";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Loading from '../../Loading';
import { useState, useEffect } from "react";

export default function Navbar() {
    const items: NavItemInterface[] = [
        { url: "/", label: "Início" },
        { url: "/noticias", label: "Notícias" },
        { url: "/loja", label: "Loja" },
        { url: "/banco", label: "Banco" },
        { url: "/jogos", label: "Jogos" },
    ];

    const pathname = usePathname();
    const { isLoaded, isSignedIn, user } = useUser();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [themeLogo, setThemeLogo] = useState<string>("spm_white.svg");
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const updateLogo = (e: MediaQueryListEvent | MediaQueryList) => {
            setThemeLogo(e.matches ? "spm_white.svg" : "spm_black.svg");
        };

        updateLogo(darkModeMediaQuery);
        darkModeMediaQuery.addEventListener("change", updateLogo);

        return () => {
            darkModeMediaQuery.removeEventListener("change", updateLogo);
        };
    }, []);

    if (!isLoaded) {
        // Renderiza um estado de carregamento enquanto os dados de autenticação estão sendo carregados
        return <Loading />; }

    return (
        <header className="pt-[20px] pb-[75px] bg-gray-100 dark:bg-slate-800 flex justify-center z-50">
            {/* Navbar */}
            <nav className="fixed flex justify-between items-center p-4 bg-gray-300 dark:bg-[#13131d] shadow-lg backdrop-blur-lg max-w-[97%] min-w-[97%] max-h-[70px] rounded-[30px] border border-gray-200 dark:border-gray-700 z-1000">
                {/* Botão do menu (mobile) */}
                <button
                    className="text-slate-800 dark:text-white text-xl"
                    onClick={() => setOpenMenu(!openMenu)}
                    aria-label="Toggle menu"
                >
                    {openMenu ? <FaXmark size={30} /> : <FaBars size={30} />}
                </button>

                {/* Logo centralizada */}
                <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0">
                    <Image
                        src={`/${themeLogo}`}
                        width={55}
                        height={55}
                        alt="Logo do sistema"
                        className="object-cover"
                        priority
                    />
                </Link>

                {/* Controle de autenticação */}
                <div className="flex items-center">
                    <SignedOut>
                        <div className="bg-blue-500 text-white py-2 px-2 rounded-full hover:bg-blue-700 font-medium">
                            <SignInButton>Entrar</SignInButton>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex items-center space-x-4">
                            {/* Nome do usuário logado */}
                            {user?.firstName && (
                                <span className="text-gray-800 dark:text-gray-300">
                                    Olá, {user.firstName}!
                                </span>
                            )}
                            {/* Botão de perfil ou logout */}
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-10 h-10 rounded-full",
                                    },
                                }}
                            />
                        </div>
                    </SignedIn>
                </div>

                {/* Menu de navegação (mobile) */}
                {openMenu && (
                    <ul
                        className="absolute top-[95px] right-1.5 w-[97%] py-5 px-6 md:w-[300px] md:rounded-lg shadow-lg rounded-[30px] 
                            bg-gray-300 dark:bg-[#13131d] 
                            border border-gray-200 dark:border-gray-700"
                    >
                        {/* Botão de interrogação*/}
                        <div className="align-center flex flex-row gap-[80%]">
                            <div className="w-auto mx-auto mb-4 flex justify-start">
                                <button
                                    className="text-gray-800 dark:text-gray-300 text-1xl transition-transform hover:scale-110"
                                    aria-label="Dúvidas"
                                >
                                    <BsFillQuestionCircleFill />
                                </button>
                            </div>
                            {/* Botão de configurações */}
                            <div className="w-auto mx-auto mb-4 flex justify-end">
                                <button
                                    className="text-gray-800 dark:text-gray-300 text-1xl transition-transform hover:scale-110"
                                    aria-label="Configurações"
                                >
                                    <FaCog />
                                </button>
                            </div>
                        </div>

                        {/* Barra de pesquisa */}
                        <div className="w-full mb-4">
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2 text-gray-800 dark:text-white bg-transparent border border-gray-800 dark:border-gray-600 rounded-full placeholder-gray-800 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7250e9] transition-all"
                            />
                        </div>

                        {/* Links de navegação */}
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="text-slate-800 dark:text-gray-300 hover:text-[#7250e9] dark:hover:text-white transition-all pb-[15px]"
                            >
                                <NavItem url={item.url} label={item.label} isActive={pathname === item.url} />
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </header>
    );
}