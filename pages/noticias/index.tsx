 import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import ComingSoon from "../components/ComingSoon";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const Noticias: NextPage = () => {
  return (
    <Layout>
      <SignedIn>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl mt-4">Notícias</h1>
         
            <div className="flex justify-center items-center ">
              <div className="flex flex-col justify-center border-[2px] border-black items-center dark:bg-[#f8f8f8] bg-gray-300 rounded-2xl shadow-lg p-3 h-[390px] w-[380px]">
              <Image src="/qnn.png" width={450} height={450} alt="Qnnlogo" />
              </div>
            </div>
          <ComingSoon />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Layout>
  );
};

export default Noticias;