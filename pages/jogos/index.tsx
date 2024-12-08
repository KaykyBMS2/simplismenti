
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Layout from "../components/Layout";
import ComingSoon from "../components/ComingSoon";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const Jogos: NextPage = () => {
  return (
    <Layout>
      <SignedIn>
        <div className="flex flex-col items-center justify-center ">
          <h1 className="font-bold text-xl mt-4">Jogos</h1>
          <ComingSoon />
          <div className="mt-[30px] flex justify-center items-center flex-col">
            <h1 className=" font-bold">Test Games</h1>
              <div className="flex flex-col justify-center border-[2px] border-black items-center dark:bg-[#f8f8f8] bg-gray-300 rounded-2xl shadow-lg p-3 h-[229px] w-[159px]">
                <Button className="mt-[70px]">Jogar</Button>
              </div>
          </div>
          
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Layout>
  );
};

export default Jogos;