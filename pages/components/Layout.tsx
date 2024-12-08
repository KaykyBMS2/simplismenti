"use client";

import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // Hook para autenticação

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const { isSignedIn } = useAuth(); // Estado de autenticação do usuário

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    root.classList.add(initialTheme);

    const handleThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      root.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
    };

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeMediaQuery.addEventListener("change", handleThemeChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // Refresh automático na página inicial após login, sem loop infinito
  useEffect(() => {
    const refreshKey = "home_refreshed";
    const hasRefreshed = sessionStorage.getItem(refreshKey);

    if (pathname === "/" && !isSignedIn && !hasRefreshed) {
      sessionStorage.setItem(refreshKey, "true");
      window.location.reload();
    }
  }, [pathname, isSignedIn]);

  const themeLogo = theme === "dark" ? "spm_white.svg" : "spm_black.svg";

  return (
    <>
      <Head>
        <title>SPM Studios</title>
        <meta
          name="description"
          content="Bem-vindo ao SPM Studios, um lugar feito para diversão e entretenimento."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SPM Studios" />
        <meta
          name="keywords"
          content="SPM Studios, jogos, minigames, passa tempo, diversão, fivem, minecraft, roblox, standoff2, free fire, roleplay, rpg"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="SPM Studios" />
        <meta
          property="og:description"
          content="Bem-vindo ao SPM Studios, um lugar feito para diversão e entretenimento."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://spmstudios.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SPM Studios" />
        <meta
          name="twitter:description"
          content="Bem-vindo ao SPM Studios, um lugar feito para diversão e entretenimento."
        />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="theme-color" content="#333e4f" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-800">
        <Navbar logo={themeLogo} />
        <main className="flex justify-center items-center text-gray-600 dark:text-gray-300 flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;