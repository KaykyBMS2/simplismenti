
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
          
          
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Layout>
  );
};

export default Jogos;